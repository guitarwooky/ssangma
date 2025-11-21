import React, { useState, useEffect } from 'react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { name: '홈', href: '#home' },
    { name: '서비스', href: '#services' },
    { name: '포트폴리오', href: '#portfolio' },
    { name: '고객후기', href: '#reviews' },
    { name: '문의하기', href: '#contact' },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo */}
        <a 
            href="#home" 
            onClick={(e) => handleScrollTo(e, '#home')}
            className="flex items-center gap-3 group cursor-pointer"
        >
          {/* Image Logo */}
          <div className="h-10 md:h-12 flex items-center justify-center shrink-0">
             <img 
               src="https://i.postimg.cc/j2zCWbwb/seukeulinsyas-2025-11-21-175814.png" 
               alt="쌍마타일 로고" 
               className="h-full w-auto object-contain rounded-md shadow-sm" 
             />
          </div>
          
          <div className="flex flex-col">
            <span className={`text-xl md:text-2xl font-bold tracking-tight leading-none ${isScrolled ? 'text-primary' : 'text-white'} group-hover:text-accent transition-colors`}>
              쌍마타일
            </span>
            <span className={`text-[0.65rem] md:text-xs font-medium tracking-widest uppercase ${isScrolled ? 'text-slate-500' : 'text-slate-200'}`}>
              Bath & Tile
            </span>
          </div>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleScrollTo(e, link.href)}
              className={`font-medium hover:text-accent transition-colors cursor-pointer ${
                isScrolled ? 'text-slate-700' : 'text-slate-100 shadow-sm'
              }`}
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`focus:outline-none ${isScrolled ? 'text-slate-800' : 'text-white'}`}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-xl absolute w-full top-full left-0 border-t border-slate-100">
          <div className="px-4 pt-4 pb-6 space-y-2 flex flex-col items-center">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                className="block px-3 py-3 text-lg font-medium text-slate-700 hover:text-accent w-full text-center rounded-lg hover:bg-slate-50 cursor-pointer"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;