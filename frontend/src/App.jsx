import React from 'react';
import Sidebar from './components/Sidebar';
import Hero from './components/Hero';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Users from './pages/Users';
import { DetailProvider } from './context/UseContext';

const App = () => {
  return (
    <DetailProvider>
      <BrowserRouter>
        <div className='flex h-screen'>
          <Sidebar className="w-1/5" /> {/* Sidebar taking 20% width */}
          <main className="flex-1 overflow-auto p-6"> {/* Main content area */}
            <Routes>
              <Route path='/' element={<Hero />} />
              <Route path='/user/:id' element={<Users />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </DetailProvider>
  );
};

export default App;
