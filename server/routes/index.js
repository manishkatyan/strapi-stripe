'use strict';

module.exports = [
  {
    method: 'PUT',
    path: '/updateSettings',
    handler: 'configurationController.updateSetting',
    config: {
      auth: false,
      policies: ['plugin::strapi-stripe.apiToken'],
    },
  },
  {
    method: 'GET',
    path: '/getSettings',
    handler: 'configurationController.getSetting',
    config: {
      auth: false,
      policies: ['plugin::strapi-stripe.apiToken'],
    },
  },
  {
    method: 'POST',
    path: '/createProduct',
    handler: 'stripeController.createProduct',
    config: {
      auth: false,
      policies: ['plugin::strapi-stripe.apiToken'],
    },
  },
  {
    method: 'GET',
    path: '/getProduct/:offset/:limit/:sort/:order',
    handler: 'stripeController.find',
    config: {
      auth: false,
      policies: ['plugin::strapi-stripe.apiToken'],
    },
  },

  {
    method: 'GET',
    path: '/getProduct/:id',
    handler: 'stripeController.findOne',
    config: {
      auth: false,
      policies: ['plugin::strapi-stripe.apiToken'],
    },
  },
  {
    method: 'PUT',
    path: '/updateProduct/:id',
    handler: 'stripeController.updateProduct',
    config: {
      auth: false,
      policies: ['plugin::strapi-stripe.apiToken'],
    },
  },
  {
    method: 'DELETE',
    path: '/deleteProduct/:productId/:stripeProductId',
    handler: 'stripeController.deleteProduct',
    config: {
      auth: false,
      policies: ['plugin::strapi-stripe.apiToken'],
    },
  },
  {
    method: 'GET',
    path: '/retrieveCheckoutSession/:id',
    handler: 'stripeController.retrieveCheckoutSession',
    config: {
      auth: false,
    },
  },
  {
    method: 'GET',
    path: '/getPayments/:id/:sort/:order/:offset/:limit',
    handler: 'stripeController.getProductPayments',
    config: {
      auth: false,
      policies: ['plugin::strapi-stripe.apiToken'],
    },
  },
  {
    method: 'GET',
    path: '/getSubscriptionStatus/:email',
    handler: 'stripeController.searchSubscriptionStatus',
    config: {
      auth: false,
      policies: ['plugin::strapi-stripe.apiToken'],
    },
  },
  {
    method: 'GET',
    path: '/getRedirectUrl/:id/:email',
    handler: 'stripeController.getRedirectUrl',
    config: {
      auth: false,
    },
  },
];
