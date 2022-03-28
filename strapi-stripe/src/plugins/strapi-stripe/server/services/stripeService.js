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
    let stripe;
    if (stripeSettings.isLiveMode) {
      stripe = new Stripe(stripeSettings.stripeLiveSecKey);
    } else {
      stripe = new Stripe(stripeSettings.stripeTestSecKey);
    }

    const product = await stripe.products.create({
      name: title,
      description: description,
      images: [url],
    });
    const price = await stripe.prices.create({
      unit_amount: productPrice * 100,
      currency: stripeSettings.currency,
      product: product.id,
    });
    const create = await strapi
      .query("plugin::strapi-stripe.strapi-stripe-product")
      .create({
        data: {
          title,
          description,
          price: productPrice,
          productImage: url,
          stripeProductId: product.id,
          stripePriceId: price.id,
        },
        populate: true,
      });

    return create;
  },
  async updateProduct(id, title, url, description, stripeProductId) {
    const pluginStore = strapi.store({
      environment: strapi.config.environment,
      type: "plugin",
      name: "strapi-stripe",
    });
    const stripeSettings = await pluginStore.get({ key: "stripeSetting" });
    let stripe;
    if (stripeSettings.isLiveMode) {
      stripe = new Stripe(stripeSettings.stripeLiveSecKey);
    } else {
      stripe = new Stripe(stripeSettings.stripeTestSecKey);
    }

    await stripe.products.update(stripeProductId, {
      name: title,
      description: description,
      images: [url],
    });
    const updateProductResponse = await strapi
      .query("plugin::strapi-stripe.strapi-stripe-product")
      .update({
        where: { id: id },
        data: {
          title,
          description,
          productImage: url,
        },
      });
    return updateProductResponse;
  },
  async createCheckoutSession(stripePriceId) {
    const pluginStore = strapi.store({
      environment: strapi.config.environment,
      type: "plugin",
      name: "strapi-stripe",
    });
    const stripeSettings = await pluginStore.get({ key: "stripeSetting" });
    let stripe;
    if (stripeSettings.isLiveMode) {
      stripe = new Stripe(stripeSettings.stripeLiveSecKey);
    } else {
      stripe = new Stripe(stripeSettings.stripeTestSecKey);
    }
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: stripePriceId,
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${stripeSettings.checkoutSuccessUrl}?sessionId={CHECKOUT_SESSION_ID}`,
      cancel_url: `${stripeSettings.checkoutCancelUrl}`,
    });
    return session;
  },
});
