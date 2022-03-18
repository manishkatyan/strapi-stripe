/**
 *
 * This component is the responsible for displaying all the created Products.
 *
 */

import React, { useState } from "react";
import { Box } from "@strapi/design-system/Box";
import { Typography } from "@strapi/design-system/Typography";
import { Divider } from "@strapi/design-system/Divider";
import { Flex } from "@strapi/design-system/Flex";
import { Button } from "@strapi/design-system/Button";
import CreateProduct from "../CreateProduct";
import ProductTable from "./productTable";

const ProductList = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleCloseModal = () => {
    setIsVisible(false);
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

        <CreateProduct isVisible={isVisible} handleClose={handleCloseModal} />
      </Flex>
      <Box>
        <ProductTable />
      </Box>
    </>
  );
};

export default ProductList;
