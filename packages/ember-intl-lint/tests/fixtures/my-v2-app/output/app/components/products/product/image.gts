import type { TOC } from '@ember/component/template-only';
import { isTesting, macroCondition } from '@embroider/macros';

import styles from './image.module.css';

interface ProductsProductImageSignature {
  Args: {
    src: string;
  };
}

const ProductsProductImage: TOC<ProductsProductImageSignature> = macroCondition(
  isTesting(),
)
  ? <template>
      <div class={{styles.placeholder-image}}></div>
    </template>
  : <template><img alt="" class={{styles.image}} src={{@src}} /></template>;

export default ProductsProductImage;
