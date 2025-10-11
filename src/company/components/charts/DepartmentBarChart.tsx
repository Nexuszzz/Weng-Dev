import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface DepartmentData {
  department: string;
  activeJobs: number;
  applications: number;
}

interface DepartmentBarChartProps {
  data: DepartmentData[];
}

const DepartmentBarChart: React.FC<DepartmentBarChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
        <XAxis 
          dataKey="department" 
          stroke="#9CA3AF" 
          fontSize={12}
          tickLine={false}
          angle={-15}
          textAnchor="end"
          height={60}
        />
        <YAxis 
          stroke="#9CA3AF" 
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#1F2937',
            border: '1px solid #374151',
            borderRadius: '8px',
            color: '#F9FAFB'
          }}
          labelStyle={{ color: '#E5E7EB' }}
        />
        <Legend 
          wrapperStyle={{ paddingTop: '20px' }}
          iconType="rect"
        />
        <Bar 
          dataKey="activeJobs" 
          fill="#3B82F6" 
          radius={[8, 8, 0, 0]}
          name="Lowongan Aktif"
        />
        <Bar 
          dataKey="applications" 
          fill="#10B981" 
          radius={[8, 8, 0, 0]}
          name="Total Aplikasi"
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default DepartmentBarChart;
