declare module '@ember-intl/intl-relativeformat' {
  export default class IntlRelativeFormat {
    static __addLocaleData(data: any): void;
    constructor(locales: string[], options?: IntlRelativeFormatOptions);
    format(value?: number | Date, options?: FormatOptions): string;
  }

  // https://github.com/ember-intl/intl-relativeformat/blob/2509852f24ad5e2cd416678d8a40658768beb540/src/core.js#L45
  export interface IntlRelativeFormatOptions {
    style?: string;
    units?: string;
  }

  // https://github.com/ember-intl/intl-relativeformat/blob/2509852f24ad5e2cd416678d8a40658768beb540/src/core.js#L184
  export interface FormatOptions {
    now?: number;
  }
}
