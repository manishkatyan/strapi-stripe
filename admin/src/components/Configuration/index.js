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
import { supportEmail } from '../ProductList/constant';
import {
  saveStripeConfiguration,
  getStripeConfiguration,
  getGithubVersion,
} from '../../utils/apiCalls';
import Banner from './banner';
import pluginPkg from '../../../../package.json';
import WarningIcon from './warningIcon';

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
    callbackUrl: '',
    paymentMethods: ['card'],
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

  const [isNewVersionAvailable, setIsNewVersionAvailable] = useState(false);

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
          callbackUrl,
          paymentMethods,
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
          callbackUrl,
          paymentMethods,
        });
      }
      // call github api to get the latest version of the plugin
      const data = await getGithubVersion();

      // compare the latest version with the current version
      if (data.tag_name > pluginPkg.version) {
        setIsNewVersionAvailable(true);
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

        <Box paddingBottom={4}>
          <Banner
            leftChild={
              <img
                src="https://higheredlab.com/wp-content/uploads/hel_icon.png"
                alt="hel-logo"
                height={35}
                width={40}
              />
            }
            rightChild={
              <Typography variant="omega">
                Facing technical issues?{' '}
                <a
                  href="https://github.com/manishkatyan/strapi-stripe/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Raise an issue on Github
                </a>
                &nbsp;or email at {supportEmail.email}
              </Typography>
            }
            leftChildCol={2}
            rightChildCol={10}
          />
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
              <GridItem col={6} s={12}>
                <Box paddingBottom={2}>
                  <TextInput
                    name="callbackUrl"
                    label="Webhook URL"
                    value={stripeConfiguration.callbackUrl}
                    onChange={handleChange}
                    hint="The response from Stripe will be posted to this URL."
                  />
                </Box>
              </GridItem>
              <GridItem col={6} s={12}>
                <Select
                  id="paymentMethod"
                  label="Choose Payment Methods"
                  onClear={() =>
                    setStripeConfiguration({ ...stripeConfiguration, paymentMethods: [] })
                  }
                  value={
                    stripeConfiguration.paymentMethods ? stripeConfiguration.paymentMethods : []
                  }
                  onChange={values =>
                    setStripeConfiguration({ ...stripeConfiguration, paymentMethods: values })
                  }
                  multi
                  withTags
                >
                  <Option value="card">Credit Card/Debit Card</Option>
                  <Option value="sepa_debit"> SEPA Direct Debit</Option>
                  <Option value="us_bank_account">ACH Direct Debit</Option>
                  <Option value="alipay">Alipay</Option>
                  <Option value="klarna">Klarna</Option>
                  <Option value="ideal">iDEAL</Option>
                  <Option value="sofort">SOFORT</Option>
                </Select>
              </GridItem>
            </Grid>
          </Box>
        </Box>
        <br />

        <Banner
          leftChild={
            <Link
              href="https://support.stripe.com/questions/set-up-account-email-notifications"
              isExternal
            >
              Setup seller notification
            </Link>
          }
          rightChild={
            <Link href=" https://stripe.com/docs/receipts" isExternal>
              Setup buyer notification
            </Link>
          }
          rightChildCol={6}
          leftChildCol={6}
          header="Email Settings"
          isHeader
        />

        <br />
        {isNewVersionAvailable ? (
          <>
            <Banner
              leftChild={<WarningIcon />}
              rightChild={
                <Typography variant="omega">
                  {' '}
                  A new version is available{' '}
                  <a
                    href="https://www.npmjs.com/package/strapi-stripe"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    click here
                  </a>{' '}
                  to know more.{' '}
                </Typography>
              }
              leftChildCol={2}
              rightChildCol={10}
            />

            <br />
          </>
        ) : null}

        <Banner
          leftChild={
            <img
              src="https://res.cloudinary.com/dvotpztje/image/upload/v1671441868/paypal-logo_tifrf5.webp"
              alt="paypal"
              height={25}
              width={80}
            />
          }
          rightChild={
            <Typography variant="omega">
              Want to use Paypal?{' '}
              <a
                href="https://market.strapi.io/plugins/strapi-paypal"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download our free plugin
              </a>
              .
            </Typography>
          }
          leftChildCol={2}
          rightChildCol={10}
        />
      </ContentLayout>
    </Main>
  );
};

export default Configuration;
