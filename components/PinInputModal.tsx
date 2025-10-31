import React, { useState, useRef, useContext, KeyboardEvent, ChangeEvent } from 'react';
import { AppContext } from '../App';

interface PinInputModalProps {
    title: string;
    onSuccess: (pin: string) => void;
    onClose: () => void;
}

export const PinInputModal: React.FC<PinInputModalProps> = ({ title, onSuccess, onClose }) => {
    const { verifyPin, showToast } = useContext(AppContext);
    const [pin, setPin] = useState<string[]>(Array(5).fill(''));
    const [error, setError] = useState('');
    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value;
        if (!/^\d*$/.test(value)) return; // Only allow digits

        const newPin = [...pin];
        newPin[index] = value;
        setPin(newPin);
        setError('');

        // Move to next input
        if (value && index < 4) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace' && !pin[index] && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    const handleSubmit = () => {
        const fullPin = pin.join('');
        if (fullPin.length !== 5) {
            setError('Please enter a 5-digit PIN.');
            return;
        }
        if (verifyPin(fullPin)) {
            onSuccess(fullPin);
        } else {
            setError('Incorrect PIN. Please try again.');
            setPin(Array(5).fill(''));
            inputsRef.current[0]?.focus();
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
            <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-sm w-full transform transition-all animate-fade-in">
                <h3 className="font-bold text-xl text-center text-gray-800 mb-2">{title}</h3>
                <p className="text-gray-500 text-center mb-6">For your security, please confirm your action.</p>

                <div className="flex justify-center space-x-2 my-4">
                    {pin.map((digit, index) => (
                        <input
                            key={index}
                            ref={el => inputsRef.current[index] = el}
                            type="password"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleChange(e, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            className={`w-12 h-14 text-center text-2xl font-bold rounded-lg border-2 transition-colors ${error ? 'border-red-500' : 'border-gray-300 focus:border-orange-500'} focus:ring-0`}
                            autoFocus={index === 0}
                        />
                    ))}
                </div>

                {error && <p className="text-red-600 text-sm text-center mt-2">{error}</p>}

                <div className="flex justify-end space-x-3 mt-8">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300">Cancel</button>
                    <button onClick={handleSubmit} className="px-4 py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600">Confirm</button>
                </div>
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
};
