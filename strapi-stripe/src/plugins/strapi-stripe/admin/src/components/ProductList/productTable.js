/**
 *
 * This component is the responsible for displaying the table.
 *
 */

import React, { useState } from "react";
import { Table, Thead, Tbody, Tr, Td, Th } from "@strapi/design-system/Table";
import { Flex } from "@strapi/design-system/Flex";
import { Box } from "@strapi/design-system/Box";
import { IconButton } from "@strapi/design-system/IconButton";
import { Button } from "@strapi/design-system/Button";
import { Typography } from "@strapi/design-system/Typography";
import {
  Dots,
  NextLink,
  PageLink,
  Pagination,
  PreviousLink,
} from "@strapi/design-system/Pagination";
import Pencil from "@strapi/icons/Pencil";
import Link from "@strapi/icons/Link";
import File from "@strapi/icons/File";
import Gift from "@strapi/icons/Gift";
import CarretUp from "@strapi/icons/CarretUp";
import CarretDown from "@strapi/icons/CarretDown";
import copy from "copy-to-clipboard";

const productPerPage = 6;

const ProductTable = ({
  products,
  handleSortAscending,
  handleSortDescending,
  handleEditClick,
}) => {
  const ROW_COUNT = 6;
  const COL_COUNT = 10;
  const [sortAscending, setSortAscending] = useState(true);

  const handleSortCarretUp = () => {
    setSortAscending(false);
    handleSortDescending();
  };

  const handleSortCarretDown = () => {
    setSortAscending(true);
    handleSortAscending();
  };

  const handleClickLink = (productId) => {
    const button = `Add button to your code.\n 
              <button class="Your style" type="button" id="SS_ProductCheckout" 
                      data-id=${productId} data-url=${window.location.origin}>
                  PayNow
                </button>
               `;

    copy(button);
  };

  return (
    <>
      <Box padding={8} background="neutral100">
        <Table colCount={COL_COUNT} rowCount={ROW_COUNT}>
          <Thead>
            <Tr>
              <Th>
                <Typography variant="sigma">Name</Typography>&nbsp;
                {sortAscending ? (
                  <IconButton
                    onClick={handleSortCarretUp}
                    label="sort by Name"
                    noBorder
                    icon={<CarretUp />}
                  />
                ) : (
                  <IconButton
                    onClick={handleSortCarretDown}
                    label="sort by Name"
                    noBorder
                    icon={<CarretDown />}
                  />
                )}
              </Th>
              <Th>
                <Typography variant="sigma">Price</Typography>
              </Th>
              <Th>
                <Typography variant="sigma">Embed Code</Typography>
              </Th>
              <Th>
                <Typography variant="sigma">Actions</Typography>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {products &&
              products.map((product) => (
                <Tr key={product.id}>
                  <Td>
                    <Typography
                      variant="epsilon"
                      textColor="neutral800"
                      textTransform="capitalize"
                    >
                      {product.title}
                    </Typography>
                    <Box>
                      <Typography variant="pi">
                        {
                          new Date(product.createdAt)
                            .toISOString()
                            .split("T")[0]
                        }
                      </Typography>
                    </Box>
                  </Td>
                  <Td>
                    <Typography textColor="neutral800">
                      &#36;{product.price}
                    </Typography>
                  </Td>
                  <Td>
                    <Flex>
                      <IconButton
                        onClick={() => handleClickLink(product.id)}
                        label="Copy Link Embed Code"
                        icon={<Link />}
                      />
                      <Box paddingLeft={3}>
                        <IconButton
                          onClick={() => console.log("File")}
                          label="Copy product Embed Code"
                          icon={<Gift />}
                        />
                      </Box>
                    </Flex>
                  </Td>
                  <Td>
                    <Flex>
                      <IconButton
                        onClick={() => handleEditClick(product.id)}
                        label="Edit"
                        icon={<Pencil />}
                      />
                      <Box paddingLeft={3}>
                        <IconButton
                          onClick={() => console.log("File")}
                          label="Report"
                          icon={<File />}
                        />
                      </Box>
                    </Flex>
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </Box>
      <Flex justifyContent="end" paddingRight={8}>
        <Pagination activePage={1} pageCount={26}>
          <PreviousLink to="/1">Go to previous page</PreviousLink>
          <PageLink number={1} to="/1">
            Go to page 1
          </PageLink>
          <PageLink number={2} to="/2">
            Go to page 2
          </PageLink>
          <Dots>And 23 other links</Dots>
          <PageLink number={25} to="/25">
            Go to page 3
          </PageLink>
          <PageLink number={26} to="/26">
            Go to page 26
          </PageLink>
          <NextLink to="/3">Go to next page</NextLink>
        </Pagination>
      </Flex>
    </>
  );
};

export default ProductTable;
