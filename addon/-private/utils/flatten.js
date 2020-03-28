import EmptyObject from 'ember-intl/-private/utils/empty-object';

const hasOwnProperty = Object.prototype.hasOwnProperty;

export default function flatten(src) {
  const result = new EmptyObject();

  for (const key in src) {
    if (!hasOwnProperty.call(src, key)) {
      continue;
    }

    const value = src[key];

    if (typeof value === 'object' && value) {
      const hash = flatten(value);

      for (const suffix in hash) {
        result[`${key}.${suffix}`] = hash[suffix];
      }
    } else {
      result[key] = value;
    }
  }

  return result;
}
