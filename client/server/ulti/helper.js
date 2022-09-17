import 'dotenv/config';
import axios from "axios";
import qs from 'qs';

export const callGet = async (path, params, locale) => {
    console.log("Call get:", path, params, locale);
    if (!locale) {
        locale = process.env.DEFAULT_LANGUAGE;
    }

    const url = `${process.env.LOCAL_API}${path}`;
    const query = qs.stringify({
        locale,
        ...params
    }, {
        encodeValuesOnly: true, // prettify URL
    });
    console.log(`Url: ${url}?${query}`);
    return await axios.get(`${url}?${query}`, {
        headers: {
            "Content-Type": "application/json"
        }
    }).catch(e => {
        console.debug(e);
        throw e;
    });
};

export const featurePopulate = () => {
    return {
        populate: {
            thumb: {
                fields: ['url', 'name', 'width', 'height']
            }
        }
    }
};

export const seoPopulate = () => {
    return {
        populate: {
            metaImage: {
                fields: ['url', 'name', 'width', 'height']
            },
            metaSocial: {
                image: {
                    fields: ['url', 'name', 'width', 'height']
                }
            }
        }
    }
};

export const createSeoData = (req, seoOptional) => {
    const seo = req.app.locals.seoData;

    if (!seo) {
        return {}
    }

    if (!seoOptional) {
        return seo;
    }

    let seoFinal = {
        ...seo,
        ...seoOptional
    };

    let metaImage = null;
    if (seoFinal.metaImage) {
        if (seoFinal.metaImage.url) {
            metaImage = seoFinal.metaImage;
        } else if (seoFinal.metaImage.data) {
            metaImage = seoFinal.metaImage.data.attributes;
        }
    }

    return {
        ...seoFinal,
        structuredData: seoFinal.structuredData ? JSON.stringify(seoFinal.structuredData) : null,
        metaImage
    }
};
