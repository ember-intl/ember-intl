import Route from '@ember/routing/route';
import { service } from '@ember/service';
import { formats } from 'docs-app-for-ember-intl/ember-intl';
import type { IntlService } from 'ember-intl';

export default class ApplicationRoute extends Route {
  @service declare intl: IntlService;

  beforeModel(): void {
    this.setupIntl();
  }

  private setupIntl(): void {
    this.intl.setFormats(formats);
    this.intl.setLocale(['en-us']);
  }
}
