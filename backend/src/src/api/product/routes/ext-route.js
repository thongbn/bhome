"use strict";
module.exports = {
  routes: [
    {
      method: "GET",
      path: "/product/:slug",
      handler: "product.findSlug",
      config: {
        "policies": []
      }
    }
  ]
};
