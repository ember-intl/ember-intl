import translations from 'ember-intl/translations';
import type IntlService from '../../services/intl';

/**
 * @private
 * @hide
 */
export default function hydrate(service: IntlService) {
  translations.forEach(([locale, translations]) => {
    service.addTranslations(locale, translations);
  });
}
