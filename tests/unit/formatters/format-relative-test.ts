import { module, test } from 'qunit';
import FormatRelative from 'ember-intl/-private/formatters/format-relative';

module('format-relative', function (hooks) {
  let IntlRelativeTimeFormat: unknown;

  hooks.beforeEach(function () {
    IntlRelativeTimeFormat = Intl.RelativeTimeFormat;
  });

  hooks.afterEach(function () {
    // @ts-expect-error Setting this property is not allowed.
    Intl.RelativeTimeFormat = IntlRelativeTimeFormat;
  });

  test('exists', function (assert) {
    assert.ok(FormatRelative);
  });

  test('should instantiate without throwing when Intl.RelativeTimeFormat is missing', function (assert) {
    // @ts-expect-error Setting this property is not allowed.
    Intl.RelativeTimeFormat = undefined;

    assert.ok(
      new FormatRelative({
        onError({ error }) {
          // NOTE: Default implementation in service is to throw.
          throw error;
        },
        readFormatConfig() {
          return {};
        },
      })
    );
  });

  test('should throw when formatting when Intl.RelativeTimeFormat is missing', function (assert) {
    // @ts-expect-error Setting this property is not allowed.
    Intl.RelativeTimeFormat = undefined;

    const formatter = new FormatRelative({
      onError({ error }) {
        // NOTE: Default implementation in service is to throw.
        throw error;
      },
      readFormatConfig() {
        return {};
      },
    });

    assert.throws(() => {
      formatter.format('en-us', 0, { unit: 'days' });
    }, /Intl.RelativeTimeFormat is not available in this environment/);
  });

  test('should throw when formatting when a default unit is missing', function (assert) {
    const formatter = new FormatRelative({
      onError({ error }) {
        // NOTE: Default implementation in service is to throw.
        throw error;
      },
      readFormatConfig() {
        return {};
      },
    });

    assert.throws(() => {
      formatter.format('en-us', 0);
    }, /FormatRelative: 'formatOptions' are missing a 'unit'/);
  });
});
