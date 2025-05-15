import React from 'react';
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  BuildingOfficeIcon,
  WifiIcon,
  WindowIcon,
  WrenchIcon,
  WrenchScrewdriverIcon,
  XCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

const contactMethods = [
  {
    name: 'Phone',
    description: 'Monday to Friday, 9AM to 5PM IST',
    link: 'tel:+1234567890',
    value: '+1 (234) 567-890',
    icon: PhoneIcon,
  },
  {
    name: 'Email',
    description: 'We\'ll respond within 24 hours',
    link: 'mailto:contact@military-surveillance.com',
    value: 'contact@military-surveillance.com',
    icon: EnvelopeIcon,
  },
  {
    name: 'Office',
    description: 'Come say hello at our office',
    value: '100 Military Tech Park, Defense Colony, New Delhi - 110024',
    icon: BuildingOfficeIcon,
  },
  {
    name: 'Training Center',
    description: 'Visit our training facility',
    value: 'Military Training Complex, Sector 15, Noida - 201301',
    icon: MapPinIcon,
  },
];

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-blue-900 mb-8" style={{ textAlign: 'center' }}>Contact Us</h2>

      <div className="bg-white rounded-lg p-6">
        <div className="prose max-w-none">
          <p className="text-gray-600 mb-6">
            Get in touch with our team of experts for any queries about our military surveillance and detection solutions. We're here to help you enhance your security capabilities.
          </p>
          <ul className="space-y-4 flex justify-center">
            <li className="flex items-start">
              <PhoneIcon className="h-6 w-6 text-primary-600 mr-2 mt-1" />
              <div>
                <span className="text-gray-900 font-semibold">Phone</span>
                <p className="text-gray-600">
                  +1 (234) 567-890
                  <br />
                  Monday to Friday, 9AM to 5PM IST
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <EnvelopeIcon className="h-6 w-6 text-primary-600 mr-2 mt-1" />
              <div>
                <span className="text-gray-900 font-semibold">Email</span>
                <p className="text-gray-600">
                  contact@military-surveillance.com
                  <br />
                  We'll respond within 24 hours
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <BuildingOfficeIcon className="h-6 w-6 text-primary-600 mr-2 mt-1" />
              <div>
                <span className="text-gray-900 font-semibold">Office</span>
                <p className="text-gray-600">
                  100 Military Tech Park, Defense Colony
                  <br />
                  New Delhi - 110024
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <MapPinIcon className="h-6 w-6 text-primary-600 mr-2 mt-1" />
              <div>
                <span className="text-gray-900 font-semibold">Training Center</span>
                <p className="text-gray-600">
                  Military Training Complex, Sector 15
                  <br />
                  Noida - 201301
                </p>
              </div>
            </li>
          </ul>
          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4 flex justify-center">Send us a Message</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div>
                <label htmlFor="firstName" className="block text-sm font-semibold text-gray-900">
                  First name
                </label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  required
                  className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-primary-600 focus:ring-primary-600 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-semibold text-gray-900">
                  Last name
                </label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  required
                  className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-primary-600 focus:ring-primary-600 sm:text-sm"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="email" className="block text-sm font-semibold text-gray-900">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-primary-600 focus:ring-primary-600 sm:text-sm"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-900">
                  Phone number
                </label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  required
                  className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-primary-600 focus:ring-primary-600 sm:text-sm"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="message" className="block text-sm font-semibold text-gray-900">
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  required
                  className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-primary-600 focus:ring-primary-600 sm:text-sm"
                />
              </div>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="rounded-md bg-[#60a5fa] px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60a5fa]"
              >
                Send message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact; 