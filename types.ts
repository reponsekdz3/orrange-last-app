import type { ReactNode } from 'react';

export type Page = 
  | 'HOME' 
  | 'FIND_BUS' 
  | 'MY_TICKETS' 
  | 'HELP' 
  | 'CONTACT'
  | 'LOGIN'
  | 'REGISTER'
  | 'ROUTE_DETAILS'
  | 'SEAT_SELECTION'
  | 'PAYMENT'
  | 'CONFIRMATION'
  | 'OPERATOR_DASHBOARD'
  | 'OPERATOR_ROUTES'
  | 'OPERATOR_BUSES'
  | 'OPERATOR_SCHEDULES'
  | 'OPERATOR_REPORTS'
  | 'OPERATOR_SETTINGS';

export interface User {
  id: string;
  name: string;
  email: string;
  type: 'passenger' | 'operator';
}

export interface Operator {
  id: string;
  name: string;
  logo: ReactNode;
}

export interface Seat {
    id: string;
    status: 'available' | 'booked';
}

export interface BusRoute {
  id: string;
  operator: Operator;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  type: 'Express' | 'Luxury' | 'Budget';
  amenities: string[];
  seats: Seat[];
}

export interface Ticket {
  id: string;
  route: BusRoute;
  passengerName: string;
  date: string;
  seats: string[];
  totalPrice: number;
  status: 'COMPLETED' | 'ACTIVE';
}

export interface FAQ {
    question: string;
    answer: string;
}