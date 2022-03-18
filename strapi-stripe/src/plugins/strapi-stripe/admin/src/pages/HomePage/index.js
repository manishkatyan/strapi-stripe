/*
 *
 * HomePage
 *
 */

import React, { memo } from "react";
import ProductList from "../../components/ProductList";
// import PropTypes from 'prop-types';

const HomePage = () => {
  return (
    <div>
      <ProductList />
    </div>
  );
};

export default memo(HomePage);
