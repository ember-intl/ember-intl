import Controller from '@ember/controller';
import * as s from '@ember/service';
import type { IntlService } from 'ember-intl';

const service = s.service ?? s.inject;

export default class SmokeController extends Controller {
  @service declare intl: IntlService;

  get nestedTranslation(): string {
    return this.intl.t('smoke-tests.hello.world');
  }
}
