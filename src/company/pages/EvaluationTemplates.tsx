import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Copy, Star, Percent } from 'lucide-react';
import { getEvaluationTemplates, createEvaluationTemplate } from '@/lib/company/data';
import { EvaluationTemplate, EvaluationCriteria } from '@/lib/company/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const EvaluationTemplates: React.FC = () => {
  const [templates, setTemplates] = useState<EvaluationTemplate[]>([]);
  const [editingTemplate, setEditingTemplate] = useState<EvaluationTemplate | null>(null);

  useEffect(() => {
    setTemplates(getEvaluationTemplates());
  }, []);

  const handleCreateTemplate = () => {
    const newTemplate = {
      name: 'Template Baru',
      description: 'Deskripsi template evaluasi',
      criteria: [
        {
          id: 'tech-1',
          label: 'Technical Skills',
          description: 'Kemampuan teknis sesuai posisi',
          weight: 40,
          maxScore: 10
        },
        {
          id: 'comm-1',
          label: 'Communication',
          description: 'Kemampuan komunikasi dan presentasi',
          weight: 30,
          maxScore: 10
        },
        {
          id: 'prob-1',
          label: 'Problem Solving',
          description: 'Kemampuan analisis dan pemecahan masalah',
          weight: 30,
          maxScore: 10
        }
      ],
      isDefault: false
    };

    try {
      const created = createEvaluationTemplate(newTemplate);
      setTemplates([...templates, created]);
      toast.success('Template berhasil dibuat');
    } catch (error) {
      console.error('Error creating template:', error);
      toast.error('Gagal membuat template');
    }
  };

  const duplicateTemplate = (template: EvaluationTemplate) => {
    const duplicated = {
      name: `${template.name} (Copy)`,
      description: template.description,
      criteria: template.criteria.map(c => ({
        ...c,
        id: `${c.id}-copy-${Date.now()}`
      })),
      isDefault: false
    };

    try {
      const created = createEvaluationTemplate(duplicated);
      setTemplates([...templates, created]);
      toast.success('Template berhasil diduplikasi');
    } catch (error) {
      console.error('Error duplicating template:', error);
      toast.error('Gagal menduplikasi template');
    }
  };

  const calculateTotalWeight = (criteria: EvaluationCriteria[]): number => {
    return criteria.reduce((total, criterion) => total + criterion.weight, 0);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Template Evaluasi</h1>
          <p className="text-gray-600">Kelola template evaluasi untuk proses interview</p>
        </div>
        <Button onClick={handleCreateTemplate}>
          <Plus className="w-4 h-4 mr-2" />
          Buat Template Baru
        </Button>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {templates.map(template => (
          <Card key={template.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    {template.isDefault && (
                      <Badge variant="default">
                        <Star className="w-3 h-3 mr-1" />
                        Default
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{template.description}</p>
                </div>
                
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setEditingTemplate(template)}
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => duplicateTemplate(template)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  {!template.isDefault && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {/* Criteria List */}
                {template.criteria.map(criterion => (
                  <div key={criterion.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{criterion.label}</p>
                      <p className="text-xs text-gray-500">{criterion.description}</p>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Badge variant="outline">
                        <Percent className="w-3 h-3 mr-1" />
                        {criterion.weight}%
                      </Badge>
                      <Badge variant="outline">
                        Max: {criterion.maxScore}
                      </Badge>
                    </div>
                  </div>
                ))}

                {/* Total Weight Check */}
                <div className="pt-3 border-t">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Total Bobot:</span>
                    <Badge 
                      variant={calculateTotalWeight(template.criteria) === 100 ? "default" : "destructive"}
                    >
                      {calculateTotalWeight(template.criteria)}%
                    </Badge>
                  </div>
                  {calculateTotalWeight(template.criteria) !== 100 && (
                    <p className="text-xs text-red-600 mt-1">
                      ⚠️ Total bobot harus 100%
                    </p>
                  )}
                </div>

                {/* Template Stats */}
                <div className="pt-3 border-t">
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
                    <div>
                      <p>Dibuat: {new Date(template.createdAt).toLocaleDateString('id-ID')}</p>
                    </div>
                    <div>
                      <p>Diperbarui: {new Date(template.updatedAt).toLocaleDateString('id-ID')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Empty State */}
        {templates.length === 0 && (
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-12">
                <div className="text-center">
                  <div className="text-4xl mb-4">📊</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Belum Ada Template</h3>
                  <p className="text-gray-600 mb-4">
                    Buat template evaluasi pertama Anda untuk standardisasi proses interview
                  </p>
                  <Button onClick={handleCreateTemplate}>
                    <Plus className="w-4 h-4 mr-2" />
                    Buat Template Pertama
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Quick Create Templates */}
      {templates.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Template Cepat</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button
                variant="outline"
                className="h-auto p-4 text-left"
                onClick={() => {
                  const techTemplate = {
                    name: 'Technical Interview',
                    description: 'Template untuk evaluasi kemampuan teknis',
                    criteria: [
                      { id: 'coding', label: 'Coding Skills', description: 'Problem solving dan algoritma', weight: 50, maxScore: 10 },
                      { id: 'system', label: 'System Design', description: 'Arsitektur dan scalability', weight: 30, maxScore: 10 },
                      { id: 'tools', label: 'Tools & Framework', description: 'Penguasaan tools teknis', weight: 20, maxScore: 10 }
                    ],
                    isDefault: false
                  };
                  try {
                    const created = createEvaluationTemplate(techTemplate);
                    setTemplates([...templates, created]);
                    toast.success('Template Technical Interview dibuat');
                  } catch (error) {
                    toast.error('Gagal membuat template');
                  }
                }}
              >
                <div>
                  <h4 className="font-medium">Technical Interview</h4>
                  <p className="text-sm text-gray-600">Coding, System Design, Tools</p>
                </div>
              </Button>

              <Button
                variant="outline"
                className="h-auto p-4 text-left"
                onClick={() => {
                  const hrTemplate = {
                    name: 'HR Interview',
                    description: 'Template untuk evaluasi soft skills',
                    criteria: [
                      { id: 'communication', label: 'Communication', description: 'Kemampuan komunikasi', weight: 40, maxScore: 10 },
                      { id: 'teamwork', label: 'Teamwork', description: 'Kolaborasi tim', weight: 30, maxScore: 10 },
                      { id: 'culture', label: 'Culture Fit', description: 'Kesesuaian budaya', weight: 30, maxScore: 10 }
                    ],
                    isDefault: false
                  };
                  try {
                    const created = createEvaluationTemplate(hrTemplate);
                    setTemplates([...templates, created]);
                    toast.success('Template HR Interview dibuat');
                  } catch (error) {
                    toast.error('Gagal membuat template');
                  }
                }}
              >
                <div>
                  <h4 className="font-medium">HR Interview</h4>
                  <p className="text-sm text-gray-600">Communication, Teamwork, Culture</p>
                </div>
              </Button>

              <Button
                variant="outline"
                className="h-auto p-4 text-left"
                onClick={() => {
                  const managerTemplate = {
                    name: 'Leadership Assessment',
                    description: 'Template untuk posisi leadership',
                    criteria: [
                      { id: 'leadership', label: 'Leadership', description: 'Kemampuan memimpin', weight: 40, maxScore: 10 },
                      { id: 'strategy', label: 'Strategic Thinking', description: 'Pemikiran strategis', weight: 35, maxScore: 10 },
                      { id: 'decision', label: 'Decision Making', description: 'Pengambilan keputusan', weight: 25, maxScore: 10 }
                    ],
                    isDefault: false
                  };
                  try {
                    const created = createEvaluationTemplate(managerTemplate);
                    setTemplates([...templates, created]);
                    toast.success('Template Leadership Assessment dibuat');
                  } catch (error) {
                    toast.error('Gagal membuat template');
                  }
                }}
              >
                <div>
                  <h4 className="font-medium">Leadership Assessment</h4>
                  <p className="text-sm text-gray-600">Leadership, Strategy, Decision</p>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EvaluationTemplates;