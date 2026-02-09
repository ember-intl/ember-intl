import type { TOC } from '@ember/component/template-only';
import { t } from 'ember-intl';

interface HelloSignature {
  Args: {};
}

const Hello: TOC<HelloSignature> = <template>
  <div lang="en-us">
    {{t "hello.message" locale="en-us"}}
  </div>

  <div lang="de-de">
    {{t "hello.message" locale="de-de"}}
  </div>
</template>;

export default Hello;
