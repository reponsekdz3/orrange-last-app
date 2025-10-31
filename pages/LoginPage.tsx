import React, { useState, useContext } from 'react';
import { AppContext } from '../App';

const MailIcon = () => <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" /></svg>;
const LockIcon = () => <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>;
const UserIcon = () => <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;

export const LoginPage: React.FC<{ isRegister: boolean }> = ({ isRegister }) => {
    const [isRegisterView, setIsRegisterView] = useState(isRegister);
    const [showPassword, setShowPassword] = useState(false);
    const { login, register, setPage, showToast } = useContext(AppContext);
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isRegisterView) {
            if (password !== confirmPassword) {
                showToast("Passwords do not match.", 'error');
                return;
            }
            if(password.length < 6) {
                showToast("Password must be at least 6 characters.", 'error');
                return;
            }
            register({ name, email, password });
        } else {
            login({ email, password });
        }
    };

    const handleGoogleSignIn = () => {
        // This is a simulation. In a real app, this would trigger the Google OAuth flow.
        showToast("Signing in with Google...", 'info');
        // Simulate login after a short delay
        setTimeout(() => login({ email: 'passenger@busrwanda.com', password: 'password123' }), 1000);
    };

    return (
        <div className="min-h-[70vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className="bg-white p-8 rounded-2xl shadow-lg">
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-4 text-center">
                        {isRegisterView ? 'Create an Account' : 'Welcome Back'}
                    </h2>
                    <p className="text-center text-gray-600 mb-6">
                        {isRegisterView ? 'Join us to start your journey.' : 'Log in to continue your adventure.'}
                    </p>
                    
                     <div className="flex justify-center mb-6">
                        <button onClick={() => { setIsRegisterView(false); setPage('LOGIN'); }} className={`px-6 py-2 font-semibold rounded-l-full transition-colors ${!isRegisterView ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                            Log In
                        </button>
                        <button onClick={() => { setIsRegisterView(true); setPage('REGISTER'); }} className={`px-6 py-2 font-semibold rounded-r-full transition-colors ${isRegisterView ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                            Register
                        </button>
                    </div>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        {isRegisterView && (
                             <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3"><UserIcon /></span>
                                <input type="text" placeholder="Full Name" required value={name} onChange={e => setName(e.target.value)} className="w-full pl-10 p-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-orange-500 focus:border-orange-500 transition"/>
                            </div>
                        )}
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3"><MailIcon /></span>
                            <input id="email" type="email" placeholder="Email Address" required value={email} onChange={e => setEmail(e.target.value)} className="w-full pl-10 p-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-orange-500 focus:border-orange-500 transition"/>
                        </div>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3"><LockIcon /></span>
                            <input type={showPassword ? 'text' : 'password'} placeholder="Password" required value={password} onChange={e => setPassword(e.target.value)} className="w-full pl-10 pr-10 p-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-orange-500 focus:border-orange-500 transition"/>
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 text-sm font-semibold">
                                {showPassword ? 'Hide' : 'Show'}
                            </button>
                        </div>

                         {isRegisterView && (
                             <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3"><LockIcon /></span>
                                <input type="password" placeholder="Confirm Password" required value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="w-full pl-10 p-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-orange-500 focus:border-orange-500 transition"/>
                            </div>
                        )}
                         
                         <div className="flex items-center justify-between text-sm">
                            {!isRegisterView && (
                                <>
                                    <div className="flex items-center">
                                        <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded" />
                                        <label htmlFor="remember-me" className="ml-2 block text-gray-900">Remember me</label>
                                    </div>
                                    <button type="button" onClick={() => setPage('FORGOT_PASSWORD')} className="font-medium text-orange-600 hover:text-orange-500">Forgot Password?</button>
                                </>
                            )}
                        </div>

                        <button type="submit" className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-transform transform hover:scale-105">
                           {isRegisterView ? 'Create Account' : 'Log In'}
                        </button>
                    </form>
                    
                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">Or continue with</span>
                            </div>
                        </div>
                        <div className="mt-6">
                            <button onClick={handleGoogleSignIn} className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                <span className="sr-only">Sign in with Google</span>
                                <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 0C4.477 0 0 4.477 0 10c0 4.418 2.865 8.166 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.578.688.482A10.001 10.001 0 0020 10c0-5.523-4.477-10-10-10z" clipRule="evenodd" /></svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};