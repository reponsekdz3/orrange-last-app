// Fix: Import ReactNode type from 'react' to resolve the 'Cannot find namespace React' error.
import type { ReactNode } from 'react';

export type Page = 
  | 'HOME' 
  | 'FIND_BUS' 
  | 'MY_TICKETS' 
  | 'HELP' 
  | 'CONTACT'
  | 'LOGIN'
  | 'REGISTER'
  | 'ACCOUNT_SETTINGS'
  | 'ROUTE_DETAILS'
  | 'SEAT_SELECTION'
  | 'PAYMENT'
  | 'CONFIRMATION'
  | 'OPERATOR_DASHBOARD';

export interface Operator {
  id: string;
  name: string;
  // Fix: Use ReactNode type for the logo property.
  logo: ReactNode;
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