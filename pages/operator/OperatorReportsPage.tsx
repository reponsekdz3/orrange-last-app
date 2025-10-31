import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Legend } from 'recharts';

const bookingTrendsData = [
  { name: 'Jan', Bookings: 120, Revenue: 2400 },
  { name: 'Feb', Bookings: 150, Revenue: 3000 },
  { name: 'Mar', Bookings: 170, Revenue: 2800 },
  { name: 'Apr', Bookings: 210, Revenue: 3500 },
  { name: 'May', Bookings: 300, Revenue: 4800 },
];

const revenueByRouteData = [
  { name: 'Kigali > Musanze', value: 400 },
  { name: 'Kigali > Rubavu', value: 300 },
  { name: 'Kigali > Huye', value: 300 },
];
const COLORS = ['#F97316', '#FB923C', '#FDBA74'];

const feedbackTrendsData = [
    { name: 'Service Quality', value: 250 },
    { name: 'Punctuality', value: 180 },
    { name: 'Bus Condition', value: 210 },
    { name: 'Driver Behavior', value: 150 },
];

const StatCard = ({ title, value, subtext }: { title: string; value: string; subtext: string }) => (
    <div className="bg-white p-6 rounded-2xl shadow-md text-center transform hover:-translate-y-1 transition-transform duration-300">
        <h3 className="text-sm font-semibold text-gray-500 uppercase">{title}</h3>
        <p className="text-4xl font-bold text-gray-800 my-2">{value}</p>
        <p className="text-xs text-gray-500">{subtext}</p>
    </div>
);

export const OperatorReportsPage: React.FC = () => {
    return (
        <main className="flex-1 p-6 sm:p-8">
             <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
                <h1 className="text-3xl font-bold text-gray-800">Reports & Analytics</h1>
                 <div className="flex items-center space-x-2">
                    <span className="font-semibold text-sm">Date Range:</span>
                    <input type="date" className="p-2 border border-gray-200 rounded-lg bg-gray-50 text-sm"/>
                    <span className="font-semibold text-sm">-</span>
                    <input type="date" className="p-2 border border-gray-200 rounded-lg bg-gray-50 text-sm"/>
                 </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <StatCard title="Total Revenue" value="RWF 45M" subtext="All time" />
                <StatCard title="Total Bookings" value="784" subtext="This month" />
                <StatCard title="Passenger Load Factor" value="78%" subtext="Average across all routes" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                 <div className="bg-white p-6 rounded-2xl shadow-md">
                    <h3 className="font-bold text-lg mb-4 text-gray-800">Booking Trends</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={bookingTrendsData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="Bookings" stroke="#F97316" activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                 <div className="bg-white p-6 rounded-2xl shadow-md">
                    <h3 className="font-bold text-lg mb-4 text-gray-800">Revenue by Route</h3>
                     <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie data={revenueByRouteData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#8884d8" paddingAngle={5} dataKey="value" label>
                                {revenueByRouteData.map((entry, index) => (<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />))}
                            </Pie>
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

             <div className="grid grid-cols-1 gap-8">
                <div className="bg-white p-6 rounded-2xl shadow-md">
                     <h3 className="font-bold text-lg mb-4 text-gray-800">Customer Feedback Trends</h3>
                      <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={feedbackTrendsData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value" fill="#FB923C" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
             </div>
        </main>
    );
};