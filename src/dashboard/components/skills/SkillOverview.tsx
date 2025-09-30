import React, { useState, useRef, useEffect } from 'react';
import { UserSkill } from '@/lib/portfolio';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, BarChart3, Radar, Zap, TrendingUp, Award, Target } from 'lucide-react';
import { toast } from 'sonner';
import SkillBar from './SkillBar';
import SkillRadar from './SkillRadar';
import EditSkillDialog from './EditSkillDialog';

interface SkillOverviewProps {
  skills: UserSkill[];
  onAddSkill: (skill: UserSkill) => void;
  onEditSkill: (skill: UserSkill) => void;
  onDeleteSkill: (skillId: string) => void;
  onAutoAggregate: () => void;
}

const SkillOverview: React.FC<SkillOverviewProps> = ({
  skills,
  onAddSkill,
  onEditSkill,
  onDeleteSkill,
  onAutoAggregate
}) => {
  const [viewMode, setViewMode] = useState<'bars' | 'radar'>('bars');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [editingSkill, setEditingSkill] = useState<UserSkill | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isControlsSticky, setIsControlsSticky] = useState(false);
  const controlsRef = useRef<HTMLDivElement>(null);

  // Get unique categories
  const categories = Array.from(new Set(skills.map(s => s.category).filter(Boolean)));

  // Filter skills by category
  const filteredSkills = selectedCategory === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === selectedCategory);

  // Calculate stats
  const stats = {
    total: skills.length,
    expert: skills.filter(s => s.level >= 80).length,
    advanced: skills.filter(s => s.level >= 60 && s.level < 80).length,
    average: skills.length > 0 ? Math.round(skills.reduce((acc, s) => acc + s.level, 0) / skills.length) : 0
  };

  // Sticky controls effect
  useEffect(() => {
    const handleScroll = () => {
      if (controlsRef.current) {
        const rect = controlsRef.current.getBoundingClientRect();
        setIsControlsSticky(rect.top <= 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleEditClick = (skill: UserSkill) => {
    setEditingSkill(skill);
  };

  const handleSaveSkill = (skill: UserSkill) => {
    if (editingSkill) {
      onEditSkill(skill);
      toast.success('Skill berhasil diperbarui!', {
        description: `${skill.name} telah diperbarui ke level ${skill.level}%`
      });
    } else {
      onAddSkill(skill);
      toast.success('Skill berhasil ditambahkan!', {
        description: `${skill.name} ditambahkan dengan level ${skill.level}%`
      });
    }
    setEditingSkill(null);
    setIsAddDialogOpen(false);
  };

  const handleDeleteSkill = (skillId: string) => {
    const skill = skills.find(s => s.id === skillId);
    onDeleteSkill(skillId);
    toast.success('Skill berhasil dihapus!', {
      description: skill ? `${skill.name} telah dihapus dari daftar skill` : 'Skill telah dihapus'
    });
  };

  const handleAutoAggregate = () => {
    onAutoAggregate();
    toast.success('Skill berhasil diagregasi!', {
      description: 'Skill otomatis ditambahkan berdasarkan teknologi dalam proyek'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header with Gradient Background */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-emerald-600/10 dark:from-blue-600/5 dark:via-purple-600/5 dark:to-emerald-600/5" />
        <Card className="relative border-0 shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <CardHeader className="pb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div className="space-y-2">
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent">
                  Skill Overview
                </CardTitle>
                <p className="text-gray-600 dark:text-gray-300">
                  Kelola dan visualisasikan kemampuan teknis Anda
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button 
                  onClick={handleAutoAggregate}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 hover:bg-blue-50 hover:border-blue-300 dark:hover:bg-blue-900/20 transition-all duration-200"
                >
                  <Zap size={16} className="text-blue-600" />
                  Auto-aggregate
                </Button>
                <Button 
                  onClick={() => setIsAddDialogOpen(true)}
                  size="sm"
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <Plus size={16} />
                  Tambah Skill
                </Button>
              </div>
            </div>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                    <Target size={16} className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.total}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Total Skills</p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 border border-emerald-200 dark:border-emerald-800">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                    <Award size={16} className="text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{stats.expert}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Expert Level</p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-800">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30">
                    <TrendingUp size={16} className="text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{stats.advanced}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Advanced</p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 rounded-xl bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 border border-orange-200 dark:border-orange-800">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900/30">
                    <BarChart3 size={16} className="text-orange-600 dark:text-orange-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">{stats.average}%</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Average</p>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>

      {/* Sticky Controls */}
      <div 
        ref={controlsRef}
        className={`transition-all duration-300 ${isControlsSticky ? 'sticky top-0 z-10 shadow-lg' : ''}`}
      >
        <Card className={`${isControlsSticky ? 'rounded-none border-x-0 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm' : ''}`}>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              {/* View Mode Toggle */}
              <div className="flex gap-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <Button
                  variant={viewMode === 'bars' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('bars')}
                  className={`flex items-center gap-2 transition-all duration-200 ${
                    viewMode === 'bars' 
                      ? 'bg-white dark:bg-gray-700 shadow-sm' 
                      : 'hover:bg-white/50 dark:hover:bg-gray-700/50'
                  }`}
                >
                  <BarChart3 size={16} />
                  Bars
                </Button>
                <Button
                  variant={viewMode === 'radar' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('radar')}
                  className={`flex items-center gap-2 transition-all duration-200 ${
                    viewMode === 'radar' 
                      ? 'bg-white dark:bg-gray-700 shadow-sm' 
                      : 'hover:bg-white/50 dark:hover:bg-gray-700/50'
                  }`}
                >
                  <Radar size={16} />
                  Radar
                </Button>
              </div>

              {/* Category Filter with Badges */}
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Filter:</span>
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant={selectedCategory === 'all' ? 'default' : 'secondary'}
                    className="cursor-pointer hover:scale-105 transition-transform"
                    onClick={() => setSelectedCategory('all')}
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
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent" />

      {/* Content */}
      {viewMode === 'bars' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Skills List */}
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <BarChart3 size={20} className="text-blue-600" />
                Skills ({filteredSkills.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                {filteredSkills.length === 0 ? (
                  <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center">
                      <Target size={24} className="text-gray-400" />
                    </div>
                    <p className="font-medium">Belum ada skill</p>
                    <p className="text-sm">
                      {selectedCategory === 'all' 
                        ? 'Tambahkan skill pertama Anda'
                        : `Belum ada skill dalam kategori "${selectedCategory}"`
                      }
                    </p>
                  </div>
                ) : (
                  filteredSkills.map((skill, index) => (
                    <div 
                      key={skill.id}
                      style={{ animationDelay: `${index * 100}ms` }}
                      className="animate-in slide-in-from-left-5 duration-500"
                    >
                      <SkillBar
                        skill={skill}
                        onEdit={() => handleEditClick(skill)}
                        onDelete={() => handleDeleteSkill(skill.id)}
                      />
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Radar Chart */}
          <div className="animate-in slide-in-from-right-5 duration-700">
            <SkillRadar skills={filteredSkills} />
          </div>
        </div>
      ) : (
        <div className="animate-in fade-in duration-500">
          <SkillRadar skills={filteredSkills} maxSkills={12} />
        </div>
      )}

      {/* Edit/Add Dialog */}
      <EditSkillDialog
        skill={editingSkill}
        isOpen={!!editingSkill || isAddDialogOpen}
        onClose={() => {
          setEditingSkill(null);
          setIsAddDialogOpen(false);
        }}
        onSave={handleSaveSkill}
      />
    </div>
  );
};

export default SkillOverview;