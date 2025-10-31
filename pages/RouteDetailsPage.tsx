
import React from 'react';
import { Page } from '../types';

const CheckIcon = () => (
    <svg className="w-5 h-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
);

export const RouteDetailsPage: React.FC<{ setPage: (page: Page) => void }> = ({ setPage }) => {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Route Details & Stops</h1>
            <div className="w-20 h-1 bg-orange-500 rounded-full mb-8"></div>
            
            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white p-4 rounded-2xl shadow-md">
                        <img src="https://picsum.photos/800/400?random=1" alt="Route Map" className="rounded-xl object-cover w-full h-64" />
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-md">
                        <h3 className="font-bold text-lg mb-4 text-gray-800">Stops & Schedule</h3>
                        <ol className="relative border-l border-gray-200 space-y-6">                  
                            <li className="ml-4">
                                <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white"></div>
                                <p className="font-semibold text-gray-800">1. Kigali <span className="font-normal text-gray-500">(Departure: 07:00 AM)</span></p>
                            </li>
                            <li className="ml-4">
                                <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white"></div>
                                <p className="font-semibold text-gray-800">2. Muhanga <span className="font-normal text-gray-500">(08:00 AM)</span></p>
                                <p className="text-sm text-gray-500">Est. arrival: 08:30 AM</p>
                            </li>
                            <li className="ml-4">
                               <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white"></div>
                                <p className="font-semibold text-gray-800">3. Karongi <span className="font-normal text-gray-500">(09:30 AM)</span></p>
                            </li>
                             <li className="ml-4">
                                <div className="absolute w-3 h-3 bg-orange-500 rounded-full mt-1.5 -left-1.5 border border-white"></div>
                                <p className="font-semibold text-gray-800">4. Rubavu <span className="font-normal text-gray-500">(Arrival: 11:00 AM)</span></p>
                            </li>
                        </ol>
                    </div>
                </div>
                <div className="space-y-8">
                    <div className="bg-white p-6 rounded-2xl shadow-md">
                        <h3 className="font-bold text-lg mb-4 text-gray-800">Bus Amenities & Reviews</h3>
                        <div className="space-y-3">
                            <div className="flex items-center"><CheckIcon /><span className="ml-2 text-gray-700">Free WiFi</span></div>
                            <div className="flex items-center"><CheckIcon /><span className="ml-2 text-gray-700">Air Conditioning</span></div>
                            <div className="flex items-center"><CheckIcon /><span className="ml-2 text-gray-700">Reclining Seats</span></div>
                            <div className="flex items-center"><CheckIcon /><span className="ml-2 text-gray-700">Power Outlets</span></div>
                        </div>
                        <div className="mt-6 border-t pt-4">
                            <h4 className="font-semibold text-sm text-gray-600 mb-2">CUSTOMER REVIEWS</h4>
                            <p className="text-sm text-gray-600 italic">"Great trip! Comfortable, clean, and friendly driver." - John D.</p>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-md">
                        <h3 className="font-bold text-lg mb-4 text-gray-800">Operator Information</h3>
                        <p className="text-gray-700">Fleet Size: 35</p>
                        <p className="text-gray-700">Avg Rating: 4.5 / 5</p>
                        <button 
                          onClick={() => setPage('SEAT_SELECTION')}
                          className="w-full mt-6 py-3 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center">
                            Select Seats
                            <svg className="w-5 h-5 ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
