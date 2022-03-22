"use strict";

const productSchema = require("./product");

module.exports = {
  "strapi-stripe-product": { schema: productSchema }, //// should re-use the singularName of the content-type
};
