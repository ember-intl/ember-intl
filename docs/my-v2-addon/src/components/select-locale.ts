/* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access */
import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import type Owner from '@ember/owner';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
// @ts-expect-error: Cannot find module 'ember-intl/services/intl' or its corresponding type declarations.
import type IntlService from 'ember-intl/services/intl';

type Option = {
  label: string;
  value: SupportedLocale;
};

export type SupportedLocale = 'de-de' | 'en-us';

interface SelectLocaleSignature {
  Args: {};
}

export default class SelectLocaleComponent extends Component<SelectLocaleSignature> {
  @service declare intl: IntlService;

  fieldId = guidFor(this);

  @tracked value!: SupportedLocale;

  constructor(owner: Owner, args: SelectLocaleSignature['Args']) {
    super(owner, args);

    this.value = this.intl.primaryLocale as SupportedLocale;
  }

  get options(): Option[] {
    return [
      {
        label: 'Deutsch',
        value: 'de-de',
      },
      {
        label: 'English',
        value: 'en-us',
      },
    ];
  }

  updateLocale(value: SupportedLocale): void {
    let locale: string[];

    switch (value) {
      case 'de-de': {
        locale = ['de-de', 'en-us'];
        break;
      }

      case 'en-us': {
        locale = ['en-us'];
        break;
      }
    }

    this.intl.setLocale(locale);
  }

  @action updateValue(event: Event): void {
    const value = (event.target as HTMLSelectElement).value as SupportedLocale;

    this.value = value;
    this.updateLocale(value);
  }
}
