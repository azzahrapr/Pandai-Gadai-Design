import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { InspectLabel } from '../../components/Inspect/InspectLabel'

const imgDate    = "/assets/status-date.svg"
const imgRight   = "/assets/status-right.svg"

function IconCheckCircle() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0">
      <circle cx="12" cy="12" r="10" fill="#16a34a"/>
      <path d="M7 12l3.5 3.5L17 8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function IconCloseCircle() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0">
      <circle cx="12" cy="12" r="10" fill="#dc2626"/>
      <path d="M8 8l8 8M16 8l-8 8" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

function Separator() {
  return <div className="h-[1px] bg-[#e1e7ef] shrink-0 w-full" />
}

const SYARAT_DEFAULT = [
  'Kondisi fisik mulus, lecet ringan masih diterima',
  'Box dan charger tersedia',
  'IMEI terdaftar di Indonesia',
]

const SYARAT_BPKB = [
  'Tahun 2015—sekarang',
  'Plat B, F, atau T',
  'Ber-domisili di Jabodetabek & Karawang',
  'Pajak hidup (atau mati maks. 6 bulan)',
]

export default function SimulasiEstimasi() {
  const navigate = useNavigate()
  const location = useLocation()
  const state = location.state as { item?: string; category?: string; bpkbPlat?: string; bpkbPajak?: string; bpkbKota?: string; name?: string } | null
  const item = state?.item ?? ''
  const category = state?.category ?? 'Handphone'
  const bpkbPlat = state?.bpkbPlat ?? ''
  const bpkbPajak = state?.bpkbPajak ?? ''
  const bpkbKota = state?.bpkbKota ?? ''
  const name = state?.name ?? ''
  const isBPKB = category === 'BPKB Motor' || category === 'BPKB Mobil'

  // Per-criterion BPKB Instan eligibility
  const yearMatch = item.match(/\b(20\d{2})\b/)
  const vehicleYear = yearMatch ? parseInt(yearMatch[1]) : 0
  const eligYear     = vehicleYear >= 2015
  const eligPlat     = ['Plat B', 'Plat F', 'Plat T'].includes(bpkbPlat)
  const eligDomisili = bpkbKota !== '' && bpkbKota !== 'Lainnya'
  const eligPajak    = bpkbPajak === 'Pajak Hidup' || bpkbPajak === 'Pajak Mati Maks. 6 Bulan'
  const isEligible = !isBPKB || (eligYear && eligPlat && eligDomisili && eligPajak)

  const SYARAT_BPKB_CHECKS = [
    { text: 'Tahun 2015—sekarang', ok: eligYear },
    { text: 'Plat B, F, atau T', ok: eligPlat },
    { text: 'Ber-domisili di Jabodetabek & Karawang', ok: eligDomisili },
    { text: 'Pajak hidup (atau mati maks. 6 bulan)', ok: eligPajak },
  ]

  const [expanded, setExpanded] = useState(true)
  const [showPromoSheet, setShowPromoSheet] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const [selectedPromo, setSelectedPromo] = useState(0)
  const [promoApplied, setPromoApplied] = useState(false)
  const [promoLoading, setPromoLoading] = useState(false)

  const handlePakaiPromo = () => {
    setShowPromoSheet(false)
    setPromoLoading(true)
    setTimeout(() => {
      setPromoLoading(false)
      setPromoApplied(true)
    }, 1200)
  }

  const PROMOS = [
    { title: 'Extra Pinjaman 100rb', bullets: ['Minimum pinjaman Rp2.000.000', 'Hanya berlaku untuk gadai pertama'] },
    { title: 'Extra Pinjaman 50rb', bullets: ['Minimum pinjaman Rp1.000.000', 'Hanya berlaku untuk gadai pertama'] },
    { title: 'Extra Pinjaman 25rb', bullets: ['Minimum pinjaman Rp500.000', 'Hanya berlaku untuk gadai pertama'] },
    { title: 'Bunga 0%', bullets: ['Tebus dalam 7 hari', 'Maksimum pinjaman Rp2.5jt'] },
  ]

  const ChevronRight = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0">
      <path d="M9 18l6-6-6-6" stroke="#65758b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )

  const vehicleIcon = (
    <div className="relative shrink-0">
      <div className="size-[24px] rounded-full bg-[#e5f2ff]" />
      <div className="absolute inset-0 flex items-center justify-center">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="#023dff">
          {category === 'BPKB Mobil'
            ? <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
            : <path d="M19 10.5c-.83-2.34-3.05-4-5.62-4H9l-2 4H5c-1.1 0-2 .9-2 2v3h2c0 1.66 1.34 3 3 3s3-1.34 3-3h4c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-3c0-1.1-.9-2-2-2h-2l-3-4H9l-2 4z"/>
          }
        </svg>
      </div>
    </div>
  )

  const bpkbSurveiBlock = (title: string) => (
    <div className="flex flex-col gap-[8px] items-start w-full">
      <p className="font-semibold leading-[22px] text-[14px] text-black w-full">
        {title.split('BPKB Survei')[0]}
        <span className="text-[#001cdb]">BPKB Survei ✨</span>
      </p>
      <div className="flex gap-[8px] items-start w-full">
        <img src="/assets/mi.bpkb-acc.png" alt="" className="size-[48px] shrink-0 object-contain" />
        <div className="flex flex-1 flex-col gap-[4px] items-start min-w-px">
          <p className="font-normal leading-[18px] text-[12px] text-black w-full">
            Proses 1-3 hari kerja, pencairan lebih tinggi, tenor hingga 60 bulan, bisa dari seluruh Indonesia.
          </p>
          <button onClick={() => window.open('https://tally.so/r/OD4rLk', '_blank')} className="flex gap-[4px] items-center shrink-0">
            <p className="font-semibold leading-[22px] text-[#001cdb] text-[14px] whitespace-nowrap">Cek BPKB Survei</p>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0">
              <path d="M5 12h14" stroke="#001cdb" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M13 6l6 6-6 6" stroke="#001cdb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )

  const cabangCard = (
    <div className="bg-white flex flex-col gap-[12px] items-start p-[16px] shrink-0 w-full">
      <p className="font-semibold leading-[22px] text-[#0f1729] text-[14px] whitespace-nowrap">Yuk, datang ke Pandai Gadai!</p>
      <div onClick={() => navigate('/cabang')} className="bg-white border border-[#e1e7ef] flex gap-[4px] items-center px-[12px] py-[8px] rounded-[8px] shrink-0 w-full cursor-pointer">
        <div className="flex h-[58px] items-start shrink-0">
          <div className="flex items-center py-[4px] shrink-0">
            <img src="/assets/chips/icon/fi/outline/marker.png" alt="" className="size-[16px]" />
          </div>
        </div>
        <div className="flex flex-1 flex-row items-center self-stretch">
          <div className="flex flex-1 flex-col gap-[2px] h-full items-start justify-center min-w-px relative">
            <div className="flex gap-[4px] items-center shrink-0">
              <p className="font-semibold leading-[22px] text-[#020617] text-[14px] whitespace-nowrap">Pandai Gadai Bintaro</p>
              <div className="bg-[#f0fdf4] border border-[#16a34a] flex gap-[4px] items-center overflow-clip px-[8px] py-[2px] rounded-[9999px] shrink-0">
                <p className="font-bold leading-[12px] text-[#15803d] text-[10px] text-center whitespace-nowrap">Terdekat</p>
              </div>
            </div>
            <p className="font-normal leading-[0] overflow-hidden text-[12px] text-[#65758b] text-ellipsis whitespace-nowrap">
              <span className="font-bold leading-[16px]">2,5 km</span>
              <span className="leading-[16px]">{` dari lokasimu`}</span>
            </p>
            <p className="font-normal leading-[16px] overflow-hidden text-[12px] text-[#65758b] text-ellipsis whitespace-nowrap">
              Buka setiap hari (09:00 - 21:00)
            </p>
          </div>
        </div>
        <ChevronRight />
      </div>
    </div>
  )

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
            <InspectLabel label="Heading 5" tokens={['font: Geist Bold 20px / lh 32px', 'color: text/primary · #0f172a']}>
              <p className="font-bold leading-[32px] text-[#0f172a] text-[20px] whitespace-nowrap">Simulasi Gadai</p>
            </InspectLabel>
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

      {/* Main content */}
      <div className="flex flex-col gap-[8px] items-start overflow-y-auto hide-scrollbar flex-1 min-h-0 w-full pb-[136px]">

        {isBPKB ? (
          !isEligible ? (

            /* ── BPKB Not Eligible (Suzuki / fails criteria) ── */
            <>
              {/* Vehicle card + BPKB Survei upsell */}
              <div className="bg-white flex flex-col gap-[12px] items-start p-[16px] shrink-0 w-full">
                <div className="bg-white border border-[#e1e7ef] flex flex-col gap-[12px] items-center px-[8px] py-[12px] rounded-[12px] shrink-0 w-full">
                  {vehicleIcon}
                  <p className="font-normal leading-[24px] text-[#0f1729] text-[16px] text-center w-full">{item}</p>
                </div>
                {bpkbSurveiBlock('Barang dapat diproses dengan BPKB Survei ✨')}
              </div>

              {/* Syarat - not eligible */}
              <div className="bg-[#fef2f2] flex flex-col gap-[12px] items-start p-[16px] shrink-0 w-full">
                <p className="font-semibold leading-[22px] text-[#0f1729] text-[14px]">Kenapa tidak lolos BPKB Instan (Tanpa Survei)?</p>
                <div className="flex flex-col gap-[8px] w-full">
                  {SYARAT_BPKB_CHECKS.map(({ text, ok }) => (
                    <div key={text} className="flex flex-wrap gap-[4px] items-center w-full">
                      {ok ? <IconCheckCircle /> : <IconCloseCircle />}
                      <p className="font-normal leading-[20px] text-[14px] text-black">{text}</p>
                      {!ok && (
                        <div className="bg-[#fef2f2] border border-[#dc2626] flex gap-[4px] items-center overflow-clip px-[8px] py-[2px] rounded-[9999px] shrink-0">
                          <p className="font-bold leading-[12px] text-[#b91c1c] text-[10px] text-center whitespace-nowrap">Tidak terpenuhi</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {bpkbKota !== 'Lainnya' && cabangCard}
            </>

          ) : (

            /* ── BPKB Eligible ── */
            <>
              {/* Vehicle card with price */}
              <div className="bg-white flex flex-col items-start p-[16px] shrink-0 w-full">
                <div className="flex flex-col items-start w-full">
                  <div className="bg-white border border-[#e1e7ef] flex flex-col gap-[12px] items-center px-[8px] py-[12px] rounded-tl-[12px] rounded-tr-[12px] w-full">
                    {vehicleIcon}
                    <p className="font-normal leading-[24px] text-[#0f1729] text-[16px] text-center w-full">{item}</p>
                    <InspectLabel label="Loan estimate" tokens={['label: Caption · #65758b', 'value: Title 1 Bold · #001cdb (text/info)']} className="w-full">
                    <div className="flex flex-col items-center w-full">
                      <p className="font-normal leading-[16px] text-[#65758b] text-[12px] text-center w-full">Nilai pinjaman maks.</p>
                      <div className="flex gap-[4px] items-center justify-center">
                        <p className="font-bold leading-[32px] text-[#001cdb] text-[20px] text-center whitespace-nowrap">Rp2.950.000</p>
                        <button onClick={() => setShowTooltip(true)} className="shrink-0 size-[18px] flex items-center justify-center">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="#65758b">
                            <circle cx="12" cy="12" r="10"/>
                            <path d="M12 8v1M12 11v5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                    </InspectLabel>
                  </div>
                  <div className="bg-[#f8fafc] border-b border-l border-r border-[#e1e7ef] flex items-center justify-center px-[12px] py-[6px] rounded-bl-[8px] rounded-br-[8px] w-full">
                    <div className="flex gap-[6px] items-center">
                      <img src="/assets/base.payment-cash.png" alt="" className="size-[24px] shrink-0 object-contain" />
                      <p className="font-normal leading-[18px] text-[12px] text-[#0f1729] whitespace-nowrap">Tanpa survei &amp; BI checking, duit langsung cair!</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Syarat - eligible */}
              <div className="bg-[#f0fdf4] flex flex-col gap-[12px] items-start p-[16px] shrink-0 w-full">
                <p className="font-semibold leading-[22px] text-[#0f1729] text-[14px]">Syarat Gadai BPKB Instan (Tanpa Survei)</p>
                <div className="flex flex-col gap-[8px] w-full">
                  {SYARAT_BPKB.map(text => (
                    <div key={text} className="flex gap-[4px] items-center shrink-0 w-full">
                      <IconCheckCircle />
                      <p className="font-normal leading-[20px] text-[14px] text-black">{text}</p>
                    </div>
                  ))}
                </div>
                <p className="font-normal leading-[16px] text-[#65758b] text-[12px] w-full">
                  Nilai akhir tergantung pada hasil pengecekan kondisi barang oleh petugas kami di cabang.
                </p>
              </div>

              {/* BPKB Survei upsell */}
              <div className="bg-white flex flex-col gap-[8px] items-start p-[16px] shrink-0 w-full">
                {bpkbSurveiBlock('Butuh pinjaman lebih besar? Pilih BPKB Survei ✨')}
              </div>

              {cabangCard}
            </>
          )

        ) : (

          /* ── Non-BPKB (Electronics / Gold) ── */
          <>
            {/* Price section */}
            <div className="bg-white flex flex-col gap-[16px] items-start p-[16px] shrink-0 w-full">
              <div className="bg-white border border-[#e1e7ef] flex flex-col gap-[8px] items-start px-[8px] py-[12px] rounded-[12px] shrink-0 w-full">
                <div className="flex flex-col gap-[8px] items-center justify-center shrink-0 w-full">
                  <div className="bg-[#e5f2ff] rounded-full flex items-center justify-center size-[24px] shrink-0">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="#023dff">
                      <rect x="5" y="2" width="14" height="20" rx="2" fill="#023dff"/>
                      <rect x="9" y="18" width="6" height="2" rx="1" fill="white"/>
                    </svg>
                  </div>
                  <p className="font-normal leading-[24px] min-w-full text-[#0f1729] text-[16px] text-center w-min">{item}</p>
                  <InspectLabel label="Loan estimate" tokens={['label: Caption · #65758b', 'value: Heading 4 Bold · #001cdb (text/info)']} className="w-full">
                  <div className="flex flex-col items-start shrink-0 w-full">
                    <p className="font-normal leading-[16px] text-[#65758b] text-[12px] text-center w-full">Nilai pinjaman maks.</p>
                    <div className="flex gap-[2px] items-center justify-center shrink-0 w-full">
                      <p className="font-bold leading-[32px] text-[#001cdb] text-[20px] text-center whitespace-nowrap">{promoApplied ? 'Rp8.900.000' : 'Rp8.800.000'}</p>
                      <button onClick={() => setExpanded(e => !e)} className="shrink-0 size-[18px] flex items-center justify-center">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="transition-transform duration-200" style={{ transform: expanded ? 'rotate(0deg)' : 'rotate(180deg)' }}>
                          <path d="M18 15l-6-6-6 6" stroke="#001cdb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                  </InspectLabel>
                </div>
                {expanded && (
                  <div className="bg-[#f8fafc] flex flex-col gap-[4px] items-start overflow-clip rounded-[8px] shrink-0 w-full">
                    <div className="flex font-normal items-center justify-between leading-[20px] px-[8px] py-[4px] shrink-0 text-[14px] w-full whitespace-nowrap">
                      <p className="relative shrink-0 text-[#65758b]">Nilai Barang</p>
                      <p className="relative shrink-0 text-[#0f1729]">Rp8.800.000</p>
                    </div>
                    {promoApplied && (
                      <>
                        <Separator />
                        <div className="flex font-normal items-start justify-between leading-[20px] px-[8px] py-[4px] shrink-0 text-[14px] w-full whitespace-nowrap">
                          <p className="relative shrink-0 text-[#65758b]">Promo</p>
                          <p className="relative shrink-0 text-[#15803d]">+Rp100.000</p>
                        </div>
                      </>
                    )}
                    <Separator />
                    <div className="flex font-semibold items-center justify-between leading-[22px] px-[8px] py-[4px] rounded-[4px] shrink-0 text-[#0f1729] text-[14px] w-full whitespace-nowrap">
                      <p className="relative shrink-0">Nilai Pinjaman</p>
                      <p className="relative shrink-0">{promoApplied ? 'Rp8.900.000' : 'Rp8.800.000'}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Promo banner */}
              {promoApplied ? (
                <button
                  onClick={() => setShowPromoSheet(true)}
                  className="bg-gradient-to-b from-[#9333ea] to-[#6b21a8] border border-[#e1e7ef] flex items-center justify-between px-[12px] py-[8px] rounded-[8px] shrink-0 w-full"
                >
                  <div className="flex flex-col items-start gap-[2px]">
                    <div className="flex gap-[4px] items-center">
                      <img src="/assets/discount.png" alt="" className="shrink-0 size-[14px] object-contain brightness-0 invert" />
                      <p className="font-semibold leading-[22px] text-white text-[14px] whitespace-nowrap">{PROMOS[selectedPromo].title}</p>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="shrink-0">
                        <path d="M9 18l6-6-6-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <p className="font-normal leading-[18px] text-[12px] text-white">Khusus gadai pertama, min. pinjaman Rp2jt</p>
                  </div>
                  <img src="/assets/promo-applied.png" alt="" className="shrink-0 h-[34px] object-contain" />
                </button>
              ) : (
                <div className="bg-[#f8fafc] border border-[#e1e7ef] flex items-center gap-[8px] px-[12px] py-[8px] rounded-[8px] shrink-0 w-full">
                  <button onClick={() => setShowPromoSheet(true)} className="flex flex-col items-start gap-[2px] flex-1 min-w-px text-left">
                    <div className="flex gap-[4px] items-center">
                      <img src="/assets/discount.png" alt="" className="shrink-0 size-[14px] object-contain" />
                      <p className="font-semibold leading-[22px] text-[#001cdb] text-[14px] whitespace-nowrap">{PROMOS[selectedPromo].title}</p>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0">
                        <path d="M9 18l6-6-6-6" stroke="#023dff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <p className="font-normal leading-[18px] text-[12px] text-[#0f1729]">Khusus gadai pertama, min. pinjaman Rp2jt</p>
                  </button>
                  <button
                    onClick={handlePakaiPromo}
                    disabled={promoLoading}
                    className="bg-[#023dff] flex items-center justify-center h-[30px] px-[8px] rounded-[8px] shrink-0"
                  >
                    {promoLoading ? (
                      <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" strokeOpacity="0.3"/>
                        <path d="M12 2a10 10 0 0 1 10 10" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    ) : (
                      <p className="font-semibold leading-[22px] text-white text-[14px] whitespace-nowrap">Pakai</p>
                    )}
                  </button>
                </div>
              )}
            </div>

            {/* Syarat Barang */}
            <div className="bg-[#f0fdf4] flex flex-col gap-[12px] items-start p-[16px] shrink-0 w-full">
              <p className="font-semibold leading-[22px] text-[#0f1729] text-[14px] whitespace-nowrap">Syarat Barang</p>
              {SYARAT_DEFAULT.map((text, i) => (
                <div key={i} className="flex gap-[4px] items-center shrink-0 w-full">
                  <IconCheckCircle />
                  <p className="font-normal leading-[20px] text-[14px] text-black">{text}</p>
                </div>
              ))}
              <p className="font-normal leading-[16px] text-[#65758b] text-[12px] w-full">
                Nilai akhir tergantung pada hasil pengecekan kondisi barang oleh petugas kami di cabang.
              </p>
            </div>

            {cabangCard}
          </>
        )}

      </div>

      {/* Sticky footer */}
      <div className="absolute bottom-0 flex flex-col items-start left-0 w-[375px]">
        <div className="bg-white border-t border-[#e1e7ef] flex flex-col gap-[12px] items-center justify-center overflow-clip pb-[24px] pt-[16px] px-[16px] shrink-0 w-full">
          {isBPKB ? (
            !isEligible ? (
              <>
                <button
                  onClick={() => window.open('https://tally.so/r/OD4rLk', '_blank')}
                  className="bg-[#023dff] flex gap-[4px] h-[44px] items-center justify-center px-[16px] py-[8px] rounded-[8px] shrink-0 w-full"
                >
                  <p className="font-semibold leading-[22px] text-white text-[14px] whitespace-nowrap">Cek BPKB Survei</p>
                </button>
                <button
                  onClick={() => navigate('/simulasi', { state: { category, openCategorySheet: true } })}
                  className="bg-white border border-[#cbd5e1] flex gap-[4px] h-[44px] items-center justify-center px-[16px] py-[8px] rounded-[8px] shrink-0 w-full"
                >
                  <p className="font-semibold leading-[22px] text-[#0f1729] text-[14px] whitespace-nowrap">Lihat Barang Lain</p>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate('/simulasi/sukses', { state: { item, category } })}
                  className="bg-[#023dff] flex gap-[4px] h-[44px] items-center justify-center px-[16px] py-[8px] rounded-[8px] shrink-0 w-full"
                >
                  <p className="font-semibold leading-[22px] text-white text-[14px] whitespace-nowrap">Saya Tertarik</p>
                </button>
                <button
                  onClick={() => window.open('https://maps.app.goo.gl/aXvs1R3j2mcr5iPb7', '_blank')}
                  className="bg-white border border-[#cbd5e1] flex gap-[4px] h-[44px] items-center justify-center px-[16px] py-[8px] rounded-[8px] shrink-0 w-full"
                >
                  <p className="font-semibold leading-[22px] text-[#0f1729] text-[14px] whitespace-nowrap">Lihat Cabang</p>
                </button>
              </>
            )
          ) : (
            <>
              <button
                onClick={() => navigate('/simulasi/promo-sukses', { state: { item, category, name, promoApplied } })}
                className="bg-[#023dff] flex gap-[4px] h-[44px] items-center justify-center px-[16px] py-[8px] rounded-[8px] shrink-0 w-full"
              >
                <p className="font-semibold leading-[22px] text-white text-[14px] whitespace-nowrap">Saya Tertarik</p>
              </button>
              <button
                onClick={() => navigate('/simulasi', { state: { category, openCategorySheet: true } })}
                className="bg-white border border-[#cbd5e1] flex gap-[4px] h-[44px] items-center justify-center px-[16px] py-[8px] rounded-[8px] shrink-0 w-full"
              >
                <p className="font-semibold leading-[22px] text-[#0f1729] text-[14px] whitespace-nowrap">Lihat Barang Lain</p>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Estimasi nilai pinjaman tooltip */}
      {showTooltip && (
        <div className="absolute inset-0 bg-[rgba(15,17,41,0.7)] z-10 flex items-end" onClick={() => setShowTooltip(false)}>
          <div
            className="bg-white drop-shadow-[0px_10px_7.5px_rgba(0,0,0,0.1),0px_4px_3px_rgba(0,0,0,0.1)] flex flex-col rounded-tl-[8px] rounded-tr-[8px] w-[375px]"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex flex-col gap-[16px] items-start px-[16px] pb-[12px] pt-[12px] shrink-0">
              <div className="flex items-center justify-center w-full">
                <div className="bg-[#e1e7ef] h-[8px] rounded-[9999px] w-[100px]" />
              </div>
              <div className="flex gap-[8px] items-center w-full">
                <p className="flex-1 font-semibold leading-[28px] text-[#0f1729] text-[18px]">Estimasi Nilai Pinjaman</p>
                <button onClick={() => setShowTooltip(false)} className="overflow-clip relative shrink-0 size-[16px]">
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 24 24" fill="none">
                    <path d="M18 6L6 18M6 6l12 12" stroke="#0f1729" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
            </div>
            <div className="px-[16px] pb-[16px] shrink-0">
              <p className="font-normal leading-[20px] text-[#65758b] text-[14px]">
                Estimasi yang ditampilkan adalah maksimum pinjaman. Nilai pinjaman bisa lebih rendah tergantung kondisi barang, seperti status kepemilikan dan status e-tilang.
              </p>
            </div>
            <div className="flex flex-col items-start px-[16px] pb-[24px] pt-[8px] shrink-0">
              <button onClick={() => setShowTooltip(false)} className="bg-[#023dff] flex gap-[4px] h-[38px] items-center justify-center px-[16px] py-[8px] rounded-[8px] w-full">
                <p className="font-semibold leading-[22px] text-white text-[14px] whitespace-nowrap">OK, mengerti</p>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Promo Tersedia bottom sheet */}
      {showPromoSheet && (
        <div className="absolute inset-0 bg-[rgba(15,17,41,0.7)] z-10 flex items-end" onClick={() => setShowPromoSheet(false)}>
          <div
            className="bg-white drop-shadow-[0px_10px_7.5px_rgba(0,0,0,0.1),0px_4px_3px_rgba(0,0,0,0.1)] flex flex-col items-center pb-[16px] pt-[12px] rounded-tl-[8px] rounded-tr-[8px] w-[375px]"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex flex-col gap-[24px] items-center w-full">
              <div className="flex flex-col gap-[16px] items-center w-full">
                {/* Header */}
                <div className="flex flex-col gap-[16px] items-center px-[16px] w-full">
                  <div className="flex flex-col items-center w-full">
                    <div className="bg-[#e1e7ef] h-[8px] rounded-[9999px] w-[100px]" />
                  </div>
                  <div className="flex gap-[8px] items-center w-full">
                    <p className="flex-1 font-semibold leading-[28px] min-w-px text-[#0f1729] text-[18px]">Promo Tersedia</p>
                    <button onClick={() => setShowPromoSheet(false)} className="overflow-clip relative shrink-0 size-[16px]">
                      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 24 24" fill="none">
                        <path d="M18 6L6 18M6 6l12 12" stroke="#0f1729" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </button>
                  </div>
                </div>
                {/* Promo list — card per item */}
                <div className="flex flex-col gap-[12px] items-start px-[16px] w-full">
                  {PROMOS.map((promo, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedPromo(i)}
                      className="bg-[#f8fafc] border border-[#e1e7ef] flex gap-[8px] items-start px-[12px] py-[12px] rounded-[8px] w-full text-left"
                    >
                      <div className="flex flex-1 flex-col gap-[4px] items-start min-w-px">
                        <div className="flex gap-[6px] items-center w-full">
                          <img src="/assets/discount.png" alt="" className="shrink-0 size-[16px] object-contain" />
                          <p className="font-semibold leading-[22px] shrink-0 text-[#001cdb] text-[14px] whitespace-nowrap">{promo.title}</p>
                        </div>
                        <div className="font-normal text-[12px] text-[#65758b] w-full">
                          <p className="leading-[18px]">Syarat & Ketentuan:</p>
                          <ul className="list-disc">
                            {promo.bullets.map((b, j) => (
                              <li key={j} className="ms-[18px] leading-[18px]">{b}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="shrink-0 mt-[3px]">
                        {selectedPromo === i ? (
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <circle cx="8" cy="8" r="7.5" stroke="#023dff" strokeWidth="1"/>
                            <circle cx="8" cy="8" r="5" fill="#023dff"/>
                          </svg>
                        ) : (
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <circle cx="8" cy="8" r="7.5" stroke="#cbd5e1" strokeWidth="1"/>
                          </svg>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              <div className="px-[16px] pb-[8px] w-full">
                <button
                  onClick={handlePakaiPromo}
                  className="bg-[#023dff] flex gap-[4px] h-[44px] items-center justify-center px-[16px] py-[8px] rounded-[8px] shrink-0 w-full"
                >
                  <p className="font-semibold leading-[22px] text-white text-[14px] whitespace-nowrap">Pakai Promo</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
