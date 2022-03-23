module.exports = {
  info: {
    tableName: "StrapiStripePayment",
    singularName: "strapi-stripe-payment", // kebab-case mandatory
    pluralName: "strapi-stripe-payments", // kebab-case mandatory
    displayName: "StrapiStripePayment",
    description: "Stripe Payment",
    kind: "collectionType",
  },
  options: {
    draftAndPublish: "false",
  },
  pluginOptions: {
    "content-manager": {
      visible: true,
    },
    "content-type-builder": {
      visible: true,
    },
  },
  attributes: {
    date: {
      type: "datetime",
      required: true,
      configurable: false,
    },
    transactionId: {
      type: "biginteger",
      min: 1,
      required: true,
      configurable: false,
    },
    isTxnSuccessful: {
      type: "boolean",
      default: false,
      configurable: false,
    },
    txnMessage: {
      type: "string",
      maxLength: 5000,
      configurable: false,
    },
    txnErrorMessage: {
      type: "string",
      maxLength: 250,
      configurable: false,
    },
    txnAmount: {
      type: "decimal",
      required: true,
      configurable: false,
    },
    stripeProduct: {
      type: "relation",
      relation: "manyToOne",
      target: "plugin::strapi-stripe.strapi-stripe-product",
      inversedBy: "stripePayment",
      configurable: false,
    },
  },
};
