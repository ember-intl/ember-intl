import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import type { IntlService } from 'ember-intl';

interface LocaleSwitcherSignature {
  // eslint-disable-next-line @typescript-eslint/ban-types
  Args: {};
}

export default class LocaleSwitcherComponent extends Component<LocaleSwitcherSignature> {
  @service declare intl: IntlService;

  @action updateLocale(locale: string) {
    this.intl.setLocale([locale]);
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    LocaleSwitcher: typeof LocaleSwitcherComponent;
  }
}
