const express = require('express');
const app = express();

const authorize = require('./middleware/auth');
const { Book, BorrowLog, User } = require('./models'); // Tambahkan User di sini

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Tambahkan User di baris models


// Endpoint Register
app.post('/api/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const newUser = await User.create({ username, password, role: 'user' });
        res.status(201).json({ message: "Berhasil", user: newUser });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Endpoint Login
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username, password } });
    if (user) {
        res.json({ message: "Sukses", user });
    } else {
        res.status(401).json({ message: "Gagal" });
    }
});

// --- PUBLIC ENDPOINTS ---
app.get('/api/books', async (req, res) => {
    const books = await Book.findAll(); // [cite: 60]
    res.json(books);
});

// --- ADMIN MODE (Tambah Buku) ---
app.post('/api/books', authorize('admin'), async (req, res) => {
    try {
        const { title, author, stock } = req.body;
        if (!title || !author) return res.status(400).send("Title/Author required"); // Validasi [cite: 83]
        const book = await Book.create({ title, author, stock });
        res.status(201).json(book);
    } catch (err) { res.status(500).json(err); }
});

// --- USER MODE (Pinjam Buku dengan Geolocation) ---
app.post('/api/borrow', authorize('user'), async (req, res) => {
    if (!req.body) return res.status(400).json({ message: "Request body is missing" });
    const { bookId, latitude, longitude } = req.body;
    const userId = req.headers['x-user-id'];

    if (!bookId) return res.status(400).json({ message: "bookId is required" });

    try {
        const book = await Book.findByPk(bookId);
        if (book && book.stock > 0) {
            await book.decrement('stock'); // Kurangi stok [cite: 75]
            const log = await BorrowLog.create({
                userId,
                bookId,
                latitude,
                longitude,
                borrowDate: new Date()
            }); // Simpan lokasi & waktu [cite: 57, 59]
            res.json({ message: "Berhasil pinjam!", log });
        } else {
            res.status(400).json({ message: "Stok habis atau buku tidak ada" });
        }
    } catch (err) { res.status(500).json(err); }
});

app.listen(3000, () => console.log("Server running on port 3000"));