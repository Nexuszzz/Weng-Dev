import React, { useState } from 'react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';

interface FilterSidebarProps {
  filters: {
    workSchedule: string[];
    experienceLevel: string[];
    workStyle: string[];
    salaryRange: [number, number];
    remote: boolean | null;
  };
  onFiltersChange: (filters: any) => void;
  jobCount: number;
}

const LABELS = {
  workSchedule: { 
    'full-time': 'Penuh Waktu', 
    'part-time': 'Paruh Waktu', 
    'contract': 'Kontrak', 
    'internship': 'Magang' 
  } as const,
  experienceLevel: { 
    'entry': 'Entry Level', 
    'mid': 'Mid Level', 
    'senior': 'Senior Level' 
  } as const,
  workStyle: { 
    'remote': 'Remote', 
    'hybrid': 'Hibrida', 
    'on-site': 'Di lokasi' 
  } as const
};

const FilterSidebar: React.FC<FilterSidebarProps> = ({ filters, onFiltersChange, jobCount }) => {
  const [salaryValues, setSalaryValues] = useState<number[]>(filters.salaryRange);

  const handleWorkScheduleChange = (type: string, checked: boolean) => {
    const newSchedules = checked
      ? [...filters.workSchedule, type]
      : filters.workSchedule.filter(s => s !== type);
    
    onFiltersChange({
      ...filters,
      workSchedule: newSchedules
    });
  };

  const handleExperienceChange = (level: string, checked: boolean) => {
    const newLevels = checked
      ? [...filters.experienceLevel, level]
      : filters.experienceLevel.filter(l => l !== level);
    
    onFiltersChange({
      ...filters,
      experienceLevel: newLevels
    });
  };

  const handleWorkStyleChange = (style: string, checked: boolean) => {
    const newStyles = checked
      ? [...filters.workStyle, style]
      : filters.workStyle.filter(s => s !== style);
    
    onFiltersChange({
      ...filters,
      workStyle: newStyles
    });
  };

  const handleSalaryChange = (values: number[]) => {
    setSalaryValues(values);
    onFiltersChange({
      ...filters,
      salaryRange: [values[0], values[1]] as [number, number]
    });
  };

  const clearAllFilters = () => {
    setSalaryValues([0, 50]);
    onFiltersChange({
      workSchedule: [],
      experienceLevel: [],
      workStyle: [],
      salaryRange: [0, 50] as [number, number],
      remote: null
    });
  };

  const formatSalary = (amount: number) => {
    if (amount >= 50) return '50+ Juta';
    return `${amount} Juta`;
  };

  const activeFiltersCount = 
    filters.workSchedule.length + 
    filters.experienceLevel.length + 
    filters.workStyle.length + 
    (filters.salaryRange[0] > 0 || filters.salaryRange[1] < 50 ? 1 : 0) + 
    (filters.remote !== null ? 1 : 0);

  return (
    <div className="w-64 bg-white border-r border-gray-100 p-6 overflow-y-auto">
      <div className="space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Filter Pencarian</h3>
          {activeFiltersCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearAllFilters}
              className="text-sm text-purple-600 hover:text-purple-700 font-medium"
            >
              Reset All
            </Button>
          )}
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">{jobCount} lowongan ditemukan</span>
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="bg-purple-100 text-purple-700">
              {activeFiltersCount} filter aktif
            </Badge>
          )}
        </div>

        <Separator />

        {/* Work Schedule Filter */}
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900">Tipe Pekerjaan</h4>
          <div className="space-y-2">
            {Object.entries(LABELS.workSchedule).map(([key, label]) => (
              <div key={key} className="flex items-center space-x-2">
                <Checkbox
                  id={`work-schedule-${key}`}
                  checked={filters.workSchedule.includes(key)}
                  onCheckedChange={(checked) => handleWorkScheduleChange(key, checked as boolean)}
                />
                <label htmlFor={`work-schedule-${key}`} className="text-sm text-gray-700 cursor-pointer">
                  {label}
                </label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Experience Level Filter */}
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900">Tingkat Pengalaman</h4>
          <div className="space-y-2">
            {Object.entries(LABELS.experienceLevel).map(([key, label]) => (
              <div key={key} className="flex items-center space-x-2">
                <Checkbox
                  id={`experience-${key}`}
                  checked={filters.experienceLevel.includes(key)}
                  onCheckedChange={(checked) => handleExperienceChange(key, checked as boolean)}
                />
                <label htmlFor={`experience-${key}`} className="text-sm text-gray-700 cursor-pointer">
                  {label}
                </label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Work Style Filter */}
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900">Gaya Kerja</h4>
          <div className="space-y-2">
            {Object.entries(LABELS.workStyle).map(([key, label]) => (
              <div key={key} className="flex items-center space-x-2">
                <Checkbox
                  id={`work-style-${key}`}
                  checked={filters.workStyle.includes(key)}
                  onCheckedChange={(checked) => handleWorkStyleChange(key, checked as boolean)}
                />
                <label htmlFor={`work-style-${key}`} className="text-sm text-gray-700 cursor-pointer">
                  {label}
                </label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Salary Range Filter */}
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900">Rentang Gaji (Juta/bulan)</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Rp {formatSalary(salaryValues[0])}</span>
              <span className="text-gray-400">—</span>
              <span className="text-gray-600">Rp {formatSalary(salaryValues[1])}</span>
            </div>
            
            <Slider
              value={salaryValues}
              onValueChange={handleSalaryChange}
              max={50}
              min={0}
              step={1}
              className="w-full"
            />

            {/* Quick salary options */}
            <div className="grid grid-cols-2 gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleSalaryChange([0, 10])}
                className="text-xs"
              >
                &lt; 10jt
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleSalaryChange([10, 25])}
                className="text-xs"
              >
                10-25jt
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleSalaryChange([25, 40])}
                className="text-xs"
              >
                25-40jt
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleSalaryChange([40, 50])}
                className="text-xs"
              >
                &gt; 40jt
              </Button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default FilterSidebar;