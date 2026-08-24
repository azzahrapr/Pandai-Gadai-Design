import { useNavigate, useLocation } from 'react-router-dom'

// Local static assets
const imgDate               = "/assets/status-date.svg";
const imgRight              = "/assets/status-right.svg";
const imgSpotSuccess        = "/assets/spot-success.png";
const imgDecoBg             = "/assets/deco-bg.svg";
const imgPoinEmasFill       = "/assets/poin-fill-success.svg";
const imgPoinEmasOutline    = "/assets/poin-outline.svg";
const imgWeave              = "/assets/weave-bg.svg";
const imgWeaveCard          = "/assets/weave-card.svg";
const imgPoinEmasFillSm     = "/assets/poin-fill-sm.svg";

export default function PoinPandaiSuccess() {
  const navigate = useNavigate()
  const location = useLocation()
  const state = location.state as { claimed?: number; newTotal?: number } | null
  const claimed: number = state?.claimed ?? 4000
  const newTotal: number = state?.newTotal ?? claimed

  return (
    <div
      className="w-[375px] flex flex-col overflow-hidden rounded-3xl shadow-2xl relative"
      style={{ height: 812, background: "linear-gradient(180deg, #fffdc6 0%, #ffcd05 100%)" }}
    >
      {/* Decorative background illustration (upper-right) */}
      <div className="absolute inset-[7.05%_1.32%_48%_1.33%] pointer-events-none">
        <img alt="" className="absolute inset-0 block size-full max-w-none" src={imgDecoBg} />
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 w-full h-24 pointer-events-none overflow-hidden">
        <img alt="" className="absolute inset-0 block size-full max-w-none object-cover" src={imgWeave} style={{ transform: "scaleY(-1)" }} />
      </div>

      {/* Status bar */}
      <div className="flex justify-between items-end px-4 pt-3 pb-1 h-12 relative z-10">
        <img src={imgDate} alt="9:41" className="h-[11px] w-[28px]" />
        <img src={imgRight} alt="" className="h-[11px] w-[67px]" />
      </div>

      {/* Empty header area */}
      <div className="h-14 relative z-10" />

      {/* Main content */}
      <div className="flex flex-col flex-1 items-center justify-between px-4 relative z-10">

        {/* Center content */}
        <div className="flex flex-col items-center gap-5 pt-8 w-full">

          {/* Success illustration */}
          <img src={imgSpotSuccess} alt="Success" className="size-32 object-cover" />

          {/* Text */}
          <div className="flex flex-col items-center gap-0.5 text-center">
            <p className="text-sm text-slate-900">Berhasil verifikasi</p>
            <p className="text-xl font-semibold text-black leading-7 tracking-[-0.1px]">
              Selamat! Poin Pandaimu<br />bertambah
            </p>
          </div>

          {/* Card + green pill (overlapping) */}
          <div className="relative w-full mt-2">
            {/* Green pill — sits above card */}
            <div className="absolute left-1/2 -translate-x-1/2 -top-4 z-10">
              <div className="bg-[#22c55e] px-3 py-1 rounded-full">
                <span className="text-base font-bold text-white tracking-[-0.08px]">+ {claimed.toLocaleString('id-ID')} poin</span>
              </div>
            </div>

            {/* White card — exact Figma specs */}
            <div className="bg-white border border-slate-200 rounded-[12px] shadow-md overflow-clip relative w-[343px] flex flex-col gap-1 items-center justify-center pt-6 pb-4 px-3">
              <p className="text-sm font-normal leading-5 text-gray-600 text-center whitespace-nowrap">
                Poin Pandai Kamu Sekarang
              </p>
              <div className="flex gap-1 items-center justify-center">
                <div className="relative size-5 overflow-clip shrink-0">
                  <div className="absolute inset-[0_6.53%_0_6.5%]">
                    <img alt="" className="absolute inset-0 block size-full max-w-none" src={imgPoinEmasFillSm} />
                  </div>
                </div>
                <p className="text-xl font-semibold leading-7 text-slate-900 tracking-[-0.1px] whitespace-nowrap">
                  {newTotal.toLocaleString('id-ID')} poin
                </p>
              </div>

              {/* Wave — exact Figma positioning */}
              <div className="absolute bottom-[-23px] left-[-1px] w-[343px] h-[74px] flex items-center justify-center">
                <div className="-scale-y-100 rotate-180 flex-none">
                  <div className="relative w-[343px] h-[74px]">
                    <div className="absolute inset-[-4.07%_-27.04%_-78.16%_-91.41%]">
                      <img alt="" className="block max-w-none size-full" src={imgWeaveCard} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Spacer */}
        <div className="flex-1" />
      </div>

      {/* Footer drawer */}
      <div className="relative z-10 bg-white rounded-t-3xl border-t border-gray-200 shadow-lg px-4 pt-4 pb-2">
        <div className="flex gap-3 mb-4">
          {/* Beranda */}
          <button
            onClick={() => navigate('/home')}
            className="flex-1 flex items-center justify-center gap-2 bg-white border border-slate-200 rounded-xl py-3"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 6.5L8 1.5L14 6.5V14.5H10V10H6V14.5H2V6.5Z" stroke="#020617" strokeWidth="1.3" strokeLinejoin="round"/>
            </svg>
            <span className="text-sm font-medium text-slate-900">Beranda</span>
          </button>

          {/* Lihat Poin Pandai */}
          <button
            onClick={() => navigate('/poin-pandai')}
            className="flex-1 flex items-center justify-center gap-2 bg-white border border-slate-200 rounded-xl py-3"
          >
            <div className="relative size-4 overflow-hidden shrink-0">
              <div className="absolute inset-[0_6.55%_0_6.5%]">
                <img alt="" className="absolute inset-0 block size-full max-w-none" src={imgPoinEmasOutline} />
              </div>
            </div>
            <span className="text-sm font-medium text-slate-900">Lihat Poin Pandai</span>
          </button>
        </div>

        {/* Home indicator */}
        <div className="flex justify-center pb-2">
          <div className="w-36 h-1.5 bg-black rounded-full opacity-20" />
        </div>
      </div>
    </div>
  );
}
