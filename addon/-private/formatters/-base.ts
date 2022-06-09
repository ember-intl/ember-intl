/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import type { SafeString } from '@ember/template/-private/handlebars';
import type { Formats } from '../../types';
import { IntlShape } from '@formatjs/intl';

export type ValueOf<ObjectType, ValueType extends keyof ObjectType = keyof ObjectType> = ObjectType[ValueType];

export interface FormatterConfig {
  getIntl: (locale: string | string[]) => IntlShape<string>;
}

export interface BaseOptions {
  format?: string;
}

/**
 * @private
 * @hide
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export default abstract class FormatterBase<KnownOptions extends {}> {
  static type: keyof Formats | 'message' | 'list' | 'dateRange' | 'timeRange';

  get options(): readonly (keyof KnownOptions)[] {
    return [] as unknown[] as readonly (keyof KnownOptions)[];
  }

  abstract format<T>(
    intl: IntlShape<string>,
    value: T,
    formatOptions?: KnownOptions & BaseOptions
  ): string | SafeString;
  abstract format(
    intl: IntlShape<string>,
    value: unknown,
    formatOptions?: KnownOptions & BaseOptions
  ): string | SafeString;
}
