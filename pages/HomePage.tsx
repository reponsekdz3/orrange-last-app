import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../App';
import { OPERATORS } from '../constants';

const FeatureModal: React.FC<{
  content: { title: string; description: string; icon: React.ReactNode };
  onClose: () => void;
}> = ({ content, onClose }) => (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
        <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-lg w-full transform transition-all animate-fade-in" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                    <div className="mx-auto bg-orange-100 text-orange-600 w-16 h-16 rounded-full flex items-center justify-center mr-4">
                        {content.icon}
                    </div>
                    <h3 className="font-bold text-2xl text-gray-800">{content.title}</h3>
                </div>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-3xl">&times;</button>
            </div>
            <p className="text-gray-600">{content.description}</p>
        </div>
        <style>{`
            @keyframes fade-in {
                from { opacity: 0; transform: scale(0.95); }
                to { opacity: 1; transform: scale(1); }
            }
            .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
        `}</style>
    </div>
);

const FeatureCard: React.FC<{
    title: string;
    description: string;
    icon: React.ReactNode;
    onLearnMore: () => void;
}> = ({ title, description, icon, onLearnMore }) => (
    <div className="group perspective h-64">
        <div className="relative preserve-3d group-hover:rotate-y-180 w-full h-full duration-500">
            {/* Card Front */}
            <div className="absolute backface-hidden w-full h-full bg-white p-6 rounded-2xl shadow-md text-center flex flex-col items-center justify-center">
                <div className="mx-auto bg-orange-100 text-orange-600 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    {icon}
                </div>
                <h3 className="font-bold text-lg text-gray-800">{title}</h3>
            </div>
            {/* Card Back */}
            <div className="absolute rotate-y-180 backface-hidden w-full h-full bg-white p-6 rounded-2xl shadow-lg text-center flex flex-col items-center justify-center">
                <p className="text-gray-600 text-sm flex-grow mb-4">{description}</p>
                <button onClick={onLearnMore} className="mt-auto px-4 py-2 text-sm font-semibold text-orange-600 bg-orange-100 rounded-full hover:bg-orange-200 transition-colors">
                    Learn More
                </button>
            </div>
        </div>
    </div>
);


const DestinationCard: React.FC<{ imageUrl: string; name: string; description: string }> = ({ imageUrl, name, description }) => (
    <div className="group rounded-2xl overflow-hidden shadow-lg relative transform hover:scale-105 transition-transform duration-300">
        <img src={imageUrl} alt={name} className="w-full h-80 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent group-hover:from-black/90 transition-all"></div>
        <div className="absolute bottom-0 left-0 p-6">
            <h3 className="text-2xl font-bold text-white mb-1">{name}</h3>
            <p className="text-orange-200 text-sm">{description}</p>
        </div>
    </div>
);


export const HomePage: React.FC = () => {
    const { setPage } = useContext(AppContext);

    const staticImage = "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069&auto=format&fit=crop";
    
    const [headline, setHeadline] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(150);
    const [modalContent, setModalContent] = useState<{ title: string; description: string; icon: React.ReactNode } | null>(null);

    const headlines = React.useMemo(() => ["Your Journey, Simplified.", "Discover Rwanda by Bus.", "Safe & Reliable Travel."], []);
    
    const features = [
        { 
            title: "Easy Booking", 
            description: "Find and book your bus ticket in just a few clicks.", 
            longDescription: "Our streamlined booking process is designed for your convenience. From the homepage, enter your departure and destination, choose from a list of trusted operators, select your preferred seat on our interactive map, and pay securely. Your e-ticket is generated instantly. No queues, no hassle.",
            icon: <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" /></svg>
        },
         { 
            title: "Secure Payments", 
            description: "Pay securely with credit card, mobile money, or your in-app wallet.", 
            longDescription: "We prioritize your security. Our payment gateway is encrypted and supports multiple payment methods, including all major credit cards, MTN Mobile Money, and Airtel Money. For added convenience, top up your in-app wallet for lightning-fast, one-click payments on future bookings.",
            icon: <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
        },
         { 
            title: "24/7 Support", 
            description: "Our dedicated team is ready to help you anytime, anywhere.", 
            longDescription: "Travel with peace of mind knowing our support team is available around the clock. Whether you have a question about your booking, need help with a payment, or require assistance during your journey, you can reach us via our in-app help center, email, or our 24/7 hotline. We're here for you every step of the way.",
            icon: <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
        }
    ];

    useEffect(() => {
        const tick = () => {
            const i = loopNum % headlines.length;
            const fullText = headlines[i];
            const updatedText = isDeleting
                ? fullText.substring(0, headline.length - 1)
                : fullText.substring(0, headline.length + 1);

            setHeadline(updatedText);

            if (isDeleting) {
                setTypingSpeed(75);
            }

            if (!isDeleting && updatedText === fullText) {
                setIsDeleting(true);
                setTypingSpeed(2000); // Pause at end
            } else if (isDeleting && updatedText === '') {
                setIsDeleting(false);
                setLoopNum(loopNum + 1);
                setTypingSpeed(150);
            }
        };
        
        const ticker = setTimeout(tick, typingSpeed);
        return () => clearTimeout(ticker);

    }, [headline, isDeleting, loopNum, typingSpeed, headlines]);

    return (
        <>
            <style>{`
                .perspective { perspective: 1000px; }
                .preserve-3d { transform-style: preserve-3d; }
                .backface-hidden { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
                .rotate-y-180 { transform: rotateY(180deg); }
                .text-shadow { text-shadow: 0 2px 4px rgba(0,0,0,0.5); }
            `}</style>

            {modalContent && <FeatureModal content={{...modalContent, description: features.find(f => f.title === modalContent.title)?.longDescription || ''}} onClose={() => setModalContent(null)} />}

            <section className="relative h-[60vh] md:h-[70vh] text-white text-center flex flex-col justify-center">
                 <div className="absolute inset-0 w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${staticImage})` }}></div>
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                 <div className="relative z-10 p-4">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight text-shadow h-16">{headline}<span className="animate-pulse">|</span></h1>
                    <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-shadow">Book bus tickets across Rwanda with ease. Safe, reliable, and convenient travel at your fingertips.</p>
                     <button 
                        onClick={() => setPage('FIND_BUS')} 
                        className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-full text-lg hover:from-orange-600 hover:to-orange-700 transition-all transform hover:scale-105 shadow-lg"
                     >
                        Find Your Bus Now
                    </button>
                </div>
            </section>
            
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
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">How It Works</h2>
                    <p className="text-gray-600 mb-2 max-w-2xl mx-auto">Booking your bus ticket is as easy as 1-2-3. Follow these simple steps to get on your way.</p>
                    <div className="w-20 h-1 bg-orange-500 rounded-full mx-auto mb-12"></div>
                    <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        <div className="text-center">
                            <div className="mx-auto bg-orange-100 text-orange-600 w-20 h-20 rounded-full flex items-center justify-center mb-4"><span className="font-bold text-2xl">1</span></div>
                            <h3 className="font-bold text-lg text-gray-800 mb-2">Search Your Route</h3>
                            <p className="text-gray-600 text-sm">Enter your departure, destination, and travel date to find available buses.</p>
                        </div>
                         <div className="text-center">
                            <div className="mx-auto bg-orange-100 text-orange-600 w-20 h-20 rounded-full flex items-center justify-center mb-4"><span className="font-bold text-2xl">2</span></div>
                            <h3 className="font-bold text-lg text-gray-800 mb-2">Select & Pay</h3>
                            <p className="text-gray-600 text-sm">Choose your bus, select your preferred seat, and pay securely online.</p>
                        </div>
                         <div className="text-center">
                            <div className="mx-auto bg-orange-100 text-orange-600 w-20 h-20 rounded-full flex items-center justify-center mb-4"><span className="font-bold text-2xl">3</span></div>
                            <h3 className="font-bold text-lg text-gray-800 mb-2">Travel with Ease</h3>
                            <p className="text-gray-600 text-sm">Receive your e-ticket instantly and get ready for a comfortable journey.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-gradient-to-b from-white to-orange-50/30">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">Why Choose Bus Rwanda?</h2>
                    <div className="w-20 h-1 bg-orange-500 rounded-full mx-auto mb-12"></div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {features.map(feature => (
                             <FeatureCard 
                                key={feature.title}
                                title={feature.title}
                                description={feature.description}
                                icon={feature.icon}
                                onLearnMore={() => setModalContent(feature)}
                            />
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16 bg-gradient-to-b from-orange-50/30 to-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">Popular Destinations</h2>
                    <div className="w-20 h-1 bg-orange-500 rounded-full mx-auto mb-12"></div>
                    <div className="grid md:grid-cols-3 gap-8">
                       <DestinationCard imageUrl="https://images.unsplash.com/photo-1605640228352-a3f7a264e104?q=80&w=2070&auto=format&fit=crop" name="Rubavu" description="Lakeside relaxation" />
                       <DestinationCard imageUrl="https://images.unsplash.com/photo-1590425499238-0ed4b1b4898b?q=80&w=1974&auto=format&fit=crop" name="Musanze" description="Gateway to the gorillas" />
                       <DestinationCard imageUrl="https://upload.wikimedia.org/wikipedia/commons/2/2c/Huye_%28Butare%29%2C_Rwanda._%2834015611684%29.jpg" name="Huye" description="The heart of culture" />
                    </div>
                </div>
            </section>
            
            <section className="py-16 bg-orange-50/50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">What Our Riders Say</h2>
                    <div className="w-20 h-1 bg-orange-500 rounded-full mx-auto mb-12"></div>
                     <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <div className="bg-white p-6 rounded-2xl shadow-md">
                            <p className="text-gray-600 italic mb-4">"Booking with Bus Rwanda was incredibly easy and fast. The bus was clean, comfortable, and arrived on time. Highly recommended for traveling across the country!"</p>
                            <p className="font-bold text-gray-800">- Aline U.</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-md">
                           <p className="text-gray-600 italic mb-4">"I use this app for all my business trips from Kigali to Musanze. The wallet feature is a lifesaver, and the service is always reliable. Excellent app!"</p>
                            <p className="font-bold text-gray-800">- Mark K.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">Our Trusted Partners</h2>
                    <div className="w-20 h-1 bg-orange-500 rounded-full mx-auto mb-12"></div>
                    <div className="flex justify-center items-center gap-12 flex-wrap">
                        {OPERATORS.map(op => (
                            <div key={op.id} className="flex flex-col items-center text-center group">
                                {op.logo}
                                <p className="mt-2 font-semibold text-gray-600 group-hover:text-orange-600 transition-colors">{op.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};