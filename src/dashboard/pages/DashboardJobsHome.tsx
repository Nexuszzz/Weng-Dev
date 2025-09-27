import React from 'react';
import SearchBar from '../components/SearchBar';
import FilterSidebar from '../components/FilterSidebar';
import JobCard from '../components/JobCard';

const DashboardJobsHome: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 space-y-4">
        <SearchBar />
        <div className="grid sm:grid-cols-2 gap-4">
          <JobCard />
          <JobCard />
          <JobCard promo />
          <JobCard />
        </div>
      </div>
      <div>
        <FilterSidebar />
      </div>
    </div>
  );
};

export default DashboardJobsHome;