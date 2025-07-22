// Simple Razorpay Test Component for Debugging
import { useState } from 'react';

const RazorpayTest = () => {
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  const testRazorpayIntegration = async () => {
    setStatus('Testing Razorpay integration...');
    setError('');

    try {
      // Check environment variable
      const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;
      console.log('Razorpay Key:', razorpayKey);

      if (!razorpayKey) {
        throw new Error('VITE_RAZORPAY_KEY_ID not found in environment');
      }

      if (razorpayKey === 'rzp_test_your_razorpay_key_id_here') {
        throw new Error('Please replace the placeholder Razorpay key with your actual test key');
      }

      if (!razorpayKey.startsWith('rzp_test_')) {
        throw new Error('Invalid test key format. Should start with "rzp_test_"');
      }

      // Load Razorpay script
      setStatus('Loading Razorpay script...');
      
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      
      const scriptLoaded = await new Promise((resolve) => {
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
      });

      if (!scriptLoaded) {
        throw new Error('Failed to load Razorpay script');
      }

      setStatus('Razorpay script loaded successfully!');

      // Test basic Razorpay initialization
      if (typeof window.Razorpay === 'undefined') {
        throw new Error('Razorpay object not available after script load');
      }

      setStatus('✅ Razorpay integration test passed! Try making a payment now.');

    } catch (err) {
      setError(err.message);
      setStatus('❌ Test failed');
      console.error('Razorpay test error:', err);
    }
  };

  const testPayment = () => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: 100, // ₹1 for testing
      currency: 'INR',
      name: 'LaunchFlow Test',
      description: 'Test Payment',
      handler: function (response) {
        setStatus('✅ Test payment successful! Payment ID: ' + response.razorpay_payment_id);
      },
      prefill: {
        email: 'test@example.com',
        contact: '9999999999'
      },
      theme: {
        color: '#0ea5e9'
      },
      modal: {
        ondismiss: function() {
          setStatus('❌ Test payment cancelled');
        }
      }
    };

    const rzp = new window.Razorpay(options);
    
    rzp.on('payment.failed', function (response) {
      setError('Payment failed: ' + response.error.description);
      setStatus('❌ Test payment failed');
    });
    
    rzp.open();
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '20px', backgroundColor: '#f9f9f9' }}>
      <h3>🧪 Razorpay Integration Test</h3>
      
      <div style={{ marginBottom: '10px' }}>
        <button 
          onClick={testRazorpayIntegration}
          style={{ padding: '10px 20px', marginRight: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}
        >
          Test Integration
        </button>
        
        <button 
          onClick={testPayment}
          style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px' }}
        >
          Test Payment (₹1)
        </button>
      </div>

      {status && <div style={{ padding: '10px', backgroundColor: '#d4edda', border: '1px solid #c3e6cb', borderRadius: '4px', marginBottom: '10px' }}>
        <strong>Status:</strong> {status}
      </div>}

      {error && <div style={{ padding: '10px', backgroundColor: '#f8d7da', border: '1px solid #f5c6cb', borderRadius: '4px' }}>
        <strong>Error:</strong> {error}
      </div>}

      <div style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>
        <p><strong>Instructions:</strong></p>
        <ol>
          <li>Click "Test Integration" first to verify setup</li>
          <li>If successful, click "Test Payment" to open payment modal</li>
          <li>Use test card: 4111 1111 1111 1111, CVV: 123, Expiry: 12/25</li>
          <li>Check browser console for detailed logs</li>
        </ol>
      </div>
    </div>
  );
};

export default RazorpayTest;
