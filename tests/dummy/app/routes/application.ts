import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import type IntlService from 'ember-intl/services/intl';

export default class ApplicationRoute extends Route {
  @service declare intl: IntlService;

  beforeModel(): void {
    this.intl.setLocale(['en-us']);
  }
}
