import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Heart, Bookmark, Calendar, Globe, X } from 'lucide-react';

// Mock job data based on the image with pastel card backgrounds
const mockJobs = [
  {
    id: 1,
    title: 'UX/UI Designer',
    company: 'Motorola',
    location: 'Houston, TX',
    salary: '$7,800',
    period: '/month',
    type: 'Full-time',
    experience: '4-6 years',
    applicants: '5 September • 159 applicants',
    logo: 'M',
    logoColor: 'bg-black',
    featured: true,
    cardBg: 'bg-violet-50',
  },
  {
    id: 2,
    title: 'Lead UX Researcher',
    company: 'PayPal',
    location: 'Los Angeles, CA',
    salary: '$6,000',
    period: '/month',
    type: 'Project work',
    experience: '8+ years',
    applicants: '3 September • 179 applicants',
    logo: 'P',
    logoColor: 'bg-blue-600',
    featured: false,
    cardBg: 'bg-sky-50',
  },
  {
    id: 3,
    title: 'Middle UI Designer',
    company: 'Microsoft',
    location: 'Richmond, WA',
    salary: '$5,250',
    period: '/month',
    type: 'Full-time',
    experience: '4-6 years',
    applicants: '2 September • 196 applicants',
    logo: '⊞',
    logoColor: 'bg-blue-500',
    featured: false,
    cardBg: 'bg-green-50',
  },
  {
    id: 4,
    title: 'Interface designer',
    company: 'Netflix',
    location: 'San-Francisco, CA',
    salary: '$3,700',
    period: '/month',
    type: 'Part-time',
    experience: '4-6 years',
    applicants: '29 August • 115 applicants',
    logo: 'N',
    logoColor: 'bg-red-600',
    featured: false,
    cardBg: 'bg-rose-50',
  },
  {
    id: 5,
    title: 'Art Director',
    company: 'X Corp.',
    location: 'Houston, TX',
    salary: '$9,500',
    period: '/month',
    type: 'Full-time',
    experience: '7–10 years',
    applicants: '28 August • 159 applicants',
    logo: 'X',
    logoColor: 'bg-black',
    featured: false,
    cardBg: 'bg-neutral-50',
  },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 260, damping: 22 } },
};

// Reusable Filters content to avoid duplication and improve responsiveness behavior
type BoolMap = Record<string, boolean>;

const FiltersContent: React.FC<{
  searchTerm: string;
  setSearchTerm: (v: string) => void;
  selectedLocation: string;
  selectedExperience: string;
  workSchedule: BoolMap;
  onToggleWorkSchedule: (key: string) => void;
  employmentType: BoolMap;
  onToggleEmploymentType: (key: string) => void;
  workStyle: BoolMap;
  onToggleWorkStyle: (key: string) => void;
  onReset: () => void;
}> = ({
  searchTerm,
  setSearchTerm,
  selectedLocation,
  selectedExperience,
  workSchedule,
  onToggleWorkSchedule,
  employmentType,
  onToggleEmploymentType,
  workStyle,
  onToggleWorkStyle,
  onReset,
}) => (
  <div className="w-full bg-white rounded-2xl border border-gray-200 p-6 h-fit">
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
      <button onClick={onReset} className="text-blue-600 text-sm hover:text-blue-700">
        Reset all
      </button>
    </div>

    {/* Search */}
    <div className="mb-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="UX/UI Designer"
          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>

    {/* Location & Experience Chips */}
    <div className="mb-6">
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <button className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs hover:bg-blue-700 transition">
          {selectedLocation}
        </button>
        <button className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs hover:bg-gray-200 transition">
          {selectedExperience}
        </button>
      </div>
    </div>

    {/* Work Schedule */}
    <div className="mb-6">
      <h3 className="font-medium text-gray-900 mb-3">Work schedule</h3>
      <div className="flex flex-wrap gap-2">
        {Object.entries(workSchedule).map(([key, value]) => (
          <button
            key={key}
            onClick={() => onToggleWorkSchedule(key)}
            className={`${value ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700'} px-3 py-1 rounded-full text-xs hover:shadow-sm transition`}
          >
            {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
          </button>
        ))}
      </div>
    </div>

    {/* Salary Range (visual placeholder) */}
    <div className="mb-6">
      <h3 className="font-medium text-gray-900 mb-3">Salary range</h3>
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>2,500</span>
          <span>10,000</span>
        </div>
        <div className="relative">
          <div className="w-full h-2 bg-gray-200 rounded">
            <div className="h-2 bg-blue-600 rounded" style={{ width: '60%' }} />
          </div>
        </div>
      </div>
    </div>

    {/* Employment Type */}
    <div className="mb-6">
      <h3 className="font-medium text-gray-900 mb-3">Employment type</h3>
      <div className="flex flex-wrap gap-2">
        {Object.entries(employmentType).map(([key, value]) => (
          <button
            key={key}
            onClick={() => onToggleEmploymentType(key)}
            className={`${value ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700'} px-3 py-1 rounded-full text-xs hover:shadow-sm transition capitalize`}
          >
            {key.replace(/([A-Z])/g, ' $1')}
          </button>
        ))}
      </div>
    </div>

    {/* Work Style */}
    <div className="mb-2">
      <h3 className="font-medium text-gray-900 mb-3">Work style</h3>
      <div className="flex flex-wrap gap-2">
        {Object.entries(workStyle).map(([key, value]) => (
          <button
            key={key}
            onClick={() => onToggleWorkStyle(key)}
            className={`${value ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700'} px-3 py-1 rounded-full text-xs hover:shadow-sm transition capitalize`}
          >
            {key}
          </button>
        ))}
      </div>
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('UX/UI Designer');
  const [selectedLocation] = useState('United States');
  const [selectedExperience] = useState('5+ years experience');
  const [workSchedule, setWorkSchedule] = useState({
    fullTime: true,
    partTime: false,
    internship: false,
    projectWork: false,
    volunteering: false,
  });
  const [employmentType, setEmploymentType] = useState({
    fullDay: true,
    flexibleSchedule: true,
    shiftWork: false,
    distantWork: false,
  });
  const [workStyle, setWorkStyle] = useState({
    office: false,
    hybrid: true,
    remote: false,
  });
  const [showFilters, setShowFilters] = useState(false);

  const handleWorkScheduleChange = (key: string) => {
    setWorkSchedule((prev) => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev],
    }));
  };

  const handleEmploymentTypeChange = (key: string) => {
    setEmploymentType((prev) => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev],
    }));
  };

  const handleWorkStyleChange = (key: string) => {
    setWorkStyle((prev) => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev],
    }));
  };

  const resetAll = () => {
    setSearchTerm('UX/UI Designer');
    setWorkSchedule({ fullTime: true, partTime: false, internship: false, projectWork: false, volunteering: false });
    setEmploymentType({ fullDay: true, flexibleSchedule: true, shiftWork: false, distantWork: false });
    setWorkStyle({ office: false, hybrid: true, remote: false });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 flex items-center justify-center shadow-md">
                  <span className="text-white font-bold text-sm">JH</span>
                </div>
                <span className="font-semibold text-gray-900">JobHub</span>
              </div>
              <nav className="hidden md:flex items-center gap-6 ml-2 sm:ml-6">
                <Link to="/" className="text-gray-600 hover:text-gray-900 transition-colors">Home</Link>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Messages</a>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">About us</a>
                <Link to="/dashboard" className="text-gray-900 font-medium">Jobs</Link>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Community</a>
              </nav>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Globe className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Search className="w-5 h-5" />
              </button>
              <div className="w-9 h-9 bg-gray-300 rounded-full" />
              <button
                className="md:hidden px-3 py-2 rounded-lg bg-gray-900 text-white"
                onClick={() => setShowFilters(true)}
              >
                Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <motion.div
              onClick={() => setShowFilters(false)}
              className="absolute inset-0 bg-black/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 260, damping: 26 }}
              className="absolute left-0 top-0 h-full w-11/12 max-w-sm bg-white shadow-xl rounded-r-2xl p-4 overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-base font-semibold">Filters</h3>
                <button
                  aria-label="Close"
                  className="p-2 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowFilters(false)}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <FiltersContent
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedLocation={selectedLocation}
                selectedExperience={selectedExperience}
                workSchedule={workSchedule}
                onToggleWorkSchedule={handleWorkScheduleChange}
                employmentType={employmentType}
                onToggleEmploymentType={handleEmploymentTypeChange}
                workStyle={workStyle}
                onToggleWorkStyle={handleWorkStyleChange}
                onReset={resetAll}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          {/* Desktop Filters Sidebar */}
          <div className="hidden md:block md:w-80 md:shrink-0 md:sticky md:top-24 self-start">
            <FiltersContent
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedLocation={selectedLocation}
              selectedExperience={selectedExperience}
              workSchedule={workSchedule}
              onToggleWorkSchedule={handleWorkScheduleChange}
              employmentType={employmentType}
              onToggleEmploymentType={handleEmploymentTypeChange}
              workStyle={workStyle}
              onToggleWorkStyle={handleWorkStyleChange}
              onReset={resetAll}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Top search bar with chips */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-3 mb-6">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Search jobs"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="-mx-1 overflow-x-auto no-scrollbar">
                <div className="flex items-center gap-2 px-1">
                  <button className="bg-gray-100 text-gray-700 px-3 py-2 rounded-full text-sm whitespace-nowrap">
                    {selectedLocation}
                  </button>
                  <button className="bg-gray-100 text-gray-700 px-3 py-2 rounded-full text-sm whitespace-nowrap">
                    {selectedExperience}
                  </button>
                </div>
              </div>
            </div>

            {/* Promo Card */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="show"
              className="bg-gradient-to-br from-fuchsia-600 via-violet-600 to-blue-600 rounded-2xl p-6 text-white mb-6 shadow-lg"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-2">Find your dream job</h2>
                  <p className="text-fuchsia-100 mb-4">
                    Get hired faster with premium perks! Boost your visibility!
                  </p>
                </div>
                <button className="bg-white text-gray-900 px-4 py-2 rounded-xl text-sm hover:bg-gray-100 transition shadow self-start sm:self-auto">
                  Get PRO for $12 per month
                </button>
              </div>
            </motion.div>

            {/* Job Cards Grid */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              {mockJobs.map((job) => (
                <motion.div
                  key={job.id}
                  variants={itemVariants}
                  whileHover={{ y: -2, boxShadow: '0 10px 20px rgba(0,0,0,0.08)' }}
                  className={`${job.cardBg} rounded-2xl border border-gray-200 p-6 shadow-sm`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-4 min-w-0">
                      <div
                        className={`w-12 h-12 ${job.logoColor} rounded-xl flex items-center justify-center text-white font-bold shadow`}
                      >
                        {job.logo}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-gray-900 truncate">{job.title}</h3>
                          {job.featured && (
                            <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">Featured</span>
                          )}
                        </div>
                        <p className="text-gray-600 text-sm mb-2 truncate">{job.company}</p>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500 mb-3">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span className="truncate">{job.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span className="truncate">{job.applicants}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="bg-white/70 border border-gray-200 text-gray-800 px-3 py-1 rounded-full text-xs">
                            {job.type}
                          </span>
                          <span className="bg-white/70 border border-gray-200 text-gray-800 px-3 py-1 rounded-full text-xs">
                            {job.experience}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right min-w-[150px]">
                      <div className="text-lg font-semibold text-gray-900 mb-1">
                        {job.salary}
                        <span className="text-sm font-normal text-gray-500">{job.period}</span>
                      </div>
                      <div className="flex items-center gap-2 justify-end">
                        <motion.button
                          whileTap={{ scale: 0.98 }}
                          className="bg-gray-900 text-white px-4 py-2 rounded-xl text-sm hover:bg-gray-800 transition-colors shadow"
                        >
                          Apply now
                        </motion.button>
                        <motion.button
                          aria-label="Save"
                          whileTap={{ scale: 1.15 }}
                          className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                        >
                          <Heart className="w-5 h-5" />
                        </motion.button>
                        <motion.button
                          aria-label="Bookmark"
                          whileTap={{ scale: 1.15 }}
                          className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
                        >
                          <Bookmark className="w-5 h-5" />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;