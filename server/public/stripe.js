/* eslint-disable no-undef */
'use strict';

window.onload = () => {
  // for product Checkout
  const ssProduct = document.querySelectorAll('.SS_ProductCheckout');
  if (ssProduct) {
    ssProduct.forEach(product => {
      product.addEventListener('click', function handleClick(event) {
        SS_ProductCheckout(
          event.target.dataset.id,
          event.target.dataset.url,
          event.target.dataset.email
        );
      });
    });
  }
  // for storing product payment order in strapi
  const params = new URLSearchParams(document.location.search);
  const checkoutSessionId = params.get('sessionId');
  if (checkoutSessionId) {
    SS_GetProductPaymentDetails(checkoutSessionId);
  }
};

// product Checkout logic

function SS_ProductCheckout(productId, baseUrl, userEmail) {
  localStorage.setItem('strapiStripeUrl', baseUrl);
  const getProductApi = baseUrl + '/strapi-stripe/getProduct/' + productId;
  const checkoutSessionUrl = baseUrl + '/strapi-stripe/createCheckoutSession/';

  fetch(getProductApi, {
    method: 'get',
    mode: 'cors',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  })
    .then(response => response.json())
    .then(response => {
      fetch(checkoutSessionUrl, {
        method: 'post',
        body: JSON.stringify({
          stripePriceId: response.stripePriceId,
          stripePlanId: response.stripePlanId,
          isSubscription: response.isSubscription,
          productId: response.id,
          productName: response.title,
          userEmail,
        }),
        mode: 'cors',
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
      })
        .then(response => response.json())
        .then(response => {
          if (response.id) {
            window.location.replace(response.url);
          }
        });
    });
}

//  storing product payment order in strapi logic

function SS_GetProductPaymentDetails(checkoutSessionId) {
  const baseUrl = localStorage.getItem('strapiStripeUrl');
  const retrieveCheckoutSessionUrl =
    baseUrl + '/strapi-stripe/retrieveCheckoutSession/' + checkoutSessionId;
  fetch(retrieveCheckoutSessionUrl, {
    method: 'get',
    mode: 'cors',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  })
    .then(response => response.json())
    .then(response => {
      if (response.payment_status === 'paid') {
        if (
          window.performance
            .getEntriesByType('navigation')
            .map(nav => nav.type)
            .includes('reload')
        ) {
          console.info('website reloded');
        } else {
          // store payment in strapi
          const stripePaymentUrl = baseUrl + '/strapi-stripe/stripePayment';
          fetch(stripePaymentUrl, {
            method: 'post',
            body: JSON.stringify({
              txnDate: new Date(),
              transactionId: response.id,
              isTxnSuccessful: true,
              txnMessage: response,
              txnAmount: response.amount_total / 100,
              customerName: response.customer_details.name,
              customerEmail: response.customer_details.email,
              stripeProduct: response.metadata.productId,
            }),
            mode: 'cors',
            headers: new Headers({
              'Content-Type': 'application/json',
            }),
          });
        }
      }
    });
}
