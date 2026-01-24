# Admin Login System

## Overview
This is a simple password-based authentication system for the admin panel, replacing the previous Google Authentication system.

## Quick Access Shortcuts

### 1. Navbar Button
- **Desktop**: Nút "Admin" với icon người dùng ở góc phải navbar
- **Mobile**: "Admin Panel" trong menu di động
- **URL**: `/admin`

### 2. Short URL
- **URL**: `/a` - Redirect tự động đến `/admin`
- **Lưu ý**: Rất ngắn và dễ gõ

### 3. Bookmark
- Bookmark trang `/admin` hoặc `/a` để truy cập nhanh

## Features
- **Password-based authentication**: Simple and secure login using a predefined password
- **Session management**: Sessions expire after 24 hours for security
- **Auto-logout on window close**: Automatically logs out when the browser window/tab is closed
- **Responsive design**: Works on both desktop and mobile devices
- **Vietnamese interface**: All UI elements are in Vietnamese

## Setup

### 1. Configure Admin Password
Add the following environment variable to your `.env.local` file:

```env
NEXT_PUBLIC_ADMIN_ACCESS_PASSWORD=your_secure_password_here
```

**Important Security Notes:**
- Use a strong, unique password
- Never commit your `.env.local` file to version control
- Change the password regularly for security

### 2. How It Works

#### Login Process:
1. User visits `/admin` page
2. If not authenticated, the `AdminLogin` component is displayed
3. User enters password and submits the form
4. The form sends a POST request to `/api/auth/admin/login`
5. The API validates the password against `NEXT_PUBLIC_ADMIN_ACCESS_PASSWORD`
6. If successful, a session is created in `localStorage` with a timestamp
7. User is redirected to the admin dashboard

#### Session Management:
- Session data is stored in `localStorage` with key `adminAuth`
- Session expires after 24 hours (checked on page load)
- Session is automatically cleared when the browser window/tab is closed
- User can manually logout using the "Đăng xuất" button

### 3. File Structure

```
src/
├── components/
│   └── Admin/
│       ├── AdminLogin.js          # Login form component
│       ├── adminIndex.js          # Component exports
│       └── README_ADMIN_LOGIN.md  # This file
├── app/
│   └── api/
│       └── auth/
│           └── admin/
│               └── login/
│                   └── route.js   # Login API endpoint
│   └── admin/
│       └── page.js                # Admin panel page
```

### 4. API Endpoint

**Endpoint:** `POST /api/auth/admin/login`

**Request Body:**
```json
{
  "password": "your_password"
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Đăng nhập thành công"
}
```

**Response (Error - 401):**
```json
{
  "error": "Mật khẩu không đúng"
}
```

**Response (Error - 500):**
```json
{
  "error": "Cấu hình mật khẩu admin không tồn tại"
}
```

### 5. Security Features

1. **Password Protection**: Password is stored in environment variables, not in code
2. **Session Expiration**: Sessions automatically expire after 24 hours
3. **Auto-logout**: Clears session data when browser window is closed
4. **No Persistent Storage**: Uses `localStorage` which is cleared on logout
5. **API Validation**: Server-side password validation

### 6. Customization

#### Changing Session Duration
To change the session expiration time (currently 24 hours), modify the check in `src/app/admin/page.js`:

```javascript
const isExpired = Date.now() - timestamp > 24 * 60 * 60 * 1000; // 24 hours
```

#### Adding Additional Security
For enhanced security, consider:
- Implementing password hashing (bcrypt)
- Adding rate limiting to the login API
- Implementing IP-based restrictions
- Adding CAPTCHA for brute force protection

### 7. Troubleshooting

**Issue: "Cấu hình mật khẩu admin không tồn tại"**
- Solution: Make sure `NEXT_PUBLIC_ADMIN_ACCESS_PASSWORD` is set in `.env.local`

**Issue: Login successful but can't see admin panel**
- Solution: Check browser console for errors, ensure Firebase configuration is correct

**Issue: Session expires too quickly**
- Solution: Check the timestamp in localStorage and verify the expiration logic

### 8. Migration from Google Auth

If you were using the previous Google Authentication system:
1. Remove Firebase Auth dependencies if no longer needed
2. Update environment variables to remove `NEXT_PUBLIC_ALLOWED_ADMIN_EMAIL`
3. The new system is independent of Firebase Authentication

## Support
For issues or questions, refer to the component source code or contact the development team.
