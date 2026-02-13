import type { TOC } from '@ember/component/template-only';
import { hash } from '@ember/helper';
import { t } from 'ember-intl';

interface PhotoAlbumSignature {
  Args: {};
}

const PhotoAlbum: TOC<PhotoAlbumSignature> = <template>
  {{! Use a named argument }}
  {{t "photo-album.summary" numPhotos=3}}

  {{! Use the 2nd positional argument }}
  {{t "photo-album.summary" (hash numPhotos=3)}}
</template>;

export default PhotoAlbum;
