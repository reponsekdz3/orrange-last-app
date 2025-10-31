
import React from 'react';
import { Operator, BusRoute, Ticket, FAQ } from './types';

export const VolcanoExpressIcon = ({ className = "w-24 h-auto" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 100 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 35 C 25 20, 30 20, 35 35" stroke="#F97316" strokeWidth="2" fill="none" />
        <path d="M30 35 Q 35 25, 40 35" stroke="#F97316" strokeWidth="2" fill="none" />
        <path d="M25 25 Q 27.5 20, 30 25" stroke="#F97316" strokeWidth="1" fill="none" />
        <text x="5" y="15" fontFamily="Arial, sans-serif" fontSize="10" fill="#2d3748" fontWeight="bold">VOLCANO</text>
        <text x="5" y="28" fontFamily="Arial, sans-serif" fontSize="8" fill="#F97316">EXPRESS</text>
    </svg>
);

export const OnatracomIcon = ({ className = "w-10 h-10" }: { className?: string }) => (
    <div className={`flex items-center justify-center rounded-full bg-orange-500 text-white ${className}`}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
    </div>
);

export const StellaExpressIcon = ({ className = "w-10 h-10 text-orange-500" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
);


export const OPERATORS: Operator[] = [
    { id: 'volcano', name: 'Volcano Express', logo: <VolcanoExpressIcon /> },
    { id: 'onatracom', name: 'Onatracom', logo: <OnatracomIcon /> },
    { id: 'stella', name: 'Stella Express', logo: <StellaExpressIcon /> },
];

export const BUS_ROUTES: BusRoute[] = [
    { id: '1', operator: OPERATORS[0], from: 'Kigali', to: 'Rubavu', departureTime: '07:00 AM', arrivalTime: '11:00 AM', duration: '4h', price: 7000, type: 'Luxury', amenities: ['AC', 'WiFi', 'Reclining Seats', 'Power Outlets'] },
    { id: '2', operator: OPERATORS[1], from: 'Kigali', to: 'Rubavu', departureTime: '06:30 AM', arrivalTime: '11:00 AM', duration: '4h 30m', price: 8500, type: 'Express', amenities: ['AC', 'WiFi'] },
    { id: '3', operator: OPERATORS[2], from: 'Kigali', to: 'Mubavu', departureTime: '08:00 AM', arrivalTime: '12:00 PM', duration: '4h', price: 9000, type: 'Luxury', amenities: ['AC', 'WiFi', 'Reclining Seats'] },
    { id: '4', operator: OPERATORS[1], from: 'Kigali', to: 'Huye', departureTime: '09:00 AM', arrivalTime: '11:30 AM', duration: '2h 30m', price: 4500, type: 'Express', amenities: ['AC'] },
    { id: '5', operator: OPERATORS[2], from: 'Kigali', to: 'Musanze', departureTime: '10:00 AM', arrivalTime: '12:00 PM', duration: '2h', price: 3500, type: 'Budget', amenities: [] },
];

export const USER_TICKETS: Ticket[] = [
    { id: 't1', route: BUS_ROUTES[1], passengerName: 'John Doe', date: '2024-03-10', seats: ['10A', '10B'], totalPrice: 17000, status: 'COMPLETED' },
    { id: 't2', route: BUS_ROUTES[3], passengerName: 'John Doe', date: '2024-01-25', seats: ['5C'], totalPrice: 4500, status: 'COMPLETED' },
    { id: 't3', route: BUS_ROUTES[2], passengerName: 'John Doe', date: '2024-01-25', seats: ['12A'], totalPrice: 9000, status: 'COMPLETED' },
    { id: 't4', route: BUS_ROUTES[0], passengerName: 'John Doe', date: '2024-10-27', seats: ['12A', '12B'], totalPrice: 14000, status: 'ACTIVE' },
    { id: 't5', route: BUS_ROUTES[1], passengerName: 'John Doe', date: '2024-11-15', seats: ['3D'], totalPrice: 8500, status: 'ACTIVE' },
];

export const FAQS: FAQ[] = [
    { question: 'How do I book a ticket?', answer: 'Search for your route, select your preferred bus and seats, then proceed to payment. It\'s that simple!' },
    { question: 'What payment methods are accepted?', answer: 'We accept Credit/Debit Cards, Mobile Money (MTN, Tigo Cash), and other online wallets.' },
    { question: 'Can I change my booking?', answer: 'Yes, you can change your booking up to 24 hours before departure through the "My Tickets" section. A small fee may apply.' },
    { question: 'Can I cancel a ticket?', answer: 'Ticket cancellations are possible, but refund policies vary by operator. Please check the cancellation policy before booking.' },
    { question: 'Where can I find my ticket?', answer: 'Your active tickets are available in the "My Tickets" section of your account. You will also receive an email confirmation.' }
];
