import React, { useState, useContext } from 'react';
import { BusRoute, Page } from '../types';
import { BUS_ROUTES } from '../constants';
import { AppContext } from '../App';

const BusCard: React.FC<{ route: BusRoute; onBook: () => void; }> = ({ route, onBook }) => (
    <div className="bg-white p-5 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col">
        <div className="mb-4">{route.operator.logo}</div>
        <div className="mb-4">
            <p className="font-semibold text-gray-700">{route.from} &gt; {route.to}</p>
            <p className="text-sm text-gray-500">Departs: {route.departureTime}</p>
        </div>
        <div className="mt-auto flex justify-between items-center">
            <p className="font-bold text-lg text-orange-600">RWF {route.price.toLocaleString()}</p>
            <button onClick={onBook} className="px-6 py-2 bg-orange-500 text-white font-semibold rounded-full hover:bg-orange-600 transition-colors">
                Book Now
            </button>
        </div>
    </div>
);


export const HomePage: React.FC = () => {
    const [filter, setFilter] = useState('All');
    const { setPage, setSelectedRoute } = useContext(AppContext);
    
    const handleBookNow = (route: BusRoute) => {
        setSelectedRoute(route);
        setPage('SEAT_SELECTION');
    }

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white/80 backdrop-blur-lg max-w-4xl mx-auto rounded-3xl p-6 shadow-lg -mt-16 z-10 relative">
                <div className="relative">
                    <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input 
                        type="text" 
                        placeholder="Search for your journey... (e.g. Kigali to Rubavu)" 
                        onFocus={() => setPage('FIND_BUS')}
                        className="w-full h-14 pl-12 pr-32 rounded-full bg-gray-100 border-transparent focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2">
                        <button onClick={() => setPage('FIND_BUS')} className="p-2.5 rounded-full bg-orange-500 text-white shadow-sm hover:bg-orange-600">
                           <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex justify-center my-8 space-x-2">
                {['All', 'Popular Routes', 'Luxury', 'Budget'].map(f => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-6 py-2 rounded-full font-semibold transition-colors ${
                            filter === f ? 'bg-orange-500 text-white' : 'bg-white text-gray-700 hover:bg-orange-100'
                        }`}
                    >
                        {f}
                    </button>
                ))}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {BUS_ROUTES.slice(0,6).map(route => <BusCard key={route.id} route={route} onBook={() => handleBookNow(route)}/>)}
            </div>
        </div>
    );
};