import express from 'express';
import {callGet, featurePopulate} from "../ulti/helper";
const router = express.Router();
import helpers from 'handlebars-helpers';

router.get('/', async (req,res, next) => {
    try{
        const params = {
            populate: {
                image1: {
                    fields: ['url', 'name', 'width', 'height']
                },
                image2: {
                    fields: ['url', 'name', 'width', 'height']
                },
                features: featurePopulate(),
                solutions: "*"
            },
        };
        const response = await callGet("/about-us", params);
        const aboutUsData = response.data.data.attributes;
        aboutUsData.introList = aboutUsData.introList ? aboutUsData.introList.split("\n") : []

        res.render('aboutUs/index', {
            aboutUsData,
            selfUrl: req.baseUrl + req.path,
            helpers: {
                plus(a, b){
                    return helpers("math").plus(a, b);
                }
            }
        });
    }catch (e) {
        next(e)
    }
});

export default router;