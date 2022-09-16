import {callGet, createSeoData, seoPopulate} from "../ulti/helper";

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async (req, res, next) => {
    try {
        const homeParams = {
            populate: {
                banners: {
                    populate: {
                        image: {
                            fields: ['url', 'name', 'width', 'height']
                        }
                    }
                },
                aboutUsImage: {
                    fields: ['url', 'name', 'width', 'height']
                },
                testimonials: {
                    populate: {
                        img: {
                            fields: ['url', 'name', 'width', 'height']
                        }
                    }
                },
                seo: seoPopulate()
            }
        };
        const homeResponse = await callGet("/home-page", homeParams, req.app.locals.locale);
        const homeData = homeResponse.data.data.attributes;
        homeData.aboutUsList = homeData.aboutUsList ? homeData.aboutUsList.split("\n") : [];
        req.app.locals.seoData = createSeoData(req, homeData.seo);

        const articleParams = {
            fields: ['id', 'title', 'shortDescription', 'slug', 'createdAt'],
            sort: ['id:desc'],
            filters: {
                showHomePage: {
                    $eq: true
                }
            },
            populate: {
                thumb: {
                    fields: ['url', 'name', 'width', 'height']
                }
            },
        };

        const articleResponse = await callGet("/articles", articleParams, req.app.locals.locale);
        const articleData = articleResponse.data.data;

        const productParams = {
            fields: ['id', 'name', 'shortDescription', 'slug', 'price', 'salePrice', 'createdAt'],
            sort: ['id:desc'],
            filters: {
                showHomepage: {
                    $eq: true
                }
            },
            populate: {
                thumb: {
                    fields: ['url', 'name', 'width', 'height']
                }
            },
        };

        const productResponse = await callGet("/products", productParams, req.app.locals.locale);
        const productData = productResponse.data.data;

        res.render('home/index', {
            articleData,
            homeData,
            productData
        });
    } catch (e) {
        next(e);
    }
});

module.exports = router;
