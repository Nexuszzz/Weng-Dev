import React, { useEffect, useMemo, useState } from 'react';
import { Plus, Search, LayoutGrid, List, Filter, RefreshCw } from 'lucide-react';
import { loadProjects, upsertProject, deleteProject, PortfolioProject, reorderProjects, createEmptyProject, toggleProjectFeatured, initializeSampleData, loadSkills, upsertSkill, deleteSkill, UserSkill, aggregateSkillsFromProjects } from '@/lib/portfolio';
import ProjectCard from '../components/portfolio/ProjectCard';
import EditProjectDialog from '../components/portfolio/EditProjectDialog';
import SkillOverview from '../components/skills/SkillOverview';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';



const Portfolio: React.FC = () => {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [skills, setSkills] = useState<UserSkill[]>([]);
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState<'grid'|'list'>('grid');
  const [showDialog, setShowDialog] = useState(false);
  const [editing, setEditing] = useState<PortfolioProject | null>(null);
  const [techFilter, setTechFilter] = useState<string | null>(null);

  // Load from localStorage with fallback demo
  useEffect(()=>{
    try {
      const data = loadProjects();
      if (data.length === 0) {
        // Initialize with sample data first time (ESM import, no require)
        initializeSampleData();
        const sampleData = loadProjects();
        setProjects(sampleData.sort((a,b)=>(a.sortOrder??0)-(b.sortOrder??0)));
      } else {
        setProjects(data.sort((a,b)=>(a.sortOrder??0)-(b.sortOrder??0)));
      }
      
      // Load skills
      const skillData = loadSkills();
      setSkills(skillData);
    } catch (err) {
      console.error('Gagal memuat project portofolio:', err);
      toast.error('Gagal memuat data portofolio');
    }
  }, []);

  const allTech = useMemo(()=>{
    const set = new Set<string>();
    projects.forEach(p => p.tech.forEach(t=>set.add(t)));
    return Array.from(set).sort();
  }, [projects]);

  const filtered = projects.filter(p => {
    const term = search.toLowerCase();
    const matchesSearch = !term || p.title.toLowerCase().includes(term) || p.description.toLowerCase().includes(term) || p.tech.some(t=>t.toLowerCase().includes(term));
    const matchesTech = !techFilter || p.tech.includes(techFilter);
    return matchesSearch && matchesTech;
  });

  const handleSave = (proj: PortfolioProject) => {
    const isEditing = projects.some(p => p.id === proj.id);
    const updated = upsertProject(proj);
    setProjects(prev => {
      const exists = prev.some(p => p.id === updated.id);
      if (exists) return prev.map(p => p.id === updated.id ? updated : p);
      return [...prev, updated];
    });
    setShowDialog(false);
    setEditing(null);
    toast.success(isEditing ? 'Project berhasil diupdate' : 'Project baru berhasil ditambahkan');
  };

  const handleDelete = (proj: PortfolioProject) => {
    if (!confirm('Hapus project ini?')) return;
    deleteProject(proj.id);
    setProjects(prev => prev.filter(p => p.id !== proj.id));
    toast.success('Project berhasil dihapus');
  };

  const handleToggleFeatured = (proj: PortfolioProject) => {
    const updatedProject = toggleProjectFeatured(proj.id);
    if (updatedProject) {
      setProjects(prev => prev.map(p => p.id === proj.id ? updatedProject : p));
      toast.success(updatedProject.featured ? 'Project ditandai sebagai unggulan' : 'Project tidak lagi unggulan');
    }
  };

  // Skill handlers
  const handleAddSkill = (skill: UserSkill) => {
    try {
      const saved = upsertSkill(skill);
      setSkills(prev => [...prev.filter(s => s.id !== saved.id), saved]);
    } catch (err) {
      console.error('Gagal menambah skill:', err);
      toast.error('Gagal menambah skill');
    }
  };

  const handleEditSkill = (skill: UserSkill) => {
    try {
      const updated = upsertSkill(skill);
      setSkills(prev => prev.map(s => s.id === updated.id ? updated : s));
    } catch (err) {
      console.error('Gagal mengupdate skill:', err);
      toast.error('Gagal mengupdate skill');
    }
  };

  const handleDeleteSkill = (skill: UserSkill) => {
    try {
      deleteSkill(skill);
      setSkills(prev => prev.filter(s => s.id !== skill.id));
    } catch (err) {
      console.error('Gagal menghapus skill:', err);
      toast.error('Gagal menghapus skill');
    }
  };

  const handleAutoAggregate = () => {
    try {
      const aggregated = aggregateSkillsFromProjects(projects);
      // Merge with existing skills, keeping higher levels
      const merged = [...skills];
      aggregated.forEach(newSkill => {
        const existing = merged.find(s => s.name.toLowerCase() === newSkill.name.toLowerCase());
        if (existing) {
          if (newSkill.level > existing.level) {
            existing.level = newSkill.level;
            upsertSkill(existing);
          }
        } else {
          const saved = upsertSkill(newSkill);
          merged.push(saved);
        }
      });
      setSkills(merged);
    } catch (err) {
      console.error('Gagal auto-aggregate skills:', err);
      toast.error('Gagal auto-aggregate skills');
    }
  };

  const handleAdd = () => {
    setEditing(createEmptyProject());
    setShowDialog(true);
  };

  const handleEdit = (p: PortfolioProject) => {
    setEditing(p);
    setShowDialog(true);
  };

  const handleReorder = () => {
    // simple reorder: featured first then alphabetical
    const ordered = [...projects].sort((a,b)=>{
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return a.title.localeCompare(b.title);
    });
    const ids = ordered.map(p=>p.id);
    const updated = reorderProjects(projects, ids);
    setProjects(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Portofolio</h1>
          <p className="text-gray-600 dark:text-gray-300 text-sm">Kelola dan tampilkan project terbaik Anda untuk rekruter.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleReorder} title="Reorder otomatis">
            <RefreshCw size={16} className="mr-2"/> Susun Ulang
          </Button>
          <Button onClick={handleAdd}>
            <Plus size={16} className="mr-2"/> Tambah Project
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-4 flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
          <div className="flex items-center gap-2 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Cari project..." className="w-full pl-9 pr-3 py-2 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-600 text-sm" />
            </div>
            <div className="flex gap-1">
              <Button size="icon" variant={viewMode==='grid'? 'default':'outline'} onClick={()=>setViewMode('grid')}><LayoutGrid size={16} /></Button>
              <Button size="icon" variant={viewMode==='list'? 'default':'outline'} onClick={()=>setViewMode('list')}><List size={16} /></Button>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant={techFilter===null? 'default':'secondary'} className="cursor-pointer" onClick={()=>setTechFilter(null)}>Semua</Badge>
            {allTech.map(t => (
              <Badge key={t} variant={techFilter===t? 'default':'secondary'} className="cursor-pointer" onClick={()=>setTechFilter(t)}>{t}</Badge>
            ))}
            {allTech.length===0 && <span className="text-xs text-gray-500 flex items-center gap-1"><Filter size={12}/> Tidak ada tag</span>}
          </div>
        </CardContent>
      </Card>

      {filtered.length === 0 ? (
        <div className="text-center py-16 border-2 border-dashed rounded-xl">
          <p className="text-gray-500 mb-4">Belum ada project yang cocok.</p>
          <Button onClick={handleAdd}><Plus size={16} className="mr-2"/> Tambah Project Pertama</Button>
        </div>
      ) : viewMode==='grid' ? (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map(p => (
            <ProjectCard key={p.id} project={p} onEdit={handleEdit} onDelete={handleDelete} onToggleFeatured={handleToggleFeatured} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map(p => (
            <div key={p.id} className="p-4 rounded-lg border bg-white dark:bg-surface-dark flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <h3 className="font-semibold flex items-center gap-2">{p.title} {p.featured && <span className="inline-flex items-center gap-1 text-xs bg-yellow-200 text-yellow-800 px-2 py-0.5 rounded-md"><Plus size={10}/> Unggulan</span>}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 line-clamp-2">{p.description}</p>
                <div className="flex flex-wrap gap-1 mb-2">{p.tech.map(t=><Badge key={t} variant="secondary" className="text-xs">{t}</Badge>)}</div>
                {p.highlights.length>0 && <ul className="list-disc ml-5 text-xs text-gray-600 dark:text-gray-400 space-y-0.5">{p.highlights.slice(0,3).map((h,i)=><li key={i}>{h}</li>)}</ul>}
              </div>
              <div className="flex items-start gap-2">
                <Button size="sm" variant="outline" onClick={()=>handleEdit(p)}>Edit</Button>
                <Button size="sm" variant="outline" onClick={()=>handleToggleFeatured(p)}>{p.featured? 'Unfeature':'Feature'}</Button>
                <Button size="sm" variant="destructive" onClick={()=>handleDelete(p)}>Hapus</Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <EditProjectDialog open={showDialog} onClose={()=>{setShowDialog(false); setEditing(null);}} project={editing} onSave={handleSave} />
      
      {/* Skill Overview Section */}
      <div className="mt-12">
        <SkillOverview
          skills={skills}
          onAddSkill={handleAddSkill}
          onEditSkill={handleEditSkill}
          onDeleteSkill={handleDeleteSkill}
          onAutoAggregate={handleAutoAggregate}
        />
      </div>
    </div>
  );
};

export default Portfolio;