import React, { useState } from 'react';
// FIX: Import `Bus` type from `types.ts` instead of `constants.ts`.
import { OPERATOR_BUSES } from '../../constants';
import type { Bus } from '../../types';

export const OperatorBusesPage: React.FC = () => {
    const [buses, setBuses] = useState<Bus[]>(OPERATOR_BUSES);
    const [selectedBus, setSelectedBus] = useState<Bus | null>(buses[0] || null);

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedBus) return;
        setBuses(buses.map(bus => bus.id === selectedBus.id ? selectedBus : bus));
        alert(`Bus ${selectedBus.plateNumber} saved!`);
    };

    const handleAmenityChange = (amenity: string, checked: boolean) => {
        if (!selectedBus) return;
        const currentAmenities = selectedBus.amenities || [];
        const newAmenities = checked
            ? [...currentAmenities, amenity]
            : currentAmenities.filter(a => a !== amenity);
        setSelectedBus({ ...selectedBus, amenities: newAmenities });
    }

    return (
        <main className="flex-1 p-6 sm:p-8">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Manage Fleet</h1>
                    <div className="w-20 h-1 bg-orange-500 rounded-full mt-2"></div>
                </div>
                <button className="px-4 py-2 text-sm font-semibold text-white bg-orange-500 rounded-lg hover:bg-orange-600 transform hover:scale-105 transition-transform">
                    Add New Bus
                </button>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-md">
                    <div className="flex items-center border border-gray-200 rounded-lg p-2 mb-4">
                        <svg className="w-5 h-5 text-gray-400 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        <input type="text" placeholder="Search by plate number or model..." className="w-full bg-transparent focus:outline-none"/>
                    </div>
                     <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th className="p-3">Plate Number</th>
                                    <th className="p-3">Model</th>
                                    <th className="p-3">Amenities</th>
                                    <th className="p-3">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {buses.map(bus => (
                                    <tr key={bus.id} onClick={() => setSelectedBus(bus)} className={`border-b hover:bg-orange-50 cursor-pointer transition-colors ${selectedBus?.id === bus.id ? 'bg-orange-50' : ''}`}>
                                        <td className="p-3 font-semibold text-gray-800">{bus.plateNumber}</td>
                                        <td className="p-3">{bus.model}</td>
                                        <td className="p-3 text-xs">{bus.amenities.join(', ')}</td>
                                        <td className="p-3">
                                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${bus.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
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
                        <h3 className="font-bold text-lg text-gray-800">Bus Details</h3>
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
                                <p className="text-sm font-medium text-gray-600 mb-2">Amenities</p>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    <label className="flex items-center"><input type="checkbox" onChange={e => handleAmenityChange('WiFi', e.target.checked)} checked={selectedBus.amenities.includes('WiFi')} className="mr-2"/> WiFi</label>
                                    <label className="flex items-center"><input type="checkbox" onChange={e => handleAmenityChange('AC', e.target.checked)} checked={selectedBus.amenities.includes('AC')} className="mr-2"/> AC</label>
                                    <label className="flex items-center"><input type="checkbox" onChange={e => handleAmenityChange('Reclining Seats', e.target.checked)} checked={selectedBus.amenities.includes('Reclining Seats')} className="mr-2"/> Reclining Seats</label>
                                </div>
                            </div>
                            <div className="pt-2 flex items-center justify-between">
                                <button type="button" className="text-sm font-semibold text-red-600 hover:underline">Delete Bus</button>
                                <button type="submit" className="px-4 py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transform hover:scale-105 transition-transform">Save Changes</button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </main>
    );
};