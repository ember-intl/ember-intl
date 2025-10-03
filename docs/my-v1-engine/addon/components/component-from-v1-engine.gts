import { t } from 'ember-intl';

import type { TOC } from '@ember/component/template-only';

interface ComponentFromV1EngineSignature {
  Args: {};
}

const ComponentFromV1EngineComponent = <template>
<div data-test-output="Engine">
  {{t "components.component-from-v1-engine.message"}}
</div>
</template> satisfies TOC<ComponentFromV1EngineSignature>;

export default ComponentFromV1EngineComponent;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    ComponentFromV1Engine: typeof ComponentFromV1EngineComponent;
    'component-from-v1-engine': typeof ComponentFromV1EngineComponent;
  }
}
