# Linting Quick Reference Guide

## 🚀 Quick Commands

```bash
# Check for linting issues
npm run lint

# Auto-fix what can be fixed
npm run lint:fix

# Format code with Prettier
npm run format
```

## ❌ Common Issues & Quick Fixes

### 1. Unused Variables/Imports
```typescript
// ❌ Bad
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // unused

// ✅ Good
import React, { useState } from 'react';
```

### 2. Console Statements
```typescript
// ❌ Bad
console.log('Debug info');

// ✅ Good
console.warn('Debug info');
console.error('Error occurred');
console.debug('Debug info');
```

### 3. Inline Styles
```typescript
// ❌ Bad
<View style={{flex: 1, backgroundColor: 'white'}}>

// ✅ Good
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
<View style={styles.container}>
```

### 4. TypeScript Any Types
```typescript
// ❌ Bad
const data: any = response.data;

// ✅ Good
const data: unknown = response.data;
// or
interface ResponseData {
  id: string;
  name: string;
}
const data: ResponseData = response.data;
```

### 5. React Hooks Issues
```typescript
// ❌ Bad
useEffect(() => {
  setData(fetchData()); // Direct setState call
}, []);

// ✅ Good
useEffect(() => {
  const loadData = async () => {
    const result = await fetchData();
    setData(result);
  };
  loadData();
}, []);
```

## 🔧 Auto-Fix Commands

Most issues can be auto-fixed:
```bash
npm run lint:fix
npm run format
```

## 🚨 Zero Tolerance Issues

These MUST be fixed manually:
- Unused variables/imports
- `console.log()` statements
- TypeScript `any` types
- React hooks violations
- Missing StyleSheet for inline styles

## 📋 Pre-Commit Checklist

Before committing code:
- [ ] Run `npm run lint` - should show 0 errors
- [ ] Fix any warnings if possible
- [ ] Run `npm run format` to ensure consistent formatting
- [ ] Test that your changes work as expected

## 🛠️ Setup Pre-Commit Hook

To automatically run linting before commits:
```bash
# Copy the pre-commit script to git hooks
cp .kilocode/rules/pre-commit-lint.sh .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit
```

## 📞 Need Help?

If you encounter linting issues you can't resolve:
1. Check this guide first
2. Run `npm run lint:fix` to auto-fix what's possible
3. Look at the specific error message for guidance
4. Ask for help with the specific error message