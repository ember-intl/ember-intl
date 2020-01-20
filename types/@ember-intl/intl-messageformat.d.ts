declare module '@ember-intl/intl-messageformat' {
  export default class IntlMessageFormat {
    static __addLocaleData(data: any): void;
    constructor(message: string, locales: string | string[], formats?: IntlMessageFormatOptions);
    format(context?: FormatOptions): string;
    static defaultLocale: string;
  }

  // https://github.com/snewcomer/cldr-compact-number/blob/4ccd733bc4289a37398e36b9d63ec0efc4dbdc37/src/math-utils.ts#L8
  interface ShortNumberNormalizeOptions {
    significantDigits?: number;
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
  }

  // https://github.com/snewcomer/cldr-compact-number/blob/4ccd733bc4289a37398e36b9d63ec0efc4dbdc37/src/format.ts#L38
  interface ShortNumberFormatOptions {
    financialFormat?: boolean;
    long?: boolean;
    significantDigits?: number;
    threshold?: number;
  }

  export interface IntlMessageFormatOptions {
    number?: {
      [style: string]: Intl.NumberFormatOptions;
    };
    shortNumber?: {
      [style: string]: ShortNumberFormatOptions & ShortNumberNormalizeOptions;
    };
    date?: {
      [style: string]: Intl.DateTimeFormatOptions;
    };
    time?: {
      [style: string]: Intl.DateTimeFormatOptions;
    }
  }

  export interface FormatOptions {
    [key: string]: any;
  }
}
