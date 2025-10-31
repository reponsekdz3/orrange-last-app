import React, { useState } from 'react';
import { OPERATOR_BUSES } from '../../constants';
import type { Bus } from '../../types';

type Status = 'All' | 'Active' | 'Maintenance' | 'Inactive';

const FilterButton: React.FC<{ label: string; count: number; active: boolean; onClick: () => void; }> = ({ label, count, active, onClick }) => {
    let colorClasses = '';
    if (label === 'Active') colorClasses = 'border-green-500';
    if (label === 'Maintenance') colorClasses = 'border-yellow-500';
    if (label === 'Inactive') colorClasses = 'border-red-500';

    return (
        <button
            onClick={onClick}
            className={`px-3 py-1.5 text-sm font-semibold rounded-full flex items-center space-x-2 transition-colors ${
                active ? `bg-orange-500 text-white` : `bg-white text-gray-700 hover:bg-gray-100 border ${colorClasses || 'border-gray-200'}`
            }`}
        >
            <span>{label}</span>
            <span className={`px-2 rounded-full text-xs ${active ? 'bg-white/20' : 'bg-gray-200'}`}>{count}</span>
        </button>
    );
};

export const OperatorBusesPage: React.FC = () => {
    const [buses, setBuses] = useState<Bus[]>(OPERATOR_BUSES);
    const [selectedBus, setSelectedBus] = useState<Bus | null>(buses[0] || null);
    const [statusFilter, setStatusFilter] = useState<Status>('All');
    
    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedBus) return;
        setBuses(buses.map(b => b.id === selectedBus.id ? selectedBus : b));
        alert(`Bus ${selectedBus.plateNumber} saved!`);
    };

    const getStatusClass = (status: string) => {
        switch (status) {
            case 'Active': return 'text-green-600 bg-green-100';
            case 'Maintenance': return 'text-yellow-600 bg-yellow-100';
            case 'Inactive': return 'text-red-600 bg-red-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };
    
    const statusCounts = buses.reduce((acc, bus) => {
        acc[bus.status] = (acc[bus.status] || 0) + 1;
        return acc;
    }, {} as Record<Bus['status'], number>);

    const filteredBuses = buses.filter(bus => 
        statusFilter === 'All' || bus.status === statusFilter
    );

    return (
        <main className="flex-1 p-6 sm:p-8">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Manage Buses</h1>
                    <div className="w-20 h-1 bg-orange-500 rounded-full mt-2"></div>
                </div>
                <button className="px-4 py-2 text-sm font-semibold text-white bg-orange-500 rounded-lg hover:bg-orange-600">Add New Bus</button>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-md">
                    <h3 className="font-bold text-lg text-gray-800 mb-4">Bus Fleet</h3>

                    <div className="flex flex-wrap gap-2 mb-4">
                        <FilterButton label="All" count={buses.length} active={statusFilter === 'All'} onClick={() => setStatusFilter('All')} />
                        <FilterButton label="Active" count={statusCounts.Active || 0} active={statusFilter === 'Active'} onClick={() => setStatusFilter('Active')} />
                        <FilterButton label="Maintenance" count={statusCounts.Maintenance || 0} active={statusFilter === 'Maintenance'} onClick={() => setStatusFilter('Maintenance')} />
                        <FilterButton label="Inactive" count={statusCounts.Inactive || 0} active={statusFilter === 'Inactive'} onClick={() => setStatusFilter('Inactive')} />
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500">
                             <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th className="p-3">Plate Number</th>
                                    <th className="p-3">Model</th>
                                    <th className="p-3">Capacity</th>
                                    <th className="p-3">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredBuses.map(bus => (
                                    <tr key={bus.id} onClick={() => setSelectedBus(bus)} className={`border-b hover:bg-orange-50 cursor-pointer transition-colors ${selectedBus?.id === bus.id ? 'bg-orange-50' : ''}`}>
                                        <td className="p-3 font-semibold text-gray-800">{bus.plateNumber}</td>
                                        <td className="p-3">{bus.model}</td>
                                        <td className="p-3">{bus.capacity}</td>
                                        <td className="p-3">
                                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusClass(bus.status)}`}>
                                                {bus.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {selectedBus && (
                    <div className="bg-white p-6 rounded-2xl shadow-md space-y-4 sticky top-28">
                        <h3 className="font-bold text-lg text-gray-800">Edit Bus Details</h3>
                        <form onSubmit={handleSave}>
                            <div>
                                <label className="text-sm font-medium text-gray-600">Plate Number</label>
                                <input type="text" value={selectedBus.plateNumber} onChange={e => setSelectedBus({...selectedBus, plateNumber: e.target.value})} className="w-full mt-1 p-2 border border-gray-200 rounded-lg bg-gray-50" />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-600">Model</label>
                                <input type="text" value={selectedBus.model} onChange={e => setSelectedBus({...selectedBus, model: e.target.value})} className="w-full mt-1 p-2 border border-gray-200 rounded-lg bg-gray-50" />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-600">Capacity</label>
                                <input type="number" value={selectedBus.capacity} onChange={e => setSelectedBus({...selectedBus, capacity: parseInt(e.target.value) || 0})} className="w-full mt-1 p-2 border border-gray-200 rounded-lg bg-gray-50" />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-600">Status</label>
                                <select value={selectedBus.status} onChange={e => setSelectedBus({...selectedBus, status: e.target.value as Bus['status']})} className="w-full mt-1 p-2 border border-gray-200 rounded-lg bg-gray-50">
                                    <option>Active</option>
                                    <option>Maintenance</option>
                                    <option>Inactive</option>
                                </select>
                            </div>
                            <div className="pt-2 flex items-center justify-between">
                                <button type="button" className="text-sm font-semibold text-red-600 hover:underline">Delete Bus</button>
                                <button type="submit" className="px-4 py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600">Save Changes</button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </main>
    );
};