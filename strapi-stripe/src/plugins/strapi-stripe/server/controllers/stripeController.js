"use strict";

module.exports = {
  createProduct: async (ctx) => {
    const { title, price, url, description } = ctx.request.body;
    const stripeProductResponse = await strapi
      .plugin("strapi-stripe")
      .service("stripeService")
      .createProduct(title, price, url, description);
    ctx.send(stripeProductResponse, 200);
  },
};
