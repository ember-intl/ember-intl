#!/usr/bin/env sh

#----------
#
#  A. Purpose
#
#    Fix all test fixtures after updating the source code.
#
#  B. Usage
#
#    ./update-test-fixtures.sh
#
#---------

# Compile TypeScript
pnpm build

# Update fixtures
rm -r "tests/fixtures/my-v1-addon/output"
cp -r "tests/fixtures/my-v1-addon/input" "tests/fixtures/my-v1-addon/output"

./dist/bin/ember-intl-lint.js \
  --root "tests/fixtures/my-v1-addon/output"

# Update fixtures
rm -r "tests/fixtures/my-v1-app/output"
cp -r "tests/fixtures/my-v1-app/input" "tests/fixtures/my-v1-app/output"

./dist/bin/ember-intl-lint.js \
  --root "tests/fixtures/my-v1-app/output"

# Update fixtures
rm -r "tests/fixtures/my-v2-addon/output"
cp -r "tests/fixtures/my-v2-addon/input" "tests/fixtures/my-v2-addon/output"

./dist/bin/ember-intl-lint.js \
  --root "tests/fixtures/my-v2-addon/output"

# Update fixtures
rm -r "tests/fixtures/my-v2-app/output"
cp -r "tests/fixtures/my-v2-app/input" "tests/fixtures/my-v2-app/output"

./dist/bin/ember-intl-lint.js \
  --root "tests/fixtures/my-v2-app/output"

# Update fixtures
rm -r "tests/fixtures/my-v2-app-with-addonPaths/output"
cp -r "tests/fixtures/my-v2-app-with-addonPaths/input" "tests/fixtures/my-v2-app-with-addonPaths/output"

./dist/bin/ember-intl-lint.js \
  --root "tests/fixtures/my-v2-app-with-addonPaths/output"

# Update fixtures
rm -r "tests/fixtures/my-v2-app-with-fallbacks/output"
cp -r "tests/fixtures/my-v2-app-with-fallbacks/input" "tests/fixtures/my-v2-app-with-fallbacks/output"

./dist/bin/ember-intl-lint.js \
  --root "tests/fixtures/my-v2-app-with-fallbacks/output"

# Update fixtures
rm -r "tests/fixtures/my-v2-app-with-lazy-loaded-translations/output"
cp -r "tests/fixtures/my-v2-app-with-lazy-loaded-translations/input" "tests/fixtures/my-v2-app-with-lazy-loaded-translations/output"

./dist/bin/ember-intl-lint.js \
  --root "tests/fixtures/my-v2-app-with-lazy-loaded-translations/output"

# Update fixtures
rm -r "tests/fixtures/my-v2-app-with-namespace-from-folders/output"
cp -r "tests/fixtures/my-v2-app-with-namespace-from-folders/input" "tests/fixtures/my-v2-app-with-namespace-from-folders/output"

./dist/bin/ember-intl-lint.js \
  --root "tests/fixtures/my-v2-app-with-namespace-from-folders/output"
