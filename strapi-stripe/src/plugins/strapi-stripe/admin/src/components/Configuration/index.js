/**
 *
 * UI Elements of Stripe Configuration
 *
 */

import React, { useState } from "react";
import { SettingsPageTitle } from "@strapi/helper-plugin";
import Check from "@strapi/icons/Check";
import { Box } from "@strapi/design-system/Box";
import { Button } from "@strapi/design-system/Button";
import { Grid, GridItem } from "@strapi/design-system/Grid";
import { HeaderLayout, ContentLayout } from "@strapi/design-system/Layout";
import { Main } from "@strapi/design-system/Main";
import { TextInput } from "@strapi/design-system/TextInput";
import { Typography } from "@strapi/design-system/Typography";
import Information from "@strapi/icons/Information";
import CheckCircle from "@strapi/icons/CheckCircle";
import { Alert } from "@strapi/design-system/Alert";
import { Checkbox } from "@strapi/design-system/Checkbox";
import { Select, Option } from "@strapi/design-system/Select";
import { Link } from "@strapi/design-system/Link";
import currencies from "./constant";

const Configuration = () => {
  // const [isLiveMode, setIsLiveMode] = useState(false);
  // const [stripeCurrency, setStripeCurrency] = useState();
  const [stripeConfiguration, setStripeConfiguration] = useState({
    isLiveMode: false,
    stripeLivePubKey: "",
    stripeLiveSecKey: "",
    stripeTestPubKey: "",
    stripeTestSecKey: "",
    checkoutSuccessUrl: "",
    currency: undefined,
    paymentButtonText: "",
  });

  const [error, setError] = useState({
    stripeLivePubKey: "",
    stripeLiveSecKey: "",
    stripeTestPubKey: "",
    stripeTestSecKey: "",
    checkoutSuccessUrl: "",
    currency: "",
    paymentButtonText: "",
  });

  const handleChangeCurrency = (value) => {
    setStripeConfiguration({ ...stripeConfiguration, currency: value });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setStripeConfiguration({ ...stripeConfiguration, [name]: value });
  };

  const handleSubmit = () => {
    if (
      !stripeLivePubKey &&
      !stripeLiveSecKey &&
      !stripeTestPubKey &&
      !stripeTestSecKey &&
      !checkoutSuccessUrl &&
      !currency &&
      !paymentButtonText
    ) {
      setError({
        ...error,
        stripeLivePubKey: "Live Stripe Publishable Key is required",
        stripeLiveSecKey: "Live Stripe Secret Key is required",
        stripeTestPubKey: "Test Stripe Publishable Key is required",
        stripeTestSecKey: "Test Stripe Secret Key is required",
        checkoutSuccessUrl: "Checkout Success Page Url is required",
        currency: "Choose your Currency is required",
        paymentButtonText: "Payment Button Text is required",
      });
    }
    console.log(stripeConfiguration);
  };

  return (
    <Main>
      <SettingsPageTitle name="Stripe" />
      <HeaderLayout
        title="Stripe Configuration"
        primaryAction={
          <Button
            type="submit"
            // loading={isSubmitting}
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
          {/* {showAlert ? (
            <Alert
              closeLabel="Close alert"
              title="BigBlueButton"
              variant="success"
              onClose={() => {
                setShowAlert(false);
              }}
            >
              url and secret saved successfully.
            </Alert>
          ) : (
            ""
          )} */}
        </Box>
        <Box shadow="tableShadow" background="neutral0" padding={3}>
          <Box>
            <Typography variant="delta">Credentials</Typography>
          </Box>
          <Box paddingBottom={2}>
            <Typography variant="omega">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Typography>
          </Box>
          <Box paddingTop={2} paddingLeft={2} paddingRight={2}>
            <Grid gap={5}>
              <GridItem col={12} s={12}>
                <Box paddingTop={3}>
                  <Checkbox
                    hint="Check this to run the transaction in live mode. When unchecked it will run in test mode."
                    onValueChange={(value) =>
                      setStripeConfiguration({
                        ...stripeConfiguration,
                        isLiveMode: value,
                      })
                    }
                    value={stripeConfiguration.isLiveMode}
                  >
                    Live Mode
                  </Checkbox>
                </Box>
              </GridItem>

              <GridItem col={6} s={12}>
                <Box paddingTop={2} paddingBottom={2}>
                  <TextInput
                    name="stripeLivePubKey"
                    label="Live Stripe Publishable Key"
                    placeholder="Live Stripe Publishable Key"
                    required
                    value={stripeConfiguration.stripeLivePubKey}
                    // error={errorUrl ? errorUrl : ""}
                    onChange={handleChange}
                  />
                </Box>
              </GridItem>
              <GridItem col={6} s={12}>
                <Box paddingTop={2} paddingBottom={2}>
                  <TextInput
                    name="stripeLiveSecKey"
                    placeholder="Live Stripe Secret Key"
                    label="Live Stripe Secret Key"
                    required
                    value={stripeConfiguration.stripeLiveSecKey}
                    // error={errorSecret ? errorSecret : ""}
                    onChange={handleChange}
                  />
                </Box>
              </GridItem>
            </Grid>
          </Box>
          <Box paddingBottom={2} paddingLeft={2} paddingRight={2}>
            <Grid gap={5}>
              <GridItem col={6} s={12}>
                <Box paddingTop={5} paddingBottom={2}>
                  <TextInput
                    name="stripeTestPubKey"
                    label="Test Stripe Publishable Key"
                    placeholder="Test Stripe Publishable Key"
                    required
                    value={stripeConfiguration.stripeTestPubKey}
                    // error={errorUrl ? errorUrl : ""}
                    onChange={handleChange}
                  />
                </Box>
              </GridItem>
              <GridItem col={6} s={12}>
                <Box paddingTop={5} paddingBottom={2}>
                  <TextInput
                    name="stripeTestSecKey"
                    placeholder="Test Stripe Secret Key"
                    label="Test Stripe Secret Key"
                    required
                    value={stripeConfiguration.stripeTestSecKey}
                    // error={errorSecret ? errorSecret : ""}
                    onChange={handleChange}
                  />
                </Box>
              </GridItem>
            </Grid>
          </Box>
        </Box>
        <br />
        <Box shadow="tableShadow" background="neutral0" padding={3}>
          <Box>
            <Typography variant="delta">Global Setting</Typography>
          </Box>
          <Box paddingBottom={2}>
            <Typography variant="omega">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Typography>
          </Box>
          <Box paddingTop={2} paddingLeft={2} paddingRight={2}>
            <Grid gap={5}>
              <GridItem col={6} s={12}>
                <Box paddingTop={2} paddingBottom={2}>
                  <TextInput
                    name="checkoutSuccessUrl"
                    label="Checkout Success Page Url"
                    placeholder="Checkout Success Page Url"
                    required
                    value={stripeConfiguration.checkoutSuccessUrl}
                    // error={errorUrl ? errorUrl : ""}
                    onChange={handleChange}
                  />
                </Box>
              </GridItem>
              <GridItem col={6} s={12}>
                <Box paddingTop={2} paddingBottom={2}>
                  <Select
                    id="select1"
                    label="Choose your Currency"
                    required
                    placeholder="Choose your Currency"
                    clearLabel="Clear the Currency"
                    onClear={() =>
                      setStripeConfiguration({
                        ...stripeConfiguration,
                        currency: undefined,
                      })
                    }
                    onChange={(value) => handleChangeCurrency(value)}
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
                <Box paddingTop={2} paddingBottom={2}>
                  <TextInput
                    name="paymentButtonText"
                    label="Payment Button Text"
                    placeholder="Payment Button Text"
                    required
                    value={stripeConfiguration.paymentButtonText}
                    // error={errorUrl ? errorUrl : ""}
                    onChange={handleChange}
                  />
                </Box>
              </GridItem>
            </Grid>
          </Box>
        </Box>
        <br />
        <Box shadow="tableShadow" background="neutral0" padding={3}>
          <Box>
            <Typography variant="delta">Email Settings</Typography>
          </Box>
          <Box paddingBottom={2}>
            <Typography variant="omega">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Typography>
          </Box>
          <Box paddingTop={2} paddingLeft={2} paddingRight={2}>
            <Grid gap={5}>
              <GridItem col={6} s={12}>
                <Link
                  href="https://support.stripe.com/questions/set-up-account-email-notifications"
                  isExternal
                >
                  Payment notification - Seller
                </Link>
              </GridItem>
              <GridItem col={6} s={12}>
                <Link href=" https://stripe.com/docs/receipts" isExternal>
                  Payment notification - Buyer
                </Link>
              </GridItem>
            </Grid>
          </Box>
        </Box>
      </ContentLayout>
    </Main>
  );
};

export default Configuration;
