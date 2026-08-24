import { useNavigate, useLocation } from 'react-router-dom'

const imgSpotSuccess = "/assets/spot-success.png"

// Local permanent assets
const imgWeave    = "/assets/weave-success.svg"  // 375×175 — scaleX(-1) mirrors wave direction
const imgPoinEmas = "/assets/poin-fill.svg"

function StatusBar() {
  return (
    <div className="relative z-10 flex items-center justify-between h-[52px] px-[15px] pb-[9px] pt-[14px] shrink-0">
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

export default function TYPSuccess() {
  const navigate = useNavigate()
  const location = useLocation()
  const txType: string = (location.state as { type?: string })?.type ?? 'tebus'
  const isTebus = txType === 'tebus'

  return (
    <div
      className="w-[375px] relative flex flex-col overflow-hidden rounded-3xl shadow-2xl"
      style={{ height: 812, background: 'linear-gradient(180deg, #3d7aff 0%, #051dae 100%)' }}
    >


      {/* ── UI layers ── */}

      <StatusBar />

      {/* Back arrow */}
      <div className="relative z-10 h-[56px] flex items-center px-4 shrink-0">
        <button onClick={() => navigate(-1)} className="size-9 flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M19 12H5M5 12l7 7M5 12l7-7" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Body */}
      <div className="relative z-10 flex flex-col items-center gap-4 px-4 pt-2 pb-4 shrink-0">

        {/* Panda mascot */}
        <img src={imgSpotSuccess} alt="Success" className="size-32 object-contain" />

        {/* Title + subtitle */}
        <div className="flex flex-col items-center gap-1 text-center text-white w-[343px]">
          <p className="text-[20px] font-semibold leading-7 tracking-[-0.1px]">Transaksi berhasil</p>
          <p className="text-[14px] leading-5 opacity-90">Pinjaman kamu berhasil ditebus</p>
          <p className="text-[14px] leading-5 opacity-90">Transaksi akan diproses maksimal 2x24 jam.</p>
        </div>

        {/* Nilai Pinjaman card — hidden for tebus */}
        {!isTebus && (
          <div className="bg-white rounded-xl w-[343px] relative overflow-hidden"
            style={{ padding: '16px 12px', boxShadow: '0px 4px 6px -1px rgba(0,0,0,0.1), 0px 2px 4px -2px rgba(0,0,0,0.1)' }}>
            <img src={imgWeave} alt=""
              style={{ position: 'absolute', bottom: -32, left: 0, width: '100%', height: 'auto', transform: 'scaleX(-1)', display: 'block' }} />
            <div className="flex flex-col items-center gap-1 relative z-10">
              <p className="text-[14px] font-medium text-[#4b5563] text-center">Nilai Pinjaman Sekarang</p>
              <div className="flex items-center gap-1">
                <img src={imgPoinEmas} alt="" className="size-4 object-contain" />
                <p className="text-[16px] font-bold text-[#020617]">Rp 600.000</p>
              </div>
            </div>
          </div>
        )}

        {/* Klaim Poin strip — hidden for cicil */}
        {txType !== 'cicil' && <div className="w-[343px] h-[44px] rounded-[8px] flex items-center justify-between px-4 py-2 overflow-hidden relative shrink-0"
          style={{
            background: 'linear-gradient(to right, #fffca5 9.135%, #fefac3 58.654%, #ffec4f)',
            borderBottom: '3px solid #ffcd05',
          }}>
          <p className="text-[14px] font-semibold text-[#492504] flex-1 leading-5">
            Kamu dapat 2.000 Poin Pandai!
          </p>
          <button
            onClick={() => navigate('/poin-pandai/success')}
            className="flex items-center justify-center px-2 py-1 rounded-[8px] shrink-0"
            style={{ background: '#ffcd05', border: '1px solid #e0a200' }}
          >
            <span className="text-[14px] font-semibold text-[#492504] whitespace-nowrap">Klaim</span>
          </button>
        </div>}
      </div>

      {/* ── Page wave ──
          Figma: absolute bottom-[77px] left-[-3px] w-[375px] h-[96px] with inner transform.
          The 96px container clips the 175px-tall SVG, showing only the wave peaks
          at the top (~y 0–96 of the SVG after the -4.07% top offset).
          scaleX(-1) = Figma's combined rotate(180deg)+scaleY(-1). */}
      <div className="absolute overflow-hidden"
        style={{ bottom: 77, left: 0, right: 0, height: 96 }}>
        <img src={imgWeave} alt="" style={{
          position: 'absolute',
          top: '-4.07%',
          left: 0,
          width: '100%',
          height: 175,
          transform: 'scaleX(-1)',
          display: 'block',
          maxWidth: 'none',
        }} />
      </div>

      {/* Footer card */}
      <div className="absolute bottom-0 left-0 right-0 z-20 bg-white rounded-tl-[24px] rounded-tr-[24px]"
        style={{ boxShadow: '4px 0px 3px rgba(0,0,0,0.1), 0px 2px 2px rgba(0,0,0,0.1)' }}>
        <div className="flex gap-3 px-4 pt-4">
          <button
            onClick={() => navigate('/home')}
            className="flex-1 bg-white border border-[#e2e8f0] rounded-xl p-3 flex items-center justify-center gap-2"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#020617" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            <span className="text-[14px] font-medium text-[#020617]">Beranda</span>
          </button>
          <button
            onClick={() => navigate('/pinjaman/detail')}
            className="flex-1 bg-white border border-[#e2e8f0] rounded-xl p-3 flex items-center justify-center gap-2"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#020617" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
              <line x1="1" y1="10" x2="23" y2="10"/>
            </svg>
            <span className="text-[14px] font-medium text-[#020617]">Detail Pinjaman</span>
          </button>
        </div>
        <div className="flex justify-center py-2 mt-3">
          <div className="w-36 h-[5px] rounded-full bg-black" />
        </div>
      </div>
    </div>
  )
}
