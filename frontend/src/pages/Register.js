import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({ username: '', password: '', confirmPassword: '' });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) return alert("Password tidak cocok!");

    try {
      await axios.post('/api/register', {
        username: form.username,
        password: form.password
      });
      alert("Registrasi Berhasil! Silakan Login.");
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message || "Registrasi Gagal");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden p-8 selection:bg-ultra-gold selection:text-ultra-dark">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0 bg-ultra-dark">
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-ultra-gold/10 blur-[180px] animate-float rounded-full"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-indigo-900/20 blur-[180px] animate-float rounded-full" style={{ animationDelay: '-4s' }}></div>
      </div>

      <div className="w-full max-w-5xl z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="text-left hidden lg:block border-r border-white/5 pr-16">
          <h1 className="text-7xl font-black text-white leading-[0.85] tracking-tighter mb-8 uppercase">
            NEW.<br />
            <span className="text-white opacity-40">READER.</span>
          </h1>
          <p className="text-white/20 font-bold uppercase tracking-[0.4em] text-[10px] leading-relaxed">
            Register your entity into the heritage registry. Gain access to the infinite collection.
          </p>
        </div>

        <div className="glass-morphism p-14 rounded-5xl shadow-[0_50px_100px_-20px_rgba(0,0,0,0.7)] border border-white/10 group transition-all duration-700 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-ultra-gold/5 blur-3xl -z-10"></div>

          <div className="mb-12">
            <h2 className="text-3xl font-black text-white tracking-tight mb-2">Enrollment</h2>
            <p className="text-white/30 text-xs font-bold uppercase tracking-widest">Create your reading credentials</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-8">
            <div className="relative group/input">
              <label className="text-[10px] font-black text-ultra-gold uppercase tracking-[0.3em] mb-3 block ml-2">Identity Name</label>
              <input
                className="w-full bg-white/5 border border-white/10 text-white px-8 py-6 rounded-3xl outline-none focus:border-ultra-gold transition-all font-bold placeholder:text-white/10"
                placeholder="UNIQUE_ID"
                onChange={e => setForm({ ...form, username: e.target.value })}
                required
              />
            </div>

            <div className="relative group/input">
              <label className="text-[10px] font-black text-ultra-gold uppercase tracking-[0.3em] mb-3 block ml-2">Secret Key</label>
              <input
                className="w-full bg-white/5 border border-white/10 text-white px-8 py-6 rounded-3xl outline-none focus:border-ultra-gold transition-all font-bold placeholder:text-white/10"
                type="password"
                placeholder="••••••••"
                onChange={e => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>

            <div className="relative group/input">
              <label className="text-[10px] font-black text-ultra-gold uppercase tracking-[0.3em] mb-3 block ml-2">Verify Key</label>
              <input
                className="w-full bg-white/5 border border-white/10 text-white px-8 py-6 rounded-3xl outline-none focus:border-ultra-gold transition-all font-bold placeholder:text-white/10"
                type="password"
                placeholder="RE-ENTER"
                onChange={e => setForm({ ...form, confirmPassword: e.target.value })}
                required
              />
            </div>

            <button className="w-full bg-ultra-gold text-ultra-dark py-8 rounded-4xl font-black text-xs tracking-[0.5em] uppercase transition-all shadow-[0_20px_40px_rgba(212,175,55,0.2)] active:scale-95 hover:bg-white hover:shadow-white/10">
              Commit Enrollment
            </button>
          </form>

          <div className="mt-14 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-white/20">
            <div className="h-px w-20 bg-white/5"></div>
            <Link to="/login" className="hover:text-ultra-gold transition-colors px-4 text-center">Return to Gates</Link>
            <div className="h-px w-20 bg-white/5"></div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in-right {
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default Register;