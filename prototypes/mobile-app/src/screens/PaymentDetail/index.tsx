import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

type IOverlayType = 'pilih' | 'perpanjang' | 'tebus' | null

// ── Shared helpers ────────────────────────────────────────────────────────────
function useSlideUp(open: boolean) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    if (open) requestAnimationFrame(() => setVisible(true))
    else setVisible(false)
  }, [open])
  return visible
}

function Backdrop({ visible, onClick }: { visible: boolean; onClick: () => void }) {
  return (
    <div
      className="absolute inset-0 bg-black/40 transition-opacity duration-300"
      style={{ opacity: visible ? 1 : 0 }}
      onClick={onClick}
    />
  )
}

function Sheet({ visible, children }: { visible: boolean; children: React.ReactNode }) {
  return (
    <div
      className="relative bg-white rounded-t-2xl shadow-xl flex flex-col transition-transform duration-300 ease-out"
      style={{ transform: visible ? 'translateY(0)' : 'translateY(100%)' }}
    >
      <div className="flex justify-center pt-3 pb-1">
        <div className="w-10 h-1 bg-slate-200 rounded-full" />
      </div>
      {children}
    </div>
  )
}

function FeeRow({ label, value, bold, blue }: { label: string; value: string; bold?: boolean; blue?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className={`text-sm leading-5 ${bold ? 'font-bold text-[#020617]' : 'font-normal text-[#64748b]'}`}>{label}</span>
      <span className={`text-sm leading-5 ${bold ? 'font-bold text-lg' : 'font-normal text-[#020617]'} ${blue ? 'text-[#023dff]' : ''}`}>{value}</span>
    </div>
  )
}

function PoinRow({ isGold }: { isGold?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-[#64748b]">Kamu dapat {isGold ? 'poin emas' : 'Poin Pandai'}</span>
      <div className="flex items-center gap-1">
        {isGold ? (
          <>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth="1">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            <span className="text-sm font-semibold text-[#d97706]">1,20 mg</span>
          </>
        ) : (
          <>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#f59e0b">
              <circle cx="12" cy="12" r="10" fill="#fbbf24" />
              <text x="12" y="16" textAnchor="middle" fontSize="10" fill="#92400e" fontWeight="bold">P</text>
            </svg>
            <span className="text-sm font-semibold text-[#d97706]">2.000</span>
          </>
        )}
      </div>
    </div>
  )
}

// ── Overlay: Pilih Tipe Pembayaran ────────────────────────────────────────────
function PilihTipeOverlay({ onSelect, onClose }: { onSelect: (t: 'perpanjang' | 'tebus') => void; onClose: () => void }) {
  const visible = useSlideUp(true)

  const options = [
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round">
          <path d="M21 12a9 9 0 1 1-9-9" /><path d="M21 3v6h-6" />
        </svg>
      ),
      title: 'Perpanjang Pinjaman',
      badge: '👍',
      desc: 'Perpanjang masa jatuh tempo, tebus nanti.',
      poin: true,
      onTap: () => onSelect('perpanjang'),
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round">
          <circle cx="12" cy="12" r="10" /><path d="M8 12l3 3 5-5" />
        </svg>
      ),
      title: 'Tebus Pinjaman',
      badge: null,
      desc: 'Lunasi pinjaman dan ambil barang di cabang.',
      poin: true,
      onTap: () => onSelect('tebus'),
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round">
          <circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" />
        </svg>
      ),
      title: 'Cicil Pinjaman',
      badge: null,
      desc: 'Bayar sebagian dan kurangi beban tenor',
      poin: false,
      onTap: () => {},
    },
  ]

  return (
    <div className="absolute inset-0 z-50 flex flex-col justify-end">
      <Backdrop visible={visible} onClick={onClose} />
      <Sheet visible={visible}>
        <div className="px-4 pb-6 flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <p className="text-xl font-bold text-[#020617]">Pilih Tipe Pembayaran</p>
            <p className="text-sm text-[#64748b] leading-5">
              Pilih cara yang paling pas buat lanjut bayar pinjaman kamu. Kami bantu prosesnya sampai selesai, ya.
            </p>
          </div>

          <div className="flex flex-col divide-y divide-[#e2e8f0]">
            {options.map(({ icon, title, badge, desc, poin, onTap }) => (
              <button key={title} onClick={onTap} className="pressable flex items-start gap-3 py-3 text-left w-full">
                <div className="mt-0.5 shrink-0">{icon}</div>
                <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-semibold text-[#020617]">{title}</span>
                    {badge && <span>{badge}</span>}
                  </div>
                  <span className="text-[12px] text-[#64748b]">{desc}</span>
                  {poin && (
                    <span className="text-[12px] text-[#d97706]">
                      Kamu bisa dapat <span className="font-semibold text-[#023dff]">Poin Pandai</span> dari transaksi ini
                    </span>
                  )}
                </div>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-1 shrink-0 text-slate-400">
                  <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            ))}
          </div>

          <button onClick={onClose} className="w-full py-3 text-sm font-medium text-[#020617] border border-[#e2e8f0] rounded-xl">
            Tutup
          </button>
        </div>
      </Sheet>
    </div>
  )
}

// ── Overlay: Perpanjang Pinjaman ──────────────────────────────────────────────
function PerpanjangOverlay({ isGold, onBack, onClose }: { isGold?: boolean; onBack: () => void; onClose: () => void }) {
  const visible = useSlideUp(true)
  const [cicil, setCicil] = useState(false)

  const handleClose = () => { onClose() }

  return (
    <div className="absolute inset-0 z-50 flex flex-col justify-end">
      <Backdrop visible={visible} onClick={handleClose} />
      <Sheet visible={visible}>
        <div className="px-4 pb-6 flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <p className="text-xl font-bold text-[#020617]">Perpanjang Pinjaman</p>
            <p className="text-sm text-[#64748b] leading-5">
              Mohon untuk memastikan data transaksi kembali sebelum lanjut ke halaman pembayaran.
            </p>
          </div>

          {/* Toggle */}
          <button
            onClick={() => setCicil(v => !v)}
            className="flex items-center gap-3"
          >
            <div className={`relative w-10 h-6 rounded-full transition-colors ${cicil ? 'bg-[#023dff]' : 'bg-slate-200'}`}>
              <div className={`absolute top-1 size-4 rounded-full bg-white shadow transition-transform ${cicil ? 'translate-x-5' : 'translate-x-1'}`} />
            </div>
            <span className="text-sm font-medium text-[#020617]">Tambah Cicil Pinjaman</span>
          </button>

          {/* Fee breakdown */}
          <div className="flex flex-col gap-2">
            <FeeRow label="Nilai Pinjaman" value="Rp 850.000" />
            <FeeRow label="Biaya Jasa (10%)" value="Rp 85.000" />
            <FeeRow label="Biaya Keterlambatan (5%)" value="Rp 0" />
            <div className="h-px bg-[#e2e8f0]" />
            <FeeRow label="Total Pembayaran" value="Rp 85.000" bold blue />
            <div className="h-px bg-[#e2e8f0]" />
            <PoinRow isGold={isGold} />
          </div>

          {/* Buttons */}
          <button className="w-full bg-[#023dff] rounded-xl py-3 flex items-center justify-center gap-2">
            <span className="text-sm font-medium text-white">Perpanjang Pinjaman</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button onClick={onBack} className="w-full py-2 text-sm font-medium text-[#020617]">
            Batal
          </button>
        </div>
      </Sheet>
    </div>
  )
}

// ── Overlay: Tebus Pinjaman ───────────────────────────────────────────────────
function TebusOverlay({ isGold, onBack, onClose }: { isGold?: boolean; onBack: () => void; onClose: () => void }) {
  const visible = useSlideUp(true)
  const [agreed, setAgreed] = useState(true)

  return (
    <div className="absolute inset-0 z-50 flex flex-col justify-end">
      <Backdrop visible={visible} onClick={onClose} />
      <Sheet visible={visible}>
        <div className="px-4 pb-6 flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <p className="text-xl font-bold text-[#020617]">Tebus Pinjaman</p>
            <p className="text-sm text-[#64748b] leading-5">
              Pastikan kamu telah membaca syarat & ketentuan sebelum lanjut menebus barang.
            </p>
          </div>

          {/* Pickup info card */}
          <div className="bg-[#e5f2ff] rounded-xl p-3 flex items-start gap-3">
            <div className="size-12 rounded-xl bg-[#cfe7ff] flex items-center justify-center shrink-0">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#023dff" strokeWidth="1.5" strokeLinecap="round">
                <rect x="5" y="2" width="14" height="20" rx="2" /><line x1="12" y1="18" x2="12.01" y2="18" />
              </svg>
            </div>
            <div className="flex flex-col gap-0.5">
              <p className="text-sm font-semibold text-[#020617]">
                Ambil Barang Sebelum:{' '}
                <span className="text-[#023dff]">5 Jul 2025</span>
              </p>
              <p className="text-[12px] text-[#64748b] leading-4">
                Barang siap diambil di cabang, gratis biaya titip hingga hari ke-7
              </p>
            </div>
          </div>

          {/* Fee breakdown */}
          <div className="flex flex-col gap-2">
            <FeeRow label="Nilai Pinjaman" value="Rp 850.000" />
            <FeeRow label="Biaya Keterlambatan (5%)" value="Rp 0" />
            <FeeRow label="Biaya Tebus Pinjaman" value="Rp 850.000" />
            <div className="h-px bg-[#e2e8f0]" />
            <FeeRow label="Total Pembayaran" value="Rp 850.000" bold blue />
            <div className="h-px bg-[#e2e8f0]" />
            <PoinRow isGold={isGold} />
          </div>

          {/* Checkbox */}
          <button onClick={() => setAgreed(v => !v)} className="flex items-center gap-2 text-left">
            <div className={`size-4 rounded flex items-center justify-center shrink-0 border ${agreed ? 'bg-[#023dff] border-[#023dff]' : 'border-slate-300 bg-white'}`}>
              {agreed && (
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M2 5l2.5 2.5L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            <span className="text-[12px] text-[#64748b]">
              Saya menyetujui <span className="font-semibold text-[#023dff]">Syarat & Ketentuan</span> berlaku
            </span>
          </button>

          {/* Buttons */}
          <button className="w-full bg-[#023dff] rounded-xl py-3 flex items-center justify-center gap-2" disabled={!agreed}>
            <span className="text-sm font-medium text-white">Tebus Pinjaman</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button onClick={onBack} className="w-full py-2 text-sm font-medium text-[#020617]">
            Batal
          </button>
        </div>
      </Sheet>
    </div>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function PaymentDetail() {
  const navigate = useNavigate()
  const [overlay, setOverlay] = useState<IOverlayType>(null)
  const isGold = false // switch to true for gold asset variant

  const closeAll = () => setOverlay(null)
  const goBackToPilih = () => setOverlay('pilih')

  return (
    <div className="flex flex-col w-[375px] bg-white overflow-hidden rounded-[20px] shadow-2xl relative" style={{ height: 812 }}>

      {/* ── Status Bar ── */}
      <div className="flex items-end justify-between h-[52px] px-[15px] pb-[9px] bg-white">
        <span className="text-[15px] font-semibold">9:41</span>
        <div className="flex items-center gap-1 text-[12px] font-semibold">
          <span>▌▌</span><span>▲</span><span>▊</span>
        </div>
      </div>

      {/* ── Main Header ── */}
      <div className="flex items-center justify-between h-[56px] px-4 bg-white border-b border-[#e2e8f0]">
        <div className="flex items-center gap-2">
          <button onClick={() => navigate(-1)} className="size-9 flex items-center justify-center -ml-1">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M12.5 15L7.5 10L12.5 5" stroke="#020617" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <h1 className="text-[20px] font-semibold leading-7 tracking-[-0.5px] text-black">Detail Pinjaman</h1>
        </div>
        <button className="flex items-center justify-center w-10 h-10 rounded-full border border-[#a8cfff] bg-[rgba(229,242,255,0.7)]">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#023dff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
            <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
          </svg>
        </button>
      </div>

      {/* ── Klaim Poin Banner ── */}
      <div className="flex items-center justify-between px-4 py-2"
        style={{ background: 'linear-gradient(to right, #fefdea 10%, #fffcaf 61%, #ffec4f)' }}>
        <div className="flex-1 min-w-0">
          <p className="text-[14px] font-semibold leading-5 text-[#492504]">Klaim 12.000 Poin Pandai</p>
          <p className="text-[12px] font-medium leading-5 text-[#492504]">Pakai poin untuk bayar pinjaman!</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center gap-1 px-[10px] py-[2px] rounded-full bg-[#ffda14] border border-[#fff88f]">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#020617" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
            </svg>
            <span className="text-[12px] font-semibold leading-4 text-[#020617]">01 : 32 : 44</span>
          </div>
          <span className="text-[18px] font-medium text-[#492504] leading-none">→</span>
        </div>
      </div>

      {/* ── Scrollable content ── */}
      <div className="flex flex-col flex-1 overflow-y-auto hide-scrollbar">

        {/* Payment section */}
        <div className="p-4" style={{ background: 'linear-gradient(to bottom, #cfe7ff, white)' }}>
          <div className="rounded-xl border border-[#e2e8f0] shadow-md overflow-hidden">
            <div className="h-2 w-full bg-[#023dff]" />
            <div className="flex flex-col gap-4 p-3 bg-[#f8fafc]">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <p className="text-[16px] font-bold leading-6 text-[#020617]">Selesaikan Pembayaran-mu</p>
                  <button className="text-[20px] font-bold text-[#64748b] leading-none rotate-90">⋮</button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[14px] font-normal leading-5 text-[#64748b]">Tipe Transaksi</span>
                  <span className="px-[10px] py-[2px] rounded-full border border-[#e2e8f0] bg-white text-[12px] font-semibold leading-4 text-[#020617]">
                    Perpanjang
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-[14px] font-normal leading-5 text-[#64748b]">Total Pembayaran</span>
                  <span className="text-[16px] font-bold leading-6 text-[#023dff]">Rp 850.000</span>
                </div>
                <div className="h-px bg-[#e2e8f0]" />
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[14px] font-normal leading-5 text-[#64748b]">Batas Waktu</span>
                    <span className="text-[14px] font-normal leading-5 text-[#020617]">13 Januari 2025, 12:23</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[14px] font-normal leading-5 text-[#64748b]">Sisa Waktu</span>
                    <div className="flex items-center gap-1 px-[10px] py-[2px] rounded-full bg-[#ef4444]">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#f8fafc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                      </svg>
                      <span className="text-[12px] font-semibold leading-4 text-[#f8fafc]">02 : 59 : 43</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => setOverlay('pilih')}
                  className="w-full py-[10px] rounded-[6px] bg-[#023dff] text-[14px] font-medium leading-5 text-[#f8fafc]"
                >
                  Lanjutkan Pembayaran
                </button>
                <button className="w-full h-10 rounded-[6px] border border-[#e2e8f0] bg-white text-[14px] font-medium leading-5 text-[#020617]">
                  Sudah Bayar
                </button>
                <div className="flex items-start gap-1">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-[2px] shrink-0">
                    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  <p className="text-[12px] font-normal leading-4 text-[#64748b]">
                    Klik "Sudah Bayar" jika pembayaranmu sudah selesai
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lower section */}
        <div className="flex flex-col gap-4 p-4 bg-white">
          {/* Deskripsi Transaksi */}
          <div className="rounded-xl border border-[#e6e8eb] shadow-md overflow-hidden p-3 flex flex-col gap-4">
            <p className="text-[16px] font-bold leading-6 text-[#020617]">Deskripsi Transaksi</p>
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between h-5">
                <span className="text-[14px] font-normal leading-5 text-[#64748b]">Status</span>
                <span className="px-[10px] py-[2px] rounded-full border border-[#f8fafc] bg-[#023dff] text-[12px] font-semibold leading-4 text-[#f8fafc]">Aktif</span>
              </div>
              <div className="flex items-center justify-between h-5">
                <span className="text-[14px] font-normal leading-5 text-[#64748b]">Nomor SBG</span>
                <div className="flex items-center gap-1">
                  <span className="text-[14px] font-normal text-[#020617]">#2000240800002203</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                </div>
              </div>
              <div className="flex items-center justify-between h-5">
                <span className="text-[14px] font-normal leading-5 text-[#64748b]">Tanggal Pinjaman</span>
                <span className="text-[14px] font-normal text-[#020617]">01 Okt 2025</span>
              </div>
              <div className="flex items-center justify-between h-5">
                <span className="text-[14px] font-normal leading-5 text-[#64748b]">Cabang</span>
                <div className="flex items-center gap-0.5">
                  <span className="text-[14px] font-normal text-[#023dff]">Otista</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#023dff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="h-px bg-[#e2e8f0]" />
            <div className="flex justify-between">
              <div className="flex flex-col">
                <span className="text-[14px] font-medium leading-5 text-[#64748b]">Nilai Pinjaman</span>
                <span className="text-[16px] font-bold leading-6 text-[#020617]">850.000</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[14px] font-medium leading-5 text-[#64748b]">Jatuh Tempo</span>
                <span className="text-[16px] font-bold leading-6 text-[#ef4444]">01 Nov 2025</span>
              </div>
            </div>
          </div>

          {/* Detail Barang */}
          <div className="rounded-xl border border-[#e6e8eb] shadow-md overflow-hidden p-3 flex flex-col gap-3">
            <p className="text-[16px] font-bold leading-6 text-[#020617]">Detail Barang</p>
            <div className="flex items-center gap-2">
              <div className="w-11 h-11 rounded-full bg-[#cfe7ff] flex items-center justify-center shrink-0">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#023dff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="2" width="14" height="20" rx="2" ry="2" /><line x1="12" y1="18" x2="12.01" y2="18" />
                </svg>
              </div>
              <div className="flex flex-col flex-1 min-w-0">
                <span className="text-[14px] font-normal leading-5 text-[#64748b]">Elektronik - HP</span>
                <span className="text-[16px] font-normal leading-6 text-[#020617]">APPLE IPHONE PRO MAX 64 GB</span>
              </div>
            </div>
          </div>
        </div>

        {/* Home indicator */}
        <div className="flex items-center justify-center py-2 bg-white">
          <div className="w-36 h-[5px] rounded-full bg-black" />
        </div>
      </div>

      {/* ── Overlays ── */}
      {overlay === 'pilih' && (
        <PilihTipeOverlay
          onSelect={(t) => setOverlay(t)}
          onClose={closeAll}
        />
      )}
      {overlay === 'perpanjang' && (
        <PerpanjangOverlay isGold={isGold} onBack={goBackToPilih} onClose={closeAll} />
      )}
      {overlay === 'tebus' && (
        <TebusOverlay isGold={isGold} onBack={goBackToPilih} onClose={closeAll} />
      )}
    </div>
  )
}
