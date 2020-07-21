
import { isUndefined, isObject, isString } from 'lodash';
import { getFromConfig } from 'plugins/access/gate';
import memoize from 'memoizee';

const memo = (func) => {
  return memoize(func, { primitive: true });
};

const get = (collection, path, delimiter = '.') => {
  if (!path) return collection;
  
  let value = collection;

  if (typeof path === 'string') {
    path = path.split(delimiter);
  }

  for (let i = 0; i < path.length; i++) {
    if (typeof value === 'undefined') {
      return undefined;
    }
    value = value[path[i]];
  }

  return value;
};

const getNested = (type, path, delimiter = '.') => {
  const collection = getFromConfig(type);
  const code = get(collection, path, delimiter);

  if (isUndefined(code)) return undefined;
  if (isObject(code)) return code;
  if (isString(code)) {
    if (code.indexOf(delimiter) > -1) return getNested(type, code);
  }

  return code;
};

const getDimension = (path) => {
  return getNested('dimensions', path);
};

const getFormat = (path) => {
  return getNested('formats', path, '_');
};

const getGeneral = (path) => {
  return getNested('general', path);
};

const getColor = (path) => {
  return getNested('colors', path);
};

const getIcon = (path, getType = false) => {
  const typeOrName = getType ? 'type' : 'name';
  let code = getNested('icons', path);

  return code[typeOrName];
};

const getTimeing = (path) => {
  let timing = get('timeings',path);
  return timing;
};

export const translate = (value) => {
  return value;
}

export const dim = memo(getDimension);
export const icon = memo(getIcon);
export const color = memo(getColor);
export const format = memo(getFormat);
export const time = memo(getTimeing);
export const core = memo(getGeneral);

