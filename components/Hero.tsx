import React from 'react';

interface HeroProps {
  onOpenModal: () => void;
}

const Hero: React.FC<HeroProps> = ({ onOpenModal }) => {
  const handleScrollToPortfolio = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('portfolio');
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
            // Using Google Drive direct link format for the provided image ID: 1_c84xmfPbXzIKOXFoSHd8GY4CJNNdOjW
            backgroundImage: "url('https://lh3.googleusercontent.com/d/1_c84xmfPbXzIKOXFoSHd8GY4CJNNdOjW')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundColor: 'black'
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h2 className="text-accent font-bold text-lg md:text-xl mb-4 tracking-wider uppercase animate-fade-in-up">
          광주 욕실 리모델링의 기준
        </h2>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
          당신의 욕실을 <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-orange-400">
            가장 아름다운 공간
          </span>으로
        </h1>
        <p className="text-slate-300 text-lg md:text-xl mb-10 max-w-2xl mx-auto font-light">
          쌍마타일은 합리적인 가격과 꼼꼼한 시공으로 고객님의 만족을 최우선으로 생각합니다.
          오래된 욕실, 주방, 베란다 타일까지 완벽하게 책임집니다.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button 
            onClick={onOpenModal}
            className="px-8 py-4 bg-accent hover:bg-red-700 text-white font-bold rounded-lg shadow-lg transform hover:-translate-y-1 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
          >
             <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
             </svg>
            무료 견적 문의
          </button>
          <a 
            href="#portfolio" 
            onClick={handleScrollToPortfolio}
            className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-slate-900 transition-all duration-300 flex items-center justify-center cursor-pointer"
          >
            시공 사례 보기
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;