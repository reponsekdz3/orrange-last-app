
import React, { useState } from 'react';
import { Page } from '../types';
import { OnatracomIcon } from '../constants';

const Seat: React.FC<{ number?: string; status: 'available' | 'booked' | 'selected'; onClick: () => void }> = ({ number, status, onClick }) => {
    const baseClasses = "w-10 h-10 md:w-12 md:h-12 rounded-md flex items-center justify-center font-bold text-sm cursor-pointer transition-colors";
    
    let statusClasses = '';
    switch (status) {
        case 'available':
            statusClasses = 'bg-gray-200 text-gray-600 hover:bg-orange-200';
            break;
        case 'booked':
            statusClasses = 'bg-orange-400 text-white cursor-not-allowed';
            break;
        case 'selected':
            statusClasses = 'bg-green-500 text-white';
            break;
    }

    return (
        <div onClick={onClick} className={`${baseClasses} ${statusClasses}`}>
            {number}
        </div>
    );
};


export const SeatSelectionPage: React.FC<{ setPage: (page: Page) => void }> = ({ setPage }) => {
    const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
    const seatPrice = 8500;
    
    const initialSeats = [
        { id: '1A', status: 'available' }, { id: '1B', status: 'available' }, { id: '1C', status: 'booked' }, { id: '1D', status: 'available' },
        { id: '2A', status: 'booked' }, { id: '2B', status: 'available' }, { id: '2C', status: 'available' }, { id: '2D', status: 'booked' },
        { id: '3A', status: 'available' }, { id: '3B', status: 'available' }, { id: '3C', status: 'available' }, { id: '3D', status: 'available' },
    ];
    
    const toggleSeat = (seatId: string) => {
        const isBooked = initialSeats.find(s => s.id === seatId)?.status === 'booked';
        if (isBooked) return;

        setSelectedSeats(prev => 
            prev.includes(seatId) ? prev.filter(s => s !== seatId) : [...prev, seatId]
        );
    };

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Select Your Seat</h1>
            <div className="w-20 h-1 bg-orange-500 rounded-full mb-8"></div>
            
            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-md">
                   <div className="bg-gray-100 p-4 rounded-xl mx-auto max-w-sm">
                        <div className="bg-gray-300 h-12 rounded-t-lg mb-6 flex items-center justify-center font-bold text-gray-600">FRONT</div>
                        <div className="grid grid-cols-4 gap-2 md:gap-4">
                            {initialSeats.map(seat => (
                                <Seat 
                                    key={seat.id}
                                    number={seat.id}
                                    status={selectedSeats.includes(seat.id) ? 'selected' : seat.status}
                                    onClick={() => toggleSeat(seat.id)}
                                />
                            ))}
                        </div>
                   </div>
                    <div className="flex justify-center space-x-6 mt-6">
                        <div className="flex items-center"><div className="w-4 h-4 rounded bg-gray-200 mr-2"></div><span className="text-sm">Available</span></div>
                        <div className="flex items-center"><div className="w-4 h-4 rounded bg-orange-400 mr-2"></div><span className="text-sm">Booked</span></div>
                        <div className="flex items-center"><div className="w-4 h-4 rounded bg-green-500 mr-2"></div><span className="text-sm">Selected</span></div>
                    </div>
                </div>
                
                <div className="bg-white p-6 rounded-2xl shadow-md self-start">
                    <h3 className="font-bold text-lg mb-4 text-gray-800">Booking Summary</h3>
                    <div className="flex items-center mb-4">
                        <OnatracomIcon className="w-12 h-12" />
                        <span className="ml-3 font-bold text-gray-800">ONATRACOM</span>
                    </div>
                    <div className="space-y-2 text-gray-700">
                        <p><span className="font-semibold">ROUTE:</span> Kigali &gt; Rubavu</p>
                        <p><span className="font-semibold">Date:</span> 2</p>
                        <p><span className="font-semibold">Departure:</span> 7:00 AM</p>
                        <p><span className="font-semibold">Selected Seats:</span> {selectedSeats.join(', ') || 'None'}</p>
                        <p><span className="font-semibold">TIME:</span> 7:20 AM - 8:00 AM</p>
                    </div>
                    <div className="border-t my-4"></div>
                    <p className="font-bold text-xl text-gray-800">Total Price: RWF {(selectedSeats.length * seatPrice).toLocaleString()}</p>

                    <button 
                      onClick={() => setPage('PAYMENT')}
                      disabled={selectedSeats.length === 0}
                      className="w-full mt-6 py-3 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed">
                        Proceed to Payment
                    </button>
                </div>
            </div>
        </div>
    );
};
