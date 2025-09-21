import { useEffect, useRef, useState } from 'react';

const AnimatedStats = () => {
  const [visibleStats, setVisibleStats] = useState<number[]>([]);
  const [animatedNumbers, setAnimatedNumbers] = useState<{[key: number]: number}>({});
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            stats.forEach((_, index) => {
              setTimeout(() => {
                setVisibleStats(prev => [...prev, index]);
                animateNumber(index, stats[index].stat);
              }, index * 300);
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const animateNumber = (index: number, target: string) => {
    // Parse numeric value, supporting formats like "1K+", "2.5K+", "85%", "200+"
    const numericRaw = target.replace(/[^\d.]/g, '');
    let numericValue = parseFloat(numericRaw) || 0;
    if (/k/i.test(target)) {
      numericValue = numericValue * 1000; // Convert K to actual number
    }

    let current = 0;
    const increment = numericValue / 50;

    const timer = setInterval(() => {
      current += increment;
      if (current >= numericValue) {
        current = numericValue;
        clearInterval(timer);
      }
      setAnimatedNumbers(prev => ({
        ...prev,
        [index]: Math.floor(current)
      }));
    }, 30);
  };

  const stats = [
    {
      stat: "1K+",
      title: "Kandidat Aktif",
      description: "Talenta berkualitas siap kerja"
    },
    {
      stat: "200+",
      title: "Perusahaan Partner",
      description: "Dari startup hingga korporasi"
    },
    {
      stat: "85%",
      title: "Success Rate",
      description: "Kandidat berhasil diterima kerja"
    }
  ];

  return (
    <section ref={sectionRef} className="py-20 text-center">
      <div className="grid md:grid-cols-3 gap-8">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className={`transition-all duration-700 ${
              visibleStats.includes(index) 
                ? 'opacity-100 translate-y-0 scale-100' 
                : 'opacity-0 translate-y-10 scale-95'
            }`}
            style={{ transitionDelay: `${index * 300}ms` }}
          >
            <div className="text-4xl font-bold mb-3">
              {visibleStats.includes(index) ? (
                stat.stat.includes('%') ? `${animatedNumbers[index] || 0}%` :
                stat.stat.includes('K') ? `${(((animatedNumbers[index] || 0) / 1000).toFixed(1))}K+` :
                stat.stat.includes('+') ? `${animatedNumbers[index] || 0}+` :
                stat.stat
              ) : '0'}
            </div>
            <h3 className="text-lg font-semibold mb-3">
              {stat.title}
            </h3>
            <p className="text-sm">
              {stat.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AnimatedStats;