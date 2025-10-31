import React, { useState, useContext, useRef } from 'react';
import { AppContext } from '../App';
import { USER_TICKETS } from '../constants';

type ActiveTab = 'personal' | 'password' | 'notifications' | 'payment';

export const AccountSettingsPage: React.FC = () => {
    const { user, setPage, updateUser } = useContext(AppContext);
    const [activeTab, setActiveTab] = useState<ActiveTab>('personal');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const upcomingTrip = USER_TICKETS.find(t => t.status === 'ACTIVE');
    
    // Initialize component state from the context
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        dob: user?.dob || '',
        profilePic: user?.profilePic || null
    });

    if (!user) {
        return <div className="p-8 text-center">Please log in to view your account settings.</div>
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, profilePic: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({...prev, [id]: value }));
    }

    const handleSaveChanges = (e: React.FormEvent) => {
        e.preventDefault();
        updateUser(formData);
        alert('Profile updated successfully!');
    }

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Account Settings</h1>

            <div className="grid lg:grid-cols-3 gap-8 items-start">
                <div className="space-y-4">
                    <button onClick={() => setActiveTab('personal')} className={`w-full text-left p-4 rounded-lg font-semibold flex items-center space-x-3 transition-colors ${activeTab === 'personal' ? 'bg-orange-500 text-white' : 'bg-white hover:bg-orange-100'}`}>
                        <span>⭐</span><span>Personal Details</span>
                    </button>
                    <div className="bg-white p-2 rounded-lg space-y-1">
                        <button onClick={() => setActiveTab('personal')} className={`w-full text-left p-3 rounded-md text-sm font-medium flex items-center space-x-3 transition-colors ${activeTab === 'personal' ? 'bg-orange-100 text-orange-700' : 'hover:bg-gray-100'}`}>
                           <span>👤</span><span>Personal Details</span>
                        </button>
                         <button onClick={() => setActiveTab('password')} className={`w-full text-left p-3 rounded-md text-sm font-medium flex items-center space-x-3 transition-colors ${activeTab === 'password' ? 'bg-orange-100 text-orange-700' : 'hover:bg-gray-100'}`}>
                           <span>🔒</span><span>Change Password</span>
                        </button>
                        <button onClick={() => setActiveTab('notifications')} className={`w-full text-left p-3 rounded-md text-sm font-medium flex items-center space-x-3 transition-colors ${activeTab === 'notifications' ? 'bg-orange-100 text-orange-700' : 'hover:bg-gray-100'}`}>
                           <span>🔔</span><span>Notification Preferences</span>
                        </button>
                         <button onClick={() => setActiveTab('payment')} className={`w-full text-left p-3 rounded-md text-sm font-medium flex items-center space-x-3 transition-colors ${activeTab === 'payment' ? 'bg-orange-100 text-orange-700' : 'hover:bg-gray-100'}`}>
                           <span>💳</span><span>Payment Methods</span>
                        </button>
                    </div>

                    <div className="bg-white p-4 rounded-lg">
                        <h3 className="font-semibold mb-2">My Bookings</h3>
                        {upcomingTrip && (
                            <div className="bg-orange-50 p-3 rounded-lg">
                                <p className="font-bold text-sm">Upcoming Trip</p>
                                <p className="text-xs text-gray-600">{upcomingTrip.route.from} &gt; {upcomingTrip.route.to}</p>
                                <button onClick={() => setPage('MY_TICKETS')} className="mt-2 w-full text-center text-xs font-semibold text-orange-600 bg-orange-200 py-1.5 rounded-md hover:bg-orange-300">
                                    View All
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-md">
                    <div className="flex flex-col items-center mb-8">
                        <div className="relative group">
                            <div 
                                className="w-24 h-24 bg-gray-200 rounded-full mb-4 flex items-center justify-center cursor-pointer overflow-hidden"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                {formData.profilePic ? (
                                    <img src={formData.profilePic} alt="Profile" className="w-full h-full object-cover"/>
                                ) : (
                                    <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                )}
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                </div>
                            </div>
                             <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleImageChange}
                                className="hidden"
                                accept="image/png, image/jpeg"
                            />
                        </div>
                        <h2 className="text-xl font-bold text-gray-800">{formData.name}</h2>
                    </div>

                    <form className="space-y-4" onSubmit={handleSaveChanges}>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium text-gray-600" htmlFor="name">Full Name</label>
                                <input type="text" id="name" value={formData.name} onChange={handleFormChange} className="w-full mt-1 p-3 border border-gray-200 rounded-lg bg-gray-50"/>
                            </div>
                             <div>
                                <label className="text-sm font-medium text-gray-600" htmlFor="email">Email Address</label>
                                <input type="email" id="email" value={formData.email} onChange={handleFormChange} className="w-full mt-1 p-3 border border-gray-200 rounded-lg bg-gray-50"/>
                            </div>
                             <div>
                                <label className="text-sm font-medium text-gray-600" htmlFor="phone">Phone Number</label>
                                <input type="tel" id="phone" value={formData.phone} onChange={handleFormChange} className="w-full mt-1 p-3 border border-gray-200 rounded-lg bg-gray-50"/>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-600" htmlFor="dob">Date of Birth</label>
                                <input type="date" id="dob" value={formData.dob} onChange={handleFormChange} className="w-full mt-1 p-3 border border-gray-200 rounded-lg bg-gray-50"/>
                            </div>
                        </div>
                        <div className="pt-4 flex items-center justify-between">
                            <div>
                                <button type="submit" className="px-6 py-2.5 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors">
                                    Save Changes
                                </button>
                            </div>
                            <button type="button" className="text-sm font-semibold text-red-600 hover:underline">
                                Delete Account
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};