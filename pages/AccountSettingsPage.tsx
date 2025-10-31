import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../App';
import { USER_TICKETS, OPERATORS } from '../constants';
import { PinInputModal } from '../components/PinInputModal';

type SettingsPage = 'DASHBOARD' | 'PERSONAL' | 'PASSWORD' | 'NOTIFICATIONS' | 'PAYMENT' | 'WALLET' | 'SECURITY' | 'PREFERENCES';
type TwoFactorStep = 'START' | 'SCAN' | 'VERIFY' | 'RECOVERY';

const SettingsNavItem: React.FC<{label: string; page: SettingsPage; activePage: SettingsPage; setPage: (page: SettingsPage) => void;}> = 
({ label, page, activePage, setPage }) => (
    <button onClick={() => setPage(page)} 
    className={`w-full text-left px-4 py-2 rounded-lg font-semibold transition-colors ${
        activePage === page ? 'bg-orange-100 text-orange-700' : 'text-gray-600 hover:bg-gray-100'
    }`}>
        {label}
    </button>
);

const Toggle: React.FC<{label: string; enabled: boolean; setEnabled: (enabled: boolean) => void}> = ({label, enabled, setEnabled}) => (
    <div className="flex items-center justify-between py-3">
        <span className="text-gray-700 font-medium">{label}</span>
        <button onClick={() => setEnabled(!enabled)} className={`w-12 h-6 rounded-full flex items-center transition-colors ${enabled ? 'bg-orange-500' : 'bg-gray-300'}`}>
            <span className={`inline-block w-5 h-5 bg-white rounded-full transform transition-transform ${enabled ? 'translate-x-6' : 'translate-x-1'}`}></span>
        </button>
    </div>
);

type DepositStep = 'AMOUNT' | 'CONFIRM' | 'VERIFYING' | 'SUCCESS';

const DepositModal: React.FC<{onClose: () => void; onPinRequired: (onSuccess: () => void) => void;}> = ({onClose, onPinRequired}) => {
    const { updateWalletBalance, showToast } = useContext(AppContext);
    const [amount, setAmount] = useState('');
    const [step, setStep] = useState<DepositStep>('AMOUNT');

    const processDeposit = () => {
        setStep('VERIFYING');
        setTimeout(() => {
            setStep('SUCCESS');
            updateWalletBalance(parseFloat(amount));
            setTimeout(() => {
                showToast(`RWF ${parseFloat(amount).toLocaleString()} successfully added.`, 'success');
                onClose();
            }, 1500);
        }, 2000);
    }
    
    const handleConfirm = () => {
        onPinRequired(processDeposit);
    };
    
    const handleAmountSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const depositAmount = parseFloat(amount);
        if (depositAmount > 0) {
            setStep('CONFIRM');
        } else {
            showToast('Please enter a valid amount.', 'error');
        }
    };

    const renderStepContent = () => {
        switch (step) {
            case 'AMOUNT':
                return (
                    <form onSubmit={handleAmountSubmit} className="space-y-4">
                        <h3 className="font-bold text-xl mb-4 text-gray-800">Deposit Funds</h3>
                        <p className="text-gray-500 mb-6">Enter the amount you wish to deposit from your MTN Mobile Money account.</p>
                        <div>
                            <label className="text-sm font-medium text-gray-600">Amount (RWF)</label>
                            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="e.g., 10000" className="w-full mt-1 p-3 border border-gray-200 rounded-lg bg-gray-50 focus:ring-orange-500 focus:border-orange-500"/>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-600">Phone Number</label>
                            <input type="tel" defaultValue="0788..." className="w-full mt-1 p-3 border border-gray-200 rounded-lg bg-gray-50 focus:ring-orange-500 focus:border-orange-500"/>
                        </div>
                        <div className="flex justify-end space-x-3 pt-4">
                            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300">Cancel</button>
                            <button type="submit" className="px-4 py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600">Proceed</button>
                        </div>
                    </form>
                );
            case 'CONFIRM':
                return (
                    <div className="text-center">
                        <h3 className="font-bold text-xl mb-4 text-gray-800">Confirm Transaction</h3>
                        <p className="text-gray-600 mb-6">A payment request of <span className="font-bold">RWF {parseFloat(amount).toLocaleString()}</span> has been sent to your phone. Please approve the transaction by entering your MTN Mobile Money PIN.</p>
                        <button onClick={handleConfirm} className="w-full px-4 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600">I have approved the payment</button>
                         <button onClick={() => setStep('AMOUNT')} className="mt-2 text-sm text-gray-500 hover:underline">Go Back</button>
                    </div>
                );
            case 'VERIFYING':
                return (
                    <div className="text-center py-8">
                         <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                         <h3 className="font-bold text-xl text-gray-800">Verifying Payment...</h3>
                    </div>
                );
            case 'SUCCESS':
                 return (
                    <div className="text-center py-8">
                         <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                         </div>
                         <h3 className="font-bold text-xl text-gray-800">Deposit Successful!</h3>
                    </div>
                );
        }
    };
    
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-8 rounded-2xl shadow-lg max-w-sm w-full transition-all duration-300">
                {renderStepContent()}
            </div>
        </div>
    );
};

const PasswordStrengthMeter: React.FC<{password: string}> = ({ password }) => {
    const checkStrength = () => {
        let score = 0;
        if (password.length >= 8) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[a-z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;
        return score;
    };

    const strength = checkStrength();
    const strengthLabels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
    const strengthColors = ['bg-red-500', 'bg-orange-400', 'bg-yellow-400', 'bg-sky-400', 'bg-green-500'];

    return (
        <div className="mt-2">
            <div className="flex h-1.5 rounded-full overflow-hidden bg-gray-200">
                <div className={`transition-all duration-300 ${strength > 0 ? strengthColors[strength -1] : ''}`} style={{ width: `${(strength / 5) * 100}%` }}></div>
            </div>
            <p className={`text-xs text-right font-semibold mt-1 transition-opacity duration-300 ${password.length > 0 ? 'opacity-100' : 'opacity-0'}`}>
                {strengthLabels[strength -1] || ''}
            </p>
        </div>
    );
};

const StatCard: React.FC<{ title: string; value: string | number; icon: React.ReactNode; }> = ({ title, value, icon }) => (
    <div className="bg-white p-4 rounded-xl shadow-sm flex items-center">
        <div className="w-12 h-12 flex items-center justify-center bg-orange-100 text-orange-600 rounded-lg mr-4">
            {icon}
        </div>
        <div>
            <p className="text-sm font-semibold text-gray-500">{title}</p>
            <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
    </div>
);


const TwoFactorAuthSetup: React.FC = () => {
    const { user, showToast, setTwoFactorEnabled } = useContext(AppContext);
    const [step, setStep] = useState<TwoFactorStep>('START');
    const [code, setCode] = useState('');

    const handleVerify = () => {
        // Mock verification
        if (code === '123456') {
            setTwoFactorEnabled(true);
            setStep('RECOVERY');
            showToast('2FA enabled successfully!', 'success');
        } else {
            showToast('Invalid code. Please try again.', 'error');
        }
    };
    
    if (!user) return null;

    if (user.twoFactorEnabled && step !== 'RECOVERY') {
        return (
            <div>
                 <div className="bg-green-50 p-4 rounded-lg flex items-center">
                    <svg className="w-6 h-6 text-green-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <p className="text-green-800 font-semibold">Two-Factor Authentication is currently enabled.</p>
                </div>
                 <button onClick={() => setTwoFactorEnabled(false)} className="mt-4 px-4 py-2 bg-red-500 text-white font-semibold rounded-lg text-sm hover:bg-red-600">
                    Disable 2FA
                </button>
            </div>
        )
    }

    switch (step) {
        case 'START':
            return (
                <button onClick={() => setStep('SCAN')} className="px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-black">
                    Enable Two-Factor Authentication
                </button>
            );
        case 'SCAN':
            return (
                <div className="space-y-4">
                    <p className="font-semibold">1. Scan this QR code with your authenticator app.</p>
                    <div className="p-4 bg-white border rounded-lg inline-block">
                         <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=otpauth://totp/BusRwanda:passenger@busrwanda.com?secret=JBSWY3DPEHPK3PXP&issuer=BusRwanda" alt="Mock 2FA QR Code"/>
                    </div>
                    <p className="text-sm text-gray-500">Use an app like Google Authenticator, Authy, or 1Password.</p>
                     <button onClick={() => setStep('VERIFY')} className="px-4 py-2 bg-orange-500 text-white font-semibold rounded-lg text-sm hover:bg-orange-600">
                        Next
                    </button>
                </div>
            );
        case 'VERIFY':
            return (
                 <div className="space-y-4 max-w-xs">
                    <p className="font-semibold">2. Enter the 6-digit code from your app.</p>
                    <input type="text" value={code} onChange={e => setCode(e.target.value)} placeholder="123456" maxLength={6} className="w-full mt-1 p-3 border border-gray-200 rounded-lg bg-gray-50"/>
                    <button onClick={handleVerify} className="px-4 py-2 bg-orange-500 text-white font-semibold rounded-lg text-sm hover:bg-orange-600">
                        Verify & Enable
                    </button>
                </div>
            )
        case 'RECOVERY':
             return (
                 <div className="space-y-4">
                    <p className="font-bold text-lg text-green-700">2FA Enabled!</p>
                    <p className="text-gray-600">Save these recovery codes in a safe place. They can be used to access your account if you lose your device.</p>
                    <div className="bg-gray-100 p-4 rounded-lg font-mono grid grid-cols-2 gap-2 text-gray-700">
                        <span>a1b2-c3d4</span>
                        <span>e5f6-g7h8</span>
                        <span>i9j0-k1l2</span>
                        <span>m3n4-o5p6</span>
                        <span>q7r8-s9t0</span>
                        <span>u1v2-w3x4</span>
                    </div>
                    <button onClick={() => setStep('START')} className="px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg text-sm hover:bg-gray-300">
                        Done
                    </button>
                </div>
             )
    }
}


export const AccountSettingsPage: React.FC = () => {
    const { user, setPage, showToast, setWalletPin } = useContext(AppContext);
    const [activePage, setActivePage] = useState<SettingsPage>('DASHBOARD');
    const [showDepositModal, setShowDepositModal] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [pinModalState, setPinModalState] = useState<{ visible: boolean; onSuccess?: () => void; title: string; }>({ visible: false, title: '' });

    if (!user) {
        return <div className="p-8 text-center">Please log in to view your account settings.</div>;
    }

    const [notifications, setNotifications] = useState({ promotions: true, reminders: true, confirmations: true });

    const handlePinRequired = (onSuccess: () => void) => {
        setShowDepositModal(false);
        setPinModalState({ visible: true, onSuccess, title: 'Enter Wallet PIN to Confirm Deposit' });
    };

    const handleSetPin = () => {
        // In a real app, this would be a multi-step modal (enter new, confirm new)
        const newPin = prompt("Enter a new 5-digit PIN:");
        if (newPin && /^\d{5}$/.test(newPin)) {
            setWalletPin(newPin);
            showToast('PIN updated successfully!', 'success');
        } else if (newPin) {
            showToast('Invalid PIN. Must be 5 digits.', 'error');
        }
    }

    const renderContent = () => {
        switch(activePage) {
            case 'DASHBOARD':
                const upcomingTripsCount = USER_TICKETS.filter(t => t.status === 'ACTIVE').length;
                const nextTrip = USER_TICKETS.find(t => t.status === 'ACTIVE');
                return (
                    <div>
                        <h3 className="font-bold text-xl mb-6 text-gray-800">Welcome back, {user.name}!</h3>
                        <div className="grid md:grid-cols-3 gap-4 mb-6">
                            <StatCard title="Upcoming Trips" value={upcomingTripsCount} icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>} />
                            <StatCard title="Total Trips" value={USER_TICKETS.length} icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>} />
                            <StatCard title="Wallet Balance" value={`RWF ${user.walletBalance.toLocaleString()}`} icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>} />
                        </div>

                        {nextTrip && (
                            <div className="bg-orange-50 p-4 rounded-lg mb-6">
                                <h4 className="font-bold text-orange-800 mb-2">Your Next Trip</h4>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="font-semibold">{nextTrip.route.from} &rarr; {nextTrip.route.to}</p>
                                        <p className="text-sm text-gray-600">{nextTrip.date}</p>
                                    </div>
                                    <button onClick={() => setPage('MY_TICKETS')} className="px-3 py-1 bg-white border border-orange-200 text-orange-700 font-semibold rounded-full text-sm hover:bg-orange-100">View Details</button>
                                </div>
                            </div>
                        )}

                        <div>
                            <h4 className="font-bold text-gray-800 mb-2">Quick Actions</h4>
                            <div className="flex space-x-4">
                                <button onClick={() => setPage('FIND_BUS')} className="flex-1 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600">Book a New Trip</button>
                                <button onClick={() => setShowDepositModal(true)} className="flex-1 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300">Deposit Funds</button>
                            </div>
                        </div>
                    </div>
                );
            case 'PERSONAL':
                return (
                    <div>
                        <h3 className="font-bold text-xl mb-6 text-gray-800">Profile Information</h3>
                        <div className="flex items-center space-x-6 mb-6">
                            <img src={user.profilePicture || `https://ui-avatars.com/api/?name=${user.name}&background=F97316&color=fff`} alt="Profile" className="w-24 h-24 rounded-full object-cover"/>
                             <button className="px-4 py-2 bg-orange-500 text-white font-semibold rounded-lg text-sm hover:bg-orange-600">Change Photo</button>
                        </div>
                        <form className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-gray-600">Full Name</label>
                                <input type="text" defaultValue={user.name} className="w-full mt-1 p-3 border border-gray-200 rounded-lg bg-gray-50"/>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-600">Email Address</label>
                                <input type="email" defaultValue={user.email} className="w-full mt-1 p-3 border border-gray-200 rounded-lg bg-gray-50"/>
                            </div>
                            <div className="pt-4">
                                <button type="submit" className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600">Save Changes</button>
                            </div>
                        </form>
                    </div>
                );
            case 'PREFERENCES':
                return (
                     <div>
                        <h3 className="font-bold text-xl mb-6 text-gray-800">Travel Preferences</h3>
                        <p className="text-gray-500 mb-6">Save your favorite routes and operators for faster bookings.</p>
                        <div className="space-y-6">
                            <div>
                                <h4 className="font-semibold text-gray-700 mb-2">Favorite Routes</h4>
                                {user.preferences.favoriteRoutes.map((route, index) => (
                                    <div key={index} className="bg-gray-50 p-3 rounded-lg flex justify-between items-center mb-2">
                                        <p>{route.from} &rarr; {route.to}</p>
                                        <button className="text-sm text-red-600">Remove</button>
                                    </div>
                                ))}
                                <button className="text-sm font-semibold text-orange-600 mt-2">+ Add New Favorite Route</button>
                            </div>
                             <div>
                                <h4 className="font-semibold text-gray-700 mb-2">Preferred Operators</h4>
                                {user.preferences.preferredOperators.map((opId, index) => {
                                    const operator = OPERATORS.find(op => op.id === opId);
                                    return (
                                        <div key={index} className="bg-gray-50 p-3 rounded-lg flex justify-between items-center mb-2">
                                            <p>{operator?.name}</p>
                                            <button className="text-sm text-red-600">Remove</button>
                                        </div>
                                    );
                                })}
                                <button className="text-sm font-semibold text-orange-600 mt-2">+ Add Preferred Operator</button>
                            </div>
                        </div>
                         <div className="pt-6 mt-4 border-t">
                            <button className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600">Save Preferences</button>
                        </div>
                    </div>
                );
            case 'SECURITY':
                return (
                    <div>
                        <h3 className="font-bold text-xl mb-6 text-gray-800">Security Settings</h3>
                        <div className="space-y-8">
                            <div>
                                <h4 className="font-semibold text-lg text-gray-700 mb-2">Two-Factor Authentication (2FA)</h4>
                                <p className="text-gray-500 mb-4">Add an extra layer of security to your account.</p>
                                <TwoFactorAuthSetup />
                            </div>
                            <div className="border-t pt-8">
                                <h4 className="font-semibold text-lg text-gray-700 mb-2">Login Activity</h4>
                                <p className="text-gray-500 mb-4">This is a list of devices that have logged into your account.</p>
                                <div className="space-y-4">
                                    {user.recentActivity.map((activity, index) => (
                                        <div key={index} className="bg-gray-50 p-4 rounded-lg flex justify-between items-center">
                                            <div>
                                                <p className="font-semibold text-gray-800">{activity.device}</p>
                                                <p className="text-sm text-gray-500">{activity.location} - {new Date(activity.timestamp).toLocaleString()}</p>
                                            </div>
                                            <button className="text-sm text-blue-600 font-semibold">{index === 0 ? 'Current Session' : 'Revoke'}</button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'PASSWORD':
                 return (
                    <div>
                        <h3 className="font-bold text-xl mb-6 text-gray-800">Change Password</h3>
                        <form className="space-y-4 max-w-sm">
                             <div>
                                <label className="text-sm font-medium text-gray-600">Current Password</label>
                                <input type="password" className="w-full mt-1 p-3 border border-gray-200 rounded-lg bg-gray-50"/>
                            </div>
                             <div>
                                <label className="text-sm font-medium text-gray-600">New Password</label>
                                <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} className="w-full mt-1 p-3 border border-gray-200 rounded-lg bg-gray-50"/>
                                <PasswordStrengthMeter password={newPassword} />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-600">Confirm New Password</label>
                                <input type="password" className="w-full mt-1 p-3 border border-gray-200 rounded-lg bg-gray-50"/>
                            </div>
                            <div className="pt-4">
                                <button className="w-full py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-black">Update Password</button>
                            </div>
                        </form>
                    </div>
                );
            case 'NOTIFICATIONS':
                return (
                    <div>
                        <h3 className="font-bold text-xl mb-2 text-gray-800">Notification Preferences</h3>
                        <p className="text-gray-500 mb-6">Manage how we contact you.</p>
                        <div className="divide-y">
                            <Toggle label="Email promotions" enabled={notifications.promotions} setEnabled={val => setNotifications({...notifications, promotions: val})} />
                            <Toggle label="SMS reminders for trips" enabled={notifications.reminders} setEnabled={val => setNotifications({...notifications, reminders: val})} />
                            <Toggle label="Booking confirmations" enabled={notifications.confirmations} setEnabled={val => setNotifications({...notifications, confirmations: val})} />
                        </div>
                        <div className="pt-6">
                            <button className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600">Save Preferences</button>
                        </div>
                    </div>
                );
            case 'PAYMENT':
                return (
                    <div>
                        <h3 className="font-bold text-xl mb-2 text-gray-800">Payment Methods</h3>
                        <p className="text-gray-500 mb-6">Manage your saved payment options.</p>
                        <div className="space-y-4">
                            <div className="bg-gray-100 p-4 rounded-lg flex justify-between items-center">
                                <p className="font-semibold">Visa ending in 1234</p>
                                <button className="text-sm text-red-600 font-semibold">Remove</button>
                            </div>
                            <div className="bg-gray-100 p-4 rounded-lg flex justify-between items-center">
                                <p className="font-semibold">MTN Mobile Money</p>
                                <button className="text-sm text-red-600 font-semibold">Remove</button>
                            </div>
                        </div>
                        <div className="pt-6">
                            <button className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600">Add New Method</button>
                        </div>
                    </div>
                );
            case 'WALLET':
                return (
                    <div>
                        <h3 className="font-bold text-xl mb-2 text-gray-800">Wallet & PIN</h3>
                        <p className="text-gray-500 mb-6">View your balance, deposit funds, and manage your security PIN.</p>
                        <div className="bg-orange-50 p-6 rounded-lg text-center mb-6">
                            <p className="text-sm font-semibold text-orange-700">CURRENT BALANCE</p>
                            <p className="text-4xl font-bold text-orange-600">RWF {user.walletBalance.toLocaleString()}</p>
                        </div>
                        <div className="flex space-x-4">
                            <button onClick={() => setShowDepositModal(true)} className="flex-1 px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600">
                                Deposit Funds
                            </button>
                            <button onClick={handleSetPin} className="flex-1 px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-black">
                                {user.walletPin ? 'Change PIN' : 'Set PIN'}
                            </button>
                        </div>
                         {!user.walletPin && (
                            <div className="mt-4 p-3 bg-yellow-100 text-yellow-800 text-sm rounded-lg text-center">
                                <strong>Security Alert:</strong> Please set up a PIN to secure your wallet and enable payments.
                            </div>
                        )}
                    </div>
                );
        }
    };


    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {showDepositModal && <DepositModal onClose={() => setShowDepositModal(false)} onPinRequired={handlePinRequired}/>}
            {pinModalState.visible && (
                <PinInputModal
                    title={pinModalState.title}
                    onSuccess={() => {
                        pinModalState.onSuccess?.();
                        setPinModalState({ visible: false, title: '' });
                    }}
                    onClose={() => setPinModalState({ visible: false, title: '' })}
                />
            )}
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Account Settings</h1>
            <div className="grid lg:grid-cols-4 gap-8 items-start">
                <aside className="lg:col-span-1 space-y-2 sticky top-28">
                    <SettingsNavItem label="Dashboard" page="DASHBOARD" activePage={activePage} setPage={setActivePage} />
                    <SettingsNavItem label="Personal Details" page="PERSONAL" activePage={activePage} setPage={setActivePage} />
                    <SettingsNavItem label="Preferences" page="PREFERENCES" activePage={activePage} setPage={setActivePage} />
                    <SettingsNavItem label="Security & Login" page="SECURITY" activePage={activePage} setPage={setActivePage} />
                    <SettingsNavItem label="Change Password" page="PASSWORD" activePage={activePage} setPage={setActivePage} />
                    <SettingsNavItem label="Notifications" page="NOTIFICATIONS" activePage={activePage} setPage={setActivePage} />
                    <SettingsNavItem label="Payment Methods" page="PAYMENT" activePage={activePage} setPage={setActivePage} />
                    <SettingsNavItem label="Wallet & PIN" page="WALLET" activePage={activePage} setPage={setActivePage} />
                </aside>
                <main className="lg:col-span-3 bg-white p-8 rounded-2xl shadow-md min-h-[400px]">
                   {renderContent()}
                </main>
            </div>
        </div>
    );
};