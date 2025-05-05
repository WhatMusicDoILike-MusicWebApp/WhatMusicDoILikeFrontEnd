import './index.css'
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from 'react-router-dom';

import RootLayout from './layouts/root-layout.tsx'
import { LandingPage } from './components/pages/landing-page/LandingPage.tsx';
import { SignUpPage } from './components/pages/sign-up/SignUpPage.tsx';
import DashboardLayout from './layouts/dashboard-layout.tsx';
import { DashboardPage } from './components/pages/dashboard/DashboardPage.tsx';
import { SignInPage } from './components/pages/sign-in/SignInPage.tsx';

export const DEV_MODE = 'TRUE'//import.meta.env.DEV_MODE;

export const BACKEND_ENDPOINT = DEV_MODE == 'TRUE' ? 'http://127.0.0.1:5000' : 'https://api.whatmusicdoilike.com';

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: '/*', element: <LandingPage /> },
      { path: '/sign-in/*', element: <SignInPage /> },
      { path: '/sign-up/*', element: <SignUpPage /> },
      {
        element: <DashboardLayout />,
        path: 'dashboard',
        children: [
          { path: '', element: <DashboardPage /> }, // Handles "/dashboard"
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
