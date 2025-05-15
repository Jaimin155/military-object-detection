# Military Surveillance and Object Detection Frontend

This is the frontend application for the Military Surveillance and Object Detection system. It provides a user-friendly interface for uploading images and viewing detection results.

## Features

- Modern and responsive UI built with React.js and Tailwind CSS
- Image upload and preview functionality
- Real-time object detection results display
- Interactive bounding box visualization
- Loading states and error handling

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository
2. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

To start the development server:

```bash
npm start
```

The application will be available at `http://localhost:3000`

## Building for Production

To create a production build:

```bash
npm run build
```

The build files will be created in the `build` directory.

## Project Structure

```
frontend/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Page components
│   ├── App.jsx        # Main application component
│   ├── index.js       # Application entry point
│   └── index.css      # Global styles
├── public/            # Static assets
├── package.json       # Project dependencies
└── tailwind.config.js # Tailwind CSS configuration
```

## Technologies Used

- React.js
- Tailwind CSS
- React Router
- Heroicons 