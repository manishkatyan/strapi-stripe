module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '91617469367e7f4e569ccec79010c1db'),
  },
});
