import { action } from '@ember/object';
import { type Registry as Services, service } from '@ember/service';
import Component from '@glimmer/component';

interface LocaleSwitcherSignature {
  Args: {};
}

export default class LocaleSwitcher extends Component<LocaleSwitcherSignature> {
  @service declare intl: Services['intl'];

  @action updateLocale(locale: string): void {
    this.intl.setLocale([locale]);
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    LocaleSwitcher: typeof LocaleSwitcher;
    'locale-switcher': typeof LocaleSwitcher;
  }
}
