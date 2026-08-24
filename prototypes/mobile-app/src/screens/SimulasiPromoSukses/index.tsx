import { useNavigate, useLocation } from 'react-router-dom'

const imgDate  = "/assets/status-date.svg"
const imgRight = "/assets/status-right.svg"

function Separator() {
  return <div className="h-[1px] bg-[#e1e7ef] shrink-0 w-full" />
}

function BadgeCheck() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0">
      <circle cx="12" cy="12" r="10" fill="#16a34a"/>
      <path d="M7 12l3.5 3.5L17 8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export default function SimulasiPromoSukses() {
  const navigate = useNavigate()
  const location = useLocation()
  const state = location.state as { item?: string; category?: string; name?: string; promoApplied?: boolean } | null
  const item = state?.item ?? ''
  const name = state?.name ?? ''
  const promoApplied = state?.promoApplied ?? false

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
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#001cdb" className="shrink-0">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>
            </svg>
            <p className="font-normal leading-[16px] text-[#001cdb] text-[12px] text-center whitespace-nowrap">Panduan</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="bg-[#e5f2ff] flex flex-col gap-[16px] items-center overflow-y-auto hide-scrollbar flex-1 min-h-0 w-full py-[48px] relative pb-[136px]">

        {/* Decorative background — 375×375 at top-[16px] */}
        <div className="absolute left-0 size-[375px] top-[16px] pointer-events-none">
          <img alt="" className="absolute block inset-0 max-w-none size-full object-cover" src="/assets/simulasi-bg.png" />
        </div>

        {/* Banner-promo container: panda overlaps top of card, height auto */}
        <div className="relative shrink-0 w-[343px]">

          {/* Panda mascot — absolute, centered at top-0, above the card */}
          <div className="absolute -translate-x-1/2 left-1/2 size-[143px] top-0 pointer-events-none z-10">
            <img alt="" className="absolute inset-0 max-w-none object-cover size-full" src="/assets/panda-pose8.png" />
          </div>

          {/* Price card — pushed down by mt-[132px] so panda sits on top */}
          <div className="mt-[132px] bg-white border border-[#e1e7ef] flex flex-col gap-[8px] items-start px-[8px] py-[12px] rounded-[12px] w-full">

            {/* Icon + name + price */}
            <div className="flex flex-col gap-[8px] items-center justify-center shrink-0 w-full">
              {/* Stacked phone icon */}
              <div className="relative shrink-0 size-[24px]">
                <div className="absolute inset-0 bg-[#e5f2ff] rounded-full" />
                <div className="absolute inset-[3px] flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#023dff">
                    <rect x="5" y="2" width="14" height="20" rx="2"/>
                    <rect x="9" y="18" width="6" height="2" rx="1" fill="white"/>
                  </svg>
                </div>
              </div>

              <p className="font-normal leading-[24px] min-w-full text-[#0f1729] text-[16px] text-center w-min">{item}</p>

              {/* Price */}
              <div className="flex flex-col items-start shrink-0 w-full">
                <p className="font-normal leading-[16px] text-[#65758b] text-[12px] text-center w-full">Nilai pinjaman maks.</p>
                <div className="flex gap-[2px] items-center justify-center shrink-0 w-full">
                  <p className="font-bold leading-[32px] text-[#001cdb] text-[20px] text-center whitespace-nowrap">
                    {promoApplied ? 'Rp8.900.000' : 'Rp8.800.000'}
                  </p>
                  {promoApplied && (
                    <div className="shrink-0 size-[18px] flex items-center justify-center">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M18 15l-6-6-6 6" stroke="#001cdb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Price breakdown — only shown when promo applied */}
            {promoApplied && (
              <div className="bg-[#f8fafc] flex flex-col items-start overflow-clip rounded-[8px] shrink-0 w-full">
                <div className="flex font-normal items-center justify-between leading-[20px] p-[8px] shrink-0 text-[14px] w-full whitespace-nowrap">
                  <p className="text-[#65758b]">Nilai Barang</p>
                  <p className="text-[#0f1729]">Rp8.800.000</p>
                </div>
                <Separator />
                <div className="flex font-normal items-center justify-between leading-[20px] p-[8px] shrink-0 text-[14px] w-full whitespace-nowrap">
                  <p className="text-[#65758b]">Promo</p>
                  <p className="text-[#15803d]">+Rp100.000</p>
                </div>
                <Separator />
                <div className="flex font-semibold items-center justify-between leading-[22px] p-[8px] shrink-0 text-[#0f1729] text-[14px] w-full whitespace-nowrap">
                  <p>Nilai Pinjaman</p>
                  <p>Rp8.900.000</p>
                </div>
              </div>
            )}

            {/* Purple promo banner inside card */}
            {promoApplied && (
              <div className="bg-gradient-to-b from-[#a855f7] to-[#6b21a8] border border-[#e1e7ef] flex gap-[4px] items-center px-[12px] py-[8px] rounded-[8px] shrink-0 w-full">
                <div className="flex flex-1 flex-col items-start min-w-px">
                  <div className="flex gap-[4px] items-center w-full">
                    <img src="/assets/discount.png" alt="" className="shrink-0 size-[14px] object-contain brightness-0 invert" />
                    <p className="font-semibold leading-[22px] text-white text-[14px] whitespace-nowrap">Extra Pinjaman 100rb</p>
                  </div>
                  <p className="font-normal leading-[18px] text-white text-[12px] w-full">Kode promo: EXTRA100</p>
                </div>
                <img src="/assets/promo-applied.png" alt="" className="shrink-0 h-[34px] object-contain" />
              </div>
            )}
          </div>

        </div>

        {/* Bottom card — branches by promoApplied */}
        {promoApplied ? (
          /* Selamat + promo details */
          <div className="bg-white border border-[#e1e7ef] flex flex-col gap-[12px] items-start p-[16px] relative rounded-[12px] shrink-0 w-[343px]">
            <div className="flex flex-col gap-[4px] items-start w-full text-[#0f1729]">
              <p className="font-semibold leading-[28px] text-[18px] w-full">
                {name ? `Selamat, ${name}!` : 'Selamat!'}
              </p>
              <p className="font-semibold leading-[22px] text-[14px] w-full">Kamu dapat promo Extra Pinjaman 100rb 🎉</p>
            </div>
            <div className="flex gap-[4px] items-center shrink-0 w-full">
              <BadgeCheck />
              <p className="font-normal leading-[20px] text-[14px] text-black whitespace-nowrap">Bonus pencairan Rp100.000</p>
            </div>
            <div className="flex gap-[4px] items-center shrink-0 w-full">
              <BadgeCheck />
              <p className="font-normal leading-[20px] text-[14px] text-black whitespace-nowrap">Berlaku 14 hari ke depan</p>
            </div>
            <div className="flex gap-[4px] items-center shrink-0 w-full">
              <BadgeCheck />
              <p className="font-normal leading-[20px] text-[14px] text-black whitespace-nowrap">Tunjukkan saat transaksi di cabang</p>
            </div>
          </div>
        ) : (
          /* Satu langkah lagi + branch card */
          <div className="bg-[rgba(255,255,255,0.6)] border border-[#e1e7ef] flex flex-col gap-[12px] items-start p-[16px] relative rounded-[12px] shrink-0 w-[343px]">
            <div className="flex flex-col items-start w-full">
              <p className="font-semibold leading-[28px] text-[#0f1729] text-[18px] w-full">
                Satu langkah lagi, {name}!
              </p>
            </div>
            <p className="font-normal leading-[16px] text-[#65758b] text-[12px] w-full">
              Datang ke cabang terdekat dengan bawa barang dan KTP kamu. Petugas kami siap melayani 😊
            </p>
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
                    <span className="leading-[16px]"> dari lokasimu</span>
                  </p>
                  <p className="font-normal leading-[16px] overflow-hidden text-[12px] text-[#65758b] text-ellipsis whitespace-nowrap">
                    Buka setiap hari (09:00 - 21:00)
                  </p>
                </div>
              </div>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0">
                <path d="M9 18l6-6-6-6" stroke="#65758b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        )}

      </div>

      {/* Sticky footer */}
      <div className="absolute bottom-0 flex flex-col items-start left-0 w-[375px]">
        <div className="bg-white flex flex-col gap-[12px] items-center justify-center overflow-clip pb-[24px] pt-[8px] px-[16px] shrink-0 w-full">
          <button
            onClick={() => window.open('https://wa.me/6281234567890', '_blank')}
            className="bg-[#023dff] flex gap-[4px] h-[44px] items-center justify-center px-[16px] py-[8px] rounded-[8px] shrink-0 w-full"
          >
            <p className="font-semibold leading-[22px] text-white text-[14px] whitespace-nowrap">Ajukan Gadai</p>
          </button>
          {promoApplied ? (
            <button className="bg-white border border-[#cbd5e1] flex gap-[4px] h-[44px] items-center justify-center px-[16px] py-[8px] rounded-[8px] shrink-0 w-full">
              <p className="font-semibold leading-[22px] text-[#0f1729] text-[14px] whitespace-nowrap">Simpan Ringkasan</p>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="#0f1729" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          ) : (
            <button className="bg-white border border-[#cbd5e1] flex gap-[4px] h-[44px] items-center justify-center px-[16px] py-[8px] rounded-[8px] shrink-0 w-full">
              <p className="font-semibold leading-[22px] text-[#0f1729] text-[14px] whitespace-nowrap">Simpan Ringkasan</p>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="#0f1729" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}
        </div>
      </div>

    </div>
  )
}
