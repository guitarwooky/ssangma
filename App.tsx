import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Reviews from './components/Reviews';
import Contact from './components/Contact';
import AIConsultant from './components/AIConsultant';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <main>
        <Hero />
        <Services />
        <Portfolio />
        <Reviews />
        <Contact />
      </main>

      <AIConsultant />
    </div>
  );
};

export default App;