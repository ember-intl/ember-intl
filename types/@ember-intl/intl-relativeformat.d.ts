declare module '@ember-intl/intl-relativeformat' {
  export default class IntlRelativeFormat {
    static __addLocaleData(data: any): void;
    constructor(locales: string[], options: any);
    format(value: string | number | Date, options: any | undefined): string;
  }
}
