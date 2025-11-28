import { on } from '@ember/modifier';
import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import type Owner from '@ember/owner';
import { type Registry as Services, service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { t, tKey } from 'ember-intl';
import { eq } from 'ember-truth-helpers';

type Option = {
  labelKey: string;
  value: SupportedLocale;
};

export type SupportedLocale = 'de-de' | 'en-us';

interface SelectLocaleSignature {
  Args: {};
}

export default class SelectLocaleComponent extends Component<SelectLocaleSignature> {
  @service declare intl: Services['intl'];

  @tracked value!: SupportedLocale;

  fieldId = guidFor(this);

  get options(): Option[] {
    return [
      {
        labelKey: tKey('components.select-locale.option.de-de'),
        value: 'de-de',
      },
      {
        labelKey: tKey('components.select-locale.option.en-us'),
        value: 'en-us',
      },
    ];
  }

  constructor(owner: Owner, args: SelectLocaleSignature['Args']) {
    super(owner, args);

    this.value = this.intl.primaryLocale as SupportedLocale;
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

  <template>
    <label for={{this.fieldId}}>
      {{t "components.select-locale.label"}}:
    </label>

    <select
      data-test-select-locale
      id={{this.fieldId}}
      {{on "change" this.updateValue}}
    >
      {{#if (eq this.value undefined)}}
        <option disabled selected value="">
          {{t "components.select-locale.option.default"}}
        </option>
      {{else}}
        <option disabled value="">
          {{t "components.select-locale.option.default"}}
        </option>
      {{/if}}

      {{#each this.options as |opt|}}
        {{#if (eq this.value opt.value)}}
          <option data-test-option={{opt.value}} selected value={{opt.value}}>
            {{t opt.labelKey}}
          </option>
        {{else}}
          <option data-test-option={{opt.value}} value={{opt.value}}>
            {{t opt.labelKey}}
          </option>
        {{/if}}
      {{/each}}
    </select>
  </template>
}
