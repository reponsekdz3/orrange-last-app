import React, { useState } from 'react';
// FIX: Import `Feedback` type from `types.ts` instead of `constants.ts`.
import { USER_FEEDBACK } from '../constants';
import type { Feedback } from '../types';

const FeedbackCard: React.FC<{ item: Feedback }> = ({ item }) => (
    <div className="bg-white p-4 rounded-lg border border-gray-200 flex items-start space-x-4">
        <div className="flex-shrink-0">{item.icon}</div>
        <div>
            <p className="font-semibold text-gray-800">{item.type}: {item.description}</p>
            <p className="text-sm text-gray-500">{item.date}</p>
        </div>
    </div>
);

export const HelpPage: React.FC = () => {
    const [feedbackType, setFeedbackType] = useState<'problem' | 'idea' | 'general'>('problem');

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Feedback & Support</h1>

            <div className="flex justify-center mb-8 space-x-2">
                {['All', 'Express', 'Luxury', 'Budget'].map(f => (
                    <button key={f} className={`px-6 py-2 rounded-full font-semibold transition-colors ${ f === 'All' ? 'bg-orange-500 text-white' : 'bg-white text-gray-700 hover:bg-orange-100'}`}>
                        {f}
                    </button>
                ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                <div className="bg-white p-8 rounded-2xl shadow-md">
                    <h3 className="font-bold text-xl mb-6 text-gray-800">Submit Feedback</h3>
                    <form className="space-y-4">
                        <div>
                            <label className="text-sm font-medium text-gray-600">Select Booking</label>
                            <select className="w-full mt-1 p-3 border border-gray-200 rounded-lg bg-gray-50 focus:ring-orange-500 focus:border-orange-500">
                                <option>ONATRACOM - Kigali to Rubavu (2024-10-27)</option>
                                <option>STELLA EXPRESS - Kigali to Huye (2024-11-15)</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-600">Feedback Type</label>
                            <div className="flex flex-col space-y-2">
                                <label className="flex items-center"><input type="radio" name="feedbackType" checked={feedbackType === 'problem'} onChange={() => setFeedbackType('problem')} className="mr-2" /> Report a Problem</label>
                                <label className="flex items-center"><input type="radio" name="feedbackType" checked={feedbackType === 'idea'} onChange={() => setFeedbackType('idea')} className="mr-2" /> Share an Idea</label>
                                <label className="flex items-center"><input type="radio" name="feedbackType" checked={feedbackType === 'general'} onChange={() => setFeedbackType('general')} className="mr-2" /> General Feedback</label>
                            </div>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-600">Describe your problem or idea in detail...</label>
                            <textarea rows={4} className="w-full mt-1 p-3 border border-gray-200 rounded-lg bg-gray-50 focus:ring-orange-500 focus:border-orange-500"/>
                        </div>
                        <div className="py-2 px-4 bg-gray-100 rounded-lg text-center text-sm font-semibold text-gray-600 cursor-pointer hover:bg-gray-200">
                            Attach File(s)
                        </div>
                        <button type="submit" className="w-full py-3 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition-colors">
                            Submit Feedback
                        </button>
                    </form>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-md">
                    <h3 className="font-bold text-xl mb-6 text-gray-800">Your Feedback History</h3>
                    <div className="space-y-4">
                        {USER_FEEDBACK.map(item => <FeedbackCard key={item.id} item={item} />)}
                    </div>
                    <button className="w-full mt-6 text-center font-semibold text-orange-600 hover:underline">
                        View All Past Feedback
                    </button>
                </div>
            </div>
        </div>
    );
};