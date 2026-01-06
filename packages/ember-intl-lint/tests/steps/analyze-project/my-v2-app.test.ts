import { assert, loadFixture, test } from '@codemod-utils/tests';

import { analyzeProject } from '../../../src/steps/index.js';
import { inputProject } from '../../fixtures/my-v2-app/index.js';
import { normalizeProject } from '../../helpers/index.js';
import {
  codemodOptions,
  options,
} from '../../helpers/shared-test-setups/my-v2-app.js';

test('steps | analyze-project > my-v2-app', function () {
  loadFixture(inputProject, codemodOptions);

  const project = analyzeProject(options);

  assert.deepStrictEqual(
    project,
    normalizeProject({
      availableKeys: new Map([
        [
          'components.products.product.card.learn-more.aria-label',
          new Map([
            [
              'en-us',
              {
                filePath: 'translations/en-us.yaml',
                icuArguments: {
                  argument: new Set(['productName']),
                  date: new Set(),
                  number: new Set(),
                  plural: new Set(),
                  select: new Set(),
                  time: new Set(),
                },
                message: 'Learn more about {productName}',
              },
            ],
          ]),
        ],
        [
          'components.products.product.card.learn-more.label',
          new Map([
            [
              'en-us',
              {
                filePath: 'translations/en-us.yaml',
                icuArguments: {
                  argument: new Set(),
                  date: new Set(),
                  number: new Set(),
                  plural: new Set(),
                  select: new Set(),
                  time: new Set(),
                },
                message: 'Learn more',
              },
            ],
          ]),
        ],
        [
          'components.products.product.details.add-to-cart',
          new Map([
            [
              'en-us',
              {
                filePath: 'translations/en-us.yaml',
                icuArguments: {
                  argument: new Set(),
                  date: new Set(),
                  number: new Set(),
                  plural: new Set(),
                  select: new Set(),
                  time: new Set(),
                },
                message: 'Add to Cart',
              },
            ],
          ]),
        ],
        [
          'components.products.product.details.description',
          new Map([
            [
              'en-us',
              {
                filePath: 'translations/en-us.yaml',
                icuArguments: {
                  argument: new Set(),
                  date: new Set(),
                  number: new Set(),
                  plural: new Set(),
                  select: new Set(),
                  time: new Set(),
                },
                message: 'Description',
              },
            ],
          ]),
        ],
        [
          'components.products.product.details.price',
          new Map([
            [
              'en-us',
              {
                filePath: 'translations/en-us.yaml',
                icuArguments: {
                  argument: new Set(),
                  date: new Set(),
                  number: new Set(),
                  plural: new Set(),
                  select: new Set(),
                  time: new Set(),
                },
                message: 'Price',
              },
            ],
          ]),
        ],
        [
          'components.products.product.details.rating',
          new Map([
            [
              'en-us',
              {
                filePath: 'translations/en-us.yaml',
                icuArguments: {
                  argument: new Set(),
                  date: new Set(),
                  number: new Set(),
                  plural: new Set(),
                  select: new Set(),
                  time: new Set(),
                },
                message: 'Rating',
              },
            ],
          ]),
        ],
        [
          'components.products.product.details.rating-value',
          new Map([
            [
              'en-us',
              {
                filePath: 'translations/en-us.yaml',
                icuArguments: {
                  argument: new Set(['productRating']),
                  date: new Set(),
                  number: new Set(),
                  plural: new Set(),
                  select: new Set(),
                  time: new Set(),
                },
                message: '{productRating} out of 5 stars',
              },
            ],
          ]),
        ],
        [
          'components.products.product.details.seller',
          new Map([
            [
              'en-us',
              {
                filePath: 'translations/en-us.yaml',
                icuArguments: {
                  argument: new Set(),
                  date: new Set(),
                  number: new Set(),
                  plural: new Set(),
                  select: new Set(),
                  time: new Set(),
                },
                message: 'Seller',
              },
            ],
          ]),
        ],
        [
          'routes.application.app-name',
          new Map([
            [
              'en-us',
              {
                filePath: 'translations/en-us.yaml',
                icuArguments: {
                  argument: new Set(),
                  date: new Set(),
                  number: new Set(),
                  plural: new Set(),
                  select: new Set(),
                  time: new Set(),
                },
                message: 'Ember Workshop',
              },
            ],
          ]),
        ],
        [
          'routes.application.copyright',
          new Map([
            [
              'en-us',
              {
                filePath: 'translations/en-us.yaml',
                icuArguments: {
                  argument: new Set(),
                  date: new Set(),
                  number: new Set(),
                  plural: new Set(),
                  select: new Set(),
                  time: new Set(),
                },
                message:
                  'Created by <a href="https://www.linkedin.com/in/ijlee2/" rel="noopener noreferrer" target="_blank">Isaac J. Lee</a> © 2025',
              },
            ],
          ]),
        ],
        [
          'routes.application.navigation-menu.name',
          new Map([
            [
              'en-us',
              {
                filePath: 'translations/en-us.yaml',
                icuArguments: {
                  argument: new Set(),
                  date: new Set(),
                  number: new Set(),
                  plural: new Set(),
                  select: new Set(),
                  time: new Set(),
                },
                message: 'Main Navigation',
              },
            ],
          ]),
        ],
        [
          'routes.application.navigation-menu.routes.form',
          new Map([
            [
              'en-us',
              {
                filePath: 'translations/en-us.yaml',
                icuArguments: {
                  argument: new Set(),
                  date: new Set(),
                  number: new Set(),
                  plural: new Set(),
                  select: new Set(),
                  time: new Set(),
                },
                message: 'Form',
              },
            ],
          ]),
        ],
        [
          'routes.application.navigation-menu.routes.index',
          new Map([
            [
              'en-us',
              {
                filePath: 'translations/en-us.yaml',
                icuArguments: {
                  argument: new Set(),
                  date: new Set(),
                  number: new Set(),
                  plural: new Set(),
                  select: new Set(),
                  time: new Set(),
                },
                message: 'Home',
              },
            ],
          ]),
        ],
        [
          'routes.application.navigation-menu.routes.products',
          new Map([
            [
              'en-us',
              {
                filePath: 'translations/en-us.yaml',
                icuArguments: {
                  argument: new Set(),
                  date: new Set(),
                  number: new Set(),
                  plural: new Set(),
                  select: new Set(),
                  time: new Set(),
                },
                message: 'Products',
              },
            ],
          ]),
        ],
        [
          'routes.application.navigation-text',
          new Map([
            [
              'en-us',
              {
                filePath: 'translations/en-us.yaml',
                icuArguments: {
                  argument: new Set(),
                  date: new Set(),
                  number: new Set(),
                  plural: new Set(),
                  select: new Set(),
                  time: new Set(),
                },
                message:
                  'The page navigation is complete. You may now navigate the page content as you wish.',
              },
            ],
          ]),
        ],
        [
          'routes.application.skip-text',
          new Map([
            [
              'en-us',
              {
                filePath: 'translations/en-us.yaml',
                icuArguments: {
                  argument: new Set(),
                  date: new Set(),
                  number: new Set(),
                  plural: new Set(),
                  select: new Set(),
                  time: new Set(),
                },
                message: 'Skip to main content',
              },
            ],
          ]),
        ],
        [
          'routes.error.default-message',
          new Map([
            [
              'en-us',
              {
                filePath: 'translations/en-us.yaml',
                icuArguments: {
                  argument: new Set(),
                  date: new Set(),
                  number: new Set(),
                  plural: new Set(),
                  select: new Set(),
                  time: new Set(),
                },
                message: 'Something went wrong.',
              },
            ],
          ]),
        ],
        [
          'routes.form.contact-me-form.fields.donation.label',
          new Map([
            [
              'en-us',
              {
                filePath: 'translations/en-us.yaml',
                icuArguments: {
                  argument: new Set(),
                  date: new Set(),
                  number: new Set(),
                  plural: new Set(),
                  select: new Set(),
                  time: new Set(),
                },
                message: 'Donation amount ($)',
              },
            ],
          ]),
        ],
        [
          'routes.form.contact-me-form.fields.donation.placeholder',
          new Map([
            [
              'en-us',
              {
                filePath: 'translations/en-us.yaml',
                icuArguments: {
                  argument: new Set(),
                  date: new Set(),
                  number: new Set(),
                  plural: new Set(),
                  select: new Set(),
                  time: new Set(),
                },
                message: '100',
              },
            ],
          ]),
        ],
        [
          'routes.form.contact-me-form.fields.email.label',
          new Map([
            [
              'en-us',
              {
                filePath: 'translations/en-us.yaml',
                icuArguments: {
                  argument: new Set(),
                  date: new Set(),
                  number: new Set(),
                  plural: new Set(),
                  select: new Set(),
                  time: new Set(),
                },
                message: 'Email',
              },
            ],
          ]),
        ],
        [
          'routes.form.contact-me-form.fields.email.placeholder',
          new Map([
            [
              'en-us',
              {
                filePath: 'translations/en-us.yaml',
                icuArguments: {
                  argument: new Set(),
                  date: new Set(),
                  number: new Set(),
                  plural: new Set(),
                  select: new Set(),
                  time: new Set(),
                },
                message: 'zoey@emberjs.com',
              },
            ],
          ]),
        ],
        [
          'routes.form.contact-me-form.fields.message.label',
          new Map([
            [
              'en-us',
              {
                filePath: 'translations/en-us.yaml',
                icuArguments: {
                  argument: new Set(),
                  date: new Set(),
                  number: new Set(),
                  plural: new Set(),
                  select: new Set(),
                  time: new Set(),
                },
                message: 'Message',
              },
            ],
          ]),
        ],
        [
          'routes.form.contact-me-form.fields.name.label',
          new Map([
            [
              'en-us',
              {
                filePath: 'translations/en-us.yaml',
                icuArguments: {
                  argument: new Set(),
                  date: new Set(),
                  number: new Set(),
                  plural: new Set(),
                  select: new Set(),
                  time: new Set(),
                },
                message: 'Name',
              },
            ],
          ]),
        ],
        [
          'routes.form.contact-me-form.fields.name.placeholder',
          new Map([
            [
              'en-us',
              {
                filePath: 'translations/en-us.yaml',
                icuArguments: {
                  argument: new Set(),
                  date: new Set(),
                  number: new Set(),
                  plural: new Set(),
                  select: new Set(),
                  time: new Set(),
                },
                message: 'Zoey',
              },
            ],
          ]),
        ],
        [
          'routes.form.contact-me-form.fields.subscribe.label',
          new Map([
            [
              'en-us',
              {
                filePath: 'translations/en-us.yaml',
                icuArguments: {
                  argument: new Set(),
                  date: new Set(),
                  number: new Set(),
                  plural: new Set(),
                  select: new Set(),
                  time: new Set(),
                },
                message: 'Subscribe to The Ember Times?',
              },
            ],
          ]),
        ],
        [
          'routes.form.contact-me-form.instructions',
          new Map([
            [
              'en-us',
              {
                filePath: 'translations/en-us.yaml',
                icuArguments: {
                  argument: new Set(),
                  date: new Set(),
                  number: new Set(),
                  plural: new Set(),
                  select: new Set(),
                  time: new Set(),
                },
                message:
                  'Still have questions about ember-container-query? Try sending me a message.',
              },
            ],
          ]),
        ],
        [
          'routes.form.contact-me-form.title',
          new Map([
            [
              'en-us',
              {
                filePath: 'translations/en-us.yaml',
                icuArguments: {
                  argument: new Set(),
                  date: new Set(),
                  number: new Set(),
                  plural: new Set(),
                  select: new Set(),
                  time: new Set(),
                },
                message: 'Contact me',
              },
            ],
          ]),
        ],
        [
          'routes.form.title',
          new Map([
            [
              'en-us',
              {
                filePath: 'translations/en-us.yaml',
                icuArguments: {
                  argument: new Set(),
                  date: new Set(),
                  number: new Set(),
                  plural: new Set(),
                  select: new Set(),
                  time: new Set(),
                },
                message: 'Form',
              },
            ],
          ]),
        ],
        [
          'routes.index.description',
          new Map([
            [
              'en-us',
              {
                filePath: 'translations/en-us.yaml',
                icuArguments: {
                  argument: new Set(),
                  date: new Set(),
                  number: new Set(),
                  plural: new Set(),
                  select: new Set(),
                  time: new Set(),
                },
                message:
                  'To see what you can do with <a href="https://emberjs.com/" target="_blank" rel="noopener noreferrer">Ember.js</a>, visit one of the examples in the main navigation.',
              },
            ],
          ]),
        ],
        [
          'routes.index.title',
          new Map([
            [
              'en-us',
              {
                filePath: 'translations/en-us.yaml',
                icuArguments: {
                  argument: new Set(),
                  date: new Set(),
                  number: new Set(),
                  plural: new Set(),
                  select: new Set(),
                  time: new Set(),
                },
                message: 'Ember Workshop',
              },
            ],
          ]),
        ],
        [
          'routes.product-details.back',
          new Map([
            [
              'en-us',
              {
                filePath: 'translations/en-us.yaml',
                icuArguments: {
                  argument: new Set(),
                  date: new Set(),
                  number: new Set(),
                  plural: new Set(),
                  select: new Set(),
                  time: new Set(),
                },
                message: 'See all products',
              },
            ],
          ]),
        ],
        [
          'routes.product-details.title',
          new Map([
            [
              'en-us',
              {
                filePath: 'translations/en-us.yaml',
                icuArguments: {
                  argument: new Set(),
                  date: new Set(),
                  number: new Set(),
                  plural: new Set(),
                  select: new Set(),
                  time: new Set(),
                },
                message: 'Product Details',
              },
            ],
          ]),
        ],
        [
          'routes.products.filter-by.name.label',
          new Map([
            [
              'en-us',
              {
                filePath: 'translations/en-us.yaml',
                icuArguments: {
                  argument: new Set(),
                  date: new Set(),
                  number: new Set(),
                  plural: new Set(),
                  select: new Set(),
                  time: new Set(),
                },
                message: 'Filter by name',
              },
            ],
          ]),
        ],
        [
          'routes.products.filter-by.name.placeholder',
          new Map([
            [
              'en-us',
              {
                filePath: 'translations/en-us.yaml',
                icuArguments: {
                  argument: new Set(),
                  date: new Set(),
                  number: new Set(),
                  plural: new Set(),
                  select: new Set(),
                  time: new Set(),
                },
                message: 'Cake, pasta, etc.',
              },
            ],
          ]),
        ],
        [
          'routes.products.no-products-found',
          new Map([
            [
              'en-us',
              {
                filePath: 'translations/en-us.yaml',
                icuArguments: {
                  argument: new Set(),
                  date: new Set(),
                  number: new Set(),
                  plural: new Set(),
                  select: new Set(),
                  time: new Set(),
                },
                message: 'No products found.',
              },
            ],
          ]),
        ],
        [
          'routes.products.sort-by.label',
          new Map([
            [
              'en-us',
              {
                filePath: 'translations/en-us.yaml',
                icuArguments: {
                  argument: new Set(),
                  date: new Set(),
                  number: new Set(),
                  plural: new Set(),
                  select: new Set(),
                  time: new Set(),
                },
                message: 'Sort by',
              },
            ],
          ]),
        ],
        [
          'routes.products.sort-by.name-ascending',
          new Map([
            [
              'en-us',
              {
                filePath: 'translations/en-us.yaml',
                icuArguments: {
                  argument: new Set(),
                  date: new Set(),
                  number: new Set(),
                  plural: new Set(),
                  select: new Set(),
                  time: new Set(),
                },
                message: 'Name: A to Z',
              },
            ],
          ]),
        ],
        [
          'routes.products.sort-by.name-descending',
          new Map([
            [
              'en-us',
              {
                filePath: 'translations/en-us.yaml',
                icuArguments: {
                  argument: new Set(),
                  date: new Set(),
                  number: new Set(),
                  plural: new Set(),
                  select: new Set(),
                  time: new Set(),
                },
                message: 'Name: Z to A',
              },
            ],
          ]),
        ],
        [
          'routes.products.sort-by.price-ascending',
          new Map([
            [
              'en-us',
              {
                filePath: 'translations/en-us.yaml',
                icuArguments: {
                  argument: new Set(),
                  date: new Set(),
                  number: new Set(),
                  plural: new Set(),
                  select: new Set(),
                  time: new Set(),
                },
                message: 'Price: Low to High',
              },
            ],
          ]),
        ],
        [
          'routes.products.sort-by.price-descending',
          new Map([
            [
              'en-us',
              {
                filePath: 'translations/en-us.yaml',
                icuArguments: {
                  argument: new Set(),
                  date: new Set(),
                  number: new Set(),
                  plural: new Set(),
                  select: new Set(),
                  time: new Set(),
                },
                message: 'Price: High to Low',
              },
            ],
          ]),
        ],
        [
          'routes.products.title',
          new Map([
            [
              'en-us',
              {
                filePath: 'translations/en-us.yaml',
                icuArguments: {
                  argument: new Set(),
                  date: new Set(),
                  number: new Set(),
                  plural: new Set(),
                  select: new Set(),
                  time: new Set(),
                },
                message: 'Products',
              },
            ],
          ]),
        ],
      ]),
      translationFiles: new Map([
        [
          'translations/de-de.yaml',
          {
            format: 'yaml',
            isInternal: true,
            locale: 'de-de',
            translationsDir: 'translations',
          },
        ],
        [
          'translations/en-us.yaml',
          {
            format: 'yaml',
            isInternal: true,
            locale: 'en-us',
            translationsDir: 'translations',
          },
        ],
      ]),
      usedKeys: new Map([
        [
          'components.products.product.card.learn-more.aria-label',
          ['app/components/products/product/card.gts'],
        ],
        [
          'components.products.product.card.learn-more.label',
          ['app/components/products/product/card.gts'],
        ],
        [
          'components.products.product.details.add-to-cart',
          ['app/components/products/product/details.gts'],
        ],
        [
          'components.products.product.details.description',
          ['app/components/products/product/details.gts'],
        ],
        [
          'components.products.product.details.price',
          ['app/components/products/product/details.gts'],
        ],
        [
          'components.products.product.details.rating',
          ['app/components/products/product/details.gts'],
        ],
        [
          'components.products.product.details.rating-value',
          ['app/components/products/product/details.gts'],
        ],
        [
          'components.products.product.details.seller',
          ['app/components/products/product/details.gts'],
        ],
        ['routes.application.app-name', ['app/templates/application.gts']],
        ['routes.application.copyright', ['app/templates/application.gts']],
        [
          'routes.application.navigation-menu.name',
          ['app/templates/application.gts'],
        ],
        [
          'routes.application.navigation-menu.routes.form',
          ['app/templates/application.gts'],
        ],
        [
          'routes.application.navigation-menu.routes.index',
          ['app/templates/application.gts'],
        ],
        [
          'routes.application.navigation-menu.routes.products',
          ['app/templates/application.gts'],
        ],
        [
          'routes.application.navigation-text',
          ['app/templates/application.gts'],
        ],
        ['routes.application.skip-text', ['app/templates/application.gts']],
        [
          'routes.form.contact-me-form.fields.donation.label',
          ['app/templates/form.gts'],
        ],
        [
          'routes.form.contact-me-form.fields.donation.placeholder',
          ['app/templates/form.gts'],
        ],
        [
          'routes.form.contact-me-form.fields.email.label',
          ['app/templates/form.gts'],
        ],
        [
          'routes.form.contact-me-form.fields.email.placeholder',
          ['app/templates/form.gts'],
        ],
        [
          'routes.form.contact-me-form.fields.message.label',
          ['app/templates/form.gts'],
        ],
        [
          'routes.form.contact-me-form.fields.name.label',
          ['app/templates/form.gts'],
        ],
        [
          'routes.form.contact-me-form.fields.name.placeholder',
          ['app/templates/form.gts'],
        ],
        [
          'routes.form.contact-me-form.fields.subscribe.label',
          ['app/templates/form.gts'],
        ],
        [
          'routes.form.contact-me-form.instructions',
          ['app/templates/form.gts'],
        ],
        ['routes.form.contact-me-form.title', ['app/templates/form.gts']],
        ['routes.form.title', ['app/templates/form.gts']],
        ['routes.index.description', ['app/templates/index.gts']],
        ['routes.index.title', ['app/templates/index.gts']],
        ['routes.product-details.back', ['app/templates/product-details.gts']],
        ['routes.product-details.title', ['app/templates/product-details.gts']],
        [
          'routes.products.filter-by.name.label',
          ['app/templates/products.gts'],
        ],
        [
          'routes.products.filter-by.name.placeholder',
          ['app/templates/products.gts'],
        ],
        ['routes.products.no-products-found', ['app/templates/products.gts']],
        ['routes.products.sort-by.label', ['app/templates/products.gts']],
        [
          'routes.products.sort-by.name-ascending',
          ['app/controllers/products.ts'],
        ],
        [
          'routes.products.sort-by.name-descending',
          ['app/controllers/products.ts'],
        ],
        [
          'routes.products.sort-by.price-ascending',
          ['app/controllers/products.ts'],
        ],
        [
          'routes.products.sort-by.price-descending',
          ['app/controllers/products.ts'],
        ],
        ['routes.products.title', ['app/templates/products.gts']],
      ]),
    }),
  );
});
