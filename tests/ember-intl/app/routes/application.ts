import Route from '@ember/routing/route';
import { service } from '@ember/service';
import type { IntlService } from 'ember-intl';
import { formats } from 'test-app-for-ember-intl/ember-intl';

export default class ApplicationRoute extends Route {
  @service declare intl: IntlService;

  beforeModel() {
    this.intl.setFormats(formats);
    this.intl.setLocale(['en-us']);
  }
}
