
import React from 'react';
import { Ticket } from '../types';
import { USER_TICKETS } from '../constants';

const TicketCard: React.FC<{ ticket: Ticket }> = ({ ticket }) => (
    <div className="bg-white p-5 rounded-2xl shadow-md flex items-center justify-between">
        <div className="flex items-center">
            <div className="mr-4">{ticket.route.operator.logo}</div>
            <div>
                <p className="font-bold text-gray-800">{ticket.route.operator.name}</p>
                <p className="font-semibold text-gray-700">{ticket.route.from} &gt; {ticket.route.to}</p>
                <p className="text-sm text-gray-500">{ticket.date}</p>
            </div>
        </div>
        <div className="text-right">
            <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{ticket.status}</span>
            <button className="mt-2 px-4 py-2 bg-orange-500 text-white font-semibold rounded-full text-sm hover:bg-orange-600 transition-colors">
                View Receipt / Re-book
            </button>
        </div>
    </div>
);

export const MyTicketsPage: React.FC = () => {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Past Journeys</h1>
            <div className="w-20 h-1 bg-orange-500 rounded-full mb-8"></div>
            
            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    {USER_TICKETS.filter(t => t.status === 'COMPLETED').map(ticket => <TicketCard key={ticket.id} ticket={ticket} />)}
                </div>
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-2xl shadow-md">
                        <h3 className="font-bold text-lg mb-4 text-gray-800">Search & Filter History</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-gray-600">Route</label>
                                <select className="w-full mt-1 p-2 border border-gray-200 rounded-lg bg-gray-50 focus:ring-orange-500 focus:border-orange-500">
                                    <option>Kigali - Rubavu</option>
                                    <option>Kigali - Huye</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-600">Date Range</label>
                                <input type="date" className="w-full mt-1 p-2 border border-gray-200 rounded-lg bg-gray-50 focus:ring-orange-500 focus:border-orange-500" />
                            </div>
                             <div>
                                <label className="text-sm font-medium text-gray-600">Operator</label>
                                <select className="w-full mt-1 p-2 border border-gray-200 rounded-lg bg-gray-50 focus:ring-orange-500 focus:border-orange-500">
                                    <option>Onatracom</option>
                                    <option>Volcano Express</option>
                                    <option>Stella Express</option>
                                </select>
                            </div>
                            <button className="w-full py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors">
                                Apply Filters
                            </button>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-md">
                        <h3 className="font-bold text-lg mb-4 text-gray-800">Download Options</h3>
                        <div className="space-y-3">
                            <button className="w-full flex items-center justify-center py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors">
                                Download All Receipts (PDF)
                            </button>
                             <button className="w-full flex items-center justify-center py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors">
                                Export Data (CSV)
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
