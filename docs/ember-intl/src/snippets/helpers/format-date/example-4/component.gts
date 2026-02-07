import type { TOC } from '@ember/component/template-only';
import { formatDate } from 'ember-intl';

interface ExampleSignature {
  Args: {};
}

const today = new Date();

const Example: TOC<ExampleSignature> = <template>
  {{formatDate today dateStyle="full" timeZone="America/New_York"}}
</template>;

export default Example;
