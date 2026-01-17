# ANTIGRAVITY.md

This file provides guidance to Antigravity when working with code in this repository.

## Project Overview

This is a React Native health tracker application built with Expo that helps users monitor blood pressure readings. The app integrates with Google's Gemini AI API to extract health metrics from images of blood pressure monitors.

**Key Features:**

- Manual blood pressure entry via form
- AI-powered image analysis using Gemini 2.5 Flash Image Preview API
- Reading history with delete functionality
- PDF export of all readings

## Working Directory

All development commands should be run from the `HealthTracker/` directory:

```bash
cd HealthTracker
```

## Development Commands

### Running the App

```bash
# Start Expo development server
npm start

# Run on specific platform
npm run android
npm run ios
```

### Code Quality

```bash
# Check for linting issues
npm run lint

# Auto-fix linting issues
npm run lint:fix

# Format all files
npm run format

# Check formatting without making changes
npm run format:check
```

### Git Workflow

- Husky pre-commit hook automatically runs `npm run lint` before each commit
- Commits are blocked if there are linting errors (warnings are allowed)
- Hook script location: `.husky/pre-commit` → `.kilocode/rules/pre-commit-lint.sh`

## Environment Setup

**Required Environment Variables:**
Create a `.env` file in the `HealthTracker/` directory:

```bash
EXPO_PUBLIC_GEMINI_API_KEY=your_api_key_here
```

Get your Gemini API key from: https://ai.google.dev/

## Architecture Overview

This project follows **Clean Architecture** principles with clear separation of concerns:

### Layer Structure

```
UI Layer (Feature/Components)
    ↓ uses
Domain Layer (Use Cases + Models)
    ↓ uses
Data Layer (Repositories + Mappers)
```

### Key Directories

**`src/domain/`** - Business logic layer

- `models/` - Domain entities (e.g., `BloodPressureReading`)
- `usecase/` - Business operations as pure functions
  - `saveBloodPressureUseCase.ts`
  - `extractReadingsFromImageUseCase.ts`
  - `getAllBloodPressureReadingsUseCase.ts`
  - `deleteBloodPressureRecordUseCase.ts`
- `errors/` - Custom error types

**`src/data/`** - Data access layer

- `repositories/` - Repository interfaces
  - `bloodPressureRepository.ts` - Interface contract
  - `geminiRepository.ts` - Gemini AI integration
- `inMemoryBloodPressureRepository.ts` - Current implementation (non-persistent)
- `mappers/` - Data transformation between layers

**`src/feature/`** - Feature modules (UI + feature-specific logic)

- `HomeScreen/` - Main screen with custom hooks
  - `hooks/useBloodPressureData.ts` - State management
  - `hooks/useCameraHandler.ts` - Camera + AI workflow
  - `hooks/useRecordForm.ts` - Form modal state
  - `hooks/usePDFExportHistory.ts` - PDF generation
- `BloodPressureForm/` - Form with validation

**`src/components/`** - Reusable UI components

- `CameraModal/` - Camera interface
- `HistoryList/` - Readings list
- `LoadingModal/` - Loading overlay

**`src/api/`** - External API integration

- `geminiApiClient.ts` - Axios instance with API key
- `geminiApiService.ts` - Service wrapper
- Uses Gemini 2.5 Flash Image Preview model

**`src/constants/`** - App-wide constants

- `geminiPrompts.ts` - AI prompts for image extraction

### Data Flow Patterns

**Adding a Reading (Manual):**

```
BloodPressureForm (UI)
  → useBloodPressureData.addBloodPressureReading
  → saveBloodPressureRecordUseCase
  → inMemoryBloodPressureRepository.save()
  → State update
```

**Adding a Reading (AI-powered):**

```
CameraModal (capture photo)
  → useCameraHandler.onCapture
  → extractReadingsFromImageUseCase
  → geminiRepository.getReadingsFromImage
  → Gemini API (POST with image base64)
  → JSON parsing → Form pre-fill
  → User reviews/edits → Manual flow
```

**Type Hierarchy:**

- `BloodPressureFormValues` - Form layer (numbers)
- `BloodPressureReading` - Domain layer (strings with formatting)
- `BloodPressureRecordModel` - Data layer (numbers with ISO timestamp)

Mappers handle conversion between these types at layer boundaries.

## Important Implementation Details

### Storage

- **Current:** In-memory storage (non-persistent, resets on app restart)
- **Location:** `src/data/inMemoryBloodPressureRepository.ts`
- **Future:** Can swap to SQLite/AsyncStorage by implementing `IBloodPressureRepository`

### Gemini AI Integration

- **Model:** `gemini-2.5-flash-image-preview`
- **Endpoint:** `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image-preview:generateContent`
- **Request:** Sends prompt + JPEG image (base64)
- **Response:** JSON with systolic, diastolic, pulse values
- **Prompt:** Defined in `src/constants/geminiPrompts.ts`

### Form Validation

- Uses **React Hook Form** with **Yup** schema validation
- Schema: `src/feature/BloodPressureForm/validationschema.ts`
- All fields (systolic, diastolic, pulse) must be positive integers

### Navigation

- React Navigation with native stack
- Navigator: `src/navigation/AppNavigator.tsx`
- Modals use `@gorhom/bottom-sheet` for better UX

## Code Style Guidelines

### ESLint Configuration

- TypeScript strict mode enabled
- React Native specific rules (no inline styles, no color literals, no raw text)
- Import ordering: builtin → external → internal → parent → sibling → index
- Alphabetical sorting within import groups
- Prettier integration for formatting

### Important Rules

- No unused variables (except with `_` prefix)
- Prefer `const` over `let`
- Use template literals over string concatenation
- React Hooks rules enforced
- No console statements in production (warning level)

## Testing & Debugging

### Reactotron

- Configuration: `ReactotronConfig.js`
- Useful for debugging state, API calls, and navigation

### Common Issues

- **Import resolver warnings:** Expected in React Native, can be ignored
- **Color literal warnings:** Consider extracting to theme file
- **Console warnings:** Use `console.warn` or `console.error` instead of `console.log`

## Project-Specific Conventions

### Custom Hooks Pattern

- Feature-specific hooks live in `src/feature/[FeatureName]/hooks/`
- Each hook has single responsibility
- Use `useCallback` for functions passed to children
- Use `useMemo` for expensive computations

### Repository Pattern

- All data access goes through repository interfaces
- Enables easy swapping of implementations
- Current: in-memory, Future: SQLite, Backend API

### Use Case Pattern

- Pure functions in `src/domain/usecase/`
- Single responsibility per use case
- No side effects except calling repositories
- Return domain models, not raw data

### Mapper Pattern

- Convert data at layer boundaries
- Located in `src/data/mappers/`
- Type-safe transformations with validation
