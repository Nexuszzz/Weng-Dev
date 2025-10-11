import React, { useState } from 'react';
import { SortAsc, Grid, List, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { MapPin, Clock, DollarSign, Building2, Search, Filter } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

// Mock data for internships
const mockInternships = [
  {
    id: '1',
    company: {
      name: 'TechCorp Indonesia',
      logo: '/api/placeholder/60/60',
      location: 'Jakarta Selatan'
    },
    position: 'Frontend Developer Intern',
    duration: '6 bulan',
    salary: 'Rp 3.500.000',
    isPaid: true,
    description: 'Bergabunglah dengan tim developer kami untuk mengembangkan aplikasi web modern menggunakan React, TypeScript, dan teknologi frontend terdepan.',
    tags: ['React', 'TypeScript', 'UI/UX', 'Fulltime'],
    postedDate: '2 hari lalu',
    isBookmarked: false
  },
  {
    id: '2',
    company: {
      name: 'MarketPro Agency',
      logo: '/api/placeholder/60/60',
      location: 'Bandung'
    },
    position: 'Digital Marketing Intern',
    duration: '4 bulan',
    salary: 'Rp 2.800.000',
    isPaid: true,
    description: 'Pelajari strategi digital marketing modern, social media management, dan campaign optimization dari tim marketing berpengalaman.',
    tags: ['Social Media', 'SEO', 'Content Marketing', 'Analytics'],
    postedDate: '1 hari lalu',
    isBookmarked: true
  },
  {
    id: '3',
    company: {
      name: 'FinanceHub',
      logo: '/api/placeholder/60/60',
      location: 'Jakarta Pusat'
    },
    position: 'Financial Analyst Intern',
    duration: '3 bulan',
    isPaid: false,
    description: 'Dapatkan pengalaman dalam analisis keuangan, pemodelan finansial, dan penelitian investasi di industri fintech terdepan.',
    tags: ['Excel', 'Financial Modeling', 'Analysis', 'Research'],
    postedDate: '3 hari lalu',
    isBookmarked: false
  },
  {
    id: '4',
    company: {
      name: 'DesignStudio Creative',
      logo: '/api/placeholder/60/60',
      location: 'Yogyakarta'
    },
    position: 'UI/UX Designer Intern',
    duration: '5 bulan',
    salary: 'Rp 3.000.000',
    isPaid: true,
    description: 'Belajar design thinking, user research, prototyping, dan visual design untuk menciptakan pengalaman pengguna yang luar biasa.',
    tags: ['Figma', 'User Research', 'Prototyping', 'Design Systems'],
    postedDate: '1 minggu lalu',
    isBookmarked: false
  },
  {
    id: '5',
    company: {
      name: 'DataCorp Analytics',
      logo: '/api/placeholder/60/60',
      location: 'Surabaya'
    },
    position: 'Data Science Intern',
    duration: '6 bulan',
    salary: 'Rp 4.000.000',
    isPaid: true,
    description: 'Terlibat dalam proyek machine learning, data visualization, dan analisis big data untuk memberikan insights bisnis yang valuable.',
    tags: ['Python', 'Machine Learning', 'SQL', 'Tableau'],
    postedDate: '4 hari lalu',
    isBookmarked: true
  }
];

interface InternshipCardProps {
  id: string;
  company: {
    name: string;
    logo?: string;
    location: string;
  };
  position: string;
  duration: string;
  salary?: string;
  isPaid: boolean;
  description: string;
  tags: string[];
  postedDate: string;
  isBookmarked?: boolean;
  onApply: (id: string) => void;
  onBookmark: (id: string) => void;
}

const InternshipCard: React.FC<InternshipCardProps> = ({
  id,
  company,
  position,
  duration,
  salary,
  isPaid,
  description,
  tags,
  postedDate,
  isBookmarked = false,
  onApply,
  onBookmark,
}) => {
  return (
    <Card className="transition-all duration-300 hover:shadow-lg">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start space-x-4">
            <Avatar className="w-12 h-12">
              <AvatarImage src={company.logo} alt={company.name} />
              <AvatarFallback className="bg-primary text-primary-foreground">
                <Building2 className="w-6 h-6" />
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-foreground hover:text-primary cursor-pointer transition-colors">
                {position}
              </h3>
              <p className="text-muted-foreground font-medium">{company.name}</p>
              <div className="flex items-center text-sm text-muted-foreground mt-1">
                <MapPin className="w-4 h-4 mr-1" />
                {company.location}
              </div>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onBookmark(id)}
            className={isBookmarked ? 'text-yellow-500' : 'text-muted-foreground'}
          >
            <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
          </Button>
        </div>

        {/* Info Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <Badge variant="secondary" className="flex items-center">
            <Clock className="w-3 h-3 mr-1" />
            {duration}
          </Badge>
          
          {isPaid && salary && (
            <Badge variant="outline" className="flex items-center text-green-600">
              <DollarSign className="w-3 h-3 mr-1" />
              {salary}
            </Badge>
          )}
          
          {!isPaid && (
            <Badge variant="outline" className="text-orange-600">
              Unpaid
            </Badge>
          )}
          
          <Badge variant="outline" className="text-xs text-muted-foreground">
            {postedDate}
          </Badge>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <Button
            onClick={() => onApply(id)}
            className="bg-primary hover:bg-primary/90"
          >
            Apply Now
          </Button>
          
          <Button variant="outline" size="sm">
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const ApprenticeshipTracker: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showBookmarked, setShowBookmarked] = useState(false);
  const [internships, setInternships] = useState(mockInternships);
  const { toast } = useToast();

  const handleApply = (id: string) => {
    toast({
      title: "Application Submitted!",
      description: "Your application has been submitted successfully.",
    });
  };

  const handleBookmark = (id: string) => {
    setInternships(prev => 
      prev.map(internship => 
        internship.id === id 
          ? { ...internship, isBookmarked: !internship.isBookmarked }
          : internship
      )
    );
    
    const internship = internships.find(i => i.id === id);
    toast({
      title: internship?.isBookmarked ? "Bookmark Removed" : "Bookmark Added",
      description: internship?.isBookmarked 
        ? "Internship removed from bookmarks" 
        : "Internship added to bookmarks",
    });
  };

  const filteredInternships = internships.filter(internship => {
    const matchesSearch = internship.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         internship.company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         internship.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesBookmark = showBookmarked ? internship.isBookmarked : true;
    
    return matchesSearch && matchesBookmark;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Apprenticeship Tracker</h1>
              <p className="text-gray-600 mt-1">Find and track your internship applications</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search internships, companies, or skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            {/* Filters */}
            <div className="flex gap-2">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="salary-high">Highest Salary</SelectItem>
                  <SelectItem value="salary-low">Lowest Salary</SelectItem>
                </SelectContent>
              </Select>
              
              <Button
                variant={showBookmarked ? "default" : "outline"}
                onClick={() => setShowBookmarked(!showBookmarked)}
                className="flex items-center gap-2"
              >
                <Bookmark className="w-4 h-4" />
                Bookmarked
              </Button>
              
              <div className="flex border rounded-md">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-r-none"
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-l-none"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-4">
          <p className="text-gray-600">
            Showing {filteredInternships.length} internship{filteredInternships.length !== 1 ? 's' : ''}
            {showBookmarked && ' (bookmarked only)'}
          </p>
        </div>

        {/* Internship Grid */}
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
            : 'grid-cols-1'
        }`}>
          {filteredInternships.map((internship) => (
            <InternshipCard
              key={internship.id}
              {...internship}
              onApply={handleApply}
              onBookmark={handleBookmark}
            />
          ))}
        </div>

        {filteredInternships.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No internships found</h3>
            <p className="text-gray-600">
              {showBookmarked 
                ? "You haven't bookmarked any internships yet." 
                : "Try adjusting your search terms or filters."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApprenticeshipTracker;