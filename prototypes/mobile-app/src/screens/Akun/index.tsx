import { useNavigate } from 'react-router-dom'

const imgBgPattern = "/assets/bg-pattern.svg"
const imgNavHome         = "/assets/nav-home-outline.svg"
const imgPoinEmasOutline = "/assets/nav-poin-outline.svg"
const imgNavSmile        = "/assets/nav-smile.svg"

const imgPandaiLogo = "/assets/4.1.1%20Profile/InitialProfile/card-panda.png"
const imgCardNumber = "/assets/4.1.1%20Profile/InitialProfile/card-numbers.png"
const imgShareIcon  = "/assets/share-icon.svg"
const imgVerified   = "/assets/4.1.1%20Profile/InitialProfile/verified.png"

function StatusBar() {
  return (
    <div className="flex items-center justify-between h-[52px] px-[15px] pb-[9px] pt-[14px] shrink-0">
      <span className="text-[15px] font-semibold text-white leading-none">9:41</span>
      <div className="flex items-center gap-[5px]">
        <svg width="17" height="12" viewBox="0 0 17 12" fill="white" xmlns="http://www.w3.org/2000/svg">
          <rect x="0"   y="9" width="3" height="3"  rx="0.5"/>
          <rect x="4.7" y="6" width="3" height="6"  rx="0.5"/>
          <rect x="9.4" y="3" width="3" height="9"  rx="0.5"/>
          <rect x="14"  y="0" width="3" height="12" rx="0.5"/>
        </svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="8" cy="11" r="1" fill="white"/>
          <path d="M5 8.5C6.2 7.3 9.8 7.3 11 8.5"     stroke="white" strokeWidth="1.3" strokeLinecap="round"/>
          <path d="M2.5 6C4.5 4 11.5 4 13.5 6"         stroke="white" strokeWidth="1.3" strokeLinecap="round"/>
          <path d="M0.5 3.5C3.3 0.7 12.7 0.7 15.5 3.5" stroke="white" strokeWidth="1.3" strokeLinecap="round"/>
        </svg>
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="0.5" y="0.5" width="21" height="11" rx="3"   stroke="white"/>
          <rect x="2"   y="2"   width="17" height="8"  rx="1.5" fill="white"/>
          <path d="M23 4.5v3" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </div>
    </div>
  )
}

function ChevronRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M9 18l6-6-6-6" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export default function Akun() {
  const navigate = useNavigate()

  return (
    <div
      className="w-[375px] relative flex flex-col overflow-hidden rounded-3xl shadow-2xl"
      style={{ height: 812, background: 'linear-gradient(180deg, #023dff 0%, #00127d 40%)' }}
    >
      {/* Background pattern overlay */}
      <div className="absolute top-0 left-0 right-0 h-[400px] pointer-events-none overflow-hidden" style={{ opacity: 0.24 }}>
        <img src={imgBgPattern} alt="" className="w-full" />
      </div>

      <StatusBar />

      {/* Scrollable content */}
      <div className="flex-1 flex flex-col overflow-y-auto hide-scrollbar pb-[96px]">

        {/* Header */}
        <div className="flex items-center justify-between px-4 pt-4 pb-2 shrink-0 relative z-10">
          <h1 className="text-[28px] font-bold text-white leading-8 tracking-[-0.168px]">Akun Saya</h1>
          <button className="flex items-center justify-center p-[10px] rounded-full border border-[#a8cfff] bg-[rgba(229,242,255,0.4)] backdrop-blur-sm">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 18v-6a9 9 0 0 1 18 0v6"/>
              <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z"/>
              <path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>
            </svg>
          </button>
        </div>

        {/* ── Membership card ──
            Background: imgCardBg fills 343×194. Content is absolutely overlaid
            at left:20px top:16.78px width:303px matching Figma node 3114:30058. */}
        <div className="px-4 pb-4 shrink-0 relative z-10">
          <div className="rounded-xl overflow-hidden relative bg-white shadow-md" style={{ width: 343, height: 194 }}>

            {/* Content overlay — matches Figma left:20 top:16.78 w:303 gap:9 */}
            <div style={{
              position: 'absolute',
              left: 20,
              top: 16.78,
              width: 303,
              display: 'flex',
              flexDirection: 'column',
              gap: 9,
              alignItems: 'flex-start',
            }}>

              {/* Top row: logo + Detail Akun button */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <img src={imgPandaiLogo} alt="Pandai"
                  style={{ width: 36.09, height: 36.007, objectFit: 'contain' }} />
                <button style={{
                  display: 'flex', alignItems: 'center', gap: 4,
                  paddingLeft: 12, paddingRight: 8, paddingTop: 8, paddingBottom: 8,
                  borderRadius: 9999, border: '1px solid #a8cfff',
                  background: '#e0f0ff', backdropFilter: 'blur(2px)',
                  flexShrink: 0,
                }}>
                  <span style={{ fontSize: 14, color: '#001cdb', lineHeight: '14px', whiteSpace: 'nowrap' }}>Detail Akun</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14M12 5l7 7-7 7" stroke="#001cdb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>

              {/* Bottom info — height:84 gap:12 */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, height: 84, alignItems: 'flex-start' }}>

                {/* Referral row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, height: 24 }}>
                  <span style={{ fontSize: 14, color: '#64748b', lineHeight: '14px' }}>Referral:</span>
                  <span style={{ fontSize: 16, fontWeight: 600, color: '#023dff', lineHeight: '24px' }}>ABK002</span>
                  <img src={imgShareIcon} alt="" style={{ width: 12, height: 12 }} />
                </div>

                {/* Card number */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <img src={imgCardNumber} alt="Card number"
                    style={{ width: 268.2, height: 15.515, objectFit: 'contain', flexShrink: 0 }} />
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                    <rect x="9" y="9" width="13" height="13" rx="2"/>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                  </svg>
                </div>

                {/* Name + verified badge */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: '#023dff', lineHeight: '20px', whiteSpace: 'nowrap' }}>
                    Azzahra Putri Ramadhanty
                  </span>
                  <img src={imgVerified} alt="" style={{ width: 20, height: 20, flexShrink: 0 }} />
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* White content section */}
        <div className="flex-1 bg-white rounded-tl-[24px] rounded-tr-[24px] flex flex-col gap-4 pt-6 px-4 pb-4">

          {/* Pengaturan Akun */}
          <div className="bg-white border border-[#e2e8f0] rounded-lg overflow-hidden shadow-sm">
            <div className="flex items-center gap-1.5 p-4">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#020617" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3"/>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
              </svg>
              <span className="text-[16px] font-bold text-[#020617]">Pengaturan Akun</span>
            </div>
            <div className="flex flex-col px-4 pb-2">
              <div className="h-px bg-[#e2e8f0]" />
              <button className="flex items-center justify-between py-3 w-full">
                <div className="flex items-center gap-1.5">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#020617" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                  <span className="text-[14px] font-medium text-black">Reset PIN</span>
                </div>
                <ChevronRight />
              </button>
              <div className="h-px bg-[#e2e8f0]" />
              <button className="flex items-center justify-between py-3 w-full">
                <div className="flex items-center gap-1.5">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#020617" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18.36 6.64a9 9 0 1 1-12.73 0"/>
                    <line x1="12" y1="2" x2="12" y2="12"/>
                  </svg>
                  <span className="text-[14px] font-medium text-black">Manajemen Akun</span>
                </div>
                <ChevronRight />
              </button>
            </div>
          </div>

          {/* Informasi Aplikasi */}
          <div className="bg-white border border-[#e2e8f0] rounded-lg overflow-hidden shadow-sm">
            <div className="flex items-center gap-1.5 p-4">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#020617" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="5" height="5" rx="0.5"/>
                <rect x="16" y="3" width="5" height="5" rx="0.5"/>
                <rect x="3" y="16" width="5" height="5" rx="0.5"/>
                <path d="M21 16h-3v3M21 21h-1M16 16h1M16 21v-1"/>
              </svg>
              <span className="text-[16px] font-bold text-[#020617]">Informasi Aplikasi</span>
            </div>
            <div className="flex flex-col px-4 pb-2">
              <div className="h-px bg-[#e2e8f0]" />
              <button className="flex items-center justify-between py-3 w-full">
                <div className="flex items-center gap-1.5">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#020617" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                  </svg>
                  <span className="text-[14px] font-medium text-black">Kebijakan Privasi</span>
                </div>
                <ChevronRight />
              </button>
              <div className="h-px bg-[#e2e8f0]" />
              <button className="flex items-center justify-between py-3 w-full">
                <div className="flex items-center gap-1.5">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#020617" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 9.9-1"/>
                  </svg>
                  <span className="text-[14px] font-medium text-black">Ketentuan Pengguna</span>
                </div>
                <ChevronRight />
              </button>
            </div>
          </div>

          {/* OJK badge */}
          <div className="flex items-center gap-2">
            <div className="shrink-0 border border-[#e2e8f0] rounded px-2 py-1">
              <span className="text-[10px] font-bold text-[#64748b]">OJK</span>
            </div>
            <p className="text-[10px] text-[#64748b] leading-[1.4] font-medium">
              Pandai Gadai telah berizin dan diawasi langsung oleh Otoritas Jasa Keuangan
            </p>
          </div>
        </div>
      </div>

      {/* Bottom navbar */}
      <div className="absolute bottom-0 left-0 right-0 z-20 bg-white flex items-center justify-between px-4 pt-4 pb-8">
        <button onClick={() => navigate('/home')} className="flex flex-col items-center gap-1 w-20">
          <img src={imgNavHome} alt="" className="size-6 object-contain" />
          <span className="text-[12px] font-bold text-slate-500">Beranda</span>
        </button>
        <button onClick={() => navigate('/pinjaman')} className="flex flex-col items-center gap-1 w-20">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#65758b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
            <line x1="1" y1="10" x2="23" y2="10"/>
          </svg>
          <span className="text-[12px] font-bold text-slate-500">Pinjaman</span>
        </button>
        <button onClick={() => navigate('/poin-pandai')} className="flex flex-col items-center gap-1 w-20">
          <img src={imgPoinEmasOutline} alt="" className="size-6 object-contain" />
          <span className="text-[12px] font-bold text-slate-500">Poin Pandai</span>
        </button>
        <button className="flex flex-col items-center gap-1 w-20 relative">
          <div className="relative">
            <img src={imgNavSmile} alt="" className="size-6 object-contain" />
            <div className="absolute -top-2 left-3 bg-red-600 text-white text-[10px] font-bold px-1 rounded-full min-w-[18px] text-center leading-[15px]">
              99+
            </div>
          </div>
          <span className="text-[12px] font-bold text-[#001cdb]">Akun</span>
        </button>
      </div>
    </div>
  )
}
