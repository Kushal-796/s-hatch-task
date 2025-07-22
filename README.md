# 🚀 LaunchFlow – Animated SaaS Landing Page with Login, Pricing & Access Control

**LaunchFlow** is a modern, dark-themed SaaS landing page built using **React**.  
It delivers a premium user experience with **smooth animations**, **auth-protected tools**, and **plan-based access limits** – all crafted for startups and indie hackers who want to leave a lasting impression.  

> 🔥 With Framer Motion, Parallax Scroll, and Lottie animations, everything feels alive and fluid.

---

## 🌐 Live Demo

**https://launchflow.app** *(Development Server)*

---

## ✨ Features Implemented

✅ **Responsive Design** - Mobile-first approach with Tailwind CSS  
✅ **Dark Theme** - Beautiful dark UI with custom color palette  
✅ **Smooth Animations** - Framer Motion + scroll parallax effects  
✅ **Firebase Authentication** - Google OAuth + Email/Password  
✅ **Plan-based Access Control** - Free, Basic, Premium tiers  
✅ **Usage Tracking** - Real-time usage monitoring per plan  
✅ **Stripe Integration** - Ready for payment processing (test mode)  
✅ **AI Chat Interface** - Interactive dashboard with usage limits  
✅ **Protected Routes** - Authentication-based navigation  
✅ **Typewriter Animation** - Hero section with dynamic text  

---

## 🌌 Tech Stack

- **React 18** + **Vite**
- **Tailwind CSS** (Custom Dark Theme)
- **Framer Motion** – page/component animations
- **react-scroll-parallax** – scroll-based UI effects
- **typewriter-effect** – hero typewriter animation
- **Firebase v10** – Authentication & Firestore
- **Stripe** – Payment Integration (Test Mode)
- **React Router v6** – Client-side routing
- **Lucide React** – Beautiful icon system

---

## 🎨 Color Palette & Theme

| Element        | Color                      | Usage                         |
|----------------|----------------------------|-------------------------------|
| Background     | `#0F0F1B` (Deep Night)     | Main dark theme               |
| Primary Text   | `#F2F2F2` (White Smoke)    | Body text                     |
| Accent Blue    | `#38BDF8` (Sky Blue 400)   | Call to action, pricing tags  |
| Neon Pink      | `#F472B6` (Pink 400)       | Animated elements, buttons    |
| Button Hover   | `#3B82F6` (Blue 500)       | Transition on hover           |
| Card Glow      | `rgba(56, 189, 248, 0.3)`  | Soft ambient UI glow          |

---

## ⚙️ Setup Instructions

### 1. Clone & Install
```bash
git clone https://github.com/Kushal-796/s-hatch-task.git
cd s-hatch-task
npm install
```

### 2. Environment Configuration
Create `.env.local` with your Firebase and Stripe credentials:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Stripe Configuration (Test Mode)
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_key
```

### 3. Run Development Server
```bash
npm run dev
```

Visit `http://localhost:5173`

---

## 🧪 Test Accounts

| Email                     | Password | Plan    | Usage Limit |
|---------------------------|----------|---------|-------------|
| testuser@demo.com        | 123456   | Free    | 3 uses      |
| basic@demo.com           | 123456   | Basic   | 10 uses     |
| premium@demo.com         | 123456   | Premium | Unlimited   |

---

## 📁 Project Structure

```bash
src/
├── components/         # Reusable UI Components
│   ├── Header.jsx     # Navigation header
│   ├── Hero.jsx       # Hero section with typewriter
│   ├── Features.jsx   # Features grid with parallax
│   ├── Pricing.jsx    # Pricing cards
│   ├── Footer.jsx     # Site footer
│   └── ProtectedRoute.jsx # Auth wrapper
├── pages/             # Route Pages
│   ├── Home.jsx       # Landing page
│   ├── Login.jsx      # Authentication page
│   ├── Dashboard.jsx  # User dashboard
│   └── PricingPage.jsx # Standalone pricing
├── context/           # State Management
│   ├── AuthContext.jsx # Authentication state
│   └── PlanContext.jsx # Plan & usage tracking
├── utils/             # Configuration & Helpers
│   ├── firebase.js    # Firebase setup
│   └── stripe.js      # Stripe configuration
└── App.jsx            # Main app with routing
```

---

## 🧑‍�� Author

**Vakada Kushal**
- GitHub: [@Kushal-796](https://github.com/Kushal-796)

> 💡 *Making interfaces that don't just work — they wow.*

---

## 🪪 License

MIT – Use it. Remix it. Launch it.
