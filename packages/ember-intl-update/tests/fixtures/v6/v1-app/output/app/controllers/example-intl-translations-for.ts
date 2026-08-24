import Controller from '@ember/controller';
import { action } from '@ember/object';
import {
  inject as service,
  type Registry as Services,
} from '@ember/service';

export default class ExampleIntlTranslationsFor extends Controller {
  @service declare intl: Services['intl'];

  @action loadTranslations(): void {
    if (!this.intl.translationsFor('de-de')) {
      // Load translations
    }
  }
}