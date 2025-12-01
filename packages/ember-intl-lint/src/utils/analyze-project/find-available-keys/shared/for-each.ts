import type {
  TranslationJson,
  TranslationKey,
} from '../../../../types/index.js';

type Data = {
  callback: (key: string, value: TranslationKey) => void;
  prefix?: string;
};

export function forEach(json: TranslationJson, data: Data): void {
  const prefix = data.prefix ?? '';

  for (const key in json) {
    if (!Object.hasOwn(json, key)) {
      continue;
    }

    const value = json[key]!;

    if (typeof value === 'object') {
      forEach(value, {
        callback: data.callback,
        prefix: `${prefix}${key}.`,
      });

      continue;
    }

    data.callback(`${prefix}${key}`, value);
  }
}
