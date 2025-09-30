import React, { useState, useMemo } from 'react';
import { UserSkill } from '@/lib/portfolio';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Download, Maximize2, RotateCcw, Palette } from 'lucide-react';

interface SkillRadarProps {
  skills: UserSkill[];
  title?: string;
  maxSkills?: number;
}

const SkillRadar: React.FC<SkillRadarProps> = ({ 
  skills, 
  title = 'Top Skills Overview', 
  maxSkills = 8 
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [colorTheme, setColorTheme] = useState<'default' | 'vibrant' | 'professional'>('default');
  const [isExpanded, setIsExpanded] = useState(false);

  // Get unique categories
  const categories = useMemo(() => {
    return Array.from(new Set(skills.map(s => s.category).filter(Boolean)));
  }, [skills]);

  // Filter and prepare data
  const chartData = useMemo(() => {
    const filteredSkills = selectedCategory 
      ? skills.filter(s => s.category === selectedCategory)
      : skills;
    
    return filteredSkills
      .sort((a, b) => b.level - a.level)
      .slice(0, maxSkills)
      .map(skill => ({
        skill: skill.name,
        level: skill.level,
        category: skill.category,
        fullMark: 100
      }));
  }, [skills, selectedCategory, maxSkills]);

  // Color themes
  const themes = {
    default: {
      primary: '#10b981',
      secondary: '#3b82f6',
      accent: '#8b5cf6'
    },
    vibrant: {
      primary: '#f59e0b',
      secondary: '#ef4444',
      accent: '#8b5cf6'
    },
    professional: {
      primary: '#1f2937',
      secondary: '#374151',
      accent: '#6b7280'
    }
  };

  const currentTheme = themes[colorTheme];

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700">
          <p className="font-semibold text-gray-900 dark:text-white">{label}</p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Level: <span className="font-medium text-blue-600">{data.level}%</span>
          </p>
          {data.category && (
            <Badge variant="secondary" className="text-xs mt-1">
              {data.category}
            </Badge>
          )}
        </div>
      );
    }
    return null;
  };

  const handleExport = () => {
    // Simple export functionality - in real app, you'd use a library like html2canvas
    console.log('Export chart functionality would be implemented here');
  };

  if (chartData.length === 0) {
    return (
      <Card className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-gray-200 dark:border-gray-700 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex flex-col items-center justify-center text-gray-500 dark:text-gray-400 space-y-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 flex items-center justify-center">
              <Maximize2 size={24} className="text-blue-600 dark:text-blue-400" />
            </div>
            <div className="text-center">
              <p className="font-medium">Belum ada data skill</p>
              <p className="text-sm">
                {selectedCategory 
                  ? `Tidak ada skill dalam kategori "${selectedCategory}"`
                  : 'Tambahkan skill untuk melihat visualisasi radar'
                }
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300">
      <CardHeader className="space-y-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {title}
          </CardTitle>
          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => setColorTheme(colorTheme === 'default' ? 'vibrant' : colorTheme === 'vibrant' ? 'professional' : 'default')}
              title="Change color theme"
            >
              <Palette size={14} />
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => setSelectedCategory(null)}
              title="Reset filters"
            >
              <RotateCcw size={14} />
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={handleExport}
              title="Export chart"
            >
              <Download size={14} />
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => setIsExpanded(!isExpanded)}
              title={isExpanded ? 'Collapse' : 'Expand'}
            >
              <Maximize2 size={14} />
            </Button>
          </div>
        </div>
        
        {/* Category filters */}
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <Badge
              variant={selectedCategory === null ? 'default' : 'secondary'}
              className="cursor-pointer hover:scale-105 transition-transform"
              onClick={() => setSelectedCategory(null)}
            >
              Semua ({skills.length})
            </Badge>
            {categories.map(category => {
              const count = skills.filter(s => s.category === category).length;
              return (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'secondary'}
                  className="cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category} ({count})
                </Badge>
              );
            })}
          </div>
        )}
      </CardHeader>
      
      <CardContent>
        <div className={`transition-all duration-500 ${isExpanded ? 'h-96' : 'h-64'}`}>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={chartData} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
              <PolarGrid 
                className="stroke-gray-300 dark:stroke-gray-600" 
                strokeDasharray="3 3"
              />
              <PolarAngleAxis 
                dataKey="skill" 
                className="text-xs fill-gray-700 dark:fill-gray-300 font-medium"
                tick={{ fontSize: 11, fontWeight: 500 }}
              />
              <PolarRadiusAxis 
                angle={90} 
                domain={[0, 100]} 
                className="text-xs fill-gray-500 dark:fill-gray-400"
                tick={{ fontSize: 10 }}
                tickCount={5}
              />
              <Tooltip content={<CustomTooltip />} />
              <Radar
                name="Skill Level"
                dataKey="level"
                stroke={currentTheme.primary}
                fill={currentTheme.primary}
                fillOpacity={0.3}
                strokeWidth={3}
                dot={{ fill: currentTheme.primary, strokeWidth: 2, r: 4 }}
                animationBegin={0}
                animationDuration={1500}
                animationEasing="ease-out"
              />
              {/* Secondary radar for comparison if needed */}
              {chartData.length > 4 && (
                <Radar
                  name="Category Average"
                  dataKey="level"
                  stroke={currentTheme.secondary}
                  fill="transparent"
                  strokeWidth={1}
                  strokeDasharray="5 5"
                  dot={false}
                />
              )}
            </RadarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-6 space-y-3">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-3 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
              <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                {chartData.length}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Skills Shown</p>
            </div>
            <div className="p-3 rounded-lg bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20">
              <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                {Math.round(chartData.reduce((acc, curr) => acc + curr.level, 0) / chartData.length) || 0}%
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Average Level</p>
            </div>
            <div className="p-3 rounded-lg bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
              <p className="text-lg font-bold text-purple-600 dark:text-purple-400">
                {chartData.filter(s => s.level >= 80).length}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Expert Level</p>
            </div>
          </div>
          
          {/* Description */}
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {selectedCategory 
                ? `Menampilkan ${chartData.length} skill dalam kategori "${selectedCategory}"`
                : `Menampilkan ${chartData.length} skill teratas dari total ${skills.length} skill`
              }
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillRadar;