import type { TOC } from '@ember/component/template-only';
import { formatMessage } from 'ember-intl';

interface ExampleSignature {
  Args: {};
}

const descriptor = {
  defaultMessage:
    '{name} took {numPhotos, plural, =0 {no photos} =1 {one photo} other {# photos}} on {timestamp, date, long}.',
  description: 'A summary of the photoshoot from this week',
  id: 'photoshoot-summary',
};

const today = new Date();
const yesterday = new Date(today.valueOf() - 24 * 60 * 60 * 1000);

const Example: TOC<ExampleSignature> = <template>
  <div>
    {{formatMessage descriptor name="Sonja" numPhotos=12 timestamp=yesterday}}
  </div>

  <div>
    {{formatMessage descriptor name="Chris" numPhotos=0 timestamp=yesterday}}
  </div>

  <div>
    {{formatMessage descriptor name="Maki" numPhotos=1 timestamp=today}}
  </div>
</template>;

export default Example;
