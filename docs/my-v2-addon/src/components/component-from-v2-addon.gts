import type { TOC } from '@ember/component/template-only';
import { t } from 'ember-intl';

interface ComponentFromV2AddonSignature {
  Args: {};
}

const ComponentFromV2AddonComponent = <template>
  <div data-test-output="V2 Addon">
    {{t "components.component-from-v2-addon.message"}}
  </div>
</template> satisfies TOC<ComponentFromV2AddonSignature>;

export default ComponentFromV2AddonComponent;
