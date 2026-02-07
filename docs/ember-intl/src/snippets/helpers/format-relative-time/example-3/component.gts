import type { TOC } from '@ember/component/template-only';
import { formatRelativeTime } from 'ember-intl';

interface ExampleSignature {
  Args: {};
}

const Example: TOC<ExampleSignature> = <template>
  <div lang="en-us">
    {{formatRelativeTime -1 locale="en-us"}}
  </div>

  <div lang="de-de">
    {{formatRelativeTime -1 locale="de-de"}}
  </div>
</template>;

export default Example;
