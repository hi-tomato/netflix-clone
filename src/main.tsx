import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import {
  createBrowserRouter,
  RouteObject,
  RouterProvider
} from 'react-router-dom';
import NotFound from './pages/NotFound.tsx';
import Videos from './pages/Videos.tsx';
import VideoDetail from './pages/VideoDetail.tsx';
import Login from '@pages/Login.tsx';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Videos /> },
      { path: '/login', element: <Login /> },
      { path: '/videos', element: <Videos /> },
      { path: '/videos/:keyword', element: <Videos /> },
      { path: '/videos/watch/:watchId', element: <VideoDetail /> }
    ]
  }
];
const router = createBrowserRouter(routes);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
