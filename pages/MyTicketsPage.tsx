import React, { useState, useContext } from 'react';
import { Ticket } from '../types';
import { USER_TICKETS, OPERATORS, BUS_ROUTES } from '../constants';
import { AppContext } from '../App';

const Star: React.FC<{ filled: boolean, onClick: () => void }> = ({ filled, onClick }) => (
    <svg onClick={onClick} className={`w-8 h-8 cursor-pointer ${filled ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
);


const RatingModal: React.FC<{ ticket: Ticket; onClose: () => void; onRate: (ticketId: string, rating: number) => void; }> = ({ ticket, onClose, onRate }) => {
    const [rating, setRating] = useState(ticket.rating || 0);
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full">
                <h3 className="font-bold text-xl mb-2 text-gray-800">Rate Your Journey</h3>
                <p className="text-gray-600 mb-4">{ticket.route.from} to {ticket.route.to} on {ticket.date}</p>
                <div className="flex justify-center space-x-2 my-6">
                    {[1, 2, 3, 4, 5].map(star => <Star key={star} filled={star <= rating} onClick={() => setRating(star)} />)}
                </div>
                <div className="flex justify-end space-x-3">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300">Cancel</button>
                    <button onClick={() => { onRate(ticket.id, rating); onClose(); }} className="px-4 py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600">Submit</button>
                </div>
            </div>
        </div>
    );
};


const TicketCard: React.FC<{ ticket: Ticket; onRateClick: (ticket: Ticket) => void; }> = ({ ticket, onRateClick }) => {
    const { setPage, setSelectedRoute, setBooking } = useContext(AppContext);
    
    const handleBookAgain = () => {
        const route = BUS_ROUTES.find(r => r.id === ticket.route.id);
        if (route) {
            setSelectedRoute(route);
            setBooking({ route, seats: [], totalPrice: 0 });
            setPage('SEAT_SELECTION');
        }
    };
    
    const handleTrackBus = () => {
        setSelectedRoute(ticket.route);
        setPage('LIVE_TRACKING');
    }

    return (
        <div className="bg-white p-5 rounded-2xl shadow-md flex flex-col sm:flex-row items-start justify-between gap-4">
            <div className="flex items-center w-full sm:w-auto flex-grow">
                <div className="mr-4 w-12 h-12 flex-shrink-0">{ticket.route.operator.logo}</div>
                <div>
                    <p className="font-bold text-gray-800">{ticket.route.operator.name}</p>
                    <p className="font-semibold text-gray-700">{ticket.route.from} &gt; {ticket.route.to}</p>
                    <p className="text-sm text-gray-500">{ticket.date}</p>
                </div>
            </div>
            <div className="w-full sm:w-auto flex flex-col items-stretch sm:items-end gap-2 text-right">
                <span className={`text-xs font-semibold px-2 py-1 rounded-full self-end ${ticket.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>{ticket.status}</span>
                <div className="flex flex-row sm:flex-col lg:flex-row gap-2 mt-2 w-full">
                    {ticket.status === 'ACTIVE' ? (
                        <>
                            <button onClick={handleTrackBus} className="flex-1 px-3 py-2 bg-orange-500 text-white font-semibold rounded-full text-xs hover:bg-orange-600 transition-colors">Track Bus</button>
                            <button className="flex-1 px-3 py-2 bg-gray-100 text-gray-700 font-semibold rounded-full text-xs hover:bg-gray-200 transition-colors">Share</button>
                        </>
                    ) : (
                         <>
                            <button onClick={() => onRateClick(ticket)} className="flex-1 px-3 py-2 bg-gray-100 text-gray-700 font-semibold rounded-full text-xs hover:bg-gray-200 transition-colors">
                                {ticket.rating ? `Rated ${ticket.rating} ★` : 'Rate'}
                            </button>
                            <button onClick={handleBookAgain} className="flex-1 px-3 py-2 bg-orange-500 text-white font-semibold rounded-full text-xs hover:bg-orange-600 transition-colors">Book Again</button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};


export const MyTicketsPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
    const [tickets, setTickets] = useState<Ticket[]>(USER_TICKETS);
    const [ratingTicket, setRatingTicket] = useState<Ticket | null>(null);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    
    const upcomingTickets = tickets.filter(t => t.status === 'ACTIVE');
    const pastTickets = tickets.filter(t => {
        if (t.status !== 'COMPLETED') return false;
        if (!startDate || !endDate) return true;
        return t.date >= startDate && t.date <= endDate;
    });

    const handleRateTicket = (ticketId: string, rating: number) => {
        setTickets(tickets.map(t => t.id === ticketId ? { ...t, rating } : t));
    };

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {ratingTicket && <RatingModal ticket={ratingTicket} onClose={() => setRatingTicket(null)} onRate={handleRateTicket} />}

            <h1 className="text-3xl font-bold text-gray-800 mb-2">My Tickets</h1>
            <div className="w-20 h-1 bg-orange-500 rounded-full mb-8"></div>
            
            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <div className="flex border-b border-gray-200 mb-6">
                        <button onClick={() => setActiveTab('upcoming')} className={`py-2 px-4 font-semibold ${activeTab === 'upcoming' ? 'border-b-2 border-orange-500 text-orange-600' : 'text-gray-500'}`}>
                            Upcoming ({upcomingTickets.length})
                        </button>
                        <button onClick={() => setActiveTab('past')} className={`py-2 px-4 font-semibold ${activeTab === 'past' ? 'border-b-2 border-orange-500 text-orange-600' : 'text-gray-500'}`}>
                            Past Journeys ({pastTickets.length})
                        </button>
                    </div>

                    {activeTab === 'past' && (
                        <div className="bg-white p-4 rounded-xl shadow-sm mb-6 flex items-center gap-4">
                            <label className="font-semibold text-sm">Filter by date:</label>
                            <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="p-2 border rounded-lg bg-gray-50 text-sm"/>
                            <span className="text-gray-500">-</span>
                            <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="p-2 border rounded-lg bg-gray-50 text-sm"/>
                        </div>
                    )}

                     <div className="space-y-6">
                        {(activeTab === 'upcoming' ? upcomingTickets : pastTickets).map(ticket => <TicketCard key={ticket.id} ticket={ticket} onRateClick={setRatingTicket} />)}
                    </div>
                </div>
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-2xl shadow-md">
                        <h3 className="font-bold text-lg mb-4 text-gray-800">Filter History</h3>
                        <div className="space-y-4">
                             <div>
                                <label className="text-sm font-medium text-gray-600">Operator</label>
                                <select className="w-full mt-1 p-2 border border-gray-200 rounded-lg bg-gray-50 focus:ring-orange-500 focus:border-orange-500">
                                    <option>All Operators</option>
                                    {OPERATORS.map(op => <option key={op.id}>{op.name}</option>)}
                                </select>
                            </div>
                            <button className="w-full py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors">
                                Apply Filter
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