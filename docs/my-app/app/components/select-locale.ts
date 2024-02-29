import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import { inject as service, type Registry as Services } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

type Option = {
  label: string;
  value: SupportedLocale;
};

export type SupportedLocale = 'de-de' | 'en-us';

interface SelectLocaleSignature {
  // eslint-disable-next-line @typescript-eslint/ban-types
  Args: {};
}

export default class SelectLocaleComponent extends Component<SelectLocaleSignature> {
  fieldId = guidFor(this);

  @service declare intl: Services['intl'];

  @tracked value!: SupportedLocale;

  constructor(owner: unknown, args: SelectLocaleSignature['Args']) {
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

  @action updateLocale(event: Event): void {
    const value = (event.target as HTMLSelectElement).value as SupportedLocale;

    this.value = value;

    this.intl.setLocale([value]);
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    SelectLocale: typeof SelectLocaleComponent;
  }
}
