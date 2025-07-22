# 💳 Razorpay Payment Debugging Guide

## 🚨 Common Payment Failure Causes

### 1. **Invalid or Missing API Key**

**Check**: Your Razorpay key in `.env.local`

```bash
VITE_RAZORPAY_KEY_ID="rzp_test_v9Yt3HAkNFB8sd"
```

**Issues**:

- ❌ Key might be invalid or expired
- ❌ Key might have restrictions
- ❌ Using live key instead of test key

**Fix**:

1. Go to [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. Navigate to Settings → API Keys
3. Regenerate Test Keys
4. Copy the new `Key ID` (starts with `rzp_test_`)
5. Update `.env.local` with new key

### 2. **Account Activation Issues**

**Check**: Razorpay account status

- ❌ Account not activated
- ❌ KYC incomplete
- ❌ Test mode restrictions

**Fix**:

1. Login to Razorpay Dashboard
2. Complete account activation
3. Ensure test mode is enabled
4. Check if payment methods are enabled

### 3. **Browser/Network Issues**

**Check**: Browser console for errors

- ❌ Script loading failures
- ❌ CORS issues
- ❌ Ad blockers blocking Razorpay

**Fix**:

1. Try in incognito/private mode
2. Disable ad blockers
3. Check network connectivity
4. Clear browser cache

### 4. **Integration Issues**

**Check**: Payment flow implementation

- ❌ Missing order creation
- ❌ Invalid amount formatting
- ❌ Incorrect currency

## 🔍 **Debug Steps**

### Step 1: Check Console Logs

Open Browser DevTools → Console tab and look for:

```
Starting payment process for Basic plan (₹99)
Initiating payment for: {plan: "Basic", amount: 99, user: "email@example.com"}
Opening Razorpay with options: {key: "rzp_test_...", amount: 9900}
```

### Step 2: Test Razorpay Key Validity

Create a simple test to verify your key works:

```javascript
// Test in browser console
const key = "rzp_test_v9Yt3HAkNFB8sd";
console.log("Key format correct:", key.startsWith("rzp_test_"));
```

### Step 3: Check Razorpay Account

1. Login to [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. Go to **Settings** → **API Keys**
3. Verify **Test Mode** is active
4. Check **Payment Methods** are enabled

### Step 4: Test Payment Flow

1. Open `/pricing` page
2. Click "Upgrade to Basic"
3. Check console for error messages
4. Note exact error from Razorpay modal

## 🧪 **Test Cards for Success**

Use these cards for testing:

- **Success**: `4111 1111 1111 1111`
- **Success**: `5555 5555 5555 4444`
- **CVV**: Any 3 digits (123)
- **Expiry**: Any future date (12/25)
- **Name**: Any name

## 🚨 **Common Error Messages & Fixes**

### "Razorpay API key not configured"

**Solution**: Add valid test key to `.env.local`

### "Failed to load Razorpay SDK"

**Solution**: Check internet connection, try different network

### "Payment was cancelled by user"

**Solution**: User closed modal, try again

### "Your account is not activated"

**Solution**: Complete Razorpay account verification

### "Key/Account is not enabled for Test Mode"

**Solution**: Enable test mode in Razorpay settings

### "Amount should be at least 100 paise"

**Solution**: Check amount calculation (₹1 = 100 paise)

## 🛠️ **Quick Fixes to Try**

### 1. Regenerate Razorpay Keys

```bash
# In Razorpay Dashboard
Settings → API Keys → Regenerate Test Keys
```

### 2. Update Environment

```bash
# Update .env.local with new key
VITE_RAZORPAY_KEY_ID="rzp_test_YOUR_NEW_KEY"
```

### 3. Clear Cache and Restart

```bash
# Clear browser cache
# Restart development server
npm run dev
```

### 4. Test in Incognito Mode

- Open new incognito/private window
- Navigate to your app
- Try payment again

## 📞 **If Still Failing**

1. **Share exact error message** from browser console
2. **Check Razorpay Dashboard** for failed payment logs
3. **Verify account status** in Razorpay settings
4. **Try different test cards**
5. **Test in different browsers**

## 🎯 **Expected Working Flow**

1. User clicks "Upgrade to Basic" → ✅
2. Console shows "Starting payment process" → ✅
3. Razorpay modal opens → ✅
4. User enters test card details → ✅
5. Payment processes successfully → ✅
6. User plan updates in Firebase → ✅
7. Dashboard shows new plan → ✅

---

**Next Steps**: Check your browser console and share the exact error message for specific debugging! 🔍
