import React from 'react';

const ServiceCard: React.FC<{ title: string; description: string; features: string[]; icon: React.ReactNode }> = ({ title, description, features, icon }) => (
    <div className="bg-white p-8 rounded-2xl shadow-lg text-center transform hover:-translate-y-2 transition-transform duration-300 flex flex-col">
        <div className="mx-auto bg-orange-100 text-orange-600 w-20 h-20 rounded-full flex items-center justify-center mb-6">
            {icon}
        </div>
        <h3 className="font-bold text-2xl text-gray-800 mb-3">{title}</h3>
        <p className="text-gray-600 text-base mb-6 flex-grow">{description}</p>
        <div className="border-t pt-4">
             <ul className="space-y-2 text-left">
                {features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                        <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        {feature}
                    </li>
                ))}
            </ul>
        </div>
    </div>
);

export const ServicesPage: React.FC = () => {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold text-gray-800 mb-3">Our Services</h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">We offer a range of bus services to cater to your comfort, budget, and travel needs across Rwanda.</p>
                <div className="w-24 h-1.5 bg-orange-500 rounded-full mx-auto mt-4"></div>
            </div>

            <div className="grid md:grid-cols-3 gap-10">
                <ServiceCard 
                    title="Express" 
                    description="The perfect balance of speed and comfort. Our Express buses are modern, reliable, and get you to your destination efficiently." 
                    features={['Direct Routes', 'Fewer Stops', 'Onboard WiFi', 'Comfortable Seating']}
                    icon={<svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
                />
                 <ServiceCard 
                    title="Luxury" 
                    description="Travel in ultimate comfort. Our Luxury coaches offer premium amenities for a first-class experience on the road." 
                    features={['Reclining Seats', 'Extra Legroom', 'Air Conditioning', 'Power Outlets', 'Priority Boarding']}
                    icon={<svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-12v4m-2-2h4m5 10v4m-2-2h4M5 3a2 2 0 00-2 2v1h16V5a2 2 0 00-2-2H5zM3 17a2 2 0 002 2h14a2 2 0 002-2v-5H3v5z" /></svg>}
                />
                 <ServiceCard 
                    title="Budget" 
                    description="The most affordable way to travel. Our Budget service is safe, dependable, and perfect for travelers looking for great value." 
                    features={['Most Affordable Fares', 'Standard Seating', 'Multiple Stops', 'Reliable Service']}
                    icon={<svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
                />
            </div>
        </div>
    );
};