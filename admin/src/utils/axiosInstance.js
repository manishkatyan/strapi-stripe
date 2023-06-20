// @ts-nocheck
/**
 * axios with a custom config.
 */

import axios from 'axios';

const createInstance = apiToken => {
  const instance = axios.create({
    baseURL: process.env.STRAPI_ADMIN_BACKEND_URL,
  });

  instance.interceptors.request.use(
    async config => {
      config.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };

      // Add the authorization header
      config.headers.Authorization = `Bearer ${apiToken}`;

      return config;
    },
    error => {
      Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    response => response,
    error => {
      // whatever you want to do with the error
      if (error.response?.status === 401) {
        window.location.reload();
      }

      throw error;
    }
  );

  return instance;
};

export default createInstance;
