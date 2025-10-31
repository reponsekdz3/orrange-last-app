
import React, { useState } from 'react';
import { BusRoute, Page } from '../types';
import { BUS_ROUTES } from '../constants';

const BusCard: React.FC<{ route: BusRoute; onBook: () => void; }> = ({ route, onBook }) => (
    <div className="bg-white p-5 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col">
        <div className="flex items-center mb-4">
            <div className="mr-4">{route.operator.logo}</div>
            <h3 className="font-bold text-gray-800 text-lg">{route.operator.name}</h3>
        </div>
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


export const HomePage: React.FC<{ setPage: (page: Page) => void }> = ({ setPage }) => {
    const [filter, setFilter] = useState('All');
    
    const handleBookNow = () => {
        setPage('ROUTE_DETAILS');
    }

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white/80 backdrop-blur-lg max-w-4xl mx-auto rounded-3xl p-6 shadow-lg -mt-16 z-10 relative">
                <div className="relative">
                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input type="text" placeholder="Search for your journey..." className="w-full h-14 pl-10 pr-32 rounded-full bg-gray-100 border-transparent focus:ring-2 focus:ring-orange-500 focus:border-transparent"/>
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-2">
                        <button className="p-2.5 rounded-full bg-white shadow-sm">
                            <svg className="w-6 h-6 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                {BUS_ROUTES.map(route => <BusCard key={route.id} route={route} onBook={handleBookNow}/>)}
            </div>
        </div>
    );
};
