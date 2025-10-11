# 🎯 RENCANA IMPLEMENTASI CEPAT

## PRIORITAS TINGGI (Implementasi Sekarang)

### 1. Connect Hero Buttons ✅
- File: `src/components/Hero.tsx`
- Tambah `useNavigate()` hook
- Button kandidat → `/register`
- Button perusahaan → `/register-company`

### 2. Create RegisterCompany Page ✅
- File baru: `src/pages/RegisterCompany.tsx`
- Form 3-step wizard
- Validasi real-time
- Auto-login setelah registrasi

### 3. Add Route ✅
- File: `src/App.tsx`
- Import RegisterCompany
- Tambah route `/register-company`

### 4. Dashboard Charts 📊
- Install: `npm install recharts date-fns`
- Buat folder: `src/company/components/charts/`
- Components:
  - ApplicationTrendChart.tsx
  - StatusPieChart.tsx
  - DepartmentBarChart.tsx
- Update CompanyOverview.tsx

## ESTIMASI WAKTU
- Task 1-3: 30 menit
- Task 4: 2-3 jam

## DEPENDENCIES
```json
{
  "recharts": "^2.12.7",
  "date-fns": "^3.3.1"
}
```

## NEXT STEPS
1. Implement Hero buttons
2. Create RegisterCompany
3. Test navigation flow
4. Add charts
5. Verify responsive design
