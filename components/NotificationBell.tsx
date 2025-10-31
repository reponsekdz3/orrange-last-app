import React, { useState } from 'react';
import { Notification } from '../types';

interface NotificationBellProps {
    notifications: Notification[];
}

export const NotificationBell: React.FC<NotificationBellProps> = ({ notifications }) => {
    const [isOpen, setIsOpen] = useState(false);
    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <div className="relative">
            <button onClick={() => setIsOpen(!isOpen)} className="relative text-gray-600 hover:text-orange-600 focus:outline-none">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                        {unreadCount}
                    </span>
                )}
            </button>
            
            {isOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl overflow-hidden z-50">
                    <div className="py-2 px-4 font-bold text-gray-700 border-b">Notifications</div>
                    <div className="divide-y">
                        {notifications.map(notification => (
                             <div key={notification.id} className={`p-3 hover:bg-gray-100 ${!notification.read ? 'bg-orange-50' : ''}`}>
                                <p className="text-sm text-gray-600">{notification.message}</p>
                            </div>
                        ))}
                         {notifications.length === 0 && (
                             <p className="text-sm text-gray-500 text-center p-4">No new notifications.</p>
                         )}
                    </div>
                </div>
            )}
        </div>
    );
};