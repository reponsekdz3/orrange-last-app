import React, { useContext } from 'react';
import { AppContext } from '../App';
import { ImageSlider } from '../components/ImageSlider';

const FeatureCard: React.FC<{ title: string; description: string; icon: React.ReactNode }> = ({ title, description, icon }) => (
    <div className="bg-white p-6 rounded-2xl shadow-md text-center transform hover:-translate-y-2 transition-transform duration-300">
        <div className="mx-auto bg-orange-100 text-orange-600 w-16 h-16 rounded-full flex items-center justify-center mb-4">
            {icon}
        </div>
        <h3 className="font-bold text-lg text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
    </div>
);


export const HomePage: React.FC = () => {
    const { setPage } = useContext(AppContext);

    const sliderImages = [
        "https://images.unsplash.com/photo-1618472647395-57428801d1c1?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1590184402379-3d44a2826978?q=80&w=1974&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069&auto=format&fit=crop",
    ];

    return (
        <>
            <section className="relative h-[60vh] md:h-[70vh] text-white text-center flex flex-col justify-center">
                <ImageSlider images={sliderImages}>
                    <div className="relative z-10 p-4">
                        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight text-shadow">Your Journey, Simplified.</h1>
                        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-shadow">Book bus tickets across Rwanda with ease. Safe, reliable, and convenient travel at your fingertips.</p>
                         <button onClick={() => setPage('FIND_BUS')} className="px-8 py-4 bg-white text-orange-600 font-bold rounded-full text-lg hover:bg-orange-100 transition-colors transform hover:scale-105">
                            Find Your Bus Now
                        </button>
                    </div>
                </ImageSlider>
            </section>
            
            <style>{`.text-shadow { text-shadow: 0 2px 4px rgba(0,0,0,0.5); }`}</style>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white/80 backdrop-blur-lg max-w-5xl mx-auto rounded-3xl p-6 shadow-lg -mt-24 z-10 relative">
                    <div className="grid md:grid-cols-3 gap-4 items-end">
                        <div>
                            <label className="text-sm font-medium text-gray-600">Departure</label>
                            <input type="text" placeholder="e.g. Kigali" className="w-full mt-1 p-3 border border-gray-200 rounded-lg bg-gray-50 focus:ring-orange-500 focus:border-orange-500"/>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-600">Destination</label>
                            <input type="text" placeholder="e.g. Rubavu" className="w-full mt-1 p-3 border border-gray-200 rounded-lg bg-gray-50 focus:ring-orange-500 focus:border-orange-500"/>
                        </div>
                        <button onClick={() => setPage('FIND_BUS')} className="w-full py-3 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition-colors">Search Buses</button>
                    </div>
                </div>
            </div>

            <section className="py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">Why Choose Bus Rwanda?</h2>
                    <div className="w-20 h-1 bg-orange-500 rounded-full mx-auto mb-12"></div>
                    <div className="grid md:grid-cols-3 gap-8">
                        <FeatureCard 
                            title="Easy Booking" 
                            description="Find and book your bus ticket in just a few clicks." 
                            icon={<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" /></svg>}
                        />
                         <FeatureCard 
                            title="Secure Payments" 
                            description="Pay securely with credit card or mobile money." 
                            icon={<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>}
                        />
                         <FeatureCard 
                            title="24/7 Support" 
                            description="Our team is ready to help you anytime, anywhere." 
                            icon={<svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>}
                        />
                    </div>
                </div>
            </section>
        </>
    );
};