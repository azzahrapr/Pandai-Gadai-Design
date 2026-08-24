import { useNavigate } from 'react-router-dom'

const imgDate    = "/assets/status-date.svg"
const imgRight   = "/assets/status-right.svg"
const imgMascot  = "/assets/panda-pose8.png"
const imgBg      = "/assets/simulasi-bg.png"


export default function SimulasiPromo() {
  const navigate = useNavigate()

  return (
    <div className="bg-[#f8fafc] flex flex-col items-start relative rounded-3xl shadow-2xl overflow-hidden" style={{ width: 375, height: 812 }}>

      {/* Header */}
      <div className="bg-white border-b border-[#e1e6ef] flex flex-col h-[96px] items-start shrink-0 w-full">
        <div className="flex-1 min-h-px relative w-full">
          <div className="absolute inset-0 overflow-clip flex items-end justify-between px-[15px] pb-[9px]">
            <img src={imgDate} alt="" className="h-[11px]" />
            <img src={imgRight} alt="" className="h-[11px]" />
          </div>
        </div>
        <div className="bg-white flex h-[56px] items-center justify-between px-[16px] shrink-0 w-full">
          <div className="flex gap-[8px] items-center">
            <button onClick={() => navigate(-1)} className="block overflow-clip relative shrink-0 size-[24px]">
              <svg className="absolute inset-0" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M19 12H5M5 12l7 7M5 12l7-7" stroke="#020617" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <p className="font-bold leading-[32px] text-[#0f172a] text-[20px] whitespace-nowrap">Simulasi Gadai</p>
          </div>
          <div className="backdrop-blur-[6px] bg-[#e5f2ff] border border-[#a8cfff] flex gap-[4px] items-center justify-center px-[10px] py-[4px] rounded-[1000px] shrink-0">
            <div className="overflow-clip relative shrink-0 size-[12px]">
              <svg className="absolute inset-0" width="12" height="12" viewBox="0 0 24 24" fill="#001cdb">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>
              </svg>
            </div>
            <p className="font-normal leading-[16px] text-[#001cdb] text-[12px] text-center whitespace-nowrap">Panduan</p>
          </div>
        </div>
      </div>

      {/* Content area */}
      <div className="bg-[#e5f2ff] flex flex-1 flex-col gap-[16px] items-center min-h-px py-[48px] relative w-full overflow-y-auto hide-scrollbar pb-[112px]">

        {/* Decorative background */}
        <div className="absolute left-0 size-[375px] top-[16px] pointer-events-none">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgBg} />
        </div>

        {/* Banner promo: panda + promo card stacked */}
        <div className="h-[240px] relative shrink-0 w-[343px]">

          {/* Dark promo card */}
          <div className="absolute bg-[#0e2287] border-2 border-white flex flex-col items-start left-0 px-[16px] py-[24px] rounded-[12px] w-[343px]" style={{ top: 132 }}>
            <div className="flex flex-col gap-[8px] items-start shrink-0 w-full">
              <p className="font-normal leading-[16px] text-white text-[12px] text-center w-full">Kode Promo:</p>
              <div className="flex gap-[8px] items-center justify-center shrink-0 w-full">
                <p className="font-bold leading-[36px] text-white text-[28px] text-center whitespace-nowrap" style={{ letterSpacing: '-0.168px' }}>
                  EXTRA100
                </p>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="shrink-0 opacity-80">
                  <rect x="9" y="9" width="13" height="13" rx="2" stroke="white" strokeWidth="1.5"/>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Panda mascot (overlaps card from top) */}
          <div className="absolute size-[143px]" style={{ left: '50%', top: 0, transform: 'translateX(-50%)' }}>
            <img alt="" className="w-full h-full object-contain pointer-events-none" src={imgMascot} />
          </div>
        </div>

        {/* Info card */}
        <div className="bg-white border border-[#e1e7ef] flex flex-col gap-[12px] items-start p-[16px] rounded-[12px] shrink-0 w-[343px]">
          <div className="flex flex-col font-semibold gap-[4px] items-start shrink-0 text-[#0f1729] w-full">
            <p className="leading-[28px] text-[18px] w-full">Selamat! </p>
            <p className="leading-[22px] text-[14px] w-full">Kamu dapat promo Extra Pinjaman 100rb 🎉</p>
          </div>
          {[
            'Bonus pencairan Rp100.000',
            'Berlaku 14 hari ke depan',
            'Tunjukkan saat transaksi di cabang',
          ].map((text, i) => (
            <div key={i} className="flex gap-[4px] items-center shrink-0 w-full">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0">
                <circle cx="12" cy="12" r="10" fill="#16a34a"/>
                <path d="M7 12l3.5 3.5L17 8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <p className="font-normal leading-[20px] text-[14px] text-black whitespace-nowrap">{text}</p>
            </div>
          ))}
        </div>

      </div>

      {/* Sticky footer */}
      <div className="absolute bottom-0 flex flex-col items-start left-0 w-[375px]">
        <div className="flex flex-col gap-[12px] items-center justify-center overflow-clip pb-[24px] pt-[8px] px-[16px] shrink-0 w-full bg-white">
          <button
            onClick={() => navigate('/')}
            className="bg-[#023dff] flex gap-[4px] h-[44px] items-center justify-center px-[16px] py-[8px] rounded-[8px] shrink-0 w-full"
          >
            <p className="font-semibold leading-[22px] text-white text-[14px] whitespace-nowrap">Booking Jadwal Gadai</p>
          </button>
          <button
            className="bg-white border border-[#cbd5e1] flex gap-[4px] h-[44px] items-center justify-center px-[16px] py-[8px] rounded-[8px] shrink-0 w-full"
          >
            <p className="font-semibold leading-[22px] text-[#0f1729] text-[14px] whitespace-nowrap">Simpan Kode Promo</p>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0">
              <path d="M12 3v13M7 11l5 5 5-5" stroke="#0f1729" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M5 21h14" stroke="#0f1729" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </div>

    </div>
  )
}
