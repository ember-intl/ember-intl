import type { TOC } from '@ember/component/template-only';
import { hash } from '@ember/helper';
import { t } from 'ember-intl';

interface PhotoAlbumSignature {
  Args: {
    numPhotos: number;
  };
}

const PhotoAlbum: TOC<PhotoAlbumSignature> = <template>
  {{! Data passed as a named argument }}
  {{t "photo-album.summary" numPhotos=@numPhotos}}

  {{! Data passed as a positional argument }}
  {{t "photo-album.summary" (hash numPhotos=@numPhotos)}}
</template>;

export default PhotoAlbum;
