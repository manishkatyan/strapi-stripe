/* eslint-disable node/no-missing-require */
'use strict';

const path = require('path');
const fs = require('fs-extra');
const _ = require('lodash');

const staticFileMiddleware = require('./middlewares/staticFiles');

module.exports = async ({ strapi }) => {
  // registeration phase
  await staticFileMiddleware({ strapi });
  await generateJs();
};

async function generateJs() {
  const jsData = fs.readFileSync(path.resolve(__dirname, 'public', 'stripe.js'), 'utf8');
  const filledJsData = _.template(jsData)({
    backendUrl: strapi.config.server.url,
  });

  const bbbJsPath = path.resolve(strapi.dirs.extensions, 'strapi-stripe', 'public', 'stripe.js');
  await fs.ensureFile(bbbJsPath);
  await fs.writeFile(bbbJsPath, filledJsData);
}
