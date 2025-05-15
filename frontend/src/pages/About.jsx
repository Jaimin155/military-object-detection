import React from 'react';
import { AcademicCapIcon, CodeBracketIcon, ChartBarIcon } from '@heroicons/react/24/outline';

const About = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-blue-900 mb-8" style={{ textAlign: 'center' }}>About Us</h2>

      <div className="bg-white rounded-lg p-6">
        <div className="prose max-w-none">
          <p className="text-gray-600 mb-6">
            This project implements a military object detection and classification using Computer Vision. The system can identify various military objects such as artillery, missiles and tanks with high accuracy.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Key Features</h3>
          <ul className="space-y-4">
            <li className="flex items-start">
              <AcademicCapIcon className="h-6 w-6 text-primary-600 mr-2 mt-1" />
              <span className="text-gray-600">
                Advanced model for accurate object detection and classification
              </span>
            </li>
            <li className="flex items-start">
              <CodeBracketIcon className="h-6 w-6 text-primary-600 mr-2 mt-1" />
              <span className="text-gray-600">
                Real-time processing capabilities for immediate threat assessment
              </span>
            </li>
            <li className="flex items-start">
              <ChartBarIcon className="h-6 w-6 text-primary-600 mr-2 mt-1" />
              <span className="text-gray-600">
                High accuracy in identifying various military objects
              </span>
            </li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Technology Stack</h3>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>React.js for the frontend interface</li>
            <li>Tailwind CSS for styling</li>
            <li>Python with its libraries for the model</li>
            <li>RESTful API for communication between frontend and backend</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Project Goals</h3>
          <p className="text-gray-600">
            The primary goal of this project is to provide a reliable and efficient system for military surveillance and object detection. By leveraging the power of computer vision, we aim to enhance situational awareness and improve response times in military operations.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About; 