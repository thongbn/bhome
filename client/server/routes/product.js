import express from 'express';
import {callGet, createSeoData, seoPopulate} from "../ulti/helper";
import qs from 'qs';
import {ProductTypes} from "../ulti/constants";

const router = express.Router();

router.get('/', async (req, res, next) => {
    const {query} = req;
    try {
        let filters = {};

        //FILTER SECTION
        let queryParams = {};
        if (query.type) {
            filters = {
                ...filters,
                type: {
                    $eq: query.type
                }
            };
            queryParams.type = query.type;
        }

        if (query.s) {
            filters = {
                ...filters,
                name: {
                    $contains: query.s
                }
            };
            queryParams.s = query.s;
        }

        if (query.priceMin) {
            filters = {
                ...filters,
                $or: [
                    {
                        salePrice: {
                            $gte: query.priceMin
                        }
                    },
                    {
                        price: {
                            $gte: query.priceMin
                        }
                    },
                ],
            };
            queryParams.priceMin = query.priceMin;
        }

        if (query.priceMax) {
            filters = {
                ...filters,
                $or: [
                    {
                        salePrice: {
                            $lte: query.priceMin
                        }
                    },
                    {
                        price: {
                            $lte: query.priceMin
                        }
                    },
                ],
            };
            queryParams.priceMax = query.priceMax;
        }

        const page = !query.page ? 1 : query.page;
        const limit = query.limit ? query.limit : 10;

        const getParams = {
            fields: ['name', 'shortDescription', 'slug', 'price', 'salePrice', 'createdAt', 'type'],
            sort: ['id:desc'],
            filters,
            populate: {
                thumb: {
                    fields: ['url', 'name', 'width', 'height']
                },
            },
            pagination: {
                page,
                pageSize: limit
            }
        };

        const productResponse = await callGet("/products", getParams, req.app.locals.locale);
        const productData = productResponse.data.data;
        const productMeta = productResponse.data.meta;

        queryParams = qs.stringify(queryParams, {
            encodeValuesOnly: true, // prettify URL
        });

        res.render('product/index', {
            title: "Sản phẩm",
            selfUrl: req.baseUrl + req.path,
            productData,
            productMeta,
            queryParams,
            productTypes: ProductTypes,
            helpers: {
                add(a, b) {
                    return a + b;
                }
            },
        });
    } catch (e) {
        next(e)
    }
});

router.get('/:slug', async (req, res) => {

    const {slug} = req.params;

    if (!slug) {
        throw new Error("Not found");
    }

    const articleParams = {
        populate: {
            cover: {
                fields: ['url', 'name', 'width', 'height']
            },
            seo: seoPopulate()
        },
    };
    const articleResponse = await callGet(`/product/${slug}`, articleParams);
    const articleData = articleResponse.data.data;
    req.app.locals.seoData = createSeoData(req, articleData.attributes.seo);

    res.render('product/detail', {
        articleData
    });
});

export default router;
