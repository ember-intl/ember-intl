#!/usr/bin/env sh

COMMAND="ember-intl-vite"
ENVIRONMENT=$1

if [ $ENVIRONMENT = "--production" ]
then
  # Clean slate
  rm -rf "dist"

  # Compile TypeScript
  tsc --project "tsconfig.build.json"

  # Configure files
  chmod +x "dist/bin/$COMMAND.js"

  if [ -d "src/blueprints" ]
  then
    cp -r "src/blueprints" "dist/src/blueprints"
  fi

  echo "SUCCESS: Built dist.\n"

elif [ $ENVIRONMENT = "--test" ]
then
  # Clean slate
  rm -rf "dist-for-testing"

  # Compile TypeScript
  tsc --project "tsconfig.json"

  # Configure files
  if [ -d "src/blueprints" ]
  then
    cp -r "src/blueprints" "dist-for-testing/src/blueprints"
  fi

  echo "SUCCESS: Built dist-for-testing.\n"

fi
