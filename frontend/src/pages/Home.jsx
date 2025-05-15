import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheckIcon,
  ChartBarIcon,
  ClockIcon,
  CameraIcon,
  ArrowRightIcon,
  BoltIcon,
  SignalIcon
} from '@heroicons/react/24/outline';

const features = [
  {
    name: 'Military-Grade Detection',
    description: 'Advanced algorithms trained on extensive military datasets for precise identification of vehicles, aircraft, and equipment.',
    icon: ShieldCheckIcon,
  },
  {
    name: 'Real-Time Analysis',
    description: 'Instant threat detection and classification with sub-second response times for critical decision-making.',
    icon: ClockIcon,
  },
  {
    name: 'High Precision',
    description: 'Industry-leading 68% accuracy in object detection and classification under various environmental conditions.',
    icon: ChartBarIcon,
  },
];

const metrics = [
  { id: 1, name: 'Processing Speed', value: '10ms' },
  { id: 2, name: 'Detection Accuracy', value: '99.9%' },
  { id: 3, name: 'False Positive Rate', value: '<0.1%' },
  { id: 4, name: 'Active Deployments', value: '120+' },
];

const useCases = [
  {
    title: 'Perimeter Security',
    description: 'Automated surveillance of military bases and sensitive installations',
    icon: CameraIcon,
  },
  {
    title: 'Threat Assessment',
    description: 'Real-time identification and classification of potential threats',
    icon: BoltIcon,
  },
  {
    title: 'Military Object Detection',
    description: 'Automated identification of military targets in satellite and aerial images',
    icon: SignalIcon,
  },
];

const Home = () => {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-blue-100 via-blue-200 to-blue-50">
        <div className="mx-auto max-w-7xl px-6 pt-10 pb-24 sm:pb-32 lg:px-8 lg:py-40">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Military Surveillance & Object Detection
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Advanced system for real-time detection and classification of military objects with industry-leading accuracy and reliability.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="/detection"
                className="rounded-md bg-[#60a5fa] px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#60a5fa] flex items-center"
              >
                Start Detection
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Link>
              <a href="#features" className="text-sm font-semibold leading-6 text-gray-600 hover:text-blue-600">
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Section */}
      <div className="bg-blue-50 py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-4">
            {metrics.map((stat) => (
              <div key={stat.id} className="mx-auto flex max-w-xs flex-col gap-y-4">
                <dt className="text-base leading-7 text-gray-600">{stat.name}</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-24 sm:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Advanced Technology</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Military-Grade Detection System
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Our system combines cutting-edge technology with military expertise to deliver unparalleled detection capabilities.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {features.map((feature) => (
                <div key={feature.name} className="flex flex-col bg-blue-50 rounded-2xl p-8 shadow-sm ring-1 ring-gray-200 hover:shadow-md transition-shadow duration-300">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                    <feature.icon className="h-6 w-6 flex-none text-blue-600" aria-hidden="true" />
                    {feature.name}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">{feature.description}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Use Cases Section */}
      <div className="bg-blue-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Deployment Scenarios
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Our system is designed to meet diverse military surveillance needs across various operational environments.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3">
              {useCases.map((useCase) => (
                <div key={useCase.title} className="relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                    <useCase.icon className="h-6 w-6 flex-none text-blue-600" aria-hidden="true" />
                    {useCase.title}
                  </dt>
                  <dd className="mt-4 text-base leading-7 text-gray-600">{useCase.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-400">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to enhance your surveillance capabilities?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-blue-50">
              Experience the power of ourdriven military object detection.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="/detection"
                className="rounded-md bg-white px-5 py-3 text-sm font-semibold text-blue-400 shadow-sm hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Start Detection
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 