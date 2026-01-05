import { fn } from '@ember/helper';
import { on } from '@ember/modifier';
import { action } from '@ember/object';
import Component from '@glimmer/component';
import { t } from 'ember-intl';
import type { Product } from 'my-v2-app/utils/routes/products';

import { formatPrice } from './card';
import styles from './details.module.css';
import ProductsProductImage from './image';

interface ProductsProductDetailsSignature {
  Args: {
    product: Product;
  };
}

export default class ProductsProductDetails extends Component<ProductsProductDetailsSignature> {
  @action addProductToCart(product: Product): void {
    console.log(`${product.name} has been added to the cart.`);
  }

  <template>
    <article class={{styles.container}} data-test-product-details>
      <header class={{styles.header}}>
        <h2 class={{styles.name}} data-test-field="Name">
          {{@product.name}}
        </h2>
      </header>

      <div class={{styles.image-container}}>
        <ProductsProductImage @src={{@product.imageUrl}} />
      </div>

      <div class={{styles.body}}>
        <section class={{styles.field}}>
          <h3>
            {{t "components.products.product.details.description"}}
          </h3>

          <p data-test-field="Description">
            {{@product.description}}
          </p>
        </section>

        <section class={{styles.field}}>
          <h3>
            {{t "components.products.product.details.price"}}
          </h3>

          <p data-test-field="Price">
            {{formatPrice @product.price}}
          </p>
        </section>

        <section class={{styles.field}}>
          <h3>
            {{t "components.products.product.details.rating"}}
          </h3>

          <p data-test-field="Rating">
            {{t
              "components.products.product.details.rating-value"
              productRating=@product.rating
            }}
          </p>
        </section>

        <section class={{styles.field}}>
          <h3>
            {{t "components.products.product.details.seller"}}
          </h3>

          <p data-test-field="Seller">{{@product.seller}}</p>
        </section>
      </div>

      <div class={{styles.actions}}>
        <button
          data-test-button="Add to Cart"
          type="button"
          {{on "click" (fn this.addProductToCart @product)}}
        >
          {{t "components.products.product.details.add-to-cart"}}
        </button>
      </div>
    </article>
  </template>
}
