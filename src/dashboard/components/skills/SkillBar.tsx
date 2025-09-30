import React from 'react';
import { UserSkill } from '@/lib/portfolio';
import { Badge } from '@/components/ui/badge';
import { Star, Award, Target, Trophy } from 'lucide-react';

interface SkillBarProps {
  skill: UserSkill;
  showCategory?: boolean;
  animationDelay?: number;
}

const getSkillLevel = (level: number): { label: string; gradient: string; icon: React.ReactNode; glow: string } => {
  if (level >= 80) return { 
    label: 'Expert', 
    gradient: 'bg-gradient-to-r from-blue-500 to-emerald-500', 
    icon: <Trophy size={14} className="text-emerald-600" />,
    glow: 'shadow-emerald-500/50'
  };
  if (level >= 60) return { 
    label: 'Advanced', 
    gradient: 'bg-gradient-to-r from-yellow-500 to-blue-500', 
    icon: <Award size={14} className="text-blue-600" />,
    glow: 'shadow-blue-500/50'
  };
  if (level >= 40) return { 
    label: 'Intermediate', 
    gradient: 'bg-gradient-to-r from-orange-500 to-yellow-500', 
    icon: <Target size={14} className="text-yellow-600" />,
    glow: 'shadow-yellow-500/50'
  };
  return { 
    label: 'Beginner', 
    gradient: 'bg-gradient-to-r from-red-500 to-orange-500', 
    icon: <Star size={14} className="text-orange-600" />,
    glow: 'shadow-red-500/50'
  };
};

const SkillBar: React.FC<SkillBarProps> = ({ skill, showCategory = true, animationDelay = 0 }) => {
  const { label, gradient, icon, glow } = getSkillLevel(skill.level);

  return (
    <div 
      className="space-y-3 p-4 rounded-xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group"
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            {icon}
            <span className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {skill.name}
            </span>
          </div>
          {showCategory && skill.category && (
            <Badge 
              variant="secondary" 
              className="text-xs bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-300"
            >
              {skill.category}
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-3">
          <Badge 
            variant="outline" 
            className="text-xs font-medium bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
          >
            {label}
          </Badge>
          <span className="text-sm font-bold text-gray-900 dark:text-white bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {skill.level}%
          </span>
        </div>
      </div>
      
      <div className="relative">
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden shadow-inner">
          <div 
            className={`h-full rounded-full transition-all duration-1000 ease-out ${gradient} ${glow} shadow-lg relative overflow-hidden group-hover:shadow-2xl`}
            style={{ 
              width: `${skill.level}%`,
              animationDelay: `${animationDelay}ms`
            }}
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 animate-pulse" />
            
            {/* Glow effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>
        
        {/* Progress indicator dots */}
        <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-1 pointer-events-none">
          {[25, 50, 75].map((mark) => (
            <div 
              key={mark}
              className={`w-1 h-1 rounded-full transition-all duration-300 ${
                skill.level >= mark 
                  ? 'bg-white shadow-lg scale-125' 
                  : 'bg-gray-400 dark:bg-gray-600'
              }`}
            />
          ))}
        </div>
      </div>
      
      {/* Skill level description */}
      <div className="text-xs text-gray-500 dark:text-gray-400 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {skill.level >= 80 && "Menguasai dengan sangat baik, dapat mengajar orang lain"}
        {skill.level >= 60 && skill.level < 80 && "Dapat bekerja secara mandiri dengan confidence"}
        {skill.level >= 40 && skill.level < 60 && "Memahami konsep dasar, perlu guidance sesekali"}
        {skill.level < 40 && "Masih dalam tahap pembelajaran dan eksplorasi"}
      </div>
    </div>
  );
};

export default SkillBar;