import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Estimate } from '../types';

const TARGET_EMAIL = "s601108@naver.com";

const Hero: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  
  // Form states
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSending) return;

    setIsSending(true);
    
    // 1. Save to localStorage for Admin retrieval (Backup)
    const newEstimate: Estimate = {
        id: Date.now(),
        name,
        phone,
        location,
        message,
        date: new Date().toLocaleString()
    };

    try {
        const existingEstimates = JSON.parse(localStorage.getItem('ssangma_estimates') || '[]');
        localStorage.setItem('ssangma_estimates', JSON.stringify([newEstimate, ...existingEstimates]));
    } catch (error) {
        console.error("Failed to save estimate", error);
    }

    // 2. Send via FormSubmit.co (Direct AJAX)
    try {
        const response = await fetch(`https://formsubmit.co/ajax/${TARGET_EMAIL}`, {
            method: "POST",
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                _subject: `[쌍마타일 견적신청] ${name}님 문의`,
                _template: 'table', // Makes the email look nicer
                _captcha: 'false', // Disable captcha for better UX
                성함: name,
                연락처: phone,
                시공지역: location,
                문의내용: message
            })
        });

        if (response.ok) {
            setIsSubmitted(true);
        } else {
            throw new Error("Network response was not ok");
        }
    } catch (error) {
        console.error("FormSubmit Error", error);
        // Fallback to mailto if AJAX fails
        alert("자동 전송에 실패하여 이메일 앱을 실행합니다.");
        const subject = `[쌍마타일 견적문의] ${name} 고객님`;
        const body = `성함: ${name}\n연락처: ${phone}\n지역: ${location}\n내용:\n${message}`;
        const mailtoUrl = `mailto:${TARGET_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoUrl;
        setIsSubmitted(true); // Show success screen anyway as they are redirected
    } finally {
        setIsSending(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Delay reset to avoid UI flickering while closing
    setTimeout(() => {
        setIsSubmitted(false);
        setName('');
        setPhone('');
        setLocation('');
        setMessage('');
    }, 300);
  };

  const handleScrollToPortfolio = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('portfolio');
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://picsum.photos/1920/1080?grayscale" 
          alt="Modern Bathroom Interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-900/70"></div>
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
            onClick={() => setIsModalOpen(true)}
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

      {/* Estimate Request Modal - Rendered via Portal */}
      {isModalOpen && createPortal(
        <div 
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm transition-opacity"
            onClick={handleCloseModal}
        >
            <div 
                className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 md:p-8 relative animate-fade-in-up"
                onClick={(e) => e.stopPropagation()}
            >
                <button 
                    onClick={handleCloseModal}
                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
                    aria-label="닫기"
                >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                
                {isSubmitted ? (
                    <div className="text-center py-6">
                        <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-6">
                             <svg className="w-10 h-10 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                             </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">견적 신청 완료!</h3>
                        <p className="text-slate-600 mb-6">
                            고객님의 견적 문의가 성공적으로 접수되었습니다.<br/>
                            빠른 시일 내에 확인 후 연락드리겠습니다.
                        </p>
                        <button 
                            onClick={handleCloseModal}
                            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-lg transition-colors"
                        >
                            닫기
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="text-center mb-6">
                            <h3 className="text-2xl font-bold text-slate-900">무료 견적 상담</h3>
                            <p className="text-slate-500 text-sm mt-2">
                                정보를 입력하시면 쌍마타일로 즉시 전송됩니다.<br/>
                                (관리자 모드에도 자동 저장됩니다)
                            </p>
                        </div>
                        
                        <form onSubmit={handleSubmit} className="space-y-4 text-left">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">성함</label>
                                <input 
                                    type="text" 
                                    required 
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-shadow" 
                                    placeholder="홍길동" 
                                    disabled={isSending}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">연락처</label>
                                <input 
                                    type="tel" 
                                    required 
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-shadow" 
                                    placeholder="010-3631-3152" 
                                    disabled={isSending}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">시공 지역</label>
                                <input 
                                    type="text" 
                                    required
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-shadow" 
                                    placeholder="예: 광주광역시 서구 치평동" 
                                    disabled={isSending}
                                />
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">문의 내용</label>
                                <textarea 
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-shadow h-28 resize-none" 
                                    placeholder="예: 32평 아파트 거실 욕실 리모델링 견적 궁금합니다."
                                    disabled={isSending}
                                ></textarea>
                            </div>
                            
                            <div className="pt-2">
                                <button 
                                    type="submit" 
                                    disabled={isSending}
                                    className="w-full bg-accent hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-colors shadow-md active:scale-[0.98] transform duration-100 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {isSending ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            전송 중...
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                            </svg>
                                            견적서 바로 보내기
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </>
                )}
            </div>
        </div>,
        document.body
      )}
    </section>
  );
};

export default Hero;