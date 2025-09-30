import React, { useState, useEffect } from 'react';
import { Shield, Mail, Crown, User, Plus, MoreVertical } from 'lucide-react';
import { getTeamMembers, addTeamMember } from '@/lib/company/data';
import { TeamMember } from '@/lib/company/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const TeamManagement: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteForm, setInviteForm] = useState({
    email: '',
    name: '',
    role: 'recruiter' as 'owner' | 'recruiter' | 'interviewer' | 'viewer'
  });

  useEffect(() => {
    setTeamMembers(getTeamMembers());
  }, []);

  const handleInviteMember = () => {
    if (!inviteForm.email || !inviteForm.name) {
      toast.error('Harap lengkapi email dan nama');
      return;
    }

    try {
      const newMember = addTeamMember({
        userId: `user-${Date.now()}`,
        name: inviteForm.name,
        email: inviteForm.email,
        role: inviteForm.role,
        permissions: getRolePermissions(inviteForm.role)
      });

      setTeamMembers([...teamMembers, newMember]);
      setInviteForm({ email: '', name: '', role: 'recruiter' });
      setShowInviteModal(false);
      toast.success('Undangan berhasil dikirim');
    } catch (error) {
      console.error('Error inviting member:', error);
      toast.error('Gagal mengirim undangan');
    }
  };

  const getRolePermissions = (role: string): string[] => {
    switch (role) {
      case 'admin':
        return ['jobs.read', 'jobs.write', 'applications.read', 'applications.write', 'candidates.read', 'team.manage', 'settings.write'];
      case 'recruiter':
        return ['jobs.read', 'jobs.write', 'applications.read', 'applications.write', 'candidates.read'];
      case 'interviewer':
        return ['applications.read', 'evaluations.read', 'evaluations.write'];
      default:
        return [];
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin': return 'Administrator';
      case 'recruiter': return 'Recruiter';
      case 'interviewer': return 'Interviewer';
      default: return role;
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return <Crown className="w-4 h-4" />;
      case 'recruiter': return <Shield className="w-4 h-4" />;
      case 'interviewer': return <User className="w-4 h-4" />;
      default: return <User className="w-4 h-4" />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-purple-100 text-purple-800';
      case 'recruiter': return 'bg-blue-100 text-blue-800';
      case 'interviewer': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Aktif';
      case 'pending': return 'Menunggu';
      case 'inactive': return 'Tidak Aktif';
      default: return status;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manajemen Tim</h1>
          <p className="text-gray-600">Kelola anggota tim dan hak akses</p>
        </div>
        <Button onClick={() => setShowInviteModal(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Undang Anggota Tim
        </Button>
      </div>

      {/* Team Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Crown className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{teamMembers.filter(m => m.role === 'owner').length}</p>
                <p className="text-sm text-gray-600">Administrator</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Shield className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{teamMembers.filter(m => m.role === 'recruiter').length}</p>
                <p className="text-sm text-gray-600">Recruiter</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <User className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{teamMembers.filter(m => m.role === 'interviewer').length}</p>
                <p className="text-sm text-gray-600">Interviewer</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Team Members List */}
      <Card>
        <CardHeader>
          <CardTitle>Anggota Tim</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {teamMembers.map(member => (
              <div key={member.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {member.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900">{member.name}</h3>
                    <p className="text-sm text-gray-600">{member.email}</p>
                  </div>

                  <div className="flex gap-2">
                    <Badge className={getRoleColor(member.role)}>
                      {getRoleIcon(member.role)}
                      <span className="ml-1">{getRoleLabel(member.role)}</span>
                    </Badge>
                    <Badge className={getStatusColor(member.status)}>
                      {getStatusLabel(member.status)}
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Bergabung:</p>
                    <p className="text-sm font-medium">{new Date(member.invitedAt).toLocaleDateString('id-ID')}</p>
                  </div>
                  
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}

            {teamMembers.length === 0 && (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">👥</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Belum Ada Anggota Tim</h3>
                <p className="text-gray-600 mb-4">Undang anggota tim pertama Anda untuk berkolaborasi</p>
                <Button onClick={() => setShowInviteModal(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Undang Anggota Pertama
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Role Permissions Reference */}
      <Card>
        <CardHeader>
          <CardTitle>Referensi Hak Akses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Crown className="w-5 h-5 text-purple-600" />
                <h4 className="font-semibold">Administrator</h4>
              </div>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>• Akses penuh ke semua fitur</li>
                <li>• Kelola tim dan pengaturan</li>
                <li>• Kelola lowongan dan aplikasi</li>
                <li>• Lihat semua kandidat</li>
              </ul>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <Shield className="w-5 h-5 text-blue-600" />
                <h4 className="font-semibold">Recruiter</h4>
              </div>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>• Kelola lowongan kerja</li>
                <li>• Lihat dan kelola aplikasi</li>
                <li>• Akses database kandidat</li>
                <li>• Tidak bisa kelola tim</li>
              </ul>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <User className="w-5 h-5 text-green-600" />
                <h4 className="font-semibold">Interviewer</h4>
              </div>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>• Lihat aplikasi yang ditugaskan</li>
                <li>• Buat evaluasi interview</li>
                <li>• Akses terbatas ke kandidat</li>
                <li>• Tidak bisa kelola lowongan</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Undang Anggota Tim</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  value={inviteForm.name}
                  onChange={(e) => setInviteForm({...inviteForm, name: e.target.value})}
                  placeholder="John Doe"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={inviteForm.email}
                  onChange={(e) => setInviteForm({...inviteForm, email: e.target.value})}
                  placeholder="john@example.com"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role
                </label>
                <select
                  value={inviteForm.role}
                  onChange={(e) => setInviteForm({...inviteForm, role: e.target.value as any})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="recruiter">Recruiter</option>
                  <option value="interviewer">Interviewer</option>
                  <option value="admin">Administrator</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button
                variant="outline"
                onClick={() => setShowInviteModal(false)}
                className="flex-1"
              >
                Batal
              </Button>
              <Button
                onClick={handleInviteMember}
                className="flex-1"
              >
                <Mail className="w-4 h-4 mr-2" />
                Kirim Undangan
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamManagement;