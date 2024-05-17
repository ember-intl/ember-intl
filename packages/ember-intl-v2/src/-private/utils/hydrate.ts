import type IntlService from '../../services/intl.ts';
import translations from '../../translations.ts';

/**
 * @private
 * @hide
 */
export default function hydrate(service: IntlService) {
  translations.forEach(([locale, translations]) => {
    service.addTranslations(locale, translations);
  });
}
