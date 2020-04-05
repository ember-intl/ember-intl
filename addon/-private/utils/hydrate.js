import translations from 'ember-intl/translations';

/**
 * @private
 * @hide
 */
export default function hydrate(service) {
  translations.forEach(([locale, translations]) => {
    service.addTranslations(locale, translations);
  });
}
