import React, { useState, useRef } from 'react';
import { Mail, Lock, Loader2, ArrowLeft, User as UserIcon, AtSign, Linkedin, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordHint, setPasswordHint] = useState('');
  const [confirmError, setConfirmError] = useState<string | null>(null);
  const navigate = useNavigate();

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

  const calcPasswordStrength = (val: string) => {
    let s = 0;
    if (val.length >= 8) s++;
    if (/[A-Za-z]/.test(val)) s++;
    if (/[0-9]/.test(val)) s++;
    if (/[^A-Za-z0-9]/.test(val)) s++;
    setPasswordStrength(s);
    const labels = ['Sangat lemah', 'Lemah', 'Sedang', 'Kuat', 'Sangat kuat'];
    setPasswordHint(labels[s]);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) return setConfirmError('Password dan konfirmasi tidak sama');
    setLoading(true);
    // TODO: integrasi API register
    setTimeout(() => {
      setLoading(false);
      navigate('/');
    }, 1200);
  };

  const socialRegister = async (provider: 'google' | 'linkedin') => {
    setLoading(true);
    // TODO: Panggil OAuth provider
    setTimeout(() => {
      setLoading(false);
      navigate('/');
    }, 900);
  };

  const strengthColor = (s: number) => {
    if (s <= 1) return 'bg-red-500';
    if (s === 2) return 'bg-yellow-400';
    if (s === 3) return 'bg-green-500';
    return 'bg-emerald-500';
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-emerald-900 text-white flex items-center justify-center p-6"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          style={{ x: sx, y: sy }}
          className="absolute -top-10 -left-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl"
        />
        <motion.div
          style={{ x: sx, y: sy }}
          className="absolute -bottom-10 -right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
        />
      </div>

      <motion.div className="w-full max-w-md relative" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
        <Link to="/" className="inline-flex items-center text-sm text-gray-300 hover:text-white transition-colors mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" /> Kembali ke Beranda
        </Link>

        <div className="bg-gray-900/70 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 p-8 hover:shadow-emerald-500/10 transition-shadow">
          <div className="text-center mb-8">
            <div className="mx-auto w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shadow-lg mb-4 animate-pulse">
              <UserIcon className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-bold">Buat Akun Baru</h1>
            <p className="text-gray-400 mt-1">Gratis dan cepat — mulai sekarang</p>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block text-sm mb-1">Nama Lengkap</label>
              <div className="relative">
                <UserIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  className="w-full pl-10 pr-3 py-3 rounded-lg bg-gray-800/80 border border-white/10 focus:border-emerald-500 outline-none transition-all"
                  placeholder="Nama kamu"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm mb-1">Email</label>
              <div className="relative">
                <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  className={`w-full pl-10 pr-3 py-3 rounded-lg bg-gray-800/80 border ${emailError ? 'border-red-500/70 focus:border-red-500' : 'border-white/10 focus:border-emerald-500'} outline-none transition-all`}
                  placeholder="nama@email.com"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); validateEmail(e.target.value); }}
                  aria-invalid={!!emailError}
                  aria-describedby={emailError ? 'email-error' : undefined}
                />
              </div>
              {emailError ? (
                <div id="email-error" className="flex items-center text-red-400 text-xs mt-1 gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {emailError}
                </div>
              ) : null}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    className="w-full pl-10 pr-11 py-3 rounded-lg bg-gray-800/80 border border-white/10 focus:border-emerald-500 outline-none transition-all"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); calcPasswordStrength(e.target.value); setConfirmError(null); }}
                  />
                  <button
                    type="button"
                    aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[0,1,2,3].map((i) => (
                      <div key={i} className={`h-1.5 flex-1 rounded ${i < passwordStrength ? strengthColor(passwordStrength) : 'bg-white/10'}`}></div>
                    ))}
                  </div>
                  <div className="text-xs text-gray-400">{password ? passwordHint : 'Gunakan min. 8 karakter, kombinasikan huruf, angka, dan simbol.'}</div>
                </div>
              </div>
              <div>
                <label className="block text-sm mb-1">Konfirmasi</label>
                <div className="relative">
                  <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type={showConfirm ? 'text' : 'password'}
                    required
                    className={`w-full pl-10 pr-11 py-3 rounded-lg bg-gray-800/80 border ${confirmError ? 'border-red-500/70 focus:border-red-500' : 'border-white/10 focus:border-emerald-500'} outline-none transition-all`}
                    placeholder="••••••••"
                    value={confirm}
                    onChange={(e) => { setConfirm(e.target.value); setConfirmError(null); }}
                    onBlur={() => { if (password && confirm && password !== confirm) setConfirmError('Password dan konfirmasi tidak sama'); }}
                  />
                  <button
                    type="button"
                    aria-label={showConfirm ? 'Sembunyikan konfirmasi' : 'Tampilkan konfirmasi'}
                    onClick={() => setShowConfirm((s) => !s)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                  >
                    {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {confirmError ? (
                  <div className="flex items-center text-red-400 text-xs mt-1 gap-1">
                    <AlertCircle className="w-3.5 h-3.5" /> {confirmError}
                  </div>
                ) : null}
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileTap={{ scale: 0.98 }}
              whileHover={{ y: -1 }}
              className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 disabled:opacity-60 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
              {loading ? 'Memproses...' : 'Daftar'}
            </motion.button>
          </form>

          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-xs text-gray-400">atau</span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <motion.button onClick={() => socialRegister('google')} disabled={loading} whileTap={{ scale: 0.98 }} whileHover={{ y: -1 }} className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-white text-gray-900 hover:bg-gray-100 transition-all">
              <img alt="Google" src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" className="w-5 h-5" />
              <span>Google</span>
            </motion.button>
            <motion.button onClick={() => socialRegister('linkedin')} disabled={loading} whileTap={{ scale: 0.98 }} whileHover={{ y: -1 }} className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#0A66C2] text-white hover:bg-[#094f96] transition-all">
              <Linkedin className="w-5 h-5" />
              <span>LinkedIn</span>
            </motion.button>
          </div>

          <p className="text-center text-sm text-gray-400 mt-6">
            Sudah punya akun?{' '}
            <Link to="/login" className="text-emerald-400 hover:text-emerald-300 font-semibold">Masuk</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;