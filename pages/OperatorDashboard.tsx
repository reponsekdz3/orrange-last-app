
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', Revenue: 4000 },
  { name: 'Tue', Revenue: 3000 },
  { name: 'Wed', Revenue: 2000 },
  { name: 'Thu', Revenue: 2780 },
  { name: 'Fri', Revenue: 1890 },
  { name: 'Sat', Revenue: 2390 },
  { name: 'Sun', Revenue: 3490 },
];


const StatCard: React.FC<{title: string; value: string; buttonText: string;}> = ({title, value, buttonText}) => (
    <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col">
        <h3 className="text-sm font-semibold text-gray-500 uppercase">{title}</h3>
        <p className="text-4xl font-bold text-gray-800 my-2">{value}</p>
        <button className="mt-auto self-start px-4 py-1.5 text-xs font-semibold text-orange-600 bg-orange-100 rounded-full hover:bg-orange-200">{buttonText}</button>
    </div>
);

export const OperatorDashboard: React.FC = () => {
    return (
        <main className="flex-1 p-6 sm:p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
            <div className="w-20 h-1 bg-orange-500 rounded-full mb-8"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <StatCard title="Total Bookings" value="1,834" buttonText="Add New Booking" />
                <StatCard title="Monthly Revenue" value="RWF 45M" buttonText="View Report" />
                <StatCard title="Active Routes" value="12" buttonText="Manage Routes" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-3 bg-white p-6 rounded-2xl shadow-md">
                    <h3 className="font-bold text-lg mb-4 text-gray-800">Revenue Analytics</h3>
                    <div className="w-full h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="name" tick={{fill: '#6b7280', fontSize: 12}} />
                            <YAxis tick={{fill: '#6b7280', fontSize: 12}} />
                            <Tooltip cursor={{fill: 'rgba(251, 146, 60, 0.2)'}}/>
                            <Bar dataKey="Revenue" fill="#F97316" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                    </div>
                </div>
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-md">
                    <h3 className="font-bold text-lg mb-4 text-gray-800">Manage Routes</h3>
                     <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-4 py-3">Route</th>
                                    <th scope="col" className="px-4 py-3">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-white border-b"><td className="px-4 py-3 font-medium text-gray-900">Kigali &gt; Rubavu</td><td className="px-4 py-3 text-green-500 font-semibold">Active</td></tr>
                                <tr className="bg-white border-b"><td className="px-4 py-3 font-medium text-gray-900">Kigali &gt; Huye</td><td className="px-4 py-3 text-green-500 font-semibold">Active</td></tr>
                                <tr className="bg-white border-b"><td className="px-4 py-3 font-medium text-gray-900">Kigali &gt; Musanze</td><td className="px-4 py-3 text-yellow-500 font-semibold">Pending</td></tr>
                                <tr className="bg-white"><td className="px-4 py-3 font-medium text-gray-900">Rubavu &gt; Huye</td><td className="px-4 py-3 text-red-500 font-semibold">Inactive</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </main>
    );
};
