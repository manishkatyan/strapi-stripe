'use strict';

module.exports = {
  async updateSetting(ctx) {
    const {
      isLiveMode,
      checkoutSuccessUrl,
      checkoutCancelUrl,
      currency,
      callbackUrl,
      paymentMethods,
      allowPromotionCode,
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
        checkoutSuccessUrl,
        checkoutCancelUrl,
        currency,
        callbackUrl,
        paymentMethods,
        allowPromotionCode,
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
