import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Home.tsx';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element not found');

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
]);

createRoot(rootElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
