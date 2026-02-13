import type { TOC } from '@ember/component/template-only';
import { formatRelativeTime } from 'ember-intl';

interface ExampleSignature {
  Args: {};
}

const Example: TOC<ExampleSignature> = <template>
  <div>
    Past: {{formatRelativeTime -1 unit="month"}}
  </div>

  <div>
    Now: {{formatRelativeTime 0 unit="day"}}
  </div>

  <div>
    Future: {{formatRelativeTime 3 unit="week"}}
  </div>
</template>;

export default Example;
