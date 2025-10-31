import React, { useState, useContext } from 'react';
import { BusRoute, Page } from '../types';
import { BUS_ROUTES } from '../constants';
import { AppContext } from '../App';

const BusCard: React.FC<{ route: BusRoute; onBook: () => void; onViewDetails: () => void; }> = ({ route, onBook, onViewDetails }) => (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col group">
        <div 
            onClick={onViewDetails} 
            className="p-5 cursor-pointer flex-grow flex flex-col"
        >
            <div className="flex justify-between items-start mb-4">
                <div className="flex-grow">{route.operator.logo}</div>
                <div className="text-right">
                    <p className="font-bold text-lg text-orange-600">RWF {route.price.toLocaleString()}</p>
                    <p className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full inline-block mt-1">{route.type}</p>
                </div>
            </div>
            <div className="mb-4">
                <p className="font-semibold text-gray-700 group-hover:text-orange-600 transition-colors">{route.from} &gt; {route.to}</p>
                <p className="text-sm text-gray-500">ROUTE: {route.from} &gt; {route.to}</p>
                <p className="text-sm text-gray-500">TIME: {route.departureTime} - {route.arrivalTime} ({route.duration})</p>
            </div>
            <div className="mt-auto">
                 <div className="text-xs text-gray-500">
                    {route.amenities.slice(0, 2).join(', ')}
                </div>
            </div>
        </div>
        <div className="p-5 border-t border-gray-100">
            <button 
                onClick={(e) => { e.stopPropagation(); onBook(); }} 
                className="w-full px-6 py-2 bg-orange-500 text-white font-semibold rounded-full hover:bg-orange-600 transition-colors"
            >
                Select Seats
            </button>
        </div>
    </div>
);

export const FindBusPage: React.FC = () => {
    const { setPage, setSelectedRoute } = useContext(AppContext);
    
    const handleBookNow = (route: BusRoute) => {
        setSelectedRoute(route);
        setPage('SEAT_SELECTION');
    }

    const handleViewDetails = (route: BusRoute) => {
        setSelectedRoute(route);
        setPage('ROUTE_STOPS');
    }

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
             <div className="bg-white/80 backdrop-blur-lg max-w-5xl mx-auto rounded-3xl p-6 shadow-lg -mt-16 z-10 relative">
                <div className="grid md:grid-cols-3 gap-4 items-end">
                    <div>
                        <label className="text-sm font-medium text-gray-600">Departure</label>
                        <input type="text" placeholder="e.g. Kigali" defaultValue="Kigali" className="w-full mt-1 p-3 border border-gray-200 rounded-lg bg-gray-50 focus:ring-orange-500 focus:border-orange-500"/>
                    </div>
                     <div>
                        <label className="text-sm font-medium text-gray-600">Destination</label>
                        <input type="text" placeholder="e.g. Rubavu" className="w-full mt-1 p-3 border border-gray-200 rounded-lg bg-gray-50 focus:ring-orange-500 focus:border-orange-500"/>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-600">Date</label>
                        <input type="date" className="w-full mt-1 p-3 border border-gray-200 rounded-lg bg-gray-50 focus:ring-orange-500 focus:border-orange-500"/>
                    </div>
                </div>
                <div className="mt-4 pt-4 border-t">
                     <div className="flex flex-wrap items-center gap-4">
                         <span className="font-semibold">Bus Type:</span>
                         <div className="flex items-center gap-2">
                             <button className="px-4 py-1.5 text-sm rounded-full bg-orange-100 text-orange-700">Express</button>
                             <button className="px-4 py-1.5 text-sm rounded-full bg-white border">Luxury</button>
                             <button className="px-4 py-1.5 text-sm rounded-full bg-white border">Budget</button>
                         </div>
                         <span className="font-semibold ml-auto">Amenities:</span>
                         <span className="text-sm text-gray-600">AC, WiFi, Reclining Seats</span>
                     </div>
                </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 my-8">Available Buses (Kigali to All)</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {BUS_ROUTES.map(route => <BusCard key={route.id} route={route} onBook={() => handleBookNow(route)} onViewDetails={() => handleViewDetails(route)} />)}
            </div>
        </div>
    );
};