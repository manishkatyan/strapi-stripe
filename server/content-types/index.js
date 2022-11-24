'use strict';

const productSchema = require('./product');
const paymentSchema = require('./payment');

module.exports = {
  'ss-product': { schema: productSchema }, //// should re-use the singularName of the content-type
  'ss-payment': { schema: paymentSchema },
};
