# 🏢 BPJS Metaverse: Kantor JKN for All — 17-Day Sprint

Simulasi kantor BPJS virtual dalam ruang 3D.  
Tujuan utama sprint ini: **bisa DEMO INTERAKSI** (antrean → avatar → konsultasi) dalam 17 hari.

---

## 👥 Team & Roles

| Nama | Role | Fokus |
|------|------|--------|
| **Axel** | Lead Dev / Integrator | Struktur project, integrasi 3D + API |
| **Nanda** | Frontend & UI/UX | Desain dan tampilan interaksi pengguna |
| **Rafi** | Backend & DB | Layanan antrean, dokumen, autentikasi |

---

## ⚙️ Stack Utama
- **Frontend:** Next.js 14, Tailwind, ShadCN/UI  
- **3D:** Three.js / React Three Fiber  
- **Backend:** Express + Prisma + PostgreSQL  
- **Realtime:** WebSocket  
- **Voice:** WebRTC / SpeechSynthesis  
- **Storage:** S3-compatible  

---

## 🧭 Sprint Goal
> Dalam 17 hari, aplikasi sudah bisa memperagakan:
> 1. Peserta masuk ke lobby (3D)  
> 2. Ambil antrean dan dipanggil virtual  
> 3. Avatar petugas menyapa dan konsultasi singkat  
> 4. Backend simpan tiket & log interaksi  

---

## 📅 Timeline 17 Hari

### 🧱 Hari 1-3 — Setup & Pondasi
**Axel**
- [ ] Setup monorepo (frontend + backend)
- [ ] Scene Three.js dasar (lobby + kamera + kontrol orbit)
- [ ] Commit awal `bpjs-metaverse`

**Nanda**
- [ ] Setup Tailwind + ShadCN  
- [ ] Desain landing + CTA "Masuk Kantor Virtual"  
- [ ] Komponen dasar `CardLayanan` dan `Footer`

**Rafi**
- [ ] Setup Express + Prisma  
- [ ] Models: `User`, `Ticket`, `Service`  
- [ ] Endpoint `/login`, `/queue/create`, `/queue/status`

---

### 💬 Hari 4-7 — Antrean & Layanan
**Axel**
- [ ] Tambah panel antrean realtime (WebSocket)
- [ ] Integrasi NPC avatar statis di lobby
- [ ] Trigger panggilan antrean → ruang konsultasi

**Nanda**
- [ ] UI Panel antrean (nomor, estimasi waktu)
- [ ] Popup notifikasi “dipanggil petugas”
- [ ] Responsif mobile + joystick control

**Rafi**
- [ ] WebSocket event antrean (create/join/next)
- [ ] Log antrean di DB  
- [ ] Validasi user token (JWT pendek)

---

### 🎙️ Hari 8-11 — Interaksi & Konsultasi
**Axel**
- [ ] Integrasi TTS (speech synthesis)
- [ ] Animasi avatar petugas (idle → greet → speak)
- [ ] Simulasi percakapan FAQ dari JSON

**Nanda**
- [ ] Desain UI ruang konsultasi (chat + tombol mic/cam)
- [ ] Komponen `DialogConsult` + animasi open/close  
- [ ] Loading feedback + status “mendengarkan”

**Rafi**
- [ ] Endpoint FAQ → fetch JSON dari server  
- [ ] Logging percakapan ke DB  
- [ ] Analitik: durasi sesi + layanan diakses

---

### 🧩 Hari 12-15 — Polishing & Integrasi
**Axel**
- [ ] Sinkronisasi scene + UI event (antrean ke konsultasi)
- [ ] Light & texture tweak (optimasi GPU)
- [ ] Testing integrasi full flow

**Nanda**
- [ ] Styling akhir (warna BPJS, font, padding)
- [ ] UI error fallback (no internet, lag, dsb)
- [ ] Halaman bantuan & kontak Pandawa

**Rafi**
- [ ] Security check (rate limit, file size)
- [ ] Deploy backend ke Render
- [ ] Backup DB otomatis + seed ulang

---

### 🎬 Hari 16-17 — Final & Demo
**Axel**
- [ ] Rekam video demo (alur antre → konsultasi)
- [ ] Fix bug minor 3D scene  
- [ ] Build final ke Vercel

**Nanda**
- [ ] QA tampilan lintas device  
- [ ] Export aset (logo, warna, ikon)
- [ ] Dokumen presentasi + screenshot flow

**Rafi**
- [ ] Generate API Docs (Swagger)
- [ ] Export data dummy (user & antrean)
- [ ] Verifikasi sinkron antar service

---

## 📂 Struktur Proyek
