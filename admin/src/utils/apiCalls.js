import createInstance from './axiosInstance';

const baseURL = process.env.STRAPI_ADMIN_BACKEND_URL;

export async function saveStripeConfiguration(data, apiToken) {
  const axios = createInstance(apiToken);
  const response = await axios.put('/strapi-stripe/updateSettings', {
    data,
  });

  return response;
}

export async function getStripeConfiguration(apiToken) {
  // send axios instance with apiToken
  const axios = createInstance(apiToken);
  const response = await axios.get('/strapi-stripe/getSettings');

  return response;
}

export async function createStripeProduct(
  title,
  price,
  imageId,
  imageUrl,
  description,
  isSubscription,
  paymentInterval,
  trialPeriodDays,
  apiToken
) {
  const axios = createInstance(apiToken);
  const response = await axios.post('/strapi-stripe/createProduct', {
    title,
    price,
    imageId,
    imageUrl,
    description,
    isSubscription,
    paymentInterval,
    trialPeriodDays,
  });

  return response;
}

export async function getStripeProduct(offset, limit, sort, order, apiToken) {
  const axios = createInstance(apiToken);
  const response = await axios.get(`/strapi-stripe/getProduct/${offset}/${limit}/${sort}/${order}`);

  return response;
}

export async function getStripeProductProductById(id, apiToken) {
  const axios = createInstance(apiToken);
  const response = await axios.get(`/strapi-stripe/getProduct/${id}`);

  return response;
}

export async function updateStripeProduct(
  id,
  title,
  url,
  description,
  productImage,
  stripeProductId,
  apiToken
) {
  const axios = createInstance(apiToken);
  const response = await axios.put(`/strapi-stripe/updateProduct/${id}`, {
    title,
    url,
    description,
    productImage,
    stripeProductId,
  });

  return response;
}

export async function deleteStripeProduct(productId, stripeProductId, apiToken) {
  const axios = createInstance(apiToken);
  const response = await axios.delete(
    `/strapi-stripe/deleteProduct/${productId}/${stripeProductId}`
  );

  return response;
}

export async function getProductPayments(productId, sort, order, offset, limit, apiToken) {
  const axios = createInstance(apiToken);
  const response = await axios.get(
    `/strapi-stripe/getPayments/${productId}/${sort}/${order}/${offset}/${limit}`
  );

  return response;
}

export async function uploadFiles(files, apiToken) {
  const formDocument = new FormData();
  formDocument.append('files', files[0]);
  const response = await fetch(`${baseURL}/api/upload`, {
    method: 'post',
    body: formDocument,
    headers: {
      Authorization: `Bearer ${apiToken}`,
    },
  });

  return response;
}

export async function getGithubVersion() {
  const response = await fetch(
    'https://api.github.com/repos/manishkatyan/strapi-stripe/releases/latest'
  );
  const data = await response.json();

  return data;
}
