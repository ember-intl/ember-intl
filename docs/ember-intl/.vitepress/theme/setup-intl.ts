import type { Registry as Services } from '@ember/service';
import IntlService from 'ember-intl/services/intl';
import translationsForDeDe from 'virtual:ember-intl/translations/de-de';
import translationsForEnUs from 'virtual:ember-intl/translations/en-us';
import translationsForEsEs from 'virtual:ember-intl/translations/es-es';
import translationsForFrFr from 'virtual:ember-intl/translations/fr-fr';
import type { Formats } from 'ember-intl';

export const formats: Formats = {
  formatDate: {
    'user-friendly': {
      day: 'numeric',
      month: 'long',
      weekday: 'short',
    },
  },

  formatDateRange: {
    'user-friendly': {
      day: 'numeric',
      month: 'short',
    },
  },

  formatNumber: {
    compact: {
      notation: 'compact',
    },
    EUR: {
      currency: 'EUR',
      style: 'currency',
    },
    USD: {
      currency: 'USD',
      style: 'currency',
    },
  },

  formatRelativeTime: {
    compact: {
      style: 'narrow',
    },
  },

  formatTime: {
    hhmmss: {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    },
  },
};

export function setupIntl(): Services['intl'] {
  // @ts-expect-error: This expression is not constructable.
  const intl = new IntlService() as Services['intl'];

  intl.addTranslations('de-de', translationsForDeDe);
  intl.addTranslations('en-us', translationsForEnUs);
  intl.addTranslations('es-es', translationsForEsEs);
  intl.addTranslations('fr-fr', translationsForFrFr);

  intl.setFormats(formats);
  intl.setLocale(['en-us']);

  return intl;
}
