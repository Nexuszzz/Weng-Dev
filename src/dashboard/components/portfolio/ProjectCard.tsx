import React from 'react';
import { ExternalLink, Github, Star, Edit2, Trash2, Link2 } from 'lucide-react';
import { PortfolioProject } from '@/lib/portfolio';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface ProjectCardProps {
  project: PortfolioProject;
  onEdit: (project: PortfolioProject) => void;
  onDelete: (project: PortfolioProject) => void;
  onToggleFeatured: (project: PortfolioProject) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onEdit, onDelete, onToggleFeatured }) => {
  return (
    <Card className="group relative overflow-hidden border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
      {project.featured && (
        <div className="absolute top-3 right-3 bg-yellow-500 text-white text-xs font-semibold px-2 py-1 rounded-md flex items-center gap-1 z-10">
          <Star size={14} /> Unggulan
        </div>
      )}
      {project.coverImage && (
        <div className="h-40 w-full overflow-hidden relative">
          <img src={project.coverImage} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-2 left-3 flex flex-wrap gap-1">
            {project.tech.slice(0,4).map(t => (
              <span key={t} className="bg-white/80 backdrop-blur-sm text-gray-800 text-xs px-2 py-0.5 rounded-md">{t}</span>
            ))}
          </div>
        </div>
      )}
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          {project.title}
        </CardTitle>
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{project.description || 'Belum ada deskripsi.'}</p>
      </CardHeader>
      <CardContent className="space-y-3">
        {!project.coverImage && (
          <div className="flex flex-wrap gap-1">
            {project.tech.slice(0,5).map(t => (
              <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>
            ))}
          </div>
        )}
        {project.highlights.length > 0 && (
          <ul className="text-xs text-gray-600 dark:text-gray-400 list-disc ml-4 space-y-1">
            {project.highlights.slice(0,3).map((h,i)=>(<li key={i}>{h}</li>))}
          </ul>
        )}
        <div className="flex items-center justify-between pt-2">
          <div className="flex gap-2">
            {project.links?.demo && <a href={project.links.demo} target="_blank" rel="noopener" className="p-2 rounded-md bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition" title="Demo"><ExternalLink size={16} /></a>}
            {project.links?.repo && <a href={project.links.repo} target="_blank" rel="noopener" className="p-2 rounded-md bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition" title="Repository"><Github size={16} /></a>}
            {project.links?.design && <a href={project.links.design} target="_blank" rel="noopener" className="p-2 rounded-md bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition" title="Desain"><Link2 size={16} /></a>}
          </div>
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button size="sm" variant="ghost" onClick={()=>onEdit(project)} title="Edit"><Edit2 size={16} /></Button>
            <Button size="sm" variant="ghost" onClick={()=>onDelete(project)} title="Hapus" className="text-red-600 hover:text-red-700"><Trash2 size={16} /></Button>
            <Button size="sm" variant={project.featured? 'secondary':'outline'} onClick={()=>onToggleFeatured(project)} title="Toggle Featured"><Star size={16} className={project.featured? 'fill-yellow-400 text-yellow-500':'text-gray-500'} /></Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;