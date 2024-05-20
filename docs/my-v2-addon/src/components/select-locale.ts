import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import { type Registry as Services, service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

type Option = {
  label: string;
  value: SupportedLocale;
};

export type SupportedLocale = 'de-DE' | 'en-US';

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

    // @ts-expect-error: Property 'primaryLocale' does not exist on type 'Service'
    this.value = this.intl.primaryLocale as SupportedLocale;
  }

  get options(): Option[] {
    return [
      {
        label: 'Deutsch',
        value: 'de-DE',
      },
      {
        label: 'English',
        value: 'en-US',
      },
    ];
  }

  @action updateLocale(event: Event): void {
    const value = (event.target as HTMLSelectElement).value as SupportedLocale;

    this.value = value;

    // @ts-expect-error: Property 'setLocale' does not exist on type 'Service'
    this.intl.setLocale([value]);
  }
}
