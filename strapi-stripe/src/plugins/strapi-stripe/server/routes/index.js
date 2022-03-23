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
];
