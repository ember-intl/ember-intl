import { on } from '@ember/modifier';
import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import type Owner from '@ember/owner';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { type IntlService, t } from 'ember-intl';
import { eq } from 'ember-truth-helpers';

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

  @tracked value!: SupportedLocale;

  fieldId = guidFor(this);

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
          {{t "components.select-locale.default-option"}}
        </option>
      {{else}}
        <option disabled value="">
          {{t "components.select-locale.default-option"}}
        </option>
      {{/if}}

      {{#each this.options as |opt|}}
        {{#if (eq this.value opt.value)}}
          <option data-test-option={{opt.value}} selected value={{opt.value}}>
            {{opt.label}}
          </option>
        {{else}}
          <option data-test-option={{opt.value}} value={{opt.value}}>
            {{opt.label}}
          </option>
        {{/if}}
      {{/each}}
    </select>
  </template>
}
