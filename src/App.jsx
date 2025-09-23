import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './components/Navigation';
import InvitationSection from './components/InvitationSection';

function App() {
  return (
    <>
      <Navigation />
      
      <main className="bg-black text-white">
        <Outlet /> 
      </main>
      
      <InvitationSection />
    </>
  );
}

export default App;