import React, { useContext } from 'react';
import { AppContext } from '../App';

export const RouteStopsPage: React.FC = () => {
    const { selectedRoute, setPage } = useContext(AppContext);

    if (!selectedRoute) {
        return <div className="p-8 text-center">No route selected. Please go back and select a route.</div>;
    }
    
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Route Details & Stops</h1>
            <p className="text-gray-600 mb-8">{selectedRoute.from} to {selectedRoute.to}</p>

            <div className="grid lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white p-6 rounded-2xl shadow-md">
                        <h3 className="font-bold text-lg mb-4 text-gray-800">Route Map</h3>
                        <div className="rounded-lg overflow-hidden h-64 bg-gray-200">
                             <img src="https://i.imgur.com/3Z7G5tG.png" alt="Map of route from Kigali to Rubavu" className="w-full h-full object-cover"/>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-md">
                        <h3 className="font-bold text-lg mb-4 text-gray-800">Stops & Schedule</h3>
                        <ul className="space-y-4">
                            {selectedRoute.stops.map((stop, index) => (
                                <li key={index} className="flex items-center space-x-4">
                                    <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-orange-100 text-orange-600 font-bold rounded-full">
                                        {index + 1}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-800">{stop.name}</p>
                                        <p className="text-sm text-gray-500">
                                            {index === 0 ? 'Departure' : index === selectedRoute.stops.length - 1 ? 'Arrival' : 'Est. Arrival'}: {stop.time}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="space-y-8 sticky top-28">
                    <div className="bg-white p-6 rounded-2xl shadow-md">
                        <h3 className="font-bold text-lg mb-4 text-gray-800">Bus Amenities & Reviews</h3>
                        <ul className="space-y-2 mb-4">
                            {selectedRoute.amenities.map(amenity => (
                                 <li key={amenity} className="flex items-center text-gray-700">
                                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                    {amenity}
                                </li>
                            ))}
                        </ul>
                        <div className="border-t pt-4">
                            <h4 className="font-semibold text-sm mb-2 text-gray-600">CUSTOMER REVIEWS</h4>
                            <div className="flex items-start space-x-3">
                                <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                                <p className="text-sm text-gray-600 italic">"Great trip! Comfortable seats and friendly driver." - John D.</p>
                            </div>
                        </div>
                    </div>
                     <div className="bg-white p-6 rounded-2xl shadow-md">
                        <h3 className="font-bold text-lg mb-4 text-gray-800">Operator Information</h3>
                         <div className="mb-4">{selectedRoute.operator.logo}</div>
                        <p className="text-sm text-gray-600">Fleet Size: 35</p>
                        <p className="text-sm text-gray-600 mb-4">Avg Rating: 4.5/5</p>
                        <button 
                            onClick={() => setPage('SEAT_SELECTION')}
                            className="w-full py-3 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition-colors">
                            Select Seats →
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
