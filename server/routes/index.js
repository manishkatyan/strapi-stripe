'use strict';

module.exports = [
  {
    method: 'PUT',
    path: '/updateSettings',
    handler: 'configurationController.updateSetting',
    config: {
      policies: ['admin::isAuthenticatedAdmin'],
    },
  },
  {
    method: 'GET',
    path: '/getSettings',
    handler: 'configurationController.getSetting',
    config: {
      policies: ['admin::isAuthenticatedAdmin'],
    },
  },
  {
    method: 'POST',
    path: '/createProduct',
    handler: 'stripeController.createProduct',
    config: {
      auth: false,
    },
  },
  {
    method: 'GET',
    path: '/getProduct/:offset/:limit/:sort/:order',
    handler: 'stripeController.find',
    config: {
      auth: false,
    },
  },

  {
    method: 'GET',
    path: '/getProduct/:id',
    handler: 'stripeController.findOne',
    config: {
      auth: false,
    },
  },
  {
    method: 'PUT',
    path: '/updateProduct/:id',
    handler: 'stripeController.updateProduct',
    config: {
      auth: false,
    },
  },
  {
    method: 'POST',
    path: '/createCheckoutSession',
    handler: 'stripeController.createCheckoutSession',
    config: {
      auth: false,
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
    method: 'POST',
    path: '/stripePayment',
    handler: 'stripeController.savePayment',
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
    },
  },
  {
    method: 'GET',
    path: '/getSubscriptionStatus/:email',
    handler: 'stripeController.searchSubscriptionStatus',
    config: {
      auth: false,
    },
  },
];
