# Frontend Authentication Setup

## Overview

The frontend is now connected to the backend authentication API.

## What Was Implemented

### 1. API Client (`lib/api/client.ts`)
- Centralized API communication
- Automatic token management
- TypeScript types for all API responses
- Methods for login, register, and user management

### 2. Auth Context (`contexts/AuthContext.tsx`)
- Global authentication state management
- React Context API for user state
- Auto-check authentication on mount
- Login, register, and logout functions

### 3. Updated Components

#### Login Form (`components/LoginForm.tsx`)
- Changed from username to email
- Connected to backend `/api/auth/login`
- Error handling and display
- Redirects to dashboard on success
- Loading states

#### Register Form (`components/RegisterForm.tsx`)
- Complete registration form with validation
- Connected to backend `/api/auth/register`
- Password confirmation
- Optional phone number field
- Error handling and display
- Redirects to dashboard on success

#### Dashboard Page (`app/(dashboard)/dashboard/page.tsx`)
- Protected route (redirects to login if not authenticated)
- Displays user information
- Logout functionality
- Loading states

### 4. Environment Configuration
- `.env.local` file for API URL configuration
- Default: `http://localhost:3001`

## File Structure

```
naasco-frontend/
├── lib/
│   └── api/
│       └── client.ts              # API client and types
├── contexts/
│   └── AuthContext.tsx            # Authentication context
├── components/
│   ├── LoginForm.tsx              # Updated login form
│   └── RegisterForm.tsx           # New registration form
├── app/
│   ├── layout.tsx                 # Updated with AuthProvider
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx          # Login page
│   │   └── register/
│   │       └── page.tsx          # Register page
│   └── (dashboard)/
│       └── dashboard/
│           └── page.tsx          # Protected dashboard
└── .env.local                     # API URL configuration
```

## How It Works

### Authentication Flow

1. **Registration**
   - User fills out registration form
   - Form validates password length and confirmation
   - Data sent to `/api/auth/register`
   - Backend creates user and returns JWT token
   - Token saved to localStorage
   - User redirected to dashboard

2. **Login**
   - User enters email and password
   - Data sent to `/api/auth/login`
   - Backend validates credentials
   - JWT token returned and saved
   - User redirected to dashboard

3. **Protected Routes**
   - Dashboard checks for authenticated user
   - If no user, redirects to login
   - User data displayed from context

4. **Logout**
   - Token removed from localStorage
   - User state cleared
   - Can redirect to login page

### Token Management

Tokens are automatically:
- Saved to localStorage on login/register
- Included in Authorization header for API requests
- Removed on logout
- Checked on app load

## Usage

### Start Backend
```bash
cd naasco-backend
npm run dev
```

### Start Frontend
```bash
cd naasco-frontend
npm run dev
```

### Test the Flow

1. **Register a new account**
   - Go to http://localhost:3000/register
   - Fill out the form
   - Submit and you'll be redirected to dashboard

2. **Login**
   - Go to http://localhost:3000/login
   - Enter your credentials
   - Submit and you'll be redirected to dashboard

3. **View Dashboard**
   - See your user information
   - Click logout to sign out

## API Endpoints Used

- `POST /api/auth/register` - Create new user
- `POST /api/auth/login` - Authenticate user
- `GET /api/auth/me` - Get current user (with token)
- `GET /api/users/profile` - Get user profile (with token)

## Using the Auth Hook

```typescript
import { useAuth } from '@/contexts/AuthContext';

function MyComponent() {
  const { user, loading, login, register, logout } = useAuth();

  // Check if user is logged in
  if (user) {
    console.log('User:', user.email, user.role);
  }

  // Login
  const handleLogin = async () => {
    const result = await login('user@example.com', 'password123');
    if (result.success) {
      console.log('Logged in!');
    } else {
      console.error('Error:', result.error);
    }
  };

  // Logout
  const handleLogout = () => {
    logout();
  };

  return (
    // Your component JSX
  );
}
```

## Using the API Client

```typescript
import { apiClient } from '@/lib/api/client';

// Login
const response = await apiClient.login('user@example.com', 'password');
if (response.data) {
  apiClient.saveToken(response.data.token);
}

// Get profile
const profile = await apiClient.getProfile();
if (profile.data) {
  console.log(profile.data.user);
}

// Logout
apiClient.logout();
```

## Environment Variables

Create `.env.local` in the frontend root:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## TypeScript Types

All API types are defined in `lib/api/client.ts`:

```typescript
interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  role: string;
  roleId: number;
  isActive: boolean;
}

interface AuthResponse {
  token: string;
  user: User;
}
```

## Security Notes

- Tokens are stored in localStorage (consider httpOnly cookies for production)
- All API requests include CORS headers
- Passwords are never stored in frontend state
- Token is automatically removed if API returns 401
- Protected routes redirect to login if not authenticated

## Next Steps

1. Add password reset functionality
2. Implement refresh token mechanism
3. Add remember me feature
4. Enhance error messages
5. Add loading skeletons
6. Implement role-based UI elements
7. Add user profile editing

## Troubleshooting

### "Network error occurred"
- Check if backend is running on port 3001
- Verify NEXT_PUBLIC_API_URL in .env.local

### "Unauthorized" after login
- Check if token is being saved to localStorage
- Verify backend JWT_SECRET is configured

### Redirects not working
- Ensure useRouter is from 'next/navigation'
- Check if user state is updating correctly

### CORS errors
- Verify backend CORS configuration includes 'http://localhost:3000'

---

**The frontend is now fully connected to the backend authentication system!** 🎉
