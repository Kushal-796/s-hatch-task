import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ParallaxProvider } from 'react-scroll-parallax';
import { AuthProvider } from './context/AuthContext';
import { PlanProvider } from './context/PlanContext';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PricingPage from './pages/PricingPage';
import Features from './pages/Features';

function App() {
  return (
    <Router>
      <AuthProvider>
        <PlanProvider>
          <ParallaxProvider>
            <div className="min-h-screen bg-deep-night">
              <Header />
              
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/features" element={<Features />} />
                <Route path="/login" element={<Login />} />
                <Route path="/pricing" element={<PricingPage />} />
                <Route 
                  path="/dashboard" 
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } 
                />
              </Routes>
              
              <Footer />
            </div>
          </ParallaxProvider>
        </PlanProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
