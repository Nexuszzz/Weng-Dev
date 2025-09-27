import React, { useEffect, useState } from 'react';
import { User, Building2, ArrowRight } from 'lucide-react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="home" className="relative bg-gray-900 text-white min-h-screen flex items-center overflow-hidden pt-28 md:pt-36 scroll-mt-28 md:scroll-mt-36">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-emerald-900/20"></div>
        <div 
          className="absolute w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"
          style={{
            left: mousePosition.x * 0.02 + '%',
            top: mousePosition.y * 0.02 + '%',
            transform: 'translate(-50%, -50%)'
          }}
        ></div>
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-2xl animate-bounce"></div>
        <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-emerald-700/5 rounded-full blur-2xl animate-pulse"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1] max-w-5xl mx-auto">
             Temukan Karir Impian Anda dengan{' '}
             <span className="bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 bg-clip-text text-transparent animate-pulse">
               Platform Kerja Terdepan
             </span>
           </h1>
          <p className={`text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            Simulasi kerja nyata, tryout berbayar, dan magang terintegrasi. 
            Dapatkan pengalaman kerja sebelum melamar pekerjaan impian Anda.
          </p>
          
          <div className={`flex flex-col sm:flex-row gap-6 justify-center items-center transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <button className="group bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-500 transform hover:scale-110 hover:shadow-2xl shadow-emerald-500/25 flex items-center space-x-3 relative overflow-hidden">
              <div className="pointer-events-none absolute inset-0 bg-white/15 opacity-0 -translate-x-[120%] group-hover:opacity-100 group-hover:translate-x-[120%] transition-all duration-400 ease-out will-change-transform"></div>
              <User className="w-5 h-5" />
              <span>Daftar sebagai Kandidat</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            <button className="group border-2 border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-500 transform hover:scale-110 hover:shadow-2xl shadow-emerald-500/25 flex items-center space-x-3 relative overflow-hidden">
              <div className="pointer-events-none absolute inset-0 bg-emerald-500/30 opacity-0 -translate-x-[120%] group-hover:opacity-100 group-hover:translate-x-[120%] transition-all duration-400 ease-out will-change-transform"></div>
              <Building2 className="w-5 h-5" />
              <span>Daftar sebagai Perusahaan</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
        
        <div className={`relative max-w-6xl mx-auto transition-all duration-1000 delay-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl p-8 md:p-12 text-gray-900 border border-white/20 hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2">
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { number: '1K+', title: 'Kandidat Aktif', desc: 'Talenta berkualitas siap kerja', color: 'emerald', delay: 0 },
                { number: '200+', title: 'Perusahaan Partner', desc: 'Dari startup hingga korporasi', color: 'blue', delay: 200 },
                { number: '85%', title: 'Success Rate', desc: 'Kandidat berhasil diterima kerja', color: 'emerald', delay: 400 }
              ].map((stat, index) => (
                <div key={index} className={`text-center group transition-all duration-500 delay-${stat.delay}`}>
                  <div className={`w-20 h-20 bg-${stat.color}-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl`}>
                    <span className={`text-2xl font-bold text-${stat.color}-600 group-hover:scale-110 transition-transform duration-300`}>
                      {stat.number}
                    </span>
                  </div>
                  <h3 className="font-semibold mb-2 text-lg group-hover:text-emerald-600 transition-colors duration-300">
                    {stat.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{stat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;