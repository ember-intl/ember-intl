import type { TOC } from '@ember/component/template-only';
import { hash } from '@ember/helper';
import { t } from 'ember-intl';

interface ExampleSignature {
  Args: {};
}

const Example: TOC<ExampleSignature> = <template>
  <div lang="en-us">
    {{! Data passed as a named argument }}
    {{t "photo-album.summary" locale="en-us" numPhotos=3}}
  </div>

  <div lang="de-de">
    {{! Data passed as a positional argument }}
    {{t "photo-album.summary" (hash numPhotos=3) locale="de-de"}}
  </div>
</template>;

export default Example;
