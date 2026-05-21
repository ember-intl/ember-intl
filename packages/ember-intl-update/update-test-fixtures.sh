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

# Update fixtures (v6)
rm -r "tests/fixtures/v6-v1-addon/output"
cp -r "tests/fixtures/v6-v1-addon/input" "tests/fixtures/v6-v1-addon/output"

./dist/bin/ember-intl-update.js \
  --root "tests/fixtures/v6-v1-addon/output"

rm -r "tests/fixtures/v6-v1-app/output"
cp -r "tests/fixtures/v6-v1-app/input" "tests/fixtures/v6-v1-app/output"

./dist/bin/ember-intl-update.js \
  --root "tests/fixtures/v6-v1-app/output"

rm -r "tests/fixtures/v6-v2-addon/output"
cp -r "tests/fixtures/v6-v2-addon/input" "tests/fixtures/v6-v2-addon/output"

./dist/bin/ember-intl-update.js \
  --root "tests/fixtures/v6-v2-addon/output"

rm -r "tests/fixtures/v6-v2-app/output"
cp -r "tests/fixtures/v6-v2-app/input" "tests/fixtures/v6-v2-app/output"

./dist/bin/ember-intl-update.js \
  --root "tests/fixtures/v6-v2-app/output"

# Update fixtures (v7)
rm -r "tests/fixtures/v7-v1-addon/output"
cp -r "tests/fixtures/v7-v1-addon/input" "tests/fixtures/v7-v1-addon/output"

./dist/bin/ember-intl-update.js \
  --root "tests/fixtures/v7-v1-addon/output"

rm -r "tests/fixtures/v7-v1-app/output"
cp -r "tests/fixtures/v7-v1-app/input" "tests/fixtures/v7-v1-app/output"

./dist/bin/ember-intl-update.js \
  --root "tests/fixtures/v7-v1-app/output"

rm -r "tests/fixtures/v7-v2-addon/output"
cp -r "tests/fixtures/v7-v2-addon/input" "tests/fixtures/v7-v2-addon/output"

./dist/bin/ember-intl-update.js \
  --root "tests/fixtures/v7-v2-addon/output"

rm -r "tests/fixtures/v7-v2-app/output"
cp -r "tests/fixtures/v7-v2-app/input" "tests/fixtures/v7-v2-app/output"

./dist/bin/ember-intl-update.js \
  --root "tests/fixtures/v7-v2-app/output"
