import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import type { IntlService } from 'ember-intl';

export default class SmokeController extends Controller {
  @service declare intl: IntlService;

  get nestedTranslation(): string {
    return this.intl.t('smoke-tests.hello.world');
  }
}
