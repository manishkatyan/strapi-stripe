import React from "react";
import { Grid, GridItem } from "@strapi/design-system/Grid";
import { Box } from "@strapi/design-system/Box";
import { Link } from "@strapi/design-system/Link";
import ArrowRight from "@strapi/icons/ArrowRight";

const SettingLink = () => {
  return (
    <>
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
          <Grid gap={4}>
            <GridItem col={6} s={12}>
              <Link to="/settings/strapi-stripe" endIcon={<ArrowRight />}>
                Manage Your Stripe Configuration
              </Link>
            </GridItem>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default SettingLink;
