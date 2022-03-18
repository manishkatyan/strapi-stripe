/**
 *
 * This component is the responsible for displaying the table.
 *
 */

import React from "react";
import { Table, Thead, Tbody, Tr, Td, Th } from "@strapi/design-system/Table";
import { Flex } from "@strapi/design-system/Flex";
import { Box } from "@strapi/design-system/Box";
import { IconButton } from "@strapi/design-system/IconButton";
import { Button } from "@strapi/design-system/Button";
import { VisuallyHidden } from "@strapi/design-system/VisuallyHidden";
import { Typography } from "@strapi/design-system/Typography";
import { Avatar } from "@strapi/design-system/Avatar";
import Pencil from "@strapi/icons/Pencil";
import Dashboard from "@strapi/icons/Dashboard";
import Link from "@strapi/icons/Link";
import File from "@strapi/icons/File";
import {
  Card,
  CardHeader,
  CardBody,
  CardCheckbox,
  CardAction,
  CardAsset,
  CardTimer,
  CardContent,
  CardBadge,
  CardTitle,
  CardSubtitle,
} from "@strapi/design-system/Card";

const ProductTable = () => {
  const ROW_COUNT = 6;
  const COL_COUNT = 10;
  const entry = {
    cover:
      "http://localhost:1337/uploads/user_9_93c4fd1239.jpg?updated_at=2022-03-18T17:30:48.910Z",
    name: "product",
    price: 100,
    contact: "stripe product",
  };
  const entries = [];

  for (let i = 0; i < 5; i++) {
    entries.push({ ...entry, id: i });
  }

  const imageStyle = {
    border: "1px solid #ddd",
    borderRadius: "4px",
    padding: "5px",
    width: "60px",
  };

  return (
    <Box padding={8} background="neutral100">
      <Table colCount={COL_COUNT} rowCount={ROW_COUNT}>
        <Thead>
          <Tr>
            <Th>
              <Typography variant="sigma">SL No</Typography>
            </Th>
            <Th>
              <Typography variant="sigma">Photo</Typography>
            </Th>
            <Th>
              <Typography variant="sigma">Name</Typography>
            </Th>
            <Th>
              <Typography variant="sigma">Price</Typography>
            </Th>
            <Th>
              <Typography variant="sigma">Embed Code</Typography>
            </Th>
            <Th>
              <VisuallyHidden>Actions</VisuallyHidden>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {entries.map((entry) => (
            <Tr key={entry.id}>
              <Td>
                <Typography textColor="neutral800">{entry.id + 1}</Typography>
              </Td>
              <Td>
                {/* <Avatar src={entry.cover} alt={entry.contact} /> */}
                <Box>
                  <img src={entry.cover} alt="product" style={imageStyle} />
                </Box>
              </Td>
              <Td>
                <Typography textColor="neutral800">
                  {entry.name + (entry.id + 1)}
                </Typography>
              </Td>
              <Td>
                <Typography textColor="neutral800">
                  &#36;&nbsp;{entry.price}
                </Typography>
              </Td>
              <Td>
                <Flex>
                  <Box paddingRight={2}>
                    <Typography textColor="neutral800">
                      <Button variant="secondary" endIcon={<Link />}>
                        Payment Button
                      </Button>
                    </Typography>
                  </Box>
                  <Box>
                    <Typography textColor="neutral800">
                      <Button variant="secondary" endIcon={<Dashboard />}>
                        Product List
                      </Button>
                    </Typography>
                  </Box>
                </Flex>
              </Td>
              <Td>
                <Flex>
                  <IconButton
                    onClick={() => console.log("edit")}
                    label="Edit"
                    // noBorder
                    icon={<Pencil />}
                  />
                  <Box paddingLeft={3}>
                    <IconButton
                      onClick={() => console.log("File")}
                      label="Report"
                      // noBorder
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
  );
};

export default ProductTable;
