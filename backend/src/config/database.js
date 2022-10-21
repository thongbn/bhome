const path = require('path');

module.exports = ({ env }) => ({
  connection: {
    client: 'mysql',
    connection: {
      host: env('DB_HOST'),
      port: env('DB_PORT'),
      database: env('DB_NAME'),
      user: env('DB_USER'),
      password: env('DB_PASSWORD'),
      timezone: env('DB_TIMEZONE'),
      charset: env('DATABASE_CHARSET', 'utf8mb4'),
    },
    useNullAsDefault: true,
  },
});
