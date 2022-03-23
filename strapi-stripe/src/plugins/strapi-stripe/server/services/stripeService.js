"use strict";

const Stripe = require("stripe");

module.exports = ({ strapi }) => ({
  async createProduct(title, productPrice, url, description) {
    const pluginStore = strapi.store({
      environment: strapi.config.environment,
      type: "plugin",
      name: "strapi-stripe",
    });
    const stripeSettings = await pluginStore.get({ key: "stripeSetting" });

    if (stripeSettings.isLiveMode) {
      const stripe = new Stripe(stripeSettings.stripeLiveSecKey);

      const product = await stripe.products.create({
        name: title,
        description: description,
        images: [url],
      });
      const price = await stripe.prices.create({
        unit_amount: productPrice,
        currency: stripeSettings,
        product: product.id,
      });
    } else {
      const stripe = new Stripe(stripeSettings.stripeTestSecKey);

      // console.log("in stripe", stripe);
      const product = await stripe.products.create({
        name: title,
        description: description,
        images: [url],
      });
      const price = await stripe.prices.create({
        unit_amount: productPrice,
        currency: stripeSettings.currency,
        product: product.id,
      });

      console.log("test stripe", product, price);
    }
  },
});
