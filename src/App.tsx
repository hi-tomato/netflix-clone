import React from 'react';
import './App.css';
import { Outlet } from 'react-router-dom';
import Navbar from '@components/Navbar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Navbar />
        <Outlet />
      </QueryClientProvider>
    </>
  );
}

export default App;
