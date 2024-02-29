/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging, ember/no-classic-classes, ember/no-classic-components, ember/no-computed-properties-in-native-classes, import/export */
import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service, type Registry as Services } from '@ember/service';
import type { IntlService } from 'ember-intl';
import { intl, raw, t } from 'ember-intl/macros';

interface MacrosSignature {
  Args: {
    fruits?: string[];
    name: string;
  };
}

export default class MacrosComponent extends Component<MacrosSignature> {
  @service declare intl: Services['intl'];

  tagName = '';

  @computed('intl.{locale,primaryLocale}')
  get fruits(): string[] {
    switch (this.intl.primaryLocale) {
      case 'de-de': {
        return ['Äpfel', 'Bananen', 'Orangen'];
      }

      case 'en-us': {
        return ['Apples', 'Bananas', 'Oranges'];
      }

      default: {
        throw new Error('Locale must be de-de or en-us.');
      }
    }
  }

  @intl('fruits', function (_intl: IntlService) {
    // @ts-expect-error: 'this' implicitly has type 'any' because it does not have a type annotation.
    return _intl.formatList(this.fruits);
  })
  declare outputForIntl: string;

  @t('components.macros-classic.hello.message', {
    name: 'name',
  })
  declare outputForT: string;

  @t('components.macros-classic.hello.message', {
    name: raw('name'),
  })
  declare outputForTWithRaw: string;
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    Macros: MacrosComponent;
  }
}
