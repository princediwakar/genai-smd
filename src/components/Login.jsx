import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink, signInWithPopup } from '../firebase/config';
import Logo from '../logo.svg';

const Login = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (isSignInWithEmailLink(auth, window.location.href)) {
            let emailForSignIn = window.localStorage.getItem('emailForSignIn');
            if (!emailForSignIn) {
                emailForSignIn = window.prompt('Please provide your email for confirmation');
            }
            signInWithEmailLink(auth, emailForSignIn, window.location.href)
                .then((result) => {
                    window.localStorage.removeItem('emailForSignIn');
                    navigate('/dashboard');
                })
                .catch((error) => {
                    console.error('Error signing in with email link:', error);
                    setError('Error signing in with email link.');
                });
        }
    }, [navigate]);

    const handleGoogleLogin = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            navigate('/dashboard');
        } catch (error) {
            console.error('Google login error:', error);
            setError('Error logging in with Google.');
        }
    };

    const handleEmailLogin = async (e) => {
        e.preventDefault();
        const actionCodeSettings = {
            url: `${window.location.origin}/finishSignUp`,
            handleCodeInApp: true,
        };

        try {
            await sendSignInLinkToEmail(auth, email, actionCodeSettings);
            window.localStorage.setItem('emailForSignIn', email);
            alert('Verification email sent. Please check your inbox.');
        } catch (error) {
            console.error('Email login error:', error);
            if (error.code === 'auth/quota-exceeded') {
                setError('Exceeded daily quota for email sign-in. Please try again later.');
            } else {
                setError('Error sending login link. Please try again.');
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200 dark:from-blue-900 dark:via-purple-800 dark:to-pink-900">
            <div className="max-w-md w-full bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg">
                <div className="text-center mb-8">
                    <img src={Logo} alt="SnapMyDesign Logo" className="mx-auto w-24 h-24" />
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mt-4">Login to SnapMyDesign</h2>
                </div>
                {error && (
                    <div className="mb-4 text-red-500 text-center">
                        {error}
                    </div>
                )}
                <button
                    onClick={handleGoogleLogin}
                    className="w-full flex items-center justify-center py-3 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-full shadow-sm hover:bg-gray-100 dark:hover:bg-gray-600 transition duration-300"
                >
                    <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="Google Logo" className="w-6 h-6 mr-2" />
                    Continue with Google
                </button>
                <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="bg-white dark:bg-gray-800 px-2 text-gray-500 dark:text-gray-300">or</span>
                    </div>
                </div>
                <form onSubmit={handleEmailLogin}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-full border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-300"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 bg-primary text-white font-semibold rounded-full shadow-lg hover:bg-primary-dark transition duration-300"
                    >
                        Send Login Link
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
