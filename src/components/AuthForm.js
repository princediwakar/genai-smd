import React, { useState } from 'react';
import { auth, googleProvider, signInWithPopup, sendSignInLinkToEmail } from '../firebase/config';
import { useNavigate } from 'react-router-dom';

const AuthForm = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      alert('Google login successful');
      navigate('/dashboard');
    } catch (error) {
      console.error("Google login error:", error.message);
      alert(`Google login failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const actionCodeSettings = {
      url: 'http://localhost:3000/dashboard', // Change this to your actual URL
      handleCodeInApp: true,
    };
    try {
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem('emailForSignIn', email);
      alert('Email link sent! Check your inbox.');
    } catch (error) {
      console.error("Email login error:", error.message);
      alert(`Email login failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 w-full max-w-md">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <form className="space-y-4" onSubmit={handleEmailLogin}>
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full bg-blue-500 text-white p-3 rounded-lg flex items-center justify-center"
            disabled={loading}
          >
            <img src="/google_icon.png" alt="Google" className="w-5 h-5 mr-2" />
            {loading ? 'Processing...' : 'Continue with Google'}
          </button>
          <div className="text-gray-400 text-sm text-center">OR</div>
          <input
            type="email"
            placeholder="name@yourcompany.com"
            className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" className="w-full bg-orange-500 text-white p-3 rounded-lg" disabled={loading}>
            {loading ? 'Processing...' : 'Continue with email'}
          </button>
        </form>
        <p className="text-xs text-gray-400 mt-4 text-center">
          By continuing, you agree to Anthropic's <a href="#" className="text-blue-500">Consumer Terms</a> and <a href="#" className="text-blue-500">Usage Policy</a>, and acknowledge their <a href="#" className="text-blue-500">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
