# Frontend Tests

This directory contains Jest unit tests for the NAASCO frontend application.

## Test Setup

The tests are configured using:
- **Jest**: Testing framework
- **React Testing Library**: For testing React components
- **@testing-library/user-event**: For simulating user interactions
- **@testing-library/jest-dom**: For additional DOM matchers

## Running Tests

### Run all tests
```bash
npm test
```

### Run tests in watch mode
```bash
npm run test:watch
```

### Run tests with coverage
```bash
npm run test:coverage
```

### Run a specific test file
```bash
npm test -- LoginForm.test.tsx
```

## Test Structure

### LoginForm.test.tsx

Comprehensive tests for the login form component covering:

#### 1. **Rendering**
   - Verifies all UI elements are present (headings, inputs, buttons, links)
   - Checks theme toggle component renders
   - Validates social login buttons
   - Confirms sign-up link

#### 2. **Form Validation**
   - Email and password fields are required
   - Email input has correct type
   - Password input has correct type

#### 3. **User Interactions**
   - Email input updates on typing
   - Password input updates on typing
   - Remember me checkbox can be toggled

#### 4. **Form Submission - Success**
   - Login function called with correct credentials
   - Redirects to dashboard on success
   - Shows loading state during submission

#### 5. **Form Submission - Failure**
   - Displays error messages on failed login
   - Shows generic error when specific error not provided
   - Does not redirect on failure
   - Clears errors on new submission attempt

#### 6. **Form Submission Prevention**
   - Prevents multiple submissions while loading

#### 7. **Accessibility**
   - Proper form labels
   - Correct button roles and types

## Test Coverage

The LoginForm test suite includes **20 test cases** covering:
- Component rendering
- User input handling
- Form validation
- Async operations (login API calls)
- Error handling
- Loading states
- Accessibility features

## Writing New Tests

When adding new tests, follow these patterns:

1. **Organize tests by feature** using `describe` blocks
2. **Use descriptive test names** that explain what is being tested
3. **Mock external dependencies** (API calls, context, navigation)
4. **Use React Testing Library queries** in this order of preference:
   - `getByRole` (most accessible)
   - `getByLabelText` (for form inputs)
   - `getByText`
   - `getByTestId` (last resort)
5. **Test user behavior**, not implementation details
6. **Use `waitFor`** for async operations
7. **Clean up mocks** in `beforeEach`

## Mocking Strategy

### Next.js Navigation
```typescript
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));
```

### Context Providers
```typescript
jest.mock('@/contexts/AuthContext', () => ({
  useAuth: jest.fn(),
}));
```

### UI Components
```typescript
jest.mock('@/components/ui/ThemeToggle', () => {
  return function ThemeToggle() {
    return <div data-testid="theme-toggle">Theme Toggle</div>;
  };
});
```

## Troubleshooting

### Act Warnings
If you see "not wrapped in act(...)" warnings, ensure:
- You're using `await` with `userEvent` methods
- You're using `waitFor` for state updates
- Async operations complete before test ends

### Timeout Issues
Increase timeout for slow tests:
```typescript
jest.setTimeout(10000); // 10 seconds
```

### Module Resolution
If imports fail, check:
- `moduleNameMapper` in `jest.config.js`
- Path aliases match `tsconfig.json`

## Best Practices

1. **Test behavior, not implementation**
2. **Write tests that resemble how users interact with your app**
3. **Avoid testing internal state** - test what the user sees
4. **Keep tests isolated** - each test should be independent
5. **Use semantic queries** - prefer accessible queries
6. **Mock external dependencies** but not internal modules
7. **Test error scenarios** alongside happy paths
8. **Maintain high coverage** but focus on critical paths
