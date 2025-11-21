import React, { useState } from 'react';
import { createPortal } from 'react-dom';

const Portfolio: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<{src: string, title: string} | null>(null);

  const projects = [
    { id: 1, title: '욕실 전체 리모델링', category: '아파트 시공', img: 'https://i.postimg.cc/HL22yqMv/seukeulinsyas-2025-11-21-180955.png' },
    { id: 2, title: '모던 스타일 욕실', category: '주택 시공', img: 'https://i.postimg.cc/fbKK9Gdr/seukeulinsyas-2025-11-21-181004.png' },
    { id: 3, title: '프리미엄 타일 시공', category: '고급형 리모델링', img: 'https://i.postimg.cc/fbKK9Gd1/seukeulinsyas-2025-11-21-181026.png' },
    { id: 4, title: '깔끔한 마감 시공', category: '욕실 공사', img: 'https://i.postimg.cc/1zHHqkFL/seukeulinsyas-2025-11-21-181036.png' },
    { id: 5, title: '실용적인 디자인', category: '부분 리모델링', img: 'https://i.postimg.cc/76ZNMKM8/seukeulinsyas-2025-11-21-181044.png' },
    { id: 6, title: '최신 트렌드 욕실', category: '신축/구축 시공', img: 'https://i.postimg.cc/JnzQcpcr/seukeulinsyas-2025-11-21-181053.png' },
  ];

  return (
    <section id="portfolio" className="py-20 bg-slate-50 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">포트폴리오</h2>
            <div className="w-16 h-1 bg-accent mb-4"></div>
            <p className="text-slate-600">
              쌍마타일이 직접 시공한 현장 모습입니다. 이미지를 클릭하면 크게 볼 수 있습니다.
            </p>
          </div>
          <a 
            href="https://blog.naver.com/wjddnjsdnr21" 
            target="_blank" 
            rel="noreferrer"
            className="hidden md:inline-flex items-center text-accent font-bold hover:text-sky-700 transition-colors"
          >
            더 많은 시공사례 보기 (네이버 블로그) →
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div 
              key={project.id} 
              className="group relative overflow-hidden rounded-xl shadow-lg cursor-pointer bg-white"
              onClick={() => setSelectedImage({src: project.img, title: project.title})}
            >
              <div className="aspect-w-4 aspect-h-3 w-full h-64 overflow-hidden">
                <img 
                    src={project.img} 
                    alt={project.title} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-accent text-sm font-bold mb-1">{project.category}</span>
                <h3 className="text-white text-xl font-bold">{project.title}</h3>
                <span className="text-slate-300 text-sm mt-2 inline-block opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 delay-100">
                    클릭하여 확대보기
                </span>
              </div>
              {/* Mobile visible caption */}
              <div className="md:hidden absolute bottom-0 left-0 right-0 bg-black/50 p-2 backdrop-blur-sm">
                 <p className="text-white text-sm text-center font-medium">{project.title}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center md:hidden">
             <a 
            href="https://blog.naver.com/wjddnjsdnr21" 
            target="_blank" 
            rel="noreferrer"
            className="inline-block px-6 py-3 bg-white border border-slate-300 rounded-lg text-slate-700 font-bold shadow-sm"
          >
            네이버 블로그 바로가기
          </a>
        </div>
      </div>

      {/* Lightbox Modal - Rendered via Portal */}
      {selectedImage && createPortal(
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
           <div 
             className="relative max-w-5xl w-full max-h-screen flex flex-col items-center animate-fade-in-up"
             onClick={(e) => e.stopPropagation()}
           >
             <img 
               src={selectedImage.src} 
               alt={selectedImage.title}
               className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl cursor-default bg-black"
             />
             <p className="text-white mt-4 text-xl font-bold text-center drop-shadow-md">{selectedImage.title}</p>
             <button 
                className="absolute -top-10 right-0 md:-right-10 text-white hover:text-accent transition-colors p-2"
                onClick={() => setSelectedImage(null)}
             >
               <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
               </svg>
             </button>
           </div>
        </div>,
        document.body
      )}
    </section>
  );
};

export default Portfolio;