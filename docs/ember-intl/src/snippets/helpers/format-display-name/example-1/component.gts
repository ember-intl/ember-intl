import type { TOC } from '@ember/component/template-only';
import { formatDisplayName } from 'ember-intl';

interface ExampleSignature {
  Args: {};
}

const Example: TOC<ExampleSignature> = <template>
  {{formatDisplayName "MXN" type="currency"}}
</template>;

export default Example;
