import React, { useState, createContext } from 'react';
import { Page, User, BusRoute, Booking, ToastMessage } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
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
import { ServicesPage } from './pages/ServicesPage';
import { NetworkMapPage } from './pages/NetworkMapPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { LiveTrackingPage } from './pages/LiveTrackingPage';

// Operator pages
import { OperatorDashboard } from './pages/OperatorDashboard';
import { OperatorSidebar } from './components/OperatorSidebar';
import { OperatorRoutesPage } from './pages/operator/OperatorRoutesPage';
import { OperatorBusesPage } from './pages/operator/OperatorBusesPage';
import { OperatorDriversPage } from './pages/operator/OperatorDriversPage';
import { OperatorSchedulesPage } from './pages/operator/OperatorSchedulesPage';
import { OperatorReportsPage } from './pages/operator/OperatorReportsPage';
import { OperatorSettingsPage } from './pages/operator/OperatorSettingsPage';
import { MOCK_USERS } from './constants';

type LoginCredentials = { email: string; password: string };
type RegisterCredentials = { name: string; email: string; password: string };


interface AppContextType {
  page: Page;
  setPage: (page: Page) => void;
  user: User | null;
  login: (credentials: LoginCredentials) => void;
  register: (credentials: RegisterCredentials) => void;
  logout: () => void;
  selectedRoute: BusRoute | null;
  setSelectedRoute: (route: BusRoute | null) => void;
  booking: Booking;
  setBooking: (booking: Booking) => void;
  showToast: (message: string, type: 'success' | 'error' | 'info') => void;
  updateWalletBalance: (amount: number) => void;
}

export const AppContext = createContext<AppContextType>({} as AppContextType);

const App: React.FC = () => {
  const [page, setPage] = useState<Page>('HOME');
  const [user, setUser] = useState<User | null>(null);
  const [usersDB, setUsersDB] = useState<User[]>(MOCK_USERS);
  const [selectedRoute, setSelectedRoute] = useState<BusRoute | null>(null);
  const [booking, setBooking] = useState<Booking>({ route: null, seats: [], totalPrice: 0 });
  const [toast, setToast] = useState<ToastMessage>(null);

  const showToast = (message: string, type: 'success' | 'error' | 'info') => {
    setToast({ message, type });
  };

  const login = ({ email, password }: LoginCredentials) => {
    const foundUser = usersDB.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (foundUser) {
        const { password, ...userToStore } = foundUser;
        setUser(userToStore);
        if (userToStore.type === 'operator') {
          setPage('OPERATOR_DASHBOARD');
        } else {
          setPage('HOME');
        }
        showToast(`Welcome back, ${userToStore.name}!`, 'success');
    } else {
        showToast('Invalid email or password.', 'error');
    }
  };

  const register = ({ name, email, password }: RegisterCredentials) => {
    const existingUser = usersDB.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existingUser) {
        showToast('An account with this email already exists.', 'error');
        return;
    }
    const newUser: User = {
        id: `user_${Date.now()}`,
        name,
        email,
        password, // In a real app, this would be hashed
        type: 'passenger',
        profilePicture: '',
        walletBalance: 0,
        notifications: [],
        paymentMethods: [],
        recentActivity: [{
            timestamp: new Date().toISOString(),
            device: 'Web Browser',
            location: 'Kigali, Rwanda (estimate)'
        }],
        preferences: {
            favoriteRoutes: [],
            preferredOperators: [],
        }
    };
    setUsersDB([...usersDB, newUser]);
    const { password: _, ...userToStore } = newUser;
    setUser(userToStore);
    setPage('HOME');
    showToast('Account created successfully!', 'success');
  };


  const logout = () => {
    setUser(null);
    setPage('HOME');
  };
  
  const updateWalletBalance = (amount: number) => {
    if (user) {
        setUser({ ...user, walletBalance: user.walletBalance + amount });
    }
  };

  const appContextValue: AppContextType = {
    page,
    setPage: (newPage: Page) => {
        window.scrollTo(0, 0);
        setPage(newPage);
    },
    user,
    login,
    register,
    logout,
    selectedRoute,
    setSelectedRoute,
    booking,
    setBooking,
    showToast,
    updateWalletBalance,
  };

  const isOperatorView = user?.type === 'operator' && [
    'OPERATOR_DASHBOARD', 
    'OPERATOR_ROUTES', 
    'OPERATOR_BUSES', 
    'OPERATOR_DRIVERS',
    'OPERATOR_SCHEDULES',
    'OPERATOR_REPORTS',
    'OPERATOR_SETTINGS'
  ].includes(page);
  
  const renderPage = () => {
    switch (page) {
      case 'HOME': return <HomePage />;
      case 'FIND_BUS': return <FindBusPage />;
      case 'SERVICES': return <ServicesPage />;
      case 'NETWORK_MAP': return <NetworkMapPage />;
      case 'MY_TICKETS': return <MyTicketsPage />;
      case 'HELP': return <HelpPage />;
      case 'CONTACT': return <ContactPage />;
      case 'LOGIN': return <LoginPage key="login" isRegister={false} />;
      case 'REGISTER': return <LoginPage key="register" isRegister={true} />;
      case 'FORGOT_PASSWORD': return <ForgotPasswordPage />;
      case 'ACCOUNT_SETTINGS': return <AccountSettingsPage />;
      case 'ROUTE_STOPS': return <RouteStopsPage />;
      case 'SEAT_SELECTION': return <SeatSelectionPage />;
      case 'PAYMENT': return <PaymentPage />;
      case 'CONFIRMATION': return <ConfirmationPage />;
      case 'LIVE_TRACKING': return <LiveTrackingPage />;

      // Operator pages
      case 'OPERATOR_DASHBOARD': return <OperatorDashboard />;
      case 'OPERATOR_ROUTES': return <OperatorRoutesPage />;
      case 'OPERATOR_BUSES': return <OperatorBusesPage />;
      case 'OPERATOR_DRIVERS': return <OperatorDriversPage />;
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
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </div>
    </AppContext.Provider>
  );
};

export default App;