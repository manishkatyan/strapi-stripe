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
  async find(ctx) {
    const res = await strapi
      .query("plugin::strapi-stripe.strapi-stripe-product")
      .findMany({
        orderBy: { title: "asc" },
        populate: true,
      });
    ctx.body = res;
  },
  async sortAscending(ctx) {
    const res = await strapi
      .query("plugin::strapi-stripe.strapi-stripe-product")
      .findMany({ orderBy: { title: "asc" }, populate: true });
    ctx.body = res;
  },
  async sortDescending(ctx) {
    const res = await strapi
      .query("plugin::strapi-stripe.strapi-stripe-product")
      .findMany({ orderBy: { title: "desc" }, populate: true });
    ctx.body = res;
  },
  async findOne(ctx) {
    const { id } = ctx.params;
    const res = await strapi
      .query("plugin::strapi-stripe.strapi-stripe-product")
      .findOne({ where: { id: id } });
    ctx.body = res;
  },
  updateProduct: async (ctx) => {
    const { id } = ctx.params;
    const { title, url, description, stripeProductId } = ctx.request.body;
    const updateProductResponse = await strapi
      .plugin("strapi-stripe")
      .service("stripeService")
      .updateProduct(id, title, url, description, stripeProductId);
    ctx.send(updateProductResponse, 200);
  },

  createCheckoutSession: async (ctx) => {
    const { stripePriceId } = ctx.request.body;
    const checkoutSessionResponse = await strapi
      .plugin("strapi-stripe")
      .service("stripeService")
      .createCheckoutSession(stripePriceId);
    ctx.send(checkoutSessionResponse, 200);
  },
};
