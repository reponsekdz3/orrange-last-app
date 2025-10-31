import React, { useState, useContext } from 'react';
import { Page } from '../types';
import { AppContext } from '../App';
import { PinInputModal } from '../components/PinInputModal';

type PaymentMethod = 'card' | 'wallet';

const PaymentMethodCard: React.FC<{
    method: PaymentMethod;
    label: string;
    icon: React.ReactNode;
    selected: boolean;
    onClick: () => void;
}> = ({ method, label, icon, selected, onClick }) => (
    <div
        onClick={onClick}
        className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-105 ${
            selected ? 'border-orange-500 bg-orange-50 shadow-lg' : 'border-gray-200 bg-white hover:border-orange-300'
        }`}
    >
        <div className="flex items-center justify-between">
            <div className="flex items-center">
                <div className="text-gray-600 mr-4">{icon}</div>
                <span className="font-bold text-gray-800">{label}</span>
            </div>
            {selected && (
                <div className="w-6 h-6 flex items-center justify-center bg-orange-500 rounded-full text-white">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                </div>
            )}
        </div>
    </div>
);

export const PaymentPage: React.FC = () => {
    const { setPage, booking, user, updateWalletBalance, showToast } = useContext(AppContext);
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
    const [showPinModal, setShowPinModal] = useState(false);

    if (!booking.route || booking.seats.length === 0) {
        return <div className="p-8 text-center">Invalid booking details. Please start again.</div>;
    }
    
    if (!user) {
        return <div className="p-8 text-center">Please log in to proceed with payment.</div>;
    }

    const processWalletPayment = () => {
        if (user.walletBalance < booking.totalPrice) {
            showToast('Insufficient wallet balance.', 'error');
            return;
        }
        updateWalletBalance(-booking.totalPrice);
        setPage('CONFIRMATION');
    };

    const handleConfirmAndPay = () => {
        if (paymentMethod === 'wallet') {
            if (!user.walletPin) {
                showToast('Please set up a wallet PIN in your account settings.', 'error');
                setPage('ACCOUNT_SETTINGS');
                return;
            }
            setShowPinModal(true);
        } else {
            // In a real app, card payment processing would happen here.
            showToast('Processing card payment...', 'info');
            setTimeout(() => {
                setPage('CONFIRMATION');
            }, 1500);
        }
    };
    
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {showPinModal && (
                <PinInputModal
                    title="Enter Wallet PIN to Pay"
                    onSuccess={() => {
                        setShowPinModal(false);
                        processWalletPayment();
                    }}
                    onClose={() => setShowPinModal(false)}
                />
            )}
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
                    <p className="text-gray-500 mb-6">Select a secure payment option.</p>
                    
                    <div className="space-y-4 mb-6">
                        <PaymentMethodCard
                            method="card"
                            label="Credit/Debit Card"
                            icon={<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>}
                            selected={paymentMethod === 'card'}
                            onClick={() => setPaymentMethod('card')}
                        />
                        <PaymentMethodCard
                            method="wallet"
                            label="Pay with Wallet"
                            icon={<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
                            selected={paymentMethod === 'wallet'}
                            onClick={() => setPaymentMethod('wallet')}
                        />
                    </div>

                    {paymentMethod === 'card' && (
                        <div className="space-y-4 animate-fade-in">
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

                    {paymentMethod === 'wallet' && (
                        <div className="bg-orange-50 p-4 rounded-lg text-center animate-fade-in">
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
                        onClick={handleConfirmAndPay}
                        disabled={paymentMethod === 'wallet' && user.walletBalance < booking.totalPrice}
                        className="w-full mt-8 py-4 bg-orange-500 text-white font-bold text-lg rounded-lg hover:bg-orange-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed">
                        Confirm & Pay RWF {booking.totalPrice.toLocaleString()}
                    </button>
                </div>
            </div>
            <style>{`
                @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
                .animate-fade-in { animation: fade-in 0.5s ease-out; }
            `}</style>
        </div>
    );
};