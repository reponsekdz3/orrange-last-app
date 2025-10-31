
import React, { useState } from 'react';
import { Page } from '../types';
import { OnatracomIcon } from '../constants';

type PaymentMethod = 'card' | 'mobile';

export const PaymentPage: React.FC<{ setPage: (page: Page) => void }> = ({ setPage }) => {
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
    
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Secure Payment</h1>
            <div className="w-20 h-1 bg-orange-500 rounded-full mb-8"></div>

            <div className="grid lg:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-2xl shadow-md">
                    <h3 className="font-bold text-xl mb-4 text-gray-800 text-center">Booking Summary</h3>
                    <div className="flex justify-center mb-6">
                        <OnatracomIcon className="w-16 h-16"/>
                    </div>
                    <p className="text-center font-bold text-2xl text-gray-800 mb-6">ONATRACOM</p>
                    <div className="space-y-3 text-lg text-gray-700">
                        <p><span className="font-semibold">ROUTE:</span> Kigali &gt; Rubavu</p>
                        <p><span className="font-semibold">Date:</span> 2</p>
                        <p><span className="font-semibold">Departure:</span> 7:00 AM</p>
                        <p><span className="font-semibold">Selected Seats:</span> 12A, 12B</p>
                        <p><span className="font-semibold">TIME:</span> 7:20 AM - 8:00 AM</p>
                        <div className="border-t my-4"></div>
                        <p className="font-bold text-2xl text-gray-800">Total Price: RWF 17,000</p>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-md">
                    <h3 className="font-bold text-xl mb-4 text-gray-800">Payment Method</h3>
                    <p className="text-gray-500 mb-4">Select a Method</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <button 
                            onClick={() => setPaymentMethod('card')}
                            className={`p-4 border rounded-lg flex flex-col items-center justify-center transition-all ${paymentMethod === 'card' ? 'border-orange-500 ring-2 ring-orange-200' : 'border-gray-200'}`}>
                            <span className="font-semibold text-gray-700">Credit/Debit Card</span>
                        </button>
                        <button 
                            onClick={() => setPaymentMethod('mobile')}
                            className={`p-4 border rounded-lg flex flex-col items-center justify-center transition-all ${paymentMethod === 'mobile' ? 'border-orange-500 ring-2 ring-orange-200' : 'border-gray-200'}`}>
                            <span className="font-semibold text-gray-700">Mobile Money</span>
                        </button>
                    </div>

                    {paymentMethod === 'card' && (
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-gray-600">Card Number</label>
                                <input type="text" placeholder="xxxx xxxx xxxx xxxx" className="w-full mt-1 p-3 border border-gray-200 rounded-lg bg-gray-50 focus:ring-orange-500 focus:border-orange-500"/>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-600">Expiry Date</label>
                                    <input type="text" placeholder="MM/YY" className="w-full mt-1 p-3 border border-gray-200 rounded-lg bg-gray-50 focus:ring-orange-500 focus:border-orange-500"/>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-600">CVV</label>
                                    <input type="text" placeholder="123" className="w-full mt-1 p-3 border border-gray-200 rounded-lg bg-gray-50 focus:ring-orange-500 focus:border-orange-500"/>
                                </div>
                            </div>
                        </div>
                    )}

                    {paymentMethod === 'mobile' && (
                        <div>
                             <label className="text-sm font-medium text-gray-600">Phone Number</label>
                             <input type="tel" placeholder="Enter your mobile money number" className="w-full mt-1 p-3 border border-gray-200 rounded-lg bg-gray-50 focus:ring-orange-500 focus:border-orange-500"/>
                             <p className="text-xs text-gray-500 mt-2">You will receive a prompt on your phone to approve the payment.</p>
                        </div>
                    )}
                    
                    <button 
                        onClick={() => setPage('CONFIRMATION')}
                        className="w-full mt-8 py-4 bg-orange-500 text-white font-bold text-lg rounded-lg hover:bg-orange-600 transition-colors">
                        Confirm & Pay RWF 17,000
                    </button>
                </div>
            </div>
        </div>
    );
};
