import type { TOC } from '@ember/component/template-only';
import { formatDate } from 'ember-intl';

interface ExampleSignature {
  Args: {};
}

const today = new Date();

const Example: TOC<ExampleSignature> = <template>
  {{formatDate today format="user-friendly"}}
</template>;

export default Example;
