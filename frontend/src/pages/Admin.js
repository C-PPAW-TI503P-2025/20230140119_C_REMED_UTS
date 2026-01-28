import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Admin = () => {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({ title: '', author: '', stock: 0 });
  const [editingId, setEditingId] = useState(null);
  const user = JSON.parse(localStorage.getItem('user'));

  // Header sesuai instruksi PDF: x-user-role: admin
  const config = { headers: { 'x-user-role': user?.role } };

  const fetchBooks = async () => {
    const res = await axios.get('/api/books');
    setBooks(res.data);
  };

  useEffect(() => { fetchBooks(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        // PUT /api/books/:id
        await axios.put(`/api/books/${editingId}`, form, config);
        alert("Buku berhasil diperbarui");
      } else {
        // POST /api/books
        await axios.post('/api/books', form, config);
        alert("Buku berhasil ditambah");
      }
      setForm({ title: '', author: '', stock: 0 });
      setEditingId(null);
      fetchBooks();
    } catch (err) { alert("Aksi Gagal: " + err.response?.data); }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Hapus buku ini?")) {
      try {
        // DELETE /api/books/:id
        await axios.delete(`/api/books/${id}`, config);
        fetchBooks();
      } catch (err) { alert("Gagal menghapus"); }
    }
  };

  return (
    <div className="p-8 md:p-16 max-w-[1800px] mx-auto min-h-screen relative">
      <div className="mb-20 mt-12 relative">
        <div className="absolute -left-10 top-0 w-1 h-32 bg-ultra-gold/20 rounded-full hidden lg:block"></div>
        <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-6 leading-[0.85] uppercase">
          CURATION.<span className="text-white/40">HUB</span>
        </h1>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
          <p className="text-white/30 text-lg max-w-2xl font-medium leading-relaxed tracking-tight">
            The Librarian's Desk. Refine and protect the heritage collection of the Grand Library. <br />
            Active curation session for <span className="text-ultra-gold/80 font-bold">{user.username}</span>.
          </p>
          <div className="flex gap-4">
            <div className="glass-morphism px-8 py-4 rounded-3xl flex items-center gap-4 border-ultra-gold/30 bg-ultra-gold/5">
              <span className="w-3 h-3 bg-ultra-gold rounded-full animate-ping"></span>
              <span className="text-xs font-black uppercase tracking-[0.3em] text-ultra-gold/80">Curation Mode Active</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Management Unit */}
        <div className="lg:col-span-4">
          <div className="glass-morphism p-12 rounded-[3.5rem] border border-white/10 sticky top-12 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-ultra-gold/5 blur-3xl"></div>

            <h3 className="text-2xl font-black mb-10 tracking-tighter uppercase flex items-center gap-4">
              {editingId ? (
                <>
                  <div className="w-4 h-4 bg-orange-500 rounded-full shadow-[0_0_15px_rgba(249,115,22,0.5)]"></div>
                  Refine Asset
                </>
              ) : (
                <>
                  <div className="w-4 h-4 bg-ultra-gold rounded-full shadow-[0_0_15px_rgba(212,175,55,0.5)]"></div>
                  New Acquisition
                </>
              )}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="relative group/input">
                <label className="text-[10px] font-black text-ultra-gold/50 uppercase tracking-[0.4em] mb-3 block ml-2">Manifest Title</label>
                <input
                  className="w-full bg-white/5 border border-white/10 p-6 rounded-[2rem] outline-none focus:border-ultra-gold transition-all font-bold text-white placeholder:text-white/10"
                  placeholder="BOOK_NOMENCLATURE"
                  value={form.title}
                  onChange={e => setForm({ ...form, title: e.target.value })}
                  required
                />
              </div>
              <div className="relative group/input">
                <label className="text-[10px] font-black text-ultra-gold/50 uppercase tracking-[0.4em] mb-3 block ml-2">Origin Curator</label>
                <input
                  className="w-full bg-white/5 border border-white/10 p-6 rounded-[2rem] outline-none focus:border-ultra-gold transition-all font-bold text-white placeholder:text-white/10"
                  placeholder="AUTHOR_CREDENTIAL"
                  value={form.author}
                  onChange={e => setForm({ ...form, author: e.target.value })}
                  required
                />
              </div>
              <div className="relative group/input">
                <label className="text-[10px] font-black text-ultra-gold/50 uppercase tracking-[0.4em] mb-3 block ml-2">Volume Inventory</label>
                <input
                  className="w-full bg-white/5 border border-white/10 p-6 rounded-[2rem] outline-none focus:border-ultra-gold transition-all font-bold text-white"
                  type="number"
                  placeholder="00"
                  value={form.stock}
                  onChange={e => setForm({ ...form, stock: e.target.value })}
                  required
                />
              </div>
              <div className="pt-6 flex gap-4">
                <button className={`flex-grow py-7 rounded-[2rem] font-black text-xs tracking-[0.5em] uppercase transition-all shadow-2xl active:scale-95 ${editingId ? 'bg-orange-500 text-white shadow-orange-500/20' : 'bg-ultra-gold text-ultra-dark hover:bg-white'}`}>
                  {editingId ? 'Refine Registry' : 'Catalog Asset'}
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={() => { setEditingId(null); setForm({ title: '', author: '', stock: 0 }) }}
                    className="p-7 bg-white/5 text-white/30 rounded-[2rem] hover:bg-white/10 hover:text-white transition-all border border-white/10"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Database List Unit */}
        <div className="lg:col-span-8">
          <div className="glass-morphism rounded-[3.5rem] border border-white/10 overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)]">
            <div className="px-12 py-8 border-b border-white/5 bg-white/5 flex justify-between items-center text-[10px] font-black text-ultra-gold/30 tracking-[0.5em] uppercase">
              <span>Heritage Asset Registry</span>
              <span>Librarian Actions</span>
            </div>
            <div className="divide-y divide-white/5">
              {books.map((book, index) => (
                <div key={book.id} className="p-12 hover:bg-white/5 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-10 group relative">
                  <div className="flex items-center gap-10 relative z-10">
                    <div className="w-20 h-20 bg-white/5 rounded-[2rem] border border-white/10 flex items-center justify-center text-white/20 font-black text-2xl group-hover:border-ultra-gold/50 group-hover:text-ultra-gold transition-all shadow-inner">
                      {book.title.charAt(0)}
                    </div>
                    <div>
                      <span className="text-[10px] font-black text-ultra-gold/60 tracking-[0.3em] uppercase mb-2 block">ID: {book.id.toString().padStart(4, '0')}</span>
                      <h4 className="font-black text-white text-4xl leading-none tracking-tighter mb-3 group-hover:text-ultra-gold transition-colors">{book.title}</h4>
                      <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em]">{book.author} <span className="mx-3 opacity-20">|</span> <span className="text-white/60">{book.stock} VOLUMES AVAILABLE</span></p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 relative z-10">
                    <button
                      onClick={() => { setEditingId(book.id); setForm(book) }}
                      className="px-10 py-5 bg-white/5 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full border border-white/10 hover:bg-ultra-gold hover:border-ultra-gold hover:text-ultra-dark transition-all"
                    >
                      Refine
                    </button>
                    <button
                      onClick={() => handleDelete(book.id)}
                      className="px-10 py-5 bg-ultra-rose/10 text-ultra-rose text-[10px] font-black uppercase tracking-[0.2em] rounded-full border border-ultra-rose/20 hover:bg-ultra-rose hover:text-white transition-all"
                    >
                      Decommission
                    </button>
                  </div>
                  {/* Decorative Subtle Line */}
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-12 bg-ultra-gold opacity-0 group-hover:opacity-100 transition-opacity rounded-r-full"></div>
                </div>
              ))}
              {books.length === 0 && (
                <div className="p-32 text-center text-white/10 font-black uppercase tracking-[0.6em] italic">
                  Registry Database Empty
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;