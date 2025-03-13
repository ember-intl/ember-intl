import Controller from '@ember/controller';
import { type Registry as Services, service } from '@ember/service';

export default class IndexController extends Controller {
  @service declare intl: Services['intl'];

  get overwrittenTranslation(): string {
    return this.intl.t('routes.index.key-to-overwrite');
  }
}
