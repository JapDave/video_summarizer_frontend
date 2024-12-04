import React, { useEffect } from 'react';
import LoginPage from './features/login/LoginPage';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useDispatch, useSelector } from 'react-redux';
import SignupPage from './features/signUp/SignupPage';
import './app.css';
import { ToastContainer } from 'react-toastify';
import HomePage from './features/homePage';
import ContactUsPage from './features/contactUs/ContactUs';
import Notification from './components/notification/Notification';
import Profile from './features/profile/Profile';
import SummarizeContent from './components/summarizeContent/SummarizeContent';
import TermsAndConditions from './features/termsPolicy/TermsAndConditions';
import Privacy from './features/privacyPolicy/Privacy';
import AdminRoutes from './routes/AdminRoutes';
import { setUserData } from './redux/slices/adminSlice';
import { API_BASE_URL } from './utils/ENVImport';
import PlayerComponent from './components/summarizeContent/PlayerComponent';
import Subscription from './features/subscription/Subscriptions';
import PricingPage from './features/pricing/PricingPage';

const App = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem('accessToken');
  const isAdmin = useSelector((state) => state.admin.isAdmin);
  const stripeKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
  const stripePromise = loadStripe(stripeKey);

  const getLoggedInUser = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/users/me`, {
        method: 'GET',
        headers: {
          Token: `${token}`,
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': '69420',
        },
      });

      if (response.ok) {
        const data = await response.json();
        dispatch(setUserData(data));
      } else if (response.status === 401) {
        console.warn('Unauthorized access. Redirecting to login.');
        localStorage.clear();
        location.reload();
      } else if (response.status === 404) {
        console.warn('User not found.');
      } else {
        console.warn('Failed to fetch user data. Status:', response.status);
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const handlePaymentSuccess = (paymentMethod) => {
    console.log('Payment successful:', paymentMethod);
    alert('Payment successful!');
  };

  useEffect(() => {
    if (token) {
      getLoggedInUser();
    }
  }, [token]);

  return (
    <Elements stripe={stripePromise}>
      <React.Fragment>
        <Notification />
        <Router>
          <Routes>
            {/* <Route path="/admin/*" element={<AdminRoutes />} /> */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/contactus" element={<ContactUsPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/subscription" element={<Subscription />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/video-summarize" element={<SummarizeContent />} />
            <Route
              path="/video-summarize-player"
              element={<PlayerComponent />}
            />
            <Route path="/terms-conditions" element={<TermsAndConditions />} />
            <Route path="/privacy" element={<Privacy />} />
            {isAdmin ? (
              <Route path="/admin/*" element={<AdminRoutes />} />
            ) : (
              <Route path="/admin/*" element={<Navigate to="/" />} />
            )}
            <Route path="*" element={<HomePage />} />
          </Routes>
        </Router>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </React.Fragment>
    </Elements>
  );
};

export default App;
