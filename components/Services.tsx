import React from 'react';
import { ServiceItem } from '../types';

const services: ServiceItem[] = [
  {
    title: '욕실 리모델링',
    description: '철거부터 방수, 타일 시공, 기구 세팅까지 원스톱으로 진행합니다. 최신 트렌드의 디자인을 제안해 드립니다.',
    icon: '🛁'
  },
  {
    title: '주방 타일 시공',
    description: '주방 분위기를 바꾸는 가장 확실한 방법. 기름때에 강하고 관리가 쉬운 고품질 타일을 시공합니다.',
    icon: '🍳'
  },
  {
    title: '베란다/현관 타일',
    description: '집의 첫인상인 현관과 활용도 높은 베란다를 깔끔하고 세련되게 바꿔드립니다.',
    icon: '🏡'
  },
  {
    title: 'UBR 욕실 공사',
    description: '난이도 높은 UBR 욕실 철거 및 완벽한 방수 공사로 누수 걱정 없는 쾌적한 욕실을 만듭니다.',
    icon: '🔨'
  }
];

const Services: React.FC = () => {
  return (
    <section id="services" className="py-20 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">시공 서비스</h2>
          <div className="w-16 h-1 bg-accent mx-auto mb-4"></div>
          <p className="text-slate-600 max-w-2xl mx-auto">
            쌍마타일은 작은 타일 한 장부터 전체 리모델링까지 장인정신으로 시공합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="bg-slate-50 p-8 rounded-2xl hover:shadow-xl transition-shadow duration-300 border border-slate-100 group"
            >
              <div className="text-4xl mb-6 bg-white w-16 h-16 flex items-center justify-center rounded-full shadow-sm group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
              <p className="text-slate-600 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;