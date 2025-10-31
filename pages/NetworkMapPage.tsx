import React from 'react';
import { BUS_ROUTES } from '../constants';

export const NetworkMapPage: React.FC = () => {
    const uniqueRoutes = [...new Map(BUS_ROUTES.map(r => [`${r.from}-${r.to}`, r])).values()];

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Our Network</h1>
            <p className="text-gray-600 mb-8">Explore all the destinations we connect across Rwanda.</p>

            <div className="grid lg:grid-cols-3 gap-8 items-start">
                <main className="lg:col-span-2 bg-white p-4 rounded-2xl shadow-md">
                   <img src="https://i.imgur.com/5g2wFkZ.png" alt="Map of Rwanda Bus Routes" className="w-full h-auto object-cover rounded-lg"/>
                </main>
                <aside className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-md sticky top-28">
                    <h3 className="font-bold text-xl mb-4 text-gray-800">Popular Routes</h3>
                    <ul className="space-y-3">
                        {uniqueRoutes.slice(0, 10).map(route => (
                            <li key={route.id} className="text-gray-700 font-semibold hover:text-orange-600 cursor-pointer p-2 rounded-md hover:bg-orange-50 transition-colors">
                                {route.from} &rarr; {route.to}
                            </li>
                        ))}
                    </ul>
                </aside>
            </div>
        </div>
    );
};
