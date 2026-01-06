import { assert, assertFixture, loadFixture, test } from '@codemod-utils/tests';

import { runCodemod } from '../../src/index.js';
import { inputProject, outputProject } from '../fixtures/my-v2-app/index.js';
import { codemodOptions } from '../helpers/shared-test-setups/my-v2-app.js';

test('index > my-v2-app', async function () {
  loadFixture(inputProject, codemodOptions);

  let lintResults = await runCodemod(codemodOptions);

  assert.deepStrictEqual(lintResults, {
    'no-inconsistent-messages': [
      'components.products.product.card.learn-more.aria-label',
      'components.products.product.card.learn-more.label',
      'components.products.product.details.add-to-cart',
      'components.products.product.details.description',
      'components.products.product.details.price',
      'components.products.product.details.rating',
      'components.products.product.details.rating-value',
      'components.products.product.details.seller',
      'routes.application.app-name',
      'routes.application.copyright',
      'routes.application.navigation-menu.name',
      'routes.application.navigation-menu.routes.form',
      'routes.application.navigation-menu.routes.index',
      'routes.application.navigation-menu.routes.products',
      'routes.application.navigation-text',
      'routes.application.skip-text',
      'routes.error.default-message',
      'routes.form.contact-me-form.fields.donation.label',
      'routes.form.contact-me-form.fields.donation.placeholder',
      'routes.form.contact-me-form.fields.email.label',
      'routes.form.contact-me-form.fields.email.placeholder',
      'routes.form.contact-me-form.fields.message.label',
      'routes.form.contact-me-form.fields.name.label',
      'routes.form.contact-me-form.fields.name.placeholder',
      'routes.form.contact-me-form.fields.subscribe.label',
      'routes.form.contact-me-form.instructions',
      'routes.form.contact-me-form.title',
      'routes.form.title',
      'routes.index.description',
      'routes.index.title',
      'routes.product-details.back',
      'routes.product-details.title',
      'routes.products.filter-by.name.label',
      'routes.products.filter-by.name.placeholder',
      'routes.products.no-products-found',
      'routes.products.sort-by.label',
      'routes.products.sort-by.name-ascending',
      'routes.products.sort-by.name-descending',
      'routes.products.sort-by.price-ascending',
      'routes.products.sort-by.price-descending',
      'routes.products.title',
    ],
    'no-missing-keys': [],
    'no-unused-keys': [],
  });

  assertFixture(outputProject, codemodOptions);

  // Check idempotence
  lintResults = await runCodemod(codemodOptions);

  assert.deepStrictEqual(lintResults, {
    'no-inconsistent-messages': [
      'components.products.product.card.learn-more.aria-label',
      'components.products.product.card.learn-more.label',
      'components.products.product.details.add-to-cart',
      'components.products.product.details.description',
      'components.products.product.details.price',
      'components.products.product.details.rating',
      'components.products.product.details.rating-value',
      'components.products.product.details.seller',
      'routes.application.app-name',
      'routes.application.copyright',
      'routes.application.navigation-menu.name',
      'routes.application.navigation-menu.routes.form',
      'routes.application.navigation-menu.routes.index',
      'routes.application.navigation-menu.routes.products',
      'routes.application.navigation-text',
      'routes.application.skip-text',
      'routes.error.default-message',
      'routes.form.contact-me-form.fields.donation.label',
      'routes.form.contact-me-form.fields.donation.placeholder',
      'routes.form.contact-me-form.fields.email.label',
      'routes.form.contact-me-form.fields.email.placeholder',
      'routes.form.contact-me-form.fields.message.label',
      'routes.form.contact-me-form.fields.name.label',
      'routes.form.contact-me-form.fields.name.placeholder',
      'routes.form.contact-me-form.fields.subscribe.label',
      'routes.form.contact-me-form.instructions',
      'routes.form.contact-me-form.title',
      'routes.form.title',
      'routes.index.description',
      'routes.index.title',
      'routes.product-details.back',
      'routes.product-details.title',
      'routes.products.filter-by.name.label',
      'routes.products.filter-by.name.placeholder',
      'routes.products.no-products-found',
      'routes.products.sort-by.label',
      'routes.products.sort-by.name-ascending',
      'routes.products.sort-by.name-descending',
      'routes.products.sort-by.price-ascending',
      'routes.products.sort-by.price-descending',
      'routes.products.title',
    ],
    'no-missing-keys': [],
    'no-unused-keys': [],
  });

  assertFixture(outputProject, codemodOptions);
});
