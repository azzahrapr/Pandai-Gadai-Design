import { useNavigate, useSearchParams } from 'react-router-dom'

// Local static assets
const imgDate         = "/assets/status-date.svg";
const imgRight        = "/assets/status-right.svg";
const imgHeadset      = "/assets/headset-icon.svg";
const imgPoinEmasSm   = "/assets/poin-fill-sm.svg";
const imgPoinEmasActive = "/assets/poin-fill-active.svg";
const imgSmileIcon    = "/assets/nav-smile.svg";
const imgHomeVec      = "/assets/nav-home-outline.svg";
const imgPose81       = "/assets/panda-pose8.png";
const imgDecoPattern  = "/assets/deco-pattern.svg";
const imgHandHeart    = "/assets/hand-heart.svg";
const imgNotebook     = "/assets/notebook.svg";

const missions = [
  { img: "/assets/panda-pose9.png", label: "Pencairan Pinjaman ke Saldo Pandai",      poin: "+2.000" },
  { img: "/assets/panda-pose11.png", label: "Lakukan transaksi PPOB Digital",           poin: "+2.000" },
  { img: "/assets/panda-pose10.png", label: "Tarik Saldo Pandai",                       poin: "+2.000" },
  { img: "/assets/panda-pose12.png", label: "Aktifkan Notifikasi di Pengaturan",        poin: "+1.000" },
  { img: "/assets/panda-pose30.png", label: "Aktifkan Lokasi di Pengaturan",            poin: "+1.000" },
  { img: "/assets/panda-pose13.png", label: "Ajak Teman Gadai, Dapatkan Poin Emas",    poin: "+2.000" },
];

function ArrowRightSmall({ className = "size-3" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 12 12" fill="none">
      <path d="M4.5 9L7.5 6L4.5 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function PoinPandaiUnverified() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const isGuest = searchParams.get('guest') === 'true'
  return (
    <div className="w-[375px] bg-white flex flex-col overflow-hidden rounded-3xl shadow-2xl" style={{ height: 812 }}>

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
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M3.5 10.5v-1a6.5 6.5 0 0 1 13 0v1" stroke="#374151" strokeWidth="1.5" strokeLinecap="round"/>
            <rect x="2" y="10.5" width="2.5" height="4" rx="1.25" stroke="#374151" strokeWidth="1.5"/>
            <rect x="15.5" y="10.5" width="2.5" height="4" rx="1.25" stroke="#374151" strokeWidth="1.5"/>
            <path d="M18 14.5v.5a2 2 0 0 1-2 2h-2.5" stroke="#374151" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* Scrollable content */}
      <div className="flex flex-col flex-1 overflow-y-auto hide-scrollbar">

        {/* Verification hero */}
        <div className="flex flex-col items-center px-4 pt-6 pb-6 gap-4"
          style={{ background: "linear-gradient(180deg, #fff 0%, #fff88f 100%)" }}>

          {/* Headline */}
          <p className="text-[28px] font-bold text-slate-900 leading-8 tracking-[-0.168px] text-center w-full">
            Verifikasi untuk ambil 4.000 Poin Pandaimu!
          </p>

          {/* Panda + CTA button */}
          <div className="flex flex-col items-center gap-0 w-full relative">
            <img src={imgPose81} alt="Panda mascot" className="size-[120px] object-cover z-10 relative" />
            <button onClick={() => navigate(isGuest ? '/guest/login' : '/verifikasi')} className="w-full bg-[#ffcd05] rounded-lg flex items-center justify-center gap-2 py-3 -mt-3 shadow-lg">
              <span className="text-sm font-semibold text-slate-900">
                Ambil <span className="text-[#7e480f]">4.000 Poin Pandai</span> sekarang
              </span>
              <ArrowRightSmall className="size-4 text-slate-900" />
            </button>
          </div>

          {/* USP cards */}
          <div className="flex gap-4 w-full">
            {/* Card 1: Poin from transactions */}
            <div className="flex-1 bg-[#fefdea] border border-[#ca8a04] rounded-2xl flex flex-col items-center gap-2 px-3 py-2">
              <div className="relative size-5 overflow-hidden shrink-0">
                <div className="absolute inset-[0_6.53%_0_6.5%]">
                  <img alt="" className="absolute inset-0 block size-full max-w-none" src={imgPoinEmasSm} />
                </div>
              </div>
              <p className="text-[12px] font-medium text-[#ca8a04] text-center leading-4">
                Dapatkan Poin Pandai dari tiap transaksi
              </p>
            </div>

            {/* Card 2: Use poin for payment */}
            <div className="flex-1 bg-[#fefdea] border border-[#ca8a04] rounded-2xl flex flex-col items-center gap-2 px-3 py-2">
              <div className="relative size-5 overflow-hidden shrink-0">
                <div className="absolute inset-[0_0.01%_0_0]">
                  <img alt="" className="absolute inset-0 block size-full max-w-none" src={imgHandHeart} />
                </div>
              </div>
              <p className="text-[12px] font-medium text-[#ca8a04] text-center leading-4">
                Kumpulkan Poin Pandai dan gunakan untuk bayar pinjaman
              </p>
            </div>

            {/* Card 3: Complete missions */}
            <div className="flex-1 bg-[#fefdea] border border-[#ca8a04] rounded-2xl flex flex-col items-center gap-2 px-3 py-2">
              <div className="relative size-5 overflow-hidden shrink-0">
                <div className="absolute inset-[0_12.5%]">
                  <img alt="" className="absolute inset-0 block size-full max-w-none" src={imgNotebook} />
                </div>
              </div>
              <p className="text-[12px] font-medium text-[#ca8a04] text-center leading-4">
                Kerjakan misi untuk menambah Poin Pandai kamu
              </p>
            </div>
          </div>
        </div>

        {/* About Poin Pandai */}
        <div className="relative h-[78px] drop-shadow-[0px_-4px_3px_rgba(0,0,0,0.05)]">
          <div className="absolute left-0 top-0 w-full bg-[#f8fafc] rounded-t-[16px] px-4 py-3 overflow-hidden">
            <div
              className="absolute pointer-events-none opacity-80 z-0"
              style={{ left: '191px', top: '-43px', width: '255px', height: '230px', transform: 'rotate(-6deg)' }}
            >
              <img alt="" className="block w-full h-full object-contain" src={imgDecoPattern} />
            </div>
            <div className="relative z-10 flex flex-col gap-0.5">
              <p className="text-[14px] font-semibold text-[#020617] leading-5">Apa itu Poin Pandai?</p>
              <p className="text-[12px] text-[#0f1729] leading-4">
                Poin yang bisa kamu pakai untuk kurangi biaya tebus atau ditukar jadi voucher diskon.{" "}
                <span className="font-semibold text-[#001cdb]">Baca Selengkapnya</span>
              </p>
            </div>
          </div>
        </div>

        {/* Mission section */}
        <div className="bg-white rounded-t-2xl shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] pt-6 pb-4 px-4 flex flex-col gap-4">
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
            {missions.map(({ img, label, poin }) => (
              <div key={label} className="pressable flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-4 py-3">
                <img src={img} alt="" className="size-12 shrink-0 object-cover" />
                <div className="flex-1 min-w-0 flex flex-col">
                  <p className="text-sm font-semibold text-black leading-5">{label}</p>
                  <div className="flex items-center gap-0.5">
                    <div className="relative size-[18px] overflow-hidden shrink-0">
                      <div className="absolute inset-[0_6.53%_0_6.5%]">
                        <img alt="" className="absolute inset-0 block size-full max-w-none" src={imgPoinEmasSm} />
                      </div>
                    </div>
                    <span className="text-[12px] font-medium text-[#e0a200]">{poin}</span>
                  </div>
                </div>
                <ArrowRightSmall className="size-5 text-slate-400 shrink-0" />
              </div>
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

      {/* Klaim strip */}
      {!isGuest && (
        <div className="flex items-center gap-2 px-4 py-2"
          style={{ background: "linear-gradient(90deg, #fefdea 10%, #fffcaf 61%, #ffec4f 100%)" }}>
          <div className="flex flex-col flex-1">
            <p className="text-sm font-semibold text-[#492504]">Klaim 12.000 Poin Pandai</p>
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
        {/* Beranda */}
        <button onClick={() => navigate(isGuest ? '/guest/home' : '/home')} className="flex flex-col items-center gap-1 w-20">
          <div className="relative size-6 overflow-hidden">
            <div className="absolute inset-[0.09%_0_-0.03%_0]">
              <img alt="" className="absolute inset-0 block size-full max-w-none" src={imgHomeVec} />
            </div>
          </div>
          <span className="text-[12px] font-bold text-slate-500">Beranda</span>
        </button>

        {/* Pinjaman */}
        <button className="flex flex-col items-center gap-1 w-20">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#65758b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
            <line x1="1" y1="10" x2="23" y2="10"/>
          </svg>
          <span className="text-[12px] font-bold text-slate-500">Pinjaman</span>
        </button>

        {/* Poin Pandai (active) */}
        <button className="flex flex-col items-center gap-1 w-20">
          <div className="relative size-6 overflow-hidden">
            <div className="absolute inset-[0_6.53%_0_6.5%]">
              <img alt="" className="absolute inset-0 block size-full max-w-none" src={imgPoinEmasActive} />
            </div>
          </div>
          <span className="text-[12px] font-bold text-[#001cdb]">Poin Pandai</span>
        </button>

        {/* Akun */}
        <button onClick={() => navigate(isGuest ? '/guest/login' : '/akun')} className="flex flex-col items-center gap-1 w-20 relative">
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
    </div>
  );
}
