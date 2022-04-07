"use strict";

module.exports = {
  updateSetting: async (ctx) => {
    const {
      isLiveMode,
      stripeLivePubKey,
      stripeLiveSecKey,
      stripeTestPubKey,
      stripeTestSecKey,
      checkoutSuccessUrl,
      checkoutCancelUrl,
      currency,
      paymentButtonText,
    } = ctx.request.body.data;

    const pluginStore = strapi.store({
      environment: strapi.config.environment,
      type: "plugin",
      name: "strapi-stripe",
    });

    const response = await pluginStore.set({
      key: "stripeSetting",
      value: {
        isLiveMode,
        stripeLivePubKey,
        stripeLiveSecKey,
        stripeTestPubKey,
        stripeTestSecKey,
        checkoutSuccessUrl,
        checkoutCancelUrl,
        currency,
        paymentButtonText,
      },
    });
    return ctx.send({ ok: true, response });
  },
  getSetting: async (ctx) => {
    const pluginStore = strapi.store({
      environment: strapi.config.environment,
      type: "plugin",
      name: "strapi-stripe",
    });
    const response = await pluginStore.get({ key: "stripeSetting" });
    return ctx.send({ ok: true, response });
  },
};
