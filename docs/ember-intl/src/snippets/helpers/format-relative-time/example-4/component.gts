import type { TOC } from '@ember/component/template-only';
import { formatRelativeTime } from 'ember-intl';

interface ExampleSignature {
  Args: {};
}

const Example: TOC<ExampleSignature> = <template>
  Past: {{formatRelativeTime -1 unit="month"}}
  Now: {{formatRelativeTime 0 unit="day"}}
  Future: {{formatRelativeTime 3 unit="week"}}
</template>;

export default Example;
