/* eslint-disable @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
import Route from '@ember/routing/route';
import { service } from '@ember/service';
import type { IntlService } from 'ember-intl';
import ENV from 'my-v1-classic-app-with-lazy-loaded-translations/config/environment';

export default class ApplicationRoute extends Route {
  @service declare intl: IntlService;

  async beforeModel(): Promise<void> {
    await this.setupIntl();
  }

  private async loadTranslations(locale: 'de-de' | 'en-us'): Promise<void> {
    const filePath = `translations/${locale}.json`;
    let resource: string;

    if (ENV.environment === 'production') {
      const response = await fetch('/assets/assetMap.json');
      const assetMap = await response.json();

      resource = `/${assetMap.assets[filePath]}`;
    } else {
      resource = `/${filePath}`;
    }

    const response = await fetch(resource);
    const translations = await response.json();

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
