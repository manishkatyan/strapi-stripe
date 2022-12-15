'use strict';

module.exports = {
  async updateSetting(ctx) {
    const {
      isLiveMode,
      stripeLivePubKey,
      stripeLiveSecKey,
      stripeTestPubKey,
      stripeTestSecKey,
      checkoutSuccessUrl,
      checkoutCancelUrl,
      currency,
      callbackUrl,
      paymentMethods,
    } = ctx.request.body.data;

    const pluginStore = strapi.store({
      environment: strapi.config.environment,
      type: 'plugin',
      name: 'strapi-stripe',
    });

    const response = await pluginStore.set({
      key: 'stripeSetting',
      value: {
        isLiveMode,
        stripeLivePubKey,
        stripeLiveSecKey,
        stripeTestPubKey,
        stripeTestSecKey,
        checkoutSuccessUrl,
        checkoutCancelUrl,
        currency,
        callbackUrl,
        paymentMethods,
      },
    });
    return ctx.send({ ok: true, response });
  },
  async getSetting(ctx) {
    const pluginStore = strapi.store({
      environment: strapi.config.environment,
      type: 'plugin',
      name: 'strapi-stripe',
    });
    const response = await pluginStore.get({ key: 'stripeSetting' });
    return ctx.send({ ok: true, response });
  },
};
