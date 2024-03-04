/* eslint-disable @typescript-eslint/ban-ts-comment */
import { htmlSafe, isHTMLSafe, type SafeString } from '@ember/template';
import type { IntlShape, MessageDescriptor } from '@formatjs/intl';
import type { PrimitiveType } from 'intl-messageformat';

import Formatter from './-base';

const escaped: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '`': '&#x60;',
  '=': '&#x3D;',
};
const needToEscape = /[&<>"'`=]/;
const badCharacters = /[&<>"'`=]/g;

// https://github.com/emberjs/ember.js/blob/v5.6.0/packages/%40ember/-internals/glimmer/lib/utils/string.ts#L103-L118
function escapeExpression(value: string): string {
  if (!needToEscape.test(value)) {
    return value;
  }

  return value.replace(badCharacters, (character: string) => {
    return escaped[character]!;
  });
}

function escapeOptions<T extends Record<string, unknown>>(object?: T) {
  if (typeof object !== 'object') {
    return;
  }

  const escapedOpts = {} as {
    [K in keyof T]: T[K] extends SafeString ? string : T[K];
  };

  (Object.keys(object) as (keyof T)[]).forEach((key) => {
    const value = object[key];

    if (isHTMLSafe(value)) {
      // If the option is an instance of Ember SafeString,
      // we don't want to pass it into the formatter, since the
      // formatter won't know what to do with it. Instead, we cast
      // the SafeString to a regular string using `toHTML`.
      // Since it was already marked as safe we should *not* escape it.
      // @ts-ignore: see comment above
      escapedOpts[key] = value.toHTML();
    } else if (typeof value === 'string') {
      // @ts-ignore: see comment above
      escapedOpts[key] = escapeExpression(value);
    } else {
      // @ts-ignore: see comment above
      escapedOpts[key] = value; // copy as-is
    }
  });

  return escapedOpts;
}

type MessageFormatOptions = Record<string, PrimitiveType>;

/**
 * @private
 * @hide
 */
export default class FormatMessage extends Formatter<any> {
  static readonly type = 'message';

  // ! Function overloads are not passed through generic types for reasons that
  // evade my knowledge. ¯\_(ツ)_/¯
  // For this reason these types need to be manually copied over to the
  // `IntlService#formatMessage`.
  format(
    intl: IntlShape<string>,
    stringOrDesc: string,
    options: MessageFormatOptions & { htmlSafe: true },
  ): SafeString;
  format(
    intl: IntlShape<string>,
    stringOrDesc: MessageDescriptor,
    options?: MessageFormatOptions & { htmlSafe: boolean },
  ): SafeString;
  format(
    intl: IntlShape<string>,
    stringOrDesc: MessageDescriptor | string,
    options?: MessageFormatOptions & { htmlSafe?: boolean },
  ): string | SafeString {
    const isHTMLSafe = options && options.htmlSafe;

    const escapedOptions: MessageFormatOptions | undefined = isHTMLSafe
      ? escapeOptions(options)
      : options;

    const desc =
      stringOrDesc && typeof stringOrDesc === 'object'
        ? stringOrDesc
        : {
            id: stringOrDesc,
            defaultMessage: stringOrDesc,
          };

    const result = intl.formatMessage(desc, escapedOptions, {
      ignoreTag: true,
    });

    return isHTMLSafe ? htmlSafe(result) : result;
  }
}
