import Route from '@ember/routing/route';
import * as s from '@ember/service';
import type { IntlService } from 'ember-intl';

const service = s.service ?? s.inject;

export default class ApplicationRoute extends Route {
  @service declare intl: IntlService;

  beforeModel() {
    this.intl.setLocale(['en-us']);
  }
}
