import type { Translations } from '../types/index.js';

export function getTranslations(locale: string): Translations {
  switch (locale) {
    case 'de-de': {
      return {
        components: {
          title: 'Komponenten',
          'translation-with-arguments': {
            message:
              '{name} hat {numPhotos, plural, =0 {keine Fotos} =1 {ein Foto} other {# Fotos}}.',
            title: 'Übersetzung mit Argumenten',
          },
        },
        'components.component-from-app': {
          message: 'Dies ist eine Komponente aus der App.',
        },
        'components.component-from-v1-addon': {
          message: 'Dies ist eine Komponente aus einem v1 Addon.',
        },
        'components.component-from-v2-addon': {
          message: 'Dies ist eine Komponente aus einem v2 Addon.',
        },
        'components.select-locale': {
          label: 'Sprache',
          option: {
            'de-de': 'Deutsch',
            default: 'Sprache auswählen',
            'en-us': 'Englisch',
          },
        },
        'routes.application': { title: 'ember-intl' },
        'routes.index': {
          'key-to-overwrite': 'Die Apps Übersetzungen haben Vorrang.',
          title: 'Willkommen bei <code>ember-intl</code>',
        },
      };
    }

    case 'en-us': {
      return {
        components: {
          title: 'Components',
          'translation-with-arguments': {
            message:
              '{name} has {numPhotos, plural, =0 {no photos} =1 {a photo} other {# photos}}.',
            title: 'Translation with Arguments',
          },
        },
        'components.component-from-app': {
          message: 'This is a component from the app.',
        },
        'components.component-from-v1-addon': {
          message: 'This is a component from a v1 addon.',
        },
        'components.component-from-v2-addon': {
          message: 'This is a component from a v2 addon.',
        },
        'components.select-locale': {
          label: 'Language',
          option: {
            'de-de': 'German',
            default: 'Choose your language',
            'en-us': 'English',
          },
        },
        'routes.application': { title: 'ember-intl' },
        'routes.index': {
          'key-to-overwrite': "The app's translations take precedence.",
          title: 'Welcome to <code>ember-intl</code>',
        },
      };
    }

    default: {
      return {};
    }
  }
}
