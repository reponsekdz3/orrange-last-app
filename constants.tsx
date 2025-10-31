import React from 'react';
import { Operator, BusRoute, Ticket, FAQ, Seat } from './types';

export const VolcanoExpressIcon = ({ className = "w-24 h-auto" }: { className?: string }) => (
    <div className="flex items-center space-x-2">
        <img src="https://i.imgur.com/x4QU5mB.png" alt="Volcano Express" className="w-12 h-12" />
        <div>
            <p className="font-bold text-gray-800">VOLCANO EXPRESS</p>
        </div>
    </div>
);

export const OnatracomIcon = ({ className = "w-10 h-10" }: { className?: string }) => (
     <div className="flex items-center space-x-2">
        <img src="https://i.imgur.com/sC3I6sB.png" alt="Onatracom" className="w-12 h-12" />
        <div>
            <p className="font-bold text-gray-800">ONATRACOM</p>
        </div>
    </div>
);

export const StellaExpressIcon = ({ className = "w-10 h-10 text-orange-500" }: { className?: string }) => (
    <div className="flex items-center space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" className={`${className} w-8 h-8`} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
        <p className="font-bold text-gray-800">STELLA EXPRESS</p>
    </div>
);


export const OPERATORS: Operator[] = [
    { id: 'volcano', name: 'Volcano Express', logo: <VolcanoExpressIcon /> },
    { id: 'onatracom', name: 'Onatracom', logo: <OnatracomIcon /> },
    { id: 'stella', name: 'Stella Express', logo: <StellaExpressIcon /> },
];

const generateSeats = (rows: number, bookedSeats: string[]): Seat[] => {
    const seats: Seat[] = [];
    const columns = ['A', 'B', 'C', 'D'];
    for (let i = 1; i <= rows; i++) {
        for (const col of columns) {
            const id = `${i}${col}`;
            seats.push({ id, status: bookedSeats.includes(id) ? 'booked' : 'available' });
        }
    }
    return seats;
};

export const BUS_ROUTES: BusRoute[] = [
    { id: '1', operator: OPERATORS[0], from: 'Kigali', to: 'Rubavu', departureTime: '07:00 AM', arrivalTime: '11:00 AM', duration: '4h', price: 7000, type: 'Luxury', amenities: ['AC', 'WiFi', 'Reclining Seats', 'Power Outlets'], seats: generateSeats(10, ['1C', '2A', '5D', '8B']) },
    { id: '2', operator: OPERATORS[1], from: 'Kigali', to: 'Rubavu', departureTime: '06:30 AM', arrivalTime: '11:00 AM', duration: '4h 30m', price: 8500, type: 'Express', amenities: ['AC', 'WiFi'], seats: generateSeats(12, ['3A', '3B', '4C', '7D', '10A']) },
    { id: '3', operator: OPERATORS[2], from: 'Kigali', to: 'Huye', departureTime: '08:00 AM', arrivalTime: '10:30 AM', duration: '2h 30m', price: 9000, type: 'Luxury', amenities: ['AC', 'WiFi', 'Reclining Seats'], seats: generateSeats(10, ['2B', '6A', '6B']) },
    { id: '4', operator: OPERATORS[1], from: 'Kigali', to: 'Huye', departureTime: '09:00 AM', arrivalTime: '11:30 AM', duration: '2h 30m', price: 4500, type: 'Express', amenities: ['AC'], seats: generateSeats(12, ['1A', '1B', '1C', '1D', '8A']) },
    { id: '5', operator: OPERATORS[2], from: 'Kigali', to: 'Musanze', departureTime: '10:00 AM', arrivalTime: '12:00 PM', duration: '2h', price: 3500, type: 'Budget', amenities: [], seats: generateSeats(15, ['1A', '2B', '3C', '4D', '5A', '6B', '7C', '8D']) },
    { id: '6', operator: OPERATORS[0], from: 'Rubavu', to: 'Kigali', departureTime: '02:00 PM', arrivalTime: '06:00 PM', duration: '4h', price: 7000, type: 'Luxury', amenities: ['AC', 'WiFi'], seats: generateSeats(10, ['4A', '4B']) },
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