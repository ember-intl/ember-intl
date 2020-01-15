declare module '@ember-intl/intl-messageformat' {
  export default class IntlMessageFormat {
    static __addLocaleData(data: any): void;
    constructor(message: string, locales: string | string[], formats?: any);
    format(context?: any): string;
    static defaultLocale: string;
  }
}
