import type { TOC } from '@ember/component/template-only';
import { formatMessage } from 'ember-intl';

interface ExampleSignature {
  Args: {};
}

const descriptor = {
  defaultMessage: '<em>{numPhotos, number} photos taken.</em>',
  description: 'A short summary of the photoshoot from this week',
  id: 'photoshoot-short-summary',
};

const Example: TOC<ExampleSignature> = <template>
  {{formatMessage descriptor htmlSafe=true numPhotos=3}}
</template>;

export default Example;
