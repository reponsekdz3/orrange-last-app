import React, { useState, useRef, KeyboardEvent, ChangeEvent } from 'react';

interface TwoFactorAuthModalProps {
    onSuccess: () => void;
    onClose: () => void;
}

export const TwoFactorAuthModal: React.FC<TwoFactorAuthModalProps> = ({ onSuccess, onClose }) => {
    const [code, setCode] = useState<string[]>(Array(6).fill(''));
    const [error, setError] = useState('');
    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value;
        if (!/^\d*$/.test(value)) return;

        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);
        setError('');

        if (value && index < 5) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    const handleSubmit = () => {
        const fullCode = code.join('');
        if (fullCode !== '123456') { // Mock verification
            setError('Invalid code. Please try again.');
            setCode(Array(6).fill(''));
            inputsRef.current[0]?.focus();
        } else {
            onSuccess();
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
            <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-sm w-full">
                <h3 className="font-bold text-xl text-center text-gray-800 mb-2">Two-Factor Authentication</h3>
                <p className="text-gray-500 text-center mb-6">Enter the 6-digit code from your authenticator app.</p>

                <div className="flex justify-center space-x-2 my-4">
                    {code.map((digit, index) => (
                        <input
                            key={index}
                            ref={el => inputsRef.current[index] = el}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleChange(e, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            className={`w-10 h-12 text-center text-2xl font-bold rounded-lg border-2 ${error ? 'border-red-500' : 'border-gray-300 focus:border-orange-500'} focus:ring-0`}
                            autoFocus={index === 0}
                        />
                    ))}
                </div>

                {error && <p className="text-red-600 text-sm text-center mt-2">{error}</p>}

                <div className="flex justify-end space-x-3 mt-8">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300">Cancel</button>
                    <button onClick={handleSubmit} className="px-4 py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600">Verify</button>
                </div>
            </div>
        </div>
    );
};