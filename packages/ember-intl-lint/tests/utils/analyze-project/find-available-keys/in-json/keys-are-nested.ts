import { assert, test } from '@codemod-utils/tests';

import { inJson } from '../../../../../src/utils/analyze-project/find-available-keys/index.js';

test('utils | analyze-project | find-available-keys | in-json > keys are nested', function () {
  const file = JSON.stringify({
    components: {
      products: {
        product: {
          card: {
            'learn-more': {
              'aria-label': 'Learn more about {productName}',
              label: 'Learn more',
            },
          },
          details: {
            'add-to-cart': 'Add to Cart',
            description: 'Description',
            price: 'Price',
            rating: 'Rating',
            'rating-value': '{productRating} out of 5 stars',
            seller: 'Seller',
          },
        },
      },
    },
    routes: {
      application: {
        'app-name': 'Ember Workshop',
        copyright:
          'Created by <a href="https://www.linkedin.com/in/ijlee2/" rel="noopener noreferrer" target="_blank">Isaac J. Lee</a> © 2025',
        'navigation-menu': {
          name: 'Main Navigation',
          routes: {
            form: 'Form',
            index: 'Home',
            products: 'Products',
          },
        },
        'navigation-text':
          'The page navigation is complete. You may now navigate the page content as you wish.',
        'skip-text': 'Skip to main content',
      },
      error: {
        'default-message': 'Something went wrong.',
      },
      form: {
        title: 'Form',
        'contact-me-form': {
          fields: {
            donation: {
              label: 'Donation amount ($)',
              placeholder: '100',
            },
            email: {
              label: 'Email',
              placeholder: 'zoey@emberjs.com',
            },
            message: {
              label: 'Message',
              placeholder: null,
            },
            name: {
              label: 'Name',
              placeholder: 'Zoey',
            },
            subscribe: {
              label: 'Subscribe to The Ember Times?',
              placeholder: null,
            },
          },
          instructions:
            'Still have questions about ember-container-query? Try sending me a message.',
          title: 'Contact me',
        },
      },
      index: {
        description:
          'To see what you can do with <a href="https://emberjs.com/" target="_blank" rel="noopener noreferrer">Ember.js</a>, visit one of the examples in the main navigation.',
        title: 'Ember Workshop',
      },
      'product-details': {
        back: 'See all products',
        title: 'Product Details',
      },
      products: {
        'filter-by': {
          name: {
            label: 'Filter by name',
            placeholder: 'Cake, pasta, etc.',
          },
        },
        'no-products-found': 'No products found.',
        'sort-by': {
          label: 'Sort by',
          'name-ascending': 'Name: A to Z',
          'name-descending': 'Name: Z to A',
          'price-ascending': 'Price: Low to High',
          'price-descending': 'Price: High to Low',
        },
        title: 'Products',
      },
    },
  });

  const keys = inJson(file);

  assert.deepStrictEqual(keys, [
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
    'routes.form.title',
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
  ]);
});
