import express from 'express';
import {callGet, createSeoData, seoPopulate} from "../ulti/helper";
import qs from 'qs';

const router = express.Router();

router.get('/', async (req, res, next) => {
    const {query} = req;
    try {
        let filters = {
            type: {
                $in: ["Project"]
            },
        };

        let queryParams = {};
        if (query.s) {
            filters = {
                ...filters,
                title: {
                    $contains: query.s
                }
            };
            queryParams.s = query.s;
        }

        const page = !query.page ? 1 : query.page;
        const limit = query.limit ? query.limit : 10;

        const getParams = {
            fields: ['title', 'shortDescription', 'slug', 'createdAt', 'type'],
            sort: ['id:desc'],
            filters,
            populate: {
                thumb: {
                    fields: ['url', 'name', 'width', 'height']
                },
                cover: {
                    fields: ['url', 'name', 'width', 'height']
                }
            },
            pagination: {
                page,
                pageSize: limit
            }
        };

        const articleResponse = await callGet("/articles", getParams, req.app.locals.locale);
        const articleData = articleResponse.data.data;
        const articleMeta = articleResponse.data.meta;

        queryParams = qs.stringify(queryParams, {
            encodeValuesOnly: true, // prettify URL
        });

        res.render('article/index', {
            title: "Công trình",
            selfUrl: req.baseUrl + req.path,
            articleData,
            articleMeta,
            queryParams,
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
            images: {
                fields: ['url', 'name', 'width', 'height']
            },
            seo: seoPopulate()
        },
    };
    const articleResponse = await callGet(`/article/${slug}`, articleParams);
    const articleData = articleResponse.data.data;
    req.app.locals.seoData = createSeoData(req, articleData.attributes.seo);

    res.render('article/detail', {
        articleData
    });
});

export default router;
