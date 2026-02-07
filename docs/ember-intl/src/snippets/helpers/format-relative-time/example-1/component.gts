import type { TOC } from '@ember/component/template-only';
import { formatRelativeTime } from 'ember-intl';

interface ExampleSignature {
  Args: {};
}

const Example: TOC<ExampleSignature> = <template>
  Past: {{formatRelativeTime -1}}
  Now: {{formatRelativeTime 0}}
  Future: {{formatRelativeTime 3}}
</template>;

export default Example;
