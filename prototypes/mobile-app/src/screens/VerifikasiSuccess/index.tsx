import { useNavigate } from 'react-router-dom'

const imgDate    = "/assets/status-date.svg"
const imgRight   = "/assets/status-right.svg"
const imgBg      = "/assets/verifikasi-success-bg.png"
const imgCard    = "/assets/verifikasi-success-card.png"

const features = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" fill="#023dff"/>
        <path d="M12 7v5l3 3" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M19 3v4M17 5h4" stroke="#023dff" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="19" cy="5" r="4" fill="#023dff" stroke="white" strokeWidth="1.2"/>
        <path d="M19 3.5v3M17.5 5h3" stroke="white" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
    label: "Cek status transaksi serta barang gadaimu kapan saja",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" fill="#f59e0b"/>
        <text x="12" y="17" textAnchor="middle" fontSize="12" fontWeight="bold" fill="white">P</text>
      </svg>
    ),
    label: "Kumpulkan Poin Pandai dan gunakan untuk bayar pinjaman",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="6" width="20" height="14" rx="2" fill="#023dff"/>
        <path d="M2 10h20" stroke="white" strokeWidth="1.2"/>
        <rect x="5" y="13" width="5" height="3" rx="0.5" fill="white"/>
        <path d="M14 14h5M14 17h3" stroke="white" strokeWidth="1" strokeLinecap="round"/>
        <path d="M7 3l-2 3M12 2v4M17 3l2 3" stroke="#023dff" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
    label: "Tarik uang pencairan secara instan ke Saldo Pandai",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect x="5" y="2" width="14" height="20" rx="2" fill="#023dff"/>
        <rect x="8" y="5" width="8" height="5" rx="0.5" fill="white"/>
        <path d="M8 13h8M8 16h5" stroke="white" strokeWidth="1.2" strokeLinecap="round"/>
        <circle cx="17" cy="17" r="4" fill="#023dff" stroke="white" strokeWidth="1"/>
        <path d="M15.5 17h3M17 15.5v3" stroke="white" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
    label: "Beli produk digital untuk memenuhi kebutuhan harianmu",
  },
]

export default function VerifikasiSuccess() {
  const navigate = useNavigate()

  return (
    <div className="w-[375px] bg-white flex flex-col overflow-hidden rounded-3xl shadow-2xl" style={{ height: 812 }}>

      {/* Status bar */}
      <div className="flex items-end justify-between h-[52px] px-[15px] pb-[9px] bg-white shrink-0">
        <img src={imgDate}  alt="" className="h-[11px] w-[28px] shrink-0" />
        <img src={imgRight} alt="" className="h-[11px] w-[67px] shrink-0" />
      </div>

      {/* Hero: decorative background + card */}
      <div className="relative shrink-0" style={{ height: 290 }}>
        <img src={imgBg} alt="" className="absolute inset-0 w-full h-full object-cover object-top" />
        <div className="absolute inset-x-4 top-0">
          <img src={imgCard} alt="Kartu Member Pandai Gadai" className="w-full" />
        </div>
      </div>

      {/* Title + subtitle */}
      <div className="flex flex-col gap-2 px-4 pt-4 pb-2 text-center shrink-0">
        <p className="text-[28px] font-bold text-[#020617] leading-8 tracking-[-0.168px]">
          Selamat! Kamu telah terverifikasi
        </p>
        <p className="text-[14px] text-[#687076] leading-5">
          Sekarang kamu bisa akses semua fitur yang tersedia pada aplikasi
        </p>
      </div>

      {/* Feature grid */}
      <div className="grid grid-cols-2 gap-3 px-4 pt-2 shrink-0">
        {features.map(({ icon, label }) => (
          <div
            key={label}
            className="bg-[#e5f2ff] border border-[#a8cfff] rounded-lg px-4 py-3 flex flex-col gap-[10px]"
          >
            {icon}
            <p className="text-[12px] font-semibold text-[#020617] leading-4">{label}</p>
          </div>
        ))}
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* CTA button */}
      <div className="px-4 pt-4 shrink-0">
        <button
          onClick={() => navigate('/home')}
          className="w-full bg-[#023dff] rounded-[6px] py-[10px] flex items-center justify-center gap-2"
        >
          <span className="text-[14px] font-medium text-[#f8fafc]">Yuk, Telusuri Aplikasinya</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f8fafc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6"/>
          </svg>
        </button>
      </div>

      {/* Home indicator */}
      <div className="flex justify-center py-2 pb-3 shrink-0">
        <div className="w-36 h-[5px] rounded-full bg-black" />
      </div>
    </div>
  )
}
