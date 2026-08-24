import { useNavigate } from 'react-router-dom'

// ── Local static assets ──────────────────────────────────────────────────────
const imgPattern          = "/assets/bg-pattern.svg";
const imgDate             = "/assets/status-date.svg";
const imgRight            = "/assets/status-right.svg";
const imgPose15           = "/assets/panda-pose15.png";
const imgPoinEmasSm       = "/assets/poin-fill.svg";
const imgEllipse          = "/assets/ellipse-dot.svg";
const imgArrowSmRight     = "/assets/arrow-right-v1-sm.svg";
const imgArrowRightV1     = "/assets/arrow-right-v1-sm.svg";
const imgArrowRightV2     = "/assets/arrow-right-v2-sm.svg";
const imgSaldoIcon        = "/assets/saldo-icon.svg";
const imgCuanIcon         = "/assets/cuan-icon.svg";
const imgCalcIcon         = "/assets/calc-icon.svg";
const imgLocationIcon     = "/assets/location-icon.svg";
const imgBanner           = "/assets/banner.jpg";
const imgCarouselDots     = "/assets/carousel-indicator.svg";
const imgHomeIcon         = "/assets/nav-home-solid.svg";
const imgPoinEmasOutline  = "/assets/nav-poin-outline.svg";
const imgSmileIcon        = "/assets/nav-smile.svg";

// Quick action icons (same composited icon approach as Homepage)
const icons = {
  tarikSaldo: {
    vector: "/assets/icon-tarik-v.svg",
    mask:   "/assets/icon-tarik-mask.svg",
    fill:   "/assets/icon-tarik-fill.png",
    vectorInset: "0 5.48% 10.97% 5.48%",
    maskInset:   "8.16% -11.54% -11.91% 7.79%",
    maskPos:     "-11.746px -41.796px",
    maskSize:    "455.859px 512.004px",
  },
  pulsa: {
    vector: "/assets/icon-pulsa-v.svg",
    mask:   "/assets/icon-pulsa-mask.svg",
    fill:   "/assets/icon-pulsa-fill.png",
    vectorInset: "0 4.99% 10.17% 5.18%",
    maskInset:   "-2.42% -24.89% -20.08% 2.39%",
    maskPos:     "14.289px 12.39px",
    maskSize:    "459.938px 512px",
  },
  listrik: {
    vector: "/assets/icon-listrik-v.svg",
    mask:   "/assets/icon-listrik-mask.svg",
    fill:   "/assets/icon-listrik-fill.png",
    vectorInset: "0 5.32% 10.63% 5.32%",
    maskInset:   "14.73% -4.88% -4.73% 14.88%",
    maskPos:     "-48.964px -75.426px",
    maskSize:    "457.566px 512.004px",
  },
  pdam: {
    vector: "/assets/icon-air-v.svg",
    mask:   "/assets/icon-air-mask.svg",
    fill:   "/assets/icon-air-fill.png",
    vectorInset: "0 4.76% 9.53% 4.76%",
    maskInset:   "7.33% -12.7% -12.33% 7.7%",
    maskPos:     "-15.117px -37.521px",
    maskSize:    "463.228px 512.171px",
  },
};

function QuickIcon({ icon }: { icon: typeof icons.tarikSaldo }) {
  const S = 512;
  return (
    <div style={{ width: 48, height: 48, overflow: 'hidden', position: 'relative', flexShrink: 0 }}>
      <div style={{ transform: `scale(${48 / S})`, transformOrigin: '0 0', width: S, height: S, position: 'absolute' }}>
        <div style={{ position: 'absolute', inset: icon.vectorInset }}>
          <img alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }} src={icon.vector} />
        </div>
        <div style={{
          position: 'absolute',
          inset: icon.maskInset,
          maskImage: `url('${icon.mask}')`,
          maskSize: icon.maskSize,
          maskPosition: icon.maskPos,
          maskRepeat: 'no-repeat',
          WebkitMaskImage: `url('${icon.mask}')`,
          WebkitMaskSize: icon.maskSize,
          WebkitMaskPosition: icon.maskPos,
          WebkitMaskRepeat: 'no-repeat',
        } as React.CSSProperties}>
          <img alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }} src={icon.fill} />
        </div>
      </div>
    </div>
  );
}

function ArrowRightSmall({ className = "size-3" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 12 12" fill="none">
      <path d="M4.5 9L7.5 6L4.5 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Four dots used to hide sensitive values for unverified users
function HiddenDots() {
  return (
    <div className="flex items-center gap-1 h-6">
      {[0, 1, 2, 3].map(i => (
        <div key={i} className="relative size-2 shrink-0">
          <img alt="" className="absolute inset-0 block size-full max-w-none" src={imgEllipse} />
        </div>
      ))}
    </div>
  );
}

export default function HomepageUnverified() {
  const navigate = useNavigate()

  return (
    <div className="w-[375px] bg-slate-50 flex flex-col overflow-hidden rounded-3xl shadow-2xl relative" style={{ height: 812 }}>

      {/* ── Scrollable area (header + body) */}
      <div className="flex-1 overflow-y-auto hide-scrollbar flex flex-col">

        {/* ── Header (blue gradient) */}
        <div className="relative flex flex-col" style={{ background: "linear-gradient(180deg, #023dff 0%, #012599 100%)" }}>
          {/* Background pattern */}
          <div className="absolute inset-0 overflow-hidden opacity-25 pointer-events-none">
            <img src={imgPattern} alt="" className="w-full h-full object-cover object-left-top" />
          </div>

          {/* Status bar */}
          <div className="flex justify-between items-end px-6 pt-3 pb-1 h-12 relative z-10">
            <img src={imgDate} alt="9:41" className="h-[11px] w-[28px]" />
            <img src={imgRight} alt="" className="h-[11px] w-[67px]" />
          </div>

          {/* Greeting — unverified: no name, show phone number */}
          <div className="flex items-start px-6 py-3 relative z-10">
            <div className="flex flex-col gap-1">
              <p className="text-base text-white">
                <span className="font-normal">Halo, </span>
                <span className="font-semibold text-[#e5f2ff]">selamat datang!</span>
              </p>
              <p className="text-[12px] text-blue-200">+62811997442</p>
            </div>
          </div>

          {/* Panda mascot (pose 15 for unverified) */}
          <img src={imgPose15} alt="Panda mascot" className="absolute right-4 top-10 size-[80px] z-[5] object-cover" />

          {/* ── Poin Pandai card */}
          <div className="mx-4 rounded-t-2xl overflow-hidden relative z-[10]">
            {/* Gold section */}
            <div className="flex items-center justify-between px-3 py-3"
              style={{ background: "linear-gradient(118deg, #ffaa33 7%, #ffcb3c 21%, #ffcb3c 49%, #ffae28 75%, #fbc63a 98%)" }}>
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-1">
                  <div className="relative size-[18px] overflow-hidden shrink-0">
                    <div className="absolute inset-[0_6.53%_0_6.5%]">
                      <img alt="" className="absolute inset-0 block size-full max-w-none" src={imgPoinEmasSm} />
                    </div>
                  </div>
                  <span className="text-[12px] font-medium text-[#7e480f]">Poin Pandai</span>
                </div>
                {/* Hidden poin amount */}
                <HiddenDots />
              </div>
              <button onClick={() => navigate('/poin-pandai/unverified')} className="relative overflow-hidden bg-[#ffcd05] border border-[#fffdc6] rounded-lg px-3 py-1.5">
                <span className="text-sm font-semibold text-[#492504] relative z-10">Klaim poin</span>
                <div className="shimmer-btn absolute top-[-14px] left-0 w-6 h-16 opacity-60"
                  style={{ background: "linear-gradient(266deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.9) 50%, rgba(255,255,255,0) 100%)" }} />
              </button>
            </div>

            {/* Dark hook strip */}
            <div className="flex items-center justify-between bg-[#09134e] px-3 py-1.5">
              <span className="text-[12px] font-medium text-[#cfe7ff]">
                Ambil tambahan Poin Pandai s.d 20.000 poin!
              </span>
              <div className="relative size-4 overflow-hidden shrink-0">
                <div className="absolute inset-[25%_16.67%]">
                  <img alt="" className="block max-w-none size-full" src={imgArrowSmRight} />
                </div>
              </div>
            </div>

            {/* Saldo row */}
            <div className="bg-slate-50 flex gap-3 px-3 pt-3 pb-10">
              {/* Saldo Pandai — hidden */}
              <div className="bg-white flex-1 rounded-xl p-3 shadow-sm flex flex-col gap-1">
                <div className="flex items-center gap-1">
                  <img src={imgSaldoIcon} alt="" className="size-5 object-contain" />
                  <span className="text-[12px] font-medium text-slate-700">Saldo Pandai</span>
                </div>
                <HiddenDots />
                <div className="flex items-center gap-1 text-[#023dff]">
                  <span className="text-[12px] font-semibold">Pakai Saldo</span>
                  <div className="relative size-3 overflow-hidden shrink-0">
                    <div className="absolute bottom-1/2 left-[20.83%] right-[20.83%] top-1/2">
                      <div className="absolute inset-[-0.63px_-8.93%]">
                        <img alt="" className="block max-w-none size-full" src={imgArrowRightV1} />
                      </div>
                    </div>
                    <div className="absolute bottom-[20.83%] left-1/2 right-[20.83%] top-[20.83%]">
                      <div className="absolute inset-[-8.93%_-17.86%]">
                        <img alt="" className="block max-w-none size-full" src={imgArrowRightV2} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Cuan Pandai — visible */}
              <div className="bg-white flex-1 rounded-xl p-3 shadow-sm flex flex-col gap-1">
                <div className="flex items-center gap-1">
                  <img src={imgCuanIcon} alt="" className="size-5 object-contain" />
                  <span className="text-[12px] font-medium text-slate-700">Cuan Pandai</span>
                </div>
                <p className="text-[12px] font-medium text-slate-500">20+ misi menunggu!</p>
                <div className="flex items-center gap-1 text-[#023dff]">
                  <span className="text-[12px] font-semibold">Telusuri Misi</span>
                  <div className="relative size-3 overflow-hidden shrink-0">
                    <div className="absolute bottom-1/2 left-[20.83%] right-[20.83%] top-1/2">
                      <div className="absolute inset-[-0.63px_-8.93%]">
                        <img alt="" className="block max-w-none size-full" src={imgArrowRightV1} />
                      </div>
                    </div>
                    <div className="absolute bottom-[20.83%] left-1/2 right-[20.83%] top-[20.83%]">
                      <div className="absolute inset-[-8.93%_-17.86%]">
                        <img alt="" className="block max-w-none size-full" src={imgArrowRightV2} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── White body */}
        <div className="bg-slate-50 flex flex-col flex-1 rounded-t-3xl shadow-[0_-4px_12px_rgba(0,0,0,0.1)] -mt-8 relative z-10">

          {/* Verification banner */}
          <div className="mx-4 bg-white rounded-b-2xl shadow-md flex items-center gap-3 px-3 pt-3 pb-3">
            <div className="flex flex-col flex-1 min-w-0">
              <p className="text-sm font-bold text-[#0020e3] whitespace-nowrap">Verifikasi data dulu, yuk!</p>
              <p className="text-[10px] font-medium text-slate-700">Dapatkan poin emas dan akses ke semua fitur.</p>
            </div>
            <button onClick={() => navigate('/verifikasi')} className="bg-[#023dff] px-3 py-2 rounded-lg shrink-0">
              <span className="text-sm font-medium text-white">Verifikasi</span>
            </button>
          </div>

          {/* Kirim & Bayar */}
          <div className="flex flex-col gap-3 px-4 py-4">
            <p className="text-sm font-bold text-slate-900">Kirim & Bayar, Lebih Praktis!</p>

            {/* Quick actions */}
            <div className="flex items-start justify-between">
              {([
                { icon: icons.tarikSaldo, label: "Tarik saldo" },
                { icon: icons.pulsa,      label: "Pulsa/\nPaket Data" },
                { icon: icons.listrik,    label: "Listrik PLN" },
                { icon: icons.pdam,       label: "Tagihan PDAM" },
              ] as const).map(({ icon, label }) => (
                <button key={label} className="flex flex-col items-center gap-2 flex-1 p-2">
                  <QuickIcon icon={icon} />
                  <span className="text-[12px] font-medium text-slate-900 text-center whitespace-pre-line leading-4">{label}</span>
                </button>
              ))}
            </div>

            {/* Simulasi + Lokasi */}
            <div className="flex gap-2">
              <button className="bg-white border border-slate-200 flex-1 flex items-center gap-2 px-3 py-3 rounded-2xl">
                <img src={imgCalcIcon} alt="" className="size-5 shrink-0 object-contain" />
                <div className="flex flex-col items-start">
                  <span className="text-sm font-semibold text-slate-900">Simulasi Gadai</span>
                  <span className="text-[12px] font-medium text-slate-500">Cek nilai taksiran</span>
                </div>
              </button>
              <button className="bg-white border border-slate-200 flex-1 flex items-center gap-2 px-3 py-3 rounded-2xl">
                <img src={imgLocationIcon} alt="" className="size-5 shrink-0 object-contain" />
                <div className="flex flex-col items-start">
                  <span className="text-sm font-semibold text-slate-900">Lokasi Cabang</span>
                  <span className="text-[12px] font-medium text-slate-500">Cari yang terdekat</span>
                </div>
              </button>
            </div>
          </div>

          {/* Banner carousel */}
          <div className="px-4 pb-4 flex flex-col gap-2">
            <div className="relative">
              <img src={imgBanner} alt="Banner promo" className="w-full h-[120px] rounded-xl object-cover" />
            </div>
            <svg width="72" height="8" viewBox="0 0 72 8" fill="none" className="mx-auto block">
              <circle cx="4"  cy="4" r="4" fill="#023DFF"/>
              <circle cx="20" cy="4" r="4" fill="#DDEFFF"/>
              <circle cx="36" cy="4" r="4" fill="#DDEFFF"/>
              <circle cx="52" cy="4" r="4" fill="#DDEFFF"/>
              <circle cx="68" cy="4" r="4" fill="#DDEFFF"/>
            </svg>
          </div>
        </div>
      </div>{/* end scrollable area */}

      {/* ── Klaim Poin strip */}
      <button
        onClick={() => navigate('/poin-pandai/unverified')}
        className="flex items-center gap-2 px-4 py-2 w-full"
        style={{ background: "linear-gradient(90deg, #fefdea 10%, #fffcaf 61%, #ffec4f 100%)" }}
      >
        <div className="flex flex-col flex-1 text-left">
          <p className="text-sm font-semibold text-[#492504]">Klaim 12.000 Poin Pandai</p>
          <p className="text-[12px] font-medium text-[#492504]">Pakai poin untuk bayar pinjaman!</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <div className="bg-[#ffda14] px-3 py-0.5 rounded-full">
            <span className="text-[12px] font-semibold text-slate-900">6 hari 3 jam lagi</span>
          </div>
          <ArrowRightSmall className="size-5 text-[#492504]" />
        </div>
      </button>

      {/* ── Bottom Navbar */}
      <div className="bg-white flex items-center justify-between px-4 pt-4 pb-8">
        {/* Beranda (active) */}
        <button onClick={() => navigate('/unverified')} className="flex flex-col items-center gap-1 w-20">
          <div className="relative size-6 overflow-hidden">
            <div className="absolute inset-[0.03%_0]">
              <img alt="" className="absolute inset-0 block size-full max-w-none" src={imgHomeIcon} />
            </div>
          </div>
          <span className="text-[12px] font-bold text-[#001cdb]">Beranda</span>
        </button>

        {/* Pinjaman */}
        <button className="flex flex-col items-center gap-1 w-20">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#65758b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
            <line x1="1" y1="10" x2="23" y2="10"/>
          </svg>
          <span className="text-[12px] font-bold text-slate-500">Pinjaman</span>
        </button>

        {/* Poin Pandai */}
        <button onClick={() => navigate('/poin-pandai/unverified')} className="flex flex-col items-center gap-1 w-20">
          <div className="relative size-6 overflow-hidden">
            <div className="absolute inset-[0_6.55%_0_6.5%]">
              <img alt="" className="absolute inset-0 block size-full max-w-none" src={imgPoinEmasOutline} />
            </div>
          </div>
          <span className="text-[12px] font-bold text-slate-500">Poin Pandai</span>
        </button>

        {/* Akun */}
        <button onClick={() => navigate('/akun')} className="flex flex-col items-center gap-1 w-20 relative">
          <div className="relative">
            <img src={imgSmileIcon} alt="" className="size-6 object-contain" />
            <div className="absolute -top-2 left-3 bg-red-600 text-white text-[10px] font-bold px-1 rounded-full min-w-[18px] text-center leading-[15px]">
              99+
            </div>
          </div>
          <span className="text-[12px] font-bold text-slate-500">Akun</span>
        </button>
      </div>
    </div>
  );
}
