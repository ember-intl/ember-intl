import { join } from 'node:path';

import { assert, loadFixture, normalizeFile, test } from '@codemod-utils/tests';
import TranslationReducer from '@ember-intl/v1-compat/lib/broccoli/translation-reducer.js';

test('lib | broccoli | translation-reducer | mergeTranslations > edge case (folder name has space)', function () {
  const inputProject = {
    '  things for  product ': {
      'en-us.yaml': normalizeFile([
        `card.learn-more.aria-label: Learn more about {productName}`,
        `card.learn-more.label: Learn more`,
        `details.add-to-cart: Add to Cart`,
        `details.description: Description`,
        `details.price: Price`,
        `details.rating: Rating`,
        `details.rating-value: "{productRating} out of 5 stars"`,
        `details.seller: Seller`,
        `title: "{productName}"`,
        ``,
      ]),
    },
  };

  const projectRoot = 'tmp/broccoli_merge_trees';
  const inputPath = join(projectRoot);

  loadFixture(inputProject, { projectRoot });

  const outputNode = new TranslationReducer(inputPath, {
    addonsWithTranslations: [],
    wrapTranslationsWithNamespace: true,
  });

  // @ts-expect-error: Incorrect type
  outputNode.inputPaths = [inputPath];

  const translations = outputNode.mergeTranslations([
    join(inputPath, '  things for  product /en-us.yaml'),
  ]);

  assert.deepStrictEqual(translations, {
    'en-us': {
      __things_for__product_: {
        'card.learn-more.aria-label': 'Learn more about {productName}',
        'card.learn-more.label': 'Learn more',
        'details.add-to-cart': 'Add to Cart',
        'details.description': 'Description',
        'details.price': 'Price',
        'details.rating': 'Rating',
        'details.rating-value': '{productRating} out of 5 stars',
        'details.seller': 'Seller',
        title: '{productName}',
      },
    },
  });
});
