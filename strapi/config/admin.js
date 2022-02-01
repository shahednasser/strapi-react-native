module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'f1355cc102d9cf6998c8642020f056d9'),
  },
});
