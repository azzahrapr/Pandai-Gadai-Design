import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

// ── Local static assets ────────────────────────────────────────────────────────
const imgDate           = "/assets/status-date.svg";
const imgRight          = "/assets/status-right.svg";
const imgPoinEmasLg     = "/assets/poin-fill-lg.svg";
const imgPoinEmasSm     = "/assets/poin-fill-sm.svg";
const imgPoinEmasActive = "/assets/poin-fill-active.svg";
const imgSmileIcon      = "/assets/nav-smile.svg";
const imgHomeVec        = "/assets/nav-home-outline.svg";
const imgCreditCard     = "/assets/nav-credit-v2b.svg";

// Klaim poin overlay assets
const imgPoinEmasKlaim  = "/assets/poin-fill.svg";

// Mission detail overlay assets
const imgPose92         = "/assets/panda-pose9.png";
const imgPoinEmasMission = "/assets/poin-fill.svg";

// ── Data ─────────────────────────────────────────────────────────────────────
const missions = [
  { img: "/assets/panda-pose9.png", label: "Pencairan Pinjaman ke Saldo Pandai",   poin: "+2.000", desc: "Nikmati kemudahan langsung saat dana pinjamanmu masuk ke Saldo Pandai. Dari sini, poin emasmu juga ikut bertambah." },
  { img: "/assets/panda-pose11.png", label: "Lakukan transaksi PPOB Digital",        poin: "+2.000", desc: "Bayar tagihan PPOB digitalmu dan dapatkan poin tambahan di setiap transaksi." },
  { img: "/assets/panda-pose10.png", label: "Tarik Saldo Pandai",                    poin: "+2.000", desc: "Tarik saldo Pandaimu ke rekening dan raih poin ekstra untuk setiap penarikan." },
  { img: "/assets/panda-pose12.png", label: "Aktifkan Notifikasi di Pengaturan",     poin: "+1.000", desc: "Aktifkan notifikasi agar kamu tidak melewatkan satu pun update dari Pandai." },
  { img: "/assets/panda-pose30.png", label: "Aktifkan Lokasi di Pengaturan",         poin: "+1.000", desc: "Izinkan akses lokasi untuk pengalaman yang lebih personal dan relevan." },
  { img: "/assets/panda-pose13.png", label: "Ajak Teman Gadai, Dapatkan Poin Emas",  poin: "+2.000", desc: "Bagikan kode referralmu dan dapatkan poin emas setiap kali temanmu bergadai." },
];

const klaimItems = [
  { category: "Tarik Saldo",  title: "Tarik Saldo",     subtitle: "Rp128.000",       poin: 2000 },
  { category: "PDAM",         title: "Tagihan PDAM",    subtitle: "321123*********", poin: 2000 },
  { category: "Listrik",      title: "Listrik PLN",     subtitle: "321123*********", poin: 2000 },
];

// ── Shared SVG helpers ────────────────────────────────────────────────────────
function ArrowRightSmall({ className = "size-3" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 12 12" fill="none">
      <path d="M4.5 9L7.5 6L4.5 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function HeadsetIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M3.5 10.5v-1a6.5 6.5 0 0 1 13 0v1" stroke="#374151" strokeWidth="1.5" strokeLinecap="round"/>
      <rect x="2" y="10.5" width="2.5" height="4" rx="1.25" stroke="#374151" strokeWidth="1.5"/>
      <rect x="15.5" y="10.5" width="2.5" height="4" rx="1.25" stroke="#374151" strokeWidth="1.5"/>
      <path d="M18 14.5v.5a2 2 0 0 1-2 2h-2.5" stroke="#374151" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}
function HourglassIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M4 2h8M4 14h8M5.5 2v3.5L8 8l2.5-2.5V2M5.5 14v-3.5L8 8l2.5 2.5V14" stroke="#64748b" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function ClockIcon({ color = "#ca8a04" }: { color?: string }) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <circle cx="6" cy="6" r="5" stroke={color} strokeWidth="1.2"/>
      <path d="M6 3.5V6L7.5 7.5" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );
}
function ChevronDown() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M5 7.5L10 12.5L15 7.5" stroke="#492504" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// ── Klaim Poin overlay ────────────────────────────────────────────────────────
function KlaimOverlay({ onClose, onClaimSingle, onClaimAll, claimedTitles }: {
  onClose: () => void;
  onClaimSingle: (title: string, poin: number) => void;
  onClaimAll: () => void;
  claimedTitles: string[];
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 300);
  };

  const unclaimedItems = klaimItems.filter(item => !claimedTitles.includes(item.title));
  const totalUnclaimed = unclaimedItems.reduce((sum, item) => sum + item.poin, 0);

  return (
    <div className="absolute inset-0 z-50 flex flex-col justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/30 transition-opacity duration-300"
        style={{ opacity: visible ? 1 : 0 }}
        onClick={handleClose}
      />

      {/* Bottom sheet */}
      <div
        className="relative bg-white rounded-t-2xl shadow-xl flex flex-col overflow-hidden max-h-[85%] transition-transform duration-300 ease-out"
        style={{ transform: visible ? 'translateY(0)' : 'translateY(100%)' }}
      >
        {/* Yellow strip header */}
        <div className="flex items-center gap-2 px-4 py-2 shrink-0"
          style={{ background: "linear-gradient(90deg, #fefdea 10%, #fffcaf 61%, #ffec4f 100%)" }}>
          <div className="flex flex-col flex-1">
            <p className="text-sm font-semibold text-[#492504]">
              Klaim {totalUnclaimed.toLocaleString('id-ID')} Poin Pandai
            </p>
            <p className="text-[12px] font-medium text-[#492504]">Pakai poin untuk bayar pinjaman!</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <div className="flex items-center gap-1 bg-[#ffda14] border border-[#fff88f] px-2.5 py-0.5 rounded-full">
              <ClockIcon />
              <span className="text-[12px] font-semibold text-slate-900">01 : 32 : 44</span>
            </div>
            <button onClick={handleClose}><ChevronDown /></button>
          </div>
        </div>

        {/* Scrollable list */}
        <div className="overflow-y-auto hide-scrollbar flex flex-col gap-2 p-4">
          {unclaimedItems.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-8 text-center">
              <span className="text-2xl">🎉</span>
              <p className="text-sm font-semibold text-slate-900">Semua poin sudah diklaim!</p>
              <p className="text-[12px] text-slate-500">Kamu sudah mengklaim semua poin yang tersedia.</p>
            </div>
          ) : (
            unclaimedItems.map(({ category, title, subtitle, poin }) => (
              <div key={title} className="pressable bg-white border border-slate-200 rounded-xl p-3 flex flex-col gap-3">
                {/* Item header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <HourglassIcon />
                    <span className="text-[12px] font-semibold text-slate-500">Tersedia</span>
                    <div className="w-px h-4 bg-slate-200" />
                    <span className="text-[12px] font-semibold text-[#023dff] bg-[#e5f2ff] px-2 py-0.5 rounded-full">{category}</span>
                  </div>
                  <div className="flex items-center gap-1 bg-[#fefdea] border border-[#fff88f] px-2 py-0.5 rounded-full">
                    <ClockIcon />
                    <span className="text-[12px] font-semibold text-[#ca8a04]">01 : 32 : 44</span>
                  </div>
                </div>
                {/* Item content */}
                <div className="flex items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 truncate">{title}</p>
                    <p className="text-[12px] font-semibold text-slate-500 truncate">{subtitle}</p>
                  </div>
                  <button onClick={() => onClaimSingle(title, poin)} className="flex items-center gap-1 bg-[#023dff] px-3 py-1.5 rounded-md shrink-0">
                    <span className="text-[12px] font-semibold text-white">Klaim</span>
                    <div className="relative size-4 overflow-hidden shrink-0">
                      <div className="absolute inset-[0_6.53%_0_6.5%]">
                        <img alt="" className="absolute inset-0 block size-full max-w-none" src={imgPoinEmasKlaim} style={{ filter: 'brightness(0) invert(1)' }} />
                      </div>
                    </div>
                    <span className="text-[12px] font-semibold text-white">{poin.toLocaleString('id-ID')}</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer buttons */}
        <div className="flex flex-col gap-2 px-4 pt-2 pb-6 shrink-0">
          {unclaimedItems.length > 0 && (
            <button onClick={onClaimAll} className="w-full bg-[#0020e3] rounded-md py-2.5 text-sm font-medium text-white">
              Klaim Semua
            </button>
          )}
          <button onClick={handleClose} className="w-full bg-white border border-slate-200 rounded-md py-2.5 text-sm font-medium text-slate-900">
            {unclaimedItems.length === 0 ? 'Tutup' : 'Lihat Riwayat'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Mission detail overlay ─────────────────────────────────────────────────────
function MissionOverlay({ mission, onClose }: { mission: typeof missions[0]; onClose: () => void }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 300);
  };

  return (
    <div className="absolute inset-0 z-50 flex flex-col justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[rgba(15,17,41,0.7)] transition-opacity duration-300"
        style={{ opacity: visible ? 1 : 0 }}
        onClick={handleClose}
      />

      {/* Bottom sheet */}
      <div
        className="relative bg-white rounded-t-2xl shadow-xl px-4 pb-6 transition-transform duration-300 ease-out"
        style={{ transform: visible ? 'translateY(0)' : 'translateY(100%)' }}
      >
        {/* Handle */}
        <div className="flex justify-center pt-4 pb-2">
          <div className="w-24 h-2 bg-slate-100 rounded-full" />
        </div>

        {/* Panda + poin pill */}
        <div className="flex flex-col items-center gap-2 pt-2 pb-4">
          <img src={imgPose92} alt="" className="size-32 object-cover" />
          <div className="flex items-center gap-1.5 bg-[#ffcd05] px-3 py-1.5 rounded-full">
            <div className="relative size-6 overflow-hidden shrink-0">
              <div className="absolute inset-[0_6.53%_0_6.5%]">
                <img alt="" className="absolute inset-0 block size-full max-w-none" src={imgPoinEmasMission} />
              </div>
            </div>
            <span className="text-lg font-bold text-[#422006] tracking-[-0.09px]">4.000 poin</span>
          </div>
        </div>

        {/* Text */}
        <div className="flex flex-col gap-2 pb-6 text-center">
          <p className="text-lg font-semibold text-slate-900 leading-7">{mission.label}</p>
          <p className="text-sm text-slate-500 leading-5">{mission.desc}</p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-2">
          <button className="w-full bg-[#023dff] rounded-md py-2.5 text-sm font-medium text-white">
            Kerjakan
          </button>
          <button onClick={handleClose} className="w-full bg-white border border-slate-200 rounded-md py-2.5 text-sm font-medium text-slate-900">
            Nanti Dulu
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function PoinPandaiVerified() {
  const navigate = useNavigate()
  const location = useLocation()
  const [showKlaimOverlay, setShowKlaimOverlay] = useState(false);
  const [selectedMission, setSelectedMission] = useState<typeof missions[0] | null>(null);
  const [poinBalance, setPoinBalance] = useState(() =>
    parseInt(localStorage.getItem('pandai_poin') ?? '20000', 10)
  );
  const [claimedTitles, setClaimedTitles] = useState<string[]>(() =>
    JSON.parse(localStorage.getItem('pandai_claimed_titles') ?? '[]')
  );

  const allClaimed = claimedTitles.length >= klaimItems.length;

  const handleClaimSingle = (title: string, poin: number) => {
    const updated = [...claimedTitles, title];
    setClaimedTitles(updated);
    localStorage.setItem('pandai_claimed_titles', JSON.stringify(updated));
    const newTotal = poinBalance + poin;
    localStorage.setItem('pandai_poin', String(newTotal));
    setPoinBalance(newTotal);
    navigate('/poin-pandai/success', { state: { claimed: poin, newTotal } });
  };

  const handleClaimAll = () => {
    const remaining = klaimItems.filter(item => !claimedTitles.includes(item.title));
    const totalClaimed = remaining.reduce((sum, item) => sum + item.poin, 0);
    const allTitles = klaimItems.map(item => item.title);
    setClaimedTitles(allTitles);
    localStorage.setItem('pandai_claimed_titles', JSON.stringify(allTitles));
    const newTotal = poinBalance + totalClaimed;
    localStorage.setItem('pandai_poin', String(newTotal));
    setPoinBalance(newTotal);
    navigate('/poin-pandai/success', { state: { claimed: totalClaimed, newTotal } });
  };

  useEffect(() => {
    if ((location.state as { openKlaim?: boolean } | null)?.openKlaim) {
      setShowKlaimOverlay(true)
    }
  }, []);

  return (
    <div className="w-[375px] bg-white flex flex-col overflow-hidden rounded-3xl shadow-2xl relative" style={{ height: 812 }}>

      {/* Status bar */}
      <div className="flex justify-between items-end px-4 pt-3 pb-1 h-12">
        <img src={imgDate} alt="9:41" className="h-[11px] w-[28px]" />
        <img src={imgRight} alt="" className="h-[11px] w-[67px]" />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between px-4 h-14">
        <div className="flex items-center gap-2">
          <button onClick={() => navigate(-1)} className="size-9 flex items-center justify-center -ml-1">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M12.5 15L7.5 10L12.5 5" stroke="#020617" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <p className="text-xl font-semibold text-black tracking-[-0.1px]">Poin Pandai</p>
        </div>
        <button className="size-10 rounded-full border border-slate-200 bg-white flex items-center justify-center">
          <HeadsetIcon />
        </button>
      </div>

      {/* Scrollable content */}
      <div className="flex flex-col flex-1 overflow-y-auto hide-scrollbar">

        {/* Gold gradient hero */}
        <div className="flex flex-col items-center px-4 pt-6 pb-10"
          style={{ background: "linear-gradient(180deg, #fff 0%, #fff88f 100%)" }}>

          {/* Reward card */}
          <div className="w-full rounded-2xl p-3 flex flex-col gap-3"
            style={{ background: "linear-gradient(104deg, #ffaa33 7%, #ffcb3c 21%, #ffcb3c 49%, #ffae28 75%, #fbc63a 98%)" }}>

            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1">
                  <div className="relative size-5 overflow-hidden shrink-0">
                    <div className="absolute inset-[0_6.53%_0_6.5%]">
                      <img alt="" className="absolute inset-0 block size-full max-w-none" src={imgPoinEmasLg} />
                    </div>
                  </div>
                  <span className="text-sm text-[#492504]">Poin Pandai</span>
                </div>
                <p className="text-[26px] font-semibold text-[#492504] leading-8 tracking-[-0.156px]">{poinBalance.toLocaleString('id-ID')}</p>
                <div className="bg-[rgba(178,114,2,0.2)] rounded-full px-2 h-5 flex items-center">
                  <span className="text-[12px] text-[#492504]">Setara Rp{poinBalance.toLocaleString('id-ID')}</span>
                </div>
              </div>

              <div className="flex flex-col items-end gap-2">
                {allClaimed ? (
                  <button
                    onClick={() => navigate('/riwayat-poin-pandai')}
                    className="border border-[#7e480f] rounded-[8px] px-[10px] py-[6px]"
                  >
                    <span className="text-[14px] font-semibold text-[#492504]">Lihat detail</span>
                  </button>
                ) : (
                  <button
                    onClick={() => setShowKlaimOverlay(true)}
                    className="relative overflow-hidden bg-[#ffcd05] border border-[#fffdc6] rounded-lg px-2.5 py-1.5"
                  >
                    <span className="text-sm font-semibold text-[#492504] relative z-10">Klaim Poin</span>
                    <div className="shimmer-btn absolute top-[-14px] left-0 w-6 h-16 opacity-60"
                      style={{ background: "linear-gradient(266deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.9) 50%, rgba(255,255,255,0) 100%)" }} />
                  </button>
                )}
                <span className="text-[12px] text-[#94590a]">Exp. 27 Agu 2026</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button className="flex-1 bg-white border border-slate-200 rounded-xl py-2 text-sm font-medium text-slate-900">
                Tukar ke Voucher
              </button>
              <button
                className="flex-1 bg-[#023dff] rounded-xl py-2 text-sm font-medium text-white"
                onClick={() => navigate('/pinjaman/detail', { state: { pinjaman: {
                  id: 'p1', sbg: '#2000240800002203', status: 'aktif',
                  tanggalPinjaman: '01 Okt 2025', cabang: 'Otista',
                  name: 'SAMSUNG GALAXY A52S 6/128GB', category: 'Elektronik - HP',
                  iconType: 'phone', nilai: 850000, jatuhTempo: '01 Nov 2025',
                } } })}
              >
                Tebus dengan Poin
              </button>
            </div>
          </div>
        </div>

        {/* Mission section */}
        <div className="bg-white rounded-t-2xl shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] -mt-6 pt-6 pb-4 px-4 flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-black">💸 Tambah Poin dari Setiap Misi</p>
              <button className="flex items-center gap-0.5 text-[12px] font-semibold text-[#023dff]">
                Lihat Semua <ArrowRightSmall className="size-3" />
              </button>
            </div>
            <p className="text-[12px] text-slate-500 leading-4">
              Setiap misi akan menambah Poin Pandai. Teruskan langkahnya, dan lihat poinmu bertambah tanpa henti.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            {missions.map((mission) => (
              <button
                key={mission.label}
                onClick={() => setSelectedMission(mission)}
                className="pressable flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-4 py-3 text-left w-full"
              >
                <img src={mission.img} alt="" className="size-12 shrink-0 object-cover" />
                <div className="flex-1 min-w-0 flex flex-col">
                  <p className="text-sm font-semibold text-black leading-5">{mission.label}</p>
                  <div className="flex items-center gap-0.5">
                    <div className="relative size-[18px] overflow-hidden shrink-0">
                      <div className="absolute inset-[0_6.53%_0_6.5%]">
                        <img alt="" className="absolute inset-0 block size-full max-w-none" src={imgPoinEmasSm} />
                      </div>
                    </div>
                    <span className="text-[12px] font-medium text-[#e0a200]">{mission.poin}</span>
                  </div>
                </div>
                <ArrowRightSmall className="size-5 text-slate-400 shrink-0" />
              </button>
            ))}
          </div>
        </div>

        {/* Cari Cuan section */}
        <div className="px-4 py-4 flex flex-col gap-4"
          style={{ background: "linear-gradient(180deg, #ffffff 8.78%, #fefdea 100%)" }}>

          {/* Header */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <p className="text-[14px] font-semibold text-[#020617] leading-5">✨ Yuk, Ambil Poin Pandaimu!</p>
              <div className="flex items-center gap-1 bg-[#f0fdf4] border border-[#16a34a] px-1.5 py-0.5 rounded-full" style={{ borderWidth: '0.5px' }}>
                <div className="size-[10px] overflow-hidden shrink-0 relative">
                  <div className="absolute inset-[0_6.53%_0_6.5%]">
                    <img alt="" className="absolute inset-0 block size-full max-w-none" src={imgPoinEmasSm} />
                  </div>
                </div>
                <p className="text-[10px] text-[#16a34a] leading-4 whitespace-nowrap">
                  <span className="font-black">25rb</span>
                  <span className="font-medium"> didapat Andrew</span>
                </p>
              </div>
            </div>
            <p className="text-[12px] text-[#64748b] leading-4">
              Ribuan pengguna udah kumpulin cuan dari sini — yuk cek kategorinya sebelum kehabisan🔥
            </p>
          </div>

          {/* Category cards */}
          <div className="flex flex-col gap-2">
            {/* Survey */}
            <div className="flex flex-col border border-[#e2e8f0] rounded-[16px] overflow-hidden cursor-pointer" onClick={() => navigate('/cuan-pandai')}>
              <div className="flex items-center justify-between px-3 py-2"
                style={{ background: "linear-gradient(90deg, #fffdc6 22%, #ffec4f 100%)" }}>
                <span className="text-[12px] font-medium text-[#020617]">3.200+ pengguna ikut minggu ini</span>
                <img src="/assets/Quota.png" alt="Lagi Ramai!" className="h-6 w-auto shrink-0 self-center" />
              </div>
              <div className="bg-white flex items-center gap-3 px-3 py-3">
                <img src="/assets/splash-screen-mascot.png" alt="" className="size-10 shrink-0 object-contain" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="text-[14px] font-semibold text-[#020617] leading-5">Survey</span>
                    <ArrowRightSmall className="size-3.5 text-[#020617]" />
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="flex items-center gap-1">
                      <div className="size-3 overflow-hidden shrink-0 relative">
                        <div className="absolute inset-[0_6.53%_0_6.5%]">
                          <img alt="" className="absolute inset-0 block size-full max-w-none" src={imgPoinEmasSm} />
                        </div>
                      </div>
                      <span className="text-[12px] font-medium text-[#ca8a04]">Hingga 75.000 poin</span>
                    </div>
                    <div className="size-1 bg-[#94a3b8] rounded-full shrink-0" />
                    <div className="flex items-center gap-1">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" fill="#94a3b8"/>
                        <polyline points="14 2 14 8 20 8" fill="none" stroke="white" strokeWidth="2"/>
                      </svg>
                      <span className="text-[12px] font-medium text-[#94a3b8]">Hingga 4 misi+</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Registrasi */}
            <div className="flex flex-col border border-[#e2e8f0] rounded-[16px] overflow-hidden cursor-pointer" onClick={() => navigate('/cuan-pandai')}>
              <div className="flex items-center justify-between px-3 py-2"
                style={{ background: "linear-gradient(90deg, #fffdc6 22%, #ffec4f 100%)" }}>
                <span className="text-[12px] font-medium text-[#020617]">6.210+ pengguna ikut minggu ini</span>
                <img src="/assets/Quota.png" alt="Lagi Ramai!" className="h-6 w-auto shrink-0 self-center" />
              </div>
              <div className="bg-white flex items-center gap-3 px-3 py-3">
                <img src="/assets/splash-screen-mascot.png" alt="" className="size-10 shrink-0 object-contain" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="text-[14px] font-semibold text-[#020617] leading-5">Registrasi</span>
                    <ArrowRightSmall className="size-3.5 text-[#020617]" />
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="flex items-center gap-1">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="#ca8a04">
                        <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
                      </svg>
                      <span className="text-[12px] font-medium text-[#ca8a04]">Hingga 250mg+</span>
                    </div>
                    <div className="size-1 bg-[#94a3b8] rounded-full shrink-0" />
                    <div className="flex items-center gap-1">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" fill="#94a3b8"/>
                        <polyline points="14 2 14 8 20 8" fill="none" stroke="white" strokeWidth="2"/>
                      </svg>
                      <span className="text-[12px] font-medium text-[#94a3b8]">Hingga 20 misi+</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Klaim strip — hidden when all claimed */}
      {!allClaimed && (
        <div className="flex items-center gap-2 px-4 py-2"
          style={{ background: "linear-gradient(90deg, #fefdea 10%, #fffcaf 61%, #ffec4f 100%)" }}>
          <div className="flex flex-col flex-1">
            <p className="text-sm font-semibold text-[#492504]">
              Klaim {klaimItems.filter(i => !claimedTitles.includes(i.title)).reduce((s, i) => s + i.poin, 0).toLocaleString('id-ID')} Poin Pandai
            </p>
            <p className="text-[12px] font-medium text-[#492504]">Pakai poin untuk bayar pinjaman!</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <div className="bg-[#ffda14] px-2.5 py-0.5 rounded-full">
              <span className="text-[12px] font-semibold text-slate-900">6 hari 3 jam lagi</span>
            </div>
            <ArrowRightSmall className="size-5 text-[#492504]" />
          </div>
        </div>
      )}

      {/* Bottom Navbar */}
      <div className="bg-white flex items-center justify-between px-4 pt-4 pb-8">
        <button onClick={() => navigate('/home')} className="flex flex-col items-center gap-1 w-20">
          <div className="relative size-6 overflow-hidden">
            <div className="absolute inset-[0.09%_0_-0.03%_0]">
              <img alt="" className="absolute inset-0 block size-full max-w-none" src={imgHomeVec} />
            </div>
          </div>
          <span className="text-[12px] font-bold text-slate-500">Beranda</span>
        </button>
        <button onClick={() => navigate('/pinjaman')} className="flex flex-col items-center gap-1 w-20">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#65758b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
            <line x1="1" y1="10" x2="23" y2="10"/>
          </svg>
          <span className="text-[12px] font-bold text-slate-500">Pinjaman</span>
        </button>
        <button className="flex flex-col items-center gap-1 w-20">
          <div className="relative size-6 overflow-hidden">
            <div className="absolute inset-[0_6.53%_0_6.5%]">
              <img alt="" className="absolute inset-0 block size-full max-w-none" src={imgPoinEmasActive} />
            </div>
          </div>
          <span className="text-[12px] font-bold text-[#001cdb]">Poin Pandai</span>
        </button>
        <button className="flex flex-col items-center gap-1 w-20 relative">
          <div className="relative">
            <div className="relative size-6 overflow-hidden">
              <img alt="" className="absolute inset-0 block size-full max-w-none object-contain" src={imgSmileIcon} />
            </div>
            <div className="absolute -top-2 left-3 bg-red-600 text-white text-[10px] font-bold px-1 rounded-full min-w-[18px] text-center leading-[15px]">
              99+
            </div>
          </div>
          <span className="text-[12px] font-bold text-slate-500">Akun</span>
        </button>
      </div>

      {/* ── Overlays ── */}
      {showKlaimOverlay && (
        <KlaimOverlay
          onClose={() => setShowKlaimOverlay(false)}
          onClaimSingle={handleClaimSingle}
          onClaimAll={handleClaimAll}
          claimedTitles={claimedTitles}
        />
      )}
      {selectedMission && (
        <MissionOverlay
          mission={selectedMission}
          onClose={() => setSelectedMission(null)}
        />
      )}
    </div>
  );
}
