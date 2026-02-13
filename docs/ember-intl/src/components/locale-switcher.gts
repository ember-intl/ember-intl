import { fn } from '@ember/helper';
import { on } from '@ember/modifier';
import { action } from '@ember/object';
import { type Registry as Services, service } from '@ember/service';
import Component from '@glimmer/component';

interface LocaleSwitcherSignature {
  Args: {};
  Blocks: {
    default: [];
  };
}

export default class LocaleSwitcher extends Component<LocaleSwitcherSignature> {
  @service declare intl: Services['intl'];

  get supportedLocales(): string[] {
    return ['en-us', 'de-de', 'es-es', 'fr-fr'];
  }

  @action updateLocale(locale: string) {
    this.intl.setLocale([locale]);
  }

  <template>
    <ul class="locale-switcher container" role="toolbar">
      {{#each this.supportedLocales as |locale|}}
        <li class="list-item">
          <button
            class="button"
            type="button"
            {{on "click" (fn this.updateLocale locale)}}
          >
            {{locale}}
          </button>
        </li>
      {{/each}}
    </ul>

    {{yield}}
  </template>
}
