import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { extractTranslations } from '../../../../../../src/utils/analyze-project/merge-translation-files/index.js';

test('utils | analyze-project | merge-translation-files | extract-translations | yaml > edge case (folder name has space)', function () {
  const file = normalizeFile([
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
  ]);

  const translationObject = extractTranslations(file, {
    filePath: 'translations/  things for  product /en-us.yaml',
    namespaceKeys: true,
    translationsDir: 'translations',
  });

  assert.deepStrictEqual(translationObject, {
    '__things_for__product_.card.learn-more.aria-label':
      'Learn more about {productName}',
    '__things_for__product_.card.learn-more.label': 'Learn more',
    '__things_for__product_.details.add-to-cart': 'Add to Cart',
    '__things_for__product_.details.description': 'Description',
    '__things_for__product_.details.price': 'Price',
    '__things_for__product_.details.rating': 'Rating',
    '__things_for__product_.details.rating-value':
      '{productRating} out of 5 stars',
    '__things_for__product_.details.seller': 'Seller',
    '__things_for__product_.title': '{productName}',
  });
});
