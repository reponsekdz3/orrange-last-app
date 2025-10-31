import React from 'react';

export const OperatorRoutesPage: React.FC = () => {
    return (
        <main className="flex-1 p-6 sm:p-8">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Manage Routes</h1>
                    <div className="w-20 h-1 bg-orange-500 rounded-full mt-2"></div>
                </div>
                <div className="flex space-x-2">
                    <button className="px-4 py-2 text-sm font-semibold text-gray-700 bg-white border rounded-lg hover:bg-gray-50">Manage Schedules</button>
                    <button className="px-4 py-2 text-sm font-semibold text-white bg-orange-500 rounded-lg hover:bg-orange-600">Create New Route</button>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-md">
                    <h3 className="font-bold text-lg mb-4 text-gray-800">All Routes</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th className="p-3"><input type="checkbox" /></th>
                                    <th className="p-3">Route</th>
                                    <th className="p-3">Bookings</th>
                                    <th className="p-3">Revenue</th>
                                    <th className="p-3">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b"><td className="p-3"><input type="checkbox" /></td><td className="p-3 font-semibold text-gray-800">Kigali &gt; Rubavu</td><td className="p-3">150</td><td className="p-3">RWF 1.2M</td><td className="p-3 text-green-500">Active</td></tr>
                                <tr className="border-b"><td className="p-3"><input type="checkbox" /></td><td className="p-3 font-semibold text-gray-800">Kigali &gt; Huye</td><td className="p-3">210</td><td className="p-3">RWF 950k</td><td className="p-3 text-green-500">Active</td></tr>
                                <tr className="border-b"><td className="p-3"><input type="checkbox" /></td><td className="p-3 font-semibold text-gray-800">Kigali &gt; Musanze</td><td className="p-3">80</td><td className="p-3">RWF 280k</td><td className="p-3 text-yellow-500">Pending</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-md space-y-4">
                     <h3 className="font-bold text-lg text-gray-800">Set Prices & Amenities</h3>
                     <div>
                        <label className="text-sm font-medium text-gray-600">Select Route</label>
                        <select className="w-full mt-1 p-2 border border-gray-200 rounded-lg bg-gray-50">
                            <option>Kigali &gt; Rubavu</option>
                        </select>
                    </div>
                     <div>
                        <label className="text-sm font-medium text-gray-600">Base Price (RWF)</label>
                        <input type="number" defaultValue="7000" className="w-full mt-1 p-2 border border-gray-200 rounded-lg bg-gray-50" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-600 mb-2">Amenities</p>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                            <label className="flex items-center"><input type="checkbox" defaultChecked className="mr-2"/> WiFi</label>
                            <label className="flex items-center"><input type="checkbox" defaultChecked className="mr-2"/> AC</label>
                             <label className="flex items-center"><input type="checkbox" defaultChecked className="mr-2"/> Reclining Seats</label>
                             <label className="flex items-center"><input type="checkbox" className="mr-2"/> Power Outlets</label>
                        </div>
                    </div>
                    <button className="w-full py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600">Save Changes</button>
                </div>
            </div>

            <div className="mt-8 bg-white p-6 rounded-2xl shadow-md">
                <h3 className="font-bold text-lg mb-4 text-gray-800">Manage Passengers (Kigali &gt; Rubavu)</h3>
                 <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th className="p-3">Booking ID</th>
                                <th className="p-3">Departure</th>
                                <th className="p-3">Passenger</th>
                                <th className="p-3">Seats</th>
                                <th className="p-3">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                           <tr className="border-b"><td className="p-3">#10332</td><td className="p-3">2024-11-01</td><td className="p-3">John Doe</td><td className="p-3">5A, 5B</td><td className="p-3">Checked In</td></tr>
                           <tr className="border-b"><td className="p-3">#10333</td><td className="p-3">2024-11-01</td><td className="p-3">Jane Smith</td><td className="p-3">6C</td><td className="p-3">Booked</td></tr>
                        </tbody>
                    </table>
                 </div>
            </div>
        </main>
    );
};