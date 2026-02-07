import type { TOC } from '@ember/component/template-only';
import { formatList } from 'ember-intl';

interface ExampleSignature {
  Args: {};
}

const letters = ['A', 'B', 'C'];

const Example: TOC<ExampleSignature> = <template>
  {{formatList letters type="disjunction"}}
</template>;

export default Example;
