import type { TOC } from '@ember/component/template-only';
import { formatTime } from 'ember-intl';

interface ExampleSignature {
  Args: {};
}

const today = new Date();

const Example: TOC<ExampleSignature> = <template>
  {{formatTime today timeStyle="full" timeZone="America/New_York"}}
</template>;

export default Example;
