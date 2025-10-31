import React, { useState } from 'react';

const faqData = [
    { 
        question: "How do I book a ticket?",
        answer: "To book a ticket, go to the 'Find Bus' page, select your departure and destination, choose a bus from the list, select your seat, and proceed to payment. It's that simple!"
    },
    { 
        question: "What payment methods are accepted?",
        answer: "We accept payments via Credit/Debit Cards and major Mobile Money providers in Rwanda. All transactions are secure."
    },
    { 
        question: "Can I cancel my ticket?",
        answer: "Ticket cancellation policies vary by operator. Please check the terms and conditions during booking or contact our support team for assistance with a specific booking."
    },
    { 
        question: "How do I view my past tickets?",
        answer: "If you have an account, you can log in and navigate to the 'My Tickets' page to see a history of all your upcoming and past journeys."
    },
    { 
        question: "I'm having trouble with my payment. What should I do?",
        answer: "If you encounter any payment issues, please double-check your card or mobile money details. If the problem persists, try a different payment method or contact our support team immediately for help."
    }
];

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => (
    <details className="bg-white p-6 rounded-2xl shadow-sm transition-all duration-300 open:shadow-lg open:ring-1 open:ring-orange-200 group">
        <summary className="font-bold text-lg text-gray-800 cursor-pointer list-none flex justify-between items-center group-hover:text-orange-600">
            {question}
            <span className="text-orange-500 transform transition-transform duration-300 group-open:rotate-180">
                 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </span>
        </summary>
        <p className="text-gray-600 mt-4">{answer}</p>
    </details>
);


export const HelpPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredFaqs = faqData.filter(faq => 
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">Help & Support</h1>
            <p className="text-gray-600 mb-8 text-center">Find answers to your questions and get help with our services.</p>
            
            <div className="max-w-3xl mx-auto mb-8">
                <div className="relative">
                    <input 
                        type="text"
                        placeholder="Search for questions..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-4 pl-12 border border-gray-200 rounded-full bg-white shadow-sm focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                    />
                    <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2 space-y-4">
                    {filteredFaqs.length > 0 ? (
                        filteredFaqs.map((faq, index) => <FAQItem key={index} {...faq} />)
                    ) : (
                        <div className="bg-white p-6 rounded-2xl text-center text-gray-500">
                            <p>No questions found matching your search.</p>
                        </div>
                    )}
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-md space-y-4 sticky top-28">
                    <h3 className="font-bold text-lg text-gray-800">Can't find an answer?</h3>
                    <p className="text-sm text-gray-600">Our support team is here to help you with any questions or issues.</p>
                    <button className="w-full py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors">Contact Support</button>
                    <div className="pt-2 text-center">
                        <p className="text-sm font-semibold">Or call us at:</p>
                        <a href="tel:+250788000000" className="text-orange-600 font-bold hover:underline">+250 788 000 000</a>
                    </div>
                </div>
            </div>
        </div>
    );
};