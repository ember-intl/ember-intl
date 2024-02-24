#!/usr/bin/env sh

# Clean slate
rm -rf "declarations"

# Create declaration files
mkdir declarations
mkdir declarations/services

cp addon/services/intl.d.ts declarations/services/intl.d.ts
cp addon/translations.d.ts declarations/translations.d.ts
cp addon/types.d.ts declarations/types.d.ts

echo "SUCCESS: Built declarations.\n"
