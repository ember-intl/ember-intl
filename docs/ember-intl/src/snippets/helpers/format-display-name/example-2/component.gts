import type { TOC } from '@ember/component/template-only';
import { formatDisplayName } from 'ember-intl';

interface ExampleSignature {
  Args: {};
}

const Example: TOC<ExampleSignature> = <template>
  <div lang="en-us">
    {{formatDisplayName "DE" locale="en-us" type="region"}}
  </div>

  <div lang="de-de">
    {{formatDisplayName "DE" locale="de-de" type="region"}}
  </div>
</template>;

export default Example;
