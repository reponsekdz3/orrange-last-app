import React, { useState, useEffect } from 'react';

interface ImageSliderProps {
    images: string[];
    children: React.ReactNode;
}

export const ImageSlider: React.FC<ImageSliderProps> = ({ images, children }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000); // Change image every 5 seconds
        return () => clearTimeout(timer);
    }, [currentIndex, images.length]);

    return (
        <div className="absolute inset-0 w-full h-full">
            {images.map((image, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                    style={{ backgroundImage: `url(${image})` }}
                />
            ))}
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="relative w-full h-full flex flex-col items-center justify-center">
                {children}
            </div>
        </div>
    );
};