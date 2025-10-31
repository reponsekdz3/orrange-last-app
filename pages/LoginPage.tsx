import React, { useState, useContext } from 'react';
import { AppContext } from '../App';

const MailIcon = () => <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" /></svg>;
const LockIcon = () => <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>;
const UserIcon = () => <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;

export const LoginPage: React.FC<{ isRegister: boolean }> = ({ isRegister }) => {
    const [isRegisterView, setIsRegisterView] = useState(isRegister);
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useContext(AppContext);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        const emailInput = (document.getElementById('email') as HTMLInputElement).value;
        const userType = emailInput.includes('operator') ? 'operator' : 'passenger';
        login({ id: '1', name: 'John Doe', email: emailInput, type: userType });
    }

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
                        <button onClick={() => setIsRegisterView(false)} className={`px-6 py-2 font-semibold rounded-l-full transition-colors ${!isRegisterView ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                            Log In
                        </button>
                        <button onClick={() => setIsRegisterView(true)} className={`px-6 py-2 font-semibold rounded-r-full transition-colors ${isRegisterView ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                            Register
                        </button>
                    </div>

                    <form className="space-y-6" onSubmit={handleLogin}>
                        {isRegisterView && (
                             <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3"><UserIcon /></span>
                                <input type="text" placeholder="Full Name" required className="w-full pl-10 p-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-orange-500 focus:border-orange-500 transition"/>
                            </div>
                        )}
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3"><MailIcon /></span>
                            <input id="email" type="email" placeholder="Email Address" required className="w-full pl-10 p-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-orange-500 focus:border-orange-500 transition"/>
                        </div>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3"><LockIcon /></span>
                            <input type={showPassword ? 'text' : 'password'} placeholder="Password" required className="w-full pl-10 pr-10 p-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-orange-500 focus:border-orange-500 transition"/>
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
                                {showPassword ? 'Hide' : 'Show'}
                            </button>
                        </div>
                         
                         <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                {!isRegisterView && <>
                                <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded" />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">Remember me</label>
                                </>}
                            </div>
                            {!isRegisterView && <a href="#" className="text-sm font-medium text-orange-600 hover:text-orange-500">Forgot Password?</a>}
                        </div>

                        <button type="submit" className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-transform transform hover:scale-105">
                           {isRegisterView ? 'Create Account' : 'Log In'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};