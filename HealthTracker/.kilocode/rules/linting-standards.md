# Linting Standards Rule

## Overview
This rule ensures all code follows strict linting standards to maintain code quality and prevent common issues.

## Rule: Enforce Clean Linting
**Priority**: High
**Category**: Code Quality

## Requirements

### 1. Zero Linting Errors Policy
- All code MUST pass linting without any errors before being committed
- Only warnings are acceptable, and they should be minimized
- Run `npm run lint` before any code submission

### 2. Import and Export Standards
- Remove all unused imports and variables
- Use proper TypeScript types instead of `any`
- Ensure all imports have proper paths and are resolvable

### 3. Console Statement Guidelines
- **Forbidden**: `console.log()` statements
- **Allowed**: `console.warn()`, `console.error()`, `console.debug()`
- Remove debug console statements before production

### 4. React/React Native Best Practices
- No inline styles - use StyleSheet.create()
- No hardcoded color literals - use theme constants
- Follow React hooks rules (no setState in useEffect body)
- Use proper component naming conventions (PascalCase)

### 5. TypeScript Standards
- No `any` types - use `unknown`, specific types, or proper generics
- Proper type definitions for all functions and variables
- Use strict TypeScript configuration

## Implementation Checklist

When writing or reviewing code, ensure:

- [ ] `npm run lint` passes with 0 errors
- [ ] No unused imports or variables
- [ ] No `console.log()` statements
- [ ] No inline styles in React Native components
- [ ] No hardcoded colors (use theme/constants)
- [ ] Proper TypeScript types (no `any`)
- [ ] React hooks rules followed
- [ ] Import paths are correct and resolvable

## Automated Checks

### Pre-commit Hook
```bash
npm run lint
```

### CI/CD Pipeline
- Linting must pass before merge
- Zero tolerance for linting errors
- Warnings should be addressed but don't block

## Common Issues to Avoid

1. **Import Resolver Errors**
   - Ensure `eslint-import-resolver-typescript` is installed
   - Configure proper TypeScript paths in ESLint config

2. **Unused Variables**
   - Remove unused imports immediately
   - Use underscore prefix for intentionally unused parameters (`_param`)

3. **Console Statements**
   - Replace `console.log()` with appropriate alternatives
   - Use `console.warn()` for warnings, `console.error()` for errors

4. **React Hooks Violations**
   - Don't call setState directly in useEffect body
   - Use proper dependency arrays
   - Follow hooks rules of React

5. **Style Issues**
   - Move inline styles to StyleSheet objects
   - Create constants for colors and reusable values
   - Use theme system when available

## Enforcement

This rule is enforced through:
- ESLint configuration
- Pre-commit hooks
- Code review process
- CI/CD pipeline checks

## Benefits

Following this rule ensures:
- Consistent code quality
- Easier maintenance and debugging
- Better performance (no inline styles)
- Improved developer experience
- Reduced bugs and issues