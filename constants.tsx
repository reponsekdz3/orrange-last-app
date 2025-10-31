import React from 'react';
// FIX: Import User type to be used in MOCK_USERS
import { Operator, BusRoute, Ticket, Bus, Schedule, User, Driver } from './types';

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
  { id: 'volcano', name: 'Volcano Express', logo: <VolcanoExpressLogo />, fleetSize: 45, avgRating: 4.6 },
  { id: 'ritco', name: 'RITCO', logo: <RitcoLogo />, fleetSize: 80, avgRating: 4.3 },
  { id: 'horizon', name: 'Horizon Express', logo: <HorizonLogo />, fleetSize: 30, avgRating: 4.5 },
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
  {
    id: '8',
    from: 'Musanze',
    to: 'Rubavu',
    departureTime: '09:00 AM',
    arrivalTime: '10:30 AM',
    duration: '1h 30m',
    price: 2500,
    operator: OPERATORS[0],
    seats: generateSeats(12),
    stops: [
      { name: 'Musanze Bus Park', time: '09:00 AM' },
      { name: 'Rubavu Bus Park', time: '10:30 AM' },
    ],
    amenities: ['AC'],
    type: 'Express',
  },
  {
    id: '9',
    from: 'Kigali',
    to: 'Rusumo',
    departureTime: '06:30 AM',
    arrivalTime: '10:00 AM',
    duration: '3h 30m',
    price: 6000,
    operator: OPERATORS[1],
    seats: generateSeats(18),
    stops: [
      { name: 'Nyabugogo Terminal', time: '06:30 AM' },
      { name: 'Rusumo Border', time: '10:00 AM' },
    ],
    amenities: ['Power Outlets'],
    type: 'Budget',
  },
  {
    id: '10',
    from: 'Huye',
    to: 'Rusizi',
    departureTime: '13:30 PM',
    arrivalTime: '17:00 PM',
    duration: '3h 30m',
    price: 5500,
    operator: OPERATORS[2],
    seats: generateSeats(4),
    stops: [
      { name: 'Huye Bus Park', time: '13:30 PM' },
      { name: 'Nyamagabe', time: '14:30 PM' },
      { name: 'Rusizi Bus Park', time: '17:00 PM' },
    ],
    amenities: ['WiFi', 'AC'],
    type: 'Express',
  },
];


export const USER_TICKETS: Ticket[] = [
    { id: 'T1', route: BUS_ROUTES[0], date: '2024-10-25', status: 'ACTIVE', seats: ['A3', 'A4'] },
    { id: 'T2', route: BUS_ROUTES[1], date: '2024-10-28', status: 'ACTIVE', seats: ['B1'] },
    { id: 'T3', route: BUS_ROUTES[2], date: '2024-09-15', status: 'COMPLETED', seats: ['C2'], rating: 4 },
    { id: 'T4', route: BUS_ROUTES[5], date: '2024-08-22', status: 'COMPLETED', seats: ['D1', 'D2'] },
];

export const OPERATOR_BUSES: Bus[] = [
    { id: 'B1', plateNumber: 'RAA 123 B', model: 'Toyota Coaster', capacity: 28, status: 'Active' },
    { id: 'B2', plateNumber: 'RAB 456 C', model: 'Yutong ZK6122H9', capacity: 49, status: 'Active' },
    { id: 'B3', plateNumber: 'RAC 789 D', model: 'Toyota Coaster', capacity: 28, status: 'Maintenance' },
    { id: 'B4', plateNumber: 'RAD 101 E', model: 'Yutong ZK6122H9', capacity: 49, status: 'Inactive' },
    { id: 'B5', plateNumber: 'RAE 202 F', model: 'Toyota Coaster', capacity: 28, status: 'Active' },
];

export const OPERATOR_DRIVERS: Driver[] = [
    { id: 'D1', name: 'Jean Mugisha', contact: '0788123456', licenseNumber: 'DL12345RW', assignedBusId: 'B1', status: 'Active' },
    { id: 'D2', name: 'Aline Uwase', contact: '0788654321', licenseNumber: 'DL54321RW', assignedBusId: 'B2', status: 'Active' },
    { id: 'D3', name: 'Emmanuel Nsenga', contact: '0788987654', licenseNumber: 'DL98765RW', assignedBusId: null, status: 'On Leave' },
    { id: 'D4', name: 'Grace Iradukunda', contact: '0788456789', licenseNumber: 'DL45678RW', assignedBusId: 'B5', status: 'Active' },
    { id: 'D5', name: 'Olivier Kwizera', contact: '0788321987', licenseNumber: 'DL32198RW', assignedBusId: null, status: 'Inactive' },
];

export const OPERATOR_SCHEDULES: Schedule[] = [
    { id: 'S1', route: { from: 'Kigali', to: 'Rubavu' }, bus: OPERATOR_BUSES[0], departureTime: '08:00 AM', status: 'Active' },
    { id: 'S2', route: { from: 'Kigali', to: 'Huye' }, bus: OPERATOR_BUSES[1], departureTime: '09:30 AM', status: 'Active' },
    { id: 'S3', route: { from: 'Kigali', to: 'Musanze' }, bus: OPERATOR_BUSES[0], departureTime: '10:00 AM', status: 'Cancelled' },
];

// FIX: Define and export MOCK_USERS to be used in App.tsx
export const MOCK_USERS: User[] = [
  {
    id: 'user_1',
    name: 'John Doe',
    email: 'passenger@busrwanda.com',
    type: 'passenger',
    password: 'password123',
    profilePicture: 'https://ui-avatars.com/api/?name=John+Doe&background=F97316&color=fff',
    notifications: [
      { id: 'n1', message: 'Your trip to Rubavu is confirmed for tomorrow.', read: false },
      { id: 'n2', message: 'Special offer: 10% off on your next trip!', read: false },
      { id: 'n3', message: 'Your ticket for Kigali > Huye has been used.', read: true },
    ],
    paymentMethods: [
      { id: 'pm1', type: 'card', provider: 'Visa', last4: '1234' },
      { id: 'pm2', type: 'mobile', provider: 'MTN', last4: '5678' },
    ],
    walletBalance: 15000,
    walletPin: '12345',
    recentActivity: [
      { timestamp: new Date(Date.now() - 86400000).toISOString(), device: 'Chrome on macOS', location: 'Kigali, Rwanda' },
    ],
    preferences: {
        favoriteRoutes: [
            { from: 'Kigali', to: 'Rubavu' },
            { from: 'Kigali', to: 'Huye' },
        ],
        preferredOperators: ['volcano', 'ritco'],
    },
    isVerified: true,
    twoFactorEnabled: true,
  },
  {
    id: 'user_2',
    name: 'Jane Smith',
    email: 'operator@busrwanda.com',
    type: 'operator',
    password: 'password123',
    profilePicture: 'https://ui-avatars.com/api/?name=Jane+Smith&background=F97316&color=fff',
    notifications: [],
    paymentMethods: [],
    walletBalance: 0,
    recentActivity: [
      { timestamp: new Date().toISOString(), device: 'Chrome on Windows', location: 'Kigali, Rwanda' },
    ],
    preferences: {
        favoriteRoutes: [],
        preferredOperators: [],
    },
    isVerified: true,
    twoFactorEnabled: false,
  },
];