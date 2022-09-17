import {callGet, seoPopulate} from "../ulti/helper";

const CommonDataHandler = (app) => {
    app.use(async (req, res, next) => {
        try {
            const commonParams = {
                populate: {
                    logo: {
                        fields: ['url', 'name', 'width', 'height']
                    },
                    seo: seoPopulate(),
                    sitemapFooter: "*",
                    footerLogo: {
                        fields: ['url', 'name', 'width', 'height']
                    }
                },
            };
            const commonResponse = await callGet("/common", commonParams, app.locals.locale);
            app.locals.commonData = commonResponse.data.data.attributes;
            const {seo} = app.locals.commonData;

            app.locals.seoData = {
                ...seo,
                structuredData: seo.structuredData ? JSON.stringify(seo.structuredData) : null,
                metaImage: seo.metaImage ? seo.metaImage.data.attributes : null
            };
            next();
        } catch (e) {
            next(e);
        }
    });
};

export default CommonDataHandler;