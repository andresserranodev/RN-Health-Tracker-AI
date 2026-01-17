---
name: reactut
description: "on unit test creation in a react native proyects"
model: sonnet
color: orange
---

# React Native Unit Testing Guidelines

This document outlines the standards and best practices for writing unit tests in this React Native project. Our testing strategy is centered around [React Native Testing Library](https://callstack.github.io/react-native-testing-library/), which encourages testing application behavior from a user's perspective.

## Core Principles

All tests should adhere to the following principles:

1.  **The Golden Rule**: Test your components' behavior, not their implementation details. The more your tests resemble the way your software is used, the more confidence they can give you.
2.  **A.A.A. (Arrange, Act, Assert)**: Structure your tests clearly.
    - **Arrange**: Set up the test conditions, including rendering the component with the necessary props and mocks.
    - **Act**: Interact with the component (e.g., press a button, type in a field).
    - **Assert**: Verify that the expected outcome has occurred.
3.  **F.I.R.S.T**:
    - **Fast**: Tests should run quickly.
    - **Independent**: Tests should not depend on each other.
    - **Repeatable**: Tests should produce the same results every time.
    - **Self-Validating**: Tests should have a clear pass or fail outcome.
    - **Timely**: Tests should be written alongside the feature code.

---

## File Structure

- Test files must be located in the same directory within the component or hook's folder.
- Test filenames must use the format `[FileName].test.tsx`.

**Example:**

```
/src/components/MyComponent/
├── index.tsx
└── MyComponent.test.tsx
```

---

## Writing Tests

### Test Naming Convention

All tests must follow the **Given When Then** naming convention to ensure clarity and consistency:

- **Given**: The initial context or state
- **When**: The action or event that triggers the behavior
- **Then**: The expected outcome

**Format**: `"Given [context], when [action], then [expected outcome]"`

**Examples:**

```typescript
describe("LoginButton", () => {
  it("Given a valid user credential, when the login button is pressed, then it should call the login function", () => {
    // Test implementation
  });

  it("Given an invalid email format, when the user submits the form, then it should display an error message", () => {
    // Test implementation
  });

  it("Given a loading state, when the component renders, then it should display a loading spinner", () => {
    // Test implementation
  });
});
```

### Queries

Use the queries from React Native Testing Library to find elements on the screen. Prioritize queries in the following order, as they reflect what the user sees:

1.  **`getByRole` / `findByRole` / `queryByRole`**: For elements with an `accessibilityRole`.
2.  **`getByText` / `findByText` / `queryByText`**: For elements with text content.
3.  **`getByPlaceholderText`**: For input fields.
4.  **`getByTestId`**: As a last resort for elements that cannot be queried by other means. Avoid overusing `testID`.

### Async Operations

When testing asynchronous behavior (e.g., data fetching), use `findBy*` queries or the `waitFor` utility.

```typescript
it("should display the user name after fetching data", async () => {
  // Arrange
  mockedAxios.get.mockResolvedValue({ data: { name: "John Doe" } });
  render(<UserProfile />);

  // Act & Assert
  const userName = await screen.findByText("John Doe");
  expect(userName).toBeOnTheScreen();
});
```

### User Interactions

Use `fireEvent` or `@testing-library/user-event` to simulate user interactions.

```typescript
import { render, screen, fireEvent } from "@testing-library/react-native";

it("should call onPress when the button is pressed", () => {
  // Arrange
  const onPressMock = jest.fn();
  render(<Button title="Submit" onPress={onPressMock} />);

  // Act
  fireEvent.press(screen.getByText("Submit"));

  // Assert
  expect(onPressMock).toHaveBeenCalledTimes(1);
});
```

---

## What to Test

- **Conditional Rendering**: Ensure the correct UI is displayed based on props or state.
- **User Events**: Test that functions are called when users interact with elements.
- **Accessibility**: Verify that important elements have the correct `accessibilityRole`, `accessibilityLabel`, and other a11y props.
- **Custom Hooks**: Test the logic within custom hooks, including what they return and the side effects they trigger.
- **Side Effects**: Verify that API calls are made, navigation events occur, or state is updated as expected.

## What NOT to Test

- **Implementation Details**: Do not test internal state or component methods.
- **Third-Party Libraries**: Assume libraries like `react-navigation` or `axios` work correctly. Focus on testing how your code integrates with them.
- **Static Styles**: Do not write tests to verify that a component has a specific color or font size, unless it's a conditional style that reflects a state change.
- **Redux/Zustand Internals**: Test the components that use the store, not the store's implementation itself.

---

## Mocking

Our test environment (`__jest__/setup.ts`) pre-configures mocks for many common modules (`react-navigation`, `axios`, Nexus libraries, etc.).

### Mocking API Calls

For specific API responses in a test, mock the implementation of the data-fetching function (e.g., `axios.get` or `nxGetData`).

```typescript
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

it("should handle API failure gracefully", async () => {
  // Arrange
  mockedAxios.get.mockRejectedValue(new Error("Network Error"));
  render(<MyComponent />);

  // Assert
  expect(await screen.findByText("Something went wrong")).toBeOnTheScreen();
});
```

### Mocking Custom Hooks

If a component relies on a complex custom hook, you can mock the hook to simplify the test setup and focus on the component's behavior.

```typescript
import * as useMyHook from "../hooks/useMyHook";

it("should display a loading state from the hook", () => {
  // Arrange
  jest
    .spyOn(useMyHook, "default")
    .mockReturnValue({ isLoading: true, data: null });
  render(<MyComponent />);

  // Assert
  expect(screen.getByTestId("loading-spinner")).toBeOnTheScreen();
});
```
