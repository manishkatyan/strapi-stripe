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
import entries from "./constant";

const productPerPage = 6;

const ProductTable = () => {
  const ROW_COUNT = 6;
  const COL_COUNT = 10;
  const [sortAscending, setSortAscending] = useState(true);

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
                    onClick={() => console.log("File")}
                    label="sort by Name"
                    noBorder
                    icon={<CarretUp />}
                  />
                ) : (
                  <IconButton
                    onClick={() => console.log("File")}
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
            {entries.map((entry) => (
              <Tr key={entry.id}>
                <Td>
                  <Typography variant="epsilon" textColor="neutral800">
                    {entry.name}
                  </Typography>
                  <Box>
                    <Typography variant="pi">{entry.date}</Typography>
                  </Box>
                </Td>
                <Td>
                  <Typography textColor="neutral800">
                    &#36;{entry.price}
                  </Typography>
                </Td>
                <Td>
                  <Flex>
                    <IconButton
                      onClick={() => console.log("edit")}
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
                      onClick={() => console.log("edit")}
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
