// seed-books.js
const { Book } = require('./models');

const seedBooks = async () => {
  try {
    const books = [
      { title: 'Laskar Pelangi', author: 'Andrea Hirata', stock: 10 },
      { title: 'Bumi Manusia', author: 'Pramoedya Ananta Toer', stock: 5 },
      { title: 'Negeri 5 Menara', author: 'A. Fuadi', stock: 8 },
      { title: 'Filosofi Teras', author: 'Henry Manampiring', stock: 12 },
      { title: 'Hujan', author: 'Tere Liye', stock: 3 }
    ];

    await Book.bulkCreate(books);
    console.log("✅ Data buku berhasil ditambahkan!");
    process.exit();
  } catch (err) {
    console.error("❌ Gagal seeding data buku:", err.message);
    process.exit(1);
  }
};

seedBooks();