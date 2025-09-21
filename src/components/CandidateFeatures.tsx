import React, { useEffect, useRef, useState } from 'react';
import { Camera, Play, DollarSign, FileText } from 'lucide-react';

const CandidateFeatures = () => {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            features.forEach((_, index) => {
              setTimeout(() => {
                setVisibleCards(prev => [...prev, index]);
              }, index * 150);
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: <Camera className="w-8 h-8" />,
      title: "Skill Snapshot",
      description: "Tes singkat untuk memetakan kekuatan dan kelemahan skill Anda dengan analisis mendalam",
      color: "bg-gradient-to-br from-blue-500 to-blue-600",
      hoverColor: "group-hover:from-blue-600 group-hover:to-blue-700",
      shadowColor: "shadow-blue-500/25"
    },
    {
      icon: <Play className="w-8 h-8" />,
      title: "Simulasi Kerja",
      description: "Latihan gratis dengan skenario nyata dan dapatkan sertifikat skill yang diakui industri",
      color: "bg-gradient-to-br from-emerald-500 to-emerald-600",
      hoverColor: "group-hover:from-emerald-600 group-hover:to-emerald-700",
      shadowColor: "shadow-emerald-500/25"
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "Tryout Berbayar",
      description: "Ikuti tes premium dari perusahaan dengan jaminan feedback profesional dan peluang kerja",
      color: "bg-gradient-to-br from-purple-500 to-purple-600",
      hoverColor: "group-hover:from-purple-600 group-hover:to-purple-700",
      shadowColor: "shadow-purple-500/25"
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Auto-CV",
      description: "CV ATS-friendly otomatis dan sistem apply 1-klik dengan tracking lamaran real-time",
      color: "bg-gradient-to-br from-red-500 to-red-600",
      hoverColor: "group-hover:from-red-600 group-hover:to-red-700",
      shadowColor: "shadow-red-500/25"
    }
  ];

  return (
    <section ref={sectionRef} id="candidate-features" className="py-20 lg:py-32 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #10B981 0%, transparent 50%), 
                           radial-gradient(circle at 75% 75%, #3B82F6 0%, transparent 50%)`
        }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Fitur untuk Kandidat
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Tools lengkap untuk mempersiapkan dan meningkatkan peluang karir Anda
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`group bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-4 border border-gray-100 hover:border-emerald-200 relative overflow-hidden ${
                visibleCards.includes(index) 
                  ? 'opacity-100 translate-y-0 scale-100' 
                  : 'opacity-0 translate-y-10 scale-95'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Hover Background Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-blue-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className={`${feature.color} ${feature.hoverColor} ${feature.shadowColor} w-20 h-20 rounded-2xl flex items-center justify-center mb-6 text-white shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 relative z-10`}>
                {feature.icon}
                <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <h3 className="text-xl font-semibold mb-4 text-gray-900 group-hover:text-emerald-600 transition-colors duration-300 relative z-10">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300 relative z-10">
                {feature.description}
              </p>
              
              {/* Interactive Button */}
              <div className="mt-6 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 relative z-10">
                <button className="text-emerald-600 font-semibold hover:text-emerald-700 flex items-center space-x-2 group/btn">
                  <span>Pelajari Lebih Lanjut</span>
                  <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              
              {/* Card Number */}
              <div className="absolute top-4 right-4 w-8 h-8 bg-gray-100 group-hover:bg-emerald-100 rounded-full flex items-center justify-center text-gray-400 group-hover:text-emerald-600 font-bold text-sm transition-all duration-300">
                {index + 1}
              </div>
            </div>
          ))}
        </div>
        
        {/* Call to Action */}
        <div className="text-center mt-16">
          <button className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-500 transform hover:scale-105 hover:shadow-2xl shadow-emerald-500/25">
            Mulai Perjalanan Karir Anda
          </button>
        </div>
      </div>
    </section>
  );
};

export default CandidateFeatures;