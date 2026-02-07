import type { TOC } from '@ember/component/template-only';
import { formatDateRange } from 'ember-intl';

interface ExampleSignature {
  Args: {};
}

const today = new Date();
const yesterday = new Date(today.valueOf() - 24 * 60 * 60 * 1000);

const Example: TOC<ExampleSignature> = <template>
  {{formatDateRange yesterday today}}
</template>;

export default Example;
