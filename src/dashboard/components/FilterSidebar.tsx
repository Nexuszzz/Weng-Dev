import React, { useState, useRef } from 'react';

// Label mapping untuk tampilan Bahasa Indonesia
const LABELS = {
  workSchedule: { 'full-time': 'Penuh Waktu', 'part-time': 'Paruh Waktu', 'contract': 'Kontrak', 'internship': 'Magang' },
  employmentType: { 'permanent': 'Tetap', 'contract': 'Kontrak', 'freelance': 'Lepas', 'temporary': 'Sementara' },
  workStyle: { 'remote': 'Jarak Jauh', 'hybrid': 'Hibrida', 'on-site': 'Di lokasi' },
};

const FilterSidebar: React.FC = () => {
  const [workSchedule, setWorkSchedule] = useState<string>('full-time');
  const [employmentType, setEmploymentType] = useState<string>('permanent');
  const [workStyle, setWorkStyle] = useState<string>('hybrid');
  const [minSalary, setMinSalary] = useState<number>(60);
  const [maxSalary, setMaxSalary] = useState<number>(140);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [dragging, setDragging] = useState<'min' | 'max' | null>(null);

  const onMouseDown = (type: 'min' | 'max') => setDragging(type);
  const onMouseUp = () => setDragging(null);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!dragging || !sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = Math.min(Math.max(e.clientX - rect.left, 0), rect.width);
    const value = Math.round((x / rect.width) * 200); // 0 - 200 (k)
    if (dragging === 'min') setMinSalary(Math.min(value, maxSalary));
    else setMaxSalary(Math.max(value, minSalary));
  };

  const percent = (val: number) => `${(val / 200) * 100}%`;

  return (
    <aside className="bg-white rounded-xl shadow-sm p-4 border border-gray-200 w-full md:w-72">
      <h3 className="text-lg font-semibold mb-4">Filter</h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Jadwal Kerja</label>
          <div className="grid grid-cols-2 gap-2">
            {['full-time','part-time','contract','internship'].map((opt) => (
              <button
                key={opt}
                className={`px-3 py-2 rounded-lg text-sm border ${workSchedule===opt? 'bg-purple-600 text-white border-purple-600':'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'}`}
                onClick={() => setWorkSchedule(opt)}
              >
                {LABELS.workSchedule[opt]}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Jenis Pekerjaan</label>
          <div className="grid grid-cols-2 gap-2">
            {['permanent','contract','freelance','temporary'].map((opt) => (
              <button
                key={opt}
                className={`px-3 py-2 rounded-lg text-sm border ${employmentType===opt? 'bg-purple-600 text-white border-purple-600':'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'}`}
                onClick={() => setEmploymentType(opt)}
              >
                {LABELS.employmentType[opt]}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Gaya Kerja</label>
          <div className="grid grid-cols-3 gap-2">
            {['remote','hybrid','on-site'].map((opt) => (
              <button
                key={opt}
                className={`px-3 py-2 rounded-lg text-sm border ${workStyle===opt? 'bg-purple-600 text-white border-purple-600':'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'}`}
                onClick={() => setWorkStyle(opt)}
              >
                {LABELS.workStyle[opt]}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Rentang Gaji (ribu USD)</label>
          <div
            ref={sliderRef}
            onMouseMove={onMouseMove}
            onMouseLeave={() => setDragging(null)}
            className="relative h-10 select-none"
          >
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-gray-200 rounded" />
            <div
              className="absolute top-1/2 -translate-y-1/2 h-1 bg-purple-300"
              style={{ left: percent(minSalary), right: `calc(100% - ${percent(maxSalary)})` }}
            />
            {/* min handle */}
            <div
              role="slider"
              aria-label="Gaji minimum"
              tabIndex={0}
              onMouseDown={() => onMouseDown('min')}
              onMouseUp={onMouseUp}
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border border-purple-600 shadow"
              style={{ left: `calc(${percent(minSalary)} - 8px)` }}
            />
            {/* max handle */}
            <div
              role="slider"
              aria-label="Gaji maksimum"
              tabIndex={0}
              onMouseDown={() => onMouseDown('max')}
              onMouseUp={onMouseUp}
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border border-purple-600 shadow"
              style={{ left: `calc(${percent(maxSalary)} - 8px)` }}
            />
            <div className="flex justify-between text-xs text-gray-600 mt-6">
              <span>{minSalary}k</span>
              <span>{maxSalary}k</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;