import type { TOC } from '@ember/component/template-only';
import { hash } from '@ember/helper';
import { t } from 'ember-intl';

interface TranslationWithArgumentsSignature {
  Args: {};
}

const TranslationWithArgumentsComponent = <template>
  <div data-test-output="Translation with Arguments">
    <div>
      {{t "components.translation-with-arguments.message"}}
    </div>

    <div>
      {{t "components.translation-with-arguments.message" name="Chris"}}
    </div>

    <div>
      {{#let (hash name="" numPhotos="") as |user|}}
        {{t "components.translation-with-arguments.message" user}}
      {{/let}}
    </div>
  </div>
</template> satisfies TOC<TranslationWithArgumentsSignature>;

export default TranslationWithArgumentsComponent;
