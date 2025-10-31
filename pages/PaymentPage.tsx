import React, { useState, useContext } from 'react';
import { Page } from '../types';
import { AppContext } from '../App';

type PaymentMethod = 'card' | 'mobile' | 'wallet';

export const PaymentPage: React.FC = () => {
    const { setPage, booking, user, updateWalletBalance, showToast } = useContext(AppContext);
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');

    if (!booking.route || booking.seats.length === 0) {
        return <div className="p-8 text-center">Invalid booking details. Please start again.</div>;
    }
    
    if (!user) {
        return <div className="p-8 text-center">Please log in to proceed with payment.</div>;
    }

    const handlePayment = () => {
        if (paymentMethod === 'wallet') {
            if (user.walletBalance < booking.totalPrice) {
                showToast('Insufficient wallet balance.', 'error');
                return;
            }
            updateWalletBalance(-booking.totalPrice);
        }
        setPage('CONFIRMATION');
    };
    
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Secure Payment</h1>
            <div className="w-20 h-1 bg-orange-500 rounded-full mb-8"></div>

            <div className="grid lg:grid-cols-2 gap-8 items-start">
                <div className="bg-white p-8 rounded-2xl shadow-md">
                    <h3 className="font-bold text-xl mb-4 text-gray-800 text-center">Booking Summary</h3>
                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16">{booking.route.operator.logo}</div>
                    </div>
                    <p className="text-center font-bold text-2xl text-gray-800 mb-6">{booking.route.operator.name}</p>
                    <div className="space-y-3 text-lg text-gray-700">
                        <p><span className="font-semibold">PASSENGER:</span> {user?.name || 'Guest'}</p>
                        <p><span className="font-semibold">ROUTE:</span> {booking.route.from} &gt; {booking.route.to}</p>
                        <p><span className="font-semibold">Date:</span> {new Date().toLocaleDateString()}</p>
                        <p><span className="font-semibold">Departure:</span> {booking.route.departureTime}</p>
                        <p><span className="font-semibold">Selected Seats:</span> {booking.seats.join(', ')}</p>
                        <div className="border-t my-4"></div>
                        <p className="font-bold text-2xl text-gray-800">Total Price: RWF {booking.totalPrice.toLocaleString()}</p>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-md">
                    <h3 className="font-bold text-xl mb-4 text-gray-800">Payment Method</h3>
                    <p className="text-gray-500 mb-4">Select a Method</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                        <button 
                            onClick={() => setPaymentMethod('card')}
                            className={`p-4 border rounded-lg flex items-center justify-center transition-all ${paymentMethod === 'card' ? 'border-orange-500 ring-2 ring-orange-200' : 'border-gray-200'}`}>
                            <span className="font-semibold text-sm text-gray-700">Card</span>
                        </button>
                        <button 
                            onClick={() => setPaymentMethod('mobile')}
                            className={`p-4 border rounded-lg flex items-center justify-center transition-all ${paymentMethod === 'mobile' ? 'border-orange-500 ring-2 ring-orange-200' : 'border-gray-200'}`}>
                            <span className="font-semibold text-sm text-gray-700">Mobile Money</span>
                        </button>
                         <button 
                            onClick={() => setPaymentMethod('wallet')}
                            className={`p-4 border rounded-lg flex items-center justify-center transition-all ${paymentMethod === 'wallet' ? 'border-orange-500 ring-2 ring-orange-200' : 'border-gray-200'}`}>
                            <span className="font-semibold text-sm text-gray-700">Wallet</span>
                        </button>
                    </div>

                    {paymentMethod === 'card' && (
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-gray-600">Cardholder Name</label>
                                <input type="text" defaultValue={user?.name} className="w-full mt-1 p-3 border border-gray-200 rounded-lg bg-gray-50 focus:ring-orange-500 focus:border-orange-500"/>
                            </div>
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

                    {paymentMethod === 'wallet' && (
                        <div className="bg-orange-50 p-4 rounded-lg text-center">
                            <p className="text-sm font-semibold text-orange-700">AVAILABLE BALANCE</p>
                            <p className="text-2xl font-bold text-orange-600 mb-2">RWF {user.walletBalance.toLocaleString()}</p>
                             {user.walletBalance < booking.totalPrice && (
                                 <div className="text-red-600 text-sm">
                                     <p>Insufficient balance.</p>
                                     <button onClick={() => setPage('ACCOUNT_SETTINGS')} className="font-bold underline">Deposit Funds</button>
                                 </div>
                             )}
                        </div>
                    )}
                    
                    <button 
                        onClick={handlePayment}
                        disabled={paymentMethod === 'wallet' && user.walletBalance < booking.totalPrice}
                        className="w-full mt-8 py-4 bg-orange-500 text-white font-bold text-lg rounded-lg hover:bg-orange-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed">
                        Confirm & Pay RWF {booking.totalPrice.toLocaleString()}
                    </button>
                </div>
            </div>
        </div>
    );
};