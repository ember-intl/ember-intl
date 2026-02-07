import type { TOC } from '@ember/component/template-only';
import { formatTime } from 'ember-intl';

interface ExampleSignature {
  Args: {};
}

const today = new Date();

const Example: TOC<ExampleSignature> = <template>
  <div lang="en-us">
    {{formatTime today locale="en-us"}}
  </div>

  <div lang="de-de">
    {{formatTime today locale="de-de"}}
  </div>
</template>;

export default Example;
