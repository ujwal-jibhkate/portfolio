import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './components/Navigation';
import ScrollToTop from './components/ScrollToTop';
//import CustomCursor from './components/CustomCursor'; // 1. Import the new component


function App() {
  return (
    <>
      <Navigation />
      
      {/* Reset scroll to top on every route change */}
      <ScrollToTop />

      <main className="bg-black text-white">
        <Outlet /> 
      </main>
    </>
  );
}

export default App;