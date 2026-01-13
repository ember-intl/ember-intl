#!/usr/bin/env sh

COMMAND="ember-intl-vite"
ENVIRONMENT=$1

if [ $ENVIRONMENT = "--production" ]
then
  # Clean slate
  rm -rf "dist"

  # Compile TypeScript
  tsc --project "tsconfig.build.json"

  cp "src/virtual.d.ts" "dist/virtual.d.ts"

  echo "SUCCESS: Built dist.\n"

elif [ $ENVIRONMENT = "--test" ]
then
  # Clean slate
  rm -rf "dist-for-testing"

  # Compile TypeScript
  tsc --project "tsconfig.json"

  echo "SUCCESS: Built dist-for-testing.\n"

fi
