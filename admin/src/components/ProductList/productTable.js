/* eslint-disable react/no-array-index-key */

/**
 *
 * This component is the responsible for displaying the table.
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Table, Thead, Tbody, Tr, Td, Th, TFooter } from '@strapi/design-system/Table';
import { Flex } from '@strapi/design-system/Flex';
import { Box } from '@strapi/design-system/Box';
import { IconButton } from '@strapi/design-system/IconButton';
import { Link, useRouteMatch } from 'react-router-dom';
import { Typography } from '@strapi/design-system/Typography';
import parse from 'html-react-parser';
import { NextLink, PageLink, Pagination, PreviousLink } from '@strapi/design-system/Pagination';
import { EmptyStateLayout } from '@strapi/design-system/EmptyStateLayout';
import { VisuallyHidden } from '@strapi/design-system/VisuallyHidden';
import { Button } from '@strapi/design-system/Button';
import Pencil from '@strapi/icons/Pencil';
import CarretUp from '@strapi/icons/CarretUp';
import CarretDown from '@strapi/icons/CarretDown';
import { Badge } from '@strapi/design-system/Badge';
import Plus from '@strapi/icons/Plus';
import ChartPie from '@strapi/icons/ChartPie';
import LinkIcon from './linkIcon';
import { currencies } from './constant';
import EmbedCodeModal from './embedCodeModal';
import SettingLink from './SettingLink';

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
  isStripeSettings,
}) => {
  let { url } = useRouteMatch();
  const ROW_COUNT = 6;
  const COL_COUNT = 10;

  const [isVisible, setIsVisible] = useState(false);
  const [productId, setIsProductId] = useState('');
  const [isSubscription, setIsSubscription] = useState(false);

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

  const handleClickLink = (productId, isSubscription) => {
    setIsProductId(productId);
    setIsSubscription(isSubscription);
    setIsVisible(true);
  };

  const handleCloseEmbedModal = () => {
    setIsVisible(false);
  };

  const getProductPrice = (price, currency) => {
    const currencyObj = currencies.find(
      item => item.abbreviation.toLowerCase() === currency.toLowerCase()
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

  const getDateTime = date => {
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

  const getPaymentMode = (isSubscription, interval) => {
    let mode;

    if (!isSubscription && !interval) {
      mode = 'One-Time';
    } else if (isSubscription && interval) {
      if (interval === 'month') {
        mode = 'Monthly';
      } else if (interval === 'year') {
        mode = 'Year';
      } else if (interval === 'week') {
        mode = 'Weekly';
      }
    }

    return mode;
  };

  const getTrialPeriodDays = (trialPeriodDays, isSubscription) => {
    let trialDays;

    if (isSubscription && trialPeriodDays) {
      trialDays = trialPeriodDays;
    } else if (isSubscription && !trialPeriodDays) {
      trialDays = 0;
    } else if (!isSubscription && !trialPeriodDays) {
      trialDays = 'NA';
    }

    return trialDays;
  };

  return (
    <>
      <EmbedCodeModal
        productId={productId}
        isVisibleEmbedCode={isVisible}
        handleCloseEmbedCode={handleCloseEmbedModal}
        isSubscription={isSubscription}
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
                Create New Product / Subscription
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
                  <Typography variant="sigma">Payment Mode</Typography>
                </Th>
                <Th>
                  <Typography variant="sigma">Trial Days</Typography>
                </Th>
                <Th>
                  <VisuallyHidden>Actions</VisuallyHidden>
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {products &&
                products.map(product => (
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
                        <Typography variant="pi">{getDateTime(product.createdAt)}</Typography>
                      </Box>
                    </Td>
                    <Td>
                      <Typography textColor="neutral800">
                        {getProductPrice(product.price, product.currency)}
                      </Typography>
                    </Td>
                    <Td>
                      <Typography textColor="neutral800">
                        {getPaymentMode(product.isSubscription, product.interval)}
                      </Typography>
                    </Td>
                    <Td>
                      <Typography textColor="neutral800">
                        {getTrialPeriodDays(product.trialPeriodDays, product.isSubscription)}
                      </Typography>
                    </Td>
                    <Td>
                      <Flex justifyContent="end">
                        <IconButton
                          onClick={() => handleClickLink(product.id, product.isSubscription)}
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
                            style={{ textDecoration: 'none' }}
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
              icon=""
              content=""
              action={
                <>
                  {isStripeSettings ? (
                    ''
                  ) : (
                    <Box paddingBottom={4}>
                      {' '}
                      <Typography textColor="danger500">
                        Please add your stripe configuration first
                      </Typography>
                    </Box>
                  )}
                  <Button
                    variant="secondary"
                    disabled={!isStripeSettings}
                    startIcon={<Plus />}
                    onClick={handleClickCreateProduct}
                  >
                    Create your first Product / Subscription
                  </Button>
                </>
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
                <PageLink key={idx} number={idx + 1} to={`/plugins/strapi-stripe?page=${idx + 1}`}>
                  Go to page 1
                </PageLink>
              ))}

            <NextLink to={`/plugins/strapi-stripe?page=${page + 1}`}>Go to next page</NextLink>
          </Pagination>
        ) : (
          ''
        )}
      </Flex>
      <br />
      <Box paddingTop={6} paddingBottom={6} paddingLeft={7} paddingRight={7}>
        <SettingLink />
      </Box>
    </>
  );
};

ProductTable.propTypes = {
  products: PropTypes.any.isRequired,
  handleSortAscendingName: PropTypes.any.isRequired,
  handleSortDescendingName: PropTypes.any.isRequired,
  handleEditClick: PropTypes.any.isRequired,
  totalCount: PropTypes.any.isRequired,
  page: PropTypes.any.isRequired,
  sortAscendingName: PropTypes.any.isRequired,
  handleSortAscendingPrice: PropTypes.any.isRequired,
  handleSortDescendingPrice: PropTypes.any.isRequired,
  sortAscendingPrice: PropTypes.any.isRequired,
  handleClickCreateProduct: PropTypes.any.isRequired,
  isStripeSettings: PropTypes.any.isRequired,
};

export default ProductTable;
