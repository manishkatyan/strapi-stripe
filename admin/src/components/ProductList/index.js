/**
 *
 * This component is the responsible for displaying all the created Products.
 *
 */

import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Box } from "@strapi/design-system/Box";
import { Typography } from "@strapi/design-system/Typography";
import { Divider } from "@strapi/design-system/Divider";
import { Flex } from "@strapi/design-system/Flex";
import { Button } from "@strapi/design-system/Button";
import CreateProduct from "../CreateProduct";
import ProductTable from "./productTable";
import {
  getStripeProduct,
  createStripeProduct,
  updateStripeProduct,
} from "../../utils/apiCalls";
import EditProduct from "./editProduct";
const limit = 5;
const ProductList = () => {
  const search = useLocation().search;
  const page = new URLSearchParams(search).get("page");
  const pageNumber = page ? parseInt(page) : 1;

  const [isVisible, setIsVisible] = useState(false);
  const [productData, setProductData] = useState();
  const [isEditVisible, setEditVisible] = useState(false);
  const [productId, setProductId] = useState();
  const [count, setCount] = useState();
  const [sortAscendingName, setSortAscendingName] = useState(true);
  const [sortAscendingPrice, setSortAscendingPrice] = useState(true);
  const [sortOrderName, setSortOrderName] = useState(true);
  const [sortOrderPrice, setSortOrderPrice] = useState(false);

  const offset = pageNumber === 1 ? 0 : (pageNumber - 1) * limit;

  useEffect(async () => {
    let sort, order;
    if (sortOrderName) {
      sort = "name";
      order = sortAscendingName ? "asc" : "desc";
    } else if (sortOrderPrice) {
      sort = "price";
      order = sortAscendingPrice ? "asc" : "desc";
    }

    const response = await getStripeProduct(offset, limit, sort, order);

    setProductData(response.data.res);
    setCount(response.data.count);
  }, [isVisible, isEditVisible, offset, sortAscendingName, sortAscendingPrice]);

  const handleCloseModal = () => {
    setIsVisible(false);
  };

  const handleSaveProduct = async (title, price, url, description) => {
    const createProduct = await createStripeProduct(
      title,
      price,
      url,
      description
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

  const handleEnableEditMode = async (id) => {
    setProductId(id);
    setEditVisible(true);
  };

  const handleCloseEditModal = () => {
    setEditVisible(false);
  };

  const handleUpdateProduct = async (
    productId,
    title,
    price,
    url,
    description,
    stripeProductId
  ) => {
    const updateProduct = await updateStripeProduct(
      productId,
      title,
      price,
      url,
      description,
      stripeProductId
    );

    if (updateProduct?.data?.id) {
      setEditVisible(false);
    }
  };

  return (
    <>
      <Box paddingTop={6} paddingLeft={8}>
        <Typography variant="alpha">Stripe Payment</Typography>
        <Box>
          <Typography variant="omega">
            The Stripe Payments plugin allows you to accept credit card payments
            via Stripe payment gateway on your Strapi site easily.
          </Typography>
        </Box>
      </Box>
      <Box padding={3}>
        <Divider />
      </Box>
      <Flex justifyContent="end" paddingRight={10} paddingTop={4}>
        <Button onClick={() => setIsVisible((prev) => !prev)}>
          Add Product
        </Button>

        <CreateProduct
          isVisible={isVisible}
          handleClose={handleCloseModal}
          handleClickSave={(title, price, url, description) =>
            handleSaveProduct(title, price, url, description)
          }
        />
        <EditProduct
          productId={productId}
          isEditVisible={isEditVisible}
          handleCloseEdit={handleCloseEditModal}
          handleClickUpdateEdit={(
            productId,
            title,
            price,
            url,
            description,
            stripeProductId
          ) =>
            handleUpdateProduct(
              productId,
              title,
              price,
              url,
              description,
              stripeProductId
            )
          }
        />
      </Flex>

      <Box>
        <ProductTable
          products={productData}
          handleSortAscendingName={handleSortAscendingName}
          handleSortDescendingName={handleSortDescendingName}
          handleEditClick={(id) => handleEnableEditMode(id)}
          totalCount={Math.ceil(count / limit)}
          page={pageNumber}
          sortAscendingName={sortAscendingName}
          handleSortAscendingPrice={handleSortAscendingPrice}
          handleSortDescendingPrice={handleSortDescendingPrice}
          sortAscendingPrice={sortAscendingPrice}
        />
      </Box>
    </>
  );
};

export default ProductList;
