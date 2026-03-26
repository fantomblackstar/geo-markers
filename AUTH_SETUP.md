# Authentication Setup Guide

This application uses client-side password protection with SHA-256 hashing.

## ⚠️ Security Notice

This is **client-side authentication** and provides **privacy, not security**. Anyone with access to the browser's developer tools can bypass this protection. Use this only for:
- Personal projects
- Basic privacy protection
- Keeping casual visitors out

**Do NOT use this for:**
- Protecting sensitive data
- Production applications with real security requirements
- Multi-user systems

## 🚀 Setup Instructions

### 1. Generate Your Password Hash

Open `generate-password-hash.html` in your browser:

```bash
open generate-password-hash.html
```

Or simply double-click the file.

### 2. Create Password Hash

1. Enter your desired password in the form
2. Click "Generate Hash"
3. Copy the generated hash

### 3. Configure Environment

Create a `.env` file in the project root:

```bash
touch .env
```

Add the following line with your generated hash:

```
REACT_APP_PASSWORD_HASH=your_generated_hash_here
```

### 4. Restart Development Server

If the server is running, restart it to load the new environment variable:

```bash
npm start
```

## 🔑 How It Works

1. **Password Hashing**: Uses SHA-256 to hash passwords (Web Crypto API)
2. **Session Management**: Stores authentication state in localStorage
3. **Session Duration**: 24 hours (configurable in `auth-context.tsx`)
4. **Auth Guard**: Protects all routes with the `AuthGuard` component
5. **Dialog UI**: Shows a modal with blurred backdrop when not authenticated

## 📁 Files Created

- `src/shared/lib/crypto.ts` - Password hashing utilities
- `src/shared/model/auth-context.tsx` - Authentication context and state
- `src/features/auth-dialog/` - Password dialog component
- `src/shared/ui/auth-guard.tsx` - Route protection wrapper
- `generate-password-hash.html` - Hash generation tool

## 🎨 Features

- ✅ Modern UI with Tailwind CSS
- ✅ Blurred backdrop effect
- ✅ Password visibility toggle
- ✅ Session persistence (24h)
- ✅ Logout button in header
- ✅ Error handling
- ✅ Loading states

## 🔧 Customization

### Change Session Duration

Edit `src/shared/model/auth-context.tsx`:

```typescript
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
```

### Update Password

1. Generate a new hash using `generate-password-hash.html`
2. Update `REACT_APP_PASSWORD_HASH` in `.env`
3. Restart the server

## 🛡️ Best Practices

1. **Never commit `.env`** - It's already in `.gitignore`
2. **Use strong passwords** - Even though it's client-side
3. **Share the hash securely** - If deploying, use environment variables in your hosting platform
4. **Regular updates** - Change the password periodically

## 🚀 Deployment

For production deployment (e.g., GitHub Pages, Netlify):

1. Add `REACT_APP_PASSWORD_HASH` to your hosting platform's environment variables
2. The hash will be embedded in the build
3. Remember: This is still client-side and can be bypassed

## 📝 Notes

- The hash is visible in the compiled JavaScript
- This provides obfuscation, not encryption
- For real security, implement a backend authentication system
