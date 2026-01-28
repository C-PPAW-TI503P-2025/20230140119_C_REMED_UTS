import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [books, setBooks] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  const fetchBooks = async () => {
    try {
      const res = await axios.get('/api/books');
      setBooks(res.data);
    } catch (err) { console.error("Gagal ambil buku", err); }
  };

  useEffect(() => { fetchBooks(); }, []);

  const handleBorrow = (bookId) => {
    // Mengambil lokasi sesuai kebutuhan endpoint /api/borrow
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      try {
        await axios.post('/api/borrow',
          { bookId, latitude, longitude },
          { headers: { 'x-user-role': user.role, 'x-user-id': user.id } }
        );
        alert("Buku berhasil dipinjam!");
        fetchBooks(); // Refresh stok yang sudah di-decrement
      } catch (err) {
        alert(err.response?.data?.message || "Gagal pinjam");
      }
    });
  };

  return (
    <div className="p-8 md:p-16 max-w-[1800px] mx-auto min-h-screen relative selection:bg-ultra-gold selection:text-ultra-dark">
      {/* Background Hero Decorative - More subtle */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-ultra-gold/[0.03] blur-[150px] rounded-full -z-10 animate-pulse"></div>

      <div className="mb-24 mt-12 relative">
        <div className="absolute -left-10 top-0 w-1 h-32 bg-ultra-gold/30 rounded-full hidden lg:block"></div>
        <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-6 leading-[0.85] uppercase">
          THE GRAND <br />
          <span className="text-white opacity-40">COLLECTION.</span>
        </h1>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
          <p className="text-white/30 text-lg max-w-2xl font-medium leading-relaxed tracking-tight underline border-white/5">
            Refined repository of knowledge. Curated heritage assets for curious minds. <br />
            Curated by <span className="text-ultra-gold/80 italic font-bold">{user.username}</span>.
          </p>
          <div className="flex items-center gap-6">
            <div className="glass-morphism px-8 py-5 rounded-3xl border border-white/5 flex items-center gap-4 shadow-xl">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 mb-1">Total Assets</p>
                <p className="text-xl font-black text-white/90">{books.length} VOLUMES</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
        {books.map((book, index) => (
          <div
            key={book.id}
            className={`group relative rounded-[2.5rem] overflow-hidden transition-all duration-1000 glass-morphism border border-white/5 hover:border-ultra-gold/20 p-12 flex flex-col justify-between ${index % 6 === 0 ? 'lg:col-span-8 h-[500px]' :
              index % 6 === 1 ? 'lg:col-span-4 h-[500px]' :
                index % 6 === 2 ? 'lg:col-span-4 h-[400px]' :
                  index % 6 === 3 ? 'lg:col-span-4 h-[400px]' :
                    index % 6 === 4 ? 'lg:col-span-4 h-[400px]' :
                      'lg:col-span-12 h-[350px]'
              }`}
          >
            {/* Subtle Gradient Backdrop */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>

            <div className="relative z-10 flex flex-col h-full justify-between">
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-black text-ultra-gold/40 tracking-[0.4em] uppercase">Ref: {book.id.toString().padStart(4, '0')}</span>
                <div className={`px-4 py-1.5 rounded-full border text-[8px] font-black uppercase tracking-widest ${book.stock > 0 ? 'border-emerald-500/20 text-emerald-500 bg-emerald-500/5' : 'border-ultra-rose/20 text-ultra-rose bg-ultra-rose/5'
                  }`}>
                  {book.stock > 0 ? `Available: ${book.stock}` : 'Reserved'}
                </div>
              </div>

              <div>
                <p className="text-[10px] font-black text-ultra-gold/60 uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0 duration-500 mb-2 italic">By {book.author}</p>
                <h3 className="text-4xl md:text-5xl font-black leading-[1.1] tracking-tighter text-white/90 group-hover:text-white transition-colors duration-500">
                  {book.title}
                </h3>
              </div>

              <div className="pt-8 border-t border-white/5 flex items-center justify-between">
                <span className="text-[10px] text-white/20 font-bold uppercase tracking-widest truncate max-w-[150px]">{book.author}</span>
                <button
                  onClick={(e) => { e.stopPropagation(); handleBorrow(book.id); }}
                  disabled={book.stock <= 0}
                  className={`text-[10px] font-black uppercase tracking-[0.3em] transition-all flex items-center gap-4 group/btn ${book.stock > 0
                    ? 'text-ultra-gold hover:text-white'
                    : 'text-white/10 cursor-not-allowed'
                    }`}
                >
                  <span>{book.stock > 0 ? 'Acquire Entry' : 'Reserved'}</span>
                  <span className="w-6 h-px bg-ultra-gold/30 group-hover/btn:w-10 transition-all"></span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {books.length === 0 && (
        <div className="p-32 text-center text-white/10 font-black uppercase tracking-[0.5em] italic border-white/5 border border-dashed rounded-[3rem] mt-12">
          Database Restoring...
        </div>
      )}
    </div>
  );
};

export default Home;