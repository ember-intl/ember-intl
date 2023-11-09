import Controller from '@ember/controller';
import { inject as service, type Registry as Services } from '@ember/service';

export default class SmokeController extends Controller {
  @service declare intl: Services['intl'];

  get areNestedTranslationsWorking(): boolean {
    return this.intl.exists('smoke.parent.child');
  }
}
