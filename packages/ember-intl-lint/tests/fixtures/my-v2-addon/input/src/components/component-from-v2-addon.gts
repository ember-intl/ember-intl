import type { TOC } from '@ember/component/template-only';
import { t } from 'ember-intl';

interface ComponentFromV2AddonSignature {
  Args: {};
}

const ComponentFromV2Addon: TOC<ComponentFromV2AddonSignature> = <template>
  <div data-test-output="V2 Addon">
    {{t "components.component-from-v2-addon.message"}}
  </div>
</template>;

export default ComponentFromV2Addon;
