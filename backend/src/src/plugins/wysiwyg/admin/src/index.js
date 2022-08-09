import pluginPkg from '../../package.json';
import pluginId from './pluginId';
import Wysiwyg from "./components/Wysiwyg";

const name = pluginPkg.strapi.name;

export default {
  register(app) {
    app.addFields({ type: "wysiwyg", Component: Wysiwyg });

    app.registerPlugin({
      id: pluginId,
      isReady: true,
      name,
    });
  },
  bootstrap() {},
};
