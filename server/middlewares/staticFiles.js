/* eslint-disable node/no-extraneous-require */
/* eslint-disable node/no-missing-require */

'use strict';

const path = require('path');
const koaStatic = require('koa-static');

module.exports = async ({ strapi }) => {
  strapi.server.routes([
    {
      method: 'GET',
      path: '/plugins/strapi-stripe/static/(.*)',
      async handler(ctx, next) {
        ctx.url = path.basename(`${ctx.url}/stripe.js`);
        const folderPath = strapi.dirs.extensions || strapi.dirs.dist.extensions;
        const staticFolder = path.resolve(folderPath, 'strapi-stripe', 'public');
        return koaStatic(staticFolder)(ctx, next);
      },
      config: {
        auth: false,
      },
    },
  ]);
};
