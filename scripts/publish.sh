#!/bin/bash

set -e

pnpm i --frozen-lockfile

pnpm build

pnpm publish --no-git-checks --access public

echo "✅ Publish completed"