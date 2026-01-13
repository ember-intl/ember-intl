import { assert, test } from '@codemod-utils/tests';

import { inJson } from '../../../../../src/utils/analyze-project/merge-translation-files/index.js';

test('utils | analyze-project | merge-translation-files | in-json > keys are nested', function () {
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

  const translationObject = inJson(file, {
    filePath: 'translations/en-us.json',
    namespaceKeys: false,
    translationsDir: 'translations',
  });

  assert.deepStrictEqual(translationObject, {
    'components.products.product.card.learn-more.aria-label':
      'Learn more about {productName}',
    'components.products.product.card.learn-more.label': 'Learn more',
    'components.products.product.details.add-to-cart': 'Add to Cart',
    'components.products.product.details.description': 'Description',
    'components.products.product.details.price': 'Price',
    'components.products.product.details.rating': 'Rating',
    'components.products.product.details.rating-value':
      '{productRating} out of 5 stars',
    'components.products.product.details.seller': 'Seller',
    'routes.application.app-name': 'Ember Workshop',
    'routes.application.copyright':
      'Created by <a href="https://www.linkedin.com/in/ijlee2/" rel="noopener noreferrer" target="_blank">Isaac J. Lee</a> © 2025',
    'routes.application.navigation-menu.name': 'Main Navigation',
    'routes.application.navigation-menu.routes.form': 'Form',
    'routes.application.navigation-menu.routes.index': 'Home',
    'routes.application.navigation-menu.routes.products': 'Products',
    'routes.application.navigation-text':
      'The page navigation is complete. You may now navigate the page content as you wish.',
    'routes.application.skip-text': 'Skip to main content',
    'routes.error.default-message': 'Something went wrong.',
    'routes.form.title': 'Form',
    'routes.form.contact-me-form.fields.donation.label': 'Donation amount ($)',
    'routes.form.contact-me-form.fields.donation.placeholder': '100',
    'routes.form.contact-me-form.fields.email.label': 'Email',
    'routes.form.contact-me-form.fields.email.placeholder': 'zoey@emberjs.com',
    'routes.form.contact-me-form.fields.message.label': 'Message',
    'routes.form.contact-me-form.fields.name.label': 'Name',
    'routes.form.contact-me-form.fields.name.placeholder': 'Zoey',
    'routes.form.contact-me-form.fields.subscribe.label':
      'Subscribe to The Ember Times?',
    'routes.form.contact-me-form.instructions':
      'Still have questions about ember-container-query? Try sending me a message.',
    'routes.form.contact-me-form.title': 'Contact me',
    'routes.index.description':
      'To see what you can do with <a href="https://emberjs.com/" target="_blank" rel="noopener noreferrer">Ember.js</a>, visit one of the examples in the main navigation.',
    'routes.index.title': 'Ember Workshop',
    'routes.product-details.back': 'See all products',
    'routes.product-details.title': 'Product Details',
    'routes.products.filter-by.name.label': 'Filter by name',
    'routes.products.filter-by.name.placeholder': 'Cake, pasta, etc.',
    'routes.products.no-products-found': 'No products found.',
    'routes.products.sort-by.label': 'Sort by',
    'routes.products.sort-by.name-ascending': 'Name: A to Z',
    'routes.products.sort-by.name-descending': 'Name: Z to A',
    'routes.products.sort-by.price-ascending': 'Price: Low to High',
    'routes.products.sort-by.price-descending': 'Price: High to Low',
    'routes.products.title': 'Products',
  });
});
