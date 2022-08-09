import { prefixPluginTranslations } from '@strapi/helper-plugin';
import pluginPkg from '../../package.json';
import pluginId from './pluginId';
import Initializer from './components/Initializer';
import CityInput from './components/CityInput';
import DistrictInput from './components/DistrictInput';
import LocationInput from './components/LocationInput';
const name = pluginPkg.strapi.name;

export default {
  register(app) {
    app.addFields({type: 'cityInput', Component: CityInput});
    app.addFields({type: 'districtInput', Component: DistrictInput});
    app.addFields({type: 'locationInput', Component: LocationInput});
    app.registerPlugin({
      id: pluginId,
      initializer: Initializer,
      isReady: false,
      name,
    });
  },

  bootstrap(app) {},
  async registerTrads({ locales }) {
    const importedTrads = await Promise.all(
      locales.map(locale => {
        return import(`./translations/${locale}.json`)
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return Promise.resolve(importedTrads);
  },
};
