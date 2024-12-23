import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import type Owner from '@ember/owner';
import { type Registry as Services, service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

type Option = {
  label: string;
  value: SupportedLocale;
};

export type SupportedLocale = 'de-de' | 'en-us';

interface SelectLocaleSignature {
  Args: {};
}

export default class SelectLocaleComponent extends Component<SelectLocaleSignature> {
  fieldId = guidFor(this);

  @service declare intl: Services['intl'];

  @tracked value!: SupportedLocale;

  constructor(owner: Owner, args: SelectLocaleSignature['Args']) {
    super(owner, args);

    // @ts-expect-error: Property 'primaryLocale' does not exist on type 'Service'
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

    // @ts-expect-error: Property 'setLocale' does not exist on type 'Service'
    this.intl.setLocale(locale);
  }

  @action updateValue(event: Event): void {
    const value = (event.target as HTMLSelectElement).value as SupportedLocale;

    this.value = value;
    this.updateLocale(value);
  }
}
