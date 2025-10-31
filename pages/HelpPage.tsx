
import React, { useState } from 'react';
import { FAQS } from '../constants';

const FaqItem: React.FC<{ faq: typeof FAQS[0]; index: number; isOpen: boolean; onClick: () => void; }> = ({ faq, index, isOpen, onClick }) => (
    <div className="border-b">
        <button onClick={onClick} className="w-full flex justify-between items-center text-left p-4">
            <div className="flex items-center">
                <span className="mr-4 flex-shrink-0 w-8 h-8 flex items-center justify-center bg-orange-100 text-orange-600 font-bold rounded-full">{index + 1}</span>
                <span className="font-semibold text-gray-800">{faq.question}</span>
            </div>
            <svg className={`w-5 h-5 text-gray-500 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
        </button>
        {isOpen && (
            <div className="p-4 pl-16 bg-gray-50">
                <p className="text-gray-600">{faq.answer}</p>
            </div>
        )}
    </div>
);

export const HelpPage: React.FC = () => {
    const [openFaq, setOpenFaq] = useState<number | null>(0);

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Help & Support</h1>
            
            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
                    <div className="bg-white rounded-2xl shadow-md">
                        {FAQS.map((faq, index) => (
                            <FaqItem 
                                key={index} 
                                faq={faq} 
                                index={index} 
                                isOpen={openFaq === index} 
                                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                            />
                        ))}
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-md self-start">
                    <h3 className="font-bold text-lg mb-4 text-gray-800 text-center">Contact Support</h3>
                    <div className="space-y-4">
                        <button className="w-full py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600">Start Live Chat</button>
                        <div className="text-center text-gray-500">or</div>
                        <div className="space-y-2">
                            <a href="tel:+258000000" className="flex items-center justify-center text-gray-700">Call: +258 000 000</a>
                            <a href="tel:+7788000000" className="flex items-center justify-center text-gray-700">Call: 7788 000 000</a>
                        </div>
                        <button className="w-full py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200">Submit a Support Ticket</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
