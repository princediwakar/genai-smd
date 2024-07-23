// src/components/FinishSignUp.js
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { auth } from '../firebase/config';
import { isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';

const FinishSignUp = () => {
  useEffect(() => {
    const finishSignIn = async () => {
      if (isSignInWithEmailLink(auth, window.location.href)) {
        let email = window.localStorage.getItem('emailForSignIn');
        if (!email) {
          // Redirect to the login page if no email is found in local storage
          window.location.href = '/';
        }
        try {
          await signInWithEmailLink(auth, email, window.location.href);
          window.localStorage.removeItem('emailForSignIn');
          toast.success('Email sign-in successful');
          window.location.href = '/'; // Redirect to the home page or another page after successful sign-in
        } catch (error) {
          console.error("Email sign-in error:", error);
          toast.error('Email sign-in failed');
        }
      }
    };

    finishSignIn();
  }, []);

  return <div>Finishing sign-in...</div>;
};

export default FinishSignUp;
