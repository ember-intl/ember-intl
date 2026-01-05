import type { TOC } from '@ember/component/template-only';
import { hash } from '@ember/helper';
import { LinkTo } from '@ember/routing';
import { ContainerQuery, width } from 'ember-container-query';
import { t } from 'ember-intl';
import type { Product } from 'my-v2-app/utils/routes/products';

import styles from './card.module.css';
import ProductsProductImage from './image';

export function formatPrice(price: number): string {
  return `$${price}`;
}

interface ProductsProductCardSignature {
  Args: {
    product: Product;
    redirectTo?: string;
  };
}

const ProductsProductCard: TOC<ProductsProductCardSignature> = <template>
  <ContainerQuery
    @features={{hash wide=(width min=320)}}
    @tagName="article"
    class={{styles.container}}
    data-test-product-card
  >
    <header class={{styles.header}}>
      <h2 class={{styles.name}} data-test-field="Name">
        {{@product.name}}
      </h2>
    </header>

    <div class={{styles.image-container}}>
      <ProductsProductImage @src={{@product.imageUrl}} />
    </div>

    <div class={{styles.body}}>
      <p class={{styles.description}} data-test-field="Short Description">
        {{@product.shortDescription}}
      </p>

      <p class={{styles.price}} data-test-field="Price">
        {{formatPrice @product.price}}
      </p>
    </div>

    <div class={{styles.actions}}>
      <LinkTo
        @model={{@product.id}}
        @route={{@redirectTo}}
        aria-label={{t
          "components.products.product.card.learn-more.aria-label"
          productName=@product.name
        }}
        class={{styles.link}}
        data-test-link="Learn More"
      >
        {{t "components.products.product.card.learn-more.label"}}
      </LinkTo>
    </div>
  </ContainerQuery>
</template>;

export default ProductsProductCard;
