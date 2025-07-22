#!/bin/bash

# LaunchFlow Quick Setup Script
# This script helps you set up Firebase and Razorpay for your LaunchFlow app

echo "🚀 LaunchFlow Setup Script"
echo "=========================="
echo ""

# Check if .env.local exists
if [ -f ".env.local" ]; then
    echo "✅ .env.local file already exists"
else
    echo "📝 Creating .env.local from template..."
    cp .env.example .env.local
    echo "✅ Created .env.local file"
fi

echo ""
echo "🔧 Next Steps:"
echo "1. Follow the setup guide in SETUP_GUIDE.md"
echo "2. Fill in your Firebase config in .env.local"
echo "3. Add your Razorpay Key ID to .env.local"
echo "4. Run 'npm run dev' to start development server"
echo ""

echo "📖 Quick Links:"
echo "• Firebase Console: https://console.firebase.google.com/"
echo "• Razorpay Dashboard: https://dashboard.razorpay.com/"
echo "• Setup Guide: ./SETUP_GUIDE.md"
echo ""

echo "🎉 Happy coding!"
