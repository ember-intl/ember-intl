const expect = require('chai').expect;

const wrapWithNamespaceIfNeeded = require('../../../../lib/broccoli/translation-reducer/utils/wrap-with-namespace-if-needed');
const enums = require('../../../../lib/broccoli/enums');

describe('wrapWithNamespaceIfNeeded', function () {
  [
    [
      { a: true, b: false },
      { a: true, b: false },
      '/tmp/broccoli_debug-output_path-l4iBcmcT/en-us.json',
      '/tmp/broccoli_debug-output_path-l4iBcmcT',
      [],
    ],
    [
      { a: true, b: false },
      { a: true, b: false },
      `/tmp/broccoli_debug-output_path-l4iBcmcT/${enums.addonNamespace}/an-addon/en-us.json`,
      '/tmp/broccoli_debug-output_path-l4iBcmcT',
      ['an-addon', 'other-addon'],
    ],
    [
      { a: true, b: false },
      { a: true, b: false },
      `/tmp/broccoli_debug-output_path-l4iBcmcT/${enums.addonNamespace}/@a-scoped/addon/en-us.json`,
      '/tmp/broccoli_debug-output_path-l4iBcmcT',
      ['@a-scoped/addon', 'an-addon', 'other-addon'],
    ],
    [
      { a: true, b: false },
      { a: true, b: false },
      '/tmp/broccoli_debug-output_path-l4iBcmcT/////en-us.json',
      '/tmp/broccoli_debug-output_path-l4iBcmcT',
      ['@a-scoped/addon', 'an-addon', 'other-addon'],
    ],
    [
      { a: true, b: false },
      { foo: { a: true, b: false } },
      '/tmp/broccoli_debug-output_path-l4iBcmcT/foo/en-us.json',
      '/tmp/broccoli_debug-output_path-l4iBcmcT',
      [],
    ],
    [
      { a: true, b: false },
      { foo: { bar: { a: true, b: false } } },
      '/tmp/broccoli_debug-output_path-l4iBcmcT/foo/bar/en-us.json',
      '/tmp/broccoli_debug-output_path-l4iBcmcT',
      [],
    ],
    [
      { a: true, b: false },
      { foo: { bar: { a: true, b: false } } },
      `/tmp/broccoli_debug-output_path-l4iBcmcT/${enums.addonNamespace}/an-addon/foo/bar/en-us.json`,
      '/tmp/broccoli_debug-output_path-l4iBcmcT',
      ['an-addon', 'other-addon'],
    ],
    [
      { a: true, b: false },
      { foo: { bar: { a: true, b: false } } },
      `/tmp/broccoli_debug-output_path-l4iBcmcT/${enums.addonNamespace}/an-addon/foo/bar/en-us.json`,
      '/tmp/broccoli_debug-output_path-l4iBcmcT',
      ['other-addon', 'an-addon'],
    ],
    [
      { a: true, b: false },
      { foo: { bar: { a: true, b: false } } },
      `/tmp/broccoli_debug-output_path-l4iBcmcT/${enums.addonNamespace}/@a-scoped/addon/foo/bar/en-us.json`,
      '/tmp/broccoli_debug-output_path-l4iBcmcT',
      ['@a-scoped/addon', 'other-addon', 'an-addon'],
    ],
    [
      { a: true, b: false },
      { foo_bar: { a: true, b: false } },
      `/tmp/broccoli_debug-output_path-l4iBcmcT/${enums.addonNamespace}/@a-scoped/addon/foo_bar/en-us.json`,
      '/tmp/broccoli_debug-output_path-l4iBcmcT',
      ['@a-scoped/addon', 'other-addon', 'an-addon'],
    ],
    [
      { a: true, b: false },
      { 'foo-bar': { a: true, b: false } },
      `/tmp/broccoli_debug-output_path-l4iBcmcT/${enums.addonNamespace}/@a-scoped/addon/foo-bar/en-us.json`,
      '/tmp/broccoli_debug-output_path-l4iBcmcT',
      ['@a-scoped/addon', 'other-addon', 'an-addon'],
    ],
    [
      { a: true, b: false },
      { foo_bar: { a: true, b: false } },
      `/tmp/broccoli_debug-output_path-l4iBcmcT/${enums.addonNamespace}/@a-scoped/addon/foo bar/en-us.json`,
      '/tmp/broccoli_debug-output_path-l4iBcmcT',
      ['@a-scoped/addon', 'other-addon', 'an-addon'],
    ],
  ].forEach(([object, expected, filepath, inputPath, addonNames]) => {
    it(`${JSON.stringify(object)} -> ${JSON.stringify(expected)}`, function () {
      expect(wrapWithNamespaceIfNeeded(object, filepath, inputPath, addonNames)).to.deep.equal(expected);
    });
  });

  describe('with win32 platform', () => {
    let originalPlatform;

    before(() => {
      originalPlatform = Object.getOwnPropertyDescriptor(process, 'platform');
      Object.defineProperty(process, 'platform', { value: 'win32' });
    });

    after(() => {
      Object.defineProperty(process, 'platform', originalPlatform);
    });

    it('path dirname uses win32 platform', () => {
      const translationFileContent = { age: 'twenty' };
      const filepath = 'C:\\Users\\*exampleDirectory/\\en-us.yaml';
      const addons = [];

      const translationFileWithDirpath = { 'C:Users': { '*exampleDirectory/': { age: 'twenty' } } };

      const withNamespace = wrapWithNamespaceIfNeeded(translationFileContent, filepath, filepath, addons);

      expect(withNamespace).to.deep.equal(translationFileWithDirpath);
    });
  });
});
