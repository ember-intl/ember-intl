import type {
  TranslationJson,
  TranslationKey,
  TranslationMessage,
} from '../../../../types/index.js';

type Data = {
  callback: (key: TranslationKey, value: TranslationMessage) => void;
  prefix: string;
};

export function forEach(json: TranslationJson, data: Data): void {
  for (const key in json) {
    if (!Object.hasOwn(json, key)) {
      continue;
    }

    const value = json[key]!;

    if (typeof value === 'object') {
      forEach(value, {
        callback: data.callback,
        prefix: `${data.prefix}${key}.`,
      });

      continue;
    }

    data.callback(`${data.prefix}${key}`, value);
  }
}
