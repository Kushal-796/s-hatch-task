# 🚀 LaunchFlow Setup Guide

## 🔥 Firebase Google Authentication Setup

### Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter project name (e.g., "launchflow-app")
4. Enable Google Analytics (optional but recommended)
5. Wait for project creation to complete

### Step 2: Enable Authentication

1. In Firebase Console, click on **"Authentication"** in the sidebar
2. Click **"Get started"** if first time
3. Go to **"Sign-in method"** tab
4. Click on **"Google"** provider
5. Toggle **"Enable"** switch
6. Enter your **support email** (your Gmail address)
7. Click **"Save"**

### Step 3: Enable Email/Password Authentication

1. Still in **"Sign-in method"** tab
2. Click on **"Email/Password"** provider
3. Toggle **"Enable"** for the first option
4. Click **"Save"**

### Step 4: Set up Firestore Database

1. Click on **"Firestore Database"** in sidebar
2. Click **"Create database"**
3. Choose **"Start in test mode"** (for development)
4. Select your preferred location (closest to users)
5. Click **"Done"**

### Step 5: Get Firebase Configuration

1. Click on **⚙️ Project settings** (gear icon)
2. Scroll down to **"Your apps"** section
3. Click **"Web"** button `</>`
4. Enter app nickname (e.g., "LaunchFlow Web")
5. **Don't check** "Set up Firebase Hosting" for now
6. Click **"Register app"**
7. **Copy the firebaseConfig object** - you'll need this!

### Step 6: Configure Environment Variables

1. In your project, copy `.env.example` to `.env.local`:

   ```bash
   cp .env.example .env.local
   ```

2. Add your Razorpay Key ID to `.env.local`:
   ```bash
   # Firebase Configuration (from Step 5)
   VITE_FIREBASE_API_KEY=AIzaSyC...your_actual_key
   VITE_FIREBASE_AUTH_DOMAIN=launchflow-app.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=launchflow-app
   VITE_FIREBASE_STORAGE_BUCKET=launchflow-app.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
   VITE_FIREBASE_APP_ID=1:123456789:web:abc123def456
   ```

---

## 💳 Razorpay Payment Gateway Setup

### Step 1: Create Razorpay Account

1. Go to [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. **Sign up** for a new account or **log in**
3. Complete account verification and KYC process (may take 1-2 business days)

### Step 2: Get API Keys

1. In Razorpay Dashboard, go to **"Account & Settings" → "API Keys"**
2. Click **"Generate Test Key"** for development
3. You'll see two types of keys:
   - **Key ID** (starts with `rzp_test_`) - safe to expose in frontend
   - **Key Secret** (starts with `rzp_test_`) - keep this secret on backend

### Step 3: Configure Razorpay in Your App

1. Add your **Key ID** to `.env.local`:
   ```bash
   # Razorpay Configuration (Test Mode)
   VITE_RAZORPAY_KEY_ID=rzp_test_your_actual_razorpay_key_id_here
   ```

### Step 4: Set up Webhooks (Optional)

1. In Razorpay Dashboard, go to **"Webhooks"**
2. Click **"Create Webhook"**
3. Add your webhook URL (for production)
4. Select events you want to track (payment.authorized, payment.captured, etc.)

---

## 🔧 Quick Setup Commands

Run these commands in your terminal:

```bash
# 1. Copy environment template
cp .env.example .env.local

# 2. Install dependencies (if not already done)
npm install

# 3. Start development server
npm run dev
```

---

## ✅ Testing Your Setup

### Test Firebase Authentication:

1. Start your dev server: `npm run dev`
2. Go to the Login page
3. Try signing up with email/password
4. Try signing in with Google
5. Check Firebase Console → Authentication → Users to see new users

### Test Razorpay Integration:

1. Go to the Pricing page
2. Click "Upgrade" on Basic or Premium plans
3. Use Razorpay test card: `4111 1111 1111 1111`
4. Use any future expiry date and CVV
5. Check Razorpay Dashboard → Payments for test payments

---

## 🛠️ Test Credentials

### Razorpay Test Cards:

- **Success**: `4111 1111 1111 1111`
- **Declined**: `4000 0000 0000 0002`
- **International Card**: `4012 8888 8888 1881`
- **Expired Card**: `4000 0000 0000 0069`

### Firebase Test:

- Create test accounts with temporary emails
- Use Google account for OAuth testing

---

## 🚨 Important Notes

### Security:

- Never commit `.env.local` to git (it's in .gitignore)
- Never expose secret keys in frontend code
- Use test mode for development, production mode for live app

### Firebase Security Rules:

For production, update Firestore rules in Firebase Console:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### Production Deployment:

1. Switch to production mode in Razorpay
2. Update Firebase security rules
3. Deploy to Vercel/Netlify/Firebase Hosting

---

## 📞 Support

If you run into issues:

1. Check browser console for errors
2. Verify all environment variables are set
3. Ensure Firebase and Razorpay accounts are properly configured
4. Test with different browsers/incognito mode

Happy coding! 🎉
