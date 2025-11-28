// BEGIN-SNIPPET docs__helpers__t-key__example-1__example.ts
import Component from '@glimmer/component';
import { tKey } from 'ember-intl';

export default class SelectLocale extends Component {
  get options() {
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
}
// END-SNIPPET
