import Component from '@glimmer/component';
import { t, tKey } from 'ember-intl';

type Option = {
  labelKey: string;
  value: string;
};

interface SelectLocaleSignature {
  Args: {};
}

export default class SelectLocale extends Component<SelectLocaleSignature> {
  get options(): Option[] {
    return [
      {
        labelKey: tKey('select-locale.de-de'),
        value: 'de-de',
      },
      {
        labelKey: tKey('select-locale.en-us'),
        value: 'en-us',
      },
    ];
  }

  <template>
    {{#each this.options as |opt|}}
      <option value={{opt.value}}>
        {{t opt.labelKey}}
      </option>
    {{/each}}
  </template>
}
