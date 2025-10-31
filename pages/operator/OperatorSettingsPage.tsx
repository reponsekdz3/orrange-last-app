import React from 'react';

export const OperatorSettingsPage: React.FC = () => {
    return (
        <main className="flex-1 p-6 sm:p-8">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Settings</h1>
                    <div className="w-20 h-1 bg-orange-500 rounded-full mt-2"></div>
                </div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-md text-center">
                <h2 className="text-xl font-bold text-gray-700">Operator Settings</h2>
                <p className="mt-2 text-gray-500">This page is under construction. More features coming soon!</p>
            </div>
        </main>
    );
};
