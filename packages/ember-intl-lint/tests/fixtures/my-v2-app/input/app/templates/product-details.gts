import type { TOC } from '@ember/component/template-only';
import { LinkTo } from '@ember/routing';
import { t } from 'ember-intl';
import { pageTitle } from 'ember-page-title';
import { UiPage } from 'my-addon';
import ProductsProductDetails from 'my-v2-app/components/products/product/details';
import type ProductDetailsController from 'my-v2-app/controllers/product-details';
import type { Model } from 'my-v2-app/routes/product-details';

import styles from './product-details.module.css';

interface ProductDetailsSignature {
  Args: {
    controller: ProductDetailsController;
    model: Model;
  };
}

<template>
  {{pageTitle @model.name}}

  <UiPage @title={{t "routes.product-details.title"}}>
    <div class={{styles.products}}>
      <div class={{styles.product-details}}>
        <ProductsProductDetails @product={{@model}} />
      </div>

      <div class={{styles.actions}}>
        <LinkTo @route="products" data-test-link="Back">
          {{t "routes.product-details.back"}}
        </LinkTo>
      </div>
    </div>
  </UiPage>
</template> satisfies TOC<ProductDetailsSignature>;
