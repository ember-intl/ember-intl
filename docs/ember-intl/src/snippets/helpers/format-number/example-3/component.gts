import type { TOC } from '@ember/component/template-only';
import { formatNumber } from 'ember-intl';

interface ExampleSignature {
  Args: {};
}

const Example: TOC<ExampleSignature> = <template>
  <div lang="en-us">
    {{formatNumber 12345 locale="en-us"}}
  </div>

  <div lang="de-de">
    {{formatNumber 12345 locale="de-de"}}
  </div>
</template>;

export default Example;
