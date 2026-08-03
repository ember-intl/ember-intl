import { assert, test } from '@codemod-utils/tests';

import { extractTranslations } from '../../../../../../src/utils/analyze-project/merge-translation-files/index.js';

test('utils | analyze-project | merge-translation-files | extract-translations | json > edge case (folder name has space)', function () {
  const file = JSON.stringify({
    'card.learn-more.aria-label': 'Learn more about {productName}',
    'card.learn-more.label': 'Learn more',
    'details.add-to-cart': 'Add to Cart',
    'details.description': 'Description',
    'details.price': 'Price',
    'details.rating': 'Rating',
    'details.rating-value': '{productRating} out of 5 stars',
    'details.seller': 'Seller',
    title: '{productName}',
  });

  const translationObject = extractTranslations(file, {
    filePath: 'translations/  things for  product /en-us.json',
    namespaceKeysByDir: true,
    translationsDir: 'translations',
  });

  assert.deepStrictEqual(translationObject, {
    '  things for  product .card.learn-more.aria-label':
      'Learn more about {productName}',
    '  things for  product .card.learn-more.label': 'Learn more',
    '  things for  product .details.add-to-cart': 'Add to Cart',
    '  things for  product .details.description': 'Description',
    '  things for  product .details.price': 'Price',
    '  things for  product .details.rating': 'Rating',
    '  things for  product .details.rating-value':
      '{productRating} out of 5 stars',
    '  things for  product .details.seller': 'Seller',
    '  things for  product .title': '{productName}',
  });
});
