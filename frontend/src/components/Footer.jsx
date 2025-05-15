import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white shadow-inner mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center justify-center space-y-4">
          {/* Logo and Name */}
          <div className="text-gray-700 font-semibold text-lg">
            Military Surveillance System
          </div>
          
          {/* Links */}
          <div className="flex space-x-6">
            <a href="#" className="text-gray-600 hover:text-primary-600 transition-colors">
              About
            </a>
            <a href="#" className="text-gray-600 hover:text-primary-600 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-600 hover:text-primary-600 transition-colors">
              Contact
            </a>
          </div>
          
          {/* Copyright */}
          <div className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Military Surveillance. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 