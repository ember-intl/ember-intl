import type { TOC } from '@ember/component/template-only';
import { formatList } from 'ember-intl';

interface ExampleSignature {
  Args: {};
}

const letters = ['A', 'B', 'C'];

const Example: TOC<ExampleSignature> = <template>
  {{formatList letters}}
</template>;

export default Example;
