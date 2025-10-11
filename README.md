# Weng Dev Demo Platform

Platform demo untuk lomba Web Dev: landing marketing + dashboard karir (magang, aplikasi, CV otomatis, portofolio).

## Fitur Utama
- Landing page (hero, fitur kandidat & perusahaan, testimoni, statistik animasi)
- Dashboard dengan routing nested
  - Cari Magang (Apprenticeship Tracker demo)
  - Pelacak Aplikasi (Application Tracker demo)
  - CV Otomatis (AutoCV) – impor mock LinkedIn & impor project portofolio
  - Portofolio – CRUD lokal (localStorage) project + fitur unggulan + filter & pencarian
  - Profil – edit biodata + ringkasan 3 project portofolio
  - Settings / Keamanan (mock)

## Portofolio
Disimpan lokal via `localStorage` (tidak perlu backend). File util: `src/lib/portfolio.ts`.

Fitur:
- Tambah / edit / hapus project
- Upload cover image (base64 demo)
- Tag teknologi & highlights
- Tandai unggulan + reorder otomatis
- Filter by teknologi + pencarian teks
- Integrasi:
  - AutoCV: impor highlight & tech ke ringkasan / keterampilan
  - Profile: preview 3 project teratas (unggulan > terbaru)

## Alur AutoCV
1. Step Upload (mock import) – mengisi data contoh
2. Step Edit – isi / modifikasi field, autosave simulasi (toast)
3. Impor dari Portofolio – merge description + highlights + tech
4. Step Export – pratinjau (PDF generator nanti bisa ditambahkan)

## Konvensi Kode
- Path alias: `@/*` → `src/*` (lihat `tsconfig.app.json`)
- Utility class merge: `cn()` di `src/lib/utils.ts`
- UI components (shadcn + Radix) di `src/components/ui/`
- Bahasa antarmuka: Indonesia
- Preferensi gaya: Tailwind, rounded-xl container, transisi halus

## Menjalankan
```
npm install
npm run dev
```

## Perbaikan Lanjutan (Opsional)
- Migrasi penyimpanan portofolio ke Supabase
- Export AutoCV ke PDF (mis. `pdf-lib` atau serverless)
- Auth nyata (Supabase Auth)
- Real job feed + apply flow terpadu

## Catatan
Ini adalah versi demo fokus showcase fitur & UX. Data hilang bila clear storage kecuali ditambahkan backend.
