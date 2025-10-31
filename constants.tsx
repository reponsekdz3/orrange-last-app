import React from 'react';
import { Operator, BusRoute, Ticket, FAQ, Seat, Bus, Schedule, Feedback } from './types';

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
    { id: '1', operator: OPERATORS[0], from: 'Kigali', to: 'Rubavu', departureTime: '07:00 AM', arrivalTime: '11:00 AM', duration: '4h', price: 7000, type: 'Luxury', amenities: ['AC', 'WiFi', 'Reclining Seats', 'Power Outlets'], seats: generateSeats(10, ['1C', '2A', '5D', '8B']), stops: [{name: 'Kigali', time: '07:00 AM'}, {name: 'Muhanga', time: '08:00 AM'}, {name: 'Karongi', time: '09:30 AM'}, {name: 'Rubavu', time: '11:00 AM'}] },
    { id: '2', operator: OPERATORS[1], from: 'Kigali', to: 'Rubavu', departureTime: '06:30 AM', arrivalTime: '11:00 AM', duration: '4h 30m', price: 8500, type: 'Express', amenities: ['AC', 'WiFi'], seats: generateSeats(12, ['3A', '3B', '4C', '7D', '10A']), stops: [{name: 'Kigali', time: '06:30 AM'}, {name: 'Nyabugogo', time: '07:00 AM'}, {name: 'Rubavu', time: '11:00 AM'}] },
    { id: '3', operator: OPERATORS[2], from: 'Kigali', to: 'Huye', departureTime: '08:00 AM', arrivalTime: '10:30 AM', duration: '2h 30m', price: 9000, type: 'Luxury', amenities: ['AC', 'WiFi', 'Reclining Seats'], seats: generateSeats(10, ['2B', '6A', '6B']), stops: [{name: 'Kigali', time: '08:00 AM'}, {name: 'Nyanza', time: '09:30 AM'}, {name: 'Huye', time: '10:30 AM'}] },
    { id: '4', operator: OPERATORS[1], from: 'Kigali', to: 'Huye', departureTime: '09:00 AM', arrivalTime: '11:30 AM', duration: '2h 30m', price: 4500, type: 'Express', amenities: ['AC'], seats: generateSeats(12, ['1A', '1B', '1C', '1D', '8A']), stops: [{name: 'Kigali', time: '09:00 AM'}, {name: 'Huye', time: '11:30 AM'}] },
    { id: '5', operator: OPERATORS[2], from: 'Kigali', to: 'Musanze', departureTime: '10:00 AM', arrivalTime: '12:00 PM', duration: '2h', price: 3500, type: 'Budget', amenities: [], seats: generateSeats(15, ['1A', '2B', '3C', '4D', '5A', '6B', '7C', '8D']), stops: [{name: 'Kigali', time: '10:00 AM'}, {name: 'Musanze', time: '12:00 PM'}] },
    { id: '6', operator: OPERATORS[0], from: 'Rubavu', to: 'Kigali', departureTime: '02:00 PM', arrivalTime: '06:00 PM', duration: '4h', price: 7000, type: 'Luxury', amenities: ['AC', 'WiFi'], seats: generateSeats(10, ['4A', '4B']), stops: [{name: 'Rubavu', time: '02:00 PM'}, {name: 'Kigali', time: '06:00 PM'}] },
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

export const OPERATOR_BUSES: Bus[] = [
    { id: 'B01', model: 'Mercedes-Benz', plateNumber: 'RAB 456 C', capacity: 45, amenities: ['WiFi', 'AC'], status: 'Active' },
    { id: 'B02', model: 'Scania K31IB', plateNumber: 'RAC 123 D', capacity: 50, amenities: ['WiFi', 'AC', 'Reclining Seats'], status: 'Active' },
    { id: 'B03', model: 'Volvo 11R', plateNumber: 'RAD 789 F', capacity: 40, amenities: ['AC'], status: 'Under Maintenance' },
    { id: 'B04', model: 'Yutong ZK6', plateNumber: 'RAE 987 G', capacity: 55, amenities: ['WiFi'], status: 'Active' },
];

export const OPERATOR_SCHEDULES: Schedule[] = [
    { id: 'S01', route: { from: 'Kigali', to: 'Rubavu' }, bus: OPERATOR_BUSES[0], departureTime: '07:00 AM', arrivalTime: '11:00 AM', status: 'Active' },
    { id: 'S02', route: { from: 'Kigali', to: 'Huye' }, bus: OPERATOR_BUSES[1], departureTime: '08:00 AM', arrivalTime: '10:30 AM', status: 'Active' },
    { id: 'S03', route: { from: 'Kigali', to: 'Musanze' }, bus: OPERATOR_BUSES[3], departureTime: '10:00 AM', arrivalTime: '12:00 PM', status: 'Inactive' },
];

export const USER_FEEDBACK: Feedback[] = [
    { id: 'F01', type: 'Problem', description: 'Bus AC not working on route RAB 456 C.', date: '2024-10-25', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg> },
    { id: 'F02', type: 'Idea', description: 'Add a loyalty program for frequent travelers.', date: '2024-09-10', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg> },
];