import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, signInWithEmailLink } from '../firebase/config';

const FinishSignUp = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const email = window.localStorage.getItem('emailForSignIn');
    if (!email) {
      navigate('/login');
      return;
    }

    if (signInWithEmailLink(auth, window.location.href)) {
      auth.signInWithEmailLink(email, window.location.href)
        .then((result) => {
          console.log('Successfully signed in:', result.user);
          window.localStorage.removeItem('emailForSignIn');
          navigate('/');
        })
        .catch((error) => {
          console.error('Error signing in with email link:', error);
        });
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">Finishing Sign Up</h2>
        <p className="text-center text-gray-600 dark:text-gray-300">Please wait while we complete your sign up...</p>
      </div>
    </div>
  );
};

export default FinishSignUp;
