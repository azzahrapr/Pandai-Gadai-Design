import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const imgDate     = "/assets/status-date.svg"
const imgRight    = "/assets/status-right.svg"
const imgPoinEmas = "/assets/poin-emas-claim.png"

// ── Shared base page ──────────────────────────────────────────────────────────
function BasePage({ onBayar, children }: { onBayar: () => void; children?: React.ReactNode }) {
  const navigate = useNavigate()
  return (
    <div className="w-[375px] flex flex-col overflow-hidden rounded-3xl shadow-2xl relative" style={{ height: 812 }}>
      {/* Status bar */}
      <div className="flex items-end justify-between h-[52px] px-[15px] pb-[9px] bg-white shrink-0">
        <img src={imgDate}  alt="" className="h-[11px] w-[28px] shrink-0" />
        <img src={imgRight} alt="" className="h-[11px] w-[67px] shrink-0" />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between h-[56px] px-4 bg-white border-b border-[#e2e8f0] shrink-0">
        <div className="flex items-center gap-2">
          <button onClick={() => navigate(-1)} className="size-9 flex items-center justify-center -ml-1">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M5 12l7 7M5 12l7-7" stroke="#020617" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <h1 className="text-[20px] font-semibold leading-7 tracking-[-0.1px] text-black">Detail Pinjaman</h1>
        </div>
        <button className="flex items-center justify-center w-10 h-10 rounded-full border border-[#a8cfff] bg-[rgba(229,242,255,0.7)]">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#023dff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 18v-6a9 9 0 0 1 18 0v6"/>
              <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z"/>
              <path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>
            </svg>
        </button>
      </div>

      {/* Scrollable cards */}
      <div className="flex flex-col gap-4 p-4 bg-white overflow-y-auto hide-scrollbar flex-1">
        {/* Deskripsi Transaksi */}
        <div className="rounded-xl border border-[#e6e8eb] shadow-md p-3 flex flex-col gap-4 bg-white">
          <p className="text-[16px] font-bold leading-6 text-[#020617]">Deskripsi Transaksi</p>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between h-5">
                <span className="text-[14px] text-[#64748b]">Status</span>
                <span className="px-[10px] py-[2px] rounded-full bg-[#023dff] text-[12px] font-semibold text-white">Aktif</span>
              </div>
              <div className="flex items-center justify-between h-5">
                <span className="text-[14px] text-[#64748b]">Nomor SBG</span>
                <div className="flex items-center gap-1">
                  <span className="text-[14px] text-[#020617]">#2000240800002203</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round">
                    <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                  </svg>
                </div>
              </div>
              <div className="flex items-center justify-between h-5">
                <span className="text-[14px] text-[#64748b]">Tanggal Pinjaman</span>
                <span className="text-[14px] text-[#020617]">01 Okt 2025</span>
              </div>
              <div className="flex items-center justify-between h-5">
                <span className="text-[14px] text-[#64748b]">Cabang</span>
                <div className="flex items-center gap-0.5">
                  <span className="text-[14px] text-[#023dff]">Otista</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#023dff" strokeWidth="2" strokeLinecap="round">
                    <path d="M7 17L17 7M17 7H7M17 7v10"/>
                  </svg>
                </div>
              </div>
            </div>
            <div className="h-px bg-[#e2e8f0]" />
            <div className="flex justify-between">
              <div className="flex flex-col">
                <span className="text-[14px] font-medium text-[#64748b]">Nilai Pinjaman</span>
                <span className="text-[16px] font-bold text-[#020617]">850.000</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[14px] font-medium text-[#64748b]">Jatuh Tempo</span>
                <span className="text-[16px] font-bold text-[#ef4444]">01 Nov 2025</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detail Barang */}
        <div className="rounded-xl border border-[#e6e8eb] shadow-md p-3 flex flex-col gap-3 bg-white">
          <p className="text-[16px] font-bold leading-6 text-[#020617]">Detail Barang</p>
          <div className="flex items-center gap-2">
            <div className="size-11 rounded-full bg-[#cfe7ff] flex items-center justify-center shrink-0">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#023dff" strokeWidth="1.5" strokeLinecap="round">
                <rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="2"/>
              </svg>
            </div>
            <div className="flex flex-col flex-1 min-w-0">
              <span className="text-[14px] text-[#64748b]">Elektronik - HP</span>
              <span className="text-[16px] text-[#020617]">APPLE IPHONE PRO MAX 64 GB</span>
            </div>
          </div>
        </div>
      </div>

      {/* Poin Pandai banner */}
      <div className="flex items-center gap-3 px-4 py-3 bg-[#e5f2ff] shrink-0">
        <img src={imgPoinEmas} alt="" className="size-10 shrink-0" />
        <p className="text-[14px] text-[#020617] leading-5">
          Kamu punya{' '}
          <span className="font-semibold text-[#b27202]">2.000 Poin Pandai</span>
          . Pakai untuk bayar pinjaman sekarang!
        </p>
      </div>

      {/* Footer CTA */}
      <div className="bg-white px-4 pt-4 shrink-0">
        <button
          onClick={onBayar}
          className="w-full bg-[#023dff] rounded-[6px] py-[10px] flex items-center justify-center gap-2"
        >
          <span className="text-[14px] font-medium text-white">Bayar Pinjaman</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
            <path d="M6 9l6 6 6-6"/>
          </svg>
        </button>
        {/* Home indicator */}
        <div className="flex justify-center py-2 mt-1">
          <div className="w-36 h-[5px] rounded-full bg-black" />
        </div>
      </div>

      {/* Overlays rendered on top */}
      {children}
    </div>
  )
}

// ── Overlay: Pilih Tipe ───────────────────────────────────────────────────────
function PilihTipeSheet({ onSelect, onClose }: {
  onSelect: (t: 'perpanjang' | 'tebus' | 'cicil') => void
  onClose: () => void
}) {
  const options = [
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round">
          <path d="M21 12a9 9 0 1 1-9-9"/><path d="M21 3v6h-6"/>
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
          <circle cx="12" cy="12" r="10"/><path d="M8 12l3 3 5-5"/>
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
          <circle cx="9" cy="6" r="3"/><circle cx="15" cy="12" r="3"/><path d="M3.5 21a3 3 0 0 1 6 0"/>
        </svg>
      ),
      title: 'Cicil Pinjaman',
      badge: null,
      desc: 'Bayar sebagian dan kurangi beban tenor',
      poin: false,
      onTap: () => onSelect('cicil'),
    },
  ]

  return (
    <>
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl px-4 pb-6">
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-[5px] bg-[#f1f5f9] rounded-full" />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-[18px] font-semibold text-[#020617]">Pilih Tipe Pembayaran</p>
          <p className="text-[14px] text-[#64748b] leading-5">
            Pilih cara yang paling pas buat lanjut bayar pinjaman kamu. Kami bantu prosesnya sampai selesai, ya.
          </p>
        </div>
        <div className="flex flex-col divide-y divide-[#e2e8f0] mt-4">
          {options.map(({ icon, title, badge, desc, poin, onTap }) => (
            <button key={title} onClick={onTap} className="flex items-start gap-3 py-3 text-left w-full">
              <div className="mt-0.5 shrink-0">{icon}</div>
              <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                <div className="flex items-center gap-1">
                  <span className="text-[14px] font-medium text-[#020617]">{title}</span>
                  {badge && <span className="text-[12px]">{badge}</span>}
                </div>
                <span className="text-[12px] text-[#64748b]">{desc}</span>
                {poin && (
                  <span className="text-[12px] text-[#d97706]">
                    Kamu bisa dapat <span className="font-bold text-[#023dff]">Poin Pandai</span> dari transaksi ini
                  </span>
                )}
              </div>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-1 shrink-0">
                <path d="M6 4l4 4-4 4" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          ))}
        </div>
        <button onClick={onClose} className="w-full mt-4 py-[10px] text-[14px] font-medium text-[#020617] border border-[#e2e8f0] rounded-[6px]">
          Tutup
        </button>
      </div>
    </>
  )
}

// ── Page export ───────────────────────────────────────────────────────────────
export default function SBGDetail() {
  const navigate = useNavigate()
  const [showPilih, setShowPilih] = useState(false)

  return (
    <BasePage onBayar={() => setShowPilih(true)}>
      {showPilih && (
        <PilihTipeSheet
          onSelect={(t) => navigate(
            t === 'perpanjang' ? '/pinjaman/perpanjang' :
            t === 'cicil'      ? '/pinjaman/cicil'      :
                                 '/pinjaman/tebus'
          )}
          onClose={() => setShowPilih(false)}
        />
      )}
    </BasePage>
  )
}
