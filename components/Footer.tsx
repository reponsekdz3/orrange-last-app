
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-transparent py-6 mt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500 text-sm">
        <div className="flex justify-center space-x-6">
          <a href="#" className="hover:text-orange-600">Terms & Conditions</a>
          <a href="#" className="hover:text-orange-600">Privacy Policy</a>
        </div>
        <p className="mt-4">&copy; {new Date().getFullYear()} Bus Rwanda. All rights reserved.</p>
      </div>
    </footer>
  );
};
