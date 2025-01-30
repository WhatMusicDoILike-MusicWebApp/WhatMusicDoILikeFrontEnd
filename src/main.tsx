import './index.css'
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from 'react-router-dom';

import RootLayout from './layouts/root-layout.tsx'
import DashboardLayout from './layouts/dashboard-layout.tsx';
import { HomePage } from './components/pages/Home.tsx';

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: '/*', element: <HomePage /> },
      // { path: '/sign-in/*', element: <SignInPage /> },
      // { path: '/sign-up/*', element: <SignUpPage /> },
      // {
      //   element: <DashboardLayout />,
      //   path: 'dashboard',
      //   children: [
      //     { path: '/dashboard/:userId', element: <DashboardPage /> },
      //   ],
      // },
    ],
  },
]);

export const databaseEndpoint = 'localhost:8443';

console.log(`Using database endpoint: ${databaseEndpoint}`);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

