import React, { useState, useEffect } from 'react';
import { UserSkill, createEmptySkill } from '@/lib/portfolio';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { X, Star, TrendingUp, Award, Target, Zap, Code, Palette, Database, Server, Smartphone, Wrench } from 'lucide-react';

interface EditSkillDialogProps {
  skill?: UserSkill | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (skill: UserSkill) => void;
}

const SKILL_CATEGORIES = [
  { name: 'Frontend', icon: Code, color: 'from-blue-500 to-cyan-500' },
  { name: 'Backend', icon: Server, color: 'from-green-500 to-emerald-500' },
  { name: 'Database', icon: Database, color: 'from-purple-500 to-violet-500' },
  { name: 'DevOps', icon: Wrench, color: 'from-orange-500 to-red-500' },
  { name: 'Mobile', icon: Smartphone, color: 'from-pink-500 to-rose-500' },
  { name: 'Design', icon: Palette, color: 'from-indigo-500 to-purple-500' },
  { name: 'Tools', icon: Wrench, color: 'from-gray-500 to-slate-500' },
  { name: 'Other', icon: Star, color: 'from-yellow-500 to-amber-500' }
];

const getSkillLevel = (level: number) => {
  if (level >= 80) return { 
    label: 'Expert', 
    color: 'from-emerald-500 to-green-500',
    icon: Award,
    description: 'Menguasai dengan sangat baik, dapat mengajar orang lain',
    glow: 'shadow-emerald-500/25'
  };
  if (level >= 60) return { 
    label: 'Advanced', 
    color: 'from-blue-500 to-indigo-500',
    icon: TrendingUp,
    description: 'Mahir dan dapat bekerja secara mandiri',
    glow: 'shadow-blue-500/25'
  };
  if (level >= 40) return { 
    label: 'Intermediate', 
    color: 'from-yellow-500 to-orange-500',
    icon: Target,
    description: 'Memahami konsep dasar dan dapat mengimplementasikan',
    glow: 'shadow-yellow-500/25'
  };
  return { 
    label: 'Beginner', 
    color: 'from-red-500 to-pink-500',
    icon: Zap,
    description: 'Baru mulai belajar, memahami konsep dasar',
    glow: 'shadow-red-500/25'
  };
};

const EditSkillDialog: React.FC<EditSkillDialogProps> = ({
  skill,
  isOpen,
  onClose,
  onSave
}) => {
  const [formData, setFormData] = useState<UserSkill>(createEmptySkill());
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (skill) {
      setFormData(skill);
    } else {
      setFormData(createEmptySkill());
    }
    setErrors({});
    setIsAnimating(false);
  }, [skill, isOpen]);

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nama skill harus diisi';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Nama skill minimal 2 karakter';
    }

    if (formData.level < 1 || formData.level > 100) {
      newErrors.level = 'Level harus antara 1-100';
    }

    if (!formData.category) {
      newErrors.category = 'Kategori harus dipilih';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsAnimating(true);
      setTimeout(() => {
        onSave(formData);
        setIsAnimating(false);
      }, 300);
    }
  };

  const handleLevelChange = (value: number[]) => {
    setFormData(prev => ({ ...prev, level: value[0] }));
  };

  const handleCategorySelect = (category: string) => {
    setFormData(prev => ({ ...prev, category }));
  };

  const skillLevelInfo = getSkillLevel(formData.level);
  const LevelIcon = skillLevelInfo.icon;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {skill ? 'Edit Skill' : 'Tambah Skill Baru'}
          </DialogTitle>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {skill ? 'Perbarui informasi skill Anda' : 'Tambahkan skill baru ke portfolio Anda'}
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Skill Name */}
          <div className="space-y-3">
            <Label htmlFor="name" className="text-sm font-medium flex items-center gap-2">
              <Code size={16} className="text-blue-600" />
              Nama Skill
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Contoh: React, Python, Figma"
              className={`transition-all duration-200 ${
                errors.name 
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                  : 'focus:border-blue-500 focus:ring-blue-500/20'
              }`}
            />
            {errors.name && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <X size={14} />
                {errors.name}
              </p>
            )}
          </div>

          {/* Skill Level */}
          <div className="space-y-4">
            <Label className="text-sm font-medium flex items-center gap-2">
              <TrendingUp size={16} className="text-purple-600" />
              Level Keahlian
            </Label>
            
            {/* Level Display */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 border border-gray-200 dark:border-gray-600">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${skillLevelInfo.color} shadow-lg ${skillLevelInfo.glow}`}>
                    <LevelIcon size={16} className="text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {skillLevelInfo.label}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {skillLevelInfo.description}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {formData.level}%
                  </p>
                </div>
              </div>
              
              <Progress 
                value={formData.level} 
                className="h-2 mb-3"
              />
              
              <Slider
                value={[formData.level]}
                onValueChange={handleLevelChange}
                max={100}
                min={1}
                step={5}
                className="w-full"
              />
              
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
                <span>1%</span>
                <span>25%</span>
                <span>50%</span>
                <span>75%</span>
                <span>100%</span>
              </div>
            </div>
            
            {errors.level && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <X size={14} />
                {errors.level}
              </p>
            )}
          </div>

          {/* Category */}
          <div className="space-y-3">
            <Label className="text-sm font-medium flex items-center gap-2">
              <Star size={16} className="text-yellow-600" />
              Kategori
            </Label>
            <div className="grid grid-cols-2 gap-3">
              {SKILL_CATEGORIES.map(category => {
                const CategoryIcon = category.icon;
                const isSelected = formData.category === category.name;
                return (
                  <div
                    key={category.name}
                    onClick={() => handleCategorySelect(category.name)}
                    className={`p-3 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:scale-105 ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-lg'
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${category.color} shadow-sm`}>
                        <CategoryIcon size={16} className="text-white" />
                      </div>
                      <span className={`font-medium ${
                        isSelected 
                          ? 'text-blue-700 dark:text-blue-300' 
                          : 'text-gray-700 dark:text-gray-300'
                      }`}>
                        {category.name}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
            {errors.category && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <X size={14} />
                {errors.category}
              </p>
            )}
          </div>

          {/* Description (Optional) */}
          <div className="space-y-3">
            <Label htmlFor="description" className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Deskripsi (Opsional)
            </Label>
            <Textarea
              id="description"
              value={formData.description || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Ceritakan pengalaman atau proyek yang menggunakan skill ini..."
              className="resize-none h-20 text-sm"
            />
          </div>

          <DialogFooter className="gap-3 pt-6">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              className="hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              Batal
            </Button>
            <Button 
              type="submit"
              disabled={isAnimating}
              className={`bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200 ${
                isAnimating ? 'scale-95 opacity-75' : 'scale-100 opacity-100'
              }`}
            >
              {isAnimating ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Menyimpan...
                </div>
              ) : (
                <>{skill ? 'Update' : 'Tambah'} Skill</>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditSkillDialog;