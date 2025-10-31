import React, { useState, useContext } from 'react';
import { Page } from '../types';
import { AppContext } from '../App';

const Seat: React.FC<{ number?: string; status: 'available' | 'booked' | 'selected'; onClick: () => void }> = ({ number, status, onClick }) => {
    const baseClasses = "w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center font-bold text-xs cursor-pointer transition-all duration-200 transform hover:scale-105";
    
    let statusClasses = '';
    switch (status) {
        case 'available':
            statusClasses = 'bg-gray-200 text-gray-700 hover:bg-orange-200';
            break;
        case 'booked':
            statusClasses = 'bg-orange-200 text-orange-600 cursor-not-allowed relative overflow-hidden';
            break;
        case 'selected':
            statusClasses = 'bg-green-500 text-white shadow-lg ring-2 ring-white';
            break;
    }

    return (
        <div onClick={onClick} className={`${baseClasses} ${statusClasses}`}>
            {status === 'booked' && <div className="absolute w-full h-0.5 bg-orange-400 transform rotate-45"></div>}
            {number}
        </div>
    );
};


export const SeatSelectionPage: React.FC = () => {
    const { setPage, selectedRoute, booking, setBooking } = useContext(AppContext);
    
    if (!selectedRoute) {
        return <div className="p-8 text-center">No route selected. Please go back and select a route.</div>;
    }

    const [selectedSeats, setSelectedSeats] = useState<string[]>(booking.seats);
    
    const toggleSeat = (seatId: string) => {
        const isBooked = selectedRoute.seats.find(s => s.id === seatId)?.status === 'booked';
        if (isBooked) return;

        const newSelectedSeats = selectedSeats.includes(seatId) 
            ? selectedSeats.filter(s => s !== seatId) 
            : [...selectedSeats, seatId];
        
        setSelectedSeats(newSelectedSeats);
    };

    const handleProceed = () => {
        setBooking({ route: selectedRoute, seats: selectedSeats, totalPrice: selectedSeats.length * selectedRoute.price });
        setPage('PAYMENT');
    }

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Select Your Seat</h1>
            <div className="w-20 h-1 bg-orange-500 rounded-full mb-8"></div>
            
            <div className="grid lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-md flex justify-center">
                   <div className="bg-gray-100 p-4 sm:p-6 rounded-xl">
                        <div className="bg-gray-300 h-12 rounded-t-lg mb-6 flex items-center justify-center font-bold text-gray-600">FRONT</div>
                        <div className="grid grid-cols-4 gap-2 md:gap-4">
                            {selectedRoute.seats.map(seat => (
                                <Seat 
                                    key={seat.id}
                                    number={seat.id}
                                    status={selectedSeats.includes(seat.id) ? 'selected' : seat.status}
                                    onClick={() => toggleSeat(seat.id)}
                                />
                            ))}
                        </div>
                   </div>
                    <div className="flex flex-col justify-center space-y-4 ml-8">
                        <div className="flex items-center"><div className="w-5 h-5 rounded bg-gray-200 mr-2 border"></div><span className="text-sm">Available</span></div>
                        <div className="flex items-center"><div className="w-5 h-5 rounded bg-orange-200 mr-2 border relative"><div className="absolute w-full h-0.5 bg-orange-400 transform rotate-45 top-1/2 left-0"></div></div><span className="text-sm">Booked</span></div>
                        <div className="flex items-center"><div className="w-5 h-5 rounded bg-green-500 mr-2 border"></div><span className="text-sm">Selected</span></div>
                    </div>
                </div>
                
                <div className="bg-white p-6 rounded-2xl shadow-md self-start sticky top-28">
                    <h3 className="font-bold text-lg mb-4 text-gray-800">Booking Summary</h3>
                    <div className="flex items-center mb-4">
                        <div className="w-12 h-12">{selectedRoute.operator.logo}</div>
                        <span className="ml-3 font-bold text-gray-800">{selectedRoute.operator.name}</span>
                    </div>
                    <div className="space-y-2 text-gray-700">
                        <p><span className="font-semibold">ROUTE:</span> {selectedRoute.from} &gt; {selectedRoute.to}</p>
                        <p><span className="font-semibold">Date:</span> {new Date().toLocaleDateString()}</p>
                        <p><span className="font-semibold">Departure:</span> {selectedRoute.departureTime}</p>
                        <p><span className="font-semibold">Selected Seats:</span> <span className="font-bold text-orange-600">{selectedSeats.join(', ') || 'None'}</span></p>
                    </div>
                    <div className="border-t my-4"></div>
                    <p className="font-bold text-xl text-gray-800">Total Price: RWF {(selectedSeats.length * selectedRoute.price).toLocaleString()}</p>

                    <button 
                      onClick={handleProceed}
                      disabled={selectedSeats.length === 0}
                      className="w-full mt-6 py-3 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed">
                        Proceed to Payment
                    </button>
                </div>
            </div>
        </div>
    );
};