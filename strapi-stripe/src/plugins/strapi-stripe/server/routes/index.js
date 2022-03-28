module.exports = [
  {
    method: "PUT",
    path: "/updateSettings",
    handler: "configurationController.updateSetting",
    config: {
      auth: false,
    },
  },
  {
    method: "GET",
    path: "/getSettings",
    handler: "configurationController.getSetting",
    config: {
      auth: false,
    },
  },
  {
    method: "POST",
    path: "/createProduct",
    handler: "stripeController.createProduct",
    config: {
      auth: false,
    },
  },
  {
    method: "GET",
    path: "/getProduct",
    handler: "stripeController.find",
    config: {
      auth: false,
    },
  },
  {
    method: "GET",
    path: "/getProductAscending",
    handler: "stripeController.sortAscending",
    config: {
      auth: false,
    },
  },
  {
    method: "GET",
    path: "/getProductDescending",
    handler: "stripeController.sortDescending",
    config: {
      auth: false,
    },
  },
  {
    method: "GET",
    path: "/getProduct/:id",
    handler: "stripeController.findOne",
    config: {
      auth: false,
    },
  },
  {
    method: "PUT",
    path: "/updateProduct/:id",
    handler: "stripeController.updateProduct",
    config: {
      auth: false,
    },
  },
  {
    method: "POST",
    path: "/createCheckoutSession",
    handler: "stripeController.createCheckoutSession",
    config: {
      auth: false,
    },
  },
];
