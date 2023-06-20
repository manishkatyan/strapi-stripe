'use strict';

module.exports = async (policyContext, config, { strapi }) => {
  const bearerToken = policyContext.request.header.authorization.substring('Bearer '.length);

  if (!bearerToken) {
    return false;
  }
  const apiTokenService = strapi.services['admin::api-token'];
  const accessKey = await apiTokenService.hash(bearerToken);
  const storedToken = await apiTokenService.getBy({ accessKey });

  if (!storedToken) {
    return false;
  }

  // Deny access if expired.
  if (storedToken.expiresAt && storedToken.expiresAt < new Date()) {
    return false;
  }
  // Or add your own logic here.
  if (storedToken.type === 'full-access') {
    return true;
  }
  return false;
};
