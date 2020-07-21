import { isObject } from 'lodash';

import general from 'plugins/access/mainConfig/general.js';
import colors from 'plugins/access/mainConfig/colors.js';
import icons from 'plugins/access/mainConfig/icons.js';
import dimensions from "plugins/access/mainConfig/dimensions.js";
import timeings from "plugins/access/mainConfig/time.js";

let config = {
  colors,
  general,
  icons,
  dimensions,
  timeings
};

function mergeDeep(target, source) {
  const innerTarget = JSON.parse(JSON.stringify(target));

  if (!source) return innerTarget;

  if (isObject(innerTarget) && isObject(source)) {
    for (const key in source) {
      if (Array.isArray(source[key])) {
        Object.assign(innerTarget, { [key]: source[key] });
      } else if (isObject(source[key])) {
        if (!innerTarget[key]) Object.assign(innerTarget, { [key]: {} });
        innerTarget[key] = mergeDeep(innerTarget[key], source[key]);
      } else {
        Object.assign(innerTarget, { [key]: source[key] });
      }
    }
  }

  return innerTarget;
}

export const addToConfig = (pluginConfig) => {
  for (const configKey in pluginConfig) {
    if (pluginConfig.hasOwnProperty(configKey)) {
      config = mergeDeep(config, pluginConfig);
    }
  }
};

export const getFromConfig = (path) => {
  if (!path) return config;
  
  return config[path];
};
