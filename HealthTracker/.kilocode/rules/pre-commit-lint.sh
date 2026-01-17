#!/bin/bash

# Pre-commit linting hook for Kilo projects
# This script ensures all code passes linting before commits

echo "🔍 Running linting checks..."

# Run ESLint and check if it passed
if ! npm run lint; then
    echo "❌ Linting failed! Please fix the issues before committing."
    echo ""
    echo "Common fixes:"
    echo "  - Remove unused imports and variables"
    echo "  - Replace console.log() with console.warn() or console.error()"
    echo "  - Move inline styles to StyleSheet objects"
    echo "  - Fix TypeScript type issues (avoid 'any')"
    echo "  - Follow React hooks rules"
    echo ""
    echo "Run 'npm run lint:fix' to auto-fix some issues."
    exit 1
fi

echo "✅ All linting checks passed!"
exit 0