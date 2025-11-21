import React, { useState } from 'react';
import AdminDashboard from './AdminDashboard';

const Contact: React.FC = () => {
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  return (
    <section id="contact" className="py-20 bg-slate-900 text-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div>
            <h2 className="text-3xl font-bold mb-6">무료 견적 문의</h2>
            <p className="text-slate-400 mb-10">
              궁금한 점이 있으시거나 견적이 필요하시면 언제든지 연락주세요.
              친절하게 상담해 드리겠습니다.
            </p>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-slate-800 p-3 rounded-lg mr-4">
                  <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg">전화 문의</h3>
                  <p className="text-slate-300 text-xl mt-1">010-3631-3152</p>
                  <p className="text-sm text-slate-500">평일/토요일 09:00 ~ 18:00</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-slate-800 p-3 rounded-lg mr-4">
                  <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg">이메일</h3>
                  <p className="text-slate-300 mt-1">s601108@naver.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-slate-800 p-3 rounded-lg mr-4">
                  <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg">오시는 길</h3>
                  <p className="text-slate-300 mt-1">광주 동구 독립로 376</p>
                </div>
              </div>
              
               <div className="flex flex-wrap gap-4 mt-8">
                <a 
                    href="https://blog.naver.com/wjddnjsdnr21" 
                    target="_blank" 
                    rel="noreferrer"
                    className="px-6 py-3 bg-[#03C75A] hover:bg-[#02b351] rounded-lg font-bold text-white transition-colors"
                >
                    네이버 블로그
                </a>
                 <a 
                    href="https://www.daangn.com/kr/local-profile/%EC%8C%8D%EB%A7%88%ED%83%80%EC%9D%BC-%EC%9A%95%EC%8B%A4%EB%A6%AC%EB%AA%A8%EB%8D%B8%EB%A7%81-wkgco2wh7d6t/?in=%EC%B9%98%ED%8F%89%EB%8F%99-1015" 
                    target="_blank" 
                    rel="noreferrer"
                    className="px-6 py-3 bg-[#FF6F0F] hover:bg-[#e65f00] rounded-lg font-bold text-white transition-colors"
                >
                    당근마켓
                </a>
                <a 
                    href="mailto:s601108@naver.com"
                    className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-bold transition-colors flex items-center gap-2"
                >
                   <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                   </svg>
                    이메일 문의
                </a>
              </div>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="relative h-80 md:h-auto bg-slate-800 rounded-2xl overflow-hidden">
            {/* Embed Google Maps */}
            <div className="absolute inset-0 flex flex-col items-center justify-center opacity-50">
               <svg className="w-16 h-16 text-slate-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0121 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
               </svg>
               <p className="text-slate-400">지도 데이터 로딩중...</p>
            </div>
            <iframe 
                title="Map"
                className="w-full h-full opacity-70 hover:opacity-100 transition-opacity duration-500 relative z-10"
                src="https://maps.google.com/maps?q=%EA%B4%91%EC%A3%BC%20%EB%8F%99%EA%B5%AC%20%EB%8F%85%EB%A6%BD%EB%A1%9C%20376&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                loading="lazy"
            ></iframe>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm">
          <div className="text-center md:text-left mb-4 md:mb-0">
             <p>&copy; {new Date().getFullYear()} Ssangma Tile. All rights reserved.</p>
             <p className="mt-2">본 사이트는 포트폴리오 목적으로 제작된 샘플 웹사이트입니다.</p>
          </div>
          
          <button 
            onClick={() => setIsAdminOpen(true)}
            className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-sm font-medium px-4 py-2 rounded-lg hover:bg-slate-800"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            관리자 로그인
          </button>
        </div>
      </div>

      <AdminDashboard isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
    </section>
  );
};

export default Contact;