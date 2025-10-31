
import React from 'react';
import { Page, Ticket } from '../types';
import { USER_TICKETS, OnatracomIcon } from '../constants';

const UpcomingTicketCard: React.FC<{ticket: Ticket, setPage: (page: Page) => void}> = ({ ticket, setPage }) => (
    <div className="bg-white p-4 rounded-2xl shadow-md">
        <div className="flex items-start justify-between">
            <div className="flex items-center">
                <div className="mr-3">{ticket.route.operator.logo}</div>
                <div>
                    <p className="font-bold text-gray-800">{ticket.route.operator.name}</p>
                    <p className="font-semibold text-gray-700 text-sm">ROUTE: {ticket.route.from} &gt; {ticket.route.to}</p>
                    <p className="text-xs text-gray-500">{ticket.date}</p>
                </div>
            </div>
            <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full">ACTIVE</span>
        </div>
        <button onClick={() => setPage('MY_TICKETS')} className="mt-3 w-full text-center text-sm font-semibold text-orange-600 bg-orange-100 py-2 rounded-lg hover:bg-orange-200">
            View Details
        </button>
    </div>
);


export const ConfirmationPage: React.FC<{ setPage: (page: Page) => void }> = ({ setPage }) => {
    const ticket = USER_TICKETS.find(t => t.status === 'ACTIVE');
    if (!ticket) return null; // Should not happen with mock data
    
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Booking Confirmation</h1>
            <div className="w-20 h-1 bg-orange-500 rounded-full mb-8"></div>

            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-md flex flex-col items-center">
                    <div className="bg-green-100 text-green-800 font-bold py-3 px-8 rounded-full mb-6">
                        SUCCESSFUL BOOKING!
                    </div>
                    <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=BusRwandaTicket123" alt="QR Code" className="w-48 h-48 mb-4"/>
                    <p className="text-gray-600 font-semibold mb-8">SCAN YOUR TICKET</p>

                    <div className="border-t border-dashed w-full my-4"></div>
                    
                    <h3 className="font-bold text-xl mb-4 text-gray-800">Ticket Summary</h3>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-left w-full max-w-md">
                        <div><span className="font-semibold text-gray-500 block">ROUTE:</span> {ticket.route.from} &gt; {ticket.route.to}</div>
                        <div><span className="font-semibold text-gray-500 block">DATE:</span> {ticket.date}</div>
                        <div><span className="font-semibold text-gray-500 block">DEPARTURE:</span> {ticket.route.departureTime}</div>
                        <div><span className="font-semibold text-gray-500 block">ARRIVAL:</span> {ticket.route.arrivalTime}</div>
                        <div><span className="font-semibold text-gray-500 block">PASSENGER:</span> {ticket.passengerName}</div>
                        <div><span className="font-semibold text-gray-500 block">SEATS:</span> {ticket.seats.join(', ')}</div>
                        <div><span className="font-bold text-gray-800 block text-lg">TOTAL PRICE:</span> RWF {ticket.totalPrice.toLocaleString()}</div>
                    </div>
                    
                    <div className="border-t border-dashed w-full my-8"></div>

                    <div className="w-full flex flex-col sm:flex-row gap-4">
                        <button className="flex-1 py-3 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600">Download Ticket (PDF)</button>
                        <button className="flex-1 py-3 bg-gray-800 text-white font-bold rounded-lg hover:bg-black">Add to Apple Wallet / Google Pay</button>
                    </div>
                </div>

                <div className="space-y-6">
                     <h3 className="font-bold text-xl mb-4 text-gray-800">My Upcoming Tickets</h3>
                     {USER_TICKETS.filter(t => t.status === 'ACTIVE').map(t => <UpcomingTicketCard key={t.id} ticket={t} setPage={setPage} />)}
                     <button onClick={() => setPage('MY_TICKETS')} className="w-full text-center font-semibold text-orange-600 hover:underline">
                        View Past Tickets
                     </button>
                </div>
            </div>
        </div>
    );
};
