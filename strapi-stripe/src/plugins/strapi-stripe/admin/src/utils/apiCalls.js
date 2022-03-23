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
