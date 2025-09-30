import React, { useState, useMemo } from 'react';
import { Search, Users, MapPin, Calendar, Building2, Bookmark } from 'lucide-react';
import { MOCK_JOBS, type Job } from '../../lib/jobsData';
import SearchBar from '../components/SearchBar';
import FilterSidebar from '../components/FilterSidebar';




const JobFinder: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filters, setFilters] = useState({
    workSchedule: [] as string[],
    experienceLevel: [] as string[],
    workStyle: [] as string[],
    salaryRange: [0, 50] as [number, number],
    remote: null as boolean | null,
    location: '',
    skills: [] as string[]
  });

  // Filter jobs based on search and filters
  const filteredJobs = useMemo(() => {
    return MOCK_JOBS.filter((job: Job) => {
      // Search term filter
      if (searchTerm) {
        const searchTermLower = searchTerm.toLowerCase();
        const matches = 
          job.title.toLowerCase().includes(searchTermLower) ||
          job.company.toLowerCase().includes(searchTermLower) ||
          job.location.toLowerCase().includes(searchTermLower) ||
          job.skills.some(skill => skill.toLowerCase().includes(searchTermLower));
        
        if (!matches) return false;
      }

      // Work schedule filter
      if (filters.workSchedule.length > 0 && !filters.workSchedule.includes(job.type)) {
        return false;
      }

      // Experience level filter
      if (filters.experienceLevel.length > 0 && !filters.experienceLevel.includes(job.experienceLevel)) {
        return false;
      }

      // Work style filter
      if (filters.workStyle.length > 0) {
        const jobWorkStyle = job.remote ? 'remote' : 'on-site';
        if (!filters.workStyle.includes(jobWorkStyle)) {
          return false;
        }
      }

      // Salary range filter (convert to millions for comparison)
      const salaryInMillions = job.salary.max / 1000000;
      if (salaryInMillions < filters.salaryRange[0] || salaryInMillions > filters.salaryRange[1]) {
        return false;
      }

      // Location filter
      if (filters.location && !job.location.toLowerCase().includes(filters.location.toLowerCase())) {
        return false;
      }

      // Skills filter
      if (filters.skills.length > 0) {
        const hasMatchingSkill = filters.skills.some(filterSkill => 
          job.skills.some(jobSkill => jobSkill.toLowerCase().includes(filterSkill.toLowerCase()))
        );
        if (!hasMatchingSkill) return false;
      }

      return true;
    });
  }, [searchTerm, filters]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Filter Sidebar */}
      <FilterSidebar
        filters={filters}
        onFiltersChange={setFilters}
        jobCount={filteredJobs.length}
      />
      
      {/* Main Content */}
      <div className="flex-1">
        <div className="max-w-6xl mx-auto p-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Pencari Pekerjaan</h1>
            <p className="text-gray-600">Temukan lowongan pekerjaan yang sesuai dengan keahlian dan minat Anda</p>
          </div>

          {/* Search Bar */}
          <SearchBar
            searchQuery={searchTerm}
            onSearchChange={setSearchTerm}
            onSearch={(query) => setSearchTerm(query)}
            activeFilters={[...filters.workSchedule, ...filters.experienceLevel, ...filters.workStyle]}
            onAddFilter={(filter) => console.log('Add filter:', filter)}
            onRemoveFilter={(filter) => console.log('Remove filter:', filter)}
          />

          {/* Job Results */}
          <div className="mt-6">
            <div className="grid gap-4">{filteredJobs.map((job: Job) => (
              <div key={job.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{job.title}</h3>
                    <div className="flex items-center text-gray-600 text-sm mb-2">
                      <Building2 size={16} className="mr-1" />
                      <span className="mr-4">{job.company}</span>
                      <MapPin size={16} className="mr-1" />
                      <span>{job.location}</span>
                    </div>
                    <p className="text-gray-700 mb-3">{job.description}</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {job.skills.slice(0, 3).map((skill, index) => (
                        <span key={index} className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-lg font-semibold text-green-600">
                        Rp {(job.salary.min / 1000000).toFixed(0)}jt - Rp {(job.salary.max / 1000000).toFixed(0)}jt
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Users size={16} />
                        <span>{job.applicationCount} kandidat</span>
                      </div>
                    </div>
                  </div>
                  <div className="ml-4 flex flex-col items-end">
                    <button className="mb-2 p-2 text-gray-400 hover:text-purple-600 transition-colors">
                      <Bookmark size={20} />
                    </button>
                    <span className={`px-2 py-1 text-xs rounded-full ${job.type === 'full-time' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                      {job.type === 'full-time' ? 'Penuh Waktu' : job.type === 'part-time' ? 'Paruh Waktu' : job.type}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar size={16} className="mr-1" />
                    <span>Dipost {new Date(job.posted).toLocaleDateString('id-ID')}</span>
                  </div>
                  <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                    Lamar Sekarang
                  </button>
                </div>
              </div>
            ))}</div>

            {filteredJobs.length === 0 && (
              <div className="text-center py-12">
                <div className="mx-auto h-12 w-12 text-gray-400">
                  <Search className="h-12 w-12" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">Tidak ada lowongan ditemukan</h3>
                <p className="mt-2 text-gray-500">Coba ubah filter atau kata kunci pencarian Anda.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobFinder;