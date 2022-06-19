import React from 'react';
import { Grid, GridItem } from '@strapi/design-system/Grid';
import { Box } from '@strapi/design-system/Box';
import { Link } from '@strapi/design-system/Link';
import { Typography } from '@strapi/design-system/Typography';
import ArrowRight from '@strapi/icons/ArrowRight';

const SettingLink = () => {
  return (
    <Box>
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
            <GridItem col={6} s={12}>
              <Typography variant="pi">
                Need help? Contact us at : support@higheredlab.com
              </Typography>
            </GridItem>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default SettingLink;
