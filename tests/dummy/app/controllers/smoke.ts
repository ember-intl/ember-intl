import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import type IntlService from 'ember-intl/services/intl';

export default class SmokeController extends Controller {
  @service declare intl: IntlService;

  get areNestedTranslationsWorking(): boolean {
    return this.intl.exists('smoke.parent.child');
  }
}
