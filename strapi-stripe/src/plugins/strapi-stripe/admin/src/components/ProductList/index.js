/**
 *
 * This component is the responsible for displaying all the created Products.
 *
 */

import React, { useState, useEffect } from "react";
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
  getStripeProductAscending,
  getStripeProductDescending,
  updateStripeProduct,
} from "../../utils/apiCalls";
import EditProduct from "./editProduct";

const ProductList = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [productData, setProductData] = useState();
  const [isEditVisible, setEditVisible] = useState(false);
  const [productId, setProductId] = useState();

  useEffect(async () => {
    const response = await getStripeProduct();
    setProductData(response.data);
  }, [isVisible, isEditVisible]);

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

  const handleSortAscending = async () => {
    const productAscending = await getStripeProductAscending();
    setProductData(productAscending.data);
  };

  const handleSortDescending = async () => {
    const productDescending = await getStripeProductDescending();
    setProductData(productDescending.data);
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
        <Typography variant="alpha">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit
        </Typography>
        <Box>
          <Typography variant="omega">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
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
          handleSortAscending={handleSortAscending}
          handleSortDescending={handleSortDescending}
          handleEditClick={(id) => handleEnableEditMode(id)}
        />
      </Box>
    </>
  );
};

export default ProductList;
