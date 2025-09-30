import React, { useState, useEffect } from 'react';
import { Search, Filter, MapPin, Briefcase, Mail, Plus } from 'lucide-react';
import { getTalentPools } from '@/lib/company/data';
import { TalentPool, CandidateProfile } from '@/lib/company/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Mock candidates for talent search
const MOCK_TALENT_CANDIDATES: CandidateProfile[] = [
  {
    id: 'cand-1',
    name: 'Budi Santoso',
    email: 'budi@email.com',
    phone: '+6281234567890',
    location: 'Jakarta',
    title: 'Senior Frontend Developer',
    experience: 5,
    skills: ['React', 'TypeScript', 'Node.js', 'AWS', 'Redux', 'Next.js'],
    availability: 'available',
    salaryExpectation: 22000000,
    portfolio: 'https://budisantoso.dev',
    about: 'Passionate frontend developer with 5+ years experience building scalable web applications',
    createdAt: '2024-01-15T08:00:00Z',
    updatedAt: '2024-09-25T10:30:00Z'
  },
  {
    id: 'cand-2',
    name: 'Siti Nurhaliza',
    email: 'siti@email.com',
    phone: '+6281234567891',
    location: 'Bandung',
    title: 'UX/UI Designer',
    experience: 3,
    skills: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping', 'User Research', 'Design Systems'],
    availability: 'available',
    salaryExpectation: 15000000,
    portfolio: 'https://sitinurhaliza.design',
    about: 'Creative designer focused on user-centered design solutions',
    createdAt: '2024-02-10T08:00:00Z',
    updatedAt: '2024-09-20T10:30:00Z'
  },
  {
    id: 'cand-3',
    name: 'Ahmad Rahman',
    email: 'ahmad@email.com',
    phone: '+6281234567892',
    location: 'Surabaya',
    title: 'Full Stack Developer',
    experience: 4,
    skills: ['Python', 'Django', 'PostgreSQL', 'React', 'Docker', 'AWS'],
    availability: 'open_to_offers',
    salaryExpectation: 20000000,
    portfolio: 'https://ahmadrahman.dev',
    about: 'Full-stack developer specializing in Python and modern web technologies',
    createdAt: '2024-03-05T08:00:00Z',
    updatedAt: '2024-09-22T10:30:00Z'
  },
  {
    id: 'cand-4',
    name: 'Dewi Sartika',
    email: 'dewi@email.com',
    phone: '+6281234567893',
    location: 'Yogyakarta',
    title: 'Data Scientist',
    experience: 6,
    skills: ['Python', 'Machine Learning', 'TensorFlow', 'SQL', 'Tableau', 'Statistics'],
    availability: 'not_looking',
    salaryExpectation: 25000000,
    portfolio: 'https://dewisartika.ml',
    about: 'Experienced data scientist with expertise in machine learning and analytics',
    createdAt: '2024-01-20T08:00:00Z',
    updatedAt: '2024-09-18T10:30:00Z'
  },
  {
    id: 'cand-5',
    name: 'Rizky Pratama',
    email: 'rizky@email.com',
    phone: '+6281234567894',
    location: 'Jakarta',
    title: 'DevOps Engineer',
    experience: 4,
    skills: ['Kubernetes', 'Docker', 'AWS', 'Terraform', 'Jenkins', 'Monitoring'],
    availability: 'available',
    salaryExpectation: 24000000,
    portfolio: 'https://rizkypratama.tech',
    about: 'DevOps engineer passionate about automation and cloud infrastructure',
    createdAt: '2024-02-28T08:00:00Z',
    updatedAt: '2024-09-24T10:30:00Z'
  }
];

const TalentSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [locationFilter, setLocationFilter] = useState('');
  const [experienceFilter, setExperienceFilter] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState('');
  const [candidates, setCandidates] = useState<CandidateProfile[]>([]);
  const [filteredCandidates, setFilteredCandidates] = useState<CandidateProfile[]>([]);


  useEffect(() => {
    setCandidates(MOCK_TALENT_CANDIDATES);
    setFilteredCandidates(MOCK_TALENT_CANDIDATES);
    setTalentPools(getTalentPools());
  }, []);

  useEffect(() => {
    let filtered = candidates;

    // Search by name, title, or skills
    if (searchTerm) {
      filtered = filtered.filter(candidate => 
        candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by selected skills
    if (selectedSkills.length > 0) {
      filtered = filtered.filter(candidate =>
        selectedSkills.some(skill => candidate.skills.includes(skill))
      );
    }

    // Filter by location
    if (locationFilter) {
      filtered = filtered.filter(candidate => 
        candidate.location && candidate.location.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }    // Filter by experience
    if (experienceFilter) {
      const expValue = parseInt(experienceFilter);
      filtered = filtered.filter(candidate => candidate.experience && candidate.experience >= expValue);
    }

    // Filter by availability
    if (availabilityFilter) {
      filtered = filtered.filter(candidate => candidate.availability === availabilityFilter);
    }

    setFilteredCandidates(filtered);
  }, [searchTerm, selectedSkills, locationFilter, experienceFilter, availabilityFilter, candidates]);

  const allSkills = Array.from(new Set(candidates.flatMap(c => c.skills))).sort();

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev =>
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const getAvailabilityLabel = (availability: string) => {
    switch (availability) {
      case 'available': return 'Tersedia';
      case 'open_to_offers': return 'Terbuka untuk Tawaran';
      case 'not_looking': return 'Tidak Mencari';
      default: return availability;
    }
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'open_to_offers': return 'bg-yellow-100 text-yellow-800';
      case 'not_looking': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Pencarian Talenta</h1>
        <p className="text-gray-600">Temukan kandidat terbaik berdasarkan skill dan kriteria</p>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Search */}
            <div className="lg:col-span-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Cari berdasarkan nama, posisi, atau skill..."
                  className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Location Filter */}
            <div className="lg:col-span-2">
              <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Semua Lokasi</option>
                <option value="Jakarta">Jakarta</option>
                <option value="Bandung">Bandung</option>
                <option value="Surabaya">Surabaya</option>
                <option value="Yogyakarta">Yogyakarta</option>
              </select>
            </div>

            {/* Experience Filter */}
            <div className="lg:col-span-2">
              <select
                value={experienceFilter}
                onChange={(e) => setExperienceFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Semua Pengalaman</option>
                <option value="1">1+ tahun</option>
                <option value="3">3+ tahun</option>
                <option value="5">5+ tahun</option>
                <option value="7">7+ tahun</option>
              </select>
            </div>

            {/* Availability Filter */}
            <div className="lg:col-span-2">
              <select
                value={availabilityFilter}
                onChange={(e) => setAvailabilityFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Semua Status</option>
                <option value="available">Tersedia</option>
                <option value="open_to_offers">Terbuka untuk Tawaran</option>
                <option value="not_looking">Tidak Mencari</option>
              </select>
            </div>

            {/* Clear Filters */}
            <div className="lg:col-span-2">
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedSkills([]);
                  setLocationFilter('');
                  setExperienceFilter('');
                  setAvailabilityFilter('');
                }}
                className="w-full"
              >
                <Filter className="w-4 h-4 mr-2" />
                Reset Filter
              </Button>
            </div>
          </div>

          {/* Skills Filter */}
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Filter berdasarkan Skills:</p>
            <div className="flex flex-wrap gap-2">
              {allSkills.map(skill => (
                <Badge
                  key={skill}
                  variant={selectedSkills.includes(skill) ? "default" : "secondary"}
                  className="cursor-pointer"
                  onClick={() => toggleSkill(skill)}
                >
                  {skill}
                  {selectedSkills.includes(skill) && <span className="ml-1">✓</span>}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Header */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600">
          Menampilkan {filteredCandidates.length} dari {candidates.length} kandidat
        </p>
      </div>

      {/* Candidate Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCandidates.map(candidate => (
          <Card key={candidate.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{candidate.name}</h3>
                  <p className="text-gray-600 font-medium">{candidate.title}</p>
                  
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {candidate.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Briefcase className="w-4 h-4" />
                      {candidate.experience} tahun
                    </div>
                  </div>
                </div>

                <Badge className={getAvailabilityColor(candidate.availability)}>
                  {getAvailabilityLabel(candidate.availability)}
                </Badge>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Skills:</p>
                <div className="flex flex-wrap gap-1">
                  {candidate.skills.slice(0, 6).map(skill => (
                    <Badge key={skill} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {candidate.skills.length > 6 && (
                    <Badge variant="outline" className="text-xs">
                      +{candidate.skills.length - 6} lainnya
                    </Badge>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-600">{candidate.about}</p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="text-sm">
                  <p className="text-gray-500">Ekspektasi Gaji:</p>
                  <p className="font-medium">Rp {candidate.salaryExpectation?.toLocaleString('id-ID')}</p>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Mail className="w-4 h-4 mr-1" />
                    Kontak
                  </Button>
                  <Button size="sm">
                    <Plus className="w-4 h-4 mr-1" />
                    Simpan
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCandidates.length === 0 && (
        <Card>
          <CardContent className="p-12">
            <div className="text-center">
              <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Tidak Ada Kandidat Ditemukan</h3>
              <p className="text-gray-600">Coba ubah kriteria pencarian atau filter Anda</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TalentSearch;