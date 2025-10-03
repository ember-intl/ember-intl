import { t } from 'ember-intl';

import type { TOC } from '@ember/component/template-only';

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

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    LazyHello: typeof LazyHelloComponent;
  }
}
