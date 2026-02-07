import type { TOC } from '@ember/component/template-only';
import { formatList } from 'ember-intl';

interface ExampleSignature {
  Args: {};
}

const letters = ['A', 'B', 'C'];

const Example: TOC<ExampleSignature> = <template>
  <div lang="en-us">
    {{formatList letters locale="en-us"}}
  </div>

  <div lang="de-de">
    {{formatList letters locale="de-de"}}
  </div>
</template>;

export default Example;
