import React, { useState } from 'react';
import { OPERATOR_SCHEDULES, OPERATOR_BUSES } from '../../constants';
import type { Schedule } from '../../types';

export const OperatorSchedulesPage: React.FC = () => {
    const [schedules, setSchedules] = useState<Schedule[]>(OPERATOR_SCHEDULES);
    const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(schedules[0] || null);

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedSchedule) return;
        setSchedules(schedules.map(s => s.id === selectedSchedule.id ? selectedSchedule : s));
        alert(`Schedule ${selectedSchedule.id} saved!`);
    };

    return (
        <main className="flex-1 p-6 sm:p-8">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Manage Schedules</h1>
                    <div className="w-20 h-1 bg-orange-500 rounded-full mt-2"></div>
                </div>
                 <div className="flex space-x-2">
                    <button className="px-4 py-2 text-sm font-semibold text-gray-700 bg-white border rounded-lg hover:bg-gray-50">View Calendar</button>
                    <button className="px-4 py-2 text-sm font-semibold text-white bg-orange-500 rounded-lg hover:bg-orange-600 transform hover:scale-105 transition-transform">Create New Schedule</button>
                </div>
            </div>

             <div className="grid lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-md">
                    <h3 className="font-bold text-lg text-gray-800 mb-4">Date Range</h3>
                    <div className="flex items-center space-x-4 mb-4">
                        <input type="date" className="p-2 border border-gray-200 rounded-lg bg-gray-50"/>
                        <button className="px-4 py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600">Apply Filters</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th className="p-3">Route</th>
                                    <th className="p-3">Bus</th>
                                    <th className="p-3">Departure</th>
                                    <th className="p-3">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {schedules.map(schedule => (
                                     <tr key={schedule.id} onClick={() => setSelectedSchedule(schedule)} className={`border-b hover:bg-orange-50 cursor-pointer transition-colors ${selectedSchedule?.id === schedule.id ? 'bg-orange-50' : ''}`}>
                                        <td className="p-3 font-semibold text-gray-800">{schedule.route.from} &gt; {schedule.route.to}</td>
                                        <td className="p-3">{schedule.bus.plateNumber}</td>
                                        <td className="p-3">{schedule.departureTime}</td>
                                        <td className="p-3">
                                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${schedule.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                                                {schedule.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                 {selectedSchedule && (
                     <div className="bg-white p-6 rounded-2xl shadow-md space-y-4 sticky top-28">
                        <h3 className="font-bold text-lg text-gray-800">Edit Schedule Details</h3>
                        <form onSubmit={handleSave}>
                            <div>
                                <label className="text-sm font-medium text-gray-600">Route</label>
                                <select className="w-full mt-1 p-2 border border-gray-200 rounded-lg bg-gray-50" value={`${selectedSchedule.route.from} > ${selectedSchedule.route.to}`}>
                                    <option>Kigali &gt; Rubavu</option>
                                    <option>Kigali &gt; Huye</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-600">Bus</label>
                                <select value={selectedSchedule.bus.id} onChange={e => setSelectedSchedule({...selectedSchedule, bus: OPERATOR_BUSES.find(b => b.id === e.target.value)!})} className="w-full mt-1 p-2 border border-gray-200 rounded-lg bg-gray-50">
                                    {OPERATOR_BUSES.map(bus => <option key={bus.id} value={bus.id}>{bus.plateNumber} ({bus.model})</option>)}
                                </select>
                            </div>
                             <div>
                                <label className="text-sm font-medium text-gray-600">Departure Time</label>
                                <input type="time" value={selectedSchedule.departureTime.split(' ')[0]} onChange={e => setSelectedSchedule({...selectedSchedule, departureTime: `${e.target.value} AM`})} className="w-full mt-1 p-2 border border-gray-200 rounded-lg bg-gray-50" />
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