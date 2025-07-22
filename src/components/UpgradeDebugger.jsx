import { useState } from 'react';
import { usePlan } from '../context/PlanContext';
import { useAuth } from '../context/AuthContext';

const UpgradeDebugger = () => {
  const { upgradePlan, upgrading } = usePlan();
  const { isAuthenticated, currentUser, userDoc } = useAuth();
  const [testResult, setTestResult] = useState('');

  const testBasicUpgrade = async () => {
    setTestResult('🔄 Testing Basic Plan upgrade...');
    
    try {
      console.log('=== UPGRADE DEBUG START ===');
      console.log('User authenticated:', isAuthenticated);
      console.log('Current user:', currentUser?.email);
      console.log('User document:', userDoc);
      console.log('Environment variables:');
      console.log('- RAZORPAY_KEY_ID:', import.meta.env.VITE_RAZORPAY_KEY_ID);
      
      if (!isAuthenticated) {
        setTestResult('❌ User not authenticated');
        return;
      }

      setTestResult('🔄 Calling upgradePlan("basic")...');
      const result = await upgradePlan('basic');
      
      console.log('Upgrade result:', result);
      setTestResult('✅ Upgrade successful! Check console for details.');
      
    } catch (error) {
      console.error('Upgrade failed:', error);
      setTestResult(`❌ Upgrade failed: ${error.message}`);
    }
  };

  return (
    <div style={{ 
      padding: '20px', 
      margin: '20px', 
      border: '2px solid #f0f0f0', 
      borderRadius: '8px',
      backgroundColor: '#f9f9f9'
    }}>
      <h3>🐛 Upgrade Debugger</h3>
      
      <div style={{ marginBottom: '15px' }}>
        <p><strong>Auth Status:</strong> {isAuthenticated ? '✅ Logged in' : '❌ Not logged in'}</p>
        <p><strong>User Email:</strong> {currentUser?.email || 'None'}</p>
        <p><strong>Current Plan:</strong> {userDoc?.plan || 'Loading...'}</p>
        <p><strong>Upgrading:</strong> {upgrading ? '🔄 Yes' : '⏸️ No'}</p>
      </div>

      <button 
        onClick={testBasicUpgrade}
        disabled={upgrading}
        style={{
          padding: '10px 20px',
          backgroundColor: upgrading ? '#ccc' : '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: upgrading ? 'not-allowed' : 'pointer',
          marginRight: '10px'
        }}
      >
        {upgrading ? 'Processing...' : 'Test Basic Upgrade'}
      </button>

      {testResult && (
        <div style={{ 
          marginTop: '15px', 
          padding: '10px', 
          backgroundColor: testResult.includes('❌') ? '#ffe6e6' : '#e6ffe6',
          border: '1px solid #ccc',
          borderRadius: '4px'
        }}>
          <strong>Result:</strong> {testResult}
        </div>
      )}

      <div style={{ marginTop: '15px', fontSize: '12px', color: '#666' }}>
        <p><strong>Instructions:</strong></p>
        <ol>
          <li>Make sure you're logged in</li>
          <li>Click "Test Basic Upgrade"</li>
          <li>Check browser console for detailed logs</li>
          <li>Payment modal should open with test card details</li>
        </ol>
      </div>
    </div>
  );
};

export default UpgradeDebugger;
