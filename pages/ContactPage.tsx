import React, { useState, useContext } from 'react';
import { AppContext } from '../App';

export const ContactPage: React.FC = () => {
    const { showToast } = useContext(AppContext);
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Basic validation
        if (!formData.name || !formData.email || !formData.message) {
            showToast('Please fill in all required fields.', 'error');
            return;
        }
        console.log('Form submitted:', formData);
        showToast('Your message has been sent successfully!', 'success');
        setFormData({ name: '', email: '', phone: '', message: '' });
    };

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Contact Us</h1>

            <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                <div className="bg-white p-8 rounded-2xl shadow-md">
                    <h3 className="font-bold text-xl mb-6 text-gray-800">Send Us a Message</h3>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label className="text-sm font-medium text-gray-600">Full Name</label>
                            <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} className="w-full mt-1 p-3 border border-gray-200 rounded-lg bg-gray-50 focus:ring-orange-500 focus:border-orange-500"/>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-600">Email Address</label>
                            <input type="email" name="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} className="w-full mt-1 p-3 border border-gray-200 rounded-lg bg-gray-50 focus:ring-orange-500 focus:border-orange-500"/>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-600">Phone Number</label>
                            <input type="tel" name="phone" placeholder="+250..." value={formData.phone} onChange={handleChange} className="w-full mt-1 p-3 border border-gray-200 rounded-lg bg-gray-50 focus:ring-orange-500 focus:border-orange-500"/>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-600">Your Message</label>
                            <textarea name="message" rows={4} placeholder="How can we help?" value={formData.message} onChange={handleChange} className="w-full mt-1 p-3 border border-gray-200 rounded-lg bg-gray-50 focus:ring-orange-500 focus:border-orange-500"/>
                        </div>
                        <button type="submit" className="w-full py-3 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition-colors">
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
                           <a href="https://www.google.com/maps/place/Kigali+City+Tower" target="_blank" rel="noopener noreferrer">
                                <img src="https://i.imgur.com/gK2D3fU.png" alt="Map" className="w-full h-full object-cover"/>
                           </a>
                        </div>
                        <div className="space-y-3 pt-4">
                            <a href="tel:+250788000000" className="flex items-center text-gray-700 hover:text-orange-600 group">
                                <span className="font-semibold group-hover:underline">+250 788 000 000</span>
                            </a>
                            <a href="tel:+250722000000" className="flex items-center text-gray-700 hover:text-orange-600 group">
                                <span className="font-semibold group-hover:underline">+250 722 000 000</span>
                            </a>
                            <a href="mailto:info@busrwanda.com" className="flex items-center text-gray-700 hover:text-orange-600 group">
                                <span className="font-semibold group-hover:underline">info@busrwanda.com</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};