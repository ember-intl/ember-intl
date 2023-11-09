import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@glimmer/component';

export default class LocaleSwitcherComponent extends Component {
  @service intl;

  @action updateLocale(locale) {
    this.intl.setLocale(locale);
  }
}
