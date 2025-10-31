import React, { useState } from 'react';
import { OPERATOR_DRIVERS, OPERATOR_BUSES } from '../../constants';
import type { Driver } from '../../types';

export const OperatorDriversPage: React.FC = () => {
    const [drivers, setDrivers] = useState<Driver[]>(OPERATOR_DRIVERS);
    const [selectedDriver, setSelectedDriver] = useState<Driver | null>(drivers[0] || null);
    
    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedDriver) return;
        setDrivers(drivers.map(d => d.id === selectedDriver.id ? selectedDriver : d));
        alert(`Driver ${selectedDriver.name} saved!`);
    };

    const getStatusClass = (status: string) => {
        switch (status) {
            case 'Active': return 'text-green-600 bg-green-100';
            case 'On Leave': return 'text-yellow-600 bg-yellow-100';
            case 'Inactive': return 'text-red-600 bg-red-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };
    
    return (
        <main className="flex-1 p-6 sm:p-8">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Manage Drivers</h1>
                    <div className="w-20 h-1 bg-orange-500 rounded-full mt-2"></div>
                </div>
                <button className="px-4 py-2 text-sm font-semibold text-white bg-orange-500 rounded-lg hover:bg-orange-600">Add New Driver</button>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-md">
                    <h3 className="font-bold text-lg text-gray-800 mb-4">Driver Roster</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500">
                             <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th className="p-3">Name</th>
                                    <th className="p-3">Contact</th>
                                    <th className="p-3">Assigned Bus</th>
                                    <th className="p-3">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {drivers.map(driver => (
                                    <tr key={driver.id} onClick={() => setSelectedDriver(driver)} className={`border-b hover:bg-orange-50 cursor-pointer transition-colors ${selectedDriver?.id === driver.id ? 'bg-orange-50' : ''}`}>
                                        <td className="p-3 font-semibold text-gray-800">{driver.name}</td>
                                        <td className="p-3">{driver.contact}</td>
                                        <td className="p-3">{OPERATOR_BUSES.find(b => b.id === driver.assignedBusId)?.plateNumber || 'N/A'}</td>
                                        <td className="p-3">
                                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusClass(driver.status)}`}>
                                                {driver.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {selectedDriver && (
                    <div className="bg-white p-6 rounded-2xl shadow-md space-y-4 sticky top-28">
                        <h3 className="font-bold text-lg text-gray-800">Edit Driver Details</h3>
                        <form onSubmit={handleSave}>
                            <div>
                                <label className="text-sm font-medium text-gray-600">Full Name</label>
                                <input type="text" value={selectedDriver.name} onChange={e => setSelectedDriver({...selectedDriver, name: e.target.value})} className="w-full mt-1 p-2 border border-gray-200 rounded-lg bg-gray-50" />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-600">Contact Number</label>
                                <input type="text" value={selectedDriver.contact} onChange={e => setSelectedDriver({...selectedDriver, contact: e.target.value})} className="w-full mt-1 p-2 border border-gray-200 rounded-lg bg-gray-50" />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-600">License Number</label>
                                <input type="text" value={selectedDriver.licenseNumber} onChange={e => setSelectedDriver({...selectedDriver, licenseNumber: e.target.value})} className="w-full mt-1 p-2 border border-gray-200 rounded-lg bg-gray-50" />
                            </div>
                             <div>
                                <label className="text-sm font-medium text-gray-600">Assigned Bus</label>
                                <select value={selectedDriver.assignedBusId || ''} onChange={e => setSelectedDriver({...selectedDriver, assignedBusId: e.target.value || null})} className="w-full mt-1 p-2 border border-gray-200 rounded-lg bg-gray-50">
                                    <option value="">None</option>
                                    {OPERATOR_BUSES.map(bus => (
                                        <option key={bus.id} value={bus.id}>{bus.plateNumber}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-600">Status</label>
                                <select value={selectedDriver.status} onChange={e => setSelectedDriver({...selectedDriver, status: e.target.value as Driver['status']})} className="w-full mt-1 p-2 border border-gray-200 rounded-lg bg-gray-50">
                                    <option>Active</option>
                                    <option>On Leave</option>
                                    <option>Inactive</option>
                                </select>
                            </div>
                            <div className="pt-2 flex items-center justify-between">
                                <button type="button" className="text-sm font-semibold text-red-600 hover:underline">Delete Driver</button>
                                <button type="submit" className="px-4 py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600">Save Changes</button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </main>
    );
};