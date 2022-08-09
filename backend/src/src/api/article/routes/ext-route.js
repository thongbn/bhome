"use strict";
module.exports = {
  routes: [
    {
      method: "GET",
      path: "/article/:slug",
      handler: "article.findSlug",
      config: {
        "policies": []
      }
    }
  ]
};
