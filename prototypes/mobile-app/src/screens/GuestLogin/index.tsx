import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const imgDate = "/assets/status-date.svg"
const imgRight = "/assets/status-right.svg"
const imgLogo = "/assets/splash-screen-mascot.png"

export default function GuestLogin() {
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true))
  }, [])

  return (
    <div
      className="w-[375px] overflow-hidden rounded-3xl shadow-2xl relative"
      style={{
        height: 812,
        backgroundImage: "url('/assets/splash-bg.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transform: visible ? 'translateX(0)' : 'translateX(375px)',
        transition: 'transform 0.5s ease-in-out',
      }}
    >

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">

        {/* Status bar */}
        <div className="flex items-end justify-between h-[52px] px-[15px] pb-[9px] shrink-0">
          <img src={imgDate} alt="" className="h-[11px] w-[28px] shrink-0" />
          <img src={imgRight} alt="" className="h-[11px] w-[67px] shrink-0" />
        </div>

        {/* Top nav */}
        <div className="flex items-center justify-end h-[56px] px-4 shrink-0">
          <button className="flex items-center gap-1 h-7 px-[10px] rounded-full bg-white/70">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#023dff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3.5 10.5v-1a6.5 6.5 0 0 1 13 0v1"/>
              <rect x="2" y="10.5" width="2.5" height="4" rx="1.25"/>
              <rect x="15.5" y="10.5" width="2.5" height="4" rx="1.25"/>
              <path d="M18 14.5v.5a2 2 0 0 1-2 2h-2.5"/>
            </svg>
            <span className="text-[14px] text-[#023dff]">Butuh Bantuan?</span>
          </button>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col px-4 pt-2">

          {/* Logo */}
          <div className="flex justify-center mb-5">
            <img src={imgLogo} alt="Pandai Gadai" style={{ width: 124 }} />
          </div>

          {/* Headline */}
          <h1 className="text-[22px] font-bold text-[#0f1729] leading-[28px] text-center mb-8 px-2">
            Gadai Aman, Nyaman, Full Senyuman di Pandai Gadai
          </h1>

          {/* Form card */}
          <div className="bg-white rounded-xl shadow-lg px-3 py-4 flex flex-col gap-3">
            <input
              type="text"
              placeholder="Pandai ID/NIK"
              className="w-full border border-[#cbd5e1] rounded-[6px] px-3 py-3 text-[14px] text-[#64748b] outline-none bg-white"
            />
            <button
              onClick={() => navigate('/home')}
              className="w-full bg-[#023dff] rounded-[8px] py-3 text-[14px] font-semibold text-white"
            >
              Masuk dengan Pandai ID/NIK
            </button>
            <div className="flex items-start gap-2">
              <div className="shrink-0 mt-[3px] size-[14px] border border-[#65758b] rounded-[3px]" />
              <p className="text-[12px] font-medium text-[#65758b] leading-5">
                Saya menyetujui{' '}
                <span className="font-semibold text-[#023dff]">Syarat & Ketentuan</span>
                {' '}dari PT Solusi Gadai Pintar
              </p>
            </div>
          </div>

          {/* Ghost link */}
          <button
            onClick={() => navigate('/guest/home')}
            className="mt-6 text-center text-[14px] font-semibold text-[#0020e3] w-full"
          >
            Masuk tanpa akun
          </button>
        </div>

        {/* Home indicator */}
        <div className="flex justify-center py-2 mt-4 shrink-0">
          <div className="w-36 h-[5px] rounded-full bg-black" />
        </div>
      </div>
    </div>
  )
}
