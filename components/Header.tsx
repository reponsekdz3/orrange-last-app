import React, { useContext } from 'react';
import { Page } from '../types';
import { AppContext } from '../App';
import { NotificationBell } from './NotificationBell';

const NavLink: React.FC<{
  label: string;
  page: Page;
}> = ({ label, page }) => {
  const { page: currentPage, setPage } = useContext(AppContext);
  return (
    <button
      onClick={() => setPage(page)}
      className={`px-4 py-2 text-sm font-semibold transition-colors duration-300 ${
        currentPage === page
          ? 'text-orange-600 border-b-2 border-orange-600'
          : 'text-gray-600 hover:text-orange-600'
      }`}
    >
      {label}
    </button>
  );
};

export const Header: React.FC = () => {
  const { page, setPage, user, logout } = useContext(AppContext);

  const isOperatorView = user?.type === 'operator' && [
      'OPERATOR_DASHBOARD', 
      'OPERATOR_ROUTES', 
      'OPERATOR_BUSES', 
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
              {isOperatorView ? "BUS RWANDA OPERATOR PORTAL" : "BUS RWANDA"}
            </span>
          </button>
          
          {!isOperatorView && (
            <nav className="hidden md:flex items-center space-x-2">
              <NavLink label="HOME" page="HOME" />
              <NavLink label="FIND BUS" page="FIND_BUS" />
              <NavLink label="SERVICES" page="SERVICES" />
              <NavLink label="NETWORK MAP" page="NETWORK_MAP" />
              {user && <NavLink label="MY TICKETS" page="MY_TICKETS" />}
              <NavLink label="HELP" page="HELP" />
              <NavLink label="CONTACT" page="CONTACT" />
               {user && <NavLink label="ACCOUNT" page="ACCOUNT_SETTINGS" />}
            </nav>
          )}

          <div className="flex items-center space-x-3">
            {user && !isOperatorView && <NotificationBell notifications={user.notifications} />}
            {user ? (
              <button
                onClick={logout}
                className="px-5 py-2 text-sm font-semibold text-orange-600 bg-white border border-orange-200 rounded-full hover:bg-orange-50 transition-colors"
              >
                LOG OUT
              </button>
            ) : (
              <>
                <button
                  onClick={() => setPage('LOGIN')}
                  className="px-5 py-2 text-sm font-semibold text-orange-600 bg-white border border-orange-200 rounded-full hover:bg-orange-50 transition-colors"
                >
                  LOG IN
                </button>
                <button
                  onClick={() => setPage('REGISTER')}
                  className="px-5 py-2 text-sm font-semibold text-white bg-orange-500 rounded-full hover:bg-orange-600 transition-colors"
                >
                  REGISTER
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};