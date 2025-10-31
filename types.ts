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
  | 'FORGOT_PASSWORD'
  | 'VERIFY_EMAIL' // New page for email verification
  | 'LIVE_TRACKING'
  | 'OPERATOR_DASHBOARD'
  | 'OPERATOR_ROUTES'
  | 'OPERATOR_BUSES'
  | 'OPERATOR_DRIVERS'
  | 'OPERATOR_SCHEDULES'
  | 'OPERATOR_REPORTS'
  | 'OPERATOR_SETTINGS';

export type Notification = {
  id: string;
  message: string;
  read: boolean;
};

export type PaymentMethod = {
  id: string;
  type: 'card' | 'mobile';
  provider: string; // e.g., 'Visa', 'MTN'
  last4: string;
};

export type UserActivity = {
  timestamp: string;
  device: string;
  location: string;
};

export type UserPreferences = {
    favoriteRoutes: { from: string; to: string }[];
    preferredOperators: string[]; // Array of operator IDs
};

export type User = {
  id: string;
  name: string;
  email: string;
  type: 'passenger' | 'operator';
  password?: string; // For mock database only, not for app state
  profilePicture?: string;
  notifications: Notification[];
  paymentMethods: PaymentMethod[];
  walletBalance: number;
  walletPin?: string; // 5-digit PIN for wallet transactions
  recentActivity: UserActivity[];
  preferences: UserPreferences;
  isVerified: boolean; // For email verification
  twoFactorEnabled: boolean; // For 2FA
};

export type Operator = {
  id: string;
  name: string;
  logo: React.ReactNode;
  fleetSize: number;
  avgRating: number;
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
  rating?: number;
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

export type Driver = {
    id: string;
    name: string;
    contact: string;
    licenseNumber: string;
    assignedBusId: string | null;
    status: 'Active' | 'On Leave' | 'Inactive';
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