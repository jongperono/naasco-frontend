import { test, expect } from '@playwright/test';

// Configure base URL - update this to match your local development server
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

test.describe('Login Page', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to login page before each test
    await page.goto(`${BASE_URL}/login`);
  });

  test('should display login form with all elements', async ({ page }) => {
    // Check page title/heading
    await expect(page.getByRole('heading', { name: 'NAASCO' })).toBeVisible();
    await expect(page.getByText('Sign in to your account')).toBeVisible();

    // Check form elements
    await expect(page.getByLabel('Email')).toBeVisible();
    await expect(page.getByLabel('Password')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Sign in' })).toBeVisible();

    // Check additional elements
    await expect(page.getByText('Remember me for 30 days')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Forgot password?' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Sign up for free' })).toBeVisible();
  });

  test('should show validation for empty form submission', async ({ page }) => {
    // Try to submit without filling in fields
    await page.getByRole('button', { name: 'Sign in' }).click();

    // HTML5 validation should prevent submission
    // Check that email field is required
    const emailInput = page.getByLabel('Email');
    await expect(emailInput).toHaveAttribute('required', '');
  });

  test('should validate email format', async ({ page }) => {
    // Enter invalid email
    await page.getByLabel('Email').fill('invalid-email');
    await page.getByLabel('Password').fill('password123');
    await page.getByRole('button', { name: 'Sign in' }).click();

    // HTML5 validation should show error (browser-specific behavior)
    const emailInput = page.getByLabel('Email');
    const validationMessage = await emailInput.evaluate((el: HTMLInputElement) => el.validationMessage);
    expect(validationMessage).toBeTruthy();
  });

  // test('should show loading state when submitting', async ({ page }) => {
  //   // Fill in the form
  //   await page.getByLabel('Email').fill('jongperono@gmail.com');
  //   await page.getByLabel('Password').fill('jongjong');

  //   // Submit the form
  //   await page.getByRole('button', { name: 'Sign in' }).click();

  //   // Check for loading state (button should show "Signing in...")
  //   await expect(page.getByText('Signing in...')).toBeVisible();
  // });

  test('should display error message for invalid credentials', async ({ page }) => {
    await page.goto('/login');

    const email = page.getByLabel('Email');
    await expect(email).toBeVisible();
    await email.click();
    await email.fill(`nonexistent-${Date.now()}@example.com`); // 👈 fresh email every run

    const password = page.getByLabel('Password', { exact: true });
    await password.click();
    await password.fill('wrongpassword');

    const submit = page.getByRole('button', { name: 'Sign in' });
    await expect(submit).toBeEnabled();
    await submit.click();

    // ─── DEBUG DUMP (remove once fixed) ──────────────────────────
    await page.waitForTimeout(3000);
    console.log('───── DEBUG ─────');
    console.log('URL:', page.url());
    console.log('BODY:\n', (await page.locator('body').innerText()).slice(0, 1500));
    console.log('─────────────────');
    // ─────────────────────────────────────────────────────────────

    // Try the alert role first, fall back to the red banner, then to raw text
    const errorBanner = page
      .locator('[role="alert"], .text-red-600, .text-red-400')
      .first();

    await expect(errorBanner).toContainText(/invalid email or password/i, {
      timeout: 10000,
    });
  });

  test('should successfully login with valid credentials', async ({ page }) => {
    // Fill in the form with valid credentials
    // Note: Update these with actual test credentials from your backend
    await page.getByLabel('Email').fill('jongperono@gmail.com');
    await page.getByLabel('Password').fill('jongjong');

    // Submit the form
    await page.getByRole('button', { name: 'Sign in' }).click();

    // Should redirect to dashboard on success
    await expect(page).toHaveURL(`${BASE_URL}/dashboard`, { timeout: 10000 });
  });

  test('should toggle password visibility', async ({ page }) => {
    const passwordInput = page.getByLabel('Password');

    // Password should be hidden by default
    await expect(passwordInput).toHaveAttribute('type', 'password');

    // Note: If you add a password visibility toggle button, test it here
    // Example:
    // await page.getByRole('button', { name: /show password/i }).click();
    // await expect(passwordInput).toHaveAttribute('type', 'text');
  });

  test('should navigate to register page', async ({ page }) => {
    // Click on sign up link
    await page.getByRole('link', { name: 'Sign up for free' }).click();

    // Should navigate to register page
    await expect(page).toHaveURL(`${BASE_URL}/register`);
  });

  test('should have theme toggle button', async ({ page }) => {
    // Check if theme toggle is present
    const themeToggle = page.locator('.absolute.top-4.right-4');
    await expect(themeToggle).toBeVisible();
  });

  test('should have social login buttons', async ({ page }) => {
    // Check for Google login button
    await expect(page.getByRole('button', { name: /google/i })).toBeVisible();

    // Check for GitHub login button
    await expect(page.getByRole('button', { name: /github/i })).toBeVisible();
  });

  test('should handle forgot password link', async ({ page }) => {
    const forgotPasswordLink = page.getByRole('link', { name: 'Forgot password?' });
    await expect(forgotPasswordLink).toBeVisible();

    // Note: Update this when forgot password functionality is implemented
    await expect(forgotPasswordLink).toHaveAttribute('href', '#');
  });

  test('should persist remember me checkbox state', async ({ page }) => {
    const rememberCheckbox = page.getByLabel('Remember me for 30 days');

    // Checkbox should be unchecked by default
    await expect(rememberCheckbox).not.toBeChecked();

    // Check the checkbox
    await rememberCheckbox.check();
    await expect(rememberCheckbox).toBeChecked();

    // Uncheck the checkbox
    await rememberCheckbox.uncheck();
    await expect(rememberCheckbox).not.toBeChecked();
  });

  test('should have accessible form labels', async ({ page }) => {
    // Check that inputs are properly associated with labels
    const emailInput = page.getByLabel('Email');
    await expect(emailInput).toHaveAttribute('id', 'email');

    const passwordInput = page.getByLabel('Password');
    await expect(passwordInput).toHaveAttribute('id', 'password');

    const rememberCheckbox = page.getByLabel('Remember me for 30 days');
    await expect(rememberCheckbox).toHaveAttribute('id', 'remember');
  });

  test('should have proper placeholder text', async ({ page }) => {
    // Check email placeholder
    await expect(page.getByLabel('Email')).toHaveAttribute('placeholder', 'Enter your email');

    // Check password placeholder
    await expect(page.getByLabel('Password')).toHaveAttribute('placeholder', '••••••••');
  });
});

// Test suite for authenticated user trying to access login page
test.describe('Login Page - Already Authenticated', () => {
  test.skip('should redirect authenticated user to dashboard', async ({ page }) => {
    // Note: This test requires setting up authentication state
    // Use Playwright's context.storageState() or cookies to simulate authenticated user

    // Example:
    // await page.goto(`${BASE_URL}/login`);
    // await expect(page).toHaveURL(`${BASE_URL}/dashboard`);
  });
});

// ─────────────────────────────────────────────────────────────
// DIAGNOSTIC TEST — temporary, delete once login issue is fixed
// ─────────────────────────────────────────────────────────────
test('diagnostic: log login API response', async ({ page }) => {
  // Capture every network response that looks like an auth call
  page.on('response', async (res) => {
    const url = res.url();
    if (
      url.includes('/api/') ||
      url.includes('/auth') ||
      url.includes('/login') ||
      url.includes('/signin') ||
      url.includes('/token')
    ) {
      console.log('── API RESPONSE ──');
      console.log('URL:   ', url);
      console.log('METHOD:', res.request().method());
      console.log('STATUS:', res.status());
      try {
        console.log('BODY:  ', (await res.text()).slice(0, 800));
      } catch {
        console.log('BODY:   <unreadable>');
      }
      console.log('──────────────────');
    }
  });

  // Capture browser console output (React/Next.js errors show up here)
  page.on('console', (msg) => {
    console.log('[browser console]', msg.type(), msg.text());
  });

  // Capture page errors
  page.on('pageerror', (err) => {
    console.log('[pageerror]', err.message);
  });

  await page.goto(`${BASE_URL}/login`);
  await page.getByLabel('Email').fill('jongperono@gmail.com');
  await page.getByLabel('Password', { exact: true }).fill('jongjong');
  await page.getByRole('button', { name: 'Sign in' }).click();

  // Give the app time to respond / redirect
  await page.waitForTimeout(5000);

  console.log('══════════════════════════════════');
  console.log('FINAL URL: ', page.url());
  console.log('ALERT TEXT:', await page.locator('[role="alert"]').allInnerTexts());
  console.log('BODY TEXT:', (await page.locator('body').innerText()).slice(0, 800));
  console.log('══════════════════════════════════');
});