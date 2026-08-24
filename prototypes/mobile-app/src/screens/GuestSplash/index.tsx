import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const imgDate  = "/assets/status-date.svg"
const imgRight = "/assets/status-right.svg"
const imgLogo  = "/assets/splash-screen-mascot.png"
const imgOJK   = "/assets/ojk-badge.png"

export default function GuestSplash({ startAtLogin = false }: { startAtLogin?: boolean }) {
  const navigate = useNavigate()
  const [showLogin, setShowLogin] = useState(startAtLogin)
  const [nik, setNik] = useState('')
  const [tncChecked, setTncChecked] = useState(false)

  useEffect(() => {
    if (startAtLogin) return
    const timer = setTimeout(() => setShowLogin(true), 2000)
    return () => clearTimeout(timer)
  }, [startAtLogin])

  return (
    <div
      className="w-[375px] overflow-hidden rounded-3xl shadow-2xl relative"
      style={{
        height: 812,
        backgroundColor: 'rgba(70,150,248,0.3)',
        backgroundImage: "url('/assets/glass-bg-login.svg')",
        backgroundSize: '774px 857px',
        backgroundPosition: '-212px -135px',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Status bar — always visible */}
      <div className="relative z-10 flex items-end justify-between h-[52px] px-[15px] pb-[9px]">
        <img src={imgDate} alt="" className="h-[11px] w-[28px] shrink-0" />
        <img src={imgRight} alt="" className="h-[11px] w-[67px] shrink-0" />
      </div>

      {/* Panda — zooms out */}
      <div
        className="absolute z-10 inset-0 flex items-center justify-center pointer-events-none"
        style={{
          opacity: showLogin ? 0 : 1,
          transform: showLogin ? 'scale(0.6)' : 'scale(1)',
          transition: 'opacity 0.35s ease-in, transform 0.35s ease-in',
        }}
      >
        <img src={imgLogo} alt="Pandai Gadai" style={{ width: 220 }} />
      </div>

      {/* OJK badge — fades out with panda */}
      <div
        className="absolute z-10 bottom-10 left-0 right-0 flex items-center gap-3 px-5"
        style={{
          opacity: showLogin ? 0 : 1,
          transition: 'opacity 0.3s ease-in',
        }}
      >
        <img src={imgOJK} alt="OJK" className="h-11 shrink-0" />
        <p className="text-[12px] text-[#1e3a5f] leading-4">
          Pandai Gadai telah berizin dan diawasi langsung oleh Otoritas Jasa Keuangan
        </p>
      </div>

      {/* Login content — fades + rises in */}
      <div
        className="absolute z-10 inset-0 flex flex-col px-4 pt-[52px]"
        style={{
          opacity: showLogin ? 1 : 0,
          transform: showLogin ? 'translateY(0)' : 'translateY(16px)',
          transition: 'opacity 0.4s ease-out 0.2s, transform 0.4s ease-out 0.2s',
          pointerEvents: showLogin ? 'auto' : 'none',
        }}
      >
        {/* Butuh Bantuan */}
        <div className="flex items-center justify-end h-[56px] shrink-0">
          <button data-component="Help Button" className="flex items-center gap-1 h-7 px-[10px] rounded-full bg-white/70">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#023dff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3.5 10.5v-1a6.5 6.5 0 0 1 13 0v1"/>
              <rect x="2" y="10.5" width="2.5" height="4" rx="1.25"/>
              <rect x="15.5" y="10.5" width="2.5" height="4" rx="1.25"/>
              <path d="M18 14.5v.5a2 2 0 0 1-2 2h-2.5"/>
            </svg>
            <span className="text-[14px] text-[#023dff]">Butuh Bantuan?</span>
          </button>
        </div>

        {/* Logo */}
        <div className="flex justify-center mb-5 mt-2">
          <img src={imgLogo} alt="Pandai Gadai" style={{ width: 124 }} />
        </div>

        {/* Headline */}
        <h1 data-component="Splash Headline" className="text-[22px] font-bold text-[#0f1729] leading-[28px] text-center mb-8 px-2">
          Gadai Aman, Nyaman, Full Senyuman di Pandai Gadai
        </h1>

        {/* Form card */}
        <div data-component="Login Card" className="bg-white/70 rounded-[12px] px-3 py-4 flex flex-col gap-3" style={{ boxShadow: '0px 0px 4px 0px rgba(0,0,0,0.15)' }}>
          <div className="flex flex-col gap-1">
            <input
              data-component="Nomor HP Input"
              type="text"
              placeholder="Nomor HP"
              value={nik}
              onChange={e => setNik(e.target.value)}
              className="w-full border border-[#cbd5e1] rounded-[6px] px-3 py-3 text-[14px] outline-none bg-white text-[#64748b]"
            />
          </div>
          <button
            data-component="Primary CTA — Masuk"
            onClick={() => {}}
            className="w-full bg-[#023dff] rounded-[8px] py-3 text-[14px] font-semibold text-white"
          >
            Masuk dengan Nomor HP
          </button>
          <label className="flex items-start gap-2 cursor-pointer">
            <input
              type="checkbox"
              className="sr-only"
              checked={tncChecked}
              onChange={() => setTncChecked(v => !v)}
            />
            <div
              className={`shrink-0 mt-[3px] size-[14px] border rounded-[3px] flex items-center justify-center ${tncChecked ? 'bg-[#023dff] border-[#023dff]' : 'border-[#65758b]'}`}
            >
              {tncChecked && (
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M2 5l2.5 2.5L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>
            <p className="text-[12px] font-medium text-[#65758b] leading-5">
              Saya menyetujui{' '}
              <span className="font-semibold text-[#023dff]">Syarat & Ketentuan</span>
              {' '}dari PT Solusi Gadai Pintar
            </p>
          </label>
        </div>

        {/* Guest entry — outside card, per Figma */}
        <div className="flex flex-col gap-2 mt-2">
          <p className="text-[13px] text-[#64748b]">Belum pernah gadai?</p>
          <button
            data-component="Secondary CTA — Masuk Tanpa Akun"
            onClick={() => navigate('/guest/home')}
            className="w-full bg-white border border-[#cbd5e1] rounded-[8px] py-3 flex items-center justify-center"
          >
            <span className="text-[14px] font-semibold text-[#021431]">Masuk tanpa akun</span>
          </button>
        </div>
      </div>

      {/* Home indicator — always visible */}
      <div className="absolute z-10 bottom-0 left-0 right-0 flex justify-center py-2">
        <div className="w-36 h-[5px] rounded-full bg-black" />
      </div>
    </div>
  )
}
