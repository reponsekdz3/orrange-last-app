import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const dailyRevenueData = [
  { name: 'Mon', Revenue: 4000 },
  { name: 'Tue', Revenue: 3000 },
  { name: 'Wed', Revenue: 2000 },
  { name: 'Thu', Revenue: 2780 },
  { name: 'Fri', Revenue: 1890 },
  { name: 'Sat', Revenue: 2390 },
  { name: 'Sun', Revenue: 3490 },
];

const occupancyData = [
  { name: 'KGL > RBV', value: 85 },
  { name: 'KGL > HYE', value: 92 },
  { name: 'KGL > MSZ', value: 75 },
  { name: 'Other', value: 68 },
];
const COLORS = ['#F97316', '#FB923C', '#FDBA74', '#FED7AA'];


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
                    <h3 className="font-bold text-lg mb-4 text-gray-800">Weekly Revenue</h3>
                    <div className="w-full h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={dailyRevenueData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
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
                    <h3 className="font-bold text-lg mb-4 text-gray-800">Bus Occupancy by Route (%)</h3>
                     <div className="w-full h-64">
                        <ResponsiveContainer width="100%" height="100%">
                           <PieChart>
                                <Pie data={occupancyData} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value" nameKey="name" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                                    {occupancyData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={(value) => `${value}%`} />
                            </PieChart>
                        </ResponsiveContainer>
                     </div>
                </div>
            </div>
        </main>
    );
};