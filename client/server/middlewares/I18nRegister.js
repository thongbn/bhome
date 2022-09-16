import i18n from 'i18n-express';

const I18nRegister = (app) => {
    app.use(i18n({
        translationsPath: `${__dirname}/../../server/i18n`, // <--- use here. Specify translations files path.
        siteLangs: ["en", "vi"],
        defaultLang: process.env.DEFAULT_LANGUAGE,
        paramLangName: "locale",
        textsVarName: 'trans'
    }));
};

export default I18nRegister;