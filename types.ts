import React from 'react';

export type Page =
  | 'HOME'
  | 'FIND_BUS'
  | 'SERVICES'
  | 'NETWORK_MAP'
  | 'ROUTE_STOPS'
  | 'SEAT_SELECTION'
  | 'PAYMENT'
  | 'CONFIRMATION'
  | 'MY_TICKETS'
  | 'HELP'
  | 'CONTACT'
  | 'ACCOUNT_SETTINGS'
  | 'LOGIN'
  | 'REGISTER'
  | 'OPERATOR_DASHBOARD'
  | 'OPERATOR_ROUTES'
  | 'OPERATOR_BUSES'
  | 'OPERATOR_SCHEDULES'
  | 'OPERATOR_REPORTS'
  | 'OPERATOR_SETTINGS';

export type NotificationPreferences = {
  promotions: boolean;
  reminders: boolean;
  confirmations: boolean;
};

export type PaymentMethod = {
  id: string;
  type: 'card' | 'mobile';
  provider: string; // e.g., 'Visa', 'MTN'
  last4: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  type: 'passenger' | 'operator';
  profilePicture?: string;
  notifications: NotificationPreferences;
  paymentMethods: PaymentMethod[];
};

export type Operator = {
  id: string;
  name: string;
  logo: React.ReactNode;
};

export type Seat = {
  id: string;
  status: 'available' | 'booked';
};

export type Stop = {
  name: string;
  time: string;
};

export type BusRoute = {
  id: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  operator: Operator;
  seats: Seat[];
  stops: Stop[];
  amenities: string[];
  type: 'Express' | 'Luxury' | 'Budget';
};

export type Ticket = {
  id: string;
  route: BusRoute;
  date: string;
  status: 'ACTIVE' | 'COMPLETED';
  seats: string[];
};

export type Booking = {
  route: BusRoute | null;
  seats: string[];
  totalPrice: number;
};

export type Bus = {
  id: string;
  plateNumber: string;
  model: string;
  capacity: number;
  status: 'Active' | 'Maintenance' | 'Inactive';
};

export type Schedule = {
  id: string;
  route: { from: string, to: string };
  bus: Bus;
  departureTime: string;
  status: 'Active' | 'Cancelled';
};

export type ToastMessage = {
  message: string;
  type: 'success' | 'error' | 'info';
} | null;