import type { TOC } from '@ember/component/template-only';
import { formatDate } from 'ember-intl';

interface ExampleSignature {
  Args: {};
}

const today = new Date();

const Example: TOC<ExampleSignature> = <template>
  <div lang="en-us">
    {{formatDate today locale="en-us"}}
  </div>

  <div lang="de-de">
    {{formatDate today locale="de-de"}}
  </div>
</template>;

export default Example;
