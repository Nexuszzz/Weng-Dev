import React, { useState } from 'react';
import { useUser } from '../../context/UserContext';
import { Pencil, Save, User, Mail, Key, ShieldCheck, X, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Profile: React.FC = () => {
  const { user, updateProfile } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [showSecurity, setShowSecurity] = useState(false);
  const [emailForm, setEmailForm] = useState({ email: user?.email || '', passwordConfirm: '' });
  const [pwdForm, setPwdForm] = useState({ current: '', next: '', confirm: '' });
  const [feedback, setFeedback] = useState<{type:'success'|'error'; msg:string}|null>(null);
  const [local, setLocal] = useState({
    name: user?.name || '',
    headline: user?.headline || '',
    bio: user?.bio || '',
    location: user?.location || '',
    website: user?.website || '',
    skills: (user?.skills || []).join(', '),
    linkedin: user?.social?.linkedin || '',
    github: user?.social?.github || '',
    dribbble: user?.social?.dribbble || ''
  });

  if (!user) {
    return (
      <div className="max-w-3xl mx-auto py-12">
        <div className="p-6 bg-white rounded-xl border border-gray-200 text-center space-y-4">
          <User className="w-10 h-10 mx-auto text-gray-400" />
          <h2 className="text-xl font-semibold">Belum Masuk</h2>
          <p className="text-gray-600">Silakan login untuk melihat profil.</p>
        </div>
      </div>
    );
  }

  const pushFeedback = (type:'success'|'error', msg:string) => {
    setFeedback({type,msg});
    setTimeout(()=> setFeedback(null), 3000);
  };

  const onSave = () => {
    updateProfile({
      name: local.name,
      headline: local.headline,
      bio: local.bio,
      location: local.location,
      website: local.website,
      skills: local.skills.split(',').map(s => s.trim()).filter(Boolean),
      social: {
        linkedin: local.linkedin,
        github: local.github,
        dribbble: local.dribbble,
      }
    });
    setIsEditing(false);
    pushFeedback('success','Profil berhasil diperbarui');
  };

  const submitEmailChange = () => {
    if(!emailForm.email.includes('@')) {
      return pushFeedback('error','Email tidak valid');
    }
    if(emailForm.passwordConfirm.length < 4) {
      return pushFeedback('error','Password konfirmasi terlalu pendek (mock)');
    }
    updateProfile({ email: emailForm.email });
    pushFeedback('success','Email berhasil diganti (mock)');
    setEmailForm(f=>({...f,passwordConfirm:''}));
  };

  const submitPasswordChange = () => {
    if(pwdForm.next.length < 6) return pushFeedback('error','Password baru minimal 6 karakter');
    if(pwdForm.next !== pwdForm.confirm) return pushFeedback('error','Konfirmasi password tidak cocok');
    pushFeedback('success','Password berhasil diperbarui (mock)');
    setPwdForm({current:'', next:'', confirm:''});
  };

  const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => (
    <input {...props} className={`w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white ${props.className||''}`} />
  );

  const TextArea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = (props) => (
    <textarea {...props} className={`w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white resize-none ${props.className||''}`} />
  );

  return (
    <div className="max-w-5xl mx-auto py-8 space-y-8">
      <AnimatePresence>{feedback && (
        <motion.div
          initial={{ y:-20, opacity:0, scale:.95 }}
          animate={{ y:0, opacity:1, scale:1 }}
          exit={{ y:-10, opacity:0, scale:.97 }}
          className={`flex items-center space-x-3 px-4 py-3 rounded-xl shadow text-sm font-medium border ${feedback.type==='success'? 'bg-emerald-50 border-emerald-200 text-emerald-700':'bg-red-50 border-red-200 text-red-700'}`}
        >
          {feedback.type==='success'? <CheckCircle2 className="w-4 h-4" /> : <X className="w-4 h-4" />}
          <span>{feedback.msg}</span>
        </motion.div>
      )}</AnimatePresence>
      <motion.div layout className="flex items-start space-x-6">
        <motion.div layout className={`w-24 h-24 rounded-2xl ${user.avatarColor||'bg-gray-300'} flex items-center justify-center text-white text-3xl font-semibold shadow-lg`}>{user.name.charAt(0)}</motion.div>
        <motion.div layout className="flex-1 space-y-4">
          <motion.div layout className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <motion.h1 layout className="text-2xl font-bold text-gray-900 dark:text-white">{user.name}</motion.h1>
              <motion.p layout className="text-gray-600 dark:text-gray-300">{user.headline}</motion.p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button onClick={()=> setShowSecurity(s=>!s)} className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                <ShieldCheck size={16} />
                <span>Keamanan</span>
              </button>
              <button onClick={()=> setIsEditing(e=>!e)} className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-700 transition">
                {isEditing ? <Save size={16} /> : <Pencil size={16} />}
                <span>{isEditing ? 'Simpan' : 'Edit Profil'}</span>
              </button>
            </div>
          </motion.div>
          {!isEditing && (
            <motion.p layout className="text-gray-700 dark:text-gray-300 leading-relaxed max-w-2xl">{user.bio}</motion.p>
          )}
        </motion.div>
      </motion.div>

      <AnimatePresence>
      {isEditing && (
        <motion.div
          key="edit-panel"
          initial={{ opacity:0, y:20, scale:.98 }}
          animate={{ opacity:1, y:0, scale:1 }}
          exit={{ opacity:0, y:-15, scale:.98 }}
          transition={{ type:'spring', stiffness:180, damping:22 }}
          className="grid md:grid-cols-2 gap-6 bg-white dark:bg-surface-dark p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nama</label>
              <Input value={local.name} onChange={e=>setLocal({...local, name:e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Headline</label>
              <Input value={local.headline} onChange={e=>setLocal({...local, headline:e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Lokasi</label>
              <Input value={local.location} onChange={e=>setLocal({...local, location:e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Website</label>
              <Input value={local.website} onChange={e=>setLocal({...local, website:e.target.value})} />
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Bio</label>
              <TextArea rows={6} value={local.bio} onChange={e=>setLocal({...local, bio:e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Skills (pisahkan dengan koma)</label>
              <Input value={local.skills} onChange={e=>setLocal({...local, skills:e.target.value})} />
            </div>
          </div>
          <div className="md:col-span-2 border-t border-gray-200 dark:border-gray-700 pt-6 grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">LinkedIn</label>
              <Input value={local.linkedin} onChange={e=>setLocal({...local, linkedin:e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">GitHub</label>
              <Input value={local.github} onChange={e=>setLocal({...local, github:e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Dribbble</label>
              <Input value={local.dribbble} onChange={e=>setLocal({...local, dribbble:e.target.value})} />
            </div>
            <div className="md:col-span-3 flex justify-end gap-2">
              <button onClick={()=> setIsEditing(false)} className="px-5 py-2.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition">Batal</button>
              <button onClick={onSave} className="px-5 py-2.5 rounded-lg bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 transition shadow">Simpan</button>
            </div>
          </div>
        </motion.div>
      )}
      </AnimatePresence>

      {/* Info Grid */}
      {!isEditing && (
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-white dark:bg-surface-dark p-6 rounded-xl border border-gray-200 dark:border-gray-700 space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-3">Tentang</h2>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{user.bio}</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-3">Skill</h2>
              <div className="flex flex-wrap gap-2">
                {user.skills?.map(skill => (
                  <span key={skill} className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium border border-emerald-200">{skill}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-surface-dark p-6 rounded-xl border border-gray-200 dark:border-gray-700 space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Info Kontak</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>Email: {user.email}</li>
                {user.location && <li>Lokasi: {user.location}</li>}
                {user.website && <li>Website: <a href={user.website} className="text-emerald-600 hover:underline" target="_blank" rel="noreferrer">{user.website}</a></li>}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Sosial</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                {user.social?.linkedin && <li>LinkedIn: {user.social.linkedin}</li>}
                {user.social?.github && <li>GitHub: {user.social.github}</li>}
                {user.social?.dribbble && <li>Dribbble: {user.social.dribbble}</li>}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Security & Account Section */}
      <AnimatePresence>
      {showSecurity && !isEditing && (
        <motion.div
          key="security"
          initial={{ opacity:0, y:30 }}
          animate={{ opacity:1, y:0 }}
          exit={{ opacity:0, y:-20 }}
          transition={{ type:'spring', stiffness:190, damping:24 }}
          className="grid md:grid-cols-2 gap-6"
        >
          <div className="bg-white dark:bg-surface-dark p-6 rounded-xl border border-gray-200 dark:border-gray-700 space-y-5">
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4 text-gray-500" />
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Ganti Email</h3>
            </div>
            <div className="space-y-3 text-sm">
              <div>
                <label className="block mb-1 text-xs font-medium uppercase tracking-wide">Email Baru</label>
                <Input type="email" value={emailForm.email} onChange={e=> setEmailForm({...emailForm, email:e.target.value})} />
              </div>
              <div>
                <label className="block mb-1 text-xs font-medium uppercase tracking-wide">Password Saat Ini</label>
                <Input type="password" value={emailForm.passwordConfirm} onChange={e=> setEmailForm({...emailForm, passwordConfirm:e.target.value})} />
              </div>
              <button onClick={submitEmailChange} className="w-full inline-flex justify-center px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium transition">Perbarui Email</button>
            </div>
          </div>
          <div className="bg-white dark:bg-surface-dark p-6 rounded-xl border border-gray-200 dark:border-gray-700 space-y-5">
            <div className="flex items-center space-x-2">
              <Key className="w-4 h-4 text-gray-500" />
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Ganti Password</h3>
            </div>
            <div className="space-y-3 text-sm">
              <div>
                <label className="block mb-1 text-xs font-medium uppercase tracking-wide">Password Saat Ini</label>
                <Input type="password" value={pwdForm.current} onChange={e=> setPwdForm({...pwdForm, current:e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1 text-xs font-medium uppercase tracking-wide">Password Baru</label>
                  <Input type="password" value={pwdForm.next} onChange={e=> setPwdForm({...pwdForm, next:e.target.value})} />
                </div>
                <div>
                  <label className="block mb-1 text-xs font-medium uppercase tracking-wide">Konfirmasi</label>
                  <Input type="password" value={pwdForm.confirm} onChange={e=> setPwdForm({...pwdForm, confirm:e.target.value})} />
                </div>
              </div>
              <button onClick={submitPasswordChange} className="w-full inline-flex justify-center px-4 py-2 rounded-lg bg-gray-900 hover:bg-gray-800 text-white font-medium transition">Perbarui Password</button>
            </div>
          </div>
        </motion.div>
      )}
      </AnimatePresence>
    </div>
  );
};

export default Profile;
