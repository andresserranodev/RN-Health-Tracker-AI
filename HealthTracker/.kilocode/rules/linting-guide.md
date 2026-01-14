# Unified Linting Guide

## Overview
This guide provides a comprehensive overview of the linting standards, best practices, and automated checks enforced in this project. Following these rules ensures code quality, consistency, and maintainability.

## 🚀 Quick Commands

```bash
# Check for linting issues
npm run lint

# Auto-fix what can be fixed
npm run lint:fix

# Format code with Prettier
npm run format
```

## 📋 Pre-Commit Checklist
Before committing code, ensure the following steps are completed:

- [ ] Run `npm run lint` — it must pass with 0 errors.
- [ ] No unused imports or variables remain in the code.
- [ ] No `console.log()` statements are present.
- [ ] No inline styles are used in React Native components; use `StyleSheet`.
- [ ] No hardcoded colors; use theme constants where applicable.
- [ ] Proper TypeScript types are used (no `any`).
- [ ] React Hooks rules are followed.
- [ ] All import paths are correct and resolvable.
- [ ] Your changes have been tested and work as expected.

## Rule: Enforce Clean Linting
**Priority**: High
**Category**: Code Quality

### 1. Zero Linting Errors Policy
- All code **MUST** pass linting without any errors before being committed.
- Warnings are acceptable but should be reviewed and minimized.

### 2. Import and Export Standards
- Remove all unused imports and variables.
- Use proper TypeScript types instead of `any`.

```typescript
// ❌ Bad
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // unused

// ✅ Good
import React, { useState } from 'react';
```

### 3. Console Statement Guidelines
- **Forbidden**: `console.log()`
- **Allowed**: `console.warn()`, `console.error()`, `console.debug()`
- All debug-related console statements should be removed before merging into production branches.

```typescript
// ❌ Bad
console.log('Debug info');

// ✅ Good
console.warn('This is a warning.');
console.error('An error occurred.');
console.debug('Detailed debug info.');
```

### 4. React/React Native Best Practices

#### No Inline Styles
Always use `StyleSheet.create()` for styling to improve performance and maintainability.

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

#### Component Naming
Use `PascalCase` for all React components.

#### No Hardcoded Color Literals
Use theme constants for colors to ensure consistency.

### 5. TypeScript Standards

#### No `any` Types
Avoid using `any`. Use `unknown`, specific interfaces, or generics instead.

```typescript
// ❌ Bad
const data: any = response.data;

// ✅ Good
const data: unknown = response.data;

// or even better:
interface ResponseData {
  id: string;
  name: string;
}
const data: ResponseData = response.data;
```

### 6. React Hooks Rules
- Do not call `setState` directly in the body of `useEffect`.
- Ensure the dependency array for hooks like `useEffect` and `useCallback` is correct.

```typescript
// ❌ Bad
useEffect(() => {
  setData(fetchData()); // Direct call
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

## Automated Checks & Enforcement
This rule is enforced through a combination of automated tools and manual processes.

### Pre-Commit Hook
A pre-commit hook automatically runs `npm run lint` before each commit to catch issues early.

#### Setup
To enable the hook, run the following commands once:
```bash
# Copy the pre-commit script to git hooks
cp .kilocode/rules/pre-commit-lint.sh .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit
```

### CI/CD Pipeline
- The CI/CD pipeline will run linting checks on every pull request.
- Pull requests with linting errors will be blocked from merging.

## 📞 Need Help?
If you encounter a linting issue you can't resolve:
1. Review this guide for examples and explanations.
2. Run `npm run lint:fix` and `npm run format` to let the tools fix what they can.
3. Carefully read the error message provided by ESLint for clues.
4. If you are still stuck, ask for help from the team with the specific error message.