import type IntlService from '../../services/intl';
import translations from '../../translations';

/**
 * @private
 * @hide
 */
export default function hydrate(service: IntlService) {
  translations.forEach(([locale, translations]) => {
    service.addTranslations(locale, translations);
  });
}
