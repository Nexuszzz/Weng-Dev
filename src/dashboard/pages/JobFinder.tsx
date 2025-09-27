import React, { useState } from 'react';
import { Search, Filter, Star, Clock, DollarSign, Users, MapPin, Calendar } from 'lucide-react';
import { formatCurrencyIDR } from '../../utils/format';

interface TryoutProgram {
  id: string;
  title: string;
  company: string;
  price: number;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  rating: number;
  participants: number;
  location: string;
  startDate: string;
  description: string;
  skills: string[];
  type: 'Tryout' | 'Apprenticeship';
  bgColor: string;
}

const JobFinder: React.FC = () => {
  const [selectedType, setSelectedType] = useState<'all' | 'tryout' | 'apprenticeship'>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');

  const programs: TryoutProgram[] = [
    {
      id: '1',
      title: 'Program Tryout Desainer UX',
      company: 'Google',
      price: 299,
      duration: '2 minggu',
      level: 'Intermediate',
      rating: 4.8,
      participants: 156,
      location: 'Jarak Jauh',
      startDate: '15 Okt 2024',
      description: 'Program desain UX intensif dengan pengalaman proyek nyata',
      skills: ['Figma', 'User Research', 'Prototyping'],
      type: 'Tryout',
      bgColor: 'bg-blue-50'
    },
    {
      id: '2',
      title: 'Magang Pengembang Frontend',
      company: 'Microsoft',
      price: 499,
      duration: '3 bulan',
      level: 'Advanced',
      rating: 4.9,
      participants: 89,
      location: 'Hibrida',
      startDate: '1 Nov 2024',
      description: 'Magang pengembangan full-stack dengan pendampingan',
      skills: ['React', 'TypeScript', 'Node.js'],
      type: 'Apprenticeship',
      bgColor: 'bg-green-50'
    },
    {
      id: '3',
      title: 'Tryout Analis Data',
      company: 'Netflix',
      price: 199,
      duration: '10 hari',
      level: 'Beginner',
      rating: 4.7,
      participants: 234,
      location: 'Jarak Jauh',
      startDate: '20 Okt 2024',
      description: 'Pelajari analisis data dengan dataset Netflix asli',
      skills: ['Python', 'SQL', 'Tableau'],
      type: 'Tryout',
      bgColor: 'bg-red-50'
    },
    {
      id: '4',
      title: 'Magang Manajer Produk',
      company: 'Spotify',
      price: 699,
      duration: '4 bulan',
      level: 'Advanced',
      rating: 4.9,
      participants: 67,
      location: 'Di lokasi',
      startDate: '5 Nov 2024',
      description: 'Pengalaman manajemen produk dari awal hingga akhir',
      skills: ['Strategy', 'Analytics', 'Leadership'],
      type: 'Apprenticeship',
      bgColor: 'bg-purple-50'
    }
  ];

  const filteredPrograms = programs.filter(program => {
    if (selectedType !== 'all' && program.type.toLowerCase() !== selectedType) return false;
    if (selectedLevel !== 'all' && program.level.toLowerCase() !== selectedLevel) return false;
    return true;
  });

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
  <div className="min-h-screen bg-gray-50 dark:bg-bg-dark p-6 transition-colors">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Pencari Pekerjaan</h1>
          <p className="text-gray-600 dark:text-gray-300">Temukan tryout dan apprenticeship berbayar yang relevan dengan karir impian Anda</p>
        </div>

        {/* Search and Filters */}
  <div className="bg-white dark:bg-surface-dark rounded-lg p-6 mb-6 shadow-sm border border-transparent dark:border-gray-700 transition-colors">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Cari program, perusahaan, atau skill..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder:text-gray-400 dark:placeholder:text-gray-500"
              />
            </div>
            <button className="flex items-center px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-gray-200">
              <Filter size={20} className="mr-2" />
              Filter
            </button>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedType('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedType === 'all' ? 'bg-purple-600 text-white' : 'bg-gray-100 dark:bg-gray-800 dark:text-gray-300 text-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
            >
              Semua
            </button>
            <button
              onClick={() => setSelectedType('tryout')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedType === 'tryout' ? 'bg-purple-600 text-white' : 'bg-gray-100 dark:bg-gray-800 dark:text-gray-300 text-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
            >
              Tryout
            </button>
            <button
              onClick={() => setSelectedType('apprenticeship')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedType === 'apprenticeship' ? 'bg-purple-600 text-white' : 'bg-gray-100 dark:bg-gray-800 dark:text-gray-300 text-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
            >
              Apprenticeship
            </button>
          </div>
        </div>

        {/* Programs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrograms.map((program) => (
            <div key={program.id} className={`${program.bgColor} dark:bg-gray-800/60 rounded-xl p-6 hover:shadow-lg transition-shadow backdrop-blur-sm border border-transparent dark:border-gray-700`}> 
              <div className="flex justify-between items-start mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getLevelColor(program.level)}`}>
                  {({ Beginner: 'Pemula', Intermediate: 'Menengah', Advanced: 'Lanjutan' }[program.level] || program.level)}
                </span>
                <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  {(program.type === 'Apprenticeship' ? 'Magang' : 'Tryout')}
                </span>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{program.title}</h3>
              <p className="text-gray-700 dark:text-gray-300 font-medium mb-4">{program.company}</p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm">
                  <DollarSign size={16} className="mr-2" />
                  {formatCurrencyIDR(program.price * 10000, true)}
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm">
                  <Clock size={16} className="mr-2" />
                  {program.duration}
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm">
                  <MapPin size={16} className="mr-2" />
                  {program.location}
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm">
                  <Calendar size={16} className="mr-2" />
                  Mulai {program.startDate}
                </div>
              </div>

              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  <Star size={16} className="text-yellow-400 fill-current" />
                  <span className="ml-1 text-sm font-medium">{program.rating}</span>
                </div>
                <div className="flex items-center ml-4">
                  <Users size={16} className="text-gray-400" />
          <span className="ml-1 text-sm text-gray-600 dark:text-gray-300">{program.participants} peserta</span>
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{program.description}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {program.skills.map((skill, index) => (
                  <span key={index} className="px-2 py-1 bg-white/60 dark:bg-gray-700/50 text-gray-700 dark:text-gray-200 text-xs rounded-full">
                    {skill}
                  </span>
                ))}
              </div>

              <button className="w-full bg-gray-900 dark:bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 dark:hover:bg-purple-700 transition-colors">
                Daftar Sekarang
              </button>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-12 bg-white dark:bg-surface-dark rounded-xl p-8 border border-transparent dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">Mengapa Memilih Job Finder?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="text-purple-600 dark:text-purple-300" size={24} />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Program Berkualitas</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Semua program telah diverifikasi dan memiliki rating tinggi dari peserta sebelumnya</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="text-green-600 dark:text-green-300" size={24} />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Pembayaran Aman</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Sistem escrow memastikan uang Anda aman hingga program selesai dengan memuaskan</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-blue-600 dark:text-blue-300" size={24} />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Komunitas Aktif</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Bergabung dengan ribuan profesional yang telah berhasil melalui program kami</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobFinder;