import React, { useEffect, useState } from 'react';
import { Upload, FileEdit, Download, CheckCircle2, AlertCircle } from 'lucide-react';

interface CVData {
  nama?: string;
  headline?: string;
  ringkasan?: string;
  email?: string;
  telepon?: string;
  pengalaman?: string;
  pendidikan?: string;
  keterampilan?: string;
  template?: string;
}

interface TemplateInfo { id: string; name: string; preview: string; }
const templates: TemplateInfo[] = [
  { id: 'modern', name: 'Modern', preview: 'https://images.pexels.com/photos/1181355/pexels-photo-1181355.jpeg?auto=compress&cs=tinysrgb&w=300&h=400' },
  { id: 'minimal', name: 'Minimal', preview: 'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=300&h=400' },
  { id: 'creative', name: 'Kreatif', preview: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=300&h=400' },
  { id: 'formal', name: 'Formal', preview: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=300&h=400' },
];

const AutoCV: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<'upload'|'edit'|'export'>('upload');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cvData, setCvData] = useState<CVData>({ template: 'modern' });
  const [toast, setToast] = useState<{ type: 'success'|'error'|'info'; message: string; visible: boolean }>({ type: 'info', message: '', visible: false });

  // Simulasi autosave sederhana
  useEffect(() => {
    if (currentStep === 'edit') {
      const id = setTimeout(() => {
        // Simulasi sukses menyimpan
        setToast({ type: 'success', message: 'Perubahan tersimpan otomatis', visible: true });
        setTimeout(() => setToast(t => ({ ...t, visible: false })), 1200);
      }, 1200);
      return () => clearTimeout(id);
    }
  }, [cvData, currentStep]);

  const goTo = (step: 'upload'|'edit'|'export', withLoading = false) => {
    if (withLoading) {
      setIsLoading(true);
      setTimeout(() => { setIsLoading(false); setCurrentStep(step); }, 600);
    } else {
      setCurrentStep(step);
    }
  };

  const onUploadMock = () => {
    // Simulasikan parsing data dari LinkedIn/Resume
    setIsLoading(true);
    setTimeout(() => {
      setCvData(prev => ({
        ...prev,
        nama: 'Alexandria Putri',
        headline: 'Product Designer | Menciptakan pengalaman yang bermakna',
        ringkasan: 'Desainer produk dengan 4+ tahun pengalaman pada fintech dan edtech, fokus pada riset dan desain sistem.',
        email: 'alex@example.com',
        telepon: '+62 812 3456 7890',
        pengalaman: '- Product Designer @ FinPay (2021 - Sekarang)\n- UI/UX Designer @ EduWave (2019 - 2021)',
        pendidikan: '- S.Kom, Informatika — Universitas Nusantara (2015 - 2019)',
        keterampilan: 'Figma, Design Systems, Prototyping, User Research'
      }));
      setIsLoading(false);
      setCurrentStep('edit');
    }, 900);
  };

  const handleDownload = () => {
    // Di versi penuh, ini akan men-generate PDF/PNG.
    setToast({ type: 'info', message: 'Fitur unduh akan diaktifkan di versi penuh', visible: true });
    setTimeout(() => setToast(t => ({ ...t, visible: false })), 1500);
  };

  return (
    <div className="min-h-[70vh]">
      {/* Stepper */}
      <div className="flex items-center justify-center gap-4 mb-6">
        {[
          { key: 'upload', label: 'Unggah' },
          { key: 'edit', label: 'Edit' },
          { key: 'export', label: 'Ekspor' },
        ].map((s, idx) => (
          <div key={s.key} className="flex items-center">
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${currentStep===s.key? 'bg-purple-600 text-white':'bg-gray-200 text-gray-700'}`}>
              {s.label}
            </div>
            {idx<2 && <div className="w-8 h-[2px] bg-gray-300 mx-2" />}
          </div>
        ))}
      </div>

      {/* Overlay Loading */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow">
            <div className="w-8 h-8 rounded-full border-4 border-purple-600 border-t-transparent animate-spin mx-auto mb-3" />
            <p className="text-gray-700 text-sm">Memproses...</p>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast.visible && (
        <div className={`fixed bottom-6 right-6 px-4 py-3 rounded-lg shadow text-white ${toast.type==='error'?'bg-red-600':toast.type==='success'?'bg-green-600':'bg-gray-900'}`}>
          {toast.message}
        </div>
      )}

      {/* Konten step */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        {currentStep === 'upload' && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Upload size={20} className="text-purple-600" />
              <h2 className="text-xl font-semibold text-gray-900">Unggah Data</h2>
            </div>
            <p className="text-gray-600 mb-4">Unggah resume atau impor data LinkedIn untuk membuat CV secara otomatis.</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button onClick={onUploadMock} className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg">Impor dari LinkedIn (Demo)</button>
              <button onClick={() => goTo('edit', true)} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-lg">Lewati & Mulai dari Kosong</button>
            </div>
          </div>
        )}

        {currentStep === 'edit' && (
          <div className="grid lg:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <FileEdit size={20} className="text-purple-600" />
              <h2 className="text-xl font-semibold text-gray-900">Edit CV</h2>
            </div>
            <p className="text-gray-600 mb-4">Lengkapi informasi berikut. Perubahan akan tersimpan otomatis.</p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nama</label>
                  <input value={cvData.nama || ''} onChange={e=>setCvData(d=>({...d, nama:e.target.value}))} className="w-full px-3 py-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Headline</label>
                  <input value={cvData.headline || ''} onChange={e=>setCvData(d=>({...d, headline:e.target.value}))} className="w-full px-3 py-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ringkasan</label>
                  <textarea value={cvData.ringkasan || ''} onChange={e=>setCvData(d=>({...d, ringkasan:e.target.value}))} className="w-full px-3 py-2 border rounded-lg min-h-[88px]" />
                </div>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input value={cvData.email || ''} onChange={e=>setCvData(d=>({...d, email:e.target.value}))} className="w-full px-3 py-2 border rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Telepon</label>
                    <input value={cvData.telepon || ''} onChange={e=>setCvData(d=>({...d, telepon:e.target.value}))} className="w-full px-3 py-2 border rounded-lg" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pengalaman</label>
                  <textarea value={cvData.pengalaman || ''} onChange={e=>setCvData(d=>({...d, pengalaman:e.target.value}))} className="w-full px-3 py-2 border rounded-lg min-h-[88px]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pendidikan</label>
                  <textarea value={cvData.pendidikan || ''} onChange={e=>setCvData(d=>({...d, pendidikan:e.target.value}))} className="w-full px-3 py-2 border rounded-lg min-h-[88px]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Keterampilan</label>
                  <input value={cvData.keterampilan || ''} onChange={e=>setCvData(d=>({...d, keterampilan:e.target.value}))} className="w-full px-3 py-2 border rounded-lg" />
                </div>
              </div>
            </div>
            </div>
            {/* Template selector */}
            <div className="lg:col-span-1 space-y-3">
              <h3 className="text-sm font-semibold text-gray-700 mb-1">Pilih Template</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {templates.map((tpl)=>(
                  <button key={tpl.id} onClick={()=>setCvData(d=>({...d, template: tpl.id}))} className={`border-2 rounded-lg overflow-hidden group ${cvData.template===tpl.id?'border-purple-600 ring-2 ring-purple-200':'border-transparent hover:border-gray-300'}`}>
                    <img src={tpl.preview} alt={tpl.name} className="w-full h-24 object-cover" />
                    <div className="text-xs py-1 bg-gray-50 text-gray-700 font-medium">{tpl.name}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-between mt-6 lg:col-span-3">
              <button onClick={()=>goTo('upload')} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg">Kembali</button>
              <button onClick={()=>goTo('export', true)} className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg">Lanjut ke Ekspor</button>
            </div>
          </div>
        )}

        {currentStep === 'export' && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 size={20} className="text-green-600" />
              <h2 className="text-xl font-semibold text-gray-900">Ekspor</h2>
            </div>
            <p className="text-gray-600 mb-4">Pratinjau CV Anda, lalu unduh.</p>

            <div className="bg-gray-50 border border-dashed border-gray-300 rounded-lg p-4 mb-4">
              <div className="text-sm text-gray-700 font-medium mb-2">Pratinjau</div>
              <div className="bg-white border rounded-lg p-4">
                <div className="text-lg font-semibold text-gray-900">{cvData.nama || 'Nama Anda'}</div>
                <div className="text-purple-700 font-medium">{cvData.headline || 'Headline profesional'}</div>
                <div className="mt-3 text-gray-700 whitespace-pre-wrap">{cvData.ringkasan || 'Ringkasan singkat Anda akan tampil di sini.'}</div>
                <div className="mt-4 grid sm:grid-cols-2 gap-4 text-sm text-gray-700">
                  <div>
                    <div className="font-semibold mb-1">Kontak</div>
                    <div>Email: {cvData.email || '-'}</div>
                    <div>Telepon: {cvData.telepon || '-'}</div>
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Keterampilan</div>
                    <div>{cvData.keterampilan || '-'}</div>
                  </div>
                </div>
                <div className="mt-4 grid sm:grid-cols-2 gap-4 text-sm text-gray-700">
                  <div>
                    <div className="font-semibold mb-1">Pengalaman</div>
                    <div className="whitespace-pre-wrap">{cvData.pengalaman || '-'}</div>
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Pendidikan</div>
                    <div className="whitespace-pre-wrap">{cvData.pendidikan || '-'}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <button onClick={()=>goTo('edit')} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg">Kembali ke Edit</button>
              <button onClick={handleDownload} className="px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-lg flex items-center gap-2"><Download size={18}/> Unduh PDF</button>
            </div>
          </div>
        )}

        {error && (
          <div className="mt-6 flex items-center gap-2 text-red-600"><AlertCircle size={18}/> {error}</div>
        )}
      </div>
    </div>
  );
};

export default AutoCV;