import { t } from 'ember-intl';

import type { TOC } from '@ember/component/template-only';

interface ComponentFromV1AddonSignature {
  Args: {};
}

const ComponentFromV1AddonComponent = <template>
<div data-test-output="V1 Addon">
  {{t "components.component-from-v1-addon.message"}}
</div>
</template> satisfies TOC<ComponentFromV1AddonSignature>;

export default ComponentFromV1AddonComponent;
