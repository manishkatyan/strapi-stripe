/**
 *
 * This component is the responsible for displaying all the created Products.
 *
 */

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Box } from '@strapi/design-system/Box';
import { Typography } from '@strapi/design-system/Typography';
import { Divider } from '@strapi/design-system/Divider';
import { Alert } from '@strapi/design-system/Alert';
import CreateProduct from '../CreateProduct';
import ProductTable from './productTable';
import {
  getStripeProduct,
  createStripeProduct,
  updateStripeProduct,
  getStripeConfiguration,
} from '../../utils/apiCalls';
import EditProduct from './editProduct';

const limit = 5;
const ProductList = () => {
  const search = useLocation().search;
  const page = new URLSearchParams(search).get('page');
  const pageNumber = page ? parseInt(page, 10) : 1;

  const [isVisible, setIsVisible] = useState(false);
  const [productData, setProductData] = useState();
  const [isEditVisible, setEditVisible] = useState(false);
  const [productId, setProductId] = useState();
  const [count, setCount] = useState();
  const [sortAscendingName, setSortAscendingName] = useState(true);
  const [sortAscendingPrice, setSortAscendingPrice] = useState(true);
  const [sortOrderName, setSortOrderName] = useState(true);
  const [sortOrderPrice, setSortOrderPrice] = useState(false);
  const [isStripeSettings, setIsStripeSettings] = useState(false);
  const [isAlert, setIsAlert] = useState(false);
  const [message, setMessage] = useState('');

  const offset = pageNumber === 1 ? 0 : (pageNumber - 1) * limit;

  useEffect(() => {
    (async () => {
      let sort;
      let order;

      const setting = await getStripeConfiguration();

      if (setting.data.response) {
        setIsStripeSettings(true);
      } else {
        setIsStripeSettings(false);
      }

      if (sortOrderName) {
        sort = 'name';
        order = sortAscendingName ? 'asc' : 'desc';
      } else if (sortOrderPrice) {
        sort = 'price';
        order = sortAscendingPrice ? 'asc' : 'desc';
      }

      const response = await getStripeProduct(offset, limit, sort, order);

      setProductData(response.data.res);
      setCount(response.data.count);
    })();
  }, [isVisible, isEditVisible, offset, sortAscendingName, sortAscendingPrice]);

  const handleCloseModal = () => {
    setIsVisible(false);
  };

  const handleSaveProduct = async (
    title,
    price,
    imageId,
    imageUrl,
    description,
    isSubscription,
    paymentInterval,
    trialPeriodDays
  ) => {
    const createProduct = await createStripeProduct(
      title,
      price,
      imageId,
      imageUrl,
      description,
      isSubscription,
      paymentInterval,
      trialPeriodDays
    );

    if (createProduct?.data?.id) {
      setIsVisible(false);
    }
  };

  const handleSortAscendingName = () => {
    setSortAscendingName(true);
    sortOrderName(true);
    sortOrderPrice(false);
  };

  const handleSortDescendingName = () => {
    setSortAscendingName(false);
    sortOrderName(true);
    sortOrderPrice(false);
  };

  const handleSortAscendingPrice = () => {
    setSortAscendingPrice(true);
    setSortOrderName(false);
    setSortOrderPrice(true);
  };

  const handleSortDescendingPrice = () => {
    setSortAscendingPrice(false);
    setSortOrderName(false);
    setSortOrderPrice(true);
  };

  const handleEnableEditMode = async id => {
    setProductId(id);
    setEditVisible(true);
  };

  const handleCloseEditModal = () => {
    setEditVisible(false);
  };

  const handleUpdateProduct = async (
    productId,
    title,
    url,
    description,
    productImageId,
    stripeProductId
  ) => {
    try {
      const updateProduct = await updateStripeProduct(
        productId,
        title,
        url,
        description,
        productImageId,
        stripeProductId
      );

      if (updateProduct?.data?.id) {
        setEditVisible(false);
      }
    } catch (error) {
      setEditVisible(false);
      setIsAlert(true);
      setMessage(error.response.data.error.message);
    }
  };

  const handleCloseAlert = () => {
    setIsAlert(false);
  };

  const handleClickCreateProduct = () => setIsVisible(prev => !prev);

  return (
    <Box>
      <Box paddingTop={6} paddingLeft={7}>
        <Typography variant="alpha">Payment via Stripe</Typography>
        <Box>
          <Typography variant="omega">
            The payment plugin enables you to accept online payments using Credit Card, Apple pay
            and Google pay on your Strapi website or app via Stripe.
          </Typography>
        </Box>
      </Box>
      <Box padding={3}>
        <Divider />
      </Box>
      <CreateProduct
        isVisible={isVisible}
        handleClose={handleCloseModal}
        handleClickSave={(
          title,
          price,
          imageId,
          imageUrl,
          description,
          isSubscription,
          paymentInterval,
          trialPeriodDays
        ) =>
          handleSaveProduct(
            title,
            price,
            imageId,
            imageUrl,
            description,
            isSubscription,
            paymentInterval,
            trialPeriodDays
          )
        }
      />
      <EditProduct
        productId={productId}
        isEditVisible={isEditVisible}
        handleCloseEdit={handleCloseEditModal}
        handleClickUpdateEdit={(
          productId,
          title,
          url,
          description,
          productImageId,
          stripeProductId
        ) =>
          handleUpdateProduct(productId, title, url, description, productImageId, stripeProductId)
        }
      />
      {isAlert ? (
        <Box paddingLeft={6} paddingRight={6}>
          <Alert closeLabel="Close alert" title="Error" variant="danger" onClose={handleCloseAlert}>
            {message}
          </Alert>
        </Box>
      ) : (
        ''
      )}

      <Box>
        <ProductTable
          products={productData}
          handleSortAscendingName={handleSortAscendingName}
          handleSortDescendingName={handleSortDescendingName}
          handleEditClick={id => handleEnableEditMode(id)}
          totalCount={Math.ceil(count / limit)}
          page={pageNumber}
          sortAscendingName={sortAscendingName}
          handleSortAscendingPrice={handleSortAscendingPrice}
          handleSortDescendingPrice={handleSortDescendingPrice}
          sortAscendingPrice={sortAscendingPrice}
          handleClickCreateProduct={handleClickCreateProduct}
          isStripeSettings={isStripeSettings}
        />
      </Box>
    </Box>
  );
};

export default ProductList;
