import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const imgDate  = "/assets/status-date.svg"
const imgRight = "/assets/status-right.svg"

const POIN_BALANCE: number = 12000
const DEMO_POIN_BALANCE = POIN_BALANCE

interface IPinjamanItem {
  nilai: number
  name?: string
  [key: string]: unknown
}

function fmt(n: number) {
  return 'Rp' + n.toLocaleString('id-ID')
}

type IPoinState = 'available' | 'selected' | 'insufficient' | 'maintenance'

function Toggle({ on, disabled, onClick }: { on: boolean; disabled?: boolean; onClick: () => void }) {
  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={`w-11 h-6 rounded-full transition-colors shrink-0 flex items-center
        ${disabled ? 'bg-[#e1e7ef] cursor-not-allowed' : on ? 'bg-[#023dff]' : 'bg-[#e1e7ef]'}`}
    >
      <div className={`size-5 rounded-full bg-white shadow transition-transform mx-0.5
        ${!disabled && on ? 'translate-x-5' : 'translate-x-0'}`} />
    </button>
  )
}

function IconPoinEmas({ faded }: { faded?: boolean }) {
  return (
    <div className={`size-7 rounded-full bg-[#fffdc6] flex items-center justify-center shrink-0 ${faded ? 'opacity-60' : ''}`}>
      <svg width="13" height="15" viewBox="0 0 13.9145 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.7124 3.45676C12.7124 3.21168 12.5991 2.98044 12.4055 2.83004L10.522 1.36843C10.3828 1.2604 10.2118 1.20185 10.0356 1.20185H3.87883C3.70827 1.20185 3.54222 1.25691 3.40558 1.35846L3.39246 1.36843L1.50892 2.83004C1.31528 2.98044 1.20205 3.21168 1.20205 3.45676V12.4703C1.20205 12.7061 1.30699 12.9295 1.48788 13.0799L1.49656 13.087L3.39581 14.6219C3.53689 14.7359 3.71276 14.7982 3.89456 14.7982H10.0204C10.1946 14.7982 10.3636 14.7409 10.5017 14.6355L12.4177 13.0871C12.6042 12.9364 12.7124 12.7098 12.7124 12.4703V3.45676ZM13.9144 12.4703C13.9144 13.0729 13.6421 13.643 13.1733 14.0218L11.2748 15.5566C10.9198 15.8434 10.4771 16 10.0204 16H3.89456C3.43809 16 2.99528 15.8437 2.64003 15.5564L0.741082 14.0218C0.272225 13.643 0 13.0727 0 12.4703V3.45676C0 2.84025 0.284966 2.25865 0.771779 1.88069L2.65544 0.418983C3.01873 0.142945 3.44273 0 3.87883 0H10.0356C10.4785 0 10.9089 0.147247 11.259 0.418983L13.1426 1.88069C13.6294 2.25865 13.9144 2.84025 13.9144 3.45676V12.4703Z" fill="#94590A"/>
        <path d="M11.4573 3.12723L10.3369 2.21343C10.1725 2.07935 9.9668 2.00597 9.75462 2.00597H4.13103C3.91885 2.00597 3.71319 2.07916 3.54878 2.21343L2.42802 3.12742C2.21315 3.30261 2.08845 3.5654 2.08826 3.84297L2.08557 12.1566C2.08557 12.4344 2.21027 12.6974 2.42533 12.8728L3.54571 13.7866C3.71012 13.9207 3.91578 13.994 4.12796 13.994H9.75155C9.96373 13.994 10.1694 13.9208 10.3338 13.7866L11.4546 12.8726C11.6694 12.6974 11.7941 12.4346 11.7943 12.157L11.797 3.84336C11.797 3.56559 11.6723 3.30261 11.4573 3.12723ZM4.2659 4.7973C4.2659 4.55545 4.46178 4.35932 4.70331 4.35932H6.93717C6.69563 5.65481 5.60403 6.6537 4.26571 6.75206V4.79749L4.2659 4.7973ZM6.97515 11.1808C6.97515 11.4226 6.77928 11.6188 6.53774 11.6188H4.7035C4.46197 11.6188 4.26609 11.4226 4.26609 11.1808V6.76954C5.69707 6.87423 6.84623 8.00471 6.97535 9.43043V11.1808H6.97515ZM9.78992 7.70581C9.78992 8.61672 9.05246 9.35513 8.14273 9.35513H7.00853C7.17314 7.93882 8.34302 6.83043 9.78992 6.76435V7.706V7.70581ZM9.78992 6.75743C8.41112 6.69424 7.28403 5.68074 7.03846 4.35932H8.14273C9.05246 4.35932 9.78992 5.09774 9.78992 6.00865V6.75743Z" fill="#94590A"/>
      </svg>
    </div>
  )
}

export default function PinjamanCicil() {
  const navigate = useNavigate()
  const location = useLocation()
  const pinjaman = (location.state as { pinjaman?: IPinjamanItem } | null)?.pinjaman
  const nilaiPinjaman = pinjaman?.nilai ?? 850000

  const [nominalCicilStr, setNominalCicilStr] = useState('')
  const [promoCode, setPromoCode] = useState('')
  const [poinOn, setPoinOn] = useState(false)

  const parsedNominal = parseInt(nominalCicilStr.replace(/\D/g, ''), 10) || 0
  const nilaiPinjamanBaru = parsedNominal > 0 ? nilaiPinjaman - parsedNominal : null

  const poinState = (DEMO_POIN_BALANCE === 0 ? 'insufficient' : poinOn ? 'selected' : 'available') as IPoinState
  const poinDisabled = poinState === 'insufficient' || poinState === 'maintenance' || DEMO_POIN_BALANCE > parsedNominal
  const poinDiscount = poinState === 'selected' ? DEMO_POIN_BALANCE : 0
  const total = parsedNominal - poinDiscount

  function getPoinSubtext() {
    switch (poinState) {
      case 'selected':     return `Poin terpakai: ${DEMO_POIN_BALANCE.toLocaleString('id-ID')}`
      case 'insufficient': return 'Poin tidak tersedia: 0'
      case 'maintenance':  return 'Sedang dalam pemeliharaan.'
      default:             return `Poin tersedia: ${DEMO_POIN_BALANCE.toLocaleString('id-ID')}`
    }
  }

  return (
    <div className="w-[375px] flex flex-col bg-white overflow-hidden rounded-3xl shadow-2xl" style={{ height: 812 }}>

      {/* Status bar */}
      <div className="flex items-end justify-between h-[52px] px-[15px] pb-[9px] bg-white shrink-0">
        <img src={imgDate} alt="" className="h-[11px] w-[28px] shrink-0" />
        <img src={imgRight} alt="" className="h-[11px] w-[67px] shrink-0" />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between h-[56px] px-4 bg-white border-b border-[#e2e8f0] shrink-0">
        <div className="flex items-center gap-2">
          <button onClick={() => navigate(-1)} className="size-9 flex items-center justify-center -ml-1">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M5 12l7 7M5 12l7-7" stroke="#020617" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <h1 className="text-[20px] font-semibold leading-7 tracking-[-0.1px] text-black">Cicil Pinjaman</h1>
        </div>
        <button className="flex items-center justify-center w-10 h-10 rounded-full border border-[#a8cfff] bg-[rgba(229,242,255,0.7)]">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#023dff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 18v-6a9 9 0 0 1 18 0v6"/>
            <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z"/>
            <path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>
          </svg>
        </button>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto hide-scrollbar px-4 py-4 flex flex-col gap-4">

        {/* Nilai Pinjaman card */}
        <div className="bg-white border border-[#e2e8f0] rounded-lg px-3 py-3 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-[14px] text-[#64748b]">Nilai Pinjaman</span>
            <span className="text-[14px] text-[#0f1729]">{fmt(nilaiPinjaman)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[14px] text-[#64748b]">Nilai Pinjaman Baru</span>
            <span className="text-[14px] text-[#0f1729]">
              {nilaiPinjamanBaru !== null ? fmt(nilaiPinjamanBaru) : '-'}
            </span>
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="flex border border-[#cbd5e1] rounded-[6px] overflow-hidden focus-within:border-[#023dff]">
              <div className="bg-[#f8fafc] px-3 py-3 flex items-center shrink-0">
                <span className="text-[14px] text-[#65758b]">Rp</span>
              </div>
              <input
                type="number"
                value={nominalCicilStr}
                onChange={e => setNominalCicilStr(e.target.value)}
                placeholder="Masukkan nominal cicil"
                className="flex-1 px-3 py-3 text-[14px] text-[#0f1729] outline-none"
              />
            </div>
            <p className="text-[12px] text-[#64748b]">Nominal cicil antara Rp50.000 - Rp750.000</p>
          </div>
        </div>

        {/* Detail Pembayaran */}
        <div className="flex flex-col gap-3">
          <p className="text-[14px] font-semibold text-[#0f1729]">Detail Pembayaran</p>
          <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-lg px-4 py-3 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-[14px] text-[#64748b]">Nominal Cicil</span>
              <span className="text-[14px] text-[#020617]">{fmt(parsedNominal)}</span>
            </div>
            <div className="h-px bg-[#e2e8f0]" />
            <div className="flex items-center justify-between">
              <span className="text-[14px] font-semibold text-[#020617]">Subtotal</span>
              <span className="text-[16px] font-semibold text-[#023dff]">{fmt(parsedNominal)}</span>
            </div>
          </div>
        </div>

        {/* Bayar Lebih Hemat */}
        <div className="flex flex-col gap-3">
          <div>
            <p className="text-[14px] font-semibold text-[#0f1729]">Bayar Lebih Hemat! 🎉</p>
            <p className="text-[12px] text-[#64748b] leading-[18px]">
              Gunakan promo dan poin untuk kurangi total pembayaran.
            </p>
          </div>

          {/* Promo code */}
          <div className="flex gap-2 items-center">
            <input
              type="text"
              value={promoCode}
              onChange={e => setPromoCode(e.target.value)}
              placeholder="Masukkan kode promo"
              className="flex-1 border border-[#cbd5e1] rounded-[6px] px-3 py-3 text-[14px] text-[#64748b] outline-none"
            />
            <button className="bg-[#023dff] rounded-lg h-11 px-4 flex items-center justify-center shrink-0">
              <span className="text-[14px] font-semibold text-white">Pakai</span>
            </button>
          </div>

          {/* Poin Pandai row */}
          <div className="bg-white border border-[#e1e7ef] rounded-lg px-3 py-2">
            <div className="flex items-center gap-3 py-2">
              <IconPoinEmas faded={poinDisabled} />
              <div className="flex-1">
                <div className="flex items-center gap-1">
                  <span className={`text-[14px] font-medium ${poinDisabled ? 'text-[#94a3b8]' : 'text-black'}`}>
                    Poin Pandai
                  </span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
                  </svg>
                </div>
                <p className={`text-[12px] ${poinDisabled ? 'text-[#94a3b8]' : 'text-[#64748b]'}`}>
                  {getPoinSubtext()}
                </p>
              </div>
              <Toggle on={poinState === 'selected'} disabled={poinDisabled} onClick={() => setPoinOn(v => !v)} />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="shrink-0">
        <div className="bg-white px-4 py-4 flex items-center gap-2 border-t border-[#e2e8f0]">
          <div className="flex-1">
            <p className="text-[14px] font-semibold text-[#020617]">Total Pembayaran</p>
            <div className="flex items-baseline gap-2">
              <p className="text-[20px] font-bold text-[#023dff]">{fmt(total)}</p>
              {poinState === 'selected' && (
                <p className="text-[14px] text-[#94a3b8] line-through">{fmt(parsedNominal)}</p>
              )}
            </div>
          </div>
          <button
            onClick={() => parsedNominal > 0 && navigate('/pinjaman/pin', { state: { type: 'cicil' } })}
            disabled={parsedNominal === 0}
            className={`rounded-[6px] px-4 py-2 flex items-center gap-2 shrink-0 transition-colors ${parsedNominal === 0 ? 'bg-[#94a3b8] cursor-not-allowed' : 'bg-[#023dff]'}`}
          >
            <span className="text-[14px] font-medium text-white">Bayar</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
              <path d="M7 17L17 7M17 7H7M17 7v10"/>
            </svg>
          </button>
        </div>

        {/* Home indicator */}
        <div className="flex justify-center pb-2 bg-white">
          <div className="w-36 h-[5px] rounded-full bg-black" />
        </div>
      </div>
    </div>
  )
}
