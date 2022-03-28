import instance from "./axiosInstance";
const axios = instance;

export async function saveStripeConfiguration(data) {
  console.log("stripe Configuration", data);
  const response = await axios.put("/strapi-stripe/updateSettings", {
    data,
  });
  return response;
}

export async function getStripeConfiguration() {
  const response = await axios.get("/strapi-stripe/getSettings");
  return response;
}

export async function createStripeProduct(title, price, url, description) {
  const response = await axios.post("/strapi-stripe/createProduct", {
    title,
    price,
    url,
    description,
  });
  return response;
}

export async function getStripeProduct() {
  const response = await axios.get("/strapi-stripe/getProduct");
  return response;
}

export async function getStripeProductAscending() {
  const response = await axios.get("/strapi-stripe/getProductAscending");
  return response;
}

export async function getStripeProductDescending() {
  const response = await axios.get("/strapi-stripe/getProductDescending");
  return response;
}

export async function getStripeProductProductById(id) {
  const response = await axios.get(`/strapi-stripe/getProduct/${id}`);
  return response;
}

export async function updateStripeProduct(
  id,
  title,
  url,
  description,
  stripeProductId
) {
  const response = await axios.put(`/strapi-stripe/updateProduct/${id}`, {
    title,
    url,
    description,
    stripeProductId,
  });
  return response;
}
