module.exports = [
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'script-src': ["'self'", "'unsafe-inline'", 'cdn.jsdelivr.net', "maps.googleapis.com", "editor.unlayer.com"],
          'img-src': ["'self'", 'data:', 'blob:', 'cdn.jsdelivr.net', 'strapi.io', "maps.gstatic.com", "maps.googleapis.com", "editor.unlayer.com"],
          'media-src': ["'self'", 'data:', 'blob:', "maps.gstatic.com", "maps.googleapis.com", "editor.unlayer.com"],
          'frame-src': ["'self'", "editor.unlayer.com"],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
