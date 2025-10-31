
import React from 'react';
import { Page } from '../types';

interface HeaderProps {
  currentPage: Page;
  setPage: (page: Page) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (loggedIn: boolean) => void;
}

const NavLink: React.FC<{
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 text-sm font-semibold transition-colors duration-300 ${
      isActive
        ? 'text-orange-600 border-b-2 border-orange-600'
        : 'text-gray-600 hover:text-orange-600'
    }`}
  >
    {label}
  </button>
);

export const Header: React.FC<HeaderProps> = ({ currentPage, setPage, isLoggedIn, setIsLoggedIn }) => {
  
  const passengerPages = ['HOME', 'FIND_BUS', 'MY_TICKETS', 'HELP', 'CONTACT'];
  const operatorPages = ['OPERATOR_DASHBOARD'];
  const isPassengerView = !operatorPages.includes(currentPage);
  
  const handleLoginLogout = () => {
      if(isLoggedIn){
          setIsLoggedIn(false);
          setPage('HOME');
      } else {
          setPage('LOGIN');
      }
  }

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-4">
            <svg className="w-10 h-10 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v11.494m-6-5.747h12M5 12.5a7.5 7.5 0 0114 0" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h8a2 2 0 002-2v-1a2 2 0 012-2h1.945" />
            </svg>
            <span className="text-xl font-bold text-gray-800">
              {isPassengerView ? "BUS RWANDA" : "BUS RWANDA OPERATOR PORTAL"}
            </span>
          </div>
          
          {isPassengerView && (
            <nav className="hidden md:flex items-center space-x-2">
              <NavLink label="HOME" isActive={currentPage === 'HOME'} onClick={() => setPage('HOME')} />
              <NavLink label="FIND BUS" isActive={currentPage === 'FIND_BUS'} onClick={() => setPage('FIND_BUS')} />
              <NavLink label="MY TICKETS" isActive={currentPage === 'MY_TICKETS'} onClick={() => setPage('MY_TICKETS')} />
              <NavLink label="HELP" isActive={currentPage === 'HELP'} onClick={() => setPage('HELP')} />
              <NavLink label="CONTACT" isActive={currentPage === 'CONTACT'} onClick={() => setPage('CONTACT')} />
            </nav>
          )}

          <div className="flex items-center space-x-3">
            <button
              onClick={handleLoginLogout}
              className="px-5 py-2 text-sm font-semibold text-orange-600 bg-white border border-orange-200 rounded-full hover:bg-orange-50 transition-colors"
            >
             {isLoggedIn ? "LOG OUT" : "LOG IN"}
            </button>
            {!isLoggedIn && isPassengerView && (
                <button
                onClick={() => setPage('REGISTER')}
                className="px-5 py-2 text-sm font-semibold text-white bg-orange-500 rounded-full hover:bg-orange-600 transition-colors"
                >
                REGISTER
                </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
