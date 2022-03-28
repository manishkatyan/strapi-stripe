"use strict";

const koaStatic = require("koa-static");
const path = require("path");

module.exports = async ({ strapi }) => {
  strapi.server.routes([
    {
      method: "GET",
      path: "/plugins/strapi-stripe/static/(.*)",
      async handler(ctx, next) {
        ctx.url = path.basename(`${ctx.url}/stripe.js`);
        const staticFolder = path.resolve(
          strapi.dirs.extensions,
          "strapi-stripe",
          "public"
        );
        return koaStatic(staticFolder)(ctx, next);
      },
      config: {
        auth: false,
      },
    },
  ]);
};
