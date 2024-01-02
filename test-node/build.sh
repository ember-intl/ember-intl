#!/usr/bin/env sh

ENVIRONMENT=$1

if [ $ENVIRONMENT = "--test" ]
then
  # Clean slate
  rm -rf "dist-for-testing"

  # Compile TypeScript
  tsc --project "tsconfig.json"

  echo "SUCCESS: Built dist-for-testing.\n"

fi
