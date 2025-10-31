import React, { useContext, useState } from 'react';
import { AppContext } from '../App';

type SettingsPage = 'PERSONAL' | 'PASSWORD' | 'NOTIFICATIONS' | 'PAYMENT' | 'WALLET' | 'SECURITY';

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

const DepositModal: React.FC<{onClose: () => void;}> = ({onClose}) => {
    const { updateWalletBalance, showToast } = useContext(AppContext);
    const [amount, setAmount] = useState('');

    const handleDeposit = (e: React.FormEvent) => {
        e.preventDefault();
        const depositAmount = parseFloat(amount);
        if (depositAmount > 0) {
            updateWalletBalance(depositAmount);
            showToast(`RWF ${depositAmount.toLocaleString()} successfully added to your wallet.`, 'success');
            onClose();
        } else {
            showToast('Please enter a valid amount.', 'error');
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-2xl shadow-lg max-w-sm w-full">
                <h3 className="font-bold text-xl mb-4 text-gray-800">Deposit Funds</h3>
                <p className="text-gray-500 mb-6">Enter the amount you wish to deposit from your MTN Mobile Money account.</p>
                <form onSubmit={handleDeposit} className="space-y-4">
                    <div>
                        <label className="text-sm font-medium text-gray-600">Amount (RWF)</label>
                        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="e.g., 10000" className="w-full mt-1 p-3 border border-gray-200 rounded-lg bg-gray-50 focus:ring-orange-500 focus:border-orange-500"/>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-600">Phone Number</label>
                        <input type="tel" placeholder="0788..." className="w-full mt-1 p-3 border border-gray-200 rounded-lg bg-gray-50 focus:ring-orange-500 focus:border-orange-500"/>
                    </div>
                    <div className="flex justify-end space-x-3 pt-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600">Confirm Deposit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const PasswordStrengthMeter: React.FC<{password: string}> = ({ password }) => {
    const checkStrength = () => {
        let score = 0;
        if (password.length > 8) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;
        return score;
    };

    const strength = checkStrength();
    const strengthLabels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
    const strengthColors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'];

    return (
        <div>
            <div className="flex h-2 mb-2 rounded-full overflow-hidden">
                <div className={`transition-all duration-300 ${strength > 0 ? strengthColors[0] : ''}`} style={{ width: '20%' }}></div>
                <div className={`transition-all duration-300 ${strength > 1 ? strengthColors[1] : ''}`} style={{ width: '20%' }}></div>
                <div className={`transition-all duration-300 ${strength > 2 ? strengthColors[2] : ''}`} style={{ width: '20%' }}></div>
                <div className={`transition-all duration-300 ${strength > 3 ? strengthColors[3] : ''}`} style={{ width: '20%' }}></div>
                <div className={`transition-all duration-300 ${strength > 4 ? strengthColors[4] : ''}`} style={{ width: '20%' }}></div>
            </div>
            <p className="text-xs text-right font-semibold">{password.length > 0 && strengthLabels[strength]}</p>
        </div>
    );
};


export const AccountSettingsPage: React.FC = () => {
    const { user } = useContext(AppContext);
    const [activePage, setActivePage] = useState<SettingsPage>('PERSONAL');
    const [showDepositModal, setShowDepositModal] = useState(false);
    const [newPassword, setNewPassword] = useState('');

    if (!user) {
        return <div className="p-8 text-center">Please log in to view your account settings.</div>;
    }

    const [notifications, setNotifications] = useState({ promotions: true, reminders: true, confirmations: true });

    const renderContent = () => {
        switch(activePage) {
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
            case 'SECURITY':
                return (
                    <div>
                        <h3 className="font-bold text-xl mb-6 text-gray-800">Login Activity</h3>
                        <p className="text-gray-500 mb-6">This is a list of devices that have logged into your account. Revoke any sessions that you do not recognize.</p>
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
                        <h3 className="font-bold text-xl mb-2 text-gray-800">My Wallet</h3>
                        <p className="text-gray-500 mb-6">View your balance and deposit funds.</p>
                        <div className="bg-orange-50 p-6 rounded-lg text-center mb-6">
                            <p className="text-sm font-semibold text-orange-700">CURRENT BALANCE</p>
                            <p className="text-4xl font-bold text-orange-600">RWF {user.walletBalance.toLocaleString()}</p>
                        </div>
                        <button onClick={() => setShowDepositModal(true)} className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600">
                            Deposit Funds
                        </button>
                    </div>
                );
        }
    };


    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {showDepositModal && <DepositModal onClose={() => setShowDepositModal(false)} />}
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Account Settings</h1>
            <div className="grid lg:grid-cols-4 gap-8">
                <aside className="lg:col-span-1 space-y-2">
                    <SettingsNavItem label="Personal Details" page="PERSONAL" activePage={activePage} setPage={setActivePage} />
                    <SettingsNavItem label="Security & Login" page="SECURITY" activePage={activePage} setPage={setActivePage} />
                    <SettingsNavItem label="Change Password" page="PASSWORD" activePage={activePage} setPage={setActivePage} />
                    <SettingsNavItem label="Notifications" page="NOTIFICATIONS" activePage={activePage} setPage={setActivePage} />
                    <SettingsNavItem label="Payment Methods" page="PAYMENT" activePage={activePage} setPage={setActivePage} />
                    <SettingsNavItem label="Wallet" page="WALLET" activePage={activePage} setPage={setActivePage} />
                </aside>
                <main className="lg:col-span-3 bg-white p-8 rounded-2xl shadow-md">
                   {renderContent()}
                </main>
            </div>
        </div>
    );
};