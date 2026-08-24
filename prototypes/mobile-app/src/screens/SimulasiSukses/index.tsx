import { useNavigate, useLocation } from 'react-router-dom'

const imgDate  = "/assets/status-date.svg"
const imgRight = "/assets/status-right.svg"

export default function SimulasiSukses() {
  const navigate = useNavigate()
  const location = useLocation()
  const state = location.state as { item?: string; category?: string } | null
  const item = state?.item ?? ''
  const category = state?.category ?? ''
  const isMobil = category === 'BPKB Mobil'

  const vehicleIcon = (
    <div className="relative shrink-0 size-[24px]">
      <div className="absolute inset-0 bg-[#e5f2ff] rounded-full" />
      <div className="absolute inset-[3px] flex items-center justify-center">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="#023dff">
          {isMobil
            ? <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
            : <path d="M19 10.5c-.83-2.34-3.05-4-5.62-4H9l-2 4H5c-1.1 0-2 .9-2 2v3h2c0 1.66 1.34 3 3 3s3-1.34 3-3h4c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-3c0-1.1-.9-2-2-2h-2l-3-4H9l-2 4z"/>
          }
        </svg>
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
      <div className="bg-[#e5f2ff] flex flex-col gap-[16px] items-center overflow-y-auto hide-scrollbar flex-1 min-h-0 w-full px-[16px] py-[32px] relative pb-[136px]">

        {/* Decorative background */}
        <div className="absolute left-0 size-[375px] top-[16px] pointer-events-none">
          <img alt="" className="absolute block inset-0 max-w-none size-full object-cover" src="/assets/simulasi-bg.png" />
        </div>

        {/* Banner-promo container: h-[308px] */}
        <div className="h-[308px] relative shrink-0 w-[343px]">

          {/* Panda mascot */}
          <div className="absolute -translate-x-1/2 left-1/2 size-[143px] top-0 pointer-events-none z-10">
            <img alt="" className="absolute inset-0 max-w-none object-cover size-full" src="/assets/panda-pose8.png" />
          </div>

          {/* Card + banner group */}
          <div className="absolute -translate-x-1/2 flex flex-col items-start left-1/2 top-[132px]">

            {/* Price card — rounded top only */}
            <div className="bg-white border border-[#e1e7ef] flex flex-col gap-[8px] items-center justify-center px-[8px] py-[12px] rounded-tl-[12px] rounded-tr-[12px] shrink-0 w-[343px]">
              {vehicleIcon}
              <p className="font-normal leading-[24px] min-w-full text-[#0f1729] text-[16px] text-center w-min">{item}</p>
              <div className="flex flex-col items-start shrink-0 w-full">
                <p className="font-normal leading-[16px] text-[#65758b] text-[12px] text-center w-full">Nilai pinjaman maks.</p>
                <div className="flex items-center justify-center shrink-0 w-full">
                  <p className="font-bold leading-[32px] text-[#001cdb] text-[20px] text-center whitespace-nowrap">Rp2.950.000</p>
                </div>
              </div>
            </div>

            {/* Grey info banner — rounded bottom only */}
            <div className="bg-[#f8fafc] border-b border-l border-r border-[#e1e7ef] flex items-center justify-center gap-[6px] px-[12px] py-[8px] rounded-bl-[8px] rounded-br-[8px] shrink-0 w-full">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" stroke="#0f1729" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <p className="font-bold leading-[15px] text-[#0f1729] text-[12px] whitespace-nowrap">Tim kami akan segera menghubungi kamu!</p>
            </div>

          </div>
        </div>

        {/* Bottom card — full width */}
        <div className="bg-[rgba(255,255,255,0.7)] border border-[#e1e7ef] flex flex-col gap-[12px] items-center p-[16px] relative rounded-[12px] shrink-0 w-full">
          <div className="flex flex-col gap-[4px] items-start w-full">
            <p className="font-semibold leading-[22px] text-[#0f1729] text-[14px] w-full">Mau cair hari ini? Langsung ke cabang aja!</p>
            <p className="font-normal leading-[16px] text-[#65758b] text-[12px] w-full">
              {isMobil
                ? 'Tinggal bawa BPKB & KTP, petugas kami akan melayani kamu 😊'
                : 'Tinggal bawa BPKB & KTP, petugas kami akan melayani kamu 😊'}
            </p>
          </div>
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

      </div>

      {/* Sticky footer */}
      <div className="absolute bottom-0 flex flex-col items-start left-0 w-[375px]">
        <div className="bg-white flex flex-col gap-[12px] items-center justify-center overflow-clip pb-[24px] pt-[8px] px-[16px] shrink-0 w-full">
          <button
            onClick={() => window.open('https://maps.app.goo.gl/aXvs1R3j2mcr5iPb7', '_blank')}
            className="bg-[#023dff] flex gap-[4px] h-[44px] items-center justify-center px-[16px] py-[8px] rounded-[8px] shrink-0 w-full"
          >
            <p className="font-semibold leading-[22px] text-white text-[14px] whitespace-nowrap">Lihat Cabang</p>
          </button>
          <button className="bg-white border border-[#cbd5e1] flex gap-[4px] h-[44px] items-center justify-center px-[16px] py-[8px] rounded-[8px] shrink-0 w-full">
            <p className="font-semibold leading-[22px] text-[#0f1729] text-[14px] whitespace-nowrap">Simpan Ringkasan</p>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="#0f1729" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

    </div>
  )
}
