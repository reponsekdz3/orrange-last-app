import React, { useContext, useState, useRef, useEffect } from 'react';
import { Page } from '../types';
import { AppContext } from '../App';
import { NotificationBell } from './NotificationBell';

const NavLink: React.FC<{
  label: string;
  page: Page;
  onClick?: () => void;
}> = ({ label, page, onClick }) => {
  const { page: currentPage, setPage } = useContext(AppContext);
  const handleClick = () => {
    if (onClick) onClick();
    setPage(page);
  };
  return (
    <button
      onClick={handleClick}
      className={`px-4 py-2 text-sm font-semibold transition-colors duration-300 whitespace-nowrap ${
        currentPage === page
          ? 'text-orange-600'
          : 'text-gray-600 hover:text-orange-600'
      }`}
    >
      {label}
    </button>
  );
};

const Dropdown: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="relative" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
            <button className="px-4 py-2 text-sm font-semibold text-gray-600 hover:text-orange-600 flex items-center transition-colors">
                {label}
                <svg className={`w-4 h-4 ml-1 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>
            {isOpen && (
                <div className="absolute top-full mt-2 w-max bg-white rounded-lg shadow-xl overflow-hidden z-50 animate-fade-in-down">
                    {children}
                </div>
            )}
            <style>{`
                @keyframes fade-in-down {
                    0% { opacity: 0; transform: translateY(-10px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-down { animation: fade-in-down 0.2s ease-out; }
            `}</style>
        </div>
    );
}

const ProfileDropdown: React.FC = () => {
    const { user, logout, setPage } = useContext(AppContext);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    if (!user) return null;

    return (
        <div className="relative" ref={dropdownRef}>
            <button onClick={() => setIsOpen(!isOpen)} className="flex items-center space-x-2">
                <img src={user.profilePicture || `https://ui-avatars.com/api/?name=${user.name.replace(' ', '+')}&background=F97316&color=fff`} alt="Profile" className="w-9 h-9 rounded-full border-2 border-orange-200" />
                <span className="text-sm font-semibold text-gray-700 hidden md:inline">{user.name}</span>
                 <svg className={`w-4 h-4 ml-1 text-gray-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>
            {isOpen && (
                 <div className="absolute top-full mt-3 right-0 w-64 bg-white rounded-lg shadow-xl overflow-hidden z-50 animate-fade-in-down">
                    <div className="p-4 border-b">
                        <p className="font-bold text-gray-800">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                    <div className="py-2">
                        <a href="#" onClick={() => { setPage('ACCOUNT_SETTINGS'); setIsOpen(false); }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600">Dashboard</a>
                        <a href="#" onClick={() => { setPage('MY_TICKETS'); setIsOpen(false); }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600">My Tickets</a>
                         <a href="#" onClick={() => { setPage('ACCOUNT_SETTINGS'); setIsOpen(false); }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600">Wallet</a>
                         <a href="#" onClick={() => { setPage('ACCOUNT_SETTINGS'); setIsOpen(false); }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600">Settings</a>
                    </div>
                    <div className="p-2 border-t">
                        <button onClick={logout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md">Log Out</button>
                    </div>
                </div>
            )}
        </div>
    );
}

const ServicesDropdown: React.FC = () => {
    const { setPage } = useContext(AppContext);
    
    const services = [
        { title: 'Express', description: 'Fast and efficient travel.', icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg> },
        { title: 'Luxury', description: 'Premium comfort and amenities.', icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-12v4m-2-2h4m5 10v4m-2-2h4M5 3a2 2 0 00-2 2v1h16V5a2 2 0 00-2-2H5zM3 17a2 2 0 002 2h14a2 2 0 002-2v-5H3v5z" /></svg> },
        { title: 'Budget', description: 'Affordable and reliable travel.', icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg> },
        { title: 'Private Charter', description: 'Book a bus for your group.', icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.124-1.282-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.124-1.282.356-1.857m0 0a3.001 3.001 0 015.658 0M9 9a3 3 0 11-6 0 3 3 0 016 0zm12 0a3 3 0 11-6 0 3 3 0 016 0zM9 9a3 3 0 00-3 3v1h6v-1a3 3 0 00-3-3zm12 0a3 3 0 00-3 3v1h6v-1a3 3 0 00-3-3z" /></svg> },
    ];

    return (
        <Dropdown label="Services">
            <div className="grid grid-cols-2 gap-2 p-4 w-[28rem]">
                {services.map(s => (
                    <a key={s.title} href="#" onClick={() => setPage('SERVICES')} className="p-3 rounded-lg hover:bg-orange-50 flex items-start space-x-3">
                        <div className="text-orange-500 mt-1">{s.icon}</div>
                        <div>
                            <p className="font-semibold text-gray-800">{s.title}</p>
                            <p className="text-xs text-gray-500">{s.description}</p>
                        </div>
                    </a>
                ))}
            </div>
        </Dropdown>
    );
};

export const Header: React.FC = () => {
  const { page, setPage, user } = useContext(AppContext);

  const isOperatorView = user?.type === 'operator' && [
      'OPERATOR_DASHBOARD', 
      'OPERATOR_ROUTES', 
      'OPERATOR_BUSES', 
      'OPERATOR_DRIVERS',
      'OPERATOR_SCHEDULES',
      'OPERATOR_REPORTS',
      'OPERATOR_SETTINGS'
    ].includes(page);

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <button onClick={() => setPage(isOperatorView ? 'OPERATOR_DASHBOARD' : 'HOME')} className="flex items-center space-x-4">
            <svg className="w-10 h-10 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v11.494m-6-5.747h12M5 12.5a7.5 7.5 0 0114 0" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h8a2 2 0 002-2v-1a2 2 0 012-2h1.945" />
            </svg>
            <span className="text-xl font-bold text-gray-800">
              {isOperatorView ? "OPERATOR PORTAL" : "BUS RWANDA"}
            </span>
          </button>
          
          {!isOperatorView && (
            <nav className="hidden md:flex items-center">
              <NavLink label="Home" page="HOME" />
              <NavLink label="Find Bus" page="FIND_BUS" />
              <ServicesDropdown />
              <NavLink label="Network Map" page="NETWORK_MAP" />
              <NavLink label="Help" page="HELP" />
            </nav>
          )}

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {!isOperatorView && <NotificationBell notifications={user.notifications} />}
                 <button
                  onClick={() => setPage('FIND_BUS')}
                  className="px-5 py-2 text-sm font-semibold text-white bg-orange-500 rounded-full hover:bg-orange-600 transition-colors hidden lg:block"
                >
                  Book a Trip
                </button>
                <ProfileDropdown />
              </>
            ) : (
              <>
                <button
                  onClick={() => setPage('LOGIN')}
                  className="px-5 py-2 text-sm font-semibold text-orange-600 hover:bg-orange-100 rounded-full transition-colors"
                >
                  Log In
                </button>
                <button
                  onClick={() => setPage('REGISTER')}
                  className="px-5 py-2 text-sm font-semibold text-white bg-orange-500 rounded-full hover:bg-orange-600 transition-colors"
                >
                  Register
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
