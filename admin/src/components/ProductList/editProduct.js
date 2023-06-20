// @ts-nocheck
/**
 *
 * This component is the responsible for opening modal when the edit
 * button clicks.
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  ModalLayout,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Button,
  Typography,
  Grid,
  GridItem,
  TextInput,
  Loader,
  Flex,
  Box,
  SingleSelect,
  SingleSelectOption,
  Textarea,
} from '@strapi/design-system/';

import { getStripeProductProductById, uploadFiles } from '../../utils/apiCalls';

const apiToken = process.env.STRAPI_ADMIN_API_TOKEN;

const EditProduct = ({ productId, isEditVisible, handleCloseEdit, handleClickUpdateEdit }) => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [stripeProduct, setStripeProduct] = useState('');
  const [paymentType, setIsPaymentType] = useState('');
  const [paymentInterval, setPaymentInterval] = useState('');
  const [trialPeriodDays, setTrialPeriodDays] = useState('');
  const [image, setImage] = useState({});
  const [upload, setUpload] = useState(false);
  const [uploadMessage, setUploadMessage] = useState('');
  const [productImageId, setProductImageId] = useState('');

  const [error, setError] = useState({
    title: '',
    price: '',
    url: '',
    description: '',
  });

  useEffect(() => {
    (async () => {
      const response = await getStripeProductProductById(productId, apiToken);

      if (response.status === 200 && response.data) {
        const {
          title,
          price,
          productImage,
          description,
          stripeProductId,
          isSubscription,
          interval,
          trialPeriodDays,
        } = response.data;
        setTitle(title);
        setPrice(price);
        setUrl(`${window.location.origin}${productImage?.url}`);
        setProductImageId(productImage?.id);
        setDescription(description);
        setStripeProduct(stripeProductId);

        if (isSubscription) {
          setIsPaymentType('subscription');
        } else {
          setIsPaymentType('oneTime');
        }
        setPaymentInterval(interval);

        setTrialPeriodDays(trialPeriodDays);
      }
    })();
  }, [productId]);

  const handleChange = event => {
    const { name, value } = event.target;

    if (name === 'title') {
      setTitle(value);
      setError({ ...error, title: '' });
    } else if (name === 'price') {
      setPrice(value);
      setError({ ...error, price: '' });
    } else if (name === 'image') {
      setImage(event.target.files);
    }
  };

  const handleUpdateProduct = async () => {
    if (!title && !price && !description) {
      setError({
        ...error,
        title: 'Title is required',
        price: 'Price is required',
        description: 'Description is required',
      });
    } else if (!title) {
      setError({
        ...error,
        title: 'Title is required',
        price: '',
        description: '',
      });
    } else if (!price) {
      setError({
        ...error,
        title: '',
        price: 'Price is required',
        description: '',
      });
    } else if (!description) {
      setError({
        ...error,
        title: '',
        price: '',
        description: 'Description is required',
      });
    } else {
      let imageId;
      let imageUrl;

      if (image.length > 0) {
        setUpload(true);
        setUploadMessage('Uploading Product image');

        const response = await uploadFiles(image);
        const data = await response.json();

        if (data[0].id) {
          imageUrl = `${window.location.origin}${data[0].url}`;
          imageId = data[0].id;
        }
        handleClickUpdateEdit(productId, title, imageUrl, description, imageId, stripeProduct);
      } else {
        handleClickUpdateEdit(productId, title, url, description, productImageId, stripeProduct);
      }

      setUpload(false);
    }
  };

  return (
    <Box>
      {isEditVisible && (
        <ModalLayout onClose={handleCloseEdit} labelledBy="title">
          <ModalHeader>
            <Typography fontWeight="bold" textColor="neutral800" as="h2" id="title" variant="beta">
              Edit {paymentType}
            </Typography>
          </ModalHeader>
          <ModalBody>
            <Grid gap="5">
              <GridItem col={6}>
                <SingleSelect
                  id="select1"
                  label="Payment Type"
                  required
                  clearLabel="Clear the payment type"
                  hint="Ex:One-Time or Subscription"
                  disabled
                  value={paymentType}
                >
                  <SingleSelectOption value="oneTime">One-Time</SingleSelectOption>
                  <SingleSelectOption value="subscription">Subscription</SingleSelectOption>
                </SingleSelect>
              </GridItem>
              <GridItem col={6}>
                <TextInput
                  placeholder="Enter the price of the product"
                  type="number"
                  label="Price"
                  name="price"
                  value={price}
                  onChange={handleChange}
                  error={error.price ? error.price : ''}
                  required
                  disabled
                />
              </GridItem>
              <GridItem col={6}>
                <TextInput
                  label="Title"
                  name="title"
                  value={title}
                  onChange={handleChange}
                  error={error.title ? error.title : ''}
                  required
                />
              </GridItem>

              <GridItem col={6}>
                <Typography variant="pi" fontWeight="bold">
                  Image
                </Typography>

                <Box paddingTop={3}>
                  <input type="file" name="image" onChange={handleChange} accept="image/*" />
                </Box>
              </GridItem>
              <GridItem col={12}>
                <Textarea
                  label="Description"
                  name="description"
                  onChange={({ target }) => {
                    setDescription(target.value);
                    setError({ ...error, description: '' });
                  }}
                  error={error.description ? error.description : ''}
                  required
                >
                  {description}
                </Textarea>
              </GridItem>
              <GridItem col={6}>
                <SingleSelect
                  id="select2"
                  label="Payment Interval"
                  disabled
                  clearLabel="Clear the payment interval "
                  hint="Subscription billing frequency: weekly, monthly or yearly."
                  value={paymentInterval}
                >
                  <SingleSelectOption value="month">Month</SingleSelectOption>
                  <SingleSelectOption value="year">Year</SingleSelectOption>
                  <SingleSelectOption value="week">Week</SingleSelectOption>
                </SingleSelect>
              </GridItem>
              <GridItem col={6}>
                <TextInput
                  label="Trial Period Days"
                  name="trialPeriodDays"
                  disabled
                  hint="Free trial period for the subscription."
                  value={trialPeriodDays || ''}
                />
              </GridItem>
            </Grid>
          </ModalBody>
          <ModalFooter
            startActions={
              <Button onClick={handleCloseEdit} variant="tertiary">
                Cancel
              </Button>
            }
            endActions={
              upload ? (
                <Flex justifyContent="center">
                  <Loader small>Loading......</Loader>
                  <Typography fontWeight="bold" textColor="primary600" as="h2">
                    {uploadMessage || ''}
                  </Typography>
                </Flex>
              ) : (
                <Button variant="default" onClick={handleUpdateProduct}>
                  Update
                </Button>
              )
            }
          />
        </ModalLayout>
      )}
    </Box>
  );
};

EditProduct.propTypes = {
  productId: PropTypes.any.isRequired,
  isEditVisible: PropTypes.bool.isRequired,
  handleCloseEdit: PropTypes.func.isRequired,
  handleClickUpdateEdit: PropTypes.func.isRequired,
};

export default EditProduct;
