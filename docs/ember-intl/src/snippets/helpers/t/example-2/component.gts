import type { TOC } from '@ember/component/template-only';
import { t } from 'ember-intl';

interface HelloSignature {
  Args: {
    name: string;
  };
}

const Hello: TOC<HelloSignature> = <template>
  {{t "hello.message" name=@name}}
</template>;

export default Hello;
