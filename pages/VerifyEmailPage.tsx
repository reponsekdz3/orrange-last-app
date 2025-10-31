import React, { useContext } from 'react';
import { AppContext } from '../App';

export const VerifyEmailPage: React.FC = () => {
    const { verifyEmail, setPage } = useContext(AppContext);

    // In a real app, you'd get the email from the registration flow state or a URL token.
    // For this simulation, we'll use a hardcoded email that we know is in the mock DB.
    const handleVerify = () => {
        verifyEmail('passenger@busrwanda.com'); 
    };
    
    const handleResend = () => {
        // In a real app, this would trigger a backend API call.
        alert("Verification email resent!");
    };

    return (
        <div className="min-h-[70vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 text-center">
                <div className="bg-white p-8 rounded-2xl shadow-lg">
                    <div className="mx-auto bg-orange-100 text-orange-600 w-20 h-20 rounded-full flex items-center justify-center mb-6">
                        <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
                        Verify Your Email
                    </h2>
                    <p className="text-gray-600 mb-6">
                        We've sent a verification link to your email address. Please check your inbox and click the link to activate your account.
                    </p>
                    <div className="space-y-4">
                         <button
                            onClick={handleVerify}
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                        >
                           (Simulate) I've Verified My Email
                        </button>
                        <button
                            onClick={handleResend}
                            className="font-medium text-sm text-orange-600 hover:text-orange-500"
                        >
                           Didn't receive an email? Resend
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};