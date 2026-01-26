import Route from '@ember/routing/route';
import { type Registry as Services, service } from '@ember/service';

const translationModules = {
  'de-de': () => import('virtual:ember-intl/translations/de-de'),
  'en-us': () => import('virtual:ember-intl/translations/en-us'),
} as const;

export default class ApplicationRoute extends Route {
  @service declare intl: Services['intl'];

  async beforeModel(): Promise<void> {
    await this.setupIntl();
  }

  private async loadTranslations(locale: 'de-de' | 'en-us'): Promise<void> {
    const { default: translations } = await translationModules[locale]();

    this.intl.addTranslations(locale, translations);
  }

  private async setupIntl(): Promise<void> {
    await Promise.allSettled([
      this.loadTranslations('de-de'),
      this.loadTranslations('en-us'),
    ]);

    this.intl.setLocale(['en-us']);
  }
}
