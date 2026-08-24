import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const KEYPAD_ROWS = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['', '0', '⌫'],
]

export default function InputPIN() {
  const navigate = useNavigate()
  const location = useLocation()
  const [pin, setPin] = useState('')

  function handleDigit(digit: string) {
    if (pin.length >= 6) return
    const next = pin + digit
    setPin(next)
    if (next.length === 6) {
      setTimeout(() => navigate('/payment-success', { state: location.state }), 400)
    }
  }

  function handleDelete() {
    setPin(p => p.slice(0, -1))
  }

  return (
    <div className="w-[375px] flex flex-col overflow-hidden rounded-3xl shadow-2xl bg-[#023dff]" style={{ height: 812 }}>

      {/* Status bar */}
      <div className="flex items-center justify-between h-[52px] px-[15px] pb-[9px] pt-[14px] shrink-0">
        <span className="text-[15px] font-semibold text-white leading-none">9:41</span>
        <div className="flex items-center gap-[5px]">
          <svg width="17" height="12" viewBox="0 0 17 12" fill="white" xmlns="http://www.w3.org/2000/svg">
            <rect x="0"   y="9" width="3" height="3"  rx="0.5"/>
            <rect x="4.7" y="6" width="3" height="6"  rx="0.5"/>
            <rect x="9.4" y="3" width="3" height="9"  rx="0.5"/>
            <rect x="14"  y="0" width="3" height="12" rx="0.5"/>
          </svg>
          <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="8" cy="11" r="1" fill="white"/>
            <path d="M5 8.5C6.2 7.3 9.8 7.3 11 8.5"     stroke="white" strokeWidth="1.3" strokeLinecap="round"/>
            <path d="M2.5 6C4.5 4 11.5 4 13.5 6"         stroke="white" strokeWidth="1.3" strokeLinecap="round"/>
            <path d="M0.5 3.5C3.3 0.7 12.7 0.7 15.5 3.5" stroke="white" strokeWidth="1.3" strokeLinecap="round"/>
          </svg>
          <svg width="25" height="12" viewBox="0 0 25 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.5" y="0.5" width="21" height="11" rx="3"   stroke="white"/>
            <rect x="2"   y="2"   width="17" height="8"  rx="1.5" fill="white"/>
            <path d="M23 4.5v3" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
      </div>

      {/* Back arrow */}
      <div className="h-[56px] flex items-center px-4 shrink-0">
        <button onClick={() => navigate(-1)} className="size-9 flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M19 12H5M5 12l7 7M5 12l7-7" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-between pb-4 px-4">

        {/* Title + dots */}
        <div className="flex flex-col items-center gap-16 pt-8">
          <div className="flex flex-col items-center gap-4 text-center text-white">
            <h1 className="text-[20px] font-semibold leading-7 tracking-[-0.1px]">Masukkan PIN</h1>
            <p className="text-[16px] leading-6 w-[280px]">
              Silakan masukkan 6 digit PIN untuk melanjutkan transaksi
            </p>
          </div>

          {/* PIN dots */}
          <div className="flex gap-4 items-center">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className={`size-6 rounded-full transition-colors ${i < pin.length ? 'bg-white' : 'bg-white/30'}`}
              />
            ))}
          </div>
        </div>

        {/* Keypad */}
        <div className="flex flex-col gap-6 w-[312px]">
          {KEYPAD_ROWS.map((row, ri) => (
            <div key={ri} className="flex items-center justify-between">
              {row.map((key, ki) => {
                if (key === '') {
                  return <div key={ki} className="size-[74px]" />
                }
                if (key === '⌫') {
                  return (
                    <button
                      key={ki}
                      onClick={handleDelete}
                      className="size-[74px] flex items-center justify-center active:opacity-60 transition-opacity"
                    >
                      <svg width="28" height="22" viewBox="0 0 24 18" fill="none">
                        <path d="M22 1H9L1 9l8 8h13a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <line x1="17" y1="6" x2="12" y2="12" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                        <line x1="12" y1="6" x2="17" y2="12" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    </button>
                  )
                }
                return (
                  <button
                    key={ki}
                    onClick={() => handleDigit(key)}
                    className="size-[74px] flex items-center justify-center rounded-full active:bg-white/20 transition-colors"
                  >
                    <span className="text-[30px] font-bold text-white leading-9">{key}</span>
                  </button>
                )
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Home indicator */}
      <div className="flex justify-center pb-2 shrink-0">
        <div className="w-36 h-[5px] rounded-full bg-white/50" />
      </div>
    </div>
  )
}
