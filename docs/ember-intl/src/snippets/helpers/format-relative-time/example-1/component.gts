import type { TOC } from '@ember/component/template-only';
import { formatRelativeTime } from 'ember-intl';

interface ExampleSignature {
  Args: {};
}

const Example: TOC<ExampleSignature> = <template>
  <div>
    Past: {{formatRelativeTime -1}}
  </div>

  <div>
    Now: {{formatRelativeTime 0}}
  </div>

  <div>
    Future: {{formatRelativeTime 3}}
  </div>
</template>;

export default Example;
