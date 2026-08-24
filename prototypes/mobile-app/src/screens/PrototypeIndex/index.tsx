import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const links = [
  { label: 'Guest Mode', path: '/guest', desc: 'Splash → Login → Homepage' },
  { label: 'Homepage', path: '/home', desc: 'Logged in, verified user' },
  { label: 'Homepage (Unverified)', path: '/unverified', desc: 'Logged in, not yet verified' },
  { label: 'Simulasi Gadai', path: '/simulasi', desc: 'Pilih Barang → Estimasi → Promo' },
]

function ResetIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
      <path d="M3 3v5h5"/>
    </svg>
  )
}

export default function PrototypeIndex() {
  const navigate = useNavigate()
  const [resetDone, setResetDone] = useState(false)

  const handleReset = () => {
    localStorage.removeItem('pandai_claimed_titles')
    localStorage.removeItem('pandai_poin')
    setResetDone(true)
    setTimeout(() => setResetDone(false), 2000)
  }

  return (
    <div className="w-[375px] flex flex-col bg-white rounded-3xl shadow-2xl overflow-hidden" style={{ height: 812 }}>

      {/* Header */}
      <div className="px-6 pt-16 pb-8 border-b border-[#e2e8f0]">
        <p className="text-[12px] font-semibold text-[#64748b] uppercase tracking-widest mb-2">Pandai Gadai</p>
        <h1 className="text-[28px] font-bold text-[#020617] leading-8">Prototype Index</h1>
        <p className="text-[14px] text-[#64748b] mt-2">Select a flow to preview.</p>
      </div>

      {/* Links */}
      <div className="flex flex-col gap-3 px-6 pt-6">
        {links.map(({ label, path, desc }) => (
          <button
            key={path}
            onClick={() => navigate(path)}
            className="flex items-center justify-between w-full border border-[#e2e8f0] rounded-xl px-4 py-4 text-left bg-white hover:border-[#023dff] hover:bg-[#f0f5ff] transition-colors"
          >
            <div className="flex flex-col gap-0.5">
              <span className="text-[15px] font-semibold text-[#020617]">{label}</span>
              <span className="text-[12px] text-[#64748b]">{desc}</span>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#023dff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        ))}
      </div>

      {/* Reset state */}
      <div className="px-6 mt-auto pb-8">
        <button
          onClick={handleReset}
          className="flex items-center justify-center gap-2 w-full border rounded-xl px-4 py-3 transition-colors"
          style={{
            borderColor: resetDone ? '#16a34a' : '#e2e8f0',
            color: resetDone ? '#16a34a' : '#94a3b8',
          }}
        >
          <ResetIcon />
          <span className="text-[13px] font-medium">
            {resetDone ? 'State reset!' : 'Reset prototype state'}
          </span>
        </button>
        <p className="text-[11px] text-[#cbd5e1] text-center mt-2">Clears klaim poin progress</p>
      </div>
    </div>
  )
}
