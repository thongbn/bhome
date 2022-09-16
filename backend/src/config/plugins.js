module.exports = ({env}) => ({
  seo: {
    enabled: true,
  },
  wysiwyg: {
    enabled: true,
    resolve: "./src/plugins/wysiwyg", // path to plugin folder
  },
  'location-selector': {
    enabled: true,
    resolve: './src/plugins/location-selector'
  },
  'ezforms': {
    disabled: true
  },
  // 'dashboard': {
  //   enabled: true,
  //   resolve: './src/plugins/dashboard'
  // },
  // 'get-fly': {
  //   enabled: true,
  //   resolve: './src/plugins/get-fly'
  // },
  // 'export-data': {
  //   enabled: true,
  //   resolve: './src/plugins/export-data'
  // },
  email: {
    config: {
      provider: 'sendgrid',
      providerOptions: {
        apiKey: env('SENDGRID_API_KEY'),
      },
      settings: {
        defaultFrom: env('DEFAULT_FROM_EMAIL'),
        defaultReplyTo: env('DEFAULT_TO_EMAIL'),
        testAddress: env('TEST_EMAIL_ADDRESS'),
      },
    },
  },
});
