import React, { useContext } from 'react';
import { AppContext } from '../App';

export const LiveTrackingPage: React.FC = () => {
    const { selectedRoute, setPage } = useContext(AppContext);

    if (!selectedRoute) {
        return <div className="p-8 text-center">No route selected for tracking. Please go back.</div>;
    }

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Live Bus Tracking</h1>
            <div className="w-20 h-1 bg-orange-500 rounded-full mb-8"></div>

            <div className="grid lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2 bg-white p-4 rounded-2xl shadow-md">
                    <div className="relative rounded-lg overflow-hidden">
                        <img src="https://i.imgur.com/gK2D3fU.png" alt="Map of Kigali" className="w-full h-auto object-cover"/>
                        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-green-500 rounded-full ring-4 ring-white/50" title="Departure: Nyabugogo"></div>
                        <div className="absolute bottom-1/3 right-1/4 w-4 h-4 bg-red-500 rounded-full ring-4 ring-white/50" title={`Destination: ${selectedRoute.to}`}></div>
                        
                        {/* Animated Bus Icon */}
                        <div className="absolute bus-animation" style={{ top: '25%', left: '25%' }}>
                            <div className="w-8 h-8 flex items-center justify-center bg-orange-500 text-white font-bold rounded-full text-sm shadow-lg border-2 border-white">
                                BUS
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-md space-y-4 sticky top-28">
                     <h3 className="font-bold text-lg text-gray-800">Trip Details</h3>
                     <div className="flex items-center">
                        <div className="w-12 h-12 flex-shrink-0">{selectedRoute.operator.logo}</div>
                        <span className="ml-3 font-bold text-gray-800">{selectedRoute.operator.name}</span>
                    </div>
                    <p><span className="font-semibold">ROUTE:</span> {selectedRoute.from} &gt; {selectedRoute.to}</p>
                    <p><span className="font-semibold">STATUS:</span> <span className="text-green-600 font-bold">En Route</span></p>
                    <div className="border-t my-4"></div>
                    <p className="font-bold text-xl text-gray-800">Est. Arrival Time: <span className="text-orange-600">{selectedRoute.arrivalTime}</span></p>
                    <p className="text-sm text-gray-500">Last updated: 1 minute ago</p>

                    <button onClick={() => setPage('MY_TICKETS')} className="w-full mt-4 py-3 bg-gray-800 text-white font-bold rounded-lg hover:bg-black">
                        Back to My Tickets
                    </button>
                </div>
            </div>

            <style>{`
                @keyframes moveBus {
                    0% { top: 25%; left: 25%; transform: rotate(45deg); }
                    100% { top: 66.6%; left: 75%; transform: rotate(45deg); }
                }
                .bus-animation {
                    animation: moveBus 30s linear infinite alternate;
                }
            `}</style>
        </div>
    );
};