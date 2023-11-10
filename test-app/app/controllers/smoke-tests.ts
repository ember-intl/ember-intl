import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import type { IntlService } from 'ember-intl';

export default class SmokeController extends Controller {
  @service declare intl: IntlService;

  get nestedTranslation(): boolean {
    return this.intl.t('smoke-tests.parent.child');
  }
}
