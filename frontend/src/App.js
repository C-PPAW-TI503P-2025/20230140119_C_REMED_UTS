import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  // Gunakan state agar React sadar saat user login/logout
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null); // Update state jadi null
  };

  return (
    <Router>
      <div className="min-h-screen animate-mesh text-white font-sans selection:bg-ultra-gold selection:text-ultra-dark relative">
        {user && (
          <nav className="fixed top-12 right-12 z-[100] w-auto pointer-events-auto">
            <div className="glass-morphism rounded-[2rem] px-6 py-3 flex items-center gap-8 shadow-[0_20px_40px_rgba(0,0,0,0.4)] border border-white/10 group">
              <div className="flex gap-6 items-center">
                <Link to="/" className="text-lg font-black tracking-tight hover:opacity-80 transition-opacity flex items-center gap-2">
                  <span className="text-ultra-gold/90">The</span>
                  <span className="text-white/90">Library.</span>
                </Link>
                <div className="flex gap-5 border-l border-white/10 pl-6">
                  <Link to="/" className="text-white/30 hover:text-white font-bold text-[9px] transition-all tracking-[0.2em] uppercase">Collection</Link>
                  {user.role === 'admin' && (
                    <Link to="/admin" className="text-ultra-gold/40 hover:text-ultra-gold font-black text-[9px] transition-all tracking-[0.2em] uppercase">Desk</Link>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-5 border-l border-white/5 pl-5">
                <p className="text-[8px] uppercase tracking-[0.3em] font-black text-ultra-gold/40 hidden sm:block">{user.role}</p>
                <button
                  onClick={logout}
                  className="w-8 h-8 bg-white/5 text-white/30 rounded-full hover:bg-ultra-rose/20 hover:text-ultra-rose transition-all flex items-center justify-center"
                  title="Logout"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </nav>
        )}

        <main className="pb-40">
          <Routes>
            <Route path="/login" element={!user ? <Login onLoginSuccess={(u) => setUser(u)} /> : <Navigate to="/" />} />
            <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />

            <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
            <Route path="/admin" element={user?.role === 'admin' ? <Admin /> : <Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;