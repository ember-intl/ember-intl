import translations from '../translations';

export default {
  initialize(owner) {
    const intl = owner.lookup('service:intl');

    translations.forEach(([locale, translations]) => {
      intl.addTranslations(locale, translations);
    });
  },
};
