import type { TOC } from '@ember/component/template-only';
import { t } from 'ember-intl';

interface HelloSignature {
  Args: {};
}

const Hello: TOC<HelloSignature> = <template>
  {{t "hello.message"}}
</template>;

export default Hello;
