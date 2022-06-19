'use strict';

const Stripe = require('stripe');

module.exports = ({ strapi }) => ({
  async createProduct(
    title,
    productPrice,
    imageId,
    imageUrl,
    description,
    isSubscription,
    paymentInterval,
    trialPeriodDays
  ) {
    const pluginStore = strapi.store({
      environment: strapi.config.environment,
      type: 'plugin',
      name: 'strapi-stripe',
    });

    const stripeSettings = await pluginStore.get({ key: 'stripeSetting' });
    let stripe;
    if (stripeSettings.isLiveMode) {
      stripe = new Stripe(stripeSettings.stripeLiveSecKey);
    } else {
      stripe = new Stripe(stripeSettings.stripeTestSecKey);
    }

    const product = await stripe.products.create({
      name: title,
      description,
      images: [imageUrl],
    });

    const createproduct = async (productId, priceId, planId) => {
      const create = await strapi.query('plugin::strapi-stripe.strapi-stripe-product').create({
        data: {
          title,
          description,
          price: productPrice,
          currency: stripeSettings.currency,
          productImage: imageId,
          isSubscription,
          interval: paymentInterval,
          trialPeriodDays,
          stripeProductId: productId,
          stripePriceId: priceId,
          stripePlanId: planId,
        },
        populate: true,
      });
      return create;
    };

    if (isSubscription) {
      const plan = await stripe.plans.create({
        amount: productPrice * 100,
        currency: stripeSettings.currency,
        interval: paymentInterval,
        product: product.id,
        trial_period_days: trialPeriodDays,
      });
      createproduct(product.id, '', plan.id);
    } else {
      const price = await stripe.prices.create({
        unit_amount: productPrice * 100,
        currency: stripeSettings.currency,
        product: product.id,
      });
      createproduct(product.id, price.id, '');
    }
    return product;
  },
  async updateProduct(id, title, url, description, productImage, stripeProductId) {
    const pluginStore = strapi.store({
      environment: strapi.config.environment,
      type: 'plugin',
      name: 'strapi-stripe',
    });
    const stripeSettings = await pluginStore.get({ key: 'stripeSetting' });
    let stripe;
    if (stripeSettings.isLiveMode) {
      stripe = new Stripe(stripeSettings.stripeLiveSecKey);
    } else {
      stripe = new Stripe(stripeSettings.stripeTestSecKey);
    }

    await stripe.products.update(stripeProductId, {
      name: title,
      description,
      images: [url],
    });
    const updateProductResponse = await strapi
      .query('plugin::strapi-stripe.strapi-stripe-product')
      .update({
        where: { id },
        data: {
          title,
          description,
          productImage,
        },
      });
    return updateProductResponse;
  },
  async createCheckoutSession(stripePriceId, stripePlanId, isSubscription, productId, productName) {
    const pluginStore = strapi.store({
      environment: strapi.config.environment,
      type: 'plugin',
      name: 'strapi-stripe',
    });
    const stripeSettings = await pluginStore.get({ key: 'stripeSetting' });
    let stripe;
    if (stripeSettings.isLiveMode) {
      stripe = new Stripe(stripeSettings.stripeLiveSecKey);
    } else {
      stripe = new Stripe(stripeSettings.stripeTestSecKey);
    }
    let priceId;
    let paymentMode;
    if (isSubscription) {
      priceId = stripePlanId;
      paymentMode = 'subscription';
    } else {
      priceId = stripePriceId;
      paymentMode = 'payment';
    }
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: priceId,
          quantity: 1,
        },
      ],
      mode: paymentMode,
      payment_method_types: ['card'],
      success_url: `${stripeSettings.checkoutSuccessUrl}?sessionId={CHECKOUT_SESSION_ID}`,
      cancel_url: `${stripeSettings.checkoutCancelUrl}`,
      metadata: {
        productId: `${productId}`,
        productName: `${productName}`,
      },
    });
    return session;
  },
  async retrieveCheckoutSession(checkoutSessionId) {
    const pluginStore = strapi.store({
      environment: strapi.config.environment,
      type: 'plugin',
      name: 'strapi-stripe',
    });
    const stripeSettings = await pluginStore.get({ key: 'stripeSetting' });
    let stripe;
    if (stripeSettings.isLiveMode) {
      stripe = new Stripe(stripeSettings.stripeLiveSecKey);
    } else {
      stripe = new Stripe(stripeSettings.stripeTestSecKey);
    }
    const session = await stripe.checkout.sessions.retrieve(checkoutSessionId);
    return session;
  },
});
