import React from 'react';
import { Clock, CheckCircle, XCircle, AlertCircle, Calendar, Building2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';

interface Application {
  id: string;
  company: {
    name: string;
    logo?: string;
  };
  position: string;
  appliedDate: string;
  status: 'pending' | 'interview' | 'accepted' | 'rejected';
  progress: number;
  nextStep?: string;
  interviewDate?: string;
}

const applications: Application[] = [
  {
    id: '1',
    company: { name: 'TechCorp', logo: '/api/placeholder/40/40' },
    position: 'Frontend Developer Intern',
    appliedDate: '2024-01-15',
    status: 'interview',
    progress: 75,
    nextStep: 'Technical Interview',
    interviewDate: '2024-01-20',
  },
  {
    id: '2',
    company: { name: 'DesignStudio', logo: '/api/placeholder/40/40' },
    position: 'UI/UX Design Intern',
    appliedDate: '2024-01-12',
    status: 'pending',
    progress: 25,
    nextStep: 'CV Review',
  },
  {
    id: '3',
    company: { name: 'MarketPro', logo: '/api/placeholder/40/40' },
    position: 'Digital Marketing Intern',
    appliedDate: '2024-01-10',
    status: 'accepted',
    progress: 100,
  },
  {
    id: '4',
    company: { name: 'DataCorp', logo: '/api/placeholder/40/40' },
    position: 'Data Science Intern',
    appliedDate: '2024-01-08',
    status: 'rejected',
    progress: 50,
  },
];

const getStatusIcon = (status: Application['status']) => {
  switch (status) {
    case 'pending':
      return <Clock className="w-4 h-4" />;
    case 'interview':
      return <AlertCircle className="w-4 h-4" />;
    case 'accepted':
      return <CheckCircle className="w-4 h-4" />;
    case 'rejected':
      return <XCircle className="w-4 h-4" />;
    default:
      return <Clock className="w-4 h-4" />;
  }
};

const getStatusColor = (status: Application['status']) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'interview':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'accepted':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'rejected':
      return 'bg-red-100 text-red-800 border-red-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getProgressColor = (status: Application['status']) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-500';
    case 'interview':
      return 'bg-blue-500';
    case 'accepted':
      return 'bg-green-500';
    case 'rejected':
      return 'bg-red-500';
    default:
      return 'bg-gray-500';
  }
};

const ApplicationTracker: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Application Tracker</h1>
              <p className="text-gray-600 mt-1">Track your internship application progress</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Applications</p>
                  <p className="text-2xl font-bold text-gray-900">{applications.length}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <Building2 className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {applications.filter(app => app.status === 'pending').length}
                  </p>
                </div>
                <div className="p-3 bg-yellow-100 rounded-full">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Interviews</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {applications.filter(app => app.status === 'interview').length}
                  </p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <AlertCircle className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Accepted</p>
                  <p className="text-2xl font-bold text-green-600">
                    {applications.filter(app => app.status === 'accepted').length}
                  </p>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Applications List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Applications</h2>
          
          {applications.map((application) => (
            <Card key={application.id} className="transition-all duration-300 hover:shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={application.company.logo} alt={application.company.name} />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        <Building2 className="w-6 h-6" />
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {application.position}
                          </h3>
                          <p className="text-gray-600 font-medium">{application.company.name}</p>
                          <p className="text-sm text-gray-500 mt-1">
                            Applied on {new Date(application.appliedDate).toLocaleDateString()}
                          </p>
                        </div>
                        
                        <Badge className={`${getStatusColor(application.status)} border`}>
                          <span className="flex items-center gap-1">
                            {getStatusIcon(application.status)}
                            {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                          </span>
                        </Badge>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="mt-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">Progress</span>
                          <span className="text-sm text-gray-500">{application.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(application.status)}`}
                            style={{ width: `${application.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      {/* Next Step */}
                      {application.nextStep && (
                        <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm font-medium text-gray-700">Next Step:</p>
                          <p className="text-sm text-gray-600">{application.nextStep}</p>
                          {application.interviewDate && (
                            <div className="flex items-center mt-2 text-sm text-blue-600">
                              <Calendar className="w-4 h-4 mr-1" />
                              Interview scheduled for {new Date(application.interviewDate).toLocaleDateString()}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2 ml-4">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    {application.status === 'interview' && (
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        Prepare Interview
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {applications.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Building2 className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No applications yet</h3>
            <p className="text-gray-600 mb-4">
              Start applying to internships to track your progress here.
            </p>
            <Button className="bg-primary hover:bg-primary/90">
              Browse Internships
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicationTracker;