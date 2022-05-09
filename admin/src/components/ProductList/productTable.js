/**
 *
 * This component is the responsible for displaying the table.
 *
 */

import React, { useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Th,
  TFooter,
} from "@strapi/design-system/Table";
import { Flex } from "@strapi/design-system/Flex";
import { Box } from "@strapi/design-system/Box";
import { IconButton } from "@strapi/design-system/IconButton";
import { Link, useRouteMatch } from "react-router-dom";
import { Typography } from "@strapi/design-system/Typography";
import parse from "html-react-parser";
import {
  Dots,
  NextLink,
  PageLink,
  Pagination,
  PreviousLink,
} from "@strapi/design-system/Pagination";
import ExclamationMarkCircle from "@strapi/icons/ExclamationMarkCircle";
import { EmptyStateLayout } from "@strapi/design-system/EmptyStateLayout";
import { VisuallyHidden } from "@strapi/design-system/VisuallyHidden";
import { Button } from "@strapi/design-system/Button";
import Pencil from "@strapi/icons/Pencil";
import LinkIcon from "./linkIcon";
import CarretUp from "@strapi/icons/CarretUp";
import CarretDown from "@strapi/icons/CarretDown";
import { Badge } from "@strapi/design-system/Badge";
import Plus from "@strapi/icons/Plus";
import ChartPie from "@strapi/icons/ChartPie";
import { currencies } from "./constant";
import EmbedCodeModal from "./embedCodeModal";
import SettingLink from "./SettingLink";

const ProductTable = ({
  products,
  handleSortAscendingName,
  handleSortDescendingName,
  handleEditClick,
  totalCount,
  page,
  sortAscendingName,
  handleSortAscendingPrice,
  handleSortDescendingPrice,
  sortAscendingPrice,
  handleClickCreateProduct,
}) => {
  let { url } = useRouteMatch();
  const ROW_COUNT = 6;
  const COL_COUNT = 10;

  const [isVisible, setIsVisible] = useState(false);
  const [productId, setIsProductId] = useState("");

  const handleSortCarretUp = () => {
    handleSortDescendingName();
  };

  const handleSortCarretDown = () => {
    handleSortAscendingName();
  };

  const handleSortCarretUpPrice = () => {
    handleSortDescendingPrice();
  };

  const handleSortCarretDownPrice = () => {
    handleSortAscendingPrice();
  };

  const handleClickLink = (productId) => {
    setIsProductId(productId);
    setIsVisible(true);
  };

  const handleCloseEmbedModal = () => {
    setIsVisible(false);
  };

  const getProductPrice = (price, currency) => {
    const currencyObj = currencies.find(
      (item) => item.abbreviation.toLowerCase() === currency.toLowerCase()
    );
    const symbol = currencyObj.symbol;

    const priceWithSymbol = (
      <Flex>
        <span>{parse(symbol)}</span>
        <Box>{new Intl.NumberFormat().format(price)}</Box>
      </Flex>
    );
    return priceWithSymbol;
  };

  const getDateTime = (date) => {
    const dates = new Date(date);

    // get the date as a string
    const createdDate = dates.toDateString();

    // get the time as a string
    const createdTime = dates.toLocaleTimeString();
    const dateTime = (
      <Badge>
        {createdDate}&nbsp;&nbsp;&nbsp;{createdTime}
      </Badge>
    );

    return dateTime;
  };

  return (
    <>
      <EmbedCodeModal
        productId={productId}
        isVisibleEmbedCode={isVisible}
        handleCloseEmbedCode={handleCloseEmbedModal}
      />
      <Box
        paddingTop={6}
        paddingBottom={6}
        paddingLeft={7}
        paddingRight={7}
        background="neutral100"
      >
        {products && products.length > 0 ? (
          <Table
            colCount={COL_COUNT}
            rowCount={ROW_COUNT}
            footer={
              <TFooter icon={<Plus />} onClick={handleClickCreateProduct}>
                Create New Product
              </TFooter>
            }
          >
            <Thead>
              <Tr>
                <Th>
                  <Typography variant="sigma">Name</Typography>&nbsp;
                  {sortAscendingName ? (
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
                  {sortAscendingPrice ? (
                    <IconButton
                      onClick={handleSortCarretUpPrice}
                      label="sort by price"
                      noBorder
                      icon={<CarretUp />}
                    />
                  ) : (
                    <IconButton
                      onClick={handleSortCarretDownPrice}
                      label="sort by Name"
                      noBorder
                      icon={<CarretDown />}
                    />
                  )}
                </Th>

                <Th>
                  <VisuallyHidden>Actions</VisuallyHidden>
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
                          {getDateTime(product.createdAt)}
                        </Typography>
                      </Box>
                    </Td>
                    <Td>
                      <Typography textColor="neutral800">
                        {getProductPrice(product.price, product.currency)}
                      </Typography>
                    </Td>

                    <Td>
                      <Flex justifyContent="end">
                        <IconButton
                          onClick={() => handleClickLink(product.id)}
                          label="Embed Code"
                          icon={<LinkIcon />}
                        />
                        <Box paddingLeft={3}>
                          <IconButton
                            onClick={() => handleEditClick(product.id)}
                            label="Edit"
                            icon={<Pencil />}
                          />
                        </Box>
                        <Box paddingLeft={3}>
                          <Link
                            to={`${url}/report/${product.id}/${product.title}`}
                            style={{ textDecoration: "none" }}
                          >
                            <IconButton label="Report" icon={<ChartPie />} />
                          </Link>
                        </Box>
                      </Flex>
                    </Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        ) : (
          <Box>
            <EmptyStateLayout
              icon={<ExclamationMarkCircle />}
              content="You dont have any product"
              action={
                <Button
                  variant="secondary"
                  startIcon={<Plus />}
                  onClick={handleClickCreateProduct}
                >
                  Create your first product
                </Button>
              }
            />
          </Box>
        )}
      </Box>

      <Flex justifyContent="end" paddingRight={8}>
        {totalCount ? (
          <Pagination activePage={page} pageCount={totalCount}>
            <PreviousLink to={`/plugins/strapi-stripe?page=${page - 1}`}>
              Go to previous page
            </PreviousLink>
            {totalCount &&
              [...Array(totalCount)].map((count, idx) => (
                <PageLink
                  key={idx}
                  number={idx + 1}
                  to={`/plugins/strapi-stripe?page=${idx + 1}`}
                >
                  Go to page 1
                </PageLink>
              ))}

            <NextLink to={`/plugins/strapi-stripe?page=${page + 1}`}>
              Go to next page
            </NextLink>
          </Pagination>
        ) : (
          ""
        )}
      </Flex>
      <br />
      <Box paddingTop={6} paddingBottom={6} paddingLeft={7} paddingRight={7}>
        <SettingLink />
      </Box>
    </>
  );
};

export default ProductTable;
