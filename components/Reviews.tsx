import React from 'react';
import { ReviewItem } from '../types';

const reviews: ReviewItem[] = [
  {
    author: "치평동 주민",
    content: "사장님이 정말 친절하시고 꼼꼼하세요. 욕실이 완전히 새집처럼 변했습니다. 타일 고르는 것도 도와주시고 마무리 청소까지 완벽했습니다!",
    rating: 5,
    date: "2024.01.15"
  },
  {
    author: "상무지구 맘",
    content: "여러 군데 견적 받아봤는데 쌍마타일이 가장 합리적이었어요. 공사 기간도 딱 맞춰주시고 UBR 욕실이라 걱정했는데 누수 없이 잘 됐습니다.",
    rating: 5,
    date: "2023.12.20"
  },
  {
    author: "행복한우리집",
    content: "주방 타일만 바꿨는데 집 분위기가 확 사네요. 젊은 감각으로 추천해주셔서 대만족입니다. 번창하세요!",
    rating: 5,
    date: "2023.11.05"
  }
];

const Reviews: React.FC = () => {
  return (
    <section id="reviews" className="py-20 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">고객 생생 후기</h2>
          <p className="text-slate-600">
            당근마켓에서 인증된 실제 이웃들의 후기입니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div key={index} className="bg-slate-50 p-8 rounded-2xl relative border border-slate-100">
              {/* Quote Icon */}
              <div className="absolute top-6 right-8 text-slate-200 text-6xl font-serif leading-none">”</div>
              
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              
              <p className="text-slate-700 mb-6 leading-relaxed min-h-[80px]">
                {review.content}
              </p>
              
              <div className="border-t border-slate-200 pt-4 flex justify-between items-center">
                <span className="font-bold text-slate-900">{review.author}</span>
                <span className="text-sm text-slate-400">{review.date}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
             <a 
            href="https://www.daangn.com/kr/local-profile/%EC%8C%8D%EB%A7%88%ED%83%80%EC%9D%BC-%EC%9A%95%EC%8B%A4%EB%A6%AC%EB%AA%A8%EB%8D%B8%EB%A7%81-wkgco2wh7d6t/?in=%EC%B9%98%ED%8F%89%EB%8F%99-1015" 
            target="_blank" 
            rel="noreferrer"
            className="inline-flex items-center px-8 py-4 bg-[#FF6F0F] hover:bg-[#e65f00] text-white font-bold rounded-lg shadow-lg transition-colors"
          >
            <span className="mr-2">🥕</span> 당근마켓에서 단골 맺기
          </a>
        </div>
      </div>
    </section>
  );
};

export default Reviews;