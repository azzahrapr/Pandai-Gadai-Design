import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const imgDate = "/assets/status-date.svg"
const imgRight = "/assets/status-right.svg"
const imgPoinEmasActive = "/assets/poin-fill-active.svg"
const imgPoinOutline = "/assets/poinemas.outline.png"
const imgCuanIcon = "/assets/icon.cuan-pandai.png"
const imgHomeVec = "/assets/nav-home-solid.svg"
const imgSmileIcon = "/assets/smile.png"
const imgNavPinjaman = "/assets/credit-card.png"
const imgMissionCard = "/assets/icon.poin-emas.png"

const howToSteps = [
  {
    num: 1,
    title: 'Datang ke cabang terdekat',
    desc: 'Cuma perlu bawa barang dan KTP kamu, langsung dapat nilai taksiran.',
    img: '/assets/mi-cabang.png',
  },
  {
    num: 2,
    title: 'Dana Langsung Cair',
    desc: 'Pencairan instan di cabang lewat bank, tunai, hingga e-wallet.',
    img: '/assets/mi-high-disbursement-rate.png',
  },
  {
    num: 3,
    title: 'Tebus, Perpanjang, Cicil Online',
    desc: 'Gak perlu ke cabang, semua pembayaran bisa dilakukan lewat aplikasi!',
    img: '/assets/mi-payment.png',
  },
  {
    num: 4,
    title: 'Ambil Barang di Cabang',
    desc: 'Jangan lupa ambil barangmu sebelum jatuh tempo.',
    img: '/assets/mi.discount.png',
  },
]

const BARANG_ITEMS = ['Handphone', 'Laptop', 'TV', 'Smartwatch', 'Game Console', 'Kamera', 'Emas', 'BPKB']

const missionCards = [
  { title: 'Download & Main Game', points: '+50.000 poin' },
  { title: 'Daftar & Verifikasi Akun', points: 'Dapatkan 700.000 poin' },
  { title: 'Gadai Pertamamu', points: 'Dapatkan 700.000 poin' },
]

export default function GuestHomepage() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [showItemSheet, setShowItemSheet] = useState(false)
  const [showMisiSheet, setShowMisiSheet] = useState(false)
  const [selectedItem, setSelectedItem] = useState<string | null>(null)
  const [glimmerField, setGlimmerField] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)

  const onCarouselScroll = () => {
    const el = carouselRef.current
    if (!el) return
    setStep(Math.round(el.scrollLeft / el.clientWidth))
  }

  return (
    <div className="w-[375px] flex flex-col overflow-hidden rounded-3xl shadow-2xl relative" style={{ height: 812 }}>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto hide-scrollbar">

        {/* Top section: glass bg */}
        <div
          style={{
            backgroundColor: 'rgba(70,150,248,0.3)',
            backgroundImage: "url('/assets/glass-bg-home.svg')",
            backgroundSize: '774px 857px',
            backgroundPosition: '-212px -135px',
            backgroundRepeat: 'no-repeat',
          }}
        >
          {/* Sticky: status bar + header */}
          <div
            className="sticky top-0 z-10"
            style={{
              backgroundColor: 'rgba(70,150,248,0.3)',
              backgroundImage: "url('/assets/glass-bg-home.svg')",
              backgroundSize: '774px 857px',
              backgroundPosition: '-212px -135px',
              backgroundRepeat: 'no-repeat',
            }}
          >
            {/* Status bar */}
            <div className="flex items-end justify-between h-[52px] px-[15px] pb-[9px]">
              <img src={imgDate} alt="" className="h-[11px] w-[28px] shrink-0" />
              <img src={imgRight} alt="" className="h-[11px] w-[67px] shrink-0" />
            </div>

            {/* Header */}
            <div data-component="Header / NavBar" className="flex items-center justify-between h-[72px] px-6">
              <div className="flex flex-col">
                <p className="text-[20px] font-semibold text-[#0f1729] leading-[23px]">Halo!</p>
                <p className="text-[12px] text-[#0f1729] leading-4 mt-0.5">Akses semua fitur yuk~</p>
              </div>
              <button
                data-component="Header CTA — Masuk"
                onClick={() => navigate('/guest/login')}
                className="bg-[#023dff] rounded-[8px] px-4 h-[38px] flex items-center"
              >
                <span className="text-[14px] font-semibold text-white">Masuk</span>
              </button>
            </div>
          </div>

          {/* Simulator card — scrolls */}
          <div className="mx-4 pb-6">
            <div data-component="Simulasi Gadai Card" className="bg-white/80 rounded-2xl px-4 py-4 flex flex-col gap-3" style={{ boxShadow: '0px 0px 4px 0px rgba(0,0,0,0.2)' }}>
              <div className="flex flex-col gap-1.5">
                <p className="text-[14px] font-semibold text-[#0f1729]">Mau gadai apa?</p>
                <button
                  onClick={() => setShowItemSheet(true)}
                  className={`flex items-center gap-2 border rounded-[6px] px-3 py-3 bg-white w-full text-left ${glimmerField ? 'glimmer border-[#023dff]' : 'border-[#cbd5e1]'}`}
                  onAnimationEnd={() => setGlimmerField(false)}
                >
                  <span className="flex-1 text-[14px] text-[#64748b] leading-5">
                    {selectedItem ?? 'Pilih barang'}
                  </span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
                    <path d="M4 6l4 4 4-4" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
              <button
                onClick={() => {
                  if (!selectedItem) { setGlimmerField(true); return }
                  window.location.href = '/landing-page/simulasi-gadai.html?guest=true'
                }}
                className="flex items-center justify-center gap-1 py-1"
              >
                <span className="text-[14px] font-semibold text-[#0020e3]">Mulai Simulasi</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0020e3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white">

        {/* Branch section */}
        <div className="px-4 pt-4 pb-0">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[14px] font-bold text-[#020617]">Ratusan cabang tersedia!</p>
            <button onClick={() => navigate('/guest/cabang')} className="flex items-center gap-0.5">
              <span className="text-[13px] font-semibold text-[#023dff]">Lihat semua</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#023dff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
          <div data-component="Nearest Branch Card" className="border border-[#e2e8f0] rounded-xl p-3 flex items-center gap-2">
            <div className="flex-1 flex flex-col gap-0.5 min-w-0">
              <div className="flex items-center gap-1">
                <span className="text-[14px] font-semibold text-[#020617]">Bendungan Hilir</span>
                <div className="inline-flex items-center h-4 px-2 bg-[#f0fdf4] border border-[#16a34a] rounded-full shrink-0">
                  <span className="text-[10px] font-bold text-[#15803d] leading-none">Terdekat</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#64748b" className="shrink-0">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                <span className="text-[12px] font-medium text-[#64748b]">2,5 km dari lokasimu</span>
              </div>
            </div>
            <button
              onClick={() => navigate('/guest/cabang')}
              className="size-8 flex items-center justify-center shrink-0"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#023dff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>

        {/* USP section */}
        <div data-component="USP Section" className="px-4 pt-4 pb-0 flex flex-col gap-3">
          <p className="text-[14px] font-bold text-[#020617]">Eksklusif di Pandai Gadai</p>

          {/* Row 1: Cuan Pandai */}
          <div data-component="Cuan Pandai Card" className="relative h-[164px] overflow-hidden rounded-[8px] flex flex-col gap-2 items-center px-2 pb-3">
            {/* bg */}
            <div className="absolute inset-0 rounded-[8px]" style={{ backgroundImage: "url('/assets/bg-cuan-pandai.png')", backgroundSize: 'cover', backgroundPosition: 'center' }} />

            {/* description */}
            <div className="relative z-10 flex flex-col gap-1 items-center pt-3 shrink-0 w-full">
              <div className="size-6 overflow-hidden shrink-0">
                <img alt="" className="size-full object-contain" src={imgCuanIcon} />
              </div>
              <p className="text-[12px] font-bold text-[#020617] text-center leading-4">Cuan Pandai</p>
              <p className="text-[12px] text-[#64748b] text-center leading-4">Selesaikan misi dan kumpulkan extra poin!</p>
            </div>

            {/* Mission cards — horizontal scroll */}
            <div className="relative z-10 flex gap-2 overflow-x-auto hide-scrollbar w-full shrink-0 pb-2">
              {missionCards.map((card, i) => (
                <div
                  key={i}
                  className="bg-white border border-[#e2e8f0] rounded-2xl p-3 flex gap-3 items-center shrink-0 w-[260px] cursor-pointer"
                  onClick={() => i === 0 && setShowMisiSheet(true)}
                >
                  <div className="size-10 rounded-xl overflow-hidden shrink-0 bg-[#f1f5f9]">
                    <img alt="" className="size-full object-cover" src={imgMissionCard} />
                  </div>
                  <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                    <p className="text-[12px] font-bold text-[#020617] leading-4 truncate">{card.title}</p>
                    <div className="flex items-center gap-1">
                      <img alt="" className="size-3 shrink-0" src={imgPoinEmasActive} />
                      <span className="text-[12px] font-medium text-[#ca8a04] leading-5">{card.points}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Cara Gadai section */}
        <div data-component="Cara Gadai Section" className="px-4 pb-4">
          <p className="text-[16px] font-semibold text-[#020617] mb-4">Mau gadai? Ini caranya</p>

          {/* Carousel */}
          <div
            ref={carouselRef}
            className="flex overflow-x-auto hide-scrollbar snap-x snap-mandatory rounded-xl"
            onScroll={onCarouselScroll}
          >
            {howToSteps.map((s) => (
              <div
                key={s.num}
                className="snap-start shrink-0 w-full bg-[#f8fafc] px-4 py-3 flex items-center gap-4 h-[102px]"
              >
                <div className="flex-1 flex flex-col gap-2 min-w-0">
                  <div className="relative inline-flex items-center justify-center size-4 shrink-0">
                    <div className="absolute inset-0 rounded-full bg-[#023dff]" />
                    <span className="relative text-[10px] font-bold text-white leading-none">{s.num}</span>
                  </div>
                  <div>
                    <p className="text-[14px] font-semibold text-[#020617] leading-5">{s.title}</p>
                    <p className="text-[12px] font-medium text-[#64748b] leading-4 mt-0.5">{s.desc}</p>
                  </div>
                </div>
                <div className="shrink-0 size-16 flex items-center justify-center">
                  <img src={s.img} alt="" className="size-16 object-contain" />
                </div>
              </div>
            ))}
          </div>

          {/* Dot pagination */}
          <div className="flex items-center justify-center gap-1.5 mt-3">
            {howToSteps.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  carouselRef.current?.scrollTo({ left: i * (carouselRef.current.clientWidth), behavior: 'smooth' })
                }}
                className="rounded-full transition-all"
                style={{
                  width: i === step ? 20 : 8,
                  height: 8,
                  background: i === step ? '#023dff' : '#cbd5e1',
                }}
              />
            ))}
          </div>
        </div>
        </div>
      </div>

      {/* Bottom Navbar */}
      <div data-component="Bottom Navigation Bar" className="bg-white flex items-center justify-between px-4 pt-4 pb-8 shrink-0">
        <button onClick={() => {}} className="flex flex-col items-center gap-1 w-20">
          <div className="size-6 overflow-hidden">
            <img alt="" className="size-full object-contain" src={imgHomeVec} />
          </div>
          <span className="text-[12px] font-bold text-[#023dff]">Beranda</span>
        </button>

        <button onClick={() => navigate('/guest/login')} className="flex flex-col items-center gap-1 w-20">
          <div className="size-6 overflow-hidden">
            <img alt="" className="size-full object-contain" src={imgNavPinjaman} />
          </div>
          <span className="text-[12px] font-bold text-slate-500">Pinjaman</span>
        </button>

        <button onClick={() => navigate('/poin-pandai/unverified?guest=true')} className="flex flex-col items-center gap-1 w-20">
          <div className="size-6 overflow-hidden">
            <img alt="" className="size-full object-contain" src={imgPoinOutline} />
          </div>
          <span className="text-[12px] font-bold text-slate-500">Poin Pandai</span>
        </button>

        <button onClick={() => navigate('/guest/login')} className="flex flex-col items-center gap-1 w-20">
          <div className="size-6 overflow-hidden">
            <img alt="" className="size-full object-contain" src={imgSmileIcon} />
          </div>
          <span className="text-[12px] font-bold text-slate-500">Akun</span>
        </button>
      </div>

      {/* Bottom sheet: Detail Misi */}
      {showMisiSheet && (
        <div
          className="absolute inset-0 z-50 flex flex-col justify-end"
          style={{ background: 'rgba(15,17,41,0.7)' }}
          onClick={() => setShowMisiSheet(false)}
        >
          <div
            className="bg-white rounded-tl-[12px] rounded-tr-[12px] flex flex-col overflow-hidden"
            style={{ maxHeight: '85%' }}
            onClick={e => e.stopPropagation()}
          >
            {/* Scrollable body */}
            <div className="overflow-y-auto hide-scrollbar px-4 pt-4 pb-[80px] flex flex-col gap-4">

              {/* Header: icon + title */}
              <div className="flex items-center gap-2">
                <div className="size-10 rounded-[12px] border border-[#e1e6ef] overflow-hidden shrink-0">
                  <img alt="" className="size-full object-cover" src={imgMissionCard} />
                </div>
                <p className="flex-1 text-[15px] font-medium text-[#001533] leading-5">Download &amp; Main Game</p>
              </div>

              {/* Reward card */}
              <div className="border border-[#e1e6ef] rounded-[8px] overflow-hidden">
                {/* Green reward banner */}
                <div className="bg-[#ebf9ee] p-3 flex gap-2 items-start">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0">
                    <rect width="24" height="24" rx="6" fill="#16a34a" fillOpacity="0.15"/>
                    <path d="M12 7v10M8 11l4-4 4 4" stroke="#16a34a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <div className="flex flex-col gap-1">
                    <p className="text-[12px] text-[#001533] leading-[18px]">
                      Dapat <span className="font-bold text-[#16a34a]">Rp50.000</span> per Game
                    </p>
                    <p className="text-[10px] text-[#5f6c85] leading-3">
                      Setara dengan <span className="font-bold">50.000</span> Poin Pandai
                    </p>
                  </div>
                </div>
                {/* Stats row */}
                <div className="flex items-center border-t border-[#e1e6ef] px-3 py-2">
                  <div className="flex items-center gap-1.5 flex-1">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0">
                      <circle cx="12" cy="12" r="9" stroke="#5f6c85" strokeWidth="1.5"/>
                      <path d="M12 7v5l3 3" stroke="#5f6c85" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    <div className="flex flex-col">
                      <span className="text-[12px] font-medium text-[#001533] leading-[18px]">10 menit</span>
                      <span className="text-[10px] text-[#5f6c85] leading-3">Pengerjaan</span>
                    </div>
                  </div>
                  <div className="w-px h-[34px] bg-[#e1e6ef] shrink-0" />
                  <div className="flex items-center gap-1.5 flex-1 justify-end">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0">
                      <path d="M20 8A8 8 0 1 0 20 16" stroke="#5f6c85" strokeWidth="1.5" strokeLinecap="round"/>
                      <path d="M20 4v4h-4" stroke="#5f6c85" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <div className="flex flex-col">
                      <span className="text-[12px] font-medium text-[#001533] leading-[18px]">Maks. 1x</span>
                      <span className="text-[10px] text-[#5f6c85] leading-3">Ambil misi</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Persyaratan */}
              <div className="bg-[#f8f9fc] border border-[#e1e6ef] rounded-[8px] px-4 py-3 flex flex-col gap-2">
                <p className="text-[13px] font-bold text-[#001533] leading-5">Persyaratan</p>
                <div className="text-[12px] text-[#001533] leading-[18px] flex flex-col gap-0">
                  <p className="underline decoration-solid">Khusus pengguna aplikasi Pintarnya.</p>
                  <p className="font-bold">Matikan VPN, Custom DNS, Adblock, Proxy, atau sejenisnya termasuk 1.1.1.1/WARP sebelum klik Ambil Misi.</p>
                  <p>Penggunaan tools tersebut menyebabkan pemblokiran akun Pintarnya.</p>
                </div>
                <button className="self-start">
                  <span className="text-[12px] font-bold text-[#2a83fd]">Lihat syarat &amp; ketentuan lainnya</span>
                </button>
              </div>

              {/* Langkah Kerja */}
              <div className="bg-[#f8f9fc] border border-[#e1e6ef] rounded-[8px] px-4 py-3 flex flex-col gap-2">
                <p className="text-[13px] font-bold text-[#001533] leading-5">Langkah Kerja</p>
                <ol className="list-decimal pl-[18px] flex flex-col gap-1">
                  <li className="text-[12px] text-[#001533] leading-[18px]">
                    Klik Ambil Misi dan mainkan game nya~
                  </li>
                  <li className="text-[12px] text-[#001533] leading-[18px]">
                    Reward masuk ke wallet <span className="font-bold">1x24 jam</span>
                  </li>
                </ol>
              </div>
            </div>

            {/* Sticky CTA */}
            <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-[#e1e6ef] p-4">
              <button
                className="w-full h-12 bg-[#ff8138] rounded-[12px] flex items-center justify-center"
                onClick={() => { setShowMisiSheet(false); navigate('/cuan-pandai?guest=true') }}
              >
                <span className="text-[15px] font-bold text-white">Ambil Misi</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom sheet: Pilih Barang */}
      {showItemSheet && (
        <div
          className="absolute inset-0 z-50"
          style={{ background: 'rgba(15,17,41,0.7)' }}
          onClick={() => setShowItemSheet(false)}
        >
          <div
            className="absolute bottom-0 left-0 right-0 bg-white rounded-tl-[8px] rounded-tr-[8px] pt-3 pb-4"
            style={{ boxShadow: '0px 10px 7.5px rgba(0,0,0,0.1), 0px 4px 3px rgba(0,0,0,0.1)' }}
            onClick={e => e.stopPropagation()}
          >
            {/* Handle */}
            <div className="flex justify-center mb-4">
              <div className="w-[100px] h-2 bg-[#e1e7ef] rounded-full" />
            </div>

            {/* Header */}
            <div className="flex items-center gap-2 px-4 mb-4">
              <p className="flex-1 text-[18px] font-semibold text-[#0f1729] leading-7">Pilih barang</p>
              <button onClick={() => setShowItemSheet(false)} className="shrink-0">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M12 4L4 12M4 4l8 8" stroke="#0f1729" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            {/* Item list */}
            <div className="px-2">
              {BARANG_ITEMS.map((item, i) => (
                <div key={item}>
                  <button
                    className="flex items-center w-full min-h-[40px] px-2 py-2 text-left"
                    onClick={() => {
                      setSelectedItem(item)
                      setShowItemSheet(false)
                      window.location.href = '/landing-page/simulasi-gadai.html?guest=true'
                    }}
                  >
                    <span className="text-[14px] text-[#0f1729] leading-5">{item}</span>
                  </button>
                  {i < BARANG_ITEMS.length - 1 && (
                    <div className="w-full h-px bg-[#e2e8f0]" />
                  )}
                </div>
              ))}
            </div>

            {/* Kembali button */}
            <div className="px-4 pt-6">
              <button
                onClick={() => setShowItemSheet(false)}
                className="w-full h-[38px] flex items-center justify-center border border-[#cbd5e1] rounded-[8px] bg-white"
              >
                <span className="text-[14px] font-semibold text-[#0f1729]">Kembali</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
