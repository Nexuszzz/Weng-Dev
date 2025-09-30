import React, { useState, useEffect } from 'react';
import { Plus, FileText, Clock, CheckCircle, DollarSign, Calendar, User } from 'lucide-react';
import { getEscrowContracts, createEscrowContract } from '@/lib/company/data';
import { EscrowContract } from '@/lib/company/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const CompanyContracts: React.FC = () => {
  const [contracts, setContracts] = useState<EscrowContract[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createForm, setCreateForm] = useState({
    candidateName: '',
    candidateEmail: '',
    jobTitle: '',
    salary: '',
    duration: '',
    startDate: '',
    terms: ''
  });

  useEffect(() => {
    setContracts(getEscrowContracts());
  }, []);

  const handleCreateContract = () => {
    if (!createForm.candidateName || !createForm.salary || !createForm.jobTitle) {
      toast.error('Harap lengkapi field yang wajib');
      return;
    }

    try {
      const newContract = createEscrowContract({
        candidateId: `cand-${Date.now()}`,
        candidateName: createForm.candidateName,
        candidateEmail: createForm.candidateEmail,
        jobTitle: createForm.jobTitle,
        jobId: `job-${Date.now()}`,
        amount: parseFloat(createForm.salary),
        currency: 'IDR',
        duration: parseInt(createForm.duration) || 12,
        startDate: createForm.startDate,
        endDate: calculateEndDate(createForm.startDate, parseInt(createForm.duration) || 12),
        terms: createForm.terms,
        milestones: createDefaultMilestones(),
        status: 'draft'
      });

      setContracts([...contracts, newContract]);
      setCreateForm({
        candidateName: '',
        candidateEmail: '',
        jobTitle: '',
        salary: '',
        duration: '',
        startDate: '',
        terms: ''
      });
      setShowCreateModal(false);
      toast.success('Kontrak berhasil dibuat');
    } catch (error) {
      console.error('Error creating contract:', error);
      toast.error('Gagal membuat kontrak');
    }
  };

  const calculateEndDate = (startDate: string, durationMonths: number): string => {
    if (!startDate) return '';
    const date = new Date(startDate);
    date.setMonth(date.getMonth() + durationMonths);
    return date.toISOString().split('T')[0];
  };

  const createDefaultMilestones = () => [
    {
      id: 'm1',
      title: 'Onboarding Complete',
      description: 'Menyelesaikan proses onboarding',
      amount: 25,
      status: 'pending' as const,
      dueDate: ''
    },
    {
      id: 'm2',
      title: '3 Month Review',
      description: 'Evaluasi 3 bulan pertama',
      amount: 25,
      status: 'pending' as const,
      dueDate: ''
    },
    {
      id: 'm3',
      title: '6 Month Review',
      description: 'Evaluasi 6 bulan',
      amount: 25,
      status: 'pending' as const,
      dueDate: ''
    },
    {
      id: 'm4',
      title: 'Project Completion',
      description: 'Penyelesaian proyek utama',
      amount: 25,
      status: 'pending' as const,
      dueDate: ''
    }
  ];

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'draft': return 'Draft';
      case 'pending': return 'Menunggu Persetujuan';
      case 'active': return 'Aktif';
      case 'completed': return 'Selesai';
      case 'cancelled': return 'Dibatalkan';
      default: return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Kontrak Escrow</h1>
          <p className="text-gray-600">Kelola kontrak pembayaran aman dengan kandidat</p>
        </div>
        <Button onClick={() => setShowCreateModal(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Buat Kontrak Baru
        </Button>
      </div>

      {/* Contract Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{contracts.length}</p>
                <p className="text-sm text-gray-600">Total Kontrak</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{contracts.filter(c => c.status === 'active').length}</p>
                <p className="text-sm text-gray-600">Aktif</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{contracts.filter(c => c.status === 'pending').length}</p>
                <p className="text-sm text-gray-600">Menunggu</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <DollarSign className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {contracts.reduce((sum, c) => sum + c.amount, 0).toLocaleString('id-ID')}
                </p>
                <p className="text-sm text-gray-600">Total Nilai (K)</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contracts List */}
      <div className="space-y-4">
        {contracts.map(contract => (
          <Card key={contract.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{contract.candidateName}</h3>
                    <Badge className={getStatusColor(contract.status)}>
                      {getStatusLabel(contract.status)}
                    </Badge>
                  </div>
                  
                  <p className="text-gray-600 font-medium mb-2">{contract.jobTitle}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      <span>Rp {contract.amount.toLocaleString('id-ID')}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{contract.duration} bulan</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>{contract.candidateEmail}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-sm text-gray-500">Dibuat:</p>
                  <p className="text-sm font-medium">{new Date(contract.createdAt).toLocaleDateString('id-ID')}</p>
                </div>
              </div>

              {/* Milestones Progress */}
              <div className="border-t pt-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-sm">Milestone Progress</h4>
                  <span className="text-xs text-gray-500">
                    {contract.milestones.filter(m => m.status === 'completed').length} / {contract.milestones.length} selesai
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                  {contract.milestones.map(milestone => (
                    <div key={milestone.id} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                      <div className={`w-2 h-2 rounded-full ${
                        milestone.status === 'completed' ? 'bg-green-500' : 
                        milestone.status === 'in_progress' ? 'bg-yellow-500' : 'bg-gray-300'
                      }`}></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium truncate">{milestone.title}</p>
                        <p className="text-xs text-gray-500">{milestone.amount}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 mt-4 pt-4 border-t">
                <Button variant="outline" size="sm">
                  <FileText className="w-4 h-4 mr-1" />
                  Lihat Detail
                </Button>
                {contract.status === 'draft' && (
                  <Button size="sm">
                    Kirim untuk Persetujuan
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Empty State */}
        {contracts.length === 0 && (
          <Card>
            <CardContent className="p-12">
              <div className="text-center">
                <div className="text-4xl mb-4">💼</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Belum Ada Kontrak</h3>
                <p className="text-gray-600 mb-4">
                  Buat kontrak escrow pertama Anda untuk mengamankan pembayaran dengan kandidat
                </p>
                <Button onClick={() => setShowCreateModal(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Buat Kontrak Pertama
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Create Contract Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">Buat Kontrak Escrow Baru</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Kandidat *
                </label>
                <input
                  type="text"
                  value={createForm.candidateName}
                  onChange={(e) => setCreateForm({...createForm, candidateName: e.target.value})}
                  placeholder="John Doe"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Kandidat
                </label>
                <input
                  type="email"
                  value={createForm.candidateEmail}
                  onChange={(e) => setCreateForm({...createForm, candidateEmail: e.target.value})}
                  placeholder="john@example.com"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Posisi Pekerjaan *
                </label>
                <input
                  type="text"
                  value={createForm.jobTitle}
                  onChange={(e) => setCreateForm({...createForm, jobTitle: e.target.value})}
                  placeholder="Senior Frontend Developer"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gaji (Rupiah) *
                </label>
                <input
                  type="number"
                  value={createForm.salary}
                  onChange={(e) => setCreateForm({...createForm, salary: e.target.value})}
                  placeholder="20000000"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Durasi (Bulan)
                </label>
                <input
                  type="number"
                  value={createForm.duration}
                  onChange={(e) => setCreateForm({...createForm, duration: e.target.value})}
                  placeholder="12"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tanggal Mulai
                </label>
                <input
                  type="date"
                  value={createForm.startDate}
                  onChange={(e) => setCreateForm({...createForm, startDate: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Syarat dan Ketentuan
              </label>
              <textarea
                value={createForm.terms}
                onChange={(e) => setCreateForm({...createForm, terms: e.target.value})}
                placeholder="Masukkan syarat dan ketentuan kontrak..."
                rows={4}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex gap-3 mt-6">
              <Button
                variant="outline"
                onClick={() => setShowCreateModal(false)}
                className="flex-1"
              >
                Batal
              </Button>
              <Button
                onClick={handleCreateContract}
                className="flex-1"
              >
                <Plus className="w-4 h-4 mr-2" />
                Buat Kontrak
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyContracts;