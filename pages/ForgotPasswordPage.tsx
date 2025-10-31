import React, { useContext } from 'react';
import { AppContext } from '../App';

export const ForgotPasswordPage: React.FC = () => {
    const { setPage, showToast } = useContext(AppContext);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const emailInput = (document.getElementById('email') as HTMLInputElement).value;
        if (emailInput) {
            showToast('If an account exists for this email, a reset link has been sent.', 'success');
            setPage('LOGIN');
        } else {
            showToast('Please enter your email address.', 'error');
        }
    };

    return (
        <div className="min-h-[70vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className="bg-white p-8 rounded-2xl shadow-lg">
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-4 text-center">
                        Reset Password
                    </h2>
                    <p className="text-center text-gray-600 mb-6">
                        Enter your email address and we'll send you a link to reset your password.
                    </p>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="relative">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-orange-500 focus:border-orange-500 transition"
                                placeholder="Email Address"
                            />
                        </div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                        >
                            Send Reset Link
                        </button>
                    </form>
                    <div className="text-center mt-6">
                        <button onClick={() => setPage('LOGIN')} className="font-medium text-sm text-orange-600 hover:text-orange-500">
                            Back to Log In
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
