import { useEffect, useRef, useState } from 'react';
import { Layout, Shield, BarChart3 } from 'lucide-react';

const CompanyFeatures = () => {
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
              }, index * 200);
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
      icon: <Layout className="w-8 h-8" />,
      title: "Template Tryout",
      description: "Buat tes kustomisasi dengan template siap pakai atau rancang dari nol sesuai kebutuhan posisi",
      color: "bg-gradient-to-br from-indigo-500 to-indigo-600",
      hoverColor: "group-hover:from-indigo-600 group-hover:to-indigo-700",
      shadowColor: "shadow-indigo-500/25",
      benefits: ["Template industri teruji", "Customizable sepenuhnya", "Analytics mendalam"]
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Escrow System",
      description: "Sistem pembayaran aman untuk tryout dan magang dengan perlindungan untuk kedua pihak",
      color: "bg-gradient-to-br from-emerald-500 to-emerald-600",
      hoverColor: "group-hover:from-emerald-600 group-hover:to-emerald-700",
      shadowColor: "shadow-emerald-500/25",
      benefits: ["Pembayaran terproteksi", "Auto-release sistem", "Dispute resolution"]
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Dashboard Evaluasi",
      description: "Panel komprehensif untuk mengevaluasi kandidat dengan data analytics dan perbandingan",
      color: "bg-gradient-to-br from-purple-500 to-purple-600",
      hoverColor: "group-hover:from-purple-600 group-hover:to-purple-700",
      shadowColor: "shadow-purple-500/25",
      benefits: ["Real-time analytics", "Kandidat comparison", "Performance insights"]
    }
  ];

  return (
    <section ref={sectionRef} className="py-20 lg:py-32 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-purple-100 rounded-full blur-2xl opacity-30 animate-bounce"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Fitur untuk Perusahaan
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Solusi rekrutmen modern dengan teknologi terdepan untuk menemukan talenta terbaik
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`group bg-white rounded-2xl shadow-xl p-8 lg:p-10 hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-6 border border-gray-100 hover:border-indigo-200 relative overflow-hidden ${
                visibleCards.includes(index) 
                  ? 'opacity-100 translate-y-0 scale-100' 
                  : 'opacity-0 translate-y-10 scale-95'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              {/* Hover Background Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className={`${feature.color} ${feature.hoverColor} ${feature.shadowColor} w-20 h-20 rounded-2xl flex items-center justify-center mb-8 text-white shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 relative z-10`}>
                {feature.icon}
                <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <h3 className="text-xl lg:text-2xl font-semibold mb-4 text-gray-900 group-hover:text-indigo-600 transition-colors duration-300 relative z-10">
                {feature.title}
              </h3>
              <p className="text-gray-600 mb-8 leading-relaxed group-hover:text-gray-700 transition-colors duration-300 relative z-10">
                {feature.description}
              </p>
              
              <ul className="space-y-3 relative z-10">
                {feature.benefits.map((benefit, idx) => (
                  <li 
                    key={idx} 
                    className={`flex items-center text-sm text-gray-600 group-hover:text-gray-700 transition-all duration-500 transform ${
                      visibleCards.includes(index) 
                        ? 'opacity-100 translate-x-0' 
                        : 'opacity-0 -translate-x-4'
                    }`}
                    style={{ transitionDelay: `${(index * 200) + (idx * 100)}ms` }}
                  >
                    <div className="w-3 h-3 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full mr-3 group-hover:scale-125 transition-transform duration-300 shadow-sm"></div>
                    <span className="group-hover:font-medium transition-all duration-300">{benefit}</span>
                  </li>
                ))}
              </ul>
              
              {/* Interactive Button */}
              <div className="mt-8 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 relative z-10">
                <button className="text-indigo-600 font-semibold hover:text-indigo-700 flex items-center space-x-2 group/btn">
                  <span>Lihat Demo</span>
                  <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <button className="bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white px-10 py-4 rounded-xl font-semibold text-lg transition-all duration-500 transform hover:scale-105 hover:shadow-2xl shadow-indigo-500/25 relative overflow-hidden group">
            <div className="pointer-events-none absolute inset-0 bg-white/20 opacity-0 -translate-x-[120%] -skew-x-12 group-hover:opacity-100 group-hover:translate-x-[120%] transition-all duration-400 ease-out will-change-transform"></div>
            <span className="relative z-10">Mulai Rekrut Sekarang</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default CompanyFeatures;