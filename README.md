# The Infinite Library - Remedial UTS PAW

**Nama:** Dzakia Lailah Hamsa  
**NIM:** 20230140110  
**Kelas:** TI503P (C)

## Deskripsi
**The Infinite Library** adalah sistem manajemen perpustakaan modern dengan estetika "Quiet Luxury" yang dirancang untuk memberikan pengalaman kurasi pengetahuan yang luhur. Sistem ini mencatat lokasi geografis (geolokasi) pengguna secara otomatis saat melakukan peminjaman buku untuk memastikan validitas sirkulasi aset.

Proyek ini dibangun menggunakan arsitektur **Fullstack JavaScript** (React.js & Express.js) dengan basis data relasional MySQL.

---

## 🏛️ Fitur Utama

*   **The Collection (User):** Menjelajahi katalog buku dengan desain Bento Grid yang dinamis.
*   **Heritage Curation (Admin):** Panel kontrol untuk menambah, memperbarui, dan menonaktifkan (*decommission*) aset perpustakaan.
*   **Geospatial Borrowing:** Peminjaman buku otomatis mencatat koordinat Latitude dan Longitude pengguna.
*   **Prestigious Aesthetic:** Tema "Infinite Library" dengan palet warna Royal Gold, Ink Indigo, dan Paper White.
*   **Secure Entrance:** Sistem autentikasi berbasis role (Admin & Reader).

---

## 🚀 Instalasi & Cara Menjalankan

### 1. Prasyarat
*   **Node.js** terinstal (versi terbaru direkomendasikan).
*   **MySQL Server** aktif (XAMPP/WAMP/Docker).

### 2. Konfigurasi Database
Pastikan MySQL Anda berjalan di port `3309` (atau sesuaikan di `backend/config/config.json`).
1.  Masuk ke folder backend: `cd backend`
2.  Instal dependensi: `npm install`
3.  Buat database: `npx sequelize-cli db:create`
4.  Jalankan migrasi: `npx sequelize-cli db:migrate`

### 3. Menjalankan Backend
```bash
cd backend
npm start
```
Server akan berjalan di `http://localhost:3000`.

### 4. Menjalankan Frontend
Tutup terminal sebelumnya atau buka terminal baru:
```bash
cd frontend
npm install
npm start
```
Aplikasi dapat diakses di `http://localhost:3001` (atau port default React lainnya).

---

## 📂 Struktur Proyek
*   **`backend/`**: Kode server Express.js, konfigurasi database Sequelize, dan model data.
*   **`frontend/`**: Antarmuka React.js dengan Tailwind CSS untuk styling "Quiet Luxury".

---

## 📋 Dokumentasi API

### Header Wajib
*   `x-user-role`: `admin` atau `user`
*   `x-user-id`: ID pengguna (hanya untuk role `user`)

### Endpoints Utama

| Method | Endpoint | Role | Deskripsi |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/books` | Public | Melihat seluruh koleksi buku |
| `POST` | `/api/books` | Admin | Menambah aset buku baru |
| `PUT` | `/api/books/:id` | Admin | Memperbarui informasi buku |
| `DELETE` | `/api/books/:id` | Admin | Menonaktifkan aset buku |
| `POST` | `/api/borrow` | User | Meminjam buku + mencatat geolokasi |

---

## 🗄️ Struktur Database

### Table: Books
Menyimpan metadata koleksi buku (`id`, `title`, `author`, `stock`).

### Table: BorrowLogs
Merekam jejak peminjaman (`userId`, `bookId`, `borrowDate`, `latitude`, `longitude`).

---

## 🎨 Tampilan UI (Quiet Luxury)
Aplikasi ini menggunakan filosofi desain minimalis yang menekankan pada kenyamanan visual:
*   **The Gates**: Gerbang masuk prestigis dengan tipografi hitam.
*   **Grand Collection**: Katalog buku dengan animasi lembut dan tekstur linen halus.
*   **Librarian’s Desk**: Workspace administratif yang bersih dan fisien.

---
*Proyek ini merupakan bagian dari evaluasi Remedial UTS mata kuliah Pemrograman Aplikasi Web (PAW).*
