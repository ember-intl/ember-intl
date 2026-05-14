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

# Update fixtures (v6 to v7)
rm -r "tests/fixtures/v1-addon-v6/output"
cp -r "tests/fixtures/v1-addon-v6/input" "tests/fixtures/v1-addon-v6/output"

./dist/bin/ember-intl-update.js \
  --root "tests/fixtures/v1-addon-v6/output"

rm -r "tests/fixtures/v1-app-v6/output"
cp -r "tests/fixtures/v1-app-v6/input" "tests/fixtures/v1-app-v6/output"

./dist/bin/ember-intl-update.js \
  --root "tests/fixtures/v1-app-v6/output"

# Update fixtures (v7 to v8)
rm -r "tests/fixtures/v1-app-v7/output"
cp -r "tests/fixtures/v1-app-v7/input" "tests/fixtures/v1-app-v7/output"

./dist/bin/ember-intl-update.js \
  --root "tests/fixtures/v1-app-v7/output"

rm -r "tests/fixtures/v2-app-v7/output"
cp -r "tests/fixtures/v2-app-v7/input" "tests/fixtures/v2-app-v7/output"

./dist/bin/ember-intl-update.js \
  --root "tests/fixtures/v2-app-v7/output"
