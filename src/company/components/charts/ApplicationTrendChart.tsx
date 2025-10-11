import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface DataPoint {
  date: string;
  applications: number;
  interviews: number;
  hired: number;
}

interface ApplicationTrendChartProps {
  data: DataPoint[];
}

const ApplicationTrendChart: React.FC<ApplicationTrendChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
        <XAxis 
          dataKey="date" 
          stroke="#9CA3AF" 
          fontSize={12}
          tickLine={false}
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
          iconType="circle"
        />
        <Line 
          type="monotone" 
          dataKey="applications" 
          stroke="#3B82F6" 
          strokeWidth={2}
          dot={{ fill: '#3B82F6', r: 4 }}
          activeDot={{ r: 6 }}
          name="Aplikasi"
        />
        <Line 
          type="monotone" 
          dataKey="interviews" 
          stroke="#8B5CF6" 
          strokeWidth={2}
          dot={{ fill: '#8B5CF6', r: 4 }}
          activeDot={{ r: 6 }}
          name="Interview"
        />
        <Line 
          type="monotone" 
          dataKey="hired" 
          stroke="#10B981" 
          strokeWidth={2}
          dot={{ fill: '#10B981', r: 4 }}
          activeDot={{ r: 6 }}
          name="Diterima"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ApplicationTrendChart;
