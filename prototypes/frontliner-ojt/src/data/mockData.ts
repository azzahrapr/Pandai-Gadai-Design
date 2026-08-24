import type { Milestone, DailyChecklist, PenaksiranRecord, Assessment, AppUser, TaskConfirmation, FLNotification, Course, TargetSpec } from '../types'

// Penilaian model (2026-08-10) — the minimum passing grade (KKM) for each numeric-score
// component. See ScoreBreakdown in types/index.ts and getFlScoreBreakdown() in
// AppContext.tsx for the actual gate logic.
export const KKM_LATIHAN = 75
export const KKM_UJIAN_AKHIR = 75
// Sikap Kerja's KKM (2026-08-12, corrected same day) — 0-100, same scale and same 75
// threshold as KKM_LATIHAN/KKM_UJIAN_AKHIR. Score itself is derived from the official
// curriculum spreadsheet's own formula: (sum of all 5 ratings [4 soft skills + Attitude,
// each rated 1-4] / 20) * 100 — see ScoreBreakdown.sikapKerjaScore in types/index.ts and
// getFlScoreBreakdown() in AppContext.tsx. Doesn't feed getFlScoreBreakdown()'s own
// `evaluasiPassed` directly (that's still just the kanit's own Pernyataan Kelulusan
// recommendation) — instead it gates whether the kanit is even ALLOWED to pick "Lulus"
// there in the first place (see KanitFinalEval.tsx's lulusDisabled), so the two can never
// end up contradicting each other.
export const KKM_SIKAP_KERJA = 75

// Materi placeholder (2026-08-12) — real slide content per module isn't ready yet, so
// every material across every milestone falls back to this shared Google Slides
// placeholder instead of its own written `content` (see SlideViewer's use of this in
// FLMilestoneDetail.tsx: `material.slideUrl ?? PLACEHOLDER_SLIDE_URL`). The written
// `content` text on each material is left untouched in the data below — it's just
// shadowed by this fallback for now — so swapping in the real per-module slide later is
// just setting that material's own `slideUrl`, no data loss to restore from.
export const PLACEHOLDER_SLIDE_URL = 'https://docs.google.com/presentation/d/1VOTzFrxzbV7VbS-IzzIMuWPk-6edIe2FL5BaDSl74sc/embed'

// Resolves a Milestone's or ChecklistItem's effective attempt targets. `carriedOver`
// (kanit approved this item's carry-over from Level 1 into Level 2) adds the item's
// level2Target/level2TargetForPass on top of its base target/targetForPass — untouched
// otherwise. `forPass` falls back to `target` when unset (legacy: every attempt must pass).
export function getEffectiveTarget(spec: TargetSpec, carriedOver: boolean): { attempts: number; forPass: number } {
  const attempts = (spec.target ?? 1) + (carriedOver ? (spec.level2Target ?? 0) : 0)
  const forPass = (spec.targetForPass ?? spec.target ?? 1) + (carriedOver ? (spec.level2TargetForPass ?? spec.level2Target ?? 0) : 0)
  return { attempts, forPass }
}

export interface DailyTaskDef {
  id: string
  name: string
  items: { id: string; text: string }[]
  // Minimum number of items that must be checked to pass this checklist.
  // Defaults to items.length (all items required) when omitted.
  minRequired?: number
}

export const DAILY_TASKS: DailyTaskDef[] = [
  {
    id: 'closing-cabang',
    name: 'SOP Closing Cabang',
    items: [
      { id: 'cc-1', text: 'Pengecekan uang tunai dan saldo Kopra dengan nominal pada sistem Intools' },
      { id: 'cc-2', text: 'Pengecekan Tab Action – Intools, print resi Perpanjangan/Tebus Online' },
      { id: 'cc-3', text: 'Penempelan resi Perpanjangan/Tebus Online ke barang dan pemisahan barang tebus online' },
      { id: 'cc-4', text: 'Pelaporan Closing Cash Opname' },
      { id: 'cc-5', text: 'Pengecekan jumlah unit aktif di gudang dengan data inventory Intools' },
      { id: 'cc-6', text: 'Pelaporan Stock Opname Intools' },
      { id: 'cc-7', text: 'Perapihan kas dan elektronik/laptop/HP cabang ke storage' },
      { id: 'cc-8', text: 'Pelaksanaan dan pelaporan Serah Terima Kunci Cabang' },
      { id: 'cc-9', text: 'Pelaporan pada WAG Cabang' },
    ],
    minRequired: 7,
  },
  {
    id: 'opening-cabang',
    name: 'SOP Opening Cabang',
    items: [
      { id: 'op-1', text: 'Tiba 30 menit sebelum opening cabang' },
      { id: 'op-3', text: 'Persiapan & pembersihan area Frontliner (laptop, HP, printer, alat penaksiran, dan perlengkapan lainnya)' },
      { id: 'op-4', text: 'Pengecekan uang tunai dan saldo Kopra dengan nominal pada sistem Intools' },
      { id: 'op-5', text: 'Memastikan uang tunai tidak lebih dari Rp 15 juta dan tidak kurang dari Rp 7,5 juta' },
      { id: 'op-6', text: 'Pengecekan Tab Action – Intools, print resi Perpanjangan/Tebus Online' },
      { id: 'op-7', text: 'Penempelan resi Perpanjangan/Tebus Online ke barang dan pemisahan barang tebus online' },
      { id: 'op-9', text: 'Pelaporan Opening Cash Opname' },
      { id: 'op-10', text: 'Pengecekan jumlah unit aktif di gudang dengan data inventory Intools' },
      { id: 'op-11', text: 'Pemisahan unit tebus online dan default' },
      { id: 'op-12', text: 'Pelaporan Stock Opname Intools' },
      { id: 'op-13', text: 'Pembersihan area penyimpanan' },
      { id: 'op-14', text: 'Pembersihan area nasabah' },
      { id: 'op-15', text: 'Morning Briefing' },
      { id: 'op-16', text: 'Pelaporan pada WAG Cabang' },
    ],
    minRequired: 10,
  },
  {
    id: 'personal-grooming',
    name: 'Personal Grooming',
    items: [
      { id: 'pg-1', text: 'Seragam rapih dan bersih' },
      { id: 'pg-2', text: 'Tata rias (wajah dan rambut) sesuai standar' },
      { id: 'pg-3', text: 'Sepatu hitam tertutup' },
      { id: 'pg-4', text: 'Aroma tubuh bersih (tidak bau badan)' },
    ],
    minRequired: 3,
  },
  // Level 2's own Personal Grooming (2026-08-12) — split off from the single
  // day-1-13-spanning milestone above into a genuinely separate module, not a
  // continuation. Same checklist form/items reused (same grooming standard, just
  // tracked independently per level) — see the MILESTONES entry below for the target.
  {
    id: 'personal-grooming-l2',
    name: 'Personal Grooming',
    items: [
      { id: 'pg-1', text: 'Seragam rapih dan bersih' },
      { id: 'pg-2', text: 'Tata rias (wajah dan rambut) sesuai standar' },
      { id: 'pg-3', text: 'Sepatu hitam tertutup' },
      { id: 'pg-4', text: 'Aroma tubuh bersih (tidak bau badan)' },
    ],
    minRequired: 3,
  },
  {
    id: 'pengenalan-produk',
    name: 'Pengenalan Produk & Pricing',
    items: [
      { id: 'pp-1', text: 'Menjelaskan biaya dan masa gadai Elektronik (Biaya Jasa, Admin, Asuransi, Masa Gadai, Denda)' },
      { id: 'pp-2', text: 'Menjelaskan biaya dan masa gadai BPKB Instant' },
      { id: 'pp-3', text: 'Menjelaskan biaya dan masa gadai LM Press' },
    ],
  },
  {
    id: 'canvassing',
    name: 'Canvassing',
    items: [
      { id: 'cv-1', text: 'Pelaksanaan canvassing: penjelasan Pandai Gadai kepada calon nasabah' },
      { id: 'cv-2', text: 'Penggunaan Avenza untuk pelaporan canvassing' },
    ],
  },
  {
    id: 'cash-management',
    name: 'Cash Management',
    items: [
      { id: 'cm-1', text: 'Administratif Tarik-Setor Tunai (input laporan di sistem)' },
      { id: 'cm-2', text: 'Administratif Penggunaan Kas Kecil (input pengeluaran di cash management)' },
      { id: 'cm-3', text: 'Administratif Uang Kelebihan Nasabah (arahkan nasabah cek dan input di cash management)' },
    ],
  },
  {
    id: 'sop-administrasi',
    name: 'SOP Administrasi Transaksi',
    items: [
      { id: 'sa-1', text: 'Administratif Transaksi Gadai Baru Elektronik (Intools + Kopra)' },
      { id: 'sa-2', text: 'Administratif Perpanjangan &/ Cicil Elektronik (Intools + Kopra)' },
      { id: 'sa-3', text: 'Administratif Transaksi Tebus Elektronik (Intools + Kopra)' },
      { id: 'sa-4', text: 'Administratif Transaksi Gadai Baru BPKB Instant (Intools + Kopra)' },
      { id: 'sa-5', text: 'Administratif Transaksi Perpanjangan BPKB Instant (Intools + Kopra)' },
      { id: 'sa-6', text: 'Administratif Transaksi Tebus BPKB Instant (Intools + Kopra)' },
      { id: 'sa-7', text: 'Administratif Transaksi Gadai Baru LM Press (Intools + Kopra)' },
      { id: 'sa-8', text: 'Administratif Transaksi Perpanjangan LM Press (Intools + Kopra)' },
      { id: 'sa-9', text: 'Administratif Transaksi Tebus LM Press (Intools + Kopra)' },
    ],
  },
  {
    id: 'packing-sealing',
    name: 'SOP Packing & Penyimpanan Barang Jaminan',
    items: [
      { id: 'ps-1', text: 'Packing dan penyimpanan Handphone/Tablet' },
      { id: 'ps-2', text: 'Packing dan penyimpanan Laptop' },
      { id: 'ps-5', text: 'Packing dan penyimpanan TV' },
      { id: 'ps-6', text: 'Packing dan penyimpanan Game Console' },
      { id: 'ps-7', text: 'Packing dan penyimpanan Smartwatch' },
      { id: 'ps-8', text: 'Packing dan penyimpanan Camera' },
      { id: 'ps-9', text: 'Packing dan penyimpanan BPKB' },
    ],
  },
  {
    id: 'offloading',
    name: 'Offloading',
    items: [
      { id: 'of-1', text: 'Melakukan packing item offload sesuai prosedur' },
    ],
  },
  {
    id: 'pelayanan-nasabah',
    name: 'Pelayanan Nasabah Visit',
    items: [
      { id: 'pn-1', text: 'Sigap berdiri menyambut nasabah (postur siap melayani)' },
      { id: 'pn-2', text: 'Mengucapkan salam sambutan dengan nada antusias' },
      { id: 'pn-3', text: 'Mempersilahkan nasabah duduk dengan intonasi ramah' },
      { id: 'pn-4', text: 'Memperkenalkan diri dan menanyakan keperluan nasabah' },
      { id: 'pn-5', text: 'Memberikan estimasi waktu menunggu' },
      { id: 'pn-6', text: 'Menjelaskan tahapan selanjutnya kepada nasabah' },
      { id: 'pn-7', text: 'Edukasi Aplikasi Pandai Gadai' },
    ],
    minRequired: 5,
  },
  {
    id: 'pelayanan-nasabah-transaksi',
    name: 'Pelayanan Nasabah Transaksi',
    items: [
      { id: 'pnt-1', text: 'Menjelaskan SBG dan Resi kepada nasabah' },
      { id: 'pnt-2', text: 'Mengucapkan terima kasih atas kunjungan/transaksi' },
    ],
    minRequired: 2,
  },
  {
    id: 'customer-service-wa',
    name: 'Customer Service via WA',
    items: [
      { id: 'csw-1', text: 'Reminder jatuh tempo dan penawaran perpanjangan kepada nasabah' },
      { id: 'csw-2', text: 'Menjawab pertanyaan / request / komplain nasabah via WA' },
    ],
  },
  {
    id: 'penaksiran-elektronik',
    name: 'Penaksiran Elektronik',
    items: [
      { id: 'pe-1', text: 'Handphone – Android' },
      { id: 'pe-2', text: 'Tablet' },
      { id: 'pe-3', text: 'Handphone – iPhone' },
      { id: 'pe-4', text: 'iPad' },
      { id: 'pe-5', text: 'Laptop Windows' },
      { id: 'pe-6', text: 'Laptop Chromebook' },
      { id: 'pe-7', text: 'Laptop MacBook' },
      { id: 'pe-8', text: 'Game Console – PlayStation / Xbox' },
      { id: 'pe-9', text: 'Game Console – Nintendo' },
      { id: 'pe-10', text: 'Smartwatch' },
      { id: 'pe-11', text: 'Camera' },
    ],
  },
  {
    id: 'penaksiran-emas',
    name: 'Penaksiran Emas LM Press',
    items: [
      { id: 'pem-1', text: 'Penaksiran LM Press sesuai prosedur standar' },
    ],
  },
  {
    id: 'penaksiran-bpkb',
    name: 'Penaksiran BPKB',
    items: [
      { id: 'pbk-1', text: 'Penaksiran BPKB Instant sesuai prosedur standar' },
    ],
  },
]

export const MILESTONES: Milestone[] = [
  {
    id: 'closing-cabang',
    name: 'SOP Closing Cabang',
    shortName: 'Closing Cabang',
    type: 'minggu1',
    order: 1,
    description: 'Prosedur penutupan cabang harian sesuai SOP operasional',
    unlockDay: 1,
    estimatedMinutes: 30,
    target: 3,
    targetForPass: 1,
    materials: [
      {
        id: 'cc-m1',
        title: 'Alur SOP Closing Cabang',
        content: `## SOP Closing Cabang\n\n### Langkah-langkah:\n1. **Pengecekan Kas & Kopra** — Cocokan uang tunai fisik + saldo Kopra dengan nominal di Intools\n2. **Tab Action Intools** — Cek Tab Action, print resi Perpanjangan/Tebus Online\n3. **Penempelan Resi** — Tempel resi ke barang, pisahkan barang tebus online\n4. **Closing Cash Opname** — Hitung uang fisik di laci kas, cocokkan dengan saldo Kopra dan data di Intools, laporkan via sistem — jangan ada selisih yang tidak terdokumentasi\n5. **Pengecekan Unit Gudang** — Verifikasi jumlah unit aktif vs data inventory Intools\n6. **Stock Opname** — Hitung semua unit barang aktif di gudang, cocokkan dengan data inventory, pisahkan barang Tebus Online, laporkan di Intools sebelum meninggalkan cabang\n7. **Perapihan Barang** — Simpan kas dan elektronik/laptop/HP cabang ke storage\n8. **Serah Terima Kunci** — Laksanakan dan laporkan serah terima kunci cabang\n9. **Pelaporan WAG Cabang** — Laporkan status closing di grup WhatsApp cabang`,
        slideUrl: 'https://docs.google.com/presentation/d/1VOTzFrxzbV7VbS-IzzIMuWPk-6edIe2FL5BaDSl74sc/embed',
      },
    ],
    checklistItems: [
      { id: 'cc-1', text: 'Pengecekan uang tunai dan saldo Kopra dengan nominal pada sistem Intools', category: 'Kas' },
      { id: 'cc-2', text: 'Pengecekan Tab Action – Intools, print resi Perpanjangan/Tebus Online', category: 'Intools' },
      { id: 'cc-3', text: 'Penempelan resi Perpanjangan/Tebus Online ke barang dan pemisahan barang tebus online', category: 'Gudang' },
      { id: 'cc-4', text: 'Pelaporan Closing Cash Opname', category: 'Pelaporan' },
      { id: 'cc-5', text: 'Pengecekan jumlah unit aktif di gudang dengan data inventory Intools', category: 'Gudang' },
      { id: 'cc-6', text: 'Pelaporan Stock Opname Intools', category: 'Pelaporan' },
      { id: 'cc-7', text: 'Perapihan kas dan elektronik/laptop/HP cabang ke storage', category: 'Keamanan' },
      { id: 'cc-8', text: 'Pelaksanaan dan pelaporan Serah Terima Kunci Cabang', category: 'Keamanan' },
      { id: 'cc-9', text: 'Pelaporan pada WAG Cabang', category: 'Pelaporan' },
    ],
    quiz: [
      {
        id: 'cc-q1',
        question: 'Apa yang harus dicocokkan saat Pengecekan Kas & Kopra ketika closing cabang?',
        options: ['Uang tunai fisik + saldo Kopra dengan nominal di Intools', 'Hanya uang tunai fisik', 'Hanya saldo Kopra', 'Jumlah nasabah hari itu'],
        correctIndex: 0,
      },
      {
        id: 'cc-q2',
        question: 'Sebelum disimpan ke storage, barang tebus online harus...',
        options: ['Dibuang', 'Dipisahkan dari barang lain', 'Digabung dengan barang aktif', 'Dikirim ke gudang pusat'],
        correctIndex: 1,
      },
      {
        id: 'cc-q3',
        question: 'Apa langkah TERAKHIR dalam SOP Closing Cabang?',
        options: ['Stock Opname', 'Cash Opname', 'Serah Terima Kunci Cabang', 'Morning Briefing'],
        correctIndex: 2,
      },
    ],
  },
  {
    id: 'opening-cabang',
    name: 'SOP Opening Cabang',
    shortName: 'Opening Cabang',
    type: 'minggu1',
    order: 2,
    description: 'Prosedur pembukaan cabang harian sesuai SOP operasional',
    unlockDay: 4,
    estimatedMinutes: 30,
    target: 3,
    targetForPass: 1,
    materials: [
      {
        id: 'op-m1',
        title: 'Alur SOP Opening Cabang',
        content: `## SOP Opening Cabang\n\n### Langkah-langkah:\n1. **Tiba tepat waktu** — Hadir 30 menit sebelum opening cabang\n2. **Persiapan & pembersihan area Frontliner** — Siapkan laptop, HP, printer, alat penaksiran, dan perlengkapan lainnya\n3. **Pengecekan Kas** — Cocokan uang tunai + saldo Kopra dengan Intools\n4. **Batas kas** — Pastikan uang tunai tidak lebih Rp 15 juta dan tidak kurang Rp 7,5 juta. Jika di luar batas: laporkan ke Kanit segera, proses tarik/setor sesuai SOP Cash Management, dan catat transaksinya di sistem\n5. **Tab Action Intools** — Cek, print, dan tempel resi Perpanjangan/Tebus Online\n6. **Cash Opname** — Laporkan Opening Cash Opname\n7. **Stock Opname** — Cek unit gudang vs inventory Intools, pisahkan tebus online & default\n8. **Kebersihan** — Bersihkan area penyimpanan dan area nasabah\n9. **Morning Briefing** — Ikuti briefing pagi\n10. **Pelaporan WAG Cabang** — Laporkan status opening di grup WhatsApp cabang`,
        slideUrl: 'https://docs.google.com/presentation/d/1VOTzFrxzbV7VbS-IzzIMuWPk-6edIe2FL5BaDSl74sc/embed',
      },
    ],
    checklistItems: [
      { id: 'op-1', text: 'Tiba 30 menit sebelum opening cabang', category: 'Kehadiran' },
      { id: 'op-3', text: 'Persiapan & pembersihan area Frontliner (laptop, HP, printer, alat penaksiran, dan perlengkapan lainnya)', category: 'Persiapan' },
      { id: 'op-4', text: 'Pengecekan uang tunai dan saldo Kopra dengan nominal pada sistem Intools', category: 'Kas' },
      { id: 'op-5', text: 'Memastikan uang tunai tidak lebih dari Rp 15 juta dan tidak kurang dari Rp 7,5 juta', category: 'Kas' },
      { id: 'op-6', text: 'Pengecekan Tab Action – Intools, print resi Perpanjangan/Tebus Online', category: 'Intools' },
      { id: 'op-7', text: 'Penempelan resi Perpanjangan/Tebus Online ke barang dan pemisahan barang tebus online', category: 'Gudang' },
      { id: 'op-9', text: 'Pelaporan Opening Cash Opname', category: 'Pelaporan' },
      { id: 'op-10', text: 'Pengecekan jumlah unit aktif di gudang dengan data inventory Intools', category: 'Gudang' },
      { id: 'op-11', text: 'Pemisahan unit tebus online dan default', category: 'Gudang' },
      { id: 'op-12', text: 'Pelaporan Stock Opname Intools', category: 'Pelaporan' },
      { id: 'op-13', text: 'Pembersihan area penyimpanan', category: 'Kebersihan' },
      { id: 'op-14', text: 'Pembersihan area nasabah', category: 'Kebersihan' },
      { id: 'op-15', text: 'Morning Briefing', category: 'Briefing' },
      { id: 'op-16', text: 'Pelaporan pada WAG Cabang', category: 'Pelaporan' },
    ],
    quiz: [
      {
        id: 'op-q1',
        question: 'Berapa batas kas cabang yang harus dipastikan saat opening?',
        options: ['Tidak lebih Rp15 juta dan tidak kurang Rp7,5 juta', 'Tidak lebih Rp10 juta dan tidak kurang Rp5 juta', 'Tidak ada batas', 'Tidak lebih Rp20 juta'],
        correctIndex: 0,
      },
      {
        id: 'op-q2',
        question: 'Berapa menit sebelum opening cabang, Frontliner harus sudah tiba?',
        options: ['15 menit', '30 menit', '45 menit', '60 menit'],
        correctIndex: 1,
      },
      {
        id: 'op-q3',
        question: 'Apa yang harus dilakukan jika kas cabang melebihi batas atas?',
        options: ['Dibiarkan saja', 'Setor ke bank', 'Disimpan di laci lain', 'Dilaporkan ke nasabah'],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 'personal-grooming',
    name: 'Personal Grooming',
    shortName: 'Grooming',
    type: 'minggu1',
    order: 3,
    description: 'Standar penampilan Frontliner: seragam, tata rias, aroma tubuh',
    unlockDay: 1,
    estimatedMinutes: 15,
    // Level-1-only now (2026-08-12) — was a single milestone spanning both weeks (12
    // days total, days 1-13 minus day 7); split into this L1-only version (target 6,
    // days 1-6) plus a genuinely separate 'personal-grooming-l2' milestone below (also
    // target 6, days 8-13) — not a continuation of this one, its own independent
    // progress/quiz. Still noRemedial: must be done in full every day, no catch-up.
    target: 6,
    targetForPass: 4,
    noRemedial: true,
    materials: [
      {
        id: 'pg-m1',
        title: 'Standar Penampilan Frontliner',
        content: `## Standar Personal Grooming\n\n### Komponen Wajib:\n- **Seragam** — Rapih, bersih, tidak kusut atau bernoda\n- **Tata Rias** — Wajah dan rambut sesuai standar perusahaan\n- **Sepatu** — Hitam, tertutup, bersih\n- **Aroma** — Bersih, tidak bau badan\n\n### Tips Menjaga Standar:\n1. Siapkan seragam malam sebelumnya agar tidak terburu-buru\n2. Pastikan sepatu bersih sebelum berangkat\n3. Bawa perlengkapan grooming cadangan di tas\n4. Cek penampilan di cermin sebelum membuka cabang`,
      },
    ],
    checklistItems: [
      { id: 'pg-1', text: 'Seragam rapih dan bersih', category: 'Penampilan' },
      { id: 'pg-2', text: 'Tata rias (wajah dan rambut) sesuai standar', category: 'Penampilan' },
      { id: 'pg-3', text: 'Sepatu hitam tertutup', category: 'Penampilan' },
      { id: 'pg-4', text: 'Aroma tubuh bersih (tidak bau badan)', category: 'Penampilan', kondisiIdeal: 'Tidak bau badan' },
    ],
    quiz: [
      {
        id: 'pg-q1',
        question: 'Manakah yang TIDAK termasuk komponen wajib Personal Grooming?',
        options: ['Seragam rapih dan bersih', 'Tata rias sesuai standar', 'Sepatu hitam tertutup', 'Membawa parfum bermerek tertentu'],
        correctIndex: 3,
      },
      {
        id: 'pg-q2',
        question: 'Standar sepatu yang harus dipakai adalah...',
        options: ['Hitam, tertutup', 'Putih, terbuka', 'Coklat, tertutup', 'Bebas asal rapi'],
        correctIndex: 0,
      },
      {
        id: 'pg-q3',
        question: 'Tips apa yang disarankan agar tidak terburu-buru sebelum berangkat?',
        options: ['Menyiapkan seragam malam sebelumnya', 'Datang lebih siang', 'Melewati sarapan', 'Menitipkan seragam ke teman'],
        correctIndex: 0,
      },
    ],
  },
  // Level 2's own Personal Grooming (2026-08-12, see the L1 entry's comment above for
  // why this is now a separate milestone rather than day-1-13 carry-over). Same
  // materials/checklist/quiz content reused — same grooming standard, independent
  // tracking. unlockDay:12 matches the other 6 Level 2 modules' quiz-unlock staggering
  // (all restaggered from 8 to 12 the same day) — see Pelayanan Nasabah Visit's
  // unlockDay comment for that mechanic.
  {
    id: 'personal-grooming-l2',
    name: 'Personal Grooming',
    shortName: 'Grooming',
    type: 'minggu2',
    order: 9,
    description: 'Standar penampilan Frontliner: seragam, tata rias, aroma tubuh',
    unlockDay: 12,
    estimatedMinutes: 15,
    target: 6,
    targetForPass: 4,
    noRemedial: true,
    materials: [
      {
        id: 'pgl2-m1',
        title: 'Standar Penampilan Frontliner',
        content: `## Standar Personal Grooming\n\n### Komponen Wajib:\n- **Seragam** — Rapih, bersih, tidak kusut atau bernoda\n- **Tata Rias** — Wajah dan rambut sesuai standar perusahaan\n- **Sepatu** — Hitam, tertutup, bersih\n- **Aroma** — Bersih, tidak bau badan\n\n### Tips Menjaga Standar:\n1. Siapkan seragam malam sebelumnya agar tidak terburu-buru\n2. Pastikan sepatu bersih sebelum berangkat\n3. Bawa perlengkapan grooming cadangan di tas\n4. Cek penampilan di cermin sebelum membuka cabang`,
      },
    ],
    checklistItems: [
      { id: 'pg-1', text: 'Seragam rapih dan bersih', category: 'Penampilan' },
      { id: 'pg-2', text: 'Tata rias (wajah dan rambut) sesuai standar', category: 'Penampilan' },
      { id: 'pg-3', text: 'Sepatu hitam tertutup', category: 'Penampilan' },
      { id: 'pg-4', text: 'Aroma tubuh bersih (tidak bau badan)', category: 'Penampilan', kondisiIdeal: 'Tidak bau badan' },
    ],
    quiz: [
      {
        id: 'pg-q1',
        question: 'Manakah yang TIDAK termasuk komponen wajib Personal Grooming?',
        options: ['Seragam rapih dan bersih', 'Tata rias sesuai standar', 'Sepatu hitam tertutup', 'Membawa parfum bermerek tertentu'],
        correctIndex: 3,
      },
      {
        id: 'pg-q2',
        question: 'Standar sepatu yang harus dipakai adalah...',
        options: ['Hitam, tertutup', 'Putih, terbuka', 'Coklat, tertutup', 'Bebas asal rapi'],
        correctIndex: 0,
      },
      {
        id: 'pg-q3',
        question: 'Tips apa yang disarankan agar tidak terburu-buru sebelum berangkat?',
        options: ['Menyiapkan seragam malam sebelumnya', 'Datang lebih siang', 'Melewati sarapan', 'Menitipkan seragam ke teman'],
        correctIndex: 0,
      },
    ],
  },
  {
    id: 'pengenalan-produk',
    name: 'Pengenalan Produk & Pricing',
    shortName: 'Produk & Pricing',
    type: 'minggu1',
    order: 4,
    description: 'Kemampuan menjelaskan produk gadai, biaya, dan jenis transaksi kepada nasabah',
    // Staggered 2026-08-12 (was 2) as part of a real Level-1 curriculum pacing fix — see
    // the matching comment on Canvassing's unlockDay below for the full staggered
    // schedule and why this changed from a same-day free-for-all to a real progression.
    unlockDay: 3,
    estimatedMinutes: 30,
    target: 3,
    targetForPass: 1,
    materials: [
      {
        id: 'pp-m1',
        title: 'Pengenalan Produk & Pricing',
        content: `## Pengenalan Produk & Pricing\n\n### Gadai Elektronik\n**Komponen Biaya:**\n- **Biaya Jasa** — Bunga gadai per periode\n- **Biaya Admin** — Biaya administrasi awal\n- **Asuransi** — Perlindungan barang selama masa gadai\n- **Masa Gadai** — Durasi standar gadai elektronik\n- **Denda** — Biaya keterlambatan setelah jatuh tempo\n\n**Jenis Transaksi:**\n1. **Gadai Baru** — Nasabah menggadaikan barang pertama kali\n2. **Perpanjangan** — Memperpanjang masa gadai tanpa tebus\n3. **Cicil** — Membayar sebagian pokok untuk kurangi nilai gadai\n4. **Tebus** — Melunasi pinjaman dan mengambil barang kembali\n\n### BPKB Instant\n- Biaya Jasa dihitung berbeda dari gadai elektronik\n- Masa gadai BPKB Instant sesuai ketentuan yang berlaku\n- Prosedur administrasi melibatkan Intools dan Kopra\n\n**Yang Perlu Disampaikan ke Nasabah:**\n1. Syarat dokumen: BPKB asli + STNK aktif + KTP pemilik\n2. Proses verifikasi dokumen\n3. Estimasi nilai taksiran berdasarkan kendaraan\n4. Timeline pencairan dana\n\n### LM Press (Emas)\n- Biaya Jasa dihitung berdasarkan berat dan harga spot emas\n- Masa gadai LM Press sesuai ketentuan yang berlaku\n- Prosedur administrasi melibatkan Intools dan Kopra\n\n**Yang Perlu Disampaikan ke Nasabah:**\n1. Syarat: emas batang LM Press asli (idealnya bersertifikat Antam)\n2. Proses verifikasi keaslian dan penaksiran\n3. Estimasi nilai taksiran berdasarkan berat dan harga spot hari itu\n4. Timeline pencairan dana`,
      },
    ],
    checklistItems: [
      { id: 'pp-1', text: 'Menjelaskan biaya dan masa gadai Elektronik (Biaya Jasa, Admin, Asuransi, Masa Gadai, Denda)', category: 'Produk', kondisiIdeal: 'Menjelaskan Biaya Jasa, Biaya Admin, Biaya Asuransi, Masa Gadai, dan Biaya Denda' },
      { id: 'pp-2', text: 'Menjelaskan biaya dan masa gadai BPKB Instant', category: 'Produk', kondisiIdeal: 'Menjelaskan Biaya Jasa, Biaya Admin, Biaya Asuransi, Masa Gadai, dan Biaya Denda' },
      { id: 'pp-3', text: 'Menjelaskan biaya dan masa gadai LM Press', category: 'Produk' },
    ],
    quiz: [
      {
        id: 'pp-q1',
        question: 'Apa yang dimaksud dengan transaksi "Cicil" pada produk gadai?',
        options: ['Menggadaikan barang pertama kali', 'Memperpanjang masa gadai tanpa tebus', 'Membayar sebagian pokok untuk mengurangi nilai gadai', 'Melunasi pinjaman dan mengambil kembali barang'],
        correctIndex: 2,
      },
      {
        id: 'pp-q2',
        question: 'Dokumen apa yang WAJIB disiapkan nasabah untuk gadai BPKB Instant?',
        options: ['BPKB asli + STNK aktif + KTP pemilik', 'KTP saja', 'STNK saja', 'Kwitansi pembelian kendaraan'],
        correctIndex: 0,
      },
      {
        id: 'pp-q3',
        question: 'Manakah yang termasuk komponen biaya gadai Elektronik?',
        options: ['Biaya Jasa, Admin, Asuransi, Masa Gadai, Denda', 'Hanya bunga bank', 'Pajak kendaraan', 'Biaya notaris'],
        correctIndex: 0,
      },
    ],
  },
  {
    id: 'canvassing',
    name: 'Canvassing',
    shortName: 'Canvassing',
    type: 'minggu1',
    order: 5,
    description: 'Teknik canvassing aktif dan pelaporan menggunakan Avenza',
    // Level 1 quiz-unlock staggering (2026-08-12) — was `unlockDay: 1` like almost every
    // other Level 1 module, meaning every mini quiz opened on Day 1 with zero pacing.
    // `unlockDay` only ever gates quiz availability (`quizUnlocked`/`quizStartDay` in
    // FLDashboard.tsx/FLMilestoneDetail.tsx) — it never gates materi/latihan visibility,
    // so this is a quiz-timing-only change, safe to apply platform-wide. New staggered
    // schedule across the Level 1 week (closing-cabang + personal-grooming stay Day 1,
    // opening-cabang stays Day 4 — both already had real pacing): Pengenalan Produk &
    // Canvassing → Day 3, Cash Management → Day 4, SOP Administrasi → Day 5,
    // Packing & Sealing + Offloading → Day 6.
    unlockDay: 3,
    estimatedMinutes: 30,
    // Carries over into Level 2 if a kanit approves it — see level2Target/level2TargetForPass.
    target: 2,
    targetForPass: 1,
    level2Target: 2,
    level2TargetForPass: 1,
    materials: [
      {
        id: 'cv-m1',
        title: 'Canvassing',
        content: `## Canvassing\n\nCanvassing adalah kegiatan aktif mendatangi calon nasabah untuk memperkenalkan produk gadai.\n\n### Langkah Canvassing Efektif:\n1. **Sapa** — Sapa ramah, perkenalkan diri dan Pandai Gadai\n2. **Tanya** — Identifikasi kebutuhan dana calon nasabah\n3. **Ceritakan** — Manfaat & keunggulan Pandai Gadai (cepat, aman, mudah)\n4. **Tawarkan** — Produk yang relevan (gadai elektronik, BPKB)\n5. **Tutup** — Ajak ke cabang atau catat kontak untuk follow up\n\n### Tips:\n- Tersenyum sepanjang percakapan\n- Nada percaya diri tapi tidak memaksa\n- Kenali area canvassing: pasar, pertokoan, perumahan\n\n### Pelaporan via Avenza\nAvenza adalah aplikasi peta yang digunakan untuk melaporkan aktivitas canvassing secara geolokasi.\n\n**Cara Penggunaan:**\n1. Buka aplikasi Avenza di smartphone\n2. Aktifkan GPS sebelum mulai canvassing\n3. Tandai setiap titik canvassing yang dikunjungi\n4. Isi data calon nasabah di setiap titik\n5. Submit laporan setelah selesai canvassing\n\n**Yang Dicatat:**\n- Nama dan kontak calon nasabah\n- Respons calon nasabah (tertarik/tidak/follow up)\n- Lokasi (otomatis tercatat via GPS)`,
      },
    ],
    checklistItems: [
      { id: 'cv-1', text: 'Pelaksanaan canvassing: penjelasan Pandai Gadai kepada calon nasabah', category: 'Eksekusi' },
      { id: 'cv-2', text: 'Penggunaan Avenza untuk pelaporan canvassing', category: 'Pelaporan' },
    ],
    quiz: [
      {
        id: 'cv-q1',
        question: 'Aplikasi apa yang digunakan untuk melaporkan aktivitas canvassing secara geolokasi?',
        options: ['Google Maps', 'Avenza', 'Intools', 'Talenta'],
        correctIndex: 1,
      },
      {
        id: 'cv-q2',
        question: 'Manakah urutan langkah canvassing yang benar?',
        options: [
          'Tawarkan → Tanya → Sapa → Ceritakan → Tutup',
          'Sapa → Tanya → Ceritakan → Tawarkan → Tutup',
          'Ceritakan → Sapa → Tawarkan → Tanya → Tutup',
          'Tanya → Sapa → Tawarkan → Ceritakan → Tutup',
        ],
        correctIndex: 1,
      },
      {
        id: 'cv-q3',
        question: 'Apa yang harus diaktifkan sebelum mulai canvassing saat menggunakan Avenza?',
        options: ['WiFi', 'Bluetooth', 'GPS', 'NFC'],
        correctIndex: 2,
      },
    ],
  },
  {
    id: 'cash-management',
    name: 'SOP Cash Management',
    shortName: 'Cash Mgmt',
    type: 'minggu1',
    order: 6,
    description: 'Administratif tarik-setor tunai, kas kecil, dan uang kelebihan nasabah',
    unlockDay: 4,
    estimatedMinutes: 30,
    materials: [
      {
        id: 'cm-m1',
        title: 'Tarik-Setor Tunai Cabang',
        content: `## Tarik-Setor Tunai Cabang\n\n- Dilakukan saat saldo kas mendekati batas atas (Rp 15 juta) atau batas bawah (Rp 7,5 juta)\n- Input laporan tarik/setor di sistem setelah transaksi bank selesai\n- Lampirkan bukti transaksi bank`,
      },
      {
        id: 'cm-m2',
        title: 'Kas Kecil Cabang',
        content: `## Kas Kecil Cabang\n\n- Digunakan untuk pengeluaran operasional cabang (alat tulis, kebersihan, dll)\n- Setiap pengeluaran harus diinput di modul Cash Management\n- Simpan bukti/nota setiap pengeluaran`,
      },
      {
        id: 'cm-m3',
        title: 'Uang Kelebihan',
        content: `## Uang Kelebihan Nasabah\n\n- Jika nasabah membayar lebih dari yang seharusnya\n- Arahkan nasabah untuk cek kelebihan via aplikasi atau langsung di cabang\n- Input selisih kelebihan di modul Cash Management`,
      },
    ],
    submissionType: 'individual',
    checklistItems: [
      { id: 'cm-1', text: 'Administratif Tarik-Setor Tunai', category: 'Kas', description: 'Mampu menginput laporan tarik setor tunai di sistem.', target: 1, targetForPass: 1, kondisiIdeal: 'Mampu menginput laporan tarik setor tunai' },
      { id: 'cm-2', text: 'Administratif Penggunaan Kas Kecil', category: 'Kas Kecil', description: 'Mampu menginput pengeluaran kas kecil pada modul cash management.', target: 1, targetForPass: 1, kondisiIdeal: 'Mampu menginput pengeluaran kas kecil pada cash management' },
      { id: 'cm-3', text: 'Administratif Uang Kelebihan Nasabah', category: 'Nasabah', description: 'Mampu mengarahkan nasabah dalam pengecekan uang kelebihan dan penginputannya pada cash management.', target: 1, targetForPass: 1, kondisiIdeal: 'Mampu mengarahkan nasabah dalam pengecekan uang kelebihan dan penginputannya pada cash management' },
    ],
    quiz: [
      {
        id: 'cm-q1',
        question: 'Kapan tarik-setor tunai dilakukan?',
        options: ['Setiap ada nasabah baru', 'Saat saldo kas mendekati batas atas atau batas bawah', 'Setiap akhir bulan', 'Hanya atas perintah kanit'],
        correctIndex: 1,
      },
      {
        id: 'cm-q2',
        question: 'Kas kecil digunakan untuk keperluan apa?',
        options: ['Modal gadai nasabah', 'Pengeluaran operasional cabang (alat tulis, kebersihan, dll)', 'Gaji karyawan', 'Investasi cabang'],
        correctIndex: 1,
      },
      {
        id: 'cm-q3',
        question: 'Jika nasabah membayar lebih dari seharusnya, apa yang harus dilakukan?',
        options: ['Uang disimpan tanpa dicatat', 'Nasabah diminta ambil tunai langsung tanpa proses', 'Arahkan nasabah cek kelebihan via aplikasi/cabang dan input selisih di Cash Management', 'Diabaikan'],
        correctIndex: 2,
      },
    ],
  },
  {
    id: 'sop-administrasi',
    name: 'SOP Administrasi Transaksi',
    shortName: 'Administrasi',
    type: 'minggu1',
    order: 7,
    description: 'Prosedur administratif transaksi Gadai Baru, Perpanjangan, Cicil, dan Tebus untuk Elektronik, BPKB, dan LM Press via Intools dan Kopra',
    unlockDay: 5,
    estimatedMinutes: 45,
    materials: [
      {
        id: 'sa-m1',
        title: 'SOP Administrasi Gadai Baru Elektronik',
        content: `## Gadai Baru Elektronik\n\n1. Input data nasabah dan barang di Intools\n2. Proses pencairan di Kopra\n3. Cetak SBG dan berikan ke nasabah`,
      },
      {
        id: 'sa-m2',
        title: 'SOP Administrasi Perpanjangan / Cicil Elektronik',
        content: `## Perpanjangan / Cicil Elektronik\n\n1. Cari transaksi aktif nasabah di Intools\n2. Pilih opsi Perpanjangan atau Cicil\n3. Proses pembayaran di Kopra\n4. Update data dan cetak SBG baru`,
      },
      {
        id: 'sa-m3',
        title: 'SOP Administrasi Tebus Elektronik',
        content: `## Tebus Elektronik\n\n1. Cari transaksi aktif di Intools\n2. Hitung total pelunasan (pokok + biaya)\n3. Proses pembayaran di Kopra\n4. Cetak bukti tebus, serahkan barang ke nasabah`,
      },
      {
        id: 'sa-m4',
        title: 'SOP Administrasi Gadai Baru BPKB Instant',
        content: `## Gadai Baru BPKB Instant\n\n1. Verifikasi dokumen (BPKB, STNK, KTP)\n2. Input data kendaraan dan nasabah di Intools\n3. Proses pencairan di Kopra\n4. Cetak SBG dan berikan ke nasabah`,
      },
      {
        id: 'sa-m5',
        title: 'SOP Administrasi Perpanjangan BPKB Instant',
        content: `## Perpanjangan BPKB Instant\n\n1. Cari transaksi BPKB aktif di Intools\n2. Proses perpanjangan dan pembayaran di Kopra\n3. Update data jatuh tempo, cetak SBG baru`,
      },
      {
        id: 'sa-m6',
        title: 'SOP Administrasi Tebus BPKB Instant',
        content: `## Tebus BPKB Instant\n\n1. Verifikasi identitas nasabah\n2. Proses pelunasan di Intools + Kopra\n3. Serahkan BPKB dan dokumen ke nasabah`,
      },
      {
        id: 'sa-m7',
        title: 'SOP Administrasi Gadai Baru LM Press',
        content: `## Gadai Baru LM Press\n\n1. Verifikasi keaslian emas batang (hologram & sertifikat Antam) di Intools\n2. Input data nasabah dan hasil taksiran di Intools\n3. Proses pencairan di Kopra\n4. Cetak SBG dan berikan ke nasabah`,
      },
      {
        id: 'sa-m8',
        title: 'SOP Administrasi Perpanjangan LM Press (Emas)',
        content: `## Perpanjangan LM Press (Emas)\n\n1. Cari transaksi LM Press aktif di Intools\n2. Proses perpanjangan dan pembayaran di Kopra\n3. Update data jatuh tempo, cetak SBG baru`,
      },
      {
        id: 'sa-m9',
        title: 'SOP Administrasi Tebus LM Press (Emas)',
        content: `## Tebus LM Press (Emas)\n\n1. Cari transaksi aktif di Intools, hitung total pelunasan\n2. Proses pembayaran di Kopra\n3. Cetak bukti tebus, serahkan emas batang ke nasabah`,
      },
    ],
    submissionType: 'individual',
    checklistItems: [
      { id: 'sa-1', text: 'Gadai Baru Elektronik', category: 'Elektronik', description: 'Input data nasabah & barang di Intools, proses pencairan di Kopra, cetak SBG.', target: 2, targetForPass: 1, level2Target: 4, level2TargetForPass: 2 },
      { id: 'sa-2', text: 'Perpanjangan / Cicil Elektronik', category: 'Elektronik', description: 'Cari transaksi aktif, pilih perpanjangan/cicil, proses di Kopra, cetak SBG baru.', target: 2, targetForPass: 1, level2Target: 4, level2TargetForPass: 2 },
      { id: 'sa-3', text: 'Tebus Elektronik', category: 'Elektronik', description: 'Cari transaksi aktif, hitung total pelunasan, proses di Kopra, serahkan barang.', target: 2, targetForPass: 1, level2Target: 4, level2TargetForPass: 2 },
      { id: 'sa-4', text: 'Gadai Baru BPKB Instant', category: 'BPKB', description: 'Verifikasi dokumen (BPKB, STNK, KTP), input di Intools, proses pencairan di Kopra.', target: 2, targetForPass: 1, level2Target: 2, level2TargetForPass: 1 },
      { id: 'sa-5', text: 'Perpanjangan BPKB Instant', category: 'BPKB', description: 'Cari transaksi BPKB aktif, proses perpanjangan di Kopra, update jatuh tempo.', target: 2, targetForPass: 1, level2Target: 2, level2TargetForPass: 1 },
      { id: 'sa-6', text: 'Tebus BPKB Instant', category: 'BPKB', description: 'Verifikasi identitas, proses pelunasan di Intools + Kopra, serahkan BPKB.', target: 2, targetForPass: 1, level2Target: 2, level2TargetForPass: 1 },
      { id: 'sa-7', text: 'Gadai Baru LM Press', category: 'LM Press', description: 'Verifikasi keaslian emas batang, input data & hasil taksiran di Intools, proses pencairan di Kopra, cetak SBG.', target: 2, targetForPass: 1, level2Target: 2, level2TargetForPass: 1 },
      { id: 'sa-8', text: 'Perpanjangan LM Press (Emas)', category: 'LM Press', description: 'Cari transaksi LM Press aktif, proses perpanjangan di Kopra, update jatuh tempo.', target: 2, targetForPass: 1, level2Target: 2, level2TargetForPass: 1 },
      { id: 'sa-9', text: 'Tebus LM Press (Emas)', category: 'LM Press', description: 'Cari transaksi aktif, hitung total pelunasan, proses di Kopra, serahkan emas batang.', target: 2, targetForPass: 1, level2Target: 2, level2TargetForPass: 1 },
    ],
    quiz: [
      {
        id: 'sa-q1',
        question: 'Sistem apa yang digunakan untuk proses pencairan dana pada Gadai Baru Elektronik?',
        options: ['Kopra', 'Avenza', 'Talenta', 'Google Slides'],
        correctIndex: 0,
      },
      {
        id: 'sa-q2',
        question: 'Apa langkah pertama saat memproses Tebus Elektronik?',
        options: ['Cetak SBG baru', 'Cari transaksi aktif di Intools', 'Input data nasabah baru', 'Verifikasi dokumen BPKB'],
        correctIndex: 1,
      },
      {
        id: 'sa-q3',
        question: 'Dokumen apa saja yang perlu diverifikasi untuk Gadai Baru BPKB Instant?',
        options: ['BPKB, STNK, KTP', 'Hanya KTP', 'Hanya BPKB', 'SIM dan KTP'],
        correctIndex: 0,
      },
    ],
  },
  {
    id: 'packing-sealing',
    name: 'SOP Packing & Penyimpanan Barang Jaminan',
    shortName: 'Packing',
    type: 'minggu1',
    order: 8,
    description: 'Teknik packing dan penyimpanan semua jenis barang gadai sesuai standar',
    unlockDay: 6,
    estimatedMinutes: 30,
    materials: [
      {
        id: 'ps-m1',
        title: 'Packing & Penyimpanan Handphone/Tablet',
        content: `## Packing & Penyimpanan Handphone/Tablet\n\n- **Dengan box** — Masukkan ke box asli, seal, tempel label SBG\n- **Tanpa box** — Bungkus bubble wrap, masukkan kantong plastik, tempel label\n\n### Label Wajib:\n1. Nomor SBG\n2. Nama nasabah\n3. Deskripsi barang\n4. Tanggal gadai & jatuh tempo`,
      },
      {
        id: 'ps-m2',
        title: 'Packing & Penyimpanan Laptop',
        content: `## Packing & Penyimpanan Laptop\n\n- **Dengan box** — Masukkan ke box asli, pastikan charger ikut terpacking\n- **Tanpa box** — Bungkus bubble wrap tebal, lapisi kardus, tempel label\n\nGunakan label wajib yang sama: nomor SBG, nama nasabah, deskripsi barang, tanggal gadai & jatuh tempo.`,
      },
      {
        id: 'ps-m3',
        title: 'Packing & Penyimpanan TV',
        content: `## Packing & Penyimpanan TV\n\n- Gunakan kemasan sesuai ukuran layar\n- Tambahkan pelindung sudut karena barang besar dan berat\n- Tandai "FRAGILE" pada kemasan\n- Tempel stiker segel setelah dikemas, tulis tanggal dan paraf di atasnya`,
      },
      {
        id: 'ps-m4',
        title: 'Packing & Penyimpanan Game Console',
        content: `## Packing & Penyimpanan Game Console\n\n- Kemas dengan aman menggunakan bubble wrap\n- Sertakan semua aksesori (controller, kabel) dalam satu kemasan\n- Tempel label SBG lengkap dan stiker segel`,
      },
      {
        id: 'ps-m5',
        title: 'Packing & Penyimpanan Smartwatch',
        content: `## Packing & Penyimpanan Smartwatch\n\n- Gunakan kemasan kecil yang sesuai ukuran\n- Tambahkan padding agar tidak tergores/terbentur\n- Tempel label SBG dan stiker segel`,
      },
      {
        id: 'ps-m6',
        title: 'Packing & Penyimpanan Camera',
        content: `## Packing & Penyimpanan Camera\n\n- Kemas dengan pelindung tambahan pada lensa dan body\n- Tandai "FRAGILE" pada kemasan\n- Sertakan aksesori (lensa, charger, memory card) dalam satu kemasan\n- Tempel label SBG dan stiker segel`,
      },
      {
        id: 'ps-m7',
        title: 'Packing & Penyimpanan Dokumen BPKB',
        content: `## Packing & Penyimpanan Dokumen BPKB\n\n- Masukkan ke map/folder dokumen yang bersih\n- Tempel label dengan info lengkap\n- Simpan di lemari dokumen yang terkunci\n\n### Standar Sealing Umum (berlaku untuk semua barang):\n1. Pastikan barang sudah dikemas dengan benar sebelum disegel\n2. Tempel stiker segel pada sambungan kemasan, tulis tanggal dan paraf di atasnya\n3. Jangan gunakan stiker segel bekas atau biarkan ada celah terbuka pada kemasan\n4. Jangan tutupi label/informasi penting dengan segel`,
      },
    ],
    submissionType: 'individual',
    checklistItems: [
      { id: 'ps-1', text: 'Packing & Penyimpanan Handphone/Tablet', category: 'Elektronik', description: 'Dengan box: masukkan ke box asli, seal, tempel label SBG. Tanpa box: bungkus bubble wrap, masukkan kantong plastik, tempel label.', target: 2, targetForPass: 1, level2Target: 2, level2TargetForPass: 1 },
      { id: 'ps-2', text: 'Packing & Penyimpanan Laptop', category: 'Elektronik', description: 'Dengan box: masukkan ke box asli, pastikan charger ikut terpacking. Tanpa box: bungkus bubble wrap tebal, lapisi kardus, tempel label.', target: 2, targetForPass: 1, level2Target: 2, level2TargetForPass: 1 },
      { id: 'ps-5', text: 'Packing & Penyimpanan TV', category: 'Elektronik', description: 'Gunakan kemasan sesuai ukuran, tambahkan pelindung sudut, tandai FRAGILE.', target: 2, targetForPass: 1, level2Target: 2, level2TargetForPass: 1 },
      { id: 'ps-6', text: 'Packing & Penyimpanan Game Console', category: 'Elektronik', description: 'Kemas dengan aman, sertakan aksesori, tempel label SBG lengkap.', target: 2, targetForPass: 1, level2Target: 2, level2TargetForPass: 1 },
      { id: 'ps-7', text: 'Packing & Penyimpanan Smartwatch', category: 'Elektronik', description: 'Gunakan kemasan kecil yang sesuai, tambahkan padding, tempel label.', target: 2, targetForPass: 1, level2Target: 2, level2TargetForPass: 1 },
      { id: 'ps-8', text: 'Packing & Penyimpanan Camera', category: 'Elektronik', description: 'Kemas dengan pelindung, tandai FRAGILE, sertakan aksesori, tempel label.', target: 2, targetForPass: 1, level2Target: 2, level2TargetForPass: 1 },
      { id: 'ps-9', text: 'Packing & Penyimpanan Dokumen BPKB', category: 'Dokumen', description: 'Masukkan ke map/folder bersih, tempel label info lengkap, simpan di lemari terkunci.', target: 2, targetForPass: 1, level2Target: 2, level2TargetForPass: 1 },
    ],
    quiz: [
      {
        id: 'ps-q1',
        question: 'HP tanpa box sebaiknya dikemas menggunakan...',
        options: [
          'Kardus + isolasi biasa',
          'Bubble wrap + kantong plastik + label SBG',
          'Amplop kertas saja',
          'Plastik biasa tanpa pelindung',
        ],
        correctIndex: 1,
      },
      {
        id: 'ps-q2',
        question: 'Informasi apa yang WAJIB ada pada label barang gadai?',
        options: [
          'Nomor SBG, nama nasabah, deskripsi barang, tanggal gadai & jatuh tempo',
          'Nama nasabah dan nomor HP saja',
          'Nomor KTP dan alamat nasabah',
          'Hanya nilai taksiran dan nama nasabah',
        ],
        correctIndex: 0,
      },
      {
        id: 'ps-q3',
        question: 'Apa yang harus dilakukan SETELAH menempel stiker segel?',
        options: [
          'Simpan langsung ke gudang',
          'Foto barang terlebih dahulu',
          'Tulis tanggal dan paraf di atas stiker segel',
          'Lapor ke Kanit',
        ],
        correctIndex: 2,
      },
      {
        id: 'ps-q4',
        question: 'Mana yang HARUS DIHINDARI saat sealing?',
        options: [
          'Menulis tanggal di atas stiker',
          'Memaraf stiker segel',
          'Memastikan kemasan tertutup rapat',
          'Menggunakan stiker segel bekas',
        ],
        correctIndex: 3,
      },
    ],
  },
  {
    id: 'offloading',
    name: 'Offloading',
    shortName: 'Offloading',
    type: 'minggu1',
    order: 9,
    description: 'Prosedur packing dan pelaporan barang offload',
    unlockDay: 6,
    estimatedMinutes: 15,
    materials: [
      {
        id: 'of-m1',
        title: 'Prosedur Offloading',
        content: `## Prosedur Offloading Barang\n\nOffloading adalah proses pengiriman barang gadai yang sudah jatuh tempo dan tidak ditebus oleh nasabah.\n\n### Langkah-langkah:\n1. **Identifikasi barang** — Cek daftar barang yang masuk kategori offload di Intools\n2. **Packing sesuai prosedur** — Kemas barang dengan aman menggunakan standar packing elektronik\n3. **Labeling offload** — Tempel label khusus offload (berbeda dari label gadai biasa)\n4. **Dokumentasi** — Foto barang sebelum dikemas\n5. **Pelaporan** — Laporkan status offload di Intools\n6. **Serah terima** — Serahkan barang ke tim logistik atau pickup offload`,
      },
    ],
    submissionType: 'individual' as const,
    checklistItems: [
      { id: 'of-1', text: 'Offloading', category: 'Offloading', target: 1, targetForPass: 1 },
    ],
    quiz: [
      {
        id: 'of-q1',
        question: 'Barang seperti apa yang masuk proses Offloading?',
        options: ['Barang baru gadai hari ini', 'Barang jatuh tempo yang tidak ditebus nasabah', 'Barang milik karyawan', 'Barang rusak'],
        correctIndex: 1,
      },
      {
        id: 'of-q2',
        question: 'Apa bedanya label offload dengan label gadai biasa?',
        options: ['Sama saja, tidak ada bedanya', 'Label offload adalah label khusus yang berbeda dari label gadai biasa', 'Tidak perlu label sama sekali', 'Label offload memakai warna acak'],
        correctIndex: 1,
      },
      {
        id: 'of-q3',
        question: 'Setelah status offload dilaporkan di Intools, langkah terakhirnya adalah...',
        options: ['Serah terima ke tim logistik / pickup offload', 'Kembalikan ke nasabah', 'Simpan permanen di cabang', 'Hapus dari sistem'],
        correctIndex: 0,
      },
    ],
  },
  {
    id: 'pelayanan-nasabah',
    name: 'Pelayanan Nasabah Visit',
    shortName: 'Pelayanan Nasabah',
    type: 'minggu2',
    order: 10,
    description: 'Standar pelayanan tatap muka: sambutan dan edukasi aplikasi kepada nasabah',
    // Level 2 quiz-unlock staggering (2026-08-12) — was `unlockDay: 8` for all 6 Level 2
    // modules (same "every quiz opens simultaneously" issue the Level 1 modules had,
    // fixed the same day — see Canvassing's unlockDay comment for the full mechanics:
    // `unlockDay` only ever gates quiz availability, never materi/latihan visibility).
    // All 6 Level 2 modules now unlock their quiz on Day 12 instead — Pelayanan Nasabah
    // Visit/Transaksi, Customer Service via WA, Penaksiran Elektronik/Emas/BPKB.
    unlockDay: 12,
    estimatedMinutes: 30,
    target: 6,
    targetForPass: 3,
    materials: [
      {
        id: 'pn-m1',
        title: 'Pelayanan Nasabah Visit',
        content: `## Standar Pelayanan Nasabah Visit\n\n### Urutan Sambutan:\n1. **Sigap berdiri** — Berdiri saat nasabah masuk, postur siap melayani\n2. **Salam antusias** — Ucapkan salam dengan nada yang hangat dan bersemangat\n3. **Persilakan duduk** — Ajak nasabah duduk dengan intonasi ramah\n4. **Perkenalkan diri** — Sebutkan nama dan tanyakan keperluan nasabah\n5. **Estimasi waktu** — Berikan informasi estimasi waktu proses\n6. **Jelaskan tahapan** — Sampaikan apa yang akan terjadi selanjutnya\n\n### Edukasi Aplikasi Pandai Gadai\n- Ajak nasabah download dan registrasi aplikasi\n- Tunjukkan cara cek status gadai, jatuh tempo, dan tagihan\n- Promosikan fitur perpanjangan online\n- Jelaskan cara mendapatkan dan menggunakan Saldo Pandai serta Poin Pandai`,
      },
    ],
    checklistItems: [
      { id: 'pn-1', text: 'Sigap berdiri menyambut nasabah (postur siap melayani)', category: 'Sambutan', kondisiIdeal: 'Sigap berdiri, postur siap melayani' },
      { id: 'pn-2', text: 'Mengucapkan salam sambutan dengan nada antusias', category: 'Sambutan', kondisiIdeal: 'Mengucapkan "Selamat datang di Pandai Gadai" dengan nada antusias dan ekspresi tubuh antusias' },
      { id: 'pn-3', text: 'Mempersilahkan nasabah duduk dengan intonasi ramah', category: 'Sambutan', kondisiIdeal: 'Intonasi suara dan gaya bahasa tubuh ramah' },
      { id: 'pn-4', text: 'Memperkenalkan diri dan menanyakan keperluan nasabah', category: 'Sambutan', kondisiIdeal: 'Intonasi suara dan gaya bahasa tubuh ramah' },
      { id: 'pn-5', text: 'Memberikan estimasi waktu menunggu', category: 'Pelayanan', kondisiIdeal: 'Intonasi suara dan gaya bahasa tubuh ramah' },
      { id: 'pn-6', text: 'Menjelaskan tahapan selanjutnya kepada nasabah', category: 'Pelayanan', kondisiIdeal: 'Intonasi suara dan gaya bahasa tubuh ramah' },
      { id: 'pn-7', text: 'Edukasi Aplikasi Pandai Gadai', category: 'Edukasi', kondisiIdeal: 'Menjelaskan fungsi aplikasi (Transaksi Online, Poin Pandai, Saldo Pandai)' },
    ],
    quiz: [
      {
        id: 'pn-q1',
        question: 'Apa langkah PERTAMA dalam standar sambutan nasabah?',
        options: ['Mengucapkan terima kasih', 'Sigap berdiri menyambut nasabah', 'Menjelaskan tahapan selanjutnya', 'Edukasi aplikasi'],
        correctIndex: 1,
      },
      {
        id: 'pn-q2',
        question: 'Setelah memperkenalkan diri dan menanyakan keperluan, apa yang sebaiknya disampaikan ke nasabah?',
        options: ['Estimasi waktu menunggu', 'Nomor rekening cabang', 'Harga emas hari ini', 'Jadwal libur cabang'],
        correctIndex: 0,
      },
      {
        id: 'pn-q3',
        question: 'Apa saja yang termasuk edukasi Aplikasi Pandai Gadai ke nasabah?',
        options: ['Cek status gadai, jatuh tempo, Saldo Pandai, dan Poin Pandai', 'Hanya cara download aplikasi', 'Hanya nomor customer service', 'Cara mengganti password email'],
        correctIndex: 0,
      },
    ],
  },
  {
    id: 'pelayanan-nasabah-transaksi',
    name: 'Pelayanan Nasabah Transaksi',
    shortName: 'Pelayanan Transaksi',
    type: 'minggu2',
    order: 10,
    description: 'Penjelasan SBG/Resi dan penutupan interaksi transaksi nasabah',
    unlockDay: 12,
    estimatedMinutes: 15,
    target: 6,
    targetForPass: 3,
    materials: [
      {
        id: 'pnt-m1',
        title: 'Pelayanan Nasabah Transaksi',
        content: `## Pelayanan Nasabah Transaksi\n\n### SBG dan Resi:\n- Jelaskan fungsi SBG sebagai bukti gadai\n- Ingatkan nasabah untuk menyimpan SBG dengan aman\n- Jelaskan cara membaca informasi di SBG\n\n### Penutupan Transaksi:\n- Saat transaksi selesai, sampaikan terima kasih atas kunjungan nasabah`,
      },
    ],
    checklistItems: [
      { id: 'pnt-1', text: 'Menjelaskan SBG dan Resi kepada nasabah', category: 'Edukasi' },
      { id: 'pnt-2', text: 'Mengucapkan terima kasih atas kunjungan/transaksi', category: 'Penutupan' },
    ],
    quiz: [
      {
        id: 'pnt-q1',
        question: 'Apa fungsi SBG yang perlu dijelaskan ke nasabah?',
        options: ['Bukti gadai yang harus disimpan dengan aman', 'Kartu member', 'Struk pembelian', 'Surat perjanjian kerja'],
        correctIndex: 0,
      },
      {
        id: 'pnt-q2',
        question: 'Apa yang sebaiknya disampaikan Frontliner saat transaksi nasabah selesai?',
        options: ['Langsung diam tanpa menyapa', 'Mengucapkan terima kasih atas kunjungan/transaksi', 'Meminta nasabah segera pergi', 'Menawarkan produk lain secara paksa'],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 'customer-service-wa',
    name: 'Customer Service via WA',
    shortName: 'CS via WA',
    type: 'minggu2',
    order: 11,
    description: 'Komunikasi nasabah via WhatsApp: reminder jatuh tempo dan penanganan pertanyaan/komplain',
    unlockDay: 12,
    estimatedMinutes: 30,
    target: 3,
    targetForPass: 1,
    materials: [
      {
        id: 'csw-m1',
        title: 'Reminder Jatuh Tempo & Komplain WA',
        content: `## Customer Service via WhatsApp\n\n### Reminder Jatuh Tempo:\n- Kirim reminder H-3 sebelum jatuh tempo\n- Sertakan info tagihan dan penawaran perpanjangan\n- Gunakan template pesan yang sudah disediakan\n- Catat respons nasabah di sistem\n\n### Penanganan Pertanyaan/Komplain via WA:\n1. **Respon cepat** — Balas dalam 15 menit di jam operasional\n2. **Sapa dengan nama** — Personalisasi respons\n3. **Dengarkan dulu** — Pahami pertanyaan sebelum menjawab\n4. **Jawab akurat** — Cek data di Intools jika perlu\n5. **Eskalasi jika perlu** — Hubungkan ke Kanit untuk komplain serius\n6. **Follow up** — Pastikan masalah nasabah terselesaikan`,
      },
    ],
    checklistItems: [
      { id: 'csw-1', text: 'Reminder jatuh tempo dan penawaran perpanjangan kepada nasabah', category: 'Proaktif' },
      { id: 'csw-2', text: 'Menjawab pertanyaan / request / komplain nasabah via WA', category: 'Responsif' },
    ],
    quiz: [
      {
        id: 'csw-q1',
        question: 'Kapan sebaiknya reminder jatuh tempo dikirim ke nasabah?',
        options: ['H-3 sebelum jatuh tempo', 'Setelah jatuh tempo lewat', 'H+7 setelah jatuh tempo', 'Tidak perlu dikirim'],
        correctIndex: 0,
      },
      {
        id: 'csw-q2',
        question: 'Berapa target waktu merespons pertanyaan/komplain nasabah via WA di jam operasional?',
        options: ['1 jam', '15 menit', '1 hari', 'Tidak ada target waktu'],
        correctIndex: 1,
      },
      {
        id: 'csw-q3',
        question: 'Apa yang harus dilakukan untuk komplain yang serius?',
        options: ['Diabaikan', 'Dijawab asal-asalan', 'Dieskalasi / dihubungkan ke Kanit', 'Nasabah diminta datang langsung tanpa penjelasan'],
        correctIndex: 2,
      },
    ],
  },
  {
    id: 'penaksiran-elektronik',
    name: 'Penaksiran Elektronik',
    shortName: 'Taksir Elektronik',
    type: 'minggu2',
    order: 12,
    description: 'Teknik penaksiran gadget dan perangkat elektronik: HP, tablet, laptop, game console, kamera',
    unlockDay: 12,
    estimatedMinutes: 45,
    // Per-item "individual" (2026-08-05) — each device type below is its own independently
    // tracked task via TaskConfirmation, submitted through the dedicated discounter form
    // (FLPenaksiranConfirm.tsx: Tipe Item search + Potongan Nilai defect checklist) rather
    // than the generic essay/checklist submission every other session-type module uses.
    // The per-item target/targetForPass already summed to 25/11 before this switch — that
    // was intentional, this data just wasn't wired up to individual-type code yet.
    submissionType: 'individual',
    materials: [
      {
        id: 'pe-m1',
        title: 'Handphone – Android',
        content: `## Penaksiran Handphone Android\n\n### Pengecekan Awal:\n- Cek merek, model, dan kapasitas storage\n- Pastikan tidak terkunci FRP (Factory Reset Protection) atau akun Google\n- Cek IMEI di dus vs di pengaturan (Setelan > Tentang Ponsel)\n\n### Uji Fungsi:\n- Layar (respons sentuh, dead pixel), kamera, speaker, mic\n- Charging port dan kondisi baterai\n- Tombol fisik (power, volume)\n\n### Kondisi Fisik:\n- Goresan, retak layar/bodi, bekas air\n\n### Input ke Intools:\n- Pilih kategori Elektronik > HP Android, isi merek & model, catat hasil penaksiran`,
      },
      {
        id: 'pe-m2',
        title: 'Tablet',
        content: `## Penaksiran Tablet\n\n### Pengecekan Awal:\n- Cek merek, model, ukuran layar, dan kapasitas storage\n- Pastikan tidak terkunci akun (Google/Samsung) atau FRP\n- Cek slot SIM/kartu jika ada\n\n### Uji Fungsi:\n- Layar, speaker, port pengisian\n- Kondisi baterai\n- Stylus/aksesoris pendukung jika ada\n\n### Kondisi Fisik:\n- Goresan, retak layar/bodi\n\n### Input ke Intools:\n- Pilih kategori Elektronik > Tablet, catat merek & model`,
      },
      {
        id: 'pe-m3',
        title: 'Handphone – iPhone',
        content: `## Penaksiran Handphone iPhone\n\n### Pengecekan Awal:\n- Pastikan tidak terkunci iCloud (Activation Lock) — cek di Pengaturan > [nama] atau Pengaturan > Umum > Tentang\n- Cek IMEI di dus vs Pengaturan > Umum > Tentang\n\n### Uji Fungsi:\n- Face ID/Touch ID, kondisi baterai (Battery Health), tombol-tombol\n- Layar, kamera, speaker\n\n### Kondisi Fisik:\n- Retak layar, bodi penyok\n\n### Input ke Intools:\n- Pilih kategori Elektronik > iPhone, catat model & storage`,
      },
      {
        id: 'pe-m4',
        title: 'iPad',
        content: `## Penaksiran iPad\n\n### Pengecekan Awal:\n- Pastikan tidak terkunci iCloud (Activation Lock)\n- Cek nomor seri/IMEI\n\n### Uji Fungsi:\n- Touch ID/Face ID, kondisi baterai\n- Kondisi Apple Pencil port/Smart Connector jika ada\n\n### Kondisi Fisik:\n- Layar & bodi\n\n### Input ke Intools:\n- Pilih kategori Elektronik > iPad, catat model & storage`,
      },
      {
        id: 'pe-m5',
        title: 'Laptop Windows',
        content: `## Penaksiran Laptop Windows\n\n### Pengecekan Awal:\n- Cek spesifikasi: processor, RAM, storage (System Information / dxdiag)\n- Pastikan tidak terkunci password BIOS/Windows tanpa akses recovery\n\n### Uji Fungsi:\n- Layar, keyboard, touchpad, semua port (USB, HDMI, charging)\n- Kondisi baterai (battery health)\n\n### Input ke Intools:\n- Catat spesifikasi lengkap ke Intools kategori Laptop`,
      },
      {
        id: 'pe-m6',
        title: 'Laptop Chromebook',
        content: `## Penaksiran Laptop Chromebook\n\n### Pengecekan Awal:\n- Cek spesifikasi: processor, RAM, storage\n- Pastikan tidak terkunci Google Account / Enterprise Enrollment lock\n\n### Uji Fungsi:\n- Layar (termasuk touchscreen jika ada), keyboard, touchpad, port\n- Kondisi baterai\n\n### Input ke Intools:\n- Catat spesifikasi ke Intools kategori Laptop`,
      },
      {
        id: 'pe-m7',
        title: 'Laptop MacBook',
        content: `## Penaksiran Laptop MacBook\n\n### Pengecekan Awal:\n- Pastikan tidak terkunci Activation Lock / FileVault tanpa password\n- Cek notch dan Touch Bar/Touch ID jika ada\n\n### Uji Fungsi:\n- Layar, keyboard, trackpad, port (USB-C, MagSafe)\n- Battery Health (System Information > Power)\n\n### Input ke Intools:\n- Catat spesifikasi ke Intools kategori Laptop`,
      },
      {
        id: 'pe-m8',
        title: 'Game Console – PlayStation / Xbox',
        content: `## Penaksiran Game Console (PlayStation/Xbox)\n\n### Pengecekan Awal:\n- Pastikan tidak terkunci akun (PSN/Xbox Live) — lakukan factory reset jika perlu\n\n### Uji Fungsi:\n- Controller, port HDMI, disc tray/drive\n- Kelengkapan (kabel power, HDMI, controller)\n\n### Kondisi Fisik:\n- Casing & ventilasi\n\n### Input ke Intools:\n- Catat model & kelengkapan ke Intools kategori Gaming`,
      },
      {
        id: 'pe-m9',
        title: 'Game Console – Nintendo',
        content: `## Penaksiran Game Console (Nintendo Switch/ROG Ally)\n\n### Pengecekan Awal:\n- Pastikan tidak terkunci akun Nintendo\n\n### Uji Fungsi:\n- Kondisi layar dan Joy-Con (drift, konektivitas)\n- Dock & kabel HDMI jika Switch\n\n### Kelengkapan:\n- Aksesoris standar\n\n### Input ke Intools:\n- Catat model & kelengkapan ke Intools kategori Gaming`,
      },
      {
        id: 'pe-m10',
        title: 'Smartwatch',
        content: `## Penaksiran Smartwatch\n\n### Pengecekan Awal:\n- Cek model, kondisi strap dan layar\n- Pastikan tidak terkunci akun (Apple Watch Activation Lock / akun Google)\n\n### Uji Fungsi:\n- Fungsi GPS/heart rate, konektivitas Bluetooth\n- Kondisi baterai & charging dock\n\n### Input ke Intools:\n- Catat model ke Intools kategori Gadget`,
      },
      {
        id: 'pe-m11',
        title: 'Camera',
        content: `## Penaksiran Camera\n\n### Pengecekan Awal:\n- Cek jenis (DSLR/mirrorless/point-and-shoot), merek & model\n\n### Uji Fungsi:\n- Kondisi lensa (jamur, baret), shutter count jika tersedia\n- Tombol, layar LCD, port (SD card, USB, HDMI)\n\n### Kelengkapan:\n- Lensa kit, charger, memory card\n\n### Input ke Intools:\n- Catat model & kelengkapan ke Intools kategori Gadget`,
      },
    ],
    checklistItems: [
      { id: 'pe-1', text: 'Handphone – Android', category: 'HP', target: 3, targetForPass: 1 },
      { id: 'pe-2', text: 'Tablet', category: 'HP', target: 2, targetForPass: 1 },
      { id: 'pe-3', text: 'Handphone – iPhone', category: 'HP', target: 3, targetForPass: 1 },
      { id: 'pe-4', text: 'iPad', category: 'HP', target: 2, targetForPass: 1 },
      { id: 'pe-5', text: 'Laptop Windows', category: 'Laptop', target: 3, targetForPass: 1 },
      { id: 'pe-6', text: 'Laptop Chromebook', category: 'Laptop', target: 2, targetForPass: 1 },
      { id: 'pe-7', text: 'Laptop MacBook', category: 'Laptop', target: 2, targetForPass: 1 },
      { id: 'pe-8', text: 'Game Console – PlayStation / Xbox', category: 'Gaming', target: 2, targetForPass: 1 },
      { id: 'pe-9', text: 'Game Console – Nintendo', category: 'Gaming', target: 2, targetForPass: 1 },
      { id: 'pe-10', text: 'Smartwatch', category: 'Gadget', target: 2, targetForPass: 1 },
      { id: 'pe-11', text: 'Camera', category: 'Gadget', target: 2, targetForPass: 1 },
    ],
    quiz: [
      {
        id: 'pe-q1',
        question: 'Apa yang harus dipastikan TIDAK aktif pada HP Android sebelum ditaksir?',
        options: ['FRP (Factory Reset Protection)', 'Bluetooth', 'Mode pesawat', 'Wi-Fi'],
        correctIndex: 0,
      },
      {
        id: 'pe-q2',
        question: 'Apa yang perlu dicek pada iPhone/iPad sebelum penaksiran?',
        options: ['Tidak terkunci iCloud (Activation Lock)', 'Warna casing', 'Jumlah aplikasi terinstal', 'Riwayat panggilan'],
        correctIndex: 0,
      },
      {
        id: 'pe-q3',
        question: 'Untuk Game Console, apa yang harus dipastikan sebelum penaksiran?',
        options: ['Tidak terkunci akun (PSN/Nintendo Account)', 'Baterai penuh', 'Ada kabel HDMI cadangan', 'Warna console sesuai favorit'],
        correctIndex: 0,
      },
    ],
  },
  {
    id: 'penaksiran-emas',
    name: 'Penaksiran Emas',
    shortName: 'Taksir Emas',
    type: 'minggu2',
    order: 13,
    description: 'Teknik penaksiran emas — Perhiasan dan Logam Mulia (LM Press) — sesuai prosedur standar',
    unlockDay: 12,
    estimatedMinutes: 45,
    // Per-item "individual" (2026-08-12) — same switch as Penaksiran Elektronik/BPKB,
    // submitted through its own dedicated form (FLPenaksiranEmasConfirm.tsx: Pilih Jenis
    // Emas — Perhiasan or Logam Mulia, each with its own field set — + Refleksi) rather
    // than the generic essay/checklist submission. Only one checklistItem here (pem-1,
    // same shape as BPKB's single pbk-1), so the milestone-level target/targetForPass
    // that used to live here is redundant with that item's own target/targetForPass below
    // — removed, matching the BPKB precedent.
    submissionType: 'individual',
    materials: [
      {
        id: 'pem-m1',
        title: 'Penaksiran Logam Mulia (LM Press)',
        content: `## Penaksiran Emas Batang LM Press\n\n### Apa itu LM Press?\nLM Press (Logam Mulia Press) adalah emas batang yang diproduksi oleh Antam dalam berbagai ukuran (0.5g–1000g), dijual per keping dalam denominasi standar.\n\n### Langkah Penaksiran:\n1. **Verifikasi keaslian** — Cek hologram dan QR code sertifikat Antam\n2. **Periksa kondisi fisik** — Pastikan tidak ada goresan dalam atau tanda pemalsuan\n3. **Verifikasi denominasi & jumlah keping** — Cocokkan dengan keterangan sertifikat tiap keping\n4. **Cek harga spot** — Lihat harga LM Press hari ini di Intools\n5. **Hitung nilai taksiran** — Denominasi × jumlah keping × harga spot × persentase sesuai ketentuan\n6. **Input ke Intools** — Kategori Emas, subkategori Logam Mulia\n\n### Catatan Penting:\n- LM Press tanpa sertifikat memerlukan prosedur tambahan\n- Konfirmasi ke Kanit untuk total berat > 100 gram`,
      },
      {
        id: 'pem-m2',
        title: 'Penaksiran Perhiasan',
        content: `## Penaksiran Perhiasan Emas\n\n### Jenis Perhiasan Umum:\nCincin, kalung, gelang, anting, liontin — masing-masing ditaksir berdasarkan kadar dan berat, bukan denominasi tetap seperti LM Press.\n\n### Langkah Penaksiran:\n1. **Identifikasi jenis perhiasan** — Cincin, kalung, gelang, dll.\n2. **Uji kadar emas** — Gunakan jarum uji/cairan asam nitrat atau alat uji kadar untuk menentukan karat (mis. 24K, 18K, 17K)\n3. **Timbang berat bersih** — Pisahkan berat batu/aksesori non-emas jika ada dari berat total\n4. **Cek harga spot per kadar** — Lihat harga hari ini di Intools sesuai kadar yang terverifikasi\n5. **Hitung nilai taksiran** — Berat × harga spot per kadar × persentase sesuai ketentuan\n6. **Input ke Intools** — Kategori Emas, subkategori Perhiasan, catat jenis, kadar, dan berat\n\n### Catatan Penting:\n- Kadar yang tidak sesuai klaim nasabah harus dikonfirmasi ulang sebelum nilai difinalisasi\n- Perhiasan dengan batu permata: berat batu TIDAK dihitung sebagai berat emas`,
      },
    ],
    checklistItems: [
      { id: 'pem-1', text: 'Penaksiran Emas sesuai prosedur standar', category: 'Penaksiran', target: 2, targetForPass: 1 },
    ],
    quiz: [
      {
        id: 'pem-q1',
        question: 'Apa itu LM Press?',
        options: ['Emas batang produksi Antam berbagai ukuran', 'Uang kertas kuno', 'Perhiasan emas 24 karat', 'Koin emas luar negeri'],
        correctIndex: 0,
      },
      {
        id: 'pem-q2',
        question: 'Apa langkah PERTAMA dalam penaksiran LM Press?',
        options: ['Hitung nilai taksiran', 'Verifikasi keaslian (hologram & QR code sertifikat Antam)', 'Input ke Intools', 'Cek harga spot'],
        correctIndex: 1,
      },
      {
        id: 'pem-q3',
        question: 'LM Press di atas berapa gram yang WAJIB dikonfirmasi ke Kanit?',
        options: ['10 gram', '50 gram', '100 gram', 'Semua berat wajib konfirmasi'],
        correctIndex: 2,
      },
      {
        id: 'pem-q4',
        question: 'Untuk penaksiran perhiasan, apa yang membedakannya dari LM Press dalam menentukan nilai?',
        options: ['Perhiasan ditaksir berdasarkan kadar (karat) dan berat, bukan denominasi tetap', 'Perhiasan tidak bisa ditaksir sama sekali', 'Perhiasan selalu bernilai lebih tinggi dari LM Press', 'Perhiasan tidak perlu diuji kadar'],
        correctIndex: 0,
      },
    ],
  },
  {
    id: 'penaksiran-bpkb',
    name: 'Penaksiran BPKB',
    shortName: 'Taksir BPKB',
    type: 'minggu2',
    order: 14,
    description: 'Teknik penaksiran kendaraan bermotor berdasarkan dokumen BPKB Instant',
    unlockDay: 12,
    estimatedMinutes: 45,
    // Per-item "individual" (2026-08-05) — same switch as Penaksiran Elektronik, submitted
    // through its own dedicated discounter form (FLPenaksiranBpkbConfirm.tsx: Cek Nomor
    // Rangka + Tipe Item + Kelengkapan & Info Akses + Pengecekan Luar) rather than the
    // generic essay/checklist submission. Only one checklistItem here (pbk-1, unlike
    // Elektronik's 11 device types), so the milestone-level target/targetForPass above
    // is redundant with that item's own target/targetForPass below — removed.
    submissionType: 'individual',
    materials: [
      {
        id: 'pbk-m1',
        title: 'Penaksiran BPKB',
        content: `## Penaksiran BPKB Instant\n\n### Dokumen yang Diperlukan:\n- BPKB asli\n- STNK aktif\n- KTP pemilik kendaraan\n\n### Langkah Penaksiran:\n1. **Verifikasi dokumen** — Cek keaslian BPKB (hologram, watermark, nomor seri)\n2. **Cocokkan data** — Nomor rangka dan mesin di BPKB vs data STNK\n3. **Cek status kendaraan** — Pastikan tidak dalam kredit/sengketa\n4. **Nilai kendaraan** — Gunakan referensi harga di Intools untuk tipe dan tahun kendaraan\n5. **Input ke Intools** — Pilih kategori BPKB Instant, isi data kendaraan\n6. **Dokumentasi** — Foto BPKB, STNK, dan kendaraan (jika ada)\n\n### Faktor Penentu Nilai:\n- Merek, tipe, dan tahun pembuatan kendaraan\n- Kondisi fisik kendaraan\n- Kelengkapan dokumen\n\n### Motor vs Mobil\n**Motor:**\n- Merek populer: Honda, Yamaha, Suzuki\n- Motor > 10 tahun nilainya turun signifikan\n- Motor sport/adventure bernilai lebih tinggi\n- Nilai Pasar × 70–80% (tergantung kondisi)\n\n**Mobil:**\n- Merek populer: Toyota, Honda, Daihatsu, Suzuki\n- MPV dan SUV lebih diminati pasar\n- Perhatikan kilometer pemakaian\n- Untuk mobil mewah (> Rp 500 juta): wajib konsultasi Kanit\n- Nilai Pasar × 70–80% (tergantung kondisi dan kelengkapan)`,
      },
    ],
    checklistItems: [
      { id: 'pbk-1', text: 'Penaksiran BPKB Instant sesuai prosedur standar', category: 'Penaksiran', target: 3, targetForPass: 1 },
    ],
    quiz: [
      {
        id: 'pbk-q1',
        question: 'Dokumen apa saja yang diperlukan untuk penaksiran BPKB Instant?',
        options: ['BPKB asli, STNK aktif, KTP pemilik', 'Hanya BPKB', 'SIM dan KTP', 'Kwitansi pembelian saja'],
        correctIndex: 0,
      },
      {
        id: 'pbk-q2',
        question: 'Apa yang harus dicocokkan antara BPKB dan STNK?',
        options: ['Warna kendaraan', 'Nomor rangka dan mesin', 'Tahun pembuatan pemilik pertama', 'Harga beli awal'],
        correctIndex: 1,
      },
      {
        id: 'pbk-q3',
        question: 'Kendaraan senilai berapa yang WAJIB dikonsultasikan ke Kanit?',
        options: ['Di atas Rp100 juta', 'Di atas Rp300 juta', 'Di atas Rp500 juta', 'Tidak ada batas'],
        correctIndex: 2,
      },
    ],
  },
]

// Every module/task/quiz in this app lives inside one course. Today there's only
// "On the Job Training" — the model exists so a learner can later be enrolled in
// more than one (e.g. a separate Kanit training course).
export const COURSES: Course[] = [
  { id: 'course-ojt', name: 'On-the-job Training (OJT)' },
]

export const MOCK_USERS: AppUser[] = [
  {
    id: 'fl-001',
    name: 'Andi Pratama',
    role: 'fl',
    profile: {
      id: 'fl-001',
      name: 'Andi Pratama',
      branch: 'Cabang Sudirman',
      position: 'OJT Frontliner',
      startDate: '2026-07-24',
      // Day 2 (handover demo persona, 2026-08-12) — near-deadline on today's Canvassing
      // checklist (not yet submitted) from the FL side, and SOP Administrasi has pending
      // individual submissions awaiting Kanit review (see MOCK_TASK_CONFIRMATIONS below) —
      // covers both "near deadline to submit" (FL view) and "pending review" (Kanit view)
      // off the same account. Nothing completed yet — too early in the program for any
      // module to have hit its pass target.
      currentDay: 2,
      kanitId: 'kanit-001',
      courseId: 'course-ojt',
      activeMilestoneIds: ['closing-cabang', 'opening-cabang', 'personal-grooming', 'pengenalan-produk', 'canvassing', 'cash-management', 'sop-administrasi', 'packing-sealing', 'offloading'],
      completedMilestoneIds: [],
    },
  },
  {
    id: 'fl-002',
    name: 'Sari Dewi Lestari',
    role: 'fl',
    profile: {
      id: 'fl-002',
      name: 'Sari Dewi Lestari',
      branch: 'Cabang Sudirman',
      position: 'OJT Frontliner',
      startDate: '2026-07-17',
      // Day 8 (not 7): demonstrates that Level 2 unlocks purely on currentDay >= 8, even
      // while she still has Level 1 modules stuck "Terlambat" awaiting a kanit decision
      // (no level2_unlocks record exists for her — see below). Level 1 lateness must never
      // block Level 2 access; this persona is the one that proves it, live.
      currentDay: 8,
      kanitId: 'kanit-001',
      courseId: 'course-ojt',
      activeMilestoneIds: ['closing-cabang', 'opening-cabang', 'personal-grooming', 'personal-grooming-l2', 'pengenalan-produk', 'canvassing', 'cash-management', 'sop-administrasi', 'packing-sealing', 'offloading', 'pelayanan-nasabah', 'pelayanan-nasabah-transaksi', 'customer-service-wa', 'penaksiran-elektronik', 'penaksiran-emas', 'penaksiran-bpkb'],
      // Trimmed to exactly 3 late modules for the handover demo (2026-08-12) — was 6
      // (closing-cabang, opening-cabang, cash-management, sop-administrasi,
      // packing-sealing, offloading) all sitting "Terlambat" at once, which read as too
      // cluttered a first carry-over example. opening-cabang/cash-management/offloading
      // are now marked done (quiz scores added below to match); closing-cabang,
      // sop-administrasi, and packing-sealing are left incomplete on purpose so exactly 3
      // "Terlambat" cards remain for the Kanit's carry-over-approval demo.
      completedMilestoneIds: ['personal-grooming', 'pengenalan-produk', 'canvassing', 'opening-cabang', 'cash-management', 'offloading'],
      // personal-grooming/pengenalan-produk also backfilled with quiz scores here
      // (2026-08-12) — both were already in completedMilestoneIds before this handover
      // pass, but isMilestoneCompleted() requires a resolved quiz score too whenever a
      // milestone has one; without it they silently still counted as incomplete despite
      // the flag, which is what inflated the original "Terlambat" count past what
      // completedMilestoneIds alone suggested. Same gap, fixed the same way as the 3
      // newly-completed modules below.
      quizScores: { 'personal-grooming': 100, 'pengenalan-produk': 100, 'canvassing': 80, 'opening-cabang': 100, 'cash-management': 100, 'offloading': 100 },
      quizAnswers: {
        'personal-grooming': { 'pg-q1': 3, 'pg-q2': 0, 'pg-q3': 0 },
        'pengenalan-produk': { 'pp-q1': 2, 'pp-q2': 0, 'pp-q3': 0 },
        'canvassing': { 'cv-q1': 1, 'cv-q2': 0, 'cv-q3': 2 },
        'opening-cabang': { 'op-q1': 0, 'op-q2': 1, 'op-q3': 1 },
        'cash-management': { 'cm-q1': 1, 'cm-q2': 1, 'cm-q3': 2 },
        'offloading': { 'of-q1': 1, 'of-q2': 1, 'of-q3': 0 },
      },
      quizAttempts: { 'personal-grooming': 1, 'pengenalan-produk': 1, 'opening-cabang': 1, 'cash-management': 1, 'offloading': 1 },
    },
  },
  {
    id: 'fl-003',
    name: 'Budi Santoso',
    role: 'fl',
    profile: {
      id: 'fl-003',
      name: 'Budi Santoso',
      branch: 'Cabang Sudirman',
      position: 'OJT Frontliner',
      startDate: '2026-06-24',
      currentDay: 13,
      kanitId: 'kanit-001',
      courseId: 'course-ojt',
      activeMilestoneIds: ['closing-cabang', 'opening-cabang', 'personal-grooming', 'personal-grooming-l2', 'pengenalan-produk', 'canvassing', 'cash-management', 'sop-administrasi', 'packing-sealing', 'offloading', 'pelayanan-nasabah', 'pelayanan-nasabah-transaksi', 'customer-service-wa', 'penaksiran-elektronik', 'penaksiran-emas', 'penaksiran-bpkb'],
      // All of Level 1 (minggu1) is done, latihan AND mini quiz — Budi's Level 2 access
      // is unlocked. All in-progress/pending states live in Level 2 instead: customer-service-wa
      // (2/3 real latihan) and penaksiran-emas (0/1) are intentionally left out — his last day
      // (13) still has real active/incomplete latihan there. personal-grooming-l2 added
      // 2026-08-12 (the Level-2 split) — his 6 Day 8-13 sessions (re-tagged from the old
      // single personal-grooming id) already meet its target on their own; the flag +
      // quiz score below are just belt-and-suspenders consistency with the L1 entry.
      completedMilestoneIds: ['closing-cabang', 'opening-cabang', 'personal-grooming', 'personal-grooming-l2', 'pengenalan-produk', 'canvassing', 'cash-management', 'sop-administrasi', 'packing-sealing', 'offloading', 'pelayanan-nasabah', 'pelayanan-nasabah-transaksi', 'penaksiran-elektronik', 'penaksiran-bpkb'],
      quizScores: {
        'closing-cabang': 100, 'opening-cabang': 100, 'personal-grooming': 100, 'personal-grooming-l2': 100,
        'pengenalan-produk': 100, 'canvassing': 100,
        'packing-sealing': 85, 'cash-management': 100, 'sop-administrasi': 67, 'offloading': 100,
      },
      quizAnswers: {
        'closing-cabang': { 'cc-q1': 0, 'cc-q2': 1, 'cc-q3': 2 },
        'opening-cabang': { 'op-q1': 0, 'op-q2': 1, 'op-q3': 1 },
        'personal-grooming': { 'pg-q1': 3, 'pg-q2': 0, 'pg-q3': 0 },
        'personal-grooming-l2': { 'pg-q1': 3, 'pg-q2': 0, 'pg-q3': 0 },
        'pengenalan-produk': { 'pp-q1': 2, 'pp-q2': 0, 'pp-q3': 0 },
        'canvassing': { 'cv-q1': 1, 'cv-q2': 1, 'cv-q3': 2 },
        'packing-sealing': { 'ps-q1': 1, 'ps-q2': 0, 'ps-q3': 1, 'ps-q4': 3 },
        'cash-management': { 'cm-q1': 1, 'cm-q2': 1, 'cm-q3': 2 },
        'sop-administrasi': { 'sa-q1': 0, 'sa-q2': 1, 'sa-q3': 1 },
        'offloading': { 'of-q1': 1, 'of-q2': 1, 'of-q3': 0 },
      },
      // Quiz allows 1 retry — sop-administrasi has used both attempts and stayed under 75
      // (permanently resolved as failed); everything else only needed its first try.
      quizAttempts: {
        'closing-cabang': 1, 'opening-cabang': 1, 'personal-grooming': 1, 'personal-grooming-l2': 1,
        'pengenalan-produk': 1, 'canvassing': 1,
        'packing-sealing': 1, 'cash-management': 1, 'sop-administrasi': 2, 'offloading': 1,
      },
    },
  },
  {
    id: 'fl-004',
    name: 'Dewi Rahmawati',
    role: 'fl',
    profile: {
      id: 'fl-004',
      name: 'Dewi Rahmawati',
      branch: 'Cabang Sudirman',
      position: 'OJT Frontliner',
      startDate: '2026-06-24',
      currentDay: 13,
      kanitId: 'kanit-001',
      courseId: 'course-ojt',
      activeMilestoneIds: ['closing-cabang', 'opening-cabang', 'personal-grooming', 'personal-grooming-l2', 'pengenalan-produk', 'canvassing', 'cash-management', 'sop-administrasi', 'packing-sealing', 'offloading', 'pelayanan-nasabah', 'pelayanan-nasabah-transaksi', 'customer-service-wa', 'penaksiran-elektronik', 'penaksiran-emas', 'penaksiran-bpkb'],
      completedMilestoneIds: ['closing-cabang', 'opening-cabang', 'personal-grooming', 'personal-grooming-l2', 'pengenalan-produk', 'canvassing', 'cash-management', 'sop-administrasi', 'packing-sealing', 'offloading', 'pelayanan-nasabah', 'pelayanan-nasabah-transaksi', 'customer-service-wa', 'penaksiran-elektronik', 'penaksiran-emas', 'penaksiran-bpkb'],
      // Dewi has finished every module's latihan AND mini quiz — no "Aktif" cards should
      // remain in Modul Belajar, matching her "everything done, waiting on kanit" story.
      // personal-grooming-l2 added 2026-08-12 (the Level-2 split) alongside the rest.
      quizScores: {
        'closing-cabang': 100, 'opening-cabang': 100, 'personal-grooming': 100, 'personal-grooming-l2': 100,
        'pengenalan-produk': 100, 'canvassing': 75, 'cash-management': 100,
        'sop-administrasi': 100, 'packing-sealing': 100, 'offloading': 100,
        'pelayanan-nasabah': 100, 'pelayanan-nasabah-transaksi': 100, 'customer-service-wa': 100,
        'penaksiran-elektronik': 100, 'penaksiran-emas': 100, 'penaksiran-bpkb': 100,
      },
      quizAnswers: {
        'closing-cabang': { 'cc-q1': 0, 'cc-q2': 1, 'cc-q3': 2 },
        'opening-cabang': { 'op-q1': 0, 'op-q2': 1, 'op-q3': 1 },
        'personal-grooming': { 'pg-q1': 3, 'pg-q2': 0, 'pg-q3': 0 },
        'personal-grooming-l2': { 'pg-q1': 3, 'pg-q2': 0, 'pg-q3': 0 },
        'pengenalan-produk': { 'pp-q1': 2, 'pp-q2': 0, 'pp-q3': 0 },
        'canvassing': { 'cv-q1': 1, 'cv-q2': 0, 'cv-q3': 2 },
        'cash-management': { 'cm-q1': 1, 'cm-q2': 1, 'cm-q3': 2 },
        'sop-administrasi': { 'sa-q1': 0, 'sa-q2': 1, 'sa-q3': 0 },
        'packing-sealing': { 'ps-q1': 1, 'ps-q2': 0, 'ps-q3': 1, 'ps-q4': 3 },
        'offloading': { 'of-q1': 1, 'of-q2': 1, 'of-q3': 0 },
        'pelayanan-nasabah': { 'pn-q1': 1, 'pn-q2': 0, 'pn-q3': 0 },
        'pelayanan-nasabah-transaksi': { 'pnt-q1': 0, 'pnt-q2': 1 },
        'customer-service-wa': { 'csw-q1': 0, 'csw-q2': 1, 'csw-q3': 2 },
        'penaksiran-elektronik': { 'pe-q1': 0, 'pe-q2': 0, 'pe-q3': 0 },
        'penaksiran-emas': { 'pem-q1': 0, 'pem-q2': 1, 'pem-q3': 2, 'pem-q4': 0 },
        'penaksiran-bpkb': { 'pbk-q1': 0, 'pbk-q2': 1, 'pbk-q3': 2 },
      },
      quizAttempts: {
        'closing-cabang': 1, 'opening-cabang': 1, 'personal-grooming': 1, 'personal-grooming-l2': 1,
        'pengenalan-produk': 1, 'canvassing': 1, 'cash-management': 1,
        'sop-administrasi': 1, 'packing-sealing': 1, 'offloading': 1,
        'pelayanan-nasabah': 1, 'pelayanan-nasabah-transaksi': 1, 'customer-service-wa': 1,
        'penaksiran-elektronik': 1, 'penaksiran-emas': 1, 'penaksiran-bpkb': 1,
      },
    },
  },
  {
    id: 'fl-005',
    name: 'Rizky Ramadhan',
    role: 'fl',
    profile: {
      id: 'fl-005',
      name: 'Rizky Ramadhan',
      branch: 'Cabang Sudirman',
      position: 'OJT Frontliner',
      startDate: '2026-06-24',
      currentDay: 10,
      kanitId: 'kanit-001',
      courseId: 'course-ojt',
      activeMilestoneIds: ['closing-cabang', 'opening-cabang', 'personal-grooming', 'personal-grooming-l2', 'pengenalan-produk', 'canvassing', 'cash-management', 'sop-administrasi', 'packing-sealing', 'offloading', 'pelayanan-nasabah', 'pelayanan-nasabah-transaksi', 'customer-service-wa', 'penaksiran-elektronik', 'penaksiran-emas', 'penaksiran-bpkb'],
      // Level 1 (minggu1) is entirely clean — every module lulus, latihan AND mini quiz.
      // Level 2 is genuinely mid-flight on day 10: penaksiran-bpkb is the only L2 module
      // fully done; pelayanan-nasabah, customer-service-wa, and personal-grooming-l2
      // (2/6, re-tagged 2026-08-12 from the old single personal-grooming id — see its
      // Day 8/9 sessions in fl005Checklists) are partway through their target;
      // penaksiran-elektronik has one of two sessions in; penaksiran-emas hasn't been
      // started at all yet.
      completedMilestoneIds: ['closing-cabang', 'opening-cabang', 'personal-grooming', 'pengenalan-produk', 'canvassing', 'cash-management', 'sop-administrasi', 'packing-sealing', 'offloading', 'penaksiran-bpkb'],
      quizScores: {
        'closing-cabang': 100, 'opening-cabang': 100, 'personal-grooming': 100,
        'pengenalan-produk': 100, 'canvassing': 100, 'cash-management': 100,
        'sop-administrasi': 100, 'packing-sealing': 100, 'offloading': 100,
        'penaksiran-bpkb': 100,
      },
      quizAnswers: {
        'closing-cabang': { 'cc-q1': 0, 'cc-q2': 1, 'cc-q3': 2 },
        'opening-cabang': { 'op-q1': 0, 'op-q2': 1, 'op-q3': 1 },
        'personal-grooming': { 'pg-q1': 3, 'pg-q2': 0, 'pg-q3': 0 },
        'pengenalan-produk': { 'pp-q1': 2, 'pp-q2': 0, 'pp-q3': 0 },
        'canvassing': { 'cv-q1': 1, 'cv-q2': 1, 'cv-q3': 2 },
        'cash-management': { 'cm-q1': 1, 'cm-q2': 1, 'cm-q3': 2 },
        'sop-administrasi': { 'sa-q1': 0, 'sa-q2': 1, 'sa-q3': 0 },
        'packing-sealing': { 'ps-q1': 1, 'ps-q2': 0, 'ps-q3': 1, 'ps-q4': 3 },
        'offloading': { 'of-q1': 1, 'of-q2': 1, 'of-q3': 0 },
        'penaksiran-bpkb': { 'pbk-q1': 0, 'pbk-q2': 1, 'pbk-q3': 2 },
      },
      quizAttempts: {
        'closing-cabang': 1, 'opening-cabang': 1, 'personal-grooming': 1,
        'pengenalan-produk': 1, 'canvassing': 1, 'cash-management': 1,
        'sop-administrasi': 1, 'packing-sealing': 1, 'offloading': 1,
        'penaksiran-bpkb': 1,
      },
    },
  },
  {
    id: 'fl-006',
    name: 'Melati Anjani',
    role: 'fl',
    profile: {
      id: 'fl-006',
      name: 'Melati Anjani',
      branch: 'Cabang Sudirman',
      position: 'OJT Frontliner',
      // Repurposed for the handover demo (2026-08-12) — was the "H-1, not yet enrolled"
      // gate persona (currentDay: 0, hasStarted: false); that scenario isn't part of this
      // handover's requested flows, so she's now the dedicated Day-1 dashboard account
      // instead: just started, nothing submitted yet, sees the mandatory onboarding tour.
      startDate: '2026-08-04',
      currentDay: 1,
      kanitId: 'kanit-001',
      courseId: 'course-ojt',
      hasStarted: true,
      activeMilestoneIds: ['closing-cabang', 'opening-cabang', 'personal-grooming', 'pengenalan-produk', 'canvassing', 'cash-management', 'sop-administrasi', 'packing-sealing', 'offloading'],
    },
  },
  {
    id: 'kanit-001',
    name: 'Hendra Wijaya',
    role: 'kanit',
    profile: {
      id: 'kanit-001',
      name: 'Hendra Wijaya',
      branch: 'Cabang Sudirman',
      // Trimmed to exactly the 3 handover-demo cases (2026-08-12) — Andi (pending
      // review), Sari (carry-over approval), Dewi (ready for Rapot Akhir). fl-003/006
      // still exist as standalone FL logins for the separate "explore the OJT flow"
      // accounts (see Login.tsx), they're just no longer in THIS kanit's roster.
      // fl-005 (Rizky) re-added 2026-08-24 as the "ongoing Level 2, pending review on
      // Pelayanan Nasabah Visit" case — see his Day 10 cl-fl005-10 checklist below.
      flIds: ['fl-001', 'fl-002', 'fl-004', 'fl-005'],
    },
  },
]

const PG_ITEMS_FULL = ['pg-1', 'pg-2', 'pg-3', 'pg-4']
const CC_ITEMS_FULL = ['cc-1', 'cc-2', 'cc-3', 'cc-4', 'cc-5', 'cc-6', 'cc-7', 'cc-8', 'cc-9']
const OC_ITEMS_FULL = ['op-1', 'op-3', 'op-4', 'op-5', 'op-6', 'op-7', 'op-9', 'op-10', 'op-11', 'op-12', 'op-13', 'op-14', 'op-15', 'op-16']
const PN_ITEMS_FULL = ['pn-1', 'pn-2', 'pn-3', 'pn-4', 'pn-5', 'pn-6', 'pn-7']
const PNT_ITEMS_FULL = ['pnt-1', 'pnt-2']

// Trimmed for the Day-2 handover demo persona (2026-08-12, third pass 2026-08-13 — see
// mock-tc-fl001-sa1-day1's comment below for the matching SOP Administrasi change).
// Exact target state per explicit spec: Personal Grooming has 1 Day-1 submission
// (already reviewed, Lulus-worthy score); Canvassing has 1 Day-2 submission, still
// `status: 'submitted'` (pending review) — its OLD Day-1 scored session was removed so
// Canvassing now has zero review history before today, matching "first-ever attempt,
// awaiting review" rather than "already Lulus, quiz still pending."
const fl001Checklists: DailyChecklist[] = [
  {
    id: 'cl-fl001-pg-1', day: 1, date: '2026-07-01', flId: 'fl-001',
    tasks: [
      { taskId: 'personal-grooming', taskName: 'Personal Grooming', completedItemIds: ['pg-1', 'pg-2', 'pg-3', 'pg-4'], reflection: 'Hari pertama OJT, pastikan penampilan rapi dan standar sejak awal.', submittedAt: '2026-07-01T07:30:00', kanitScore: 90 },
    ],
    status: 'scored', submittedAt: '2026-07-01T07:30:00',
    kanitScore: 90, kanitNote: 'Penampilan rapi dan sesuai standar. Pertahankan!', kanitScoredAt: '2026-07-01T08:00:00',
  },
  {
    id: 'cl-fl001-2', day: 2, date: '2026-07-02', flId: 'fl-001',
    tasks: [
      { taskId: 'canvassing', taskName: 'Canvassing', completedItemIds: ['cv-1', 'cv-2'], reflection: 'Coba lagi pagi ini sebelum jam sibuk, sudah pakai Avenza dari awal sampai akhir.', submittedAt: '2026-07-02T08:30:00' },
    ],
    status: 'submitted', submittedAt: '2026-07-02T08:30:00',
  },
]

const fl002Checklists: DailyChecklist[] = [
  {
    id: 'cl-fl002-1', day: 1, date: '2026-07-01', flId: 'fl-002',
    milestoneId: 'closing-cabang', milestoneName: 'SOP Closing Cabang',
    items: [
      { itemId: 'cc-1', completed: true }, { itemId: 'cc-2', completed: true },
      { itemId: 'cc-3', completed: false, note: 'Sistem error saat login, perlu bantuan IT' },
      { itemId: 'cc-4', completed: true }, { itemId: 'cc-5', completed: true },
      { itemId: 'cc-6', completed: true }, { itemId: 'cc-7', completed: true },
    ],
    status: 'scored', submittedAt: '2026-07-01T17:30:00',
    kanitScore: 78, kanitNote: 'Ada kendala teknis yang wajar. Pahami cara login sistem dengan baik.', kanitScoredAt: '2026-07-01T18:00:00',
  },
  {
    id: 'cl-fl002-2', day: 2, date: '2026-07-02', flId: 'fl-002',
    milestoneId: 'packing-sealing', milestoneName: 'SOP Packing & Penyimpanan Barang Jaminan',
    items: [
      { itemId: 'ps-1', completed: true },
      { itemId: 'ps-2', completed: false, note: 'Belum sempat menata ulang penyimpanan' },
      { itemId: 'ps-5', completed: true },
    ],
    status: 'scored', submittedAt: '2026-07-02T17:30:00',
    kanitScore: 80, kanitNote: 'Packing cukup baik. Perhatikan penataan penyimpanan agar mudah ditemukan.', kanitScoredAt: '2026-07-02T18:00:00',
  },
  {
    id: 'cl-fl002-3', day: 3, date: '2026-07-03', flId: 'fl-002',
    milestoneId: 'canvassing', milestoneName: 'Canvassing',
    items: [
      { itemId: 'cv-1', completed: true },
      { itemId: 'cv-2', completed: true, note: '5 prospek, tepat di target minimum' },
    ],
    status: 'scored', submittedAt: '2026-07-03T17:30:00',
    kanitScore: 75, kanitNote: 'Sudah mencapai target minimum. Tingkatkan jumlah prospek dan rutinkan follow up.', kanitScoredAt: '2026-07-03T18:00:00',
  },
  {
    id: 'cl-fl002-4', day: 4, date: '2026-07-04', flId: 'fl-002',
    milestoneId: 'pelayanan-nasabah', milestoneName: 'Pelayanan Nasabah',
    items: [
      { itemId: 'pn-1', completed: true },
      { itemId: 'pn-2', completed: false, note: 'Masih perlu latihan untuk identifikasi kebutuhan' },
      { itemId: 'pn-3', completed: true }, { itemId: 'pn-4', completed: true },
      { itemId: 'pn-5', completed: false },
    ],
    status: 'scored', submittedAt: '2026-07-04T17:30:00',
    kanitScore: 70, kanitNote: 'Perlu berlatih identifikasi kebutuhan nasabah. Akan latih bersama besok.', kanitScoredAt: '2026-07-04T18:00:00',
  },
  {
    id: 'cl-fl002-5', day: 5, date: '2026-07-05', flId: 'fl-002',
    milestoneId: 'pelayanan-nasabah', milestoneName: 'Pelayanan Nasabah',
    items: [
      { itemId: 'pn-1', completed: true }, { itemId: 'pn-2', completed: true },
      { itemId: 'pn-3', completed: true }, { itemId: 'pn-4', completed: true },
      { itemId: 'pn-5', completed: true, note: 'Nasabah tanya soal tarif, berhasil dijelaskan' },
    ],
    status: 'scored', submittedAt: '2026-07-05T17:00:00',
    kanitScore: 85, kanitNote: 'Ada peningkatan yang bagus! Penanganan pertanyaan nasabah semakin baik.', kanitScoredAt: '2026-07-05T17:30:00',
  },
  {
    id: 'cl-fl002-6', day: 6, date: '2026-07-06', flId: 'fl-002',
    milestoneId: 'closing-cabang', milestoneName: 'SOP Closing Cabang',
    items: [
      { itemId: 'cc-1', completed: true }, { itemId: 'cc-2', completed: true },
      { itemId: 'cc-3', completed: true }, { itemId: 'cc-4', completed: true },
      { itemId: 'cc-5', completed: true }, { itemId: 'cc-6', completed: true }, { itemId: 'cc-7', completed: true },
    ],
    status: 'scored', submittedAt: '2026-07-06T17:00:00',
    kanitScore: 88, kanitNote: 'Opening closing sudah sangat baik dan konsisten. Bagus!', kanitScoredAt: '2026-07-06T17:20:00',
  },
]

const fl003Checklists: DailyChecklist[] = [
  // Days 1–7: multi-task format with full daily activity
  {
    id: 'cl-fl003-1', day: 1, date: '2026-06-24', flId: 'fl-003',
    tasks: [
      { taskId: 'personal-grooming', taskName: 'Personal Grooming', completedItemIds: ['pg-1', 'pg-2', 'pg-3', 'pg-4'], reflection: 'Hari pertama OJT! Pastikan penampilan rapi dan standar sejak awal.', submittedAt: '2026-06-24T08:00:00', kanitScore: 90 },
      { taskId: 'closing-cabang', taskName: 'SOP Closing Cabang', completedItemIds: ['cc-1', 'cc-2', 'cc-3', 'cc-4', 'cc-5', 'cc-6', 'cc-7', 'cc-8'], reflection: 'Baru pertama kali lakukan closing cabang. Perlu waktu lebih, tapi semua langkah terpenuhi.', submittedAt: '2026-06-24T17:00:00', kanitScore: 78 },
    ],
    status: 'scored', submittedAt: '2026-06-24T17:00:00',
    kanitScore: 80, kanitNote: 'Hari pertama sudah solid. Closing masih butuh dipercepat.', kanitScoredAt: '2026-06-24T17:30:00',
  },
  {
    id: 'cl-fl003-2', day: 2, date: '2026-06-25', flId: 'fl-003',
    tasks: [
      { taskId: 'personal-grooming', taskName: 'Personal Grooming', completedItemIds: ['pg-1', 'pg-2', 'pg-3', 'pg-4'], reflection: 'Semua checklist grooming terpenuhi.', submittedAt: '2026-06-25T08:00:00', kanitScore: 90 },
      { taskId: 'pengenalan-produk', taskName: 'Pengenalan Produk & Pricing', completedItemIds: ['pp-1', 'pp-2', 'pp-3'], reflection: 'Belajar menjelaskan produk Elektronik dan BPKB. Masih perlu hafal angka biaya lebih lancar.', submittedAt: '2026-06-25T12:00:00', kanitScore: 80 },
      { taskId: 'closing-cabang', taskName: 'SOP Closing Cabang', completedItemIds: ['cc-1', 'cc-2', 'cc-3', 'cc-4', 'cc-5', 'cc-6', 'cc-7', 'cc-8'], reflection: 'Sudah lebih cepat dari kemarin. Serah terima kunci berjalan lancar.', submittedAt: '2026-06-25T17:00:00', kanitScore: 83 },
    ],
    status: 'scored', submittedAt: '2026-06-25T17:00:00',
    kanitScore: 83, kanitNote: 'Hafalan produk masih perlu diasah, tapi sikap antusias bagus.', kanitScoredAt: '2026-06-25T17:30:00',
  },
  {
    id: 'cl-fl003-3', day: 3, date: '2026-06-26', flId: 'fl-003',
    tasks: [
      { taskId: 'personal-grooming', taskName: 'Personal Grooming', completedItemIds: ['pg-1', 'pg-2', 'pg-3', 'pg-4'], reflection: 'Konsisten rapi.', submittedAt: '2026-06-26T08:00:00', kanitScore: 90 },
      { taskId: 'pengenalan-produk', taskName: 'Pengenalan Produk & Pricing', completedItemIds: ['pp-1', 'pp-2', 'pp-3'], reflection: 'Sudah lebih hafal. Bisa jelaskan ke nasabah simulasi dengan lebih lancar.', submittedAt: '2026-06-26T12:00:00', kanitScore: 85 },
      { taskId: 'cash-management', taskName: 'Cash Management', completedItemIds: ['cm-1', 'cm-2', 'cm-3'], reflection: 'Belajar input tarik-setor dan kas kecil di sistem. Agak bingung di awal tapi sudah paham alurnya.', submittedAt: '2026-06-26T14:00:00', kanitScore: 80 },
      { taskId: 'closing-cabang', taskName: 'SOP Closing Cabang', completedItemIds: ['cc-1', 'cc-2', 'cc-3', 'cc-4', 'cc-5', 'cc-6', 'cc-7', 'cc-8'], reflection: 'Waktu closing semakin singkat. Semua dokumen tertempel rapi.', submittedAt: '2026-06-26T17:00:00', kanitScore: 86 },
    ],
    status: 'scored', submittedAt: '2026-06-26T17:00:00',
    kanitScore: 85, kanitNote: 'Cash management sudah dipahami. Closing terus membaik.', kanitScoredAt: '2026-06-26T17:30:00',
  },
  {
    id: 'cl-fl003-4', day: 4, date: '2026-06-27', flId: 'fl-003',
    tasks: [
      { taskId: 'personal-grooming', taskName: 'Personal Grooming', completedItemIds: ['pg-1', 'pg-2', 'pg-3', 'pg-4'], reflection: 'Penampilan standar terpenuhi.', submittedAt: '2026-06-27T07:30:00', kanitScore: 90 },
      { taskId: 'opening-cabang', taskName: 'SOP Opening Cabang', completedItemIds: OC_ITEMS_FULL, reflection: 'Pertama kali handle opening cabang sendiri. Ada 1 resi yang tertinggal, langsung diperbaiki.', submittedAt: '2026-06-27T09:00:00', kanitScore: 82 },
      { taskId: 'pengenalan-produk', taskName: 'Pengenalan Produk & Pricing', completedItemIds: ['pp-1', 'pp-2', 'pp-3'], reflection: 'Sesi ketiga pengenalan produk. Sudah bisa jelaskan dengan percaya diri ke nasabah.', submittedAt: '2026-06-27T12:00:00', kanitScore: 90 },
      { taskId: 'closing-cabang', taskName: 'SOP Closing Cabang', completedItemIds: ['cc-1', 'cc-2', 'cc-3', 'cc-4', 'cc-5', 'cc-6', 'cc-7', 'cc-8'], reflection: 'Closing rutin berjalan lancar. Tidak ada selisih kas.', submittedAt: '2026-06-27T17:00:00', kanitScore: 88 },
    ],
    status: 'scored', submittedAt: '2026-06-27T17:00:00',
    kanitScore: 87, kanitNote: 'Opening pertama oke! Pengenalan produk sudah mantap.', kanitScoredAt: '2026-06-27T17:30:00',
  },
  {
    id: 'cl-fl003-5', day: 5, date: '2026-06-28', flId: 'fl-003',
    tasks: [
      { taskId: 'personal-grooming', taskName: 'Personal Grooming', completedItemIds: ['pg-1', 'pg-2', 'pg-3', 'pg-4'], reflection: 'Grooming checklist terpenuhi.', submittedAt: '2026-06-28T07:30:00', kanitScore: 90 },
      { taskId: 'opening-cabang', taskName: 'SOP Opening Cabang', completedItemIds: OC_ITEMS_FULL, reflection: 'Opening sudah lebih cepat dari kemarin. Morning briefing berjalan bagus.', submittedAt: '2026-06-28T09:00:00', kanitScore: 88 },
      { taskId: 'offloading', taskName: 'Offloading', completedItemIds: ['of-1'], reflection: 'Latihan pertama packing item offload. Sempat bingung soal penggunaan label, sudah dikonfirmasi ke Kanit.', submittedAt: '2026-06-28T14:00:00', kanitScore: 82 },
      { taskId: 'closing-cabang', taskName: 'SOP Closing Cabang', completedItemIds: ['cc-1', 'cc-2', 'cc-3', 'cc-4', 'cc-5', 'cc-6', 'cc-7', 'cc-8'], reflection: 'Closing selesai tepat waktu. Semua item terpenuhi.', submittedAt: '2026-06-28T17:00:00', kanitScore: 87 },
    ],
    status: 'scored', submittedAt: '2026-06-28T17:00:00',
    kanitScore: 86, kanitNote: 'Offloading perdana berjalan baik. Opening semakin cepat dan rapi.', kanitScoredAt: '2026-06-28T17:30:00',
  },
  {
    id: 'cl-fl003-6', day: 6, date: '2026-06-29', flId: 'fl-003',
    tasks: [
      { taskId: 'personal-grooming', taskName: 'Personal Grooming', completedItemIds: ['pg-1', 'pg-2', 'pg-3', 'pg-4'], reflection: 'Konsisten setiap hari.', submittedAt: '2026-06-29T07:30:00', kanitScore: 90 },
      { taskId: 'canvassing', taskName: 'Canvassing', completedItemIds: ['cv-1', 'cv-2'], reflection: 'Pertama kali canvassing lapangan. Berhasil 4 prospek, masih malu-malu tapi sudah berani sapa orang baru.', submittedAt: '2026-06-29T13:00:00', kanitScore: 78 },
      { taskId: 'closing-cabang', taskName: 'SOP Closing Cabang', completedItemIds: ['cc-1', 'cc-2', 'cc-3', 'cc-4', 'cc-5', 'cc-6', 'cc-7', 'cc-8'], reflection: 'Closing rutin berjalan normal.', submittedAt: '2026-06-29T17:00:00', kanitScore: 86 },
    ],
    status: 'scored', submittedAt: '2026-06-29T17:00:00',
    kanitScore: 83, kanitNote: 'Canvassing perdana sudah berani! Tingkatkan jumlah prospek.', kanitScoredAt: '2026-06-29T17:30:00',
  },
  {
    id: 'cl-fl003-7', day: 7, date: '2026-06-30', flId: 'fl-003',
    tasks: [
      { taskId: 'personal-grooming', taskName: 'Personal Grooming', completedItemIds: ['pg-1', 'pg-2', 'pg-3', 'pg-4'], reflection: 'Standar grooming selalu terpenuhi.', submittedAt: '2026-06-30T07:30:00', kanitScore: 92 },
      { taskId: 'canvassing', taskName: 'Canvassing', completedItemIds: ['cv-1', 'cv-2'], reflection: '6 prospek hari ini! Jauh lebih percaya diri dari kemarin. Berhasil jelaskan produk gadai ke 3 orang secara detail.', submittedAt: '2026-06-30T13:00:00', kanitScore: 85 },
      { taskId: 'closing-cabang', taskName: 'SOP Closing Cabang', completedItemIds: ['cc-1', 'cc-2', 'cc-3', 'cc-4', 'cc-5', 'cc-6', 'cc-7', 'cc-8'], reflection: 'Selesai closing minggu pertama. Tidak ada kendala.', submittedAt: '2026-06-30T17:00:00', kanitScore: 88 },
    ],
    status: 'scored', submittedAt: '2026-06-30T17:00:00',
    kanitScore: 88, kanitNote: 'Minggu 1 selesai dengan sangat baik! Semua modul Level 1 tercapai. Siap Level 2.', kanitScoredAt: '2026-06-30T17:30:00',
  },
  // Days 8–13: Level 2 multi-task format
  {
    id: 'cl-fl003-8', day: 8, date: '2026-07-01', flId: 'fl-003',
    tasks: [
      { taskId: 'opening-cabang', taskName: 'SOP Opening Cabang', completedItemIds: OC_ITEMS_FULL, reflection: 'Opening sudah sangat rutin. Tidak ada kendala, saldo awal langsung diverifikasi.', submittedAt: '2026-07-01T08:30:00', kanitScore: 88 },
      { taskId: 'personal-grooming-l2', taskName: 'Personal Grooming', completedItemIds: ['pg-1', 'pg-2', 'pg-3', 'pg-4'], reflection: 'Grooming standar, hari ke-8 tetap terjaga.', submittedAt: '2026-07-01T08:00:00', kanitScore: 92 },
      { taskId: 'customer-service-wa', taskName: 'Customer Service via WA', completedItemIds: ['csw-1', 'csw-2'], reflection: 'Pertama kali handle WA nasabah. Kirim reminder jatuh tempo ke 12 nasabah, 3 langsung konfirmasi perpanjangan.', submittedAt: '2026-07-01T11:00:00', kanitScore: 85 },
      { taskId: 'canvassing', taskName: 'Canvassing', completedItemIds: ['cv-1', 'cv-2'], reflection: '5 prospek hari ini, 2 follow up dari kemarin. Salah satu prospek minta jadwal kunjungan ke cabang.', submittedAt: '2026-07-01T13:00:00', kanitScore: 83 },
      { taskId: 'pelayanan-nasabah', taskName: 'Pelayanan Nasabah Visit', completedItemIds: PN_ITEMS_FULL, reflection: 'Ada komplain soal antrian, berhasil diselesaikan dengan meminta nasabah menunggu di ruang nyaman.', submittedAt: '2026-07-01T16:00:00', kanitScore: 85 },
      { taskId: 'pelayanan-nasabah-transaksi', taskName: 'Pelayanan Nasabah Transaksi', completedItemIds: PNT_ITEMS_FULL, reflection: 'Ada komplain soal antrian, berhasil diselesaikan dengan meminta nasabah menunggu di ruang nyaman.', submittedAt: '2026-07-01T16:00:00', kanitScore: 85 },
      { taskId: 'closing-cabang', taskName: 'SOP Closing Cabang', completedItemIds: ['cc-1', 'cc-2', 'cc-3', 'cc-4', 'cc-5', 'cc-6', 'cc-7', 'cc-8'], reflection: 'Rekap dan laporan selesai tepat waktu. Tidak ada selisih kas.', submittedAt: '2026-07-01T17:00:00', kanitScore: 82 },
    ],
    status: 'scored', submittedAt: '2026-07-01T17:00:00',
    kanitScore: 85, kanitNote: 'Sudah sangat konsisten di hari ke-8. CS via WA perdana bagus! Pertahankan ritme ini.', kanitScoredAt: '2026-07-01T17:30:00',
  },
  {
    id: 'cl-fl003-9', day: 9, date: '2026-07-02', flId: 'fl-003',
    tasks: [
      { taskId: 'opening-cabang', taskName: 'SOP Opening Cabang', completedItemIds: OC_ITEMS_FULL, reflection: 'Opening sesuai SOP. Ditemukan printer macet, langsung lapor dan ditangani teknisi.', submittedAt: '2026-07-02T08:30:00', kanitScore: 88 },
      { taskId: 'personal-grooming-l2', taskName: 'Personal Grooming', completedItemIds: ['pg-1', 'pg-2', 'pg-3', 'pg-4'], reflection: 'Konsisten rapi setiap hari.', submittedAt: '2026-07-02T08:00:00', kanitScore: 92 },
      { taskId: 'customer-service-wa', taskName: 'Customer Service via WA', completedItemIds: ['csw-1', 'csw-2'], reflection: 'Handle 2 komplain via WA dengan baik. Nasabah puas dan tidak eskalasi.', submittedAt: '2026-07-02T11:00:00', kanitScore: 88 },
      { taskId: 'canvassing', taskName: 'Canvassing', completedItemIds: ['cv-1', 'cv-2'], reflection: '6 prospek hari ini. Prospek yang kemarin dikonfirmasi jadi datang ke cabang.', submittedAt: '2026-07-02T13:00:00', kanitScore: 90 },
      { taskId: 'pelayanan-nasabah', taskName: 'Pelayanan Nasabah Visit', completedItemIds: PN_ITEMS_FULL, reflection: 'Pelayanan lancar. Tidak ada komplain besar. Nasabah baru berhasil dilayani dari awal hingga selesai transaksi.', submittedAt: '2026-07-02T16:00:00', kanitScore: 87 },
      { taskId: 'pelayanan-nasabah-transaksi', taskName: 'Pelayanan Nasabah Transaksi', completedItemIds: PNT_ITEMS_FULL, reflection: 'Pelayanan lancar. Tidak ada komplain besar. Nasabah baru berhasil dilayani dari awal hingga selesai transaksi.', submittedAt: '2026-07-02T16:00:00', kanitScore: 87 },
      { taskId: 'closing-cabang', taskName: 'SOP Closing Cabang', completedItemIds: ['cc-1', 'cc-2', 'cc-3', 'cc-4', 'cc-5', 'cc-6', 'cc-7', 'cc-8'], reflection: 'Rekap selesai. Ada 1 transaksi tebus yang perlu dicek ulang tapi sudah beres.', submittedAt: '2026-07-02T17:00:00', kanitScore: 85 },
    ],
    status: 'scored', submittedAt: '2026-07-02T17:00:00',
    kanitScore: 88, kanitNote: 'CS via WA sudah lancar handle komplain. Penaksiran dan canvassing meningkat signifikan!', kanitScoredAt: '2026-07-02T17:30:00',
  },
  {
    id: 'cl-fl003-10', day: 10, date: '2026-07-03', flId: 'fl-003',
    tasks: [
      { taskId: 'opening-cabang', taskName: 'SOP Opening Cabang', completedItemIds: OC_ITEMS_FULL, reflection: 'Semua berjalan normal. Saldo awal sesuai.', submittedAt: '2026-07-03T08:30:00', kanitScore: 90 },
      { taskId: 'personal-grooming-l2', taskName: 'Personal Grooming', completedItemIds: ['pg-1', 'pg-2', 'pg-3', 'pg-4'], reflection: 'Grooming terjaga.', submittedAt: '2026-07-03T08:00:00', kanitScore: 90 },
      { taskId: 'canvassing', taskName: 'Canvassing', completedItemIds: ['cv-1', 'cv-2'], reflection: '7 prospek hari ini — rekor terbanyak. Follow up 3 dari kemarin, 2 berminat minggu depan.', submittedAt: '2026-07-03T13:00:00', kanitScore: 93 },
      { taskId: 'pelayanan-nasabah', taskName: 'Pelayanan Nasabah Visit', completedItemIds: PN_ITEMS_FULL, reflection: 'Nasabah lama kembali gadai, senang bisa melayani dengan cepat karena sudah kenal prosedurnya.', submittedAt: '2026-07-03T16:00:00', kanitScore: 90 },
      { taskId: 'pelayanan-nasabah-transaksi', taskName: 'Pelayanan Nasabah Transaksi', completedItemIds: PNT_ITEMS_FULL, reflection: 'Nasabah lama kembali gadai, senang bisa melayani dengan cepat karena sudah kenal prosedurnya.', submittedAt: '2026-07-03T16:00:00', kanitScore: 90 },
      { taskId: 'closing-cabang', taskName: 'SOP Closing Cabang', completedItemIds: ['cc-1', 'cc-2', 'cc-3', 'cc-4', 'cc-5', 'cc-6', 'cc-7', 'cc-8'], reflection: 'Rekap selesai tepat waktu. Tidak ada selisih.', submittedAt: '2026-07-03T17:00:00', kanitScore: 89 },
    ],
    status: 'scored', submittedAt: '2026-07-03T17:00:00',
    kanitScore: 90, kanitNote: 'Canvassing terus meningkat, 7 prospek rekor! Pelayanan sudah sangat baik.', kanitScoredAt: '2026-07-03T17:30:00',
  },
  {
    id: 'cl-fl003-11', day: 11, date: '2026-07-04', flId: 'fl-003',
    tasks: [
      { taskId: 'opening-cabang', taskName: 'SOP Opening Cabang', completedItemIds: OC_ITEMS_FULL, reflection: 'Opening lancar, semua sistem normal.', submittedAt: '2026-07-04T08:30:00', kanitScore: 87 },
      { taskId: 'personal-grooming-l2', taskName: 'Personal Grooming', completedItemIds: ['pg-1', 'pg-2', 'pg-3', 'pg-4'], reflection: 'Konsisten setiap hari tanpa pengecualian.', submittedAt: '2026-07-04T08:00:00', kanitScore: 92 },
      { taskId: 'canvassing', taskName: 'Canvassing', completedItemIds: ['cv-1', 'cv-2'], reflection: '5 prospek hari ini. Fokus di follow up — 3 dari kemarin sudah dijawab, 1 berencana datang akhir pekan.', submittedAt: '2026-07-04T13:00:00', kanitScore: 85 },
      { taskId: 'pelayanan-nasabah', taskName: 'Pelayanan Nasabah Visit', completedItemIds: PN_ITEMS_FULL, reflection: 'Pelayanan berjalan baik. Berhasil jelaskan produk perpanjangan kepada 2 nasabah yang baru pertama kali.', submittedAt: '2026-07-04T16:00:00', kanitScore: 85 },
      { taskId: 'pelayanan-nasabah-transaksi', taskName: 'Pelayanan Nasabah Transaksi', completedItemIds: PNT_ITEMS_FULL, reflection: 'Pelayanan berjalan baik. Berhasil jelaskan produk perpanjangan kepada 2 nasabah yang baru pertama kali.', submittedAt: '2026-07-04T16:00:00', kanitScore: 85 },
      { taskId: 'closing-cabang', taskName: 'SOP Closing Cabang', completedItemIds: ['cc-1', 'cc-2', 'cc-3', 'cc-4', 'cc-5', 'cc-6', 'cc-7', 'cc-8'], reflection: 'Rekap dan laporan selesai. Semua dokumen diamankan.', submittedAt: '2026-07-04T17:00:00', kanitScore: 81 },
    ],
    status: 'scored', submittedAt: '2026-07-04T17:00:00',
    kanitScore: 85, kanitNote: 'Progress pelayanan dan follow up canvassing konsisten bagus!', kanitScoredAt: '2026-07-04T17:30:00',
  },
  {
    id: 'cl-fl003-12', day: 12, date: '2026-07-05', flId: 'fl-003',
    tasks: [
      { taskId: 'opening-cabang', taskName: 'SOP Opening Cabang', completedItemIds: OC_ITEMS_FULL, reflection: 'Opening sesuai SOP, tidak ada kendala.', submittedAt: '2026-07-05T08:30:00', kanitScore: 88 },
      { taskId: 'personal-grooming-l2', taskName: 'Personal Grooming', completedItemIds: ['pg-1', 'pg-2', 'pg-3', 'pg-4'], reflection: '12 hari berturut-turut grooming terpenuhi. Sudah jadi kebiasaan yang natural.', submittedAt: '2026-07-05T08:00:00', kanitScore: 95 },
      { taskId: 'canvassing', taskName: 'Canvassing', completedItemIds: ['cv-1', 'cv-2'], reflection: '6 prospek baru dan follow up 2. Prospek akhir pekan kemarin jadi datang hari ini dan langsung transaksi!', submittedAt: '2026-07-05T13:00:00', kanitScore: 90 },
      { taskId: 'pelayanan-nasabah', taskName: 'Pelayanan Nasabah Visit', completedItemIds: PN_ITEMS_FULL, reflection: 'Ramai hari ini, tapi berhasil tangani semua nasabah dengan baik. Tidak ada keluhan.', submittedAt: '2026-07-05T16:00:00', kanitScore: 87 },
      { taskId: 'pelayanan-nasabah-transaksi', taskName: 'Pelayanan Nasabah Transaksi', completedItemIds: PNT_ITEMS_FULL, reflection: 'Ramai hari ini, tapi berhasil tangani semua nasabah dengan baik. Tidak ada keluhan.', submittedAt: '2026-07-05T16:00:00', kanitScore: 87 },
      { taskId: 'closing-cabang', taskName: 'SOP Closing Cabang', completedItemIds: ['cc-1', 'cc-2', 'cc-3', 'cc-4', 'cc-5', 'cc-6', 'cc-7', 'cc-8'], reflection: 'Rekap lebih lama karena transaksi banyak, tapi selesai tepat waktu.', submittedAt: '2026-07-05T17:00:00', kanitScore: 82 },
    ],
    status: 'scored', submittedAt: '2026-07-05T17:00:00',
    kanitScore: 87, kanitNote: 'Canvassing menghasilkan konversi nyata! 12 hari OJT — semua target modul tercapai. Bravo!', kanitScoredAt: '2026-07-05T17:30:00',
  },
  {
    id: 'cl-fl003-13', day: 13, date: '2026-07-06', flId: 'fl-003',
    tasks: [
      { taskId: 'opening-cabang', taskName: 'SOP Opening Cabang', completedItemIds: OC_ITEMS_FULL, reflection: 'Opening sempurna, semua item selesai sebelum jam buka.', submittedAt: '2026-07-06T08:30:00', kanitScore: 93 },
      { taskId: 'personal-grooming-l2', taskName: 'Personal Grooming', completedItemIds: ['pg-1', 'pg-2', 'pg-3', 'pg-4'], reflection: 'Hari terakhir OJT, tetap konsisten.', submittedAt: '2026-07-06T08:00:00', kanitScore: 95 },
      { taskId: 'canvassing', taskName: 'Canvassing', completedItemIds: ['cv-1', 'cv-2'], reflection: '8 prospek hari ini — terbanyak selama OJT. Semangat tinggi di hari penentuan.', submittedAt: '2026-07-06T13:00:00', kanitScore: 95 },
      { taskId: 'pelayanan-nasabah', taskName: 'Pelayanan Nasabah Visit', completedItemIds: PN_ITEMS_FULL, reflection: 'Melayani dengan percaya diri. Sudah bisa handle 2 nasabah sekaligus di jam sibuk.', submittedAt: '2026-07-06T16:00:00', kanitScore: 91 },
      { taskId: 'pelayanan-nasabah-transaksi', taskName: 'Pelayanan Nasabah Transaksi', completedItemIds: PNT_ITEMS_FULL, reflection: 'Melayani dengan percaya diri. Sudah bisa handle 2 nasabah sekaligus di jam sibuk.', submittedAt: '2026-07-06T16:00:00', kanitScore: 91 },
      { taskId: 'closing-cabang', taskName: 'SOP Closing Cabang', completedItemIds: ['cc-1', 'cc-2', 'cc-3', 'cc-4', 'cc-5', 'cc-6', 'cc-7', 'cc-8'], reflection: 'Rekap selesai 15 menit lebih cepat dari biasanya. Semua aman dan terdokumentasi.', submittedAt: '2026-07-06T17:00:00', kanitScore: 86 },
    ],
    status: 'scored', submittedAt: '2026-07-06T17:00:00',
    kanitScore: 91, kanitNote: 'OJT selesai dengan sangat memuaskan! Konsistensi sempurna di semua aspek. Siap jadi Frontliner.', kanitScoredAt: '2026-07-06T17:30:00',
  },
]

// Penaksiran milestone DailyChecklists for Budi (used by progress counting)
const fl003PenaksiranChecklists: DailyChecklist[] = [
  { id: 'cl-fl003-pe-1', day: 9, date: '2026-07-02', flId: 'fl-003', milestoneId: 'penaksiran-elektronik', milestoneName: 'Penaksiran Elektronik', items: [{ itemId: 'pe-1', completed: true }, { itemId: 'pe-3', completed: true }, { itemId: 'pe-5', completed: true }], status: 'scored', submittedAt: '2026-07-02T16:30:00', kanitScore: 90, kanitNote: 'Akurasi 94% untuk HP dan Laptop. Sangat bagus!', kanitScoredAt: '2026-07-02T17:00:00' },
  { id: 'cl-fl003-pe-2', day: 11, date: '2026-07-04', flId: 'fl-003', milestoneId: 'penaksiran-elektronik', milestoneName: 'Penaksiran Elektronik', items: [{ itemId: 'pe-8', completed: true }, { itemId: 'pe-10', completed: true }, { itemId: 'pe-11', completed: true }], status: 'scored', submittedAt: '2026-07-04T16:30:00', kanitScore: 87, kanitNote: 'Penaksiran Game Console dan Camera sudah di atas target.', kanitScoredAt: '2026-07-04T17:00:00' },
  { id: 'cl-fl003-pbk-1', day: 10, date: '2026-07-03', flId: 'fl-003', milestoneId: 'penaksiran-bpkb', milestoneName: 'Penaksiran BPKB', items: [{ itemId: 'pbk-1', completed: true }], status: 'scored', submittedAt: '2026-07-03T15:30:00', kanitScore: 88, kanitNote: 'Verifikasi dokumen BPKB sudah tepat. Perhatikan tahun kendaraan.', kanitScoredAt: '2026-07-03T16:00:00' },
  { id: 'cl-fl003-pbk-2', day: 12, date: '2026-07-05', flId: 'fl-003', milestoneId: 'penaksiran-bpkb', milestoneName: 'Penaksiran BPKB', items: [{ itemId: 'pbk-1', completed: true }], status: 'scored', submittedAt: '2026-07-05T15:30:00', kanitScore: 92, kanitNote: 'BPKB penaksiran ke-2 lebih akurat. Siap mandiri.', kanitScoredAt: '2026-07-05T16:00:00' },
]

// cl-fl002-7 (Sari's Day-7 checklist) removed entirely (2026-08-13) — had already lost
// its pelayanan-nasabah task (2026-08-12, zero-Level-2-progress pass) and opening-cabang
// task (earlier 2026-08-13, already-Lulus-module cleanup), leaving only closing-cabang as
// its sole task. Explicit ask: drop Closing Cabang from Sari's Kanit-side pending review
// too, so the FL and Kanit sides fully agree there's zero latihan history for it — not
// just "not pending," genuinely untouched. Her 3 "Terlambat" Level 1 modules
// (closing-cabang, sop-administrasi, packing-sealing) now all read 0/x, consistently.
const pendingChecklists: DailyChecklist[] = []

const fl004EarlyScores = [78, 82, 85, 80, 88, 90, 86]
const fl004DayScores = [84, 87, 92, 89, 91, 88]
const fl004DayNotes = ['Baik, terus tingkatkan!', 'Penaksiran sangat akurat!', 'Excellent, konsisten!', 'Pertahankan ritme ini!', 'Sangat konsisten!', 'Performa terbaik hari ini!']
// Per-task scores for fl004 days 8–13: [opening-cabang, pelayanan-nasabah, closing-cabang]
const fl004TaskScores: Record<number, [number, number, number]> = {
  8: [83, 85, 84], 9: [87, 88, 86], 10: [92, 93, 91],
  11: [89, 90, 88], 12: [91, 93, 89], 13: [88, 89, 87],
}

const fl004Checklists: DailyChecklist[] = [
  // Days 1–6: personal-grooming every day, closing-cabang (days 1–3) then
  // opening-cabang (days 4–6) — all items fully completed so the Lulus/Tidak
  // Lulus verdict (based on minRequired thresholds) genuinely reads "Lulus".
  ...Array.from({ length: 6 }, (_, i) => {
    const day = i + 1
    const d = new Date('2026-06-24')
    d.setDate(d.getDate() + i)
    const date = d.toISOString().split('T')[0]
    const isClosingWeek = day <= 3
    return {
      id: `cl-fl004-${day}`, day, date, flId: 'fl-004',
      tasks: [
        { taskId: 'personal-grooming', taskName: 'Personal Grooming', completedItemIds: PG_ITEMS_FULL, reflection: 'Grooming sesuai standar.', submittedAt: `${date}T07:30:00`, kanitScore: 90 },
        isClosingWeek
          ? { taskId: 'closing-cabang', taskName: 'SOP Closing Cabang', completedItemIds: CC_ITEMS_FULL, reflection: 'Closing selesai tepat waktu, rekap kas sesuai.', submittedAt: `${date}T17:00:00`, kanitScore: fl004EarlyScores[i] }
          : { taskId: 'opening-cabang', taskName: 'SOP Opening Cabang', completedItemIds: OC_ITEMS_FULL, reflection: 'Opening sesuai SOP, tidak ada kendala.', submittedAt: `${date}T08:30:00`, kanitScore: fl004EarlyScores[i] },
      ],
      status: 'scored' as const,
      submittedAt: `${date}T17:00:00`,
      kanitScore: fl004EarlyScores[i],
      kanitNote: 'Progress baik, terus tingkatkan!',
      kanitScoredAt: `${date}T17:30:00`,
    }
  }),
  ...Array.from({ length: 5 }, (_, i) => {
    const day = i + 8
    const d = new Date('2026-07-01')
    d.setDate(d.getDate() + i)
    const date = d.toISOString().split('T')[0]
    const ts = fl004TaskScores[day]
    return {
      id: `cl-fl004-${day}`, day, date, flId: 'fl-004',
      tasks: [
        { taskId: 'personal-grooming-l2', taskName: 'Personal Grooming', completedItemIds: PG_ITEMS_FULL, reflection: 'Grooming tetap terjaga.', submittedAt: `${date}T07:30:00`, kanitScore: 92 },
        { taskId: 'opening-cabang', taskName: 'SOP Opening Cabang', completedItemIds: OC_ITEMS_FULL, reflection: 'Opening sesuai SOP, tidak ada kendala.', submittedAt: `${date}T08:30:00`, kanitScore: ts[0] },
        { taskId: 'pelayanan-nasabah', taskName: 'Pelayanan Nasabah Visit', completedItemIds: PN_ITEMS_FULL, reflection: 'Pelayanan nasabah berjalan lancar dan profesional.', submittedAt: `${date}T16:00:00`, kanitScore: ts[1] },
        { taskId: 'pelayanan-nasabah-transaksi', taskName: 'Pelayanan Nasabah Transaksi', completedItemIds: PNT_ITEMS_FULL, reflection: 'Pelayanan nasabah berjalan lancar dan profesional.', submittedAt: `${date}T16:00:00`, kanitScore: ts[1] },
        { taskId: 'closing-cabang', taskName: 'SOP Closing Cabang', completedItemIds: CC_ITEMS_FULL, reflection: 'Closing selesai tepat waktu, rekap kas sesuai.', submittedAt: `${date}T17:00:00`, kanitScore: ts[2] },
      ],
      status: 'scored' as const,
      submittedAt: `${date}T17:00:00`,
      kanitScore: fl004DayScores[i],
      kanitNote: fl004DayNotes[i],
      kanitScoredAt: `${date}T17:30:00`,
    }
  }),
  {
    id: 'cl-fl004-13', day: 13, date: '2026-07-06', flId: 'fl-004',
    tasks: [
      { taskId: 'personal-grooming-l2', taskName: 'Personal Grooming', completedItemIds: PG_ITEMS_FULL, reflection: 'Hari terakhir OJT, tetap konsisten.', submittedAt: '2026-07-06T07:30:00', kanitScore: 95 },
      { taskId: 'opening-cabang', taskName: 'SOP Opening Cabang', completedItemIds: OC_ITEMS_FULL, reflection: 'Opening hari terakhir! Sudah sangat hafal semua prosedur tanpa perlu panduan.', submittedAt: '2026-07-06T08:00:00', kanitScore: 93 },
      { taskId: 'pelayanan-nasabah', taskName: 'Pelayanan Nasabah Visit', completedItemIds: PN_ITEMS_FULL, reflection: 'Pelayanan terbaik sepanjang OJT. Bangga bisa menutup dengan performa penuh.', submittedAt: '2026-07-06T16:00:00', kanitScore: 95 },
      { taskId: 'pelayanan-nasabah-transaksi', taskName: 'Pelayanan Nasabah Transaksi', completedItemIds: PNT_ITEMS_FULL, reflection: 'Pelayanan terbaik sepanjang OJT. Bangga bisa menutup dengan performa penuh.', submittedAt: '2026-07-06T16:00:00', kanitScore: 95 },
      { taskId: 'closing-cabang', taskName: 'SOP Closing Cabang', completedItemIds: CC_ITEMS_FULL, reflection: 'Closing terakhir. Rekap bersih, tidak ada selisih. Terima kasih atas bimbingannya!', submittedAt: '2026-07-06T17:00:00', kanitScore: 91 },
    ],
    status: 'scored', submittedAt: '2026-07-06T17:00:00',
    kanitScore: 93, kanitNote: 'Penutup yang luar biasa! Dewi menunjukkan kemajuan konsisten selama 13 hari. Semangat terus!', kanitScoredAt: '2026-07-06T17:30:00',
  },
]

const fl004Penaksiran: PenaksiranRecord[] = [
  {
    id: 'pk-fl004-1', day: 9, date: '2026-07-02', flId: 'fl-004',
    barangType: 'Emas', barangDescription: 'Emas 24K — gelang 8 gram',
    flEstimate: 7500000, intoolsValue: 7480000, accuracy: 99.7,
    kanitScore: 98, kanitNote: 'Hampir sempurna! Penaksiran sangat presisi.', kanitScoredAt: '2026-07-02T18:00:00',
  },
  {
    id: 'pk-fl004-2', day: 10, date: '2026-07-03', flId: 'fl-004',
    barangType: 'Elektronik', barangDescription: 'Samsung Galaxy S23 second',
    flEstimate: 7000000, intoolsValue: 6800000, accuracy: 97.1,
    kanitScore: 90, kanitNote: 'Akurasi bagus untuk elektronik second.', kanitScoredAt: '2026-07-03T18:00:00',
  },
  {
    id: 'pk-fl004-3', day: 11, date: '2026-07-04', flId: 'fl-004',
    barangType: 'Emas', barangDescription: 'Emas 18K — cincin 4 gram',
    flEstimate: 2800000, intoolsValue: 2950000, accuracy: 94.9,
    kanitScore: 85, kanitNote: 'Perhatikan konversi kadar 18K lebih teliti.', kanitScoredAt: '2026-07-04T18:00:00',
  },
]

// Rizky (fl-005, Hari 10) — Level 1 fully clean (days 1–6), Level 2 genuinely mid-flight:
// pelayanan-nasabah and customer-service-wa partway through, penaksiran-bpkb done,
// penaksiran-elektronik half done, penaksiran-emas not started at all.
const fl005Checklists: DailyChecklist[] = [
  ...Array.from({ length: 6 }, (_, i) => {
    const day = i + 1
    const d = new Date('2026-06-24')
    d.setDate(d.getDate() + i)
    const date = d.toISOString().split('T')[0]
    const isClosingWeek = day <= 3
    return {
      id: `cl-fl005-${day}`, day, date, flId: 'fl-005',
      tasks: [
        { taskId: 'personal-grooming', taskName: 'Personal Grooming', completedItemIds: PG_ITEMS_FULL, reflection: 'Grooming sesuai standar.', submittedAt: `${date}T07:30:00`, kanitScore: 90 },
        isClosingWeek
          ? { taskId: 'closing-cabang', taskName: 'SOP Closing Cabang', completedItemIds: CC_ITEMS_FULL, reflection: 'Closing selesai tepat waktu, rekap kas sesuai.', submittedAt: `${date}T17:00:00`, kanitScore: 86 }
          : { taskId: 'opening-cabang', taskName: 'SOP Opening Cabang', completedItemIds: OC_ITEMS_FULL, reflection: 'Opening sesuai SOP, tidak ada kendala.', submittedAt: `${date}T08:30:00`, kanitScore: 88 },
      ],
      status: 'scored' as const,
      submittedAt: `${date}T17:00:00`,
      kanitScore: 87,
      kanitNote: 'Konsisten dan rapi, terus pertahankan!',
      kanitScoredAt: `${date}T17:30:00`,
    }
  }),
  {
    id: 'cl-fl005-8', day: 8, date: '2026-07-01', flId: 'fl-005',
    tasks: [
      { taskId: 'personal-grooming-l2', taskName: 'Personal Grooming', completedItemIds: PG_ITEMS_FULL, reflection: 'Grooming tetap terjaga di Level 2.', submittedAt: '2026-07-01T07:30:00', kanitScore: 90 },
      { taskId: 'pelayanan-nasabah', taskName: 'Pelayanan Nasabah Visit', completedItemIds: PN_ITEMS_FULL, reflection: 'Sambutan dan edukasi nasabah berjalan lancar.', submittedAt: '2026-07-01T16:00:00', kanitScore: 86 },
      { taskId: 'pelayanan-nasabah-transaksi', taskName: 'Pelayanan Nasabah Transaksi', completedItemIds: PNT_ITEMS_FULL, reflection: 'Sambutan dan edukasi nasabah berjalan lancar.', submittedAt: '2026-07-01T16:00:00', kanitScore: 86 },
      { taskId: 'customer-service-wa', taskName: 'Customer Service via WA', completedItemIds: ['csw-1', 'csw-2'], reflection: 'Reminder jatuh tempo terkirim, 2 nasabah langsung konfirmasi perpanjangan.', submittedAt: '2026-07-01T11:00:00', kanitScore: 85 },
    ],
    status: 'scored', submittedAt: '2026-07-01T17:00:00',
    kanitScore: 87, kanitNote: 'Awal yang bagus di Level 2. Lanjutkan!', kanitScoredAt: '2026-07-01T17:30:00',
  },
  {
    id: 'cl-fl005-9', day: 9, date: '2026-07-02', flId: 'fl-005',
    tasks: [
      { taskId: 'personal-grooming-l2', taskName: 'Personal Grooming', completedItemIds: PG_ITEMS_FULL, reflection: 'Konsisten rapi.', submittedAt: '2026-07-02T07:30:00', kanitScore: 90 },
      { taskId: 'pelayanan-nasabah', taskName: 'Pelayanan Nasabah Visit', completedItemIds: PN_ITEMS_FULL, reflection: 'Nasabah baru dilayani dari awal sampai selesai transaksi.', submittedAt: '2026-07-02T16:00:00', kanitScore: 88 },
      { taskId: 'pelayanan-nasabah-transaksi', taskName: 'Pelayanan Nasabah Transaksi', completedItemIds: PNT_ITEMS_FULL, reflection: 'Nasabah baru dilayani dari awal sampai selesai transaksi.', submittedAt: '2026-07-02T16:00:00', kanitScore: 88 },
    ],
    status: 'scored', submittedAt: '2026-07-02T17:00:00',
    kanitScore: 89, kanitNote: 'Pelayanan nasabah semakin percaya diri.', kanitScoredAt: '2026-07-02T17:30:00',
  },
  // Day 10 (his current day) — Pelayanan Nasabah Visit only, left unscored on purpose:
  // this is the one pending-review example added 2026-08-24 for the Kanit dashboard
  // ("ongoing Level 2 FL with a pending Pelayanan Nasabah Visit review"). No sibling
  // tasks bundled in this entry (unlike day 8/9) — keeps this specific checklist's
  // moduleKeyOf() resolving to 'pelayanan-nasabah' cleanly for the review-latihan link.
  {
    id: 'cl-fl005-10', day: 10, date: '2026-07-03', flId: 'fl-005',
    tasks: [
      { taskId: 'pelayanan-nasabah', taskName: 'Pelayanan Nasabah Visit', completedItemIds: PN_ITEMS_FULL, reflection: 'Nasabah komplain lama menunggu, tapi berhasil ditenangkan sambil dijelaskan estimasi waktu.', submittedAt: '2026-07-03T16:00:00' },
    ],
    status: 'submitted', submittedAt: '2026-07-03T16:00:00',
  },
]

const fl005PenaksiranChecklists: DailyChecklist[] = [
  { id: 'cl-fl005-pe-1', day: 9, date: '2026-07-02', flId: 'fl-005', milestoneId: 'penaksiran-elektronik', milestoneName: 'Penaksiran Elektronik', items: [{ itemId: 'pe-1', completed: true }, { itemId: 'pe-3', completed: true }, { itemId: 'pe-5', completed: true }], status: 'scored', submittedAt: '2026-07-02T16:30:00', kanitScore: 86, kanitNote: 'Penaksiran HP dan Laptop sudah akurat.', kanitScoredAt: '2026-07-02T17:00:00' },
  { id: 'cl-fl005-pbk-1', day: 8, date: '2026-07-01', flId: 'fl-005', milestoneId: 'penaksiran-bpkb', milestoneName: 'Penaksiran BPKB', items: [{ itemId: 'pbk-1', completed: true }], status: 'scored', submittedAt: '2026-07-01T15:30:00', kanitScore: 87, kanitNote: 'Verifikasi dokumen BPKB sudah tepat.', kanitScoredAt: '2026-07-01T16:00:00' },
  { id: 'cl-fl005-pbk-2', day: 9, date: '2026-07-02', flId: 'fl-005', milestoneId: 'penaksiran-bpkb', milestoneName: 'Penaksiran BPKB', items: [{ itemId: 'pbk-1', completed: true }], status: 'scored', submittedAt: '2026-07-02T15:30:00', kanitScore: 90, kanitNote: 'BPKB penaksiran ke-2 lebih akurat. Siap mandiri.', kanitScoredAt: '2026-07-02T16:00:00' },
]

export const INITIAL_CHECKLISTS: DailyChecklist[] = [
  ...fl001Checklists,
  ...fl002Checklists,
  ...fl003Checklists,
  ...fl003PenaksiranChecklists,
  ...fl004Checklists,
  ...fl005Checklists,
  ...fl005PenaksiranChecklists,
  ...pendingChecklists,
]

export const INITIAL_PENAKSIRAN: PenaksiranRecord[] = [
  {
    id: 'pk-fl003-1', day: 10, date: '2026-07-03', flId: 'fl-003',
    barangType: 'Emas', barangDescription: 'Emas 24K — kalung 10 gram',
    flEstimate: 9200000, intoolsValue: 9350000, accuracy: 98.4,
    kanitScore: 95, kanitNote: 'Sangat akurat! Selisih hanya 1.6%', kanitScoredAt: '2026-07-03T18:00:00',
  },
  {
    id: 'pk-fl003-2', day: 11, date: '2026-07-04', flId: 'fl-003',
    barangType: 'Emas', barangDescription: 'Emas 18K — cincin 5 gram',
    flEstimate: 3800000, intoolsValue: 3950000, accuracy: 96.2,
    kanitScore: 88, kanitNote: 'Akurasi baik. Perhatikan konversi kadar 18K.', kanitScoredAt: '2026-07-04T18:00:00',
  },
  {
    id: 'pk-fl003-3', day: 12, date: '2026-07-05', flId: 'fl-003',
    barangType: 'Elektronik', barangDescription: 'iPhone 13 Pro 256GB second',
    flEstimate: 8500000, intoolsValue: 8200000, accuracy: 96.3,
    kanitScore: 85, kanitNote: 'Sedikit overestimate untuk HP second. Perhatikan kondisi dan kelengkapan.', kanitScoredAt: '2026-07-05T18:00:00',
  },
  {
    id: 'pk-fl003-4', day: 13, date: '2026-07-06', flId: 'fl-003',
    barangType: 'Emas', barangDescription: 'Emas 24K — gelang 8 gram',
    flEstimate: 7500000, intoolsValue: 7480000, accuracy: 99.7,
    kanitScore: 98, kanitNote: 'Hampir sempurna! Penaksiran yang sangat presisi.', kanitScoredAt: '2026-07-06T18:00:00',
  },
  ...fl004Penaksiran,
  {
    id: 'pk-fl005-1', day: 9, date: '2026-07-02', flId: 'fl-005',
    barangType: 'Elektronik', barangDescription: 'Samsung Galaxy S22 second',
    flEstimate: 5200000, intoolsValue: 5100000, accuracy: 98.1,
    kanitScore: 88, kanitNote: 'Akurasi bagus untuk penaksiran elektronik pertama.', kanitScoredAt: '2026-07-02T18:00:00',
  },
]

export const ASSESSMENT_QUESTIONS = [
  {
    id: 'q1',
    question: 'Berapa menit sebelum jam buka, frontliner harus sudah tiba di kantor untuk melakukan opening?',
    options: ['15 menit', '30 menit', '45 menit', '60 menit'],
    correctIndex: 1,
  },
  {
    id: 'q2',
    question: 'Jika terdapat selisih pada rekap kas harian, langkah pertama yang harus dilakukan adalah...',
    options: ['Langsung laporkan ke Kanit', 'Hitung ulang semua uang fisik', 'Abaikan jika selisihnya kecil', 'Catat di buku harian dan lanjutkan'],
    correctIndex: 1,
  },
  {
    id: 'q3',
    question: 'Harga emas hari ini Rp 1.050.000/gram. Berapakah nilai taksiran emas 24K seberat 5 gram?',
    options: ['Rp 4.200.000', 'Rp 5.000.000', 'Rp 5.250.000', 'Rp 6.000.000'],
    correctIndex: 2,
  },
  {
    id: 'q4',
    question: 'Manakah urutan alur transaksi gadai baru yang benar?',
    options: [
      'Taksir barang → Identifikasi nasabah → Buat SBG → Serahkan uang',
      'Identifikasi nasabah → Taksir barang → Buat SBG → Serahkan uang',
      'Buat SBG → Identifikasi nasabah → Taksir barang → Serahkan uang',
      'Identifikasi nasabah → Buat SBG → Taksir barang → Serahkan uang',
    ],
    correctIndex: 1,
  },
  {
    id: 'q5',
    question: 'Apa yang WAJIB tertulis pada label/stiker barang gadai?',
    options: [
      'Nama nasabah, nomor SBG, dan nama frontliner',
      'Nomor SBG, tanggal gadai, dan paraf frontliner',
      'Nama nasabah, nilai taksiran, dan tanggal jatuh tempo',
      'Nomor SBG, nama kantor cabang, dan nilai taksiran',
    ],
    correctIndex: 1,
  },
  {
    id: 'q6',
    question: 'Prinsip penanganan komplain nasabah yang diajarkan selama OJT disingkat...',
    options: ['CARE', 'HEAR', 'STAR', 'HELP'],
    correctIndex: 1,
  },
  {
    id: 'q7',
    question: 'Manakah dari berikut ini yang BUKAN standar greeting nasabah di Pandai Gadai?',
    options: [
      'Berdiri saat nasabah datang',
      'Menyapa dengan senyum',
      'Langsung duduk dan bertanya keperluan',
      'Mempersilakan nasabah duduk',
    ],
    correctIndex: 2,
  },
  {
    id: 'q8',
    question: 'Tujuan utama dari proses packing & sealing barang gadai adalah...',
    options: [
      'Mempercantik tampilan barang',
      'Memudahkan penyimpanan di gudang',
      'Menjaga keamanan dan identitas barang gadai',
      'Memenuhi standar ISO perusahaan',
    ],
    correctIndex: 2,
  },
  {
    id: 'q9',
    question: 'Dalam canvassing, pendekatan yang paling efektif untuk mendapatkan nasabah baru adalah...',
    options: [
      'Menyebar brosur di tempat umum tanpa seleksi',
      'Menghubungi referensi dari nasabah yang sudah ada',
      'Memasang iklan di media sosial pribadi',
      'Menunggu nasabah datang sendiri ke kantor',
    ],
    correctIndex: 1,
  },
  {
    id: 'q10',
    question: 'Dokumen utama yang dipegang nasabah sebagai bukti gadai disebut...',
    options: ['Surat Perjanjian Kredit (SPK)', 'Surat Bukti Gadai (SBG)', 'Formulir Taksiran Barang (FTB)', 'Kartu Nasabah (KN)'],
    correctIndex: 1,
  },
  {
    id: 'q11',
    question: 'Nasabah ingin memperpanjang masa gadai. Langkah pertama frontliner adalah...',
    options: [
      'Taksir ulang barang gadai',
      'Cetak formulir perpanjangan langsung',
      'Verifikasi identitas nasabah dan nomor SBG',
      'Hitung bunga yang harus dibayar',
    ],
    correctIndex: 2,
  },
  {
    id: 'q12',
    question: 'Apa perbedaan utama dalam menghitung taksiran emas 18K dibanding 24K?',
    options: [
      'Tidak ada perbedaan, harga per gram sama',
      'Emas 18K dikalikan faktor konversi kadar (18/24)',
      'Emas 18K selalu lebih mahal dari 24K',
      'Emas 18K menggunakan harga pasar berbeda',
    ],
    correctIndex: 1,
  },
  {
    id: 'q13',
    question: 'Berapa toleransi selisih rekap kas yang diperbolehkan tanpa harus melapor ke Kanit?',
    options: ['Rp 1.000', 'Rp 5.000', 'Rp 10.000', 'Tidak ada — selisih sekecil apapun harus dilaporkan'],
    correctIndex: 3,
  },
  {
    id: 'q14',
    question: 'Nilai akhir OJT dihitung dari berapa komponen penilaian?',
    options: ['2 komponen', '3 komponen', '4 komponen', '5 komponen'],
    correctIndex: 1,
  },
  {
    id: 'q15',
    question: 'Saat closing kantor, laporan yang HARUS diselesaikan sebelum frontliner meninggalkan kantor adalah...',
    options: [
      'Laporan kunjungan nasabah harian',
      'Laporan penaksiran barang',
      'Laporan transaksi harian dan rekap kas',
      'Laporan canvassing mingguan',
    ],
    correctIndex: 2,
  },
]

export const MASTERY_MATERIALS = [
  { materialId: 'oc', material: 'SOP Opening & Closing Kantor' },
  { materialId: 'ps', material: 'Standar Packing & Sealing Barang Gadai' },
  { materialId: 'cv', material: 'Teknik dan Script Canvassing' },
  { materialId: 'pd', material: 'Standar Pelayanan dan Penanganan Komplain' },
  { materialId: 'pt', material: 'Alur Transaksi Gadai, Tebus, dan Perpanjangan' },
  { materialId: 'pn', material: 'Teknik Penaksiran dan Penggunaan Intools' },
]

export const INITIAL_ASSESSMENTS: Assessment[] = [
  {
    id: 'assess-fl-004',
    flId: 'fl-004',
    day: 13,
    date: '2026-07-06',
    masteryChecks: [
      { materialId: 'oc', material: 'SOP Opening & Closing Kantor', mastered: true },
      { materialId: 'ps', material: 'Standar Packing & Sealing Barang Gadai', mastered: true },
      { materialId: 'cv', material: 'Teknik dan Script Canvassing', mastered: true },
      { materialId: 'pd', material: 'Standar Pelayanan dan Penanganan Komplain', mastered: true },
      { materialId: 'pt', material: 'Alur Transaksi Gadai, Tebus, dan Perpanjangan', mastered: false },
      { materialId: 'pn', material: 'Teknik Penaksiran dan Penggunaan Intools', mastered: true },
    ],
    answers: [
      { questionId: 'q1', question: 'Berapa menit sebelum jam buka, frontliner harus sudah tiba di kantor untuk melakukan opening?', answer: '30 menit' },
      { questionId: 'q2', question: 'Jika terdapat selisih pada rekap kas harian, langkah pertama yang harus dilakukan adalah...', answer: 'Hitung ulang semua uang fisik' },
      { questionId: 'q3', question: 'Harga emas hari ini Rp 1.050.000/gram. Berapakah nilai taksiran emas 24K seberat 5 gram?', answer: 'Rp 5.000.000' },
      { questionId: 'q4', question: 'Manakah urutan alur transaksi gadai baru yang benar?', answer: 'Identifikasi nasabah → Taksir barang → Buat SBG → Serahkan uang' },
      { questionId: 'q5', question: 'Apa yang WAJIB tertulis pada label/stiker barang gadai?', answer: 'Nomor SBG, tanggal gadai, dan paraf frontliner' },
      { questionId: 'q6', question: 'Prinsip penanganan komplain nasabah yang diajarkan selama OJT disingkat...', answer: 'HEAR' },
      { questionId: 'q7', question: 'Manakah dari berikut ini yang BUKAN standar greeting nasabah di Pandai Gadai?', answer: 'Langsung duduk dan bertanya keperluan' },
      { questionId: 'q8', question: 'Tujuan utama dari proses packing & sealing barang gadai adalah...', answer: 'Menjaga keamanan dan identitas barang gadai' },
      { questionId: 'q9', question: 'Dalam canvassing, pendekatan yang paling efektif untuk mendapatkan nasabah baru adalah...', answer: 'Menyebar brosur di tempat umum tanpa seleksi' },
      { questionId: 'q10', question: 'Dokumen utama yang dipegang nasabah sebagai bukti gadai disebut...', answer: 'Surat Bukti Gadai (SBG)' },
      { questionId: 'q11', question: 'Nasabah ingin memperpanjang masa gadai. Langkah pertama frontliner adalah...', answer: 'Hitung bunga yang harus dibayar' },
      { questionId: 'q12', question: 'Apa perbedaan utama dalam menghitung taksiran emas 18K dibanding 24K?', answer: 'Emas 18K dikalikan faktor konversi kadar (18/24)' },
      { questionId: 'q13', question: 'Berapa toleransi selisih rekap kas yang diperbolehkan tanpa harus melapor ke Kanit?', answer: 'Rp 5.000' },
      { questionId: 'q14', question: 'Nilai akhir OJT dihitung dari berapa komponen penilaian?', answer: '3 komponen' },
      { questionId: 'q15', question: 'Saat closing kantor, laporan yang HARUS diselesaikan sebelum frontliner meninggalkan kantor adalah...', answer: 'Laporan transaksi harian dan rekap kas' },
    ],
    status: 'selesai',
    submittedAt: '2026-07-06T18:30:00',
    mcqScore: 79,
  },
]

export const MOCK_TASK_CONFIRMATIONS: TaskConfirmation[] = [
  // fl-001 (Andi) — sa1-a/sa2-a (already-reviewed Gadai Baru/Perpanjangan sessions) and
  // the entire ps1-a/b/c/d packing-sealing block were REMOVED on 2026-08-12 (second
  // handover-demo pass) — Closing Cabang/Packing Sealing both read as fully untouched
  // ("Belum dimulai"). Third pass (2026-08-13, exact spec): SOP Administrasi has 1 Day-1
  // submission (already reviewed, Lulus-worthy — mock-tc-fl001-sa1-day1 below) PLUS 1
  // Day-2 pending submission (mock-tc-fl001-sa1-pending) — 2 sessions total, not just 1.
  {
    id: 'mock-tc-fl001-sa1-day1',
    flId: 'fl-001',
    milestoneId: 'sop-administrasi',
    itemId: 'sa-1',
    itemText: 'Gadai Baru Elektronik',
    nomorSbg: 'SBG-2026-00201',
    catatan: 'Input data nasabah dan barang (HP) di Intools, proses pencairan di Kopra, cetak SBG dan serahkan ke nasabah.',
    kanitNote: 'Input Intools dan Kopra sudah benar. Pastikan SBG selalu dicetak sebelum menyerahkan barang ke nasabah.',
    kanitPassed: true,
    kanitReviewedAt: '2026-07-24T09:35:00',
    submittedAt: '2026-07-24T09:30:00',
    day: 1,
  },
  {
    id: 'mock-tc-fl003-ps1-a',
    flId: 'fl-003',
    milestoneId: 'packing-sealing',
    itemId: 'ps-1',
    itemText: 'Packing & Penyimpanan Handphone/Tablet',
    nomorSbg: 'SBG-2026-00205',
    catatan: 'Sudah mengikuti prosedur sealing dengan benar.',
    kanitNote: 'Packing rapi dan label terpasang dengan benar. Pertahankan!',
    submittedAt: '2026-07-27T10:00:00',
    day: 3,
  },

  // Andi's Day-2 pending SOP Administrasi session — kanitPassed intentionally left unset
  // so this surfaces in Kanit's "Menunggu Review" list via KanitReviewConfirmation.tsx.
  // Paired with mock-tc-fl001-sa1-day1 above (Day 1, already reviewed) and Canvassing's
  // 1 pending session in fl001Checklists, Andi's total pending-review count is exactly 2
  // (1 Canvassing + 1 SOP Administrasi), across exactly 2 modules with any progress at
  // all (Personal Grooming's 1 Day-1 session is already resolved, not pending).
  {
    id: 'mock-tc-fl001-sa1-pending',
    flId: 'fl-001',
    milestoneId: 'sop-administrasi',
    itemId: 'sa-1',
    itemText: 'Gadai Baru Elektronik',
    nomorSbg: 'SBG-2026-00250',
    catatan: 'Input data nasabah dan barang (HP) di Intools, proses pencairan di Kopra, cetak SBG dan serahkan ke nasabah.',
    submittedAt: '2026-07-25T09:30:00',
    day: 2,
  },
  // Sari (fl-002) — 1 pending Penaksiran confirmation per module (Elektronik/Emas/BPKB),
  // re-added 2026-08-13 (had been removed 2026-08-12 when she needed to show zero Level 2
  // progress everywhere — that framing has since changed to "1 already submitted &
  // pending review per Penaksiran module" instead). Together these still exercise both
  // branches of every discounter form's own type-picker, same as before removal.
  {
    id: 'mock-tc-fl002-pe1-pending',
    flId: 'fl-002',
    milestoneId: 'penaksiran-elektronik',
    itemId: 'pe-1',
    itemText: 'Handphone – Android',
    // Nomor SBG filled in (2026-08-13) — demo example of the new optional field on
    // Penaksiran forms actually showing up on the Kanit's pending-review page (see
    // ConfirmationReview's isPenaksiran branch in KanitReviewConfirmation.tsx).
    nomorSbg: 'SBG-2026-00312',
    catatan: 'Tipe Item: SAMSUNG GALAXY A54 8 / 256 GB 2023\nPotongan Nilai: LCD Minus: Ringan, Baterai Gembung\nRefleksi: Kondisi LCD ada baret halus, baterai agak menggembung tapi masih berfungsi normal.',
    submittedAt: '2026-08-04T11:00:00',
    day: 8,
  },
  {
    id: 'mock-tc-fl002-pbk1-pending',
    flId: 'fl-002',
    milestoneId: 'penaksiran-bpkb',
    itemId: 'pbk-1',
    itemText: 'Penaksiran BPKB Instant sesuai prosedur standar',
    catatan: 'Tipe Item: HONDA VARIO 160 2021 (Basis Nilai: Rp 14.500.000)\nKepemilikan: Diri Sendiri\nDokumen: STNK B1234XYZ (berlaku s/d 2027-03-10), Mesin JM123456, BPKB K-9988776, Rangka MH1JM1234K123456\nPengecekan Luar: Warna Hitam, Plat B 1234 XYZ\nRefleksi: Semua dokumen lengkap dan sesuai, kondisi motor masih bagus.',
    submittedAt: '2026-08-04T13:30:00',
    day: 8,
  },
  {
    id: 'mock-tc-fl002-pem1-pending',
    flId: 'fl-002',
    milestoneId: 'penaksiran-emas',
    itemId: 'pem-1',
    itemText: 'Penaksiran Emas sesuai prosedur standar',
    catatan: 'Tipe Item: Perhiasan\nJenis Perhiasan: Cincin\nKadar: 18K (75%)\nBerat: 5.2 gram\nRefleksi: Kadar diverifikasi dengan jarum uji, hasil sesuai klaim nasabah. Berat ditimbang dua kali untuk memastikan akurasi.',
    submittedAt: '2026-08-04T15:00:00',
    day: 8,
  },
]

export const MOCK_NOTIFICATIONS: FLNotification[] = [
  // ── Andi (fl-001, Hari 6) ────────────────────────────────
  {
    id: 'notif-fl001-1',
    flId: 'fl-001',
    type: 'persetujuan_kanit',
    title: 'SOP Administrasi',
    body: 'Kanit menyetujui carry-over modul ini ke Minggu 2. Kamu bisa melanjutkan latihan minggu depan.',
    milestoneId: 'sop-administrasi',
    milestoneName: 'SOP Administrasi',
    read: false,
    createdAt: '2026-07-28T17:00:00',
  },
  {
    id: 'notif-fl001-2',
    flId: 'fl-001',
    type: 'feedback_latihan',
    title: 'Praktik Packing & Penyimpanan',
    body: 'Kamu dapat feedback dari Kanit: "Dokumen tersimpan rapi. Modul packing selesai!"',
    milestoneId: 'packing-sealing',
    milestoneName: 'Praktik Packing & Penyimpanan',
    read: false,
    createdAt: '2026-07-28T15:30:00',
  },
  {
    id: 'notif-fl001-3',
    flId: 'fl-001',
    type: 'feedback_latihan',
    title: 'Praktik Packing & Penyimpanan',
    body: 'Kamu dapat feedback dari Kanit: "Controller dan kabel sudah dimasukkan. Bagus!"',
    milestoneId: 'packing-sealing',
    milestoneName: 'Praktik Packing & Penyimpanan',
    read: false,
    createdAt: '2026-07-27T14:30:00',
  },
  {
    id: 'notif-fl001-4',
    flId: 'fl-001',
    type: 'feedback_latihan',
    title: 'SOP Administrasi',
    body: 'Kamu dapat feedback dari Kanit: "Pemahaman alur perpanjangan perlu diperkuat. Coba ulangi materi sebelum latihan berikutnya."',
    milestoneId: 'sop-administrasi',
    milestoneName: 'SOP Administrasi',
    read: true,
    createdAt: '2026-07-25T14:30:00',
  },

  {
    id: 'notif-fl001-5',
    flId: 'fl-001',
    type: 'quiz_unlocked',
    title: 'Mini Quiz Canvassing Terbuka',
    body: 'Kamu sudah menyelesaikan target latihan Canvassing. Mini quiz kini bisa dikerjakan.',
    milestoneId: 'canvassing',
    milestoneName: 'Canvassing',
    read: false,
    createdAt: '2026-07-26T10:00:00',
  },

  // ── Sari (fl-002, Hari 8) ────────────────────────────────
  {
    id: 'notif-fl002-1',
    flId: 'fl-002',
    type: 'feedback_latihan',
    title: 'Canvassing',
    body: 'Kamu dapat feedback dari Kanit: "Penjelasan ke calon nasabah sudah bagus, tapi pelaporan Avenza perlu lebih konsisten."',
    milestoneId: 'canvassing',
    milestoneName: 'Canvassing',
    read: false,
    createdAt: '2026-07-24T16:00:00',
  },
  {
    id: 'notif-fl002-2',
    flId: 'fl-002',
    type: 'feedback_latihan',
    title: 'Personal Grooming',
    body: 'Kamu dapat feedback dari Kanit: "Penampilan sudah rapi dan konsisten. Pertahankan!"',
    milestoneId: 'personal-grooming',
    milestoneName: 'Personal Grooming',
    read: true,
    createdAt: '2026-07-21T09:00:00',
  },

  // ── Budi (fl-003, Hari 13) ───────────────────────────────
  {
    id: 'notif-fl003-1',
    flId: 'fl-003',
    type: 'final_assessment',
    title: 'Final Assessment OJT',
    body: 'Hari ke-13 sudah tiba. Final assessment kini sudah dibuka — kerjakan hari ini. Beberapa modul latihan kamu juga masih perlu diselesaikan.',
    read: false,
    createdAt: '2026-07-24T08:00:00',
  },
  {
    id: 'notif-fl003-2',
    flId: 'fl-003',
    type: 'feedback_latihan',
    title: 'Penaksiran Elektronik',
    body: 'Kamu dapat feedback dari Kanit: "Estimasi harga Macbook sudah akurat. Nilai penaksiran elektronik kamu bagus!"',
    milestoneId: 'penaksiran-elektronik',
    milestoneName: 'Penaksiran Elektronik',
    read: true,
    createdAt: '2026-07-22T14:00:00',
  },

  // ── Dewi (fl-004, Hari 13) ───────────────────────────────
  {
    id: 'notif-fl004-1',
    flId: 'fl-004',
    type: 'final_assessment',
    title: 'Final Assessment OJT',
    body: 'Selamat! Kamu sudah menyelesaikan semua modul OJT. Final assessment kini sudah dibuka — kerjakan hari ini untuk menyelesaikan OJT kamu.',
    read: true,
    createdAt: '2026-07-06T08:00:00',
  },
  {
    id: 'notif-fl004-2',
    flId: 'fl-004',
    type: 'persetujuan_kanit',
    title: 'Penaksiran BPKB',
    body: 'Kanit menyetujui carry-over modul Penaksiran BPKB ke Minggu 2. Kamu bisa melanjutkan latihan.',
    milestoneId: 'penaksiran-bpkb',
    milestoneName: 'Penaksiran BPKB',
    read: true,
    createdAt: '2026-07-20T10:00:00',
  },
]
