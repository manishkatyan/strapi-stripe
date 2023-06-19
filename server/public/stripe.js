// @ts-nocheck
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
  const getRedirectUrl = baseUrl + '/strapi-stripe/getRedirectUrl/' + productId + '/' + userEmail;

  fetch(getRedirectUrl, {
    method: 'get',
    mode: 'cors',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  })
    .then(response => response.json())
    .then(response => {
      if (response.url) {
        window.location.replace(response.url);
      }
    });
}

//  storing product payment order in strapi logic

function SS_GetProductPaymentDetails(checkoutSessionId) {
  const baseUrl = localStorage.getItem('strapiStripeUrl');
  const retrieveCheckoutSessionUrl =
    baseUrl + '/strapi-stripe/retrieveCheckoutSession/' + checkoutSessionId;
  if (
    window.performance
      .getEntriesByType('navigation')
      .map(nav => nav.type)
      .includes('reload')
  ) {
    console.info('website reloded');
  } else {
    fetch(retrieveCheckoutSessionUrl, {
      method: 'get',
      mode: 'cors',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    });
  }
}
