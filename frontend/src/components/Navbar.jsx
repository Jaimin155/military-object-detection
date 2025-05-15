import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheckIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Detection', href: '/detection' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <ShieldCheckIcon className="h-8 w-8 text-primary-600" />
            <span className="ml-2 text-xl font-bold text-gray-800">
              Military Surveillance
            </span>
          </div>
          <div className="hidden md:flex space-x-8">
            <Link
              to="/"
              className="text-gray-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Home
            </Link>
            <Link
              to="/detection"
              className="text-gray-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Detection
            </Link>
            <Link
              to="/about"
              className="text-gray-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-gray-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 