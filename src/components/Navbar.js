import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">MyApp</div>
        <div>
          <Link to="/" className="text-gray-300 hover:text-white mx-2">
            Home
          </Link>
          <Link to="/dashboard" className="text-gray-300 hover:text-white mx-2">
            Dashboard
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
