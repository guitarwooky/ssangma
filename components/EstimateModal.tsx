import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Estimate } from '../types';

interface EstimateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// ⚠️ 중요: 여기에 사장님의 카카오톡 오픈채팅방 링크를 넣어주세요.
const KAKAO_CHAT_URL = "https://open.kakao.com/o/syvvlo3h"; 

const EstimateModal: React.FC<EstimateModalProps> = ({ isOpen, onClose }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Form states
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
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

    // 2. Format message and Copy to Clipboard
    const textToCopy = `[쌍마타일 견적 문의]
------------------
성함: ${name}
연락처: ${phone}
지역: ${location}
내용:
${message}
------------------
상담 부탁드립니다.`;

    navigator.clipboard.writeText(textToCopy).then(() => {
        // 3. Open KakaoTalk Chat
        // Remove window.confirm to avoid popup blocking issues
        // Attempt to open immediately
        window.open(KAKAO_CHAT_URL, '_blank');
        setIsSubmitted(true);
    }).catch(err => {
        console.error('클립보드 복사 실패:', err);
        // Even if copy fails, let user enter the chat room
        alert('내용 자동 복사에 실패했습니다. 채팅방 입장 후 직접 입력해주세요.');
        window.open(KAKAO_CHAT_URL, '_blank');
        setIsSubmitted(true);
    });
  };

  const handleClose = () => {
    onClose();
    // Delay reset to avoid UI flickering while closing
    setTimeout(() => {
        setIsSubmitted(false);
        setName('');
        setPhone('');
        setLocation('');
        setMessage('');
    }, 300);
  };

  if (!isOpen) return null;

  return createPortal(
    <div 
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
    >
        <div 
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 md:p-8 relative animate-fade-in-up"
            onClick={(e) => e.stopPropagation()}
        >
            <button 
                onClick={handleClose}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
                aria-label="닫기"
            >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            
            {isSubmitted ? (
                <div className="text-center py-6">
                    <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-[#FEE500] mb-6">
                        <svg className="w-10 h-10 text-[#3c1e1e]" viewBox="0 0 24 24" fill="currentColor">
                           <path d="M12 3C6.48 3 2 6.48 2 10.76C2 13.56 3.93 16.06 6.93 17.44L6.14 20.36C6.07 20.62 6.35 20.85 6.59 20.7L10.37 18.2C10.9 18.26 11.44 18.29 12 18.29C17.52 18.29 22 14.81 22 10.53C22 6.24 17.52 3 12 3Z" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">복사 완료!</h3>
                    <p className="text-slate-600 mb-6">
                        견적 내용이 클립보드에 복사되었습니다.<br/>
                        혹시 채팅방이 열리지 않았다면<br/>
                        아래 <span className="font-bold text-slate-900">"채팅방 입장하기"</span>를 눌러주세요.
                    </p>
                    
                    <div className="space-y-3">
                        <a 
                            href={KAKAO_CHAT_URL}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center justify-center w-full bg-[#FEE500] hover:bg-[#FDD835] text-[#3c1e1e] font-bold py-3 rounded-lg transition-colors shadow-md"
                        >
                            채팅방 입장하기
                        </a>
                        <button 
                            onClick={handleClose}
                            className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 rounded-lg transition-colors"
                        >
                            닫기
                        </button>
                    </div>
                </div>
            ) : (
                <>
                    <div className="text-center mb-6">
                        <div className="mx-auto w-12 h-12 bg-[#FEE500] rounded-xl flex items-center justify-center mb-3">
                             <svg className="w-8 h-8 text-[#3c1e1e]" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 3C6.48 3 2 6.48 2 10.76C2 13.56 3.93 16.06 6.93 17.44L6.14 20.36C6.07 20.62 6.35 20.85 6.59 20.7L10.37 18.2C10.9 18.26 11.44 18.29 12 18.29C17.52 18.29 22 14.81 22 10.53C22 6.24 17.52 3 12 3Z" />
                             </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900">카카오톡 견적 상담</h3>
                        <p className="text-slate-500 text-sm mt-2">
                            정보를 입력하고 버튼을 누르면<br/>
                            내용이 복사되고 카톡 상담방이 열립니다.
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
                                className="w-full px-4 py-2 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#FEE500] focus:border-transparent outline-none transition-shadow" 
                                placeholder="홍길동" 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">연락처</label>
                            <input 
                                type="tel" 
                                required 
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full px-4 py-2 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#FEE500] focus:border-transparent outline-none transition-shadow" 
                                placeholder="010-5462-3151" 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">시공 지역</label>
                            <input 
                                type="text" 
                                required
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className="w-full px-4 py-2 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#FEE500] focus:border-transparent outline-none transition-shadow" 
                                placeholder="예: 광주광역시 서구 치평동" 
                            />
                        </div>
                            <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">문의 내용</label>
                            <textarea 
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="w-full px-4 py-2 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#FEE500] focus:border-transparent outline-none transition-shadow h-28 resize-none" 
                                placeholder="예: 32평 아파트 거실 욕실 리모델링 견적 궁금합니다."
                            ></textarea>
                        </div>
                        
                        <div className="pt-2">
                            <button 
                                type="submit" 
                                className="w-full bg-[#FEE500] hover:bg-[#FDD835] text-[#3c1e1e] font-bold py-3 rounded-lg transition-colors shadow-md active:scale-[0.98] transform duration-100 flex items-center justify-center gap-2"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 3C6.48 3 2 6.48 2 10.76C2 13.56 3.93 16.06 6.93 17.44L6.14 20.36C6.07 20.62 6.35 20.85 6.59 20.7L10.37 18.2C10.9 18.26 11.44 18.29 12 18.29C17.52 18.29 22 14.81 22 10.53C22 6.24 17.52 3 12 3Z" />
                                </svg>
                                카카오톡으로 견적 보내기
                            </button>
                        </div>
                    </form>
                </>
            )}
        </div>
    </div>,
    document.body
  );
};

export default EstimateModal;