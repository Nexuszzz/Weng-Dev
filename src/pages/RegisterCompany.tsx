import React, { useState, useRef } from 'react';
import { 
  Mail, Lock, Loader2, ArrowLeft, ArrowRight, 
  Building2, MapPin, Globe, Users, Briefcase,
  Eye, EyeOff, AlertCircle, Check, FileText, Phone
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useUser } from '@/context/UserContext';

const RegisterCompany: React.FC = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { mockCompanyLogin } = useUser();

  // Step 1: Company Info
  const [companyName, setCompanyName] = useState('');
  const [industry, setIndustry] = useState('');
  const [companySize, setCompanySize] = useState('');

  // Step 2: Contact & Location
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [website, setWebsite] = useState('');

  // Step 3: Description
  const [description, setDescription] = useState('');

  // Validation states
  const [emailError, setEmailError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Parallax setup
  const containerRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 100, damping: 20, mass: 0.5 });
  const sy = useSpring(my, { stiffness: 100, damping: 20, mass: 0.5 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mx.set(x / 20);
    my.set(y / 20);
  };

  const handleMouseLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const validateEmail = (val: string) => {
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
    setEmailError(val && !ok ? 'Format email tidak valid' : null);
  };

  const validateStep1 = () => {
    return companyName.trim() !== '' && industry !== '' && companySize !== '';
  };

  const validateStep2 = () => {
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const passwordOk = password.length >= 8;
    const passwordMatch = password === confirmPassword;
    return emailOk && passwordOk && passwordMatch && phone.trim() !== '' && address.trim() !== '';
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      mockCompanyLogin();
      setLoading(false);
      navigate('/company');
    }, 1500);
  };

  const industries = [
    'Teknologi & IT',
    'Keuangan & Perbankan',
    'E-Commerce & Retail',
    'Kesehatan',
    'Pendidikan',
    'Manufaktur',
    'Konstruksi',
    'Media & Hiburan',
    'Pariwisata & Hospitality',
    'Lainnya'
  ];

  const companySizes = [
    '1-10 karyawan',
    '11-50 karyawan',
    '51-200 karyawan',
    '201-500 karyawan',
    '501-1000 karyawan',
    '1000+ karyawan'
  ];

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 text-white flex items-center justify-center p-6"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          style={{ x: sx, y: sy }}
          className="absolute -top-10 -left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"
        />
        <motion.div
          style={{ x: sx, y: sy }}
          className="absolute -bottom-10 -right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"
        />
      </div>

      <motion.div 
        className="w-full max-w-2xl relative" 
        initial={{ opacity: 0, y: 16 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.35 }}
      >
        <Link to="/" className="inline-flex items-center text-sm text-gray-300 hover:text-white transition-colors mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" /> Kembali ke Beranda
        </Link>

        <div className="bg-gray-900/70 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 p-8 hover:shadow-blue-500/10 transition-shadow">
          <div className="text-center mb-8">
            <div className="mx-auto w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg mb-4 animate-pulse">
              <Building2 className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-bold">Daftar Perusahaan</h1>
            <p className="text-gray-400 mt-1">Mulai merekrut talenta terbaik</p>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-8">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center flex-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                  step >= s 
                    ? 'bg-blue-600 border-blue-600 text-white' 
                    : 'border-gray-600 text-gray-600'
                }`}>
                  {step > s ? <Check className="w-5 h-5" /> : s}
                </div>
                {s < 3 && (
                  <div className={`flex-1 h-1 mx-2 rounded transition-all ${
                    step > s ? 'bg-blue-600' : 'bg-gray-700'
                  }`} />
                )}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Step 1: Company Info */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <h2 className="text-lg font-semibold mb-4">Informasi Perusahaan</h2>
                
                <div>
                  <label className="block text-sm mb-1">Nama Perusahaan *</label>
                  <div className="relative">
                    <Building2 className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      className="w-full pl-10 pr-3 py-3 rounded-lg bg-gray-800/80 border border-white/10 focus:border-blue-500 outline-none transition-all"
                      placeholder="PT. Nama Perusahaan"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm mb-1">Industri *</label>
                  <div className="relative">
                    <Briefcase className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <select
                      required
                      className="w-full pl-10 pr-3 py-3 rounded-lg bg-gray-800/80 border border-white/10 focus:border-blue-500 outline-none transition-all appearance-none"
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                    >
                      <option value="">Pilih Industri</option>
                      {industries.map((ind) => (
                        <option key={ind} value={ind}>{ind}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm mb-1">Ukuran Perusahaan *</label>
                  <div className="relative">
                    <Users className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <select
                      required
                      className="w-full pl-10 pr-3 py-3 rounded-lg bg-gray-800/80 border border-white/10 focus:border-blue-500 outline-none transition-all appearance-none"
                      value={companySize}
                      onChange={(e) => setCompanySize(e.target.value)}
                    >
                      <option value="">Pilih Ukuran</option>
                      {companySizes.map((size) => (
                        <option key={size} value={size}>{size}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Contact & Location */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <h2 className="text-lg font-semibold mb-4">Kontak & Lokasi</h2>
                
                <div>
                  <label className="block text-sm mb-1">Email Perusahaan *</label>
                  <div className="relative">
                    <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      className={`w-full pl-10 pr-3 py-3 rounded-lg bg-gray-800/80 border ${
                        emailError ? 'border-red-500/70' : 'border-white/10'
                      } focus:border-blue-500 outline-none transition-all`}
                      placeholder="hr@perusahaan.com"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); validateEmail(e.target.value); }}
                    />
                  </div>
                  {emailError && (
                    <div className="flex items-center text-red-400 text-xs mt-1 gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {emailError}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm mb-1">Password *</label>
                    <div className="relative">
                      <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        className="w-full pl-10 pr-11 py-3 rounded-lg bg-gray-800/80 border border-white/10 focus:border-blue-500 outline-none transition-all"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {password && password.length < 8 && (
                      <div className="flex items-center text-yellow-400 text-xs mt-1 gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> Minimal 8 karakter
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm mb-1">Konfirmasi Password *</label>
                    <div className="relative">
                      <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        required
                        className="w-full pl-10 pr-11 py-3 rounded-lg bg-gray-800/80 border border-white/10 focus:border-blue-500 outline-none transition-all"
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                </div>

                {password && confirmPassword && password !== confirmPassword && (
                  <div className="flex items-center text-red-400 text-xs gap-1">
                    <AlertCircle className="w-3.5 h-3.5" /> Password tidak cocok
                  </div>
                )}

                <div>
                  <label className="block text-sm mb-1">Nomor Telepon *</label>
                  <div className="relative">
                    <Phone className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      className="w-full pl-10 pr-3 py-3 rounded-lg bg-gray-800/80 border border-white/10 focus:border-blue-500 outline-none transition-all"
                      placeholder="+62 812-3456-7890"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm mb-1">Alamat Kantor *</label>
                  <div className="relative">
                    <MapPin className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                    <textarea
                      required
                      className="w-full pl-10 pr-3 py-3 rounded-lg bg-gray-800/80 border border-white/10 focus:border-blue-500 outline-none transition-all"
                      placeholder="Jl. Contoh No. 123, Jakarta"
                      rows={2}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm mb-1">Website (Opsional)</label>
                  <div className="relative">
                    <Globe className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="url"
                      className="w-full pl-10 pr-3 py-3 rounded-lg bg-gray-800/80 border border-white/10 focus:border-blue-500 outline-none transition-all"
                      placeholder="https://perusahaan.com"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Description */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <h2 className="text-lg font-semibold mb-4">Tentang Perusahaan</h2>
                
                <div>
                  <label className="block text-sm mb-1">Deskripsi Perusahaan *</label>
                  <div className="relative">
                    <FileText className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                    <textarea
                      required
                      className="w-full pl-10 pr-3 py-3 rounded-lg bg-gray-800/80 border border-white/10 focus:border-blue-500 outline-none transition-all"
                      placeholder="Ceritakan tentang perusahaan Anda, visi, misi, dan budaya kerja..."
                      rows={6}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    {description.length}/50 karakter (minimal 50)
                  </p>
                </div>

                {/* Summary */}
                <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 mt-6">
                  <h3 className="text-sm font-semibold mb-3 text-blue-300">Ringkasan Pendaftaran</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Nama Perusahaan:</span>
                      <span className="font-medium">{companyName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Industri:</span>
                      <span className="font-medium">{industry}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Ukuran:</span>
                      <span className="font-medium">{companySize}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Email:</span>
                      <span className="font-medium">{email}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-3 pt-4">
              {step > 1 && (
                <motion.button
                  type="button"
                  onClick={handleBack}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 border border-white/20 hover:bg-white/5 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Kembali
                </motion.button>
              )}
              
              {step < 3 ? (
                <motion.button
                  type="button"
                  onClick={handleNext}
                  disabled={step === 1 ? !validateStep1() : !validateStep2()}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all"
                >
                  Lanjut
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              ) : (
                <motion.button
                  type="submit"
                  disabled={loading || description.length < 50}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Check className="w-5 h-5" />}
                  {loading ? 'Memproses...' : 'Selesai & Mulai'}
                </motion.button>
              )}
            </div>
          </form>

          <p className="text-center text-sm text-gray-400 mt-6">
            Sudah punya akun?{' '}
            <Link to="/login" className="text-blue-400 hover:text-blue-300 font-semibold">Masuk</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterCompany;
