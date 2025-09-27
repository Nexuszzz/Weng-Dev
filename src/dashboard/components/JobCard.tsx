import React from 'react';
import { Bookmark, Building2, Calendar, MapPin, Users } from 'lucide-react';

interface JobCardProps {
  promo?: boolean;
}

const JobCard: React.FC<JobCardProps> = ({ promo }) => {
  if (promo) {
    return (
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-xl shadow-sm">
        <h3 className="text-lg font-semibold">Dipromosikan: SimHire Pro</h3>
        <p className="text-sm text-purple-100 mt-1">Dapatkan akses premium ke simulasi kerja dan persiapan wawancara</p>
        <button className="mt-4 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium">Pelajari Lebih Lanjut</button>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-gray-900 font-semibold">Senior Product Designer</div>
          <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
            <Building2 size={16} />
            <span>Stripe</span>
            <span className="mx-1">•</span>
            <MapPin size={16} />
            <span>San Francisco, CA</span>
          </div>
        </div>
        <button className="text-gray-400 hover:text-gray-700"><Bookmark size={18} /></button>
      </div>
      <div className="mt-3 text-purple-700 font-semibold">$140k - $180k</div>
      <div className="mt-3 flex items-center gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-1"><Calendar size={16} /> 2 hari lalu</div>
        <div className="flex items-center gap-1"><Users size={16} /> 142 pelamar</div>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {['Figma', 'UX', 'Design Systems', 'User Research'].map((tag) => (
          <span key={tag} className="px-2.5 py-1 rounded-full text-xs bg-gray-100 text-gray-700">{tag}</span>
        ))}
      </div>
      <button className="mt-4 w-full bg-gray-900 hover:bg-gray-800 text-white py-2.5 rounded-lg font-medium">Lamar Sekarang</button>
    </div>
  );
};

export default JobCard;