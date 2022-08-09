import viTranslate from "./extensions/translations/vi.json";
import enTranslate from "./extensions/translations/en.json";
import nanoLogo from"./extensions/nano_logo.png";
import nanoMenuLogo from"./extensions/nano_logo_sm.png";

export default {
  config: {
    auth:{
      logo: nanoLogo
    },
    menu: {
      logo: nanoMenuLogo
    },
    // head: {
    //    favicon: "
    // },
    locales: [
      'vi',
    ],
    translations: {
      en: enTranslate,
      vi: viTranslate
    },
    tutorials: false,
    notifications:{
      release: false
    },
    theme: {
      colors: {
        primary100: '#effbe8',
        primary200: '#d3f0c4',
        primary500: '#7cb179',
        primary600: '#52804b',
        primary700: '#456848',
        danger700: '#b72b1a'
      },
    },
  },
  bootstrap(app) {
    console.log(app);
  },
};
