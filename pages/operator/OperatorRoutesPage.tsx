import React, { useState } from 'react';

const routesData = [
    { id: 'R1', name: 'Kigali > Rubavu', bookings: 150, revenue: '1.2M', status: 'Active' },
    { id: 'R2', name: 'Kigali > Huye', bookings: 210, revenue: '950k', status: 'Active' },
    { id: 'R3', name: 'Kigali > Musanze', bookings: 80, revenue: '280k', status: 'Pending' },
    { id: 'R4', name: 'Rubavu > Huye', bookings: 0, revenue: '0', status: 'Inactive' },
];

type Status = 'All' | 'Active' | 'Pending' | 'Inactive';

export const OperatorRoutesPage: React.FC = () => {
    const [statusFilter, setStatusFilter] = useState<Status>('All');

    const filteredRoutes = routesData.filter(route => 
        statusFilter === 'All' || route.status === statusFilter
    );

    const getStatusClass = (status: string) => {
        switch (status) {
            case 'Active': return 'text-green-600 bg-green-100';
            case 'Pending': return 'text-yellow-600 bg-yellow-100';
            case 'Inactive': return 'text-red-600 bg-red-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

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
                     <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-lg text-gray-800">All Routes</h3>
                        <div className="flex items-center space-x-2">
                            <label className="text-sm font-medium">Status:</label>
                            <select 
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value as Status)}
                                className="p-1.5 border border-gray-200 rounded-md bg-gray-50 text-sm"
                            >
                                <option>All</option>
                                <option>Active</option>
                                <option>Pending</option>
                                <option>Inactive</option>
                            </select>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th className="p-3"><input type="checkbox" /></th>
                                    <th className="p-3">Route</th>
                                    <th className="p-3">Bookings</th>
                                    <th className="p-3">Revenue (RWF)</th>
                                    <th className="p-3">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredRoutes.map(route => (
                                    <tr key={route.id} className="border-b hover:bg-gray-50">
                                        <td className="p-3"><input type="checkbox" /></td>
                                        <td className="p-3 font-semibold text-gray-800">{route.name}</td>
                                        <td className="p-3">{route.bookings}</td>
                                        <td className="p-3">{route.revenue}</td>
                                        <td className="p-3">
                                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusClass(route.status)}`}>
                                                {route.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-md space-y-4 sticky top-28">
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