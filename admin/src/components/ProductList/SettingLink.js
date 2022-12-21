import React, { useEffect, useState } from 'react';
import { Grid, GridItem } from '@strapi/design-system/Grid';
import { Box } from '@strapi/design-system/Box';
import { Link } from '@strapi/design-system/Link';
import { Typography } from '@strapi/design-system/Typography';
import ArrowRight from '@strapi/icons/ArrowRight';
import pluginPkg from '../../../../package.json';
import { getGithubVersion } from '../../utils/apiCalls';
import { supportEmail } from './constant';

const SettingLink = () => {
  const [isNewVersionAvailable, setIsNewVersionAvailable] = useState(false);

  useEffect(() => {
    (async () => {
      // call github api to get the latest version of the plugin
      const response = await getGithubVersion();

      // compare the latest version with the current version
      if (response.tag_name > pluginPkg.version) {
        setIsNewVersionAvailable(true);
      }
    })();
  }, []);

  return (
    <Box>
      {
        // if new version is available then show the message
        isNewVersionAvailable ? (
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
                <GridItem col={4} s={12}>
                  <Link to="/settings/strapi-stripe" endIcon={<ArrowRight />}>
                    Manage Your Stripe Configuration
                  </Link>
                </GridItem>
                <GridItem col={4} s={12}>
                  <Typography variant="pi">
                    Need help? Contact us at : {supportEmail.email}
                  </Typography>
                </GridItem>
                <GridItem col={4} s={12}>
                  <Typography variant="pi">
                    A new version is available{' '}
                    <a
                      href="https://www.npmjs.com/package/strapi-stripe"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      click here
                    </a>{' '}
                    &nbsp;to know more.{' '}
                  </Typography>
                </GridItem>
              </Grid>
            </Box>
          </Box>
        ) : (
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
                    Need help? Contact us at : {supportEmail.email}
                  </Typography>
                </GridItem>
              </Grid>
            </Box>
          </Box>
        )
      }
    </Box>
  );
};

export default SettingLink;
