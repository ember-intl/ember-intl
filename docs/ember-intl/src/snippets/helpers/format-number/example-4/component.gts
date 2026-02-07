import type { TOC } from '@ember/component/template-only';
import { formatNumber } from 'ember-intl';

interface ExampleSignature {
  Args: {};
}

const Example: TOC<ExampleSignature> = <template>
  {{formatNumber
    12345
    currency="EUR"
    maximumFractionDigits=1
    notation="compact"
    roundingMode="ceil"
    style="currency"
  }}
</template>;

export default Example;
