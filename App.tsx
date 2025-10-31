
import React, { useState, createContext, useContext } from 'react';
import { Page } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { MyTicketsPage } from './pages/MyTicketsPage';
import { RouteDetailsPage } from './pages/RouteDetailsPage';
import { SeatSelectionPage } from './pages/SeatSelectionPage';
import { PaymentPage } from './pages/PaymentPage';
import { ConfirmationPage } from './pages/ConfirmationPage';
import { HelpPage } from './pages/HelpPage';
import { OperatorDashboard } from './pages/OperatorDashboard';
import { OperatorSidebar } from './components/OperatorSidebar';

const AppContext = createContext<{
  page: Page;
  setPage: (page: Page) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (loggedIn: boolean) => void;
}>({
  page: 'HOME',
  setPage: () => {},
  isLoggedIn: false,
  setIsLoggedIn: () => {}
});

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [page, setPage] = useState<Page>('HOME');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  
  return (
    <AppContext.Provider value={{ page, setPage, isLoggedIn, setIsLoggedIn }}>
      {children}
    </AppContext.Provider>
  );
};

const PageRenderer: React.FC = () => {
    const { page, setPage } = useContext(AppContext);

    switch(page) {
        case 'HOME':
        case 'FIND_BUS': // Using HomePage for Find Bus for simplicity
            return <HomePage setPage={setPage} />;
        case 'MY_TICKETS':
            return <MyTicketsPage />;
        case 'ROUTE_DETAILS':
            return <RouteDetailsPage setPage={setPage} />;
        case 'SEAT_SELECTION':
            return <SeatSelectionPage setPage={setPage} />;
        case 'PAYMENT':
            return <PaymentPage setPage={setPage} />;
        case 'CONFIRMATION':
            return <ConfirmationPage setPage={setPage} />;
        case 'HELP':
            return <HelpPage />;
        case 'OPERATOR_DASHBOARD':
             return <OperatorDashboard />;
        // Add other pages here
        case 'LOGIN':
            // For simplicity, a login action will set isLoggedIn to true and redirect
            // This would be a real component in a full app.
            const { setIsLoggedIn } = useContext(AppContext);
            React.useEffect(() => {
                // Simulate operator login
                setIsLoggedIn(true);
                setPage('OPERATOR_DASHBOARD');
            }, [setIsLoggedIn, setPage]);
            return <div className="p-8 text-center">Logging in...</div>;
        default:
            return <HomePage setPage={setPage} />;
    }
};


const App: React.FC = () => {
  return (
    <AppProvider>
        <MainLayout />
    </AppProvider>
  );
};

const MainLayout: React.FC = () => {
    const { page, setPage, isLoggedIn, setIsLoggedIn } = useContext(AppContext);
    
    const isOperatorView = page === 'OPERATOR_DASHBOARD';
    
    if (isOperatorView) {
        return (
            <div className="min-h-screen flex bg-gray-50 text-gray-800">
                <OperatorSidebar />
                <div className="flex flex-col flex-1 w-full">
                    <Header currentPage={page} setPage={setPage} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
                    <PageRenderer />
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-orange-50 to-amber-100 font-sans text-gray-800">
            <Header currentPage={page} setPage={setPage} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            <main className="flex-grow">
                <PageRenderer />
            </main>
            <Footer />
        </div>
    );
};

export default App;
