import React from 'react';

export const ContactPage: React.FC = () => {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Contact Us</h1>

            <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                <div className="bg-white p-8 rounded-2xl shadow-md">
                    <h3 className="font-bold text-xl mb-6 text-gray-800">Send Us a Message</h3>
                    <form className="space-y-4">
                        <div>
                            <label className="text-sm font-medium text-gray-600">Full Name</label>
                            <input type="text" placeholder="Your Name" className="w-full mt-1 p-3 border border-gray-200 rounded-lg bg-gray-50 focus:ring-orange-500 focus:border-orange-500"/>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-600">Email Address</label>
                            <input type="email" placeholder="you@example.com" className="w-full mt-1 p-3 border border-gray-200 rounded-lg bg-gray-50 focus:ring-orange-500 focus:border-orange-500"/>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-600">Phone Number</label>
                            <input type="tel" placeholder="+250..." className="w-full mt-1 p-3 border border-gray-200 rounded-lg bg-gray-50 focus:ring-orange-500 focus:border-orange-500"/>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-600">Your Message</label>
                            <textarea rows={4} placeholder="How can we help?" className="w-full mt-1 p-3 border border-gray-200 rounded-lg bg-gray-50 focus:ring-orange-500 focus:border-orange-500"/>
                        </div>
                        <button className="w-full py-3 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition-colors">
                            Send Message
                        </button>
                    </form>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-md">
                    <h3 className="font-bold text-xl mb-6 text-gray-800">Our Information</h3>
                    <div className="space-y-4">
                        <p className="font-semibold text-gray-700">BUS RWANDA HQ</p>
                        <p className="text-gray-600">Kigali City Tower, KN 8 St, Kigali, Rwanda</p>
                        <div className="rounded-lg overflow-hidden h-48">
                           <img src="https://i.imgur.com/3Z7G5tG.png" alt="Map" className="w-full h-full object-cover"/>
                        </div>
                        <div className="space-y-3 pt-4">
                            <a href="tel:+250788000000" className="flex items-center text-gray-700 hover:text-orange-600">
                                <span className="font-semibold">+250 788 000 000</span>
                            </a>
                            <a href="tel:+250722000000" className="flex items-center text-gray-700 hover:text-orange-600">
                                <span className="font-semibold">+250 722 000 000</span>
                            </a>
                            <a href="mailto:info@busrwanda.com" className="flex items-center text-gray-700 hover:text-orange-600">
                                <span className="font-semibold">info@busrwanda.com</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};