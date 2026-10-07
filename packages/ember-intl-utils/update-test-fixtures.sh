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
rm -r "tests/fixtures/my-v2-app/output"
cp -r "tests/fixtures/my-v2-app/input" "tests/fixtures/my-v2-app/output"

rm -r "tests/fixtures/my-v2-app-with-addonPaths/output"
cp -r "tests/fixtures/my-v2-app-with-addonPaths/input" "tests/fixtures/my-v2-app-with-addonPaths/output"

rm -r "tests/fixtures/my-v2-app-with-fallbacks/output"
cp -r "tests/fixtures/my-v2-app-with-fallbacks/input" "tests/fixtures/my-v2-app-with-fallbacks/output"

rm -r "tests/fixtures/my-v2-app-with-lazy-loaded-translations/output"
cp -r "tests/fixtures/my-v2-app-with-lazy-loaded-translations/input" "tests/fixtures/my-v2-app-with-lazy-loaded-translations/output"

rm -r "tests/fixtures/my-v2-app-with-namespace-from-folders/output"
cp -r "tests/fixtures/my-v2-app-with-namespace-from-folders/input" "tests/fixtures/my-v2-app-with-namespace-from-folders/output"
