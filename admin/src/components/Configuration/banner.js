import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@strapi/design-system/Box';
import { Grid, GridItem } from '@strapi/design-system/Grid';
import { Typography } from '@strapi/design-system/Typography';

const Banner = ({ leftChild, rightChild, leftChildCol, rightChildCol, header, isHeader }) => {
  return (
    <Box
      shadow="tableShadow"
      background="neutral0"
      paddingTop={6}
      paddingLeft={7}
      paddingRight={7}
      paddingBottom={6}
      hasRadius
    >
      {isHeader ? (
        <Box paddingBottom={2}>
          <Typography variant="delta">{header}</Typography>
        </Box>
      ) : null}

      <Box paddingTop={2}>
        <Grid gap={4}>
          <GridItem col={leftChildCol} s={12}>
            {leftChild}
          </GridItem>
          <GridItem col={rightChildCol} s={12}>
            {rightChild}
          </GridItem>
        </Grid>
      </Box>
    </Box>
  );
};

// Props validation
Banner.propTypes = {
  leftChild: PropTypes.any,
  rightChild: PropTypes.any,
  leftChildCol: PropTypes.number.isRequired,
  rightChildCol: PropTypes.number.isRequired,
  header: PropTypes.string,
  isHeader: PropTypes.bool,
};

// Default props
Banner.defaultProps = {
  header: '',
  isHeader: false,
  leftChild: null,
  rightChild: null,
};

export default Banner;
