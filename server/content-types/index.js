'use strict';

const productSchema = require('./product');
const paymentSchema = require('./payment');

module.exports = {
  'strapi-stripe-product': { schema: productSchema }, //// should re-use the singularName of the content-type
  'strapi-stripe-payment': { schema: paymentSchema },
};
