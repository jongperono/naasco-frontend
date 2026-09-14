# Testing Guide

## Quick Start

### Run Tests
```bash
# Run all tests once
npm test

# Run tests in watch mode (re-runs on file changes)
npm run test:watch

# Run tests with coverage report
npm run test:coverage

# Run tests with detailed output
npm run test:ui
```

## Current Test Coverage

### ✅ Login Feature (100% Coverage)
- **LoginForm Component**: 20 comprehensive tests
- **Login Page**: 2 integration tests
- **Total**: 22 passing tests

## Test Structure

```
naasco-frontend/
├── __tests__/
│   ├── LoginForm.test.tsx      # Main login form tests
│   ├── login-page.test.tsx     # Login page tests
│   └── README.md               # Detailed test documentation
├── jest.config.js              # Jest configuration
├── jest.setup.js               # Test setup file
└── TEST_SUMMARY.md             # This file
```

## What's Tested

### ✅ Component Rendering
- All UI elements render correctly
- Theme toggle is present
- Social login buttons display
- Form inputs and labels

### ✅ User Interactions
- Typing in email/password fields
- Clicking buttons
- Checking checkboxes
- Form submission

### ✅ Form Validation
- Required fields
- Input types (email, password)
- Field constraints

### ✅ Success Scenarios
- Successful login flow
- Redirect to dashboard
- Loading states

### ✅ Error Scenarios
- Failed login attempts
- Error message display
- Error clearing on retry

### ✅ Accessibility
- Proper ARIA labels
- Semantic HTML
- Keyboard navigation support

## Example Test Output

```
PASS  __tests__/LoginForm.test.tsx
  LoginForm
    Rendering
      ✓ renders the login form with all elements (173 ms)
      ✓ renders theme toggle component (10 ms)
      ✓ renders social login buttons (28 ms)
      ✓ renders sign up link (13 ms)
    Form Validation
      ✓ requires email and password fields (11 ms)
      ✓ email input has correct type (9 ms)
      ✓ password input has correct type (10 ms)
    User Interactions
      ✓ updates email input value when user types (365 ms)
      ✓ updates password input value when user types (218 ms)
      ✓ can check the remember me checkbox (63 ms)
    Form Submission - Success
      ✓ calls login function with email and password on submit (593 ms)
      ✓ redirects to dashboard on successful login (631 ms)
      ✓ shows loading state during login (663 ms)
    Form Submission - Failure
      ✓ displays error message on failed login (671 ms)
      ✓ displays generic error message when error is not provided (640 ms)
      ✓ does not redirect on failed login (686 ms)
      ✓ clears error message on new submission attempt (1064 ms)
    Form Submission Prevention
      ✓ prevents form submission when clicking submit button while loading (801 ms)
    Accessibility
      ✓ has accessible form labels (9 ms)
      ✓ has proper button roles (30 ms)

PASS  __tests__/login-page.test.tsx
  LoginPage
    ✓ renders the login page (58 ms)
    ✓ renders the LoginForm component (107 ms)

Test Suites: 2 passed, 2 total
Tests:       22 passed, 22 total
```

## Coverage Report

```
File                    | % Stmts | % Branch | % Funcs | % Lines
------------------------|---------|----------|---------|--------
LoginForm.tsx           |     100 |      100 |     100 |     100
app/(auth)/login/page.tsx |   100 |      100 |     100 |     100
```

## Testing Stack

- **Jest** - Testing framework
- **React Testing Library** - Component testing utilities
- **@testing-library/user-event** - User interaction simulation
- **@testing-library/jest-dom** - Custom matchers for assertions

## Best Practices

1. **Test user behavior, not implementation details**
2. **Use accessible queries** (getByRole, getByLabelText)
3. **Mock external dependencies** (API calls, navigation)
4. **Test async operations properly** with waitFor
5. **Clean up between tests** (beforeEach/afterEach)
6. **Write descriptive test names**

## Adding New Tests

1. Create test file: `__tests__/YourComponent.test.tsx`
2. Import necessary utilities:
   ```typescript
   import { render, screen, waitFor } from '@testing-library/react';
   import userEvent from '@testing-library/user-event';
   ```
3. Write test cases following existing patterns
4. Run tests to verify

## Continuous Integration

Tests are ready for CI/CD pipelines:

```yaml
# Example GitHub Actions workflow
- name: Run tests
  run: npm test

- name: Generate coverage
  run: npm run test:coverage
```

## Troubleshooting

### Tests not found
- Ensure test files are in `__tests__` directory
- Or use `.test.tsx` or `.spec.tsx` extension

### Module resolution errors
- Check `jest.config.js` moduleNameMapper
- Verify path aliases match `tsconfig.json`

### Async warnings
- Always use `await` with userEvent methods
- Use `waitFor` for async state changes

### Mock issues
- Clear mocks in `beforeEach`
- Verify mock return values match expected types

## Resources

- [Jest Documentation](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

## Next Steps

- [ ] Add tests for RegisterForm
- [ ] Add tests for AuthContext
- [ ] Add tests for Dashboard components
- [ ] Add integration tests
- [ ] Set up CI/CD pipeline
