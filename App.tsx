import React, { useState, createContext } from 'react';
import { Page, User, BusRoute, Booking } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { FindBusPage } from './pages/FindBusPage';
import { MyTicketsPage } from './pages/MyTicketsPage';
import { HelpPage } from './pages/HelpPage';
import { ContactPage } from './pages/ContactPage';
import { LoginPage } from './pages/LoginPage';
import { AccountSettingsPage } from './pages/AccountSettingsPage';
import { RouteStopsPage } from './pages/RouteStopsPage';
import { SeatSelectionPage } from './pages/SeatSelectionPage';
import { PaymentPage } from './pages/PaymentPage';
import { ConfirmationPage } from './pages/ConfirmationPage';

// Operator pages
import { OperatorDashboard } from './pages/OperatorDashboard';
import { OperatorSidebar } from './components/OperatorSidebar';
import { OperatorRoutesPage } from './pages/operator/OperatorRoutesPage';
import { OperatorBusesPage } from './pages/operator/OperatorBusesPage';
import { OperatorSchedulesPage } from './pages/operator/OperatorSchedulesPage';
import { OperatorReportsPage } from './pages/operator/OperatorReportsPage';
import { OperatorSettingsPage } from './pages/operator/OperatorSettingsPage';

interface AppContextType {
  page: Page;
  setPage: (page: Page) => void;
  user: User | null;
  login: (user: Omit<User, 'profilePicture' | 'notifications' | 'paymentMethods'>) => void;
  logout: () => void;
  selectedRoute: BusRoute | null;
  setSelectedRoute: (route: BusRoute | null) => void;
  booking: Booking;
  setBooking: (booking: Booking) => void;
}

export const AppContext = createContext<AppContextType>({} as AppContextType);

const App: React.FC = () => {
  const [page, setPage] = useState<Page>('HOME');
  const [user, setUser] = useState<User | null>(null);
  const [selectedRoute, setSelectedRoute] = useState<BusRoute | null>(null);
  const [booking, setBooking] = useState<Booking>({ route: null, seats: [], totalPrice: 0 });

  const login = (userData: Omit<User, 'profilePicture' | 'notifications' | 'paymentMethods'>) => {
    const fullUserData: User = {
        ...userData,
        profilePicture: '',
        notifications: {
            promotions: true,
            reminders: true,
            confirmations: true,
        },
        paymentMethods: [],
    };
    setUser(fullUserData);
    if (userData.type === 'operator') {
      setPage('OPERATOR_DASHBOARD');
    } else {
      setPage('HOME');
    }
  };

  const logout = () => {
    setUser(null);
    setPage('HOME');
  };

  const appContextValue: AppContextType = {
    page,
    setPage: (newPage: Page) => {
        window.scrollTo(0, 0);
        if (newPage === 'LOGIN') {
            setPage('LOGIN');
        } else if (newPage === 'REGISTER') {
            setPage('REGISTER');
        }
        else {
            setPage(newPage);
        }
    },
    user,
    login,
    logout,
    selectedRoute,
    setSelectedRoute,
    booking,
    setBooking,
  };

  const isOperatorView = user?.type === 'operator' && [
    'OPERATOR_DASHBOARD', 
    'OPERATOR_ROUTES', 
    'OPERATOR_BUSES', 
    'OPERATOR_SCHEDULES',
    'OPERATOR_REPORTS',
    'OPERATOR_SETTINGS'
  ].includes(page);
  
  const renderPage = () => {
    switch (page) {
      case 'HOME': return <HomePage />;
      case 'FIND_BUS': return <FindBusPage />;
      case 'MY_TICKETS': return <MyTicketsPage />;
      case 'HELP': return <HelpPage />;
      case 'CONTACT': return <ContactPage />;
      case 'LOGIN': return <LoginPage isRegister={false} />;
      case 'REGISTER': return <LoginPage isRegister={true} />;
      case 'ACCOUNT_SETTINGS': return <AccountSettingsPage />;
      case 'ROUTE_STOPS': return <RouteStopsPage />;
      case 'SEAT_SELECTION': return <SeatSelectionPage />;
      case 'PAYMENT': return <PaymentPage />;
      case 'CONFIRMATION': return <ConfirmationPage />;

      // Operator pages
      case 'OPERATOR_DASHBOARD': return <OperatorDashboard />;
      case 'OPERATOR_ROUTES': return <OperatorRoutesPage />;
      case 'OPERATOR_BUSES': return <OperatorBusesPage />;
      case 'OPERATOR_SCHEDULES': return <OperatorSchedulesPage />;
      case 'OPERATOR_REPORTS': return <OperatorReportsPage />;
      case 'OPERATOR_SETTINGS': return <OperatorSettingsPage />;

      default: return <HomePage />;
    }
  };

  return (
    <AppContext.Provider value={appContextValue}>
      <div className="bg-gray-50 min-h-screen flex flex-col font-sans">
        <Header />
        {isOperatorView ? (
          <div className="flex flex-1">
            <OperatorSidebar />
            {renderPage()}
          </div>
        ) : (
          <main className="flex-grow">
            {renderPage()}
          </main>
        )}
        {!isOperatorView && <Footer />}
      </div>
    </AppContext.Provider>
  );
};

export default App;