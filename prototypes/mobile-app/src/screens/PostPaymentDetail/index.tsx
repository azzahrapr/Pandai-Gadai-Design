import { useNavigate } from 'react-router-dom'

const imgDate  = "/assets/status-date.svg"
const imgRight = "/assets/status-right.svg"

export default function PostPaymentDetail() {
  const navigate = useNavigate()

  return (
    <div className="w-[375px] flex flex-col bg-white overflow-hidden rounded-3xl shadow-2xl" style={{ height: 812 }}>

      {/* Status bar */}
      <div className="flex items-end justify-between h-[52px] px-[15px] pb-[9px] bg-white shrink-0">
        <img src={imgDate} alt="" className="h-[11px] w-[28px] shrink-0" />
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

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto hide-scrollbar">

        {/* Klaim Poin strip */}
        <div className="flex items-center justify-between px-4 py-2"
          style={{ background: 'linear-gradient(90deg, #fefdea 10%, #fffcaf 61%, #ffec4f 100%)' }}>
          <div>
            <p className="text-[14px] font-semibold text-[#492504]">Klaim 12.000 Poin Pandai</p>
            <p className="text-[12px] font-medium text-[#492504]">Pakai poin untuk bayar pinjaman!</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <div className="bg-[#ffda14] border border-[#fff88f] px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#020617" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
              <span className="text-[12px] font-semibold text-[#020617]">01 : 32 : 44</span>
            </div>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#492504" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </div>
        </div>

        {/* Blue gradient section */}
        <div className="flex flex-col gap-4 px-4 py-4" style={{ background: 'linear-gradient(180deg, #cfe7ff 0%, #fff 100%)' }}>

          {/* Barangmu siap diambil card */}
          <div className="bg-white border border-[#cfe7ff] rounded-xl shadow-lg flex overflow-hidden">
            <div className="w-2 bg-[#023dff] shrink-0" />
            <div className="flex-1 px-3 py-3 flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <p className="text-[16px] font-bold text-[#020617]">Barangmu siap diambil!</p>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#023dff">
                      <path d="M11 2a4 4 0 0 0-4 4v1H4a1 1 0 0 0-1 1v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a1 1 0 0 0-1-1h-3V6a4 4 0 0 0-4-4zm0 2a2 2 0 0 1 2 2v1H9V6a2 2 0 0 1 2-2zm-5 5h10v10a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1z"/>
                    </svg>
                    <span className="text-[14px] text-[#020617] flex-1">Ambil barang-mu di cabang (tanpa diwakili)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#023dff">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8" fill="none" stroke="white" strokeWidth="1.5"/>
                    </svg>
                    <span className="text-[14px] text-[#020617] flex-1">Bawa KTP asli dan Surat Bukti Gadai (SBG)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#023dff">
                      <rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10" stroke="white" strokeWidth="1.5"/>
                    </svg>
                    <span className="text-[14px] text-[#020617] flex-1">Bayar biaya jasa titip (jika ada)</span>
                  </div>
                </div>
              </div>
              <div className="h-px bg-[#e2e8f0]" />
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="text-[14px] text-[#020617]">Ambil Barang Sebelum</span>
                  <div className="flex items-center gap-1">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#ea580c">
                      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    <span className="text-[14px] font-bold text-[#ea580c]">30 Nov 2024</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-[12px] text-[#023dff]">Lihat Syarat dan Ketentuan</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#023dff" strokeWidth="2" strokeLinecap="round">
                    <path d="M9 18l6-6-6-6"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Info banner */}
          <div className="bg-[#e6f5fe] border border-[#2a83fd] rounded-lg p-3 flex items-start gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0255ca" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
            </svg>
            <p className="text-[14px] text-[#0255ca] leading-5 flex-1">
              Jika kamu tidak mengambil barang sebelum batas waktu, akan dikenakan biaya{' '}
              <span className="font-semibold">Rp10.000 tiap 7 hari titip barang.</span>
            </p>
          </div>
        </div>

        {/* White section: transaction cards */}
        <div className="bg-white flex flex-col gap-4 px-4 pb-4">

          {/* Deskripsi Transaksi */}
          <div className="rounded-xl border border-[#e6e8eb] shadow-md p-3 flex flex-col gap-4 bg-white">
            <p className="text-[16px] font-bold leading-6 text-[#020617]">Deskripsi Transaksi</p>
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between h-5">
                <span className="text-[14px] text-[#64748b]">Status</span>
                <span className="px-[10px] py-[2px] rounded-full bg-[#fdba74] border border-white text-[12px] font-semibold text-[#431407]">Belum Diambil</span>
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
                <span className="text-[14px] text-[#020617]">01 Okt 2024</span>
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
      </div>

      {/* Footer */}
      <div className="bg-white px-4 pt-4 shrink-0">
        <button
          onClick={() => {}}
          className="w-full bg-[#023dff] rounded-[6px] py-[10px] flex items-center justify-center gap-2"
        >
          <span className="text-[14px] font-medium text-white">Buka Lokasi Ambil Barang</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
            <path d="M7 17L17 7M17 7H7M17 7v10"/>
          </svg>
        </button>
        <div className="flex justify-center py-2 mt-1">
          <div className="w-36 h-[5px] rounded-full bg-black" />
        </div>
      </div>
    </div>
  )
}
