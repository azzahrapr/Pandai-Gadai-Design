import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Local static assets
const imgPattern     = "/assets/bg-pattern.svg";
const imgDate        = "/assets/status-date.svg";
const imgRight       = "/assets/status-right.svg";
const imgPose        = "/assets/panda-pose15.png";
const imgShareIcon   = "/assets/share-icon.svg";
const imgPoinEmas    = "/assets/poin-fill.svg";
const imgSaldoIcon   = "/assets/saldo-icon.svg";
const imgCuanIcon    = "/assets/cuan-icon.svg";
const imgHomeIcon    = "/assets/nav-home-solid.svg";
const imgPoinEmasOutline = "/assets/nav-poin-outline.svg";
const imgSmileIcon   = "/assets/nav-smile.svg";
const imgBanner      = "/assets/banner.jpg";
const imgCarouselDots = "/assets/carousel-indicator.svg";
const imgCalcIcon    = "/assets/calc-icon.svg";
const imgLocationIcon = "/assets/location-icon.svg";
const imgCreditCard  = "/assets/nav-credit-v2b.svg";

// ── Quick-action icon assets
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

// Render a Figma icon at 48px by scaling the 512px composition
function QuickIcon({ icon }: { icon: typeof icons.tarikSaldo }) {
  const S = 512;
  return (
    <div style={{ width: 48, height: 48, overflow: 'hidden', position: 'relative', flexShrink: 0 }}>
      <div style={{ transform: `scale(${48 / S})`, transformOrigin: '0 0', width: S, height: S, position: 'absolute' }}>
        {/* Vector (main icon shape) */}
        <div style={{ position: 'absolute', inset: icon.vectorInset }}>
          <img alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }} src={icon.vector} />
        </div>
        {/* Masked fill (texture/color overlay) */}
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

interface IPinjamanItem {
  id: string
  name: string
  category: string
  iconType: 'phone' | 'tv' | 'watch'
  nilai: number
  jatuhTempo: string
  action: 'Bayar' | 'Gadai Lagi'
  status: 'aktif' | 'selesai'
}

const pinjamanItems: IPinjamanItem[] = [
  {
    id: 'p1',
    name: 'SAMSUNG GALAXY A52S 6/128GB',
    category: 'Elektronik - HP',
    iconType: 'phone',
    nilai: 4500000,
    jatuhTempo: '30 Sep 2025',
    action: 'Bayar',
    status: 'aktif',
  },
  {
    id: 'p2',
    name: 'SAMSUNG 4K CRYSTAL UHD SMART TV',
    category: 'Elektronik - TV',
    iconType: 'tv',
    nilai: 1350000,
    jatuhTempo: '27 Apr 2026',
    action: 'Gadai Lagi',
    status: 'selesai',
  },
  {
    id: 'p3',
    name: 'GARMIN FENIX 8 SAPPHIRE AMOLED JAM TANGAN GPS MULTISPORT',
    category: 'Elektronik - Smartwatch',
    iconType: 'watch',
    nilai: 699000,
    jatuhTempo: '15 Mar 2026',
    action: 'Gadai Lagi',
    status: 'selesai',
  },
]

function AssetCardIcon({ type }: { type: IPinjamanItem['iconType'] }) {
  if (type === 'tv') return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#023dff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
    </svg>
  )
  if (type === 'watch') return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#023dff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="6"/>
      <polyline points="12 9 12 12 13.5 13.5"/>
      <path d="M16 5.5l-.5-3.5H8.5L8 5.5M8 18.5l.5 3.5h7l.5-3.5"/>
    </svg>
  )
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#023dff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="2" width="14" height="20" rx="2"/>
      <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="3"/>
    </svg>
  )
}

function AssetCard({ item, onAction }: { item: IPinjamanItem; onAction: () => void }) {
  return (
    <div className="pressable bg-white border border-slate-200 flex h-28 items-center overflow-hidden rounded-2xl shrink-0 w-80">
      <div className="flex flex-col gap-2 flex-1 pl-4 pr-2 py-3 border-r border-slate-200 h-full justify-center">
        <div className="flex flex-col gap-2">
          <AssetCardIcon type={item.iconType} />
          <p className="font-semibold text-sm text-slate-900 leading-4 overflow-hidden"
            style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' } as React.CSSProperties}>
            {item.name}
          </p>
        </div>
        {item.action === 'Bayar' && (
          <p className="text-[12px] font-medium text-slate-500">Jatuh tempo {item.jatuhTempo}</p>
        )}
      </div>
      <div className="flex flex-col w-32 h-full">
        <div className="flex flex-col gap-1 flex-1 px-3 py-2.5 justify-center">
          <p className="text-[12px] font-medium text-slate-800">Nilai Pinjaman</p>
          <p className="text-sm font-semibold text-[#023dff]">Rp {item.nilai.toLocaleString('id-ID')}</p>
        </div>
        <button
          className="bg-[#023dff] text-white text-sm font-semibold py-2.5 text-center rounded-br-lg"
          onClick={onAction}
        >
          {item.action}
        </button>
      </div>
    </div>
  )
}

const IC = '#023dff'
const ISW = { stroke: IC, strokeWidth: '1.5', strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, fill: 'none' }

const GADAI_CATEGORIES = {
  Elektronik: [
    { label: 'Handphone',    icon: <svg width="16" height="16" viewBox="0 0 24 24" {...ISW}><rect x="7" y="2" width="10" height="20" rx="2"/><circle cx="12" cy="18" r="0.8" fill={IC} stroke="none"/></svg> },
    { label: 'Laptop',       icon: <svg width="16" height="16" viewBox="0 0 24 24" {...ISW}><rect x="3" y="4" width="18" height="13" rx="2"/><path d="M1 21h22"/></svg> },
    { label: 'TV',           icon: <svg width="16" height="16" viewBox="0 0 24 24" {...ISW}><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M8 21h8M12 19v2"/></svg> },
    { label: 'Smartwatch',   icon: <svg width="16" height="16" viewBox="0 0 24 24" {...ISW}><rect x="7" y="7" width="10" height="10" rx="2"/><path d="M9 7V5h6v2M9 17v2h6v-2"/></svg> },
    { label: 'Game Console', icon: <svg width="16" height="16" viewBox="0 0 24 24" {...ISW}><path d="M10.5 5h3a5.5 5.5 0 0 1 5.5 5.5v3A5.5 5.5 0 0 1 13.5 19h-3A5.5 5.5 0 0 1 5 13.5v-3A5.5 5.5 0 0 1 10.5 5z"/><path d="M6 12h4m-2-2v4"/><circle cx="16" cy="11" r="0.8" fill={IC} stroke="none"/><circle cx="18" cy="13" r="0.8" fill={IC} stroke="none"/></svg> },
    { label: 'Kamera',       icon: <svg width="16" height="16" viewBox="0 0 24 24" {...ISW}><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg> },
  ],
  Emas: [
    { label: 'Logam Mulia', icon: <svg width="16" height="16" viewBox="0 0 24 24" {...ISW}><path d="M12 3 2 9l10 12 10-12-10-6z"/><path d="M2 9h20M7 9 12 3M17 9 12 3"/></svg> },
    { label: 'Perhiasan',   icon: <svg width="16" height="16" viewBox="0 0 24 24" {...ISW}><circle cx="12" cy="14" r="6"/><path d="M9 5h6l2 3H7l2-3z"/></svg> },
  ],
  BPKB: [
    { label: 'BPKB Motor', icon: <svg width="16" height="16" viewBox="0 0 24 24" {...ISW}><circle cx="5.5" cy="16.5" r="2.5"/><circle cx="18.5" cy="16.5" r="2.5"/><path d="M8 16.5h4l3-6h3l2 3"/><path d="M7 8h3l1.5 2.5"/></svg> },
    { label: 'BPKB Mobil', icon: <svg width="16" height="16" viewBox="0 0 24 24" {...ISW}><path d="M5 12 6.7 7.6A2 2 0 0 1 8.6 6h6.8a2 2 0 0 1 1.9 1.6L19 12"/><path d="M3 12h18v5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-5z"/><circle cx="7.5" cy="17.5" r="1.5"/><circle cx="16.5" cy="17.5" r="1.5"/></svg> },
  ],
}

export default function Homepage() {
  const navigate = useNavigate()
  const [showCategorySheet, setShowCategorySheet] = useState(false)
  const [pendingCategory, setPendingCategory] = useState('')
  const [poinBalance] = useState(() =>
    parseInt(localStorage.getItem('pandai_poin') ?? '20000', 10)
  )
  const claimedTitles: string[] = JSON.parse(localStorage.getItem('pandai_claimed_titles') ?? '[]')
  const allClaimed = claimedTitles.length >= 3
  const remainingPoin = [2000, 2000, 2000]
    .slice(0, 3 - claimedTitles.length)
    .reduce((s, p) => s + p, 0)
  return (
    <div className="w-[375px] bg-slate-50 flex flex-col overflow-hidden rounded-3xl shadow-2xl relative" style={{ height: 812 }}>

      {/* ── Scrollable area (header + body) */}
      <div className="flex-1 overflow-y-auto hide-scrollbar flex flex-col">

      {/* ── Header (blue gradient) */}
      <div className="relative flex flex-col" style={{ background: "linear-gradient(180deg, #023dff 0%, #012599 100%)" }}>
        {/* Background pattern — fix 1: cover full width */}
        <div className="absolute inset-0 overflow-hidden opacity-25 pointer-events-none">
          <img src={imgPattern} alt="" className="w-full h-full object-cover object-left-top" />
        </div>

        {/* Status bar */}
        <div className="flex justify-between items-end px-6 pt-3 pb-1 h-12 relative z-10">
          <img src={imgDate} alt="9:41" className="h-[11px] w-[28px]" />
          <img src={imgRight} alt="" className="h-[11px] w-[67px]" />
        </div>

        {/* Greeting */}
        <div className="flex items-start px-6 py-3 relative z-10">
          <div className="flex flex-col gap-1">
            <p className="text-base text-white">
              <span className="font-normal">Halo, </span>
              <span className="font-semibold text-[#e5f2ff]">Azzahra!</span>
            </p>
            <div className="flex items-center gap-1">
              <span className="text-[12px] text-blue-200">Referral:</span>
              <div className="flex items-center gap-1 bg-[#cfe7ff] px-1.5 rounded-full">
                <span className="text-[12px] font-semibold text-[#023dff]">ABK001</span>
                <img src={imgShareIcon} alt="" className="size-3" />
              </div>
            </div>
          </div>
        </div>

        {/* fix 2: panda behind card — z-[5], card at z-[10] */}
        <img src={imgPose} alt="Panda mascot" className="absolute right-4 top-10 size-[88px] z-[5]" />

        {/* ── Poin Pandai card */}
        <div className="mx-4 rounded-t-2xl overflow-hidden relative z-[10]">
          {/* Gold section */}
          <div className="flex items-center justify-between px-3 py-3"
            style={{ background: "linear-gradient(118deg, #ffaa33 7%, #ffcb3c 21%, #ffcb3c 49%, #ffae28 75%, #fbc63a 98%)" }}>
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-1">
                <img src={imgPoinEmas} alt="" className="size-[18px] object-contain" />
                <span className="text-[12px] font-medium text-[#7e480f]">Poin Pandai</span>
              </div>
              <p className="text-lg font-bold text-black">{poinBalance.toLocaleString('id-ID')} poin</p>
            </div>
            {allClaimed ? (
              <button
                onClick={() => navigate('/poin-pandai')}
                className="border border-[#7e480f] rounded-[8px] px-[10px] py-[6px]"
              >
                <span className="text-[14px] font-semibold text-[#492504]">Lihat detail</span>
              </button>
            ) : (
              <button onClick={() => navigate('/poin-pandai', { state: { openKlaim: true } })} className="relative overflow-hidden bg-[#ffcd05] border border-[#fffdc6] rounded-lg px-3 py-1.5">
                <span className="text-sm font-semibold text-[#492504] relative z-10">Klaim poin</span>
                <div className="shimmer-btn absolute top-[-14px] left-0 w-6 h-16 opacity-60"
                  style={{ background: "linear-gradient(266deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.9) 50%, rgba(255,255,255,0) 100%)" }} />
              </button>
            )}
          </div>

          {/* Dark hook strip */}
          <div className="flex items-center justify-between bg-[#09134e] px-3 py-1.5">
            <span className="text-[12px] font-medium text-[#cfe7ff]">
              Ambil tambahan Poin Pandai s.d 20.000 poin!
            </span>
            <ArrowRightSmall className="size-4 text-[#cfe7ff]" />
          </div>

          {/* Saldo row */}
          <div className="bg-slate-50 flex gap-3 px-3 pt-3 pb-10">
            {/* Saldo Pandai */}
            <div className="bg-white flex-1 rounded-xl p-3 shadow-sm flex flex-col gap-1 cursor-pointer" onClick={() => navigate('/saldo-pandai')}>
              <div className="flex items-center gap-1">
                <img src={imgSaldoIcon} alt="" className="size-5 object-contain" />
                <span className="text-[12px] font-medium text-slate-700">Saldo Pandai</span>
              </div>
              <p className="text-base font-semibold text-black">Rp3.800.000</p>
              <div className="flex items-center gap-1 text-[#023dff]">
                <span className="text-[12px] font-semibold">Pakai Saldo</span>
                <ArrowRightSmall className="size-3" />
              </div>
            </div>
            {/* Cuan Pandai */}
            <div className="bg-white flex-1 rounded-xl p-3 shadow-sm flex flex-col gap-1 cursor-pointer" onClick={() => navigate('/cuan-pandai')}>
              <div className="flex items-center gap-1">
                <img src={imgCuanIcon} alt="" className="size-5 object-contain" />
                <span className="text-[12px] font-medium text-slate-700">Cuan Pandai</span>
              </div>
              <p className="text-[12px] font-medium text-slate-500">20+ misi menunggu!</p>
              <div className="flex items-center gap-1 text-[#023dff]">
                <span className="text-[12px] font-semibold">Telusuri Misi</span>
                <ArrowRightSmall className="size-3" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── White body */}
      <div className="bg-slate-50 flex flex-col flex-1 rounded-t-3xl shadow-[0_-4px_12px_rgba(0,0,0,0.1)] -mt-8 relative z-10">

        {/* Pinjaman Kamu */}
        <div className="flex flex-col gap-3 p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-slate-900">Pinjaman Kamu</p>
            <button className="flex items-center gap-1 text-[12px] font-semibold text-[#023dff]">
              Lihat Semua <ArrowRightSmall className="size-3" />
            </button>
          </div>
          <div className="hide-scrollbar flex gap-2 overflow-x-auto pb-1 -mr-4 pr-4">
            {pinjamanItems.map((item) => (
              <AssetCard
                key={item.id}
                item={item}
                onAction={() => navigate('/pinjaman/detail', { state: { pinjaman: item } })}
              />
            ))}
          </div>
        </div>

        {/* Kirim & Bayar */}
        <div className="flex flex-col gap-3 px-4 pb-4">
          <p className="text-sm font-bold text-slate-900">Kirim & Bayar, Lebih Praktis!</p>

          {/* Quick actions */}
          <div className="flex items-start justify-between">
            {([
              { icon: icons.tarikSaldo, label: "Tarik saldo",      path: '/saldo-pandai' },
              { icon: icons.pulsa,      label: "Pulsa/\nPaket Data", path: '/saldo-pandai' },
              { icon: icons.listrik,    label: "Listrik PLN",       path: '/saldo-pandai' },
              { icon: icons.pdam,       label: "Tagihan PDAM",      path: '/saldo-pandai' },
            ] as const).map(({ icon, label, path }) => (
              <button key={label} className="flex flex-col items-center gap-2 flex-1 p-2" onClick={() => navigate(path)}>
                <QuickIcon icon={icon} />
                <span className="text-[12px] font-medium text-slate-900 text-center whitespace-pre-line leading-4">{label}</span>
              </button>
            ))}
          </div>

          {/* Simulasi + Lokasi */}
          <div className="flex gap-2">
            <button
              className="bg-white border border-slate-200 flex-1 flex items-center gap-2 px-3 py-3 rounded-2xl"
              onClick={() => { setPendingCategory(''); setShowCategorySheet(true) }}
            >
              <img src={imgCalcIcon} alt="" className="size-5 shrink-0 object-contain" />
              <div className="flex flex-col items-start">
                <span className="text-sm font-semibold text-slate-900">Simulasi Gadai</span>
                <span className="text-[12px] font-medium text-slate-500">Cek nilai taksiran</span>
              </div>
            </button>
            <button
              className="bg-white border border-slate-200 flex-1 flex items-center gap-2 px-3 py-3 rounded-2xl"
              onClick={() => navigate('/cabang')}
            >
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

      {/* ── Klaim Poin strip — hidden when all claimed */}
      {!allClaimed && (
        <div
          className="flex items-center gap-2 px-4 py-2 w-full"
          style={{ background: "linear-gradient(90deg, #fefdea 10%, #fffcaf 61%, #ffec4f 100%)" }}>
          <button
            onClick={() => navigate('/poin-pandai', { state: { openKlaim: true } })}
            className="flex items-center gap-2 w-full text-left"
          >
            <div className="flex flex-col flex-1">
              <p className="text-sm font-semibold text-[#492504]">Klaim {remainingPoin.toLocaleString('id-ID')} Poin Pandai</p>
              <p className="text-[12px] font-medium text-[#492504]">Pakai poin untuk bayar pinjaman!</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <div className="bg-[#ffda14] px-3 py-0.5 rounded-full">
                <span className="text-[12px] font-semibold text-slate-900">6 hari 3 jam lagi</span>
              </div>
              <ArrowRightSmall className="size-5 text-[#492504]" />
            </div>
          </button>
        </div>
      )}

      {/* ── Bottom Navbar */}
      <div className="bg-white flex items-center justify-between px-4 pt-4 pb-8">
        {/* Beranda (active) */}
        <button className="flex flex-col items-center gap-1 w-20">
          <img src={imgHomeIcon} alt="" className="size-6 object-contain" />
          <span className="text-[12px] font-bold text-[#001cdb]">Beranda</span>
        </button>

        {/* Pinjaman */}
        <button onClick={() => navigate('/pinjaman')} className="flex flex-col items-center gap-1 w-20">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#65758b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
            <line x1="1" y1="10" x2="23" y2="10"/>
          </svg>
          <span className="text-[12px] font-bold text-slate-500">Pinjaman</span>
        </button>

        {/* Poin Pandai */}
        <button onClick={() => navigate('/poin-pandai')} className="flex flex-col items-center gap-1 w-20">
          <img src={imgPoinEmasOutline} alt="" className="size-6 object-contain" />
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

      {/* Category picker sheet */}
      {showCategorySheet && (
        <div className="absolute inset-0 bg-[rgba(15,17,41,0.7)] z-50" onClick={() => setShowCategorySheet(false)}>
          <div
            className="absolute bottom-0 bg-white drop-shadow-[0px_10px_7.5px_rgba(0,0,0,0.1),0px_4px_3px_rgba(0,0,0,0.1)] flex flex-col pb-[16px] pt-[12px] rounded-tl-[8px] rounded-tr-[8px] w-[375px]"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex flex-col gap-[16px] items-center shrink-0 w-full">
              <div className="flex flex-col gap-[16px] items-center px-[16px] shrink-0 w-full">
                <div className="bg-[#e1e7ef] h-[8px] rounded-[9999px] w-[100px]" />
                <div className="flex gap-[8px] items-center w-full">
                  <p className="flex-1 font-semibold leading-[28px] text-[#0f1729] text-[18px]">Pilih barang</p>
                  <button onClick={() => setShowCategorySheet(false)} className="overflow-clip relative shrink-0 size-[16px]">
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 24 24" fill="none">
                      <path d="M18 6L6 18M6 6l12 12" stroke="#0f1729" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </button>
                </div>
              </div>
              <div className="flex flex-col items-start w-full max-h-[400px] overflow-y-auto">
                <div className="bg-white flex flex-col items-center px-[16px] w-full">
                  <div className="flex flex-col gap-[16px] items-start w-full">
                    {Object.entries(GADAI_CATEGORIES).map(([group, items]) => (
                      <div key={group} className="flex flex-col gap-[16px] items-start w-full">
                        <p className="font-semibold leading-[22px] text-[#65758b] text-[14px]">{group}</p>
                        <div className="flex flex-wrap gap-[8px] items-start w-full">
                          {items.map(item => (
                            <button
                              key={item.label}
                              onClick={() => setPendingCategory(item.label)}
                              className={`flex gap-[8px] h-[40px] items-center justify-start px-[12px] py-[6px] rounded-[8px] shrink-0 border ${
                                pendingCategory === item.label
                                  ? 'bg-[#e5f2ff] border-[#023dff]'
                                  : 'bg-white border-[#cbd5e1]'
                              }`}
                              style={{ width: '167.5px' }}
                            >
                              <div className="shrink-0 size-[16px] flex items-center justify-center">
                                {item.icon}
                              </div>
                              <p className={`font-semibold leading-[22px] text-[14px] whitespace-nowrap ${
                                pendingCategory === item.label ? 'text-[#023dff]' : 'text-[#0f1729]'
                              }`}>{item.label}</p>
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end justify-center px-[16px] w-full">
                <button
                  disabled={!pendingCategory}
                  onClick={() => { setShowCategorySheet(false); navigate('/simulasi', { state: { category: pendingCategory } }) }}
                  className={`flex gap-[4px] h-[38px] items-center justify-center px-[16px] py-[8px] rounded-[8px] w-full ${
                    pendingCategory ? 'bg-[#023dff]' : 'bg-[#e1e7ef]'
                  }`}
                >
                  <p className={`font-semibold leading-[22px] text-[14px] whitespace-nowrap ${
                    pendingCategory ? 'text-white' : 'text-[#94a3b8]'
                  }`}>Lanjutkan</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
