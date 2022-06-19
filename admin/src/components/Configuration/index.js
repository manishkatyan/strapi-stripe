/* eslint-disable react/no-array-index-key */
/* eslint-disable react-hooks/exhaustive-deps */
/**
 *
 * UI Elements of Stripe Configuration
 *
 */

import React, { useState, useEffect } from 'react';
import { SettingsPageTitle } from '@strapi/helper-plugin';
import Check from '@strapi/icons/Check';
import { Box } from '@strapi/design-system/Box';
import { Button } from '@strapi/design-system/Button';
import { Grid, GridItem } from '@strapi/design-system/Grid';
import { HeaderLayout, ContentLayout } from '@strapi/design-system/Layout';
import { Main } from '@strapi/design-system/Main';
import { TextInput } from '@strapi/design-system/TextInput';
import { Typography } from '@strapi/design-system/Typography';
import { Alert } from '@strapi/design-system/Alert';
import { Select, Option } from '@strapi/design-system/Select';
import { Link } from '@strapi/design-system/Link';
import { Switch } from '@strapi/design-system/Switch';
import { Flex } from '@strapi/design-system/Flex';
import currencies from './constant';
import { saveStripeConfiguration, getStripeConfiguration } from '../../utils/apiCalls';

const Configuration = () => {
  const [stripeConfiguration, setStripeConfiguration] = useState({
    isLiveMode: false,
    stripeLivePubKey: '',
    stripeLiveSecKey: '',
    stripeTestPubKey: '',
    stripeTestSecKey: '',
    checkoutSuccessUrl: '',
    checkoutCancelUrl: '',
    currency: undefined,
  });

  const [showAlert, setShowAlert] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [error, setError] = useState({
    stripeLivePubKey: '',
    stripeLiveSecKey: '',
    stripeTestPubKey: '',
    stripeTestSecKey: '',
    checkoutSuccessUrl: '',
    checkoutCancelUrl: '',
    currency: '',
  });

  useEffect(() => {
    (async () => {
      const response = await getStripeConfiguration();

      if (response.data?.response) {
        const {
          isLiveMode,
          stripeLivePubKey,
          stripeLiveSecKey,
          stripeTestPubKey,
          stripeTestSecKey,
          checkoutSuccessUrl,
          checkoutCancelUrl,
          currency,
        } = response.data.response;
        setStripeConfiguration({
          ...stripeConfiguration,
          isLiveMode,
          stripeLivePubKey,
          stripeLiveSecKey,
          stripeTestPubKey,
          stripeTestSecKey,
          checkoutSuccessUrl,
          checkoutCancelUrl,
          currency,
        });
      }
    })();
  }, []);

  const handleChangeCurrency = value => {
    setStripeConfiguration({ ...stripeConfiguration, currency: value });
    setError({ ...error, currency: '' });
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setStripeConfiguration({ ...stripeConfiguration, [name]: value });

    if (name === 'stripeLivePubKey') {
      setError({ ...error, stripeLivePubKey: '' });
    } else if (name === 'stripeLiveSecKey') {
      setError({ ...error, stripeLiveSecKey: '' });
    } else if (name === 'stripeTestPubKey') {
      setError({ ...error, stripeTestPubKey: '' });
    } else if (name === 'stripeTestSecKey') {
      setError({ ...error, stripeTestSecKey: '' });
    } else if (name === 'checkoutSuccessUrl') {
      setError({ ...error, checkoutSuccessUrl: '' });
    } else if (name === 'checkoutCancelUrl') {
      setError({ ...error, checkoutCancelUrl: '' });
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    if (
      !stripeConfiguration.stripeLivePubKey &&
      !stripeConfiguration.stripeLiveSecKey &&
      !stripeConfiguration.stripeTestPubKey &&
      !stripeConfiguration.stripeTestSecKey &&
      !stripeConfiguration.checkoutSuccessUrl &&
      !stripeConfiguration.checkoutCancelUrl &&
      !stripeConfiguration.currency
    ) {
      setError({
        ...error,
        stripeLivePubKey: 'Live Stripe Publishable Key is required',
        stripeLiveSecKey: 'Live Stripe Secret Key is required',
        stripeTestPubKey: 'Test Stripe Publishable Key is required',
        stripeTestSecKey: 'Test Stripe Secret Key is required',
        checkoutSuccessUrl: 'Checkout Success Page URL is required',
        checkoutCancelUrl: 'Checkout Cancel Page URL is required',
        currency: 'Currency is required',
      });
      setIsSubmitting(false);
    } else if (!stripeConfiguration.stripeLivePubKey) {
      setError({
        ...error,
        stripeLivePubKey: 'Live Stripe Publishable Key is required',
      });
      setIsSubmitting(false);
    } else if (!stripeConfiguration.stripeLiveSecKey) {
      setError({
        ...error,
        stripeLiveSecKey: 'Live Stripe Secret Key is required',
      });
      setIsSubmitting(false);
    } else if (!stripeConfiguration.stripeTestPubKey) {
      setError({
        ...error,
        stripeTestPubKey: 'Test Stripe Publishable Key is required',
      });
      setIsSubmitting(false);
    } else if (!stripeConfiguration.stripeTestSecKey) {
      setError({
        ...error,
        stripeTestSecKey: 'Test Stripe Secret Key is required',
      });
      setIsSubmitting(false);
    } else if (!stripeConfiguration.checkoutSuccessUrl) {
      setError({
        ...error,
        checkoutSuccessUrl: 'Checkout Success Page URL is required',
      });
      setIsSubmitting(false);
    } else if (!stripeConfiguration.checkoutCancelUrl) {
      setError({
        ...error,
        checkoutCancelUrl: 'Checkout Cancel Page URL is required',
      });
      setIsSubmitting(false);
    } else if (!stripeConfiguration.currency) {
      setError({
        ...error,
        currency: 'Currency is required',
      });
      setIsSubmitting(false);
    } else {
      const response = await saveStripeConfiguration(stripeConfiguration);

      if (response.data.ok) {
        setShowAlert(true);
      }
      setIsSubmitting(false);
    }
  };

  return (
    <Main>
      <SettingsPageTitle name="Stripe" />
      <HeaderLayout
        title="Stripe Configuration"
        primaryAction={
          <Button
            type="submit"
            loading={isSubmitting}
            onClick={handleSubmit}
            startIcon={<Check />}
            size="L"
          >
            Save
          </Button>
        }
      />

      <ContentLayout>
        <Box paddingBottom={2}>
          {showAlert ? (
            <Alert
              closeLabel="Close alert"
              title="Stripe configuration"
              variant="success"
              onClose={() => {
                setShowAlert(false);
              }}
            >
              saved successfully.
            </Alert>
          ) : (
            ''
          )}
        </Box>
        <Box
          shadow="tableShadow"
          background="neutral0"
          paddingTop={6}
          paddingLeft={7}
          paddingRight={7}
          paddingBottom={6}
          hasRadius
        >
          <Box>
            <Typography variant="delta">Credentials</Typography>
          </Box>
          <Box paddingBottom={2} paddingTop={1}>
            <Typography variant="omega">
              Configure your stripe publishable and secret Key.
            </Typography>
          </Box>
          <Box paddingTop={2}>
            <Grid gap={4}>
              <GridItem col={12} s={12}>
                <Box paddingTop={3}>
                  <Flex alignItems="center">
                    <Box paddingRight={4}>
                      <Typography variant="delta">Live Mode</Typography>
                    </Box>

                    <Switch
                      label="Live Mode"
                      visibleLabels
                      offLabel="Stripe is in test mode"
                      onLabel="Stripe is ready to accept payment"
                      selected={stripeConfiguration.isLiveMode}
                      onChange={() => {
                        setStripeConfiguration({
                          ...stripeConfiguration,
                          isLiveMode: !stripeConfiguration.isLiveMode,
                        });
                      }}
                    />
                  </Flex>
                </Box>
              </GridItem>

              <GridItem col={6} s={12}>
                <Box paddingTop={2} paddingBottom={3}>
                  <TextInput
                    name="stripeLivePubKey"
                    label="Live Stripe Publishable Key"
                    placeholder="Live Stripe Publishable Key"
                    required
                    value={stripeConfiguration.stripeLivePubKey}
                    error={error.stripeLivePubKey ? error.stripeLivePubKey : ''}
                    onChange={handleChange}
                  />
                </Box>
              </GridItem>
              <GridItem col={6} s={12}>
                <Box paddingTop={2} paddingBottom={3}>
                  <TextInput
                    name="stripeLiveSecKey"
                    placeholder="Live Stripe Secret Key"
                    label="Live Stripe Secret Key"
                    required
                    value={stripeConfiguration.stripeLiveSecKey}
                    error={error.stripeLiveSecKey ? error.stripeLiveSecKey : ''}
                    onChange={handleChange}
                  />
                </Box>
              </GridItem>
              <GridItem col={6} s={12}>
                <Box paddingBottom={2}>
                  <TextInput
                    name="stripeTestPubKey"
                    placeholder="Test Stripe Publishable Key"
                    label="Test Stripe Publishable Key"
                    required
                    value={stripeConfiguration.stripeTestPubKey}
                    error={error.stripeTestPubKey ? error.stripeTestPubKey : ''}
                    onChange={handleChange}
                  />
                </Box>
              </GridItem>
              <GridItem col={6} s={12}>
                <Box paddingBottom={2}>
                  <TextInput
                    name="stripeTestSecKey"
                    placeholder="Test Stripe Secret Key"
                    label="Test Stripe Secret Key"
                    required
                    value={stripeConfiguration.stripeTestSecKey}
                    error={error.stripeTestSecKey ? error.stripeTestSecKey : ''}
                    onChange={handleChange}
                  />
                </Box>
              </GridItem>
            </Grid>
          </Box>
        </Box>
        <br />
        <Box
          shadow="tableShadow"
          background="neutral0"
          paddingTop={6}
          paddingLeft={7}
          paddingRight={7}
          paddingBottom={6}
          hasRadius
        >
          <Box paddingBottom={2}>
            <Typography variant="delta">Global Setting</Typography>
          </Box>

          <Box paddingTop={2}>
            <Grid gap={4}>
              <GridItem col={6} s={12}>
                <Box paddingTop={2} paddingBottom={2}>
                  <TextInput
                    name="checkoutSuccessUrl"
                    label="Payment Success Page URL"
                    required
                    value={stripeConfiguration.checkoutSuccessUrl}
                    error={error.checkoutSuccessUrl ? error.checkoutSuccessUrl : ''}
                    onChange={handleChange}
                    hint="Redirects to the success page after the  payment successful"
                  />
                </Box>
              </GridItem>
              <GridItem col={6} s={12}>
                <Box paddingTop={2} paddingBottom={2}>
                  <TextInput
                    name="checkoutCancelUrl"
                    label="Payment Cancel Page URL"
                    required
                    value={stripeConfiguration.checkoutCancelUrl}
                    error={error.checkoutCancelUrl ? error.checkoutCancelUrl : ''}
                    onChange={handleChange}
                    hint="Redirects to the cancel page after the  payment failed"
                  />
                </Box>
              </GridItem>
              <GridItem col={6} s={12}>
                <Box paddingBottom={2}>
                  <Select
                    id="select1"
                    label="Choose Currency"
                    required
                    placeholder="Choose Currency"
                    clearLabel="Clear the Currency"
                    error={error.currency ? error.currency : ''}
                    onClear={() =>
                      setStripeConfiguration({
                        ...stripeConfiguration,
                        currency: undefined,
                      })
                    }
                    onChange={value => handleChangeCurrency(value)}
                    value={stripeConfiguration.currency}
                  >
                    {currencies &&
                      currencies.map((currency, idx) => (
                        <Option value={currency.value} key={idx}>
                          {currency.label}
                        </Option>
                      ))}
                  </Select>
                </Box>
              </GridItem>
            </Grid>
          </Box>
        </Box>
        <br />
        <Box
          shadow="tableShadow"
          background="neutral0"
          paddingTop={6}
          paddingLeft={7}
          paddingRight={7}
          paddingBottom={6}
          hasRadius
        >
          <Box paddingBottom={2}>
            <Typography variant="delta">Email Settings</Typography>
          </Box>

          <Box paddingTop={2}>
            <Grid gap={4}>
              <GridItem col={6} s={12}>
                <Link
                  href="https://support.stripe.com/questions/set-up-account-email-notifications"
                  isExternal
                >
                  Setup seller notification
                </Link>
              </GridItem>
              <GridItem col={6} s={12}>
                <Link href=" https://stripe.com/docs/receipts" isExternal>
                  Setup buyer notification
                </Link>
              </GridItem>
            </Grid>
          </Box>
        </Box>
        <br />
        <Box
          shadow="tableShadow"
          background="neutral0"
          paddingTop={6}
          paddingLeft={7}
          paddingRight={7}
          paddingBottom={6}
          hasRadius
        >
          <Box paddingTop={2}>
            <Grid gap={4}>
              <GridItem col={6} s={12}>
                <Typography variant="pi">
                  Need help? Contact us at : support@higheredlab.com
                </Typography>
              </GridItem>
            </Grid>
          </Box>
        </Box>
      </ContentLayout>
    </Main>
  );
};

export default Configuration;
