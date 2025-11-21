import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Estimate } from '../types';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ isOpen, onClose }) => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [estimates, setEstimates] = useState<Estimate[]>([]);

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      loadEstimates();
    }
    if (!isOpen) {
        // Optional: Reset auth on close if desired, currently keeping session while app is open
        // setIsAuthenticated(false); 
        setPassword('');
    }
  }, [isOpen, isAuthenticated]);

  const loadEstimates = () => {
    try {
      const data = JSON.parse(localStorage.getItem('ssangma_estimates') || '[]');
      setEstimates(data);
    } catch (e) {
      console.error("Error loading estimates", e);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '1234') {
      setIsAuthenticated(true);
      loadEstimates();
    } else {
      alert('비밀번호가 일치하지 않습니다.');
    }
  };

  const handleDelete = (id: number) => {
    if (window.confirm('정말 이 견적 내역을 삭제하시겠습니까?')) {
      const updated = estimates.filter(est => est.id !== id);
      setEstimates(updated);
      localStorage.setItem('ssangma_estimates', JSON.stringify(updated));
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div 
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-slate-900 p-6 flex justify-between items-center shrink-0">
          <h2 className="text-2xl font-bold text-white">관리자 모드</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 bg-slate-50">
          {!isAuthenticated ? (
            <div className="flex flex-col items-center justify-center h-64">
              <div className="w-full max-w-xs">
                <h3 className="text-xl font-bold text-slate-900 mb-4 text-center">관리자 로그인</h3>
                <form onSubmit={handleLogin} className="space-y-4">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-accent outline-none"
                    placeholder="비밀번호 입력"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2 rounded-lg transition-colors"
                  >
                    로그인
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-slate-900">견적 신청 목록 ({estimates.length})</h3>
                <button 
                  onClick={loadEstimates}
                  className="text-sm text-accent font-medium hover:underline"
                >
                  새로고침
                </button>
              </div>

              {estimates.length === 0 ? (
                <div className="text-center py-20 text-slate-400 bg-white rounded-xl border border-slate-200 border-dashed">
                  <p>접수된 견적 신청이 없습니다.</p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {estimates.map((est) => (
                    <div key={est.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 border-b border-slate-100 pb-4">
                        <div>
                            <span className="text-xs font-bold text-white bg-accent px-2 py-1 rounded mr-2">NEW</span>
                            <span className="font-bold text-lg text-slate-800 mr-2">{est.name}</span>
                            <span className="text-slate-500 text-sm">({est.phone})</span>
                        </div>
                        <div className="text-slate-400 text-sm mt-1 md:mt-0">
                          {est.date}
                        </div>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex">
                            <span className="w-20 text-slate-500 font-medium text-sm shrink-0">지역</span>
                            <span className="text-slate-800 text-sm">{est.location}</span>
                        </div>
                        <div className="flex">
                            <span className="w-20 text-slate-500 font-medium text-sm shrink-0">문의내용</span>
                            <p className="text-slate-800 text-sm whitespace-pre-wrap">{est.message}</p>
                        </div>
                      </div>

                      <div className="flex justify-end pt-2">
                        <button
                          onClick={() => handleDelete(est.id)}
                          className="text-red-500 hover:text-red-700 text-sm font-medium px-3 py-1 rounded hover:bg-red-50 transition-colors"
                        >
                          삭제하기
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default AdminDashboard;