import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

// Import our new page components
import HomePage from './pages/HomePage.jsx';
import AboutPage from './pages/AboutPage.jsx'; // We will create this next
import PublicationsPage from './pages/PublicationsPage.jsx'; // 1. Import the new page
import ContactPage from './pages/ContactPage.jsx'; // 1. Import the new page
import ProjectsPage from './pages/ProjectsPage.jsx'; // 1. Import the new page


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // The App component is our root layout
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },  
      {
        path: "/publications",
        element: <PublicationsPage />,
      },
      {
        path: "/contact",
        element: <ContactPage />,
      },  
      {
        path: "/projects",
        element: <ProjectsPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);