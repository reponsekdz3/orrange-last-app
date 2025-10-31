import React, { useState, useContext } from 'react';
import { AppContext } from '../App';

export const LoginPage: React.FC<{ isRegister: boolean }> = ({ isRegister }) => {
    const [isRegisterView, setIsRegisterView] = useState(isRegister);
    const { login } = useContext(AppContext);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock login
        const userType = (document.getElementById('email') as HTMLInputElement).value.includes('operator') ? 'operator' : 'passenger';
        login({ id: '1', name: 'John Doe', email: 'john@doe.com', type: userType });
    }

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 flex justify-center">
            <div className="grid md:grid-cols-2 gap-8 items-center max-w-4xl">
                <div className="bg-white p-8 rounded-2xl shadow-lg">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                        {isRegisterView ? 'Create an Account' : 'Welcome Back!'}
                    </h2>
                    <div className="flex justify-center mb-6">
                        <button onClick={() => setIsRegisterView(false)} className={`px-6 py-2 font-semibold rounded-l-full ${!isRegisterView ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700'}`}>
                            Log In
                        </button>
                        <button onClick={() => setIsRegisterView(true)} className={`px-6 py-2 font-semibold rounded-r-full ${isRegisterView ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700'}`}>
                            Register
                        </button>
                    </div>

                    <form className="space-y-4" onSubmit={handleLogin}>
                        {isRegisterView && (
                             <div>
                                <label className="text-sm font-medium text-gray-600">Full Name</label>
                                <input type="text" placeholder="John Doe" className="w-full mt-1 p-3 border border-gray-200 rounded-lg bg-gray-50"/>
                            </div>
                        )}
                        <div>
                            <label className="text-sm font-medium text-gray-600">Email Address</label>
                            <input id="email" type="email" placeholder="you@example.com" className="w-full mt-1 p-3 border border-gray-200 rounded-lg bg-gray-50"/>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-600">Password</label>
                            <input type="password" placeholder="••••••••" className="w-full mt-1 p-3 border border-gray-200 rounded-lg bg-gray-50"/>
                        </div>
                         {!isRegisterView && <a href="#" className="text-sm text-orange-600 hover:underline">Forgot Password?</a>}
                        <button type="submit" className="w-full py-3 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition-colors">
                           {isRegisterView ? 'Create Account' : 'Log In'}
                        </button>
                    </form>
                </div>

                <div className="text-center">
                    <p className="font-semibold text-gray-600 mb-4">OR {isRegisterView ? 'SIGN UP' : 'LOG IN'} WITH</p>
                    <div className="space-y-4">
                        <button className="w-full max-w-xs mx-auto py-3 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50">
                            Continue with Google
                        </button>
                        <button className="w-full max-w-xs mx-auto py-3 bg-black text-white rounded-full flex items-center justify-center shadow-sm hover:bg-gray-800">
                           Continue with Apple
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};