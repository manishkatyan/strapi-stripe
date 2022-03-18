'use strict';

module.exports = {
  index(ctx) {
    ctx.body = strapi
      .plugin('strapi-stripe')
      .service('myService')
      .getWelcomeMessage();
  },
};
