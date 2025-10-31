import React from 'react';
import { Operator, BusRoute, Ticket, Bus, Schedule } from './types';

const VolcanoExpressLogo = () => (
  <div className="w-12 h-12 flex items-center justify-center bg-red-600 text-white font-bold rounded-lg text-sm">V.E</div>
);

const RitcoLogo = () => (
  <div className="w-12 h-12 flex items-center justify-center bg-blue-800 text-white font-bold rounded-lg text-sm">RITCO</div>
);

const HorizonLogo = () => (
    <div className="w-12 h-12 flex items-center justify-center bg-green-600 text-white font-bold rounded-lg text-sm">HRZN</div>
);

export const OPERATORS: Operator[] = [
  { id: 'volcano', name: 'Volcano Express', logo: <VolcanoExpressLogo /> },
  { id: 'ritco', name: 'RITCO', logo: <RitcoLogo /> },
  { id: 'horizon', name: 'Horizon Express', logo: <HorizonLogo /> },
];

const generateSeats = (bookedCount: number): { id: string, status: 'available' | 'booked' }[] => {
    const seats = [];
    const totalSeats = 28;
    for (let i = 1; i <= totalSeats; i++) {
        const row = String.fromCharCode(65 + Math.floor((i - 1) / 4));
        const num = (i - 1) % 4 + 1;
        seats.push({
            id: `${row}${num}`,
            status: i <= bookedCount ? 'booked' : 'available'
        });
    }
    return seats;
};


export const BUS_ROUTES: BusRoute[] = [
  {
    id: '1',
    from: 'Kigali',
    to: 'Rubavu',
    departureTime: '08:00 AM',
    arrivalTime: '11:30 AM',
    duration: '3h 30m',
    price: 7000,
    operator: OPERATORS[0],
    seats: generateSeats(10),
    stops: [
        { name: 'Nyabugogo Terminal', time: '08:00 AM' },
        { name: 'Gitarama', time: '09:00 AM' },
        { name: 'Muhanga', time: '09:45 AM' },
        { name: 'Rubavu Bus Park', time: '11:30 AM' },
    ],
    amenities: ['WiFi', 'AC', 'Reclining Seats'],
    type: 'Express',
  },
  {
    id: '2',
    from: 'Kigali',
    to: 'Huye',
    departureTime: '09:30 AM',
    arrivalTime: '12:00 PM',
    duration: '2h 30m',
    price: 4500,
    operator: OPERATORS[1],
    seats: generateSeats(5),
    stops: [
        { name: 'Nyabugogo Terminal', time: '09:30 AM' },
        { name: 'Nyanza', time: '11:00 AM' },
        { name: 'Huye Bus Park', time: '12:00 PM' },
    ],
    amenities: ['AC', 'Power Outlets'],
    type: 'Luxury',
  },
  {
    id: '3',
    from: 'Kigali',
    to: 'Musanze',
    departureTime: '10:00 AM',
    arrivalTime: '12:15 PM',
    duration: '2h 15m',
    price: 3500,
    operator: OPERATORS[0],
    seats: generateSeats(15),
    stops: [
        { name: 'Nyabugogo Terminal', time: '10:00 AM' },
        { name: 'Musanze Bus Park', time: '12:15 PM' },
    ],
    amenities: ['WiFi', 'AC'],
    type: 'Budget',
  },
   {
    id: '4',
    from: 'Kigali',
    to: 'Rubavu',
    departureTime: '13:00 PM',
    arrivalTime: '16:30 PM',
    duration: '3h 30m',
    price: 7500,
    operator: OPERATORS[2],
    seats: generateSeats(2),
    stops: [
        { name: 'Nyabugogo Terminal', time: '13:00 PM' },
        { name: 'Gitarama', time: '14:00 PM' },
        { name: 'Muhanga', time: '14:45 PM' },
        { name: 'Rubavu Bus Park', time: '16:30 PM' },
    ],
    amenities: ['WiFi', 'AC', 'Reclining Seats', 'Power Outlets'],
    type: 'Luxury',
  },
  {
    id: '5',
    from: 'Kigali',
    to: 'Gisenyi',
    departureTime: '07:00 AM',
    arrivalTime: '10:30 AM',
    duration: '3h 30m',
    price: 7000,
    operator: OPERATORS[1],
    seats: generateSeats(20),
    stops: [
      { name: 'Nyabugogo Terminal', time: '07:00 AM' },
      { name: 'Gisenyi Bus Park', time: '10:30 AM' },
    ],
    amenities: ['AC'],
    type: 'Budget',
  },
  {
    id: '6',
    from: 'Huye',
    to: 'Kigali',
    departureTime: '14:00 PM',
    arrivalTime: '16:30 PM',
    duration: '2h 30m',
    price: 4500,
    operator: OPERATORS[0],
    seats: generateSeats(8),
    stops: [
      { name: 'Huye Bus Park', time: '14:00 PM' },
      { name: 'Nyanza', time: '14:30 PM' },
      { name: 'Nyabugogo Terminal', time: '16:30 PM' },
    ],
    amenities: ['WiFi', 'Power Outlets'],
    type: 'Express',
  },
  {
    id: '7',
    from: 'Kigali',
    to: 'Nyagatare',
    departureTime: '11:00 AM',
    arrivalTime: '14:00 PM',
    duration: '3h 0m',
    price: 5000,
    operator: OPERATORS[2],
    seats: generateSeats(3),
    stops: [
      { name: 'Nyabugogo Terminal', time: '11:00 AM' },
      { name: 'Nyagatare Bus Park', time: '14:00 PM' },
    ],
    amenities: ['AC', 'Reclining Seats'],
    type: 'Luxury',
  },
];


export const USER_TICKETS: Ticket[] = [
    { id: 'T1', route: BUS_ROUTES[0], date: '2024-10-25', status: 'ACTIVE', seats: ['A3', 'A4'] },
    { id: 'T2', route: BUS_ROUTES[1], date: '2024-10-28', status: 'ACTIVE', seats: ['B1'] },
    { id: 'T3', route: BUS_ROUTES[2], date: '2024-09-15', status: 'COMPLETED', seats: ['C2'] },
];

export const OPERATOR_BUSES: Bus[] = [
    { id: 'B1', plateNumber: 'RAA 123 B', model: 'Toyota Coaster', capacity: 28, status: 'Active' },
    { id: 'B2', plateNumber: 'RAB 456 C', model: 'Yutong ZK6122H9', capacity: 49, status: 'Active' },
    { id: 'B3', plateNumber: 'RAC 789 D', model: 'Toyota Coaster', capacity: 28, status: 'Maintenance' },
];

export const OPERATOR_SCHEDULES: Schedule[] = [
    { id: 'S1', route: { from: 'Kigali', to: 'Rubavu' }, bus: OPERATOR_BUSES[0], departureTime: '08:00 AM', status: 'Active' },
    { id: 'S2', route: { from: 'Kigali', to: 'Huye' }, bus: OPERATOR_BUSES[1], departureTime: '09:30 AM', status: 'Active' },
    { id: 'S3', route: { from: 'Kigali', to: 'Musanze' }, bus: OPERATOR_BUSES[0], departureTime: '10:00 AM', status: 'Cancelled' },
];