function SS_ProductCheckout() {
  const strapiStripe = document.querySelector("#SS_ProductCheckout");
  const productId = strapiStripe.dataset.id;
  const baseUrl = strapiStripe.dataset.url;
  const getProductApi = baseUrl + "/strapi-stripe/getProduct/" + productId;
  const checkoutSessionUrl = baseUrl + "/strapi-stripe/createCheckoutSession/";

  fetch(getProductApi, {
    method: "get",
    mode: "cors",
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  })
    .then((response) => response.json())
    .then((response) => {
      fetch(checkoutSessionUrl, {
        method: "post",
        body: JSON.stringify({
          stripePriceId: response.stripePriceId,
        }),
        mode: "cors",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.id) {
            window.location.replace(response.url);
          }
        });
    });
}

document.getElementById("SS_ProductCheckout").addEventListener("click", () => {
  SS_ProductCheckout();
});

// const urlString= window.location.href
