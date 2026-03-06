import type { TOC } from '@ember/component/template-only';
import { formatDisplayName } from 'ember-intl';

interface ExampleSignature {
  Args: {};
}

const Example: TOC<ExampleSignature> = <template>
  {{formatDisplayName "nl-be" languageDisplay="standard" type="language"}}
</template>;

export default Example;
