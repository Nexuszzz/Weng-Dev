import React from 'react';
import { Building2, Users, Briefcase, TrendingUp, Clock, Target, Calendar, Award, TrendingDown } from 'lucide-react';
import { getCompanyMetrics, getJobPosts, getJobApplications } from '@/lib/company/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ApplicationTrendChart from '@/company/components/charts/ApplicationTrendChart';
import StatusPieChart from '@/company/components/charts/StatusPieChart';
import DepartmentBarChart from '@/company/components/charts/DepartmentBarChart';

const CompanyOverview: React.FC = () => {
  const metrics = getCompanyMetrics();
  const recentJobs = getJobPosts().slice(0, 3);
  const recentApplications = getJobApplications().slice(0, 5);

  // Mock chart data
  const trendData = [
    { date: '1 Des', applications: 12, interviews: 5, hired: 2 },
    { date: '8 Des', applications: 18, interviews: 8, hired: 3 },
    { date: '15 Des', applications: 25, interviews: 12, hired: 5 },
    { date: '22 Des', applications: 30, interviews: 15, hired: 6 },
    { date: '29 Des', applications: 22, interviews: 10, hired: 4 },
    { date: '5 Jan', applications: 28, interviews: 14, hired: 7 },
    { date: '12 Jan', applications: 35, interviews: 18, hired: 8 },
  ];

  const statusData = [
    { name: 'Melamar', value: metrics.totalApplications * 0.4, color: '#3B82F6' },
    { name: 'Screening', value: metrics.totalApplications * 0.25, color: '#F59E0B' },
    { name: 'Interview', value: metrics.totalApplications * 0.2, color: '#8B5CF6' },
    { name: 'Penawaran', value: metrics.totalApplications * 0.1, color: '#10B981' },
    { name: 'Ditolak', value: metrics.totalApplications * 0.05, color: '#EF4444' },
  ];

  const departmentData = [
    { department: 'Engineering', activeJobs: 8, applications: 45 },
    { department: 'Design', activeJobs: 3, applications: 18 },
    { department: 'Marketing', activeJobs: 4, applications: 25 },
    { department: 'Sales', activeJobs: 5, applications: 32 },
    { department: 'HR', activeJobs: 2, applications: 12 },
  ];

  const StatCard: React.FC<{
    title: string;
    value: string | number;
    subtitle?: string;
    icon: React.ElementType;
    trend?: { value: number; isPositive: boolean };
  }> = ({ title, value, subtitle, icon: Icon, trend }) => (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
          </div>
          <div className="p-3 bg-blue-50 rounded-lg">
            <Icon className="w-6 h-6 text-blue-600" />
          </div>
        </div>
        {trend && (
          <div className="flex items-center mt-4">
            <TrendingUp className={`w-4 h-4 mr-1 ${trend.isPositive ? 'text-green-500' : 'text-red-500'}`} />
            <span className={`text-sm ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {trend.isPositive ? '+' : ''}{trend.value}%
            </span>
            <span className="text-sm text-gray-500 ml-1">dari minggu lalu</span>
          </div>
        )}
      </CardContent>
    </Card>
  );

  const getStageColor = (stage: string) => {
    const colors = {
      applied: 'bg-blue-100 text-blue-800',
      screening: 'bg-yellow-100 text-yellow-800',
      interview: 'bg-purple-100 text-purple-800',
      offer: 'bg-green-100 text-green-800',
      hired: 'bg-emerald-100 text-emerald-800',
      rejected: 'bg-red-100 text-red-800'
    };
    return colors[stage as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-600">Ringkasan aktivitas rekrutmen perusahaan Anda</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-blue-600">
            <Calendar className="w-3 h-3 mr-1" />
            {new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </Badge>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Lowongan"
          value={metrics.totalJobs}
          subtitle={`${metrics.activeJobs} aktif`}
          icon={Briefcase}
        />
        <StatCard
          title="Total Aplikasi"
          value={metrics.totalApplications}
          subtitle={`${metrics.newApplicationsThisWeek} minggu ini`}
          icon={Users}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Rata-rata Time to Hire"
          value={`${metrics.averageTimeToHire} hari`}
          icon={Clock}
        />
        <StatCard
          title="Conversion Rate"
          value={`${metrics.conversionRate}%`}
          subtitle="Applied to Hired"
          icon={Target}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Application Trend Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              Trend Aplikasi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ApplicationTrendChart data={trendData} />
          </CardContent>
        </Card>

        {/* Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-purple-600" />
              Status Rekrutmen
            </CardTitle>
          </CardHeader>
          <CardContent>
            <StatusPieChart data={statusData} />
          </CardContent>
        </Card>
      </div>

      {/* Department Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-emerald-600" />
            Performa per Departemen
          </CardTitle>
        </CardHeader>
        <CardContent>
          <DepartmentBarChart data={departmentData} />
        </CardContent>
      </Card>

      {/* Recent Jobs & Applications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Jobs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="w-5 h-5" />
              Lowongan Terbaru
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentJobs.map((job) => (
                <div key={job.id} className="flex items-start justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{job.title}</h3>
                    <p className="text-sm text-gray-600">{job.department}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <Badge variant={job.status === 'open' ? 'default' : 'secondary'}>
                        {job.status === 'open' ? 'Aktif' : job.status === 'draft' ? 'Draft' : 'Tutup'}
                      </Badge>
                      <span className="text-xs text-gray-500">{job.applicationCount} pelamar</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">{formatDate(job.createdAt)}</p>
                    {job.isUrgent && (
                      <Badge variant="destructive" className="mt-1 text-xs">Urgent</Badge>
                    )}
                  </div>
                </div>
              ))}
              {recentJobs.length === 0 && (
                <div className="text-center py-6 text-gray-500">
                  Belum ada lowongan yang dibuat
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Applications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Aplikasi Terbaru
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentApplications.map((application) => (
                <div key={application.id} className="flex items-start justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{application.candidateName}</h3>
                    <p className="text-sm text-gray-600">{application.candidateLocation}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge className={`text-xs ${getStageColor(application.stage)}`}>
                        {application.stage === 'applied' ? 'Melamar' :
                         application.stage === 'screening' ? 'Screening' :
                         application.stage === 'interview' ? 'Interview' :
                         application.stage === 'offer' ? 'Penawaran' :
                         application.stage === 'hired' ? 'Diterima' : 'Ditolak'}
                      </Badge>
                      {application.scoreOverall && (
                        <div className="flex items-center gap-1">
                          <Award className="w-3 h-3 text-yellow-500" />
                          <span className="text-xs text-gray-600">{application.scoreOverall}/10</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">{formatDate(application.appliedAt)}</p>
                  </div>
                </div>
              ))}
              {recentApplications.length === 0 && (
                <div className="text-center py-6 text-gray-500">
                  Belum ada aplikasi masuk
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Skills Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Skill Paling Dicari</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {metrics.topSkillsInDemand.slice(0, 10).map((skill, index) => (
              <div key={skill.skill} className="text-center p-3 border rounded-lg">
                <div className="text-lg font-bold text-blue-600">#{index + 1}</div>
                <div className="text-sm font-medium text-gray-900">{skill.skill}</div>
                <div className="text-xs text-gray-500">{skill.count} posisi</div>
              </div>
            ))}
          </div>
          {metrics.topSkillsInDemand.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Building2 className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p>Data skill akan muncul setelah ada lowongan</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CompanyOverview;