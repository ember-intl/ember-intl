import { camelize, dasherize } from '@ember/string';

export type Data = Record<string, any>;

export type ResourceObject = {
  [key: string]: unknown;
  attributes: Record<string, any>[];
  id: string;
  type: string;
};

// Based on https://stackoverflow.com/a/5480605
function transformKeys({
  data,
  transform,
}: {
  data: Data;
  transform: (key: string) => string;
}): Data {
  function _transform(obj: Record<string, any>): Record<string, any> {
    const replacement: Data = {};

    for (const key in obj) {
      if (!Object.hasOwnProperty.call(obj, key)) {
        continue;
      }

      replacement[transform(key)] = obj[key];
    }

    return replacement;
  }

  function replace(key: string, value: any): any {
    if (value === null || value === undefined) {
      return null;
    }

    if (typeof value !== 'object') {
      return value;
    }

    if (Array.isArray(value)) {
      return value.map(_transform);
    }

    return _transform(value);
  }

  return JSON.parse(JSON.stringify(data, replace));
}

export function normalize(data: Data): Data {
  return transformKeys({
    data,
    transform: camelize,
  });
}

export function serialize(data: Data): Data {
  return transformKeys({
    data,
    transform: dasherize,
  });
}
