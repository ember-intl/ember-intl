import type { TOC } from '@ember/component/template-only';
import { t } from 'ember-intl';

interface ComponentFromAppSignature {
  Args: {};
}

const ComponentFromAppComponent = <template>
  <div data-test-output="App">
    {{t "components.component-from-app.message"}}
  </div>
</template> satisfies TOC<ComponentFromAppSignature>;

export default ComponentFromAppComponent;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    ComponentFromApp: typeof ComponentFromAppComponent;
  }
}
