/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';

import { htmlSafe, isHTMLSafe } from '@ember/template';
import type { SafeString } from '@ember/template/-private/handlebars';
import Formatter from './-base';
import { IntlShape, MessageDescriptor } from '@formatjs/intl';
import { PrimitiveType } from 'intl-messageformat';
const {
  Handlebars: {
    // @ts-expect-error Upstream types are incomplete.
    Utils: { escapeExpression },
  },
} = Ember;

function escapeOptions<T extends Record<string, unknown>>(object?: T) {
  if (typeof object !== 'object') {
    return;
  }

  const escapedOpts = {} as { [K in keyof T]: T[K] extends SafeString ? string : T[K] };

  (Object.keys(object) as (keyof T)[]).forEach((key) => {
    const val = object[key];

    if (isHTMLSafe(val)) {
      // If the option is an instance of Ember SafeString,
      // we don't want to pass it into the formatter, since the
      // formatter won't know what to do with it. Instead, we cast
      // the SafeString to a regular string using `toHTML`.
      // Since it was already marked as safe we should *not* escape it.
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      escapedOpts[key] = val.toHTML();
    } else if (typeof val === 'string') {
      escapedOpts[key] = escapeExpression(val);
    } else {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      escapedOpts[key] = val; // copy as-is
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
  format(intl: IntlShape<string>, stringOrDesc: string, options: MessageFormatOptions & { htmlSafe: true }): SafeString;
  format(
    intl: IntlShape<string>,
    stringOrDesc: MessageDescriptor,
    options?: MessageFormatOptions & { htmlSafe: boolean }
  ): SafeString;
  format(
    intl: IntlShape<string>,
    stringOrDesc: MessageDescriptor | string,
    options?: MessageFormatOptions & { htmlSafe?: boolean }
  ): string | SafeString {
    const isHTMLSafe = options && options.htmlSafe;
    // Empty string is considered an err in ember-intl
    // if (typeof stringOrDesc === 'string' && !stringOrDesc) {
    //   return stringOrDesc;
    // }
    const escapedOptions: MessageFormatOptions | undefined = isHTMLSafe ? escapeOptions(options) : options;
    const desc =
      stringOrDesc && typeof stringOrDesc === 'object'
        ? stringOrDesc
        : {
            id: stringOrDesc,
            defaultMessage: stringOrDesc,
          };
    const result = intl.formatMessage(desc, escapedOptions, { ignoreTag: true });

    return isHTMLSafe ? htmlSafe(result) : result;
  }
}
