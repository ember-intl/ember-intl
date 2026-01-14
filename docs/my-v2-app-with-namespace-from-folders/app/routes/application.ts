import Route from '@ember/routing/route';
import { type Registry as Services, service } from '@ember/service';
import translationsForDeDe from 'virtual:ember-intl/translations/de-de';
import translationsForEnUs from 'virtual:ember-intl/translations/en-us';

export default class ApplicationRoute extends Route {
  @service declare intl: Services['intl'];

  beforeModel(): void {
    this.setupIntl();
  }

  private setupIntl(): void {
    this.intl.addTranslations('de-de', translationsForDeDe);
    this.intl.addTranslations('en-us', translationsForEnUs);

    this.intl.setLocale(['en-us']);
  }
}
