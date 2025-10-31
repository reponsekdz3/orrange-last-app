import React, { useContext, useState } from 'react';
import { AppContext } from '../App';
import { USER_TICKETS, OPERATORS } from '../constants';

type SettingsPage = 'DASHBOARD' | 'PERSONAL' | 'PASSWORD' | 'NOTIFICATIONS' | 'PAYMENT' | 'WALLET' | 'SECURITY' | 'PREFERENCES';

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
                <div className={`transition-all duration-300 ${strength > 0 ? strengthColors[0] : ''}`} style={{ width: `${(strength / 5) * 100}%` }}></div>
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


export const AccountSettingsPage: React.FC = () => {
    const { user, setPage, showToast } = useContext(AppContext);
    const [activePage, setActivePage] = useState<SettingsPage>('DASHBOARD');
    const [showDepositModal, setShowDepositModal] = useState(false);
    const [newPassword, setNewPassword] = useState('');

    if (!user) {
        return <div className="p-8 text-center">Please log in to view your account settings.</div>;
    }

    const [notifications, setNotifications] = useState({ promotions: true, reminders: true, confirmations: true });

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
            <div className="grid lg:grid-cols-4 gap-8 items-start">
                <aside className="lg:col-span-1 space-y-2 sticky top-28">
                    <SettingsNavItem label="Dashboard" page="DASHBOARD" activePage={activePage} setPage={setActivePage} />
                    <SettingsNavItem label="Personal Details" page="PERSONAL" activePage={activePage} setPage={setActivePage} />
                    <SettingsNavItem label="Preferences" page="PREFERENCES" activePage={activePage} setPage={setActivePage} />
                    <SettingsNavItem label="Security & Login" page="SECURITY" activePage={activePage} setPage={setActivePage} />
                    <SettingsNavItem label="Change Password" page="PASSWORD" activePage={activePage} setPage={setActivePage} />
                    <SettingsNavItem label="Notifications" page="NOTIFICATIONS" activePage={activePage} setPage={setActivePage} />
                    <SettingsNavItem label="Payment Methods" page="PAYMENT" activePage={activePage} setPage={setActivePage} />
                    <SettingsNavItem label="Wallet" page="WALLET" activePage={activePage} setPage={setActivePage} />
                </aside>
                <main className="lg:col-span-3 bg-white p-8 rounded-2xl shadow-md min-h-[400px]">
                   {renderContent()}
                </main>
            </div>
        </div>
    );
};