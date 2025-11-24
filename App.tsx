import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Reviews from './components/Reviews';
import Contact from './components/Contact';
import AIConsultant from './components/AIConsultant';
import EstimateModal from './components/EstimateModal';

const App: React.FC = () => {
  const [isEstimateModalOpen, setIsEstimateModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <main>
        <Hero onOpenModal={() => setIsEstimateModalOpen(true)} />
        <Services />
        <Portfolio />
        <Reviews />
        <Contact onOpenModal={() => setIsEstimateModalOpen(true)} />
      </main>

      <AIConsultant />
      <EstimateModal 
        isOpen={isEstimateModalOpen} 
        onClose={() => setIsEstimateModalOpen(false)} 
      />
    </div>
  );
};

export default App;