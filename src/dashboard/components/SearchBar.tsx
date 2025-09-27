import React from 'react';
import { Search, X } from 'lucide-react';

const SearchBar: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
      <div className="flex items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Cari berdasarkan peran, perusahaan, atau skill..."
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        <button className="ml-3 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors">
          Cari
        </button>
      </div>
      <div className="flex items-center gap-2 mt-3">
        <span className="text-sm text-gray-600">Filter:</span>
        <span className="inline-flex items-center gap-1 text-sm bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full">
          Amerika Serikat
          <button className="hover:text-gray-900"><X size={14} /></button>
        </span>
        <span className="inline-flex items-center gap-1 text-sm bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full">
          Pengalaman 5+ tahun
          <button className="hover:text-gray-900"><X size={14} /></button>
        </span>
      </div>
    </div>
  );
};

export default SearchBar;