import React from 'react';

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => (
    <details className="bg-white p-6 rounded-2xl shadow-sm transition-all duration-300 open:shadow-lg open:ring-1 open:ring-orange-200">
        <summary className="font-bold text-lg text-gray-800 cursor-pointer list-none flex justify-between items-center">
            {question}
            <span className="text-orange-500 transform transition-transform duration-300 detail-arrow">
                 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </span>
        </summary>
        <p className="text-gray-600 mt-4">{answer}</p>
    </details>
);


export const HelpPage: React.FC = () => {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">Help & Support</h1>
            <p className="text-gray-600 mb-8 text-center">Find answers to your questions and get help with our services.</p>

            <div className="max-w-3xl mx-auto space-y-4">
                <FAQItem 
                    question="How do I book a ticket?"
                    answer="To book a ticket, go to the 'Find Bus' page, select your departure and destination, choose a bus from the list, select your seat, and proceed to payment. It's that simple!"
                />
                 <FAQItem 
                    question="What payment methods are accepted?"
                    answer="We accept payments via Credit/Debit Cards and major Mobile Money providers in Rwanda. All transactions are secure."
                />
                 <FAQItem 
                    question="Can I cancel my ticket?"
                    answer="Ticket cancellation policies vary by operator. Please check the terms and conditions during booking or contact our support team for assistance with a specific booking."
                />
                 <FAQItem 
                    question="How do I view my past tickets?"
                    answer="If you have an account, you can log in and navigate to the 'My Tickets' page to see a history of all your upcoming and past journeys."
                />
                 <FAQItem 
                    question="I'm having trouble with my payment. What should I do?"
                    answer="If you encounter any payment issues, please double-check your card or mobile money details. If the problem persists, try a different payment method or contact our support team immediately for help."
                />
            </div>
             <style>{`
                details[open] .detail-arrow {
                    transform: rotate(180deg);
                }
            `}</style>
        </div>
    );
};
