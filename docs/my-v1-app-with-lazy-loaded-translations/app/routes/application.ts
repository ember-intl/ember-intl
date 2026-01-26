import Route from '@ember/routing/route';
import { service } from '@ember/service';
import type { IntlService } from 'ember-intl';

export default class ApplicationRoute extends Route {
  @service declare intl: IntlService;

  async beforeModel(): Promise<void> {
    await this.setupIntl();
  }

  private async loadTranslations(locale: 'de-de' | 'en-us'): Promise<void> {
    const { default: file } = (await import(
      `/translations/${locale}.json`
    )) as {
      default: string;
    };
    const translations = JSON.parse(file) as Record<string, string>;

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
