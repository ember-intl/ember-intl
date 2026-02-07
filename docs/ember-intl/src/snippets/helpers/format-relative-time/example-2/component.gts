import type { TOC } from '@ember/component/template-only';
import { formatRelativeTime } from 'ember-intl';

interface ExampleSignature {
  Args: {};
}

const Example: TOC<ExampleSignature> = <template>
  {{formatRelativeTime -1 format="compact"}}
</template>;

export default Example;
