# Changelog

## v6.0.0-beta.4 (2022-09-01)

### Breaking Change
* [#1704](https://github.com/ember-intl/ember-intl/pull/1704) Removed TypeScript3 type ([@ijlee2](https://github.com/ijlee2))

### Bug Fix
* [#1696](https://github.com/ember-intl/ember-intl/pull/1696) set importsNotUsedAsValues ([@NullVoxPopuli](https://github.com/NullVoxPopuli))
* [#1678](https://github.com/ember-intl/ember-intl/pull/1678) Updated test-related packages. Imported TestContext from @ember/test-helpers.  ([@ijlee2](https://github.com/ijlee2))
* [#1677](https://github.com/ember-intl/ember-intl/pull/1677) Correct usages of @formatjs/icu-messageformat-parser ([@ijlee2](https://github.com/ijlee2))
* [#1635](https://github.com/ember-intl/ember-intl/pull/1635) fix(types): fix `Formats` declaration as type ([@hadiwina](https://github.com/hadiwina))

### Internal
* [#1716](https://github.com/ember-intl/ember-intl/pull/1716) chore(types): enable `exactOptionalPropertyTypes` ([@jamescdavis](https://github.com/jamescdavis))
* [#1702](https://github.com/ember-intl/ember-intl/pull/1702) Updated ember-cli-addon-docs to v5.0 ([@ijlee2](https://github.com/ijlee2))
* [#1701](https://github.com/ember-intl/ember-intl/pull/1701) Recreated lockfile ([@ijlee2](https://github.com/ijlee2))
* [#1700](https://github.com/ember-intl/ember-intl/pull/1700) Updated internationalization-related dependencies ([@ijlee2](https://github.com/ijlee2))
* [#1698](https://github.com/ember-intl/ember-intl/pull/1698) Updated CI-related dependencies ([@ijlee2](https://github.com/ijlee2))
* [#1697](https://github.com/ember-intl/ember-intl/pull/1697) Enabled eslint-plugin-qunit ([@ijlee2](https://github.com/ijlee2))
* [#1695](https://github.com/ember-intl/ember-intl/pull/1695) Removed try-typescript code from CI (unused) ([@ijlee2](https://github.com/ijlee2))
* [#1694](https://github.com/ember-intl/ember-intl/pull/1694) Fixed continuous deployment ([@ijlee2](https://github.com/ijlee2))
* [#1693](https://github.com/ember-intl/ember-intl/pull/1693) Set the default branch to be main for ember-cli-addon-docs deployment ([@ijlee2](https://github.com/ijlee2))
* [#1692](https://github.com/ember-intl/ember-intl/pull/1692) Uninstalled ember-cli-deploy-git-ci ([@ijlee2](https://github.com/ijlee2))
* [#1689](https://github.com/ember-intl/ember-intl/pull/1689) Set up continuous deployment ([@ijlee2](https://github.com/ijlee2))
* [#1686](https://github.com/ember-intl/ember-intl/pull/1686) chore: Added ember-try scenarios to CI ([@ijlee2](https://github.com/ijlee2))
* [#1685](https://github.com/ember-intl/ember-intl/pull/1685) Added missing translations to try to fix failing CI ([@ijlee2](https://github.com/ijlee2))
* [#1683](https://github.com/ember-intl/ember-intl/pull/1683) Reintroduced the documentation site ([@ijlee2](https://github.com/ijlee2))
* [#1682](https://github.com/ember-intl/ember-intl/pull/1682) Updated ember-source to v4.4.1 ([@ijlee2](https://github.com/ijlee2))
* [#1681](https://github.com/ember-intl/ember-intl/pull/1681) Updated Ember-related development dependencies ([@ijlee2](https://github.com/ijlee2))
* [#1680](https://github.com/ember-intl/ember-intl/pull/1680) Updated eslint and prettier to their latest version ([@ijlee2](https://github.com/ijlee2))
* [#1676](https://github.com/ember-intl/ember-intl/pull/1676) Started the CI workflow over ([@ijlee2](https://github.com/ijlee2))
* [#1653](https://github.com/ember-intl/ember-intl/pull/1653) feat: replace `intl-messageformat-parser` with `@formatjs/icu-messageformat-parser` ([@charlesfries](https://github.com/charlesfries))

### Committers: 5
- Charles Fries ([@charlesfries](https://github.com/charlesfries))
- Isaac Lee ([@ijlee2](https://github.com/ijlee2))
- James C. Davis ([@jamescdavis](https://github.com/jamescdavis))
- Martinus H ([@hadiwina](https://github.com/hadiwina))
- [@NullVoxPopuli](https://github.com/NullVoxPopuli)


## v6.0.0-beta.3 (2022-01-19)

### Bug Fix
* [#1616](https://github.com/ember-intl/ember-intl/pull/1616) test: await settled in test `setupIntl()` to fix race condition with fake timers ([@fengb](https://github.com/fengb))
* [#1607](https://github.com/ember-intl/ember-intl/pull/1607) fix: `noUncheckedIndexedAccess` issues ([@BarryThePenguin](https://github.com/BarryThePenguin))

### Enhancement
* [#1633](https://github.com/ember-intl/ember-intl/pull/1633) feat(helpers): positional options that override named options ([@jesdavpet](https://github.com/jesdavpet))

### Internal
* [#1609](https://github.com/ember-intl/ember-intl/pull/1609) chore: run CI on `ubuntu-latest` ([@BarryThePenguin](https://github.com/BarryThePenguin))

### Committers: 3
- Benjamin Feng ([@fengb](https://github.com/fengb))
- Jesse David Peterson ([@jesdavpet](https://github.com/jesdavpet))
- Jonathan Haines ([@BarryThePenguin](https://github.com/BarryThePenguin))


## v6.0.0-beta.2 (2021-10-29)

### Documentation
* [#1599](https://github.com/ember-intl/ember-intl/pull/1599) docs(README): Use correct syntax for TS injection declaration ([@chriskrycho](https://github.com/chriskrycho))
* [#1597](https://github.com/ember-intl/ember-intl/pull/1597) docs: add note on `\` escaping backward-compatibility ([@yoavfranco](https://github.com/yoavfranco))
* [#1586](https://github.com/ember-intl/ember-intl/pull/1586) docs: Fix bad link in post install ([@jrjohnson](https://github.com/jrjohnson))

### Committers: 3
- Chris Krycho ([@chriskrycho](https://github.com/chriskrycho))
- Jon Johnson ([@jrjohnson](https://github.com/jrjohnson))
- Yoav M. Franco ([@yoavfranco](https://github.com/yoavfranco))
✨  Done in 5.42s.


## v6.0.0-beta.1 (2021-07-08)
