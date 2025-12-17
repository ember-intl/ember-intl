import { type Registry as Services, service } from '@ember/service';
import Component from '@glimmer/component';
import { t } from 'ember-intl';
import { ComponentFromV1Addon } from 'my-v1-addon';
import { ComponentFromV2Addon } from 'my-v2-addon';
import ComponentFromApp from 'my-v2-app-with-namespace-from-folders/components/component-from-app';
import TranslationWithArguments from 'my-v2-app-with-namespace-from-folders/components/translation-with-arguments';

interface IndexSignature {
  Args: {
    controller: unknown;
    model: unknown;
  };
}

export default class IndexRoute extends Component<IndexSignature> {
  @service declare intl: Services['intl'];

  get translationToOverwrite(): string {
    return this.intl.t('routes.index.key-to-overwrite');
  }

  <template>
    <div>
      <h1 data-test-output="Title">
        {{t "routes.index.title" htmlSafe=true}}
      </h1>

      <section class="section">
        <h2 data-test-header="Translation with Arguments">
          {{t "components.translation-with-arguments.title"}}
        </h2>

        <TranslationWithArguments />
      </section>

      <section class="section">
        <h2 data-test-header="Components">
          {{t "components.title"}}
        </h2>

        <ComponentFromApp />
        <ComponentFromV1Addon />
        <ComponentFromV2Addon />
      </section>

      <section class="section" data-test-output="Translation Missing">
        {{t "routes.index.key-without-translation"}}
      </section>

      <section class="section" data-test-output="Translation Overwritten">
        {{this.translationToOverwrite}}
      </section>
    </div>
  </template>
}
