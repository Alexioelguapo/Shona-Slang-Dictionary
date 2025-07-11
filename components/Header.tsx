
import React from 'react';
import { APP_TITLE } from '../constants';

const Header: React.FC = () => {
  return (
    <header className="text-center py-8 px-4">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-yellow-300 to-red-400">
        {APP_TITLE}
      </h1>
      <p className="mt-2 text-lg text-gray-400">Your AI-powered guide to Zim slang.</p>
    </header>
  );
};

export default Header;
