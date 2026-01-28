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

## 🎨 screenshot postmen 
|Register| 
| :--- |
|![WhatsApp Image 2026-01-28 at 11 21 26 PM](https://github.com/user-attachments/assets/beb28582-e3e1-437f-94a9-28a902a80645)|
|login|
![WhatsApp Image 2026-01-28 at 11 21 39 PM](https://github.com/user-attachments/assets/74ca10b0-a22b-4694-b4c6-acfad18e0603)
menampilkan semua buku
![WhatsApp Image 2026-01-28 at 11 22 02 PM](https://github.com/user-attachments/assets/f137ac76-bb30-4d6d-a9ca-72563fae734c)
tambah buku
![WhatsApp Image 2026-01-28 at 11 22 23 PM](https://github.com/user-attachments/assets/62d67a02-b0ab-4fe3-80db-1d1b31e5350b)
edit buku
|<img width="2560" height="1600" alt="image" src="https://github.com/user-attachments/assets/1eeb9b37-6fda-4ed6-a8dd-982a815e931e" />|
hapus buku
|<img width="2560" height="1600" alt="image" src="https://github.com/user-attachments/assets/e3a75342-a637-450d-95fd-9fbf939d71c3" />|
tabel user
|<img width="2560" height="1600" alt="image" src="https://github.com/user-attachments/assets/b5a0077e-719d-49cc-8040-d5d92d3c8fe9" />|
tabel buku/books
|<img width="2560" height="1600" alt="image" src="https://github.com/user-attachments/assets/5a79d89b-13ab-4db2-b382-ffcd43f2becc" />|
tabel borrowlogs/ history peminjaman buku
|<img width="2560" height="1600" alt="image" src="https://github.com/user-attachments/assets/f360e3ca-bf9e-4b11-8968-f85eaf8e674e" />|
Halaman login
|<img width="2560" height="1600" alt="image" src="https://github.com/user-attachments/assets/20e99391-3163-4d3f-bbda-f14586becf7a" />|
Halaman Register
|<img width="2560" height="1600" alt="image" src="https://github.com/user-attachments/assets/9520873a-02bc-4bc9-9f81-190a6ff73915" />|
Dashboard admin
|<img width="2560" height="1600" alt="image" src="https://github.com/user-attachments/assets/127afcc0-1074-4a14-bf4c-8fdc42e30540" />|
halaman home/katalog user
|<img width="2560" height="1600" alt="image" src="https://github.com/user-attachments/assets/b0041810-31d9-493d-857d-97053927e92e" />|
Minjam buku
|<img width="2560" height="1600" alt="image" src="https://github.com/user-attachments/assets/61f69473-6de9-4620-8834-71b71dae685a" />|
halaman edit buku
|<img width="2560" height="1600" alt="image" src="https://github.com/user-attachments/assets/2140ba0d-1389-4110-b307-3caf6417890f" />|



---
*Proyek ini merupakan bagian dari evaluasi Remedial UTS mata kuliah Pemrograman Aplikasi Web (PAW).*
