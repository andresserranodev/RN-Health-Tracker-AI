# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

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
Presentation Layer (UI + Hooks)
    ↓ uses
Domain Layer (Entities + Use Cases + Repository Interfaces)
    ↓ uses
Infrastructure Layer (Repositories + API + Services)
    ↓ uses
Shared Layer (Constants + Templates)
```

### Key Directories

**`src/domain/`** - Business logic layer (framework-agnostic)

- `entities/` - Domain models and value objects
  - `BloodPressureReading.ts` - Domain entity for readings
  - `BloodPressureRecord.ts` - Record model
  - `BloodPressureFormValues.ts` - Form value types
  - `Errors.ts` - Custom error types
- `repositories/` - Repository interfaces (contracts)
  - `IBloodPressureRepository.ts` - Blood pressure data contract
  - `IGeminiRepository.ts` - Gemini AI integration contract
- `use-cases/` - Business operations as pure functions
  - `saveBloodPressure.ts` - Save reading use case
  - `extractReadingsFromImage.ts` - AI extraction use case
  - `getAllBloodPressureReadings.ts` - Fetch readings use case
  - `deleteBloodPressureRecord.ts` - Delete record use case

**`src/infrastructure/`** - Technical implementations

- `api/` - External API integration
  - `geminiClient.ts` - Axios instance with API key
  - `geminiService.ts` - Service wrapper
  - `geminiTypes.ts` - API type definitions
- `di/` - Dependency injection
  - `Container.ts` - DI container for repositories and use cases
- `mappers/` - Data transformation between layers
  - `BloodPressureMapper.ts` - Maps between domain and data models
- `repositories/` - Repository implementations
  - `InMemoryBloodPressureRepository.ts` - In-memory storage implementation
  - `GeminiRepository.ts` - Gemini AI repository implementation
- `services/` - External services
  - `CameraService.ts` - Camera handling service
  - `ImageConverter.ts` - Image processing utilities

**`src/presentation/`** - UI and presentation logic

- `components/` - Reusable UI components
  - `BloodPressureForm/` - Form with validation
  - `CameraModal/` - Camera interface
  - `HistoryList/` - Readings list
  - `LoadingModal/` - Loading overlay
  - `LabeledInput/` - Form input component
  - `MetricRow/` - Metric display component
  - `IconButton/` - Button component
- `hooks/` - Custom React hooks
  - `useBloodPressureData.ts` - State management
  - `useCameraHandler.ts` - Camera + AI workflow
  - `useRecordForm.ts` - Form modal state
  - `usePDFExportHistory.ts` - PDF generation
- `navigation/` - Navigation configuration
  - `AppNavigator.tsx` - React Navigation setup
- `screens/` - Screen components
  - `HomeScreen.tsx` - Main screen
  - `HomeScreen.styles.ts` - Screen styles

**`src/shared/`** - Cross-cutting concerns

- `constants/` - App-wide constants
  - `apiConstants.ts` - API configuration
  - `geminiPrompts.ts` - AI prompts for image extraction
  - `validationMessages.ts` - Validation error messages
- `templates/` - Shared templates
  - `pdfTemplate.ts` - PDF export template

### Data Flow Patterns

**Adding a Reading (Manual):**

```
src/presentation/components/BloodPressureForm/
  → src/presentation/hooks/useBloodPressureData.ts (addBloodPressureReading)
  → src/domain/use-cases/saveBloodPressure.ts
  → src/infrastructure/repositories/InMemoryBloodPressureRepository.ts
  → State update
```

**Adding a Reading (AI-powered):**

```
src/presentation/components/CameraModal/ (capture photo)
  → src/infrastructure/services/CameraService.ts
  → src/infrastructure/services/ImageConverter.ts (base64 conversion)
  → src/presentation/hooks/useCameraHandler.ts (onCapture)
  → src/domain/use-cases/extractReadingsFromImage.ts
  → src/infrastructure/repositories/GeminiRepository.ts
  → src/infrastructure/api/geminiService.ts
  → Gemini API (POST with prompt + image base64)
  → JSON parsing → Form pre-fill
  → User reviews/edits → Manual flow
```

**Dependency Injection Flow:**

```
src/infrastructure/di/Container.ts
  → Initializes repositories (InMemoryBloodPressureRepository, GeminiRepository)
  → Creates use case instances with injected repositories
  → Hooks access use cases from container
```

**Type Hierarchy:**

- `BloodPressureFormValues` - Presentation layer (form input)
- `BloodPressureReading` - Domain layer (business entity)
- `BloodPressureRecord` - Domain layer (data model)

Mappers in `src/infrastructure/mappers/` handle conversion between these types at layer boundaries.

## Important Implementation Details

### Storage

- **Current:** In-memory storage (non-persistent, resets on app restart)
- **Location:** `src/infrastructure/repositories/InMemoryBloodPressureRepository.ts`
- **Interface:** `src/domain/repositories/IBloodPressureRepository.ts`
- **Future:** Can swap to SQLite/AsyncStorage by implementing `IBloodPressureRepository` interface

### Gemini AI Integration

- **Model:** `gemini-2.5-flash-image-preview`
- **Endpoint:** Configured in `src/shared/constants/apiConstants.ts`
- **API Client:** `src/infrastructure/api/geminiClient.ts` - Axios instance with API key
- **Service:** `src/infrastructure/api/geminiService.ts` - Service wrapper
- **Repository:** `src/infrastructure/repositories/GeminiRepository.ts` - Implementation
- **Request:** Sends prompt + JPEG image (base64)
- **Response:** JSON with systolic, diastolic, pulse values
- **Prompt:** Defined in `src/shared/constants/geminiPrompts.ts`

### Form Validation

- Uses **React Hook Form** with **Yup** schema validation
- Schema: `src/presentation/components/BloodPressureForm/validationSchema.ts`
- Validation messages: `src/shared/constants/validationMessages.ts`
- All fields (systolic, diastolic, pulse) must be positive integers

### Navigation

- React Navigation with native stack
- Navigator: `src/presentation/navigation/AppNavigator.tsx`
- Modals use `@gorhom/bottom-sheet` for better UX

### Dependency Injection

- **Container:** `src/infrastructure/di/Container.ts`
- Manages singleton instances of repositories and use cases
- Ensures consistent dependencies across the app
- Used by hooks to access business logic

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

### Clean Architecture Layers

The project strictly follows Clean Architecture with dependency rules:

- **Domain** layer has no dependencies on other layers (pure business logic)
- **Infrastructure** layer depends only on Domain (implements interfaces)
- **Presentation** layer depends on Domain and Infrastructure (UI logic)
- **Shared** layer provides utilities accessible to all layers

### Custom Hooks Pattern

- All custom hooks live in `src/presentation/hooks/`
- Each hook has single responsibility
- Hooks use the DI container to access use cases
- Use `useCallback` for functions passed to children
- Use `useMemo` for expensive computations

### Repository Pattern

- Interfaces defined in `src/domain/repositories/`
- Implementations in `src/infrastructure/repositories/`
- All data access goes through repository interfaces
- Enables easy swapping of implementations (in-memory → SQLite → Backend API)

### Use Case Pattern

- Pure functions in `src/domain/use-cases/`
- Single responsibility per use case
- Dependencies injected via constructor
- No side effects except calling repositories
- Return domain entities, not raw data structures

### Mapper Pattern

- Convert data at layer boundaries
- Located in `src/infrastructure/mappers/`
- Type-safe transformations with validation
- Handle conversion between domain entities and data models

### Dependency Injection Pattern

- Central DI container: `src/infrastructure/di/Container.ts`
- Manages singleton instances
- Repositories and use cases accessed via container
- Enables testability and loose coupling

### Service Layer

- External services in `src/infrastructure/services/`
- Examples: `CameraService.ts`, `ImageConverter.ts`
- Encapsulate platform-specific or complex operations
- Used by repositories and use cases
