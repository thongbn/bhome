module.exports = ({ env }) => ({
  apiToken: {
    salt: env('API_TOKEN_SALT', '06625831699c575932c0e9708f0aabe2'),
  },
  auth: {
    secret: env('JWT_SECRET', 'ae82a004408a34fa338ddb1bafbece67'),
  },
  url: "/admin"
});
