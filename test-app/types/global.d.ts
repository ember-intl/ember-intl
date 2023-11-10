declare module 'ember-intl' {
  export type { IntlService } from 'ember-intl';
  export { raw, t } from 'ember-intl';
}

declare module 'ember-intl/macros' {
  export { intl } from 'ember-intl/macros';
}

declare module 'ember-intl/services/intl' {
  export type { TOptions } from 'ember-intl/services/intl';
}

declare module 'ember-intl/test-support' {
  export {
    addTranslations,
    setLocale,
    setupIntl,
    t,
  } from 'ember-intl/test-support';
}
