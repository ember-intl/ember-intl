import { inject as service } from '@ember/service';
import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class extends Component {
  @service intl;

  @action
  changeLocale(locale) {
    return this.intl.setLocale(locale);
  }
}
