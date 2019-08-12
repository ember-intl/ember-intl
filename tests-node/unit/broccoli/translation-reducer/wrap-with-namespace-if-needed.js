/* eslint-env node */
'use strict';

let expect = require('chai').expect;

let wrapWithNamespaceIfNeeded = require('../../../../lib/broccoli/translation-reducer/utils/wrap-with-namespace-if-needed');

describe('wrapWithNamespaceIfNeeded', function() {
  [
    [
      { a: true, b: false },
      { a: true, b: false },
      '/tmp/broccoli_debug-output_path-l4iBcmcT/en-us.json',
      '/tmp/broccoli_debug-output_path-l4iBcmcT',
      []
    ],
    [
      { a: true, b: false },
      { a: true, b: false },
      '/tmp/broccoli_debug-output_path-l4iBcmcT/an-addon/en-us.json',
      '/tmp/broccoli_debug-output_path-l4iBcmcT',
      ['an-addon', 'other-addon']
    ],
    [
      { a: true, b: false },
      { a: true, b: false },
      '/tmp/broccoli_debug-output_path-l4iBcmcT/@a-scoped/addon/en-us.json',
      '/tmp/broccoli_debug-output_path-l4iBcmcT',
      ['@a-scoped/addon', 'an-addon', 'other-addon']
    ],
    [
      { a: true, b: false },
      { a: true, b: false },
      '/tmp/broccoli_debug-output_path-l4iBcmcT/////en-us.json',
      '/tmp/broccoli_debug-output_path-l4iBcmcT',
      ['@a-scoped/addon', 'an-addon', 'other-addon']
    ],
    [
      { a: true, b: false },
      { foo: { a: true, b: false } },
      '/tmp/broccoli_debug-output_path-l4iBcmcT/foo/en-us.json',
      '/tmp/broccoli_debug-output_path-l4iBcmcT',
      []
    ],
    [
      { a: true, b: false },
      { foo: { bar: { a: true, b: false } } },
      '/tmp/broccoli_debug-output_path-l4iBcmcT/foo/bar/en-us.json',
      '/tmp/broccoli_debug-output_path-l4iBcmcT',
      []
    ],
    [
      { a: true, b: false },
      { foo: { bar: { a: true, b: false } } },
      '/tmp/broccoli_debug-output_path-l4iBcmcT/an-addon/foo/bar/en-us.json',
      '/tmp/broccoli_debug-output_path-l4iBcmcT',
      ['an-addon', 'other-addon']
    ],
    [
      { a: true, b: false },
      { foo: { bar: { a: true, b: false } } },
      '/tmp/broccoli_debug-output_path-l4iBcmcT/an-addon/foo/bar/en-us.json',
      '/tmp/broccoli_debug-output_path-l4iBcmcT',
      ['other-addon', 'an-addon']
    ],
    [
      { a: true, b: false },
      { foo: { bar: { a: true, b: false } } },
      '/tmp/broccoli_debug-output_path-l4iBcmcT/@a-scoped/addon/foo/bar/en-us.json',
      '/tmp/broccoli_debug-output_path-l4iBcmcT',
      ['@a-scoped/addon', 'other-addon', 'an-addon']
    ]
  ].forEach(([object, expected, filepath, inputPath, addonNames]) => {
    it(`${JSON.stringify(object)} -> ${JSON.stringify(expected)}`, function() {
      expect(wrapWithNamespaceIfNeeded(object, filepath, inputPath, addonNames)).to.deep.equal(expected);
    });
  });
});
