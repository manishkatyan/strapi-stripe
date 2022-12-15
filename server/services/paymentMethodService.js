/* eslint-disable import/extensions */
/* eslint-disable node/no-extraneous-require */
/* eslint-disable node/no-missing-require */

'use strict';

const { ApplicationError } = require('@strapi/utils').errors;

const paymentMethodReq = require('./constant.js');

module.exports = () => ({
  // Function to find payment methods
  async getPaymentMethods(isSubscription, currency, paymentMethods) {
    const payments = [];
    try {
      const { sepaDirectDebit, achDirectDebit, alipay } = paymentMethodReq;

      if (paymentMethods.includes('card')) payments.push('card');

      if (
        paymentMethods.includes('sepa_debit') &&
        sepaDirectDebit.supportedCurrency.includes(currency)
      )
        payments.push('sepa_debit');

      if (
        paymentMethods.includes('us_bank_account') &&
        achDirectDebit.supportedCurrency.includes(currency)
      )
        payments.push('us_bank_account');

      if (
        paymentMethods.includes('alipay') &&
        alipay.supportedCurrency.includes(currency) &&
        !isSubscription
      )
        payments.push('alipay');

      if (paymentMethods.length === 0) payments.push('card');

      return payments;
    } catch (error) {
      throw new ApplicationError(error);
    }
  },
});
