declare module 'ember-intl' {
  export type { IntlService } from 'ember-intl';
}

declare module 'ember-intl/test-support' {
  export {
    addTranslations,
    setLocale,
    setupIntl,
    t,
  } from 'ember-intl/test-support';
}
