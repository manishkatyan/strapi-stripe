/**
 *
 * UI Elements of Stripe Configuration
 *
 */

import React from "react";
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

const Configuration = () => {
  return (
    <Main>
      <SettingsPageTitle name="Stripe" />
      <HeaderLayout
        title="Stripe Configuration"
        primaryAction={
          <Button
            type="submit"
            // loading={isSubmitting}
            // onClick={handleSubmit}
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
              <GridItem col={6} s={12}>
                <Box paddingTop={5} paddingBottom={2}>
                  <TextInput
                    name="stripeLivePubKey"
                    label="Live Stripe Publishable Key"
                    placeholder="Live Stripe Publishable Key"
                    // value={url}
                    // error={errorUrl ? errorUrl : ""}
                    // onChange={handleChangeUrl}
                  />
                </Box>
              </GridItem>
              <GridItem col={6} s={12}>
                <Box paddingTop={5} paddingBottom={2}>
                  <TextInput
                    name="stripeLiveSecKey"
                    placeholder="Live Stripe Secret Key"
                    label="Live Stripe Secret Key"
                    // value={secret}
                    // error={errorSecret ? errorSecret : ""}
                    // onChange={handleChangeSecret}
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
                    // value={url}
                    // error={errorUrl ? errorUrl : ""}
                    // onChange={handleChangeUrl}
                  />
                </Box>
              </GridItem>
              <GridItem col={6} s={12}>
                <Box paddingTop={5} paddingBottom={2}>
                  <TextInput
                    name="stripeTestSecKey"
                    placeholder="Test Stripe Secret Key"
                    label="Test Stripe Secret Key"
                    // value={secret}
                    // error={errorSecret ? errorSecret : ""}
                    // onChange={handleChangeSecret}
                  />
                </Box>
              </GridItem>
            </Grid>
          </Box>
        </Box>
      </ContentLayout>
    </Main>
  );
};

export default Configuration;
