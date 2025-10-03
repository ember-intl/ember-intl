import type { TOC } from '@ember/component/template-only';
import { t } from 'ember-intl';

interface LazyHelloSignature {
  Args: {
    name: string;
  };
}

const LazyHelloComponent = <template>
  <div data-test-message>
    {{t "lazy-hello.message" name=@name}}
  </div>
</template> satisfies TOC<LazyHelloSignature>;

export default LazyHelloComponent;
