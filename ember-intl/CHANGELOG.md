# Changelog

## 6.4.0

### Minor Changes

- [#1823](https://github.com/ember-intl/ember-intl/pull/1823) Improved <template>-tag support ([@ijlee2](https://github.com/ijlee2))
- [#1818](https://github.com/ember-intl/ember-intl/pull/1818) Allowed the test helper addTranslations() to call settled() ([@ijlee2](https://github.com/ijlee2))
- [#1817](https://github.com/ember-intl/ember-intl/pull/1817) Allowed the test helper setLocale() to call settled() ([@ijlee2](https://github.com/ijlee2))

### Patch Changes

- [#1822](https://github.com/ember-intl/ember-intl/pull/1822) Marked macros as deprecated ([@ijlee2](https://github.com/ijlee2))
- [#1821](https://github.com/ember-intl/ember-intl/pull/1821) Fixed types for macros ([@ijlee2](https://github.com/ijlee2))
- [#1820](https://github.com/ember-intl/ember-intl/pull/1820) Rewrote tests for macros ([@ijlee2](https://github.com/ijlee2))
- [#1819](https://github.com/ember-intl/ember-intl/pull/1819) Updated documentation for testing ([@ijlee2](https://github.com/ijlee2))

## 6.3.2

### Patch Changes

- [#1814](https://github.com/ember-intl/ember-intl/pull/1814) Reverted the removal of the class property allowEmpty ([@ijlee2](https://github.com/ijlee2))
- [#1815](https://github.com/ember-intl/ember-intl/pull/1815) Allowed the intl service to handle removing event listeners ([@ijlee2](https://github.com/ijlee2))

## 6.3.1

### Patch Changes

- [#1812](https://github.com/ember-intl/ember-intl/pull/1812) Updated signatures for helpers ([@ijlee2](https://github.com/ijlee2))

## 6.3.0

### Minor Changes

- [#1809](https://github.com/ember-intl/ember-intl/pull/1809) Remove inheritance among helpers ([@ijlee2](https://github.com/ijlee2))

### Patch Changes

- [#1810](https://github.com/ember-intl/ember-intl/pull/1810) Removed copyright comments ([@ijlee2](https://github.com/ijlee2))
- [#1808](https://github.com/ember-intl/ember-intl/pull/1808) Updated ember-auto-import to v2.7.0 ([@ijlee2](https://github.com/ijlee2))

## 6.2.2

### Patch Changes

- [#1807](https://github.com/ember-intl/ember-intl/pull/1807) Temporarily cast the return type of the test helper t() to string ([@ijlee2](https://github.com/ijlee2))

## 6.2.1

### Patch Changes

- [#1805](https://github.com/ember-intl/ember-intl/pull/1805) Removed has-unicode and locale-emoji ([@ijlee2](https://github.com/ijlee2))
- [#1804](https://github.com/ember-intl/ember-intl/pull/1804) Removed lodash.omit ([@ijlee2](https://github.com/ijlee2))
- [#1803](https://github.com/ember-intl/ember-intl/pull/1803) Update dependencies ([@ijlee2](https://github.com/ijlee2))

## 6.2.0 (2023-11-10)

### Enhancement

- [#1798](https://github.com/ember-intl/ember-intl/pull/1798) Updated Glint to v1.2.1 ([@ijlee2](https://github.com/ijlee2))
- [#1796](https://github.com/ember-intl/ember-intl/pull/1796) Introduce workspaces (Part 3) ([@ijlee2](https://github.com/ijlee2))
- [#1795](https://github.com/ember-intl/ember-intl/pull/1795) Introduce workspaces (Part 2) ([@ijlee2](https://github.com/ijlee2))
- [#1793](https://github.com/ember-intl/ember-intl/pull/1793) Introduce workspaces (Part 1) ([@ijlee2](https://github.com/ijlee2))

### Internal

- [#1798](https://github.com/ember-intl/ember-intl/pull/1798) Updated Glint to v1.2.1 ([@ijlee2](https://github.com/ijlee2))
- [#1797](https://github.com/ember-intl/ember-intl/pull/1797) Updated dependencies ([@ijlee2](https://github.com/ijlee2))

### Committers: 1

- Isaac Lee ([@ijlee2](https://github.com/ijlee2))

## 6.1.2 (2023-11-04)

### Internal

- [#1791](https://github.com/ember-intl/ember-intl/pull/1791) Pinned @babel/core, @babel/traverse, and fast-glob to address vulnerabilities ([@ijlee2](https://github.com/ijlee2))
- [#1790](https://github.com/ember-intl/ember-intl/pull/1790) Updated project dependencies ([@ijlee2](https://github.com/ijlee2))

### Committers: 1

- Isaac Lee ([@ijlee2](https://github.com/ijlee2))

## 6.1.1 (2023-09-20)

### Internal

- [#1786](https://github.com/ember-intl/ember-intl/pull/1786) Remove unused and unnecessary development dependencies ([@ijlee2](https://github.com/ijlee2))
- [#1785](https://github.com/ember-intl/ember-intl/pull/1785) [Security] Patched broccoli-merge-files so that the latest version of fast-glob may be installed ([@ijlee2](https://github.com/ijlee2))

### Committers: 1

- Isaac Lee ([@ijlee2](https://github.com/ijlee2))

## 6.1.0 (2023-09-19)

Note, `6.0.0` had been released by accident and isn't a stable version. Version `6.1.0` marks the beginning of the `6.x` series.

The lists below show the known changes between `6.0.0-beta.2` and `6.1.0`.

### Breaking Change

- [#1704](https://github.com/ember-intl/ember-intl/pull/1704) Removed TypeScript3 type ([@ijlee2](https://github.com/ijlee2))
- [#1763](https://github.com/ember-intl/ember-intl/pull/1763) Deprecate Ember 3.24 and Node 14 ([@ijlee2](https://github.com/ijlee2))
- [#1776](https://github.com/ember-intl/ember-intl/pull/1776) Limited TypeScript v4 support to 4.8 and 4.9 ([@Techn1x](https://github.com/Techn1x))
- [#1783](https://github.com/ember-intl/ember-intl/pull/1783) Improved DX and documentation ([@ijlee2](https://github.com/ijlee2))

### Bug Fix

- [#1607](https://github.com/ember-intl/ember-intl/pull/1607) fix: `noUncheckedIndexedAccess` issues ([@BarryThePenguin](https://github.com/BarryThePenguin))
- [#1616](https://github.com/ember-intl/ember-intl/pull/1616) test: await settled in test `setupIntl()` to fix race condition with fake timers ([@fengb](https://github.com/fengb))
- [#1635](https://github.com/ember-intl/ember-intl/pull/1635) fix(types): fix `Formats` declaration as type ([@hadiwina](https://github.com/hadiwina))
- [#1677](https://github.com/ember-intl/ember-intl/pull/1677) Correct usages of @formatjs/icu-messageformat-parser ([@charlesfries](https://github.com/charlesfries))
- [#1678](https://github.com/ember-intl/ember-intl/pull/1678) Updated test-related packages. Imported TestContext from @ember/test-helpers. ([@ijlee2](https://github.com/ijlee2))
- [#1696](https://github.com/ember-intl/ember-intl/pull/1696) set importsNotUsedAsValues ([@NullVoxPopuli](https://github.com/NullVoxPopuli))
- [#1725](https://github.com/ember-intl/ember-intl/pull/1725) Allow nested folder structure on Windows ([@tfloxolodeiro](https://github.com/tfloxolodeiro))
- [#1748](https://github.com/ember-intl/ember-intl/pull/1748) fix: Filepath matching is overly-eager when namespace wrapping ([@prsethre](https://github.com/prsethre))
- [#1758](https://github.com/ember-intl/ember-intl/pull/1758) Replaced the slash character with path.sep (account for Windows) ([@ijlee2](https://github.com/ijlee2))

### Enhancement

- [#1633](https://github.com/ember-intl/ember-intl/pull/1633) feat(helpers): positional options that override named options ([@jesdavpet](https://github.com/jesdavpet))
- [#1719](https://github.com/ember-intl/ember-intl/pull/1719) Add Glint types ([@jamescdavis](https://github.com/jamescdavis))
- [#1768](https://github.com/ember-intl/ember-intl/pull/1768) Refactor code assuming Node 16 ([@ijlee2](https://github.com/ijlee2))
- [#1776](https://github.com/ember-intl/ember-intl/pull/1776) Expanded TS support to 5.x ([@Techn1x](https://github.com/Techn1x))
- [#1783](https://github.com/ember-intl/ember-intl/pull/1783) Improved DX and documentation ([@ijlee2](https://github.com/ijlee2))

## 6.0.0-beta.7 (2023-08-30)

### Breaking Change

- [#1776](https://github.com/ember-intl/ember-intl/pull/1776) Limited TypeScript v4 support to 4.8 and 4.9 ([@Techn1x](https://github.com/Techn1x))

### Enhancement

- [#1776](https://github.com/ember-intl/ember-intl/pull/1776) Expanded TS support to 5.x ([@Techn1x](https://github.com/Techn1x))

### Internal

- [#1777](https://github.com/ember-intl/ember-intl/pull/1777) Temporarily skipped embroider-safe and embroider-optimized scenarios ([@ijlee2](https://github.com/ijlee2))

### Committers: 2

- Brad Overton ([@Techn1x](https://github.com/Techn1x))
- Isaac Lee ([@ijlee2](https://github.com/ijlee2))

## 6.0.0-beta.6 (2023-07-01)

### Breaking Change

- [#1763](https://github.com/ember-intl/ember-intl/pull/1763) Deprecate Ember 3.24 and Node 14 ([@ijlee2](https://github.com/ijlee2))

### Enhancement

- [#1768](https://github.com/ember-intl/ember-intl/pull/1768) Refactor code assuming Node 16 ([@ijlee2](https://github.com/ijlee2))

### Internal

- [#1771](https://github.com/ember-intl/ember-intl/pull/1771) Updated ember-source to v4.12 (docs-app) ([@ijlee2](https://github.com/ijlee2))
- [#1770](https://github.com/ember-intl/ember-intl/pull/1770) Updated dependencies ([@ijlee2](https://github.com/ijlee2))
- [#1769](https://github.com/ember-intl/ember-intl/pull/1769) Updated ember-cli-typescript and @types packages ([@ijlee2](https://github.com/ijlee2))
- [#1768](https://github.com/ember-intl/ember-intl/pull/1768) Refactor code assuming Node 16 ([@ijlee2](https://github.com/ijlee2))
- [#1761](https://github.com/ember-intl/ember-intl/pull/1761) Update test-related packages ([@ijlee2](https://github.com/ijlee2))

### Committers: 1

- Isaac Lee ([@ijlee2](https://github.com/ijlee2))

## 6.0.0-beta.5 (2023-07-01)

### Bug Fix

- [#1758](https://github.com/ember-intl/ember-intl/pull/1758) Replaced the slash character with path.sep (account for Windows) ([@ijlee2](https://github.com/ijlee2))
- [#1748](https://github.com/ember-intl/ember-intl/pull/1748) fix: Filepath matching is overly-eager when namespace wrapping ([@prsethre](https://github.com/prsethre))
- [#1725](https://github.com/ember-intl/ember-intl/pull/1725) Allow nested folder structure on Windows ([@tfloxolodeiro](https://github.com/tfloxolodeiro))

### Enhancement

- [#1719](https://github.com/ember-intl/ember-intl/pull/1719) Add Glint types ([@jamescdavis](https://github.com/jamescdavis))

### Internal

- [#1759](https://github.com/ember-intl/ember-intl/pull/1759) Addressed failing CI ([@ijlee2](https://github.com/ijlee2))
- [#1755](https://github.com/ember-intl/ember-intl/pull/1755) Update lint-related packages ([@ijlee2](https://github.com/ijlee2))
- [#1754](https://github.com/ember-intl/ember-intl/pull/1754) Added lerna-changelog and concurrently ([@ijlee2](https://github.com/ijlee2))

### Documentation

- [#1760](https://github.com/ember-intl/ember-intl/pull/1760) Documented Glint support ([@ijlee2](https://github.com/ijlee2))
- [#1756](https://github.com/ember-intl/ember-intl/pull/1756) Checked compatibilities with Ember 4.4, 4.8, and 4.12 ([@ijlee2](https://github.com/ijlee2))
- [#1730](https://github.com/ember-intl/ember-intl/pull/1730) chore: remove time-zone comment in format-list test ([@jahrock](https://github.com/jahrock))
- [#1733](https://github.com/ember-intl/ember-intl/pull/1733) feat: update runtime requirements screenshots ([@jahrock](https://github.com/jahrock))
- [#1749](https://github.com/ember-intl/ember-intl/pull/1749) Enable embroider test scenarios (with allowedToFail set to true) ([@dbendaou](https://github.com/dbendaou))
- [#1729](https://github.com/ember-intl/ember-intl/pull/1729) fix: typos in docs ([@jahrock](https://github.com/jahrock))

### Committers: 5

- Djamel B. ([@dbendaou](https://github.com/dbendaou))
- Isaac Lee ([@ijlee2](https://github.com/ijlee2))
- Jah Rock ([@jahrock](https://github.com/jahrock))
- James C. Davis ([@jamescdavis](https://github.com/jamescdavis))
- Paul Sethre ([@prsethre](https://github.com/prsethre))

## v6.0.0-beta.4 (2022-09-01)

### Breaking Change

- [#1704](https://github.com/ember-intl/ember-intl/pull/1704) Removed TypeScript3 type ([@ijlee2](https://github.com/ijlee2))

### Bug Fix

- [#1696](https://github.com/ember-intl/ember-intl/pull/1696) set importsNotUsedAsValues ([@NullVoxPopuli](https://github.com/NullVoxPopuli))
- [#1678](https://github.com/ember-intl/ember-intl/pull/1678) Updated test-related packages. Imported TestContext from @ember/test-helpers. ([@ijlee2](https://github.com/ijlee2))
- [#1677](https://github.com/ember-intl/ember-intl/pull/1677) Correct usages of @formatjs/icu-messageformat-parser ([@charlesfries](https://github.com/charlesfries))
- [#1635](https://github.com/ember-intl/ember-intl/pull/1635) fix(types): fix `Formats` declaration as type ([@hadiwina](https://github.com/hadiwina))

### Internal

- [#1716](https://github.com/ember-intl/ember-intl/pull/1716) chore(types): enable `exactOptionalPropertyTypes` ([@jamescdavis](https://github.com/jamescdavis))
- [#1702](https://github.com/ember-intl/ember-intl/pull/1702) Updated ember-cli-addon-docs to v5.0 ([@ijlee2](https://github.com/ijlee2))
- [#1701](https://github.com/ember-intl/ember-intl/pull/1701) Recreated lockfile ([@ijlee2](https://github.com/ijlee2))
- [#1700](https://github.com/ember-intl/ember-intl/pull/1700) Updated internationalization-related dependencies ([@ijlee2](https://github.com/ijlee2))
- [#1698](https://github.com/ember-intl/ember-intl/pull/1698) Updated CI-related dependencies ([@ijlee2](https://github.com/ijlee2))
- [#1697](https://github.com/ember-intl/ember-intl/pull/1697) Enabled eslint-plugin-qunit ([@ijlee2](https://github.com/ijlee2))
- [#1695](https://github.com/ember-intl/ember-intl/pull/1695) Removed try-typescript code from CI (unused) ([@ijlee2](https://github.com/ijlee2))
- [#1694](https://github.com/ember-intl/ember-intl/pull/1694) Fixed continuous deployment ([@ijlee2](https://github.com/ijlee2))
- [#1693](https://github.com/ember-intl/ember-intl/pull/1693) Set the default branch to be main for ember-cli-addon-docs deployment ([@ijlee2](https://github.com/ijlee2))
- [#1692](https://github.com/ember-intl/ember-intl/pull/1692) Uninstalled ember-cli-deploy-git-ci ([@ijlee2](https://github.com/ijlee2))
- [#1689](https://github.com/ember-intl/ember-intl/pull/1689) Set up continuous deployment ([@ijlee2](https://github.com/ijlee2))
- [#1686](https://github.com/ember-intl/ember-intl/pull/1686) chore: Added ember-try scenarios to CI ([@ijlee2](https://github.com/ijlee2))
- [#1685](https://github.com/ember-intl/ember-intl/pull/1685) Added missing translations to try to fix failing CI ([@ijlee2](https://github.com/ijlee2))
- [#1683](https://github.com/ember-intl/ember-intl/pull/1683) Reintroduced the documentation site ([@ijlee2](https://github.com/ijlee2))
- [#1682](https://github.com/ember-intl/ember-intl/pull/1682) Updated ember-source to v4.4.1 ([@ijlee2](https://github.com/ijlee2))
- [#1681](https://github.com/ember-intl/ember-intl/pull/1681) Updated Ember-related development dependencies ([@ijlee2](https://github.com/ijlee2))
- [#1680](https://github.com/ember-intl/ember-intl/pull/1680) Updated eslint and prettier to their latest version ([@ijlee2](https://github.com/ijlee2))
- [#1676](https://github.com/ember-intl/ember-intl/pull/1676) Started the CI workflow over ([@ijlee2](https://github.com/ijlee2))
- [#1653](https://github.com/ember-intl/ember-intl/pull/1653) feat: replace `intl-messageformat-parser` with `@formatjs/icu-messageformat-parser` ([@charlesfries](https://github.com/charlesfries))

### Committers: 5

- Charles Fries ([@charlesfries](https://github.com/charlesfries))
- Isaac Lee ([@ijlee2](https://github.com/ijlee2))
- James C. Davis ([@jamescdavis](https://github.com/jamescdavis))
- Martinus H ([@hadiwina](https://github.com/hadiwina))
- [@NullVoxPopuli](https://github.com/NullVoxPopuli)

## v6.0.0-beta.3 (2022-01-19)

### Bug Fix

- [#1616](https://github.com/ember-intl/ember-intl/pull/1616) test: await settled in test `setupIntl()` to fix race condition with fake timers ([@fengb](https://github.com/fengb))
- [#1607](https://github.com/ember-intl/ember-intl/pull/1607) fix: `noUncheckedIndexedAccess` issues ([@BarryThePenguin](https://github.com/BarryThePenguin))

### Enhancement

- [#1633](https://github.com/ember-intl/ember-intl/pull/1633) feat(helpers): positional options that override named options ([@jesdavpet](https://github.com/jesdavpet))

### Internal

- [#1609](https://github.com/ember-intl/ember-intl/pull/1609) chore: run CI on `ubuntu-latest` ([@BarryThePenguin](https://github.com/BarryThePenguin))

### Committers: 3

- Benjamin Feng ([@fengb](https://github.com/fengb))
- Jesse David Peterson ([@jesdavpet](https://github.com/jesdavpet))
- Jonathan Haines ([@BarryThePenguin](https://github.com/BarryThePenguin))

## v6.0.0-beta.2 (2021-10-29)

### Documentation

- [#1599](https://github.com/ember-intl/ember-intl/pull/1599) docs(README): Use correct syntax for TS injection declaration ([@chriskrycho](https://github.com/chriskrycho))
- [#1597](https://github.com/ember-intl/ember-intl/pull/1597) docs: add note on `\` escaping backward-compatibility ([@yoavfranco](https://github.com/yoavfranco))
- [#1586](https://github.com/ember-intl/ember-intl/pull/1586) docs: Fix bad link in post install ([@jrjohnson](https://github.com/jrjohnson))

### Committers: 3

- Chris Krycho ([@chriskrycho](https://github.com/chriskrycho))
- Jon Johnson ([@jrjohnson](https://github.com/jrjohnson))
- Yoav M. Franco ([@yoavfranco](https://github.com/yoavfranco))

## v6.0.0-beta.1 (2021-07-08)
