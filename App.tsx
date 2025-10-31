import React, { useState, createContext, useContext } from 'react';
import { Page, User, BusRoute } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { FindBusPage } from './pages/FindBusPage';
import { MyTicketsPage } from './pages/MyTicketsPage';
import { SeatSelectionPage } from './pages/SeatSelectionPage';
import { PaymentPage } from './pages/PaymentPage';
import { ConfirmationPage } from './pages/ConfirmationPage';
import { HelpPage } from './pages/HelpPage';
import { ContactPage } from './pages/ContactPage';
import { LoginPage } from './pages/LoginPage';
import { OperatorDashboard } from './pages/OperatorDashboard';
import { OperatorRoutesPage } from './pages/operator/OperatorRoutesPage';
import { OperatorSidebar } from './components/OperatorSidebar';

interface Booking {
  route: BusRoute | null;
  seats: string[];
  totalPrice: number;
}

interface AppContextType {
  page: Page;
  setPage: (page: Page) => void;
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  selectedRoute: BusRoute | null;
  setSelectedRoute: (route: BusRoute | null) => void;
  booking: Booking;
  setBooking: (booking: Booking) => void;
  resetBooking: () => void;
}

export const AppContext = createContext<AppContextType>({} as AppContextType);

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [page, setPage] = useState<Page>('HOME');
  const [user, setUser] = useState<User | null>(null);
  const [selectedRoute, setSelectedRoute] = useState<BusRoute | null>(null);

  const initialBookingState = { route: null, seats: [], totalPrice: 0 };
  const [booking, setBooking] = useState<Booking>(initialBookingState);
  
  const login = (user: User) => {
    setUser(user);
    if (user.type === 'operator') {
      setPage('OPERATOR_DASHBOARD');
    } else {
      setPage('HOME');
    }
  };

  const logout = () => {
    setUser(null);
    setPage('HOME');
  };
  
  const resetBooking = () => setBooking(initialBookingState);

  const contextValue = {
    page, setPage, user, login, logout,
    selectedRoute, setSelectedRoute,
    booking, setBooking, resetBooking,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

const PageRenderer: React.FC = () => {
    const { page } = useContext(AppContext);

    switch(page) {
        case 'HOME': return <HomePage />;
        case 'FIND_BUS': return <FindBusPage />;
        case 'MY_TICKETS': return <MyTicketsPage />;
        case 'SEAT_SELECTION': return <SeatSelectionPage />;
        case 'PAYMENT': return <PaymentPage />;
        case 'CONFIRMATION': return <ConfirmationPage />;
        case 'HELP': return <HelpPage />;
        case 'CONTACT': return <ContactPage />;
        case 'LOGIN': return <LoginPage isRegister={false} />;
        case 'REGISTER': return <LoginPage isRegister={true} />;
        case 'OPERATOR_DASHBOARD': return <OperatorDashboard />;
        case 'OPERATOR_ROUTES': return <OperatorRoutesPage />;
        case 'OPERATOR_BUSES':
        case 'OPERATOR_SCHEDULES':
        case 'OPERATOR_REPORTS':
        case 'OPERATOR_SETTINGS':
            return <div className="p-8"><h1 className="text-2xl font-bold">{page.replace('OPERATOR_', '')} Page - Coming Soon!</h1></div>;
        default: return <HomePage />;
    }
};

const App: React.FC = () => (
    <AppProvider>
        <MainLayout />
    </AppProvider>
);

const MainLayout: React.FC = () => {
    const { user, page } = useContext(AppContext);
    
    const isOperatorView = user?.type === 'operator' && page.startsWith('OPERATOR_');
    
    if (isOperatorView) {
        return (
            <div className="min-h-screen flex bg-gray-50 text-gray-800">
                <OperatorSidebar />
                <div className="flex flex-col flex-1 w-full overflow-x-hidden">
                    <Header />
                    <PageRenderer />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-orange-50 to-amber-100 font-sans text-gray-800">
            <Header />
            <main className="flex-grow">
                <PageRenderer />
            </main>
            <Footer />
        </div>
    );
};

export default App;