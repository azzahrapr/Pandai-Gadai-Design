import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const imgDate       = "/assets/status-date.svg"
const imgRight      = "/assets/status-right.svg"
const imgEmptyState = "/assets/spot.empty-transaction.png"

const icons = {
  tarikSaldo: {
    vector: "/assets/icon-tarik-v.svg",
    mask:   "/assets/icon-tarik-mask.svg",
    fill:   "/assets/icon-tarik-fill.png",
    vectorInset: "0 5.48% 10.97% 5.48%",
    maskInset:   "8.16% -11.54% -11.91% 7.79%",
    maskPos:     "-11.746px -41.796px",
    maskSize:    "455.859px 512.004px",
  },
  pulsa: {
    vector: "/assets/icon-pulsa-v.svg",
    mask:   "/assets/icon-pulsa-mask.svg",
    fill:   "/assets/icon-pulsa-fill.png",
    vectorInset: "0 4.99% 10.17% 5.18%",
    maskInset:   "-2.42% -24.89% -20.08% 2.39%",
    maskPos:     "14.289px 12.39px",
    maskSize:    "459.938px 512px",
  },
  listrik: {
    vector: "/assets/icon-listrik-v.svg",
    mask:   "/assets/icon-listrik-mask.svg",
    fill:   "/assets/icon-listrik-fill.png",
    vectorInset: "0 5.32% 10.63% 5.32%",
    maskInset:   "14.73% -4.88% -4.73% 14.88%",
    maskPos:     "-48.964px -75.426px",
    maskSize:    "457.566px 512.004px",
  },
  pdam: {
    vector: "/assets/icon-air-v.svg",
    mask:   "/assets/icon-air-mask.svg",
    fill:   "/assets/icon-air-fill.png",
    vectorInset: "0 4.76% 9.53% 4.76%",
    maskInset:   "7.33% -12.7% -12.33% 7.7%",
    maskPos:     "-15.117px -37.521px",
    maskSize:    "463.228px 512.171px",
  },
}

function QuickIcon({ icon, size = 48 }: { icon: typeof icons.pulsa; size?: number }) {
  const S = 512
  return (
    <div style={{ width: size, height: size, overflow: 'hidden', position: 'relative', flexShrink: 0 }}>
      <div style={{ transform: `scale(${size / S})`, transformOrigin: '0 0', width: S, height: S, position: 'absolute' }}>
        <div style={{ position: 'absolute', inset: icon.vectorInset }}>
          <img alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }} src={icon.vector} />
        </div>
        <div style={{
          position: 'absolute',
          inset: icon.maskInset,
          maskImage: `url('${icon.mask}')`,
          maskSize: icon.maskSize,
          maskPosition: icon.maskPos,
          maskRepeat: 'no-repeat',
          WebkitMaskImage: `url('${icon.mask}')`,
          WebkitMaskSize: icon.maskSize,
          WebkitMaskPosition: icon.maskPos,
          WebkitMaskRepeat: 'no-repeat',
        } as React.CSSProperties}>
          <img alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }} src={icon.fill} />
        </div>
      </div>
    </div>
  )
}

function InfoIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="7" r="6.5" stroke="white" strokeOpacity="0.6"/>
      <path d="M7 6v4M7 4.5v.01" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

function ChevronDown() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M4 6L8 10L12 6" stroke="#020617" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function ChevronRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M6 4L10 8L6 12" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function PlusCircle() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9.5" stroke="#023dff" strokeWidth="1.5"/>
      <path d="M12 8v8M8 12h8" stroke="#023dff" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

function BannerInfoIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <circle cx="6" cy="6" r="5.5" stroke="#64748b"/>
      <path d="M6 5v3.5M6 3.5v.01" stroke="#64748b" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  )
}

// ── Tarik Saldo bottom sheet ──────────────────────────────────────────────────
function TarikSaldoSheet({ onClose }: { onClose: () => void }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true))
  }, [])

  const handleClose = () => {
    setVisible(false)
    setTimeout(onClose, 300)
  }

  const recentAccounts = [
    { bank: 'Mandiri', number: '1310092341234', name: 'Mike Wazowsky' },
    { bank: 'OVO',     number: '1310092341234', name: 'Mike Wazowsky' },
  ]

  const addOptions = [
    { label: 'Rekening Bank', sub: 'Transfer melalui 126 bank' },
    { label: 'E-wallet',      sub: 'Tarik melalui 4 e-wallet'  },
  ]

  return (
    <div className="absolute inset-0 z-50 flex flex-col justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{ background: 'rgba(15,17,41,0.7)', opacity: visible ? 1 : 0 }}
        onClick={handleClose}
      />

      {/* Sheet */}
      <div
        className="relative bg-white rounded-tl-[8px] rounded-tr-[8px] shadow-[0px_10px_7.5px_rgba(0,0,0,0.1),0px_4px_3px_rgba(0,0,0,0.1)] flex flex-col transition-transform duration-300 ease-out"
        style={{ transform: visible ? 'translateY(0)' : 'translateY(100%)' }}
      >
        <div className="flex flex-col gap-5 px-4 pb-4">

          {/* Handle */}
          <div className="flex justify-center pt-4">
            <div className="w-[100px] h-2 bg-slate-100 rounded-full" />
          </div>

          {/* Header */}
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <p className="text-[18px] font-semibold text-[#020617] leading-7">Pilih Metode Penarikan</p>
              <p className="text-[14px] text-[#64748b] leading-5">
                Pilih cara yang paling pas buat lanjut penarikan saldo kamu. Kami bantu prosesnya sampai selesai, ya.
              </p>
            </div>

            {/* Info banner */}
            <div className="flex items-center gap-2 bg-slate-50 border border-[#64748b] rounded-[8px] px-3 py-1.5" style={{ borderWidth: '0.5px' }}>
              <BannerInfoIcon />
              <span className="text-[14px] text-[#64748b]">Belum termasuk biaya admin Rp2.500</span>
            </div>
          </div>

          {/* Transaksi Terakhir */}
          <div className="flex flex-col gap-3">
            <p className="text-[14px] font-semibold text-black">Transaksi Terakhir</p>
            <div className="flex flex-col">
              {recentAccounts.map(({ bank, number, name }) => (
                <button key={number + bank} className="flex items-center justify-between py-2 pr-3 text-left w-full">
                  <div className="flex flex-col">
                    <span className="text-[14px] font-medium text-black leading-5">{bank} - {number}</span>
                    <span className="text-[12px] text-[#64748b] leading-5">{name}</span>
                  </div>
                  <ChevronRight />
                </button>
              ))}
            </div>
          </div>

          {/* Tambah Akun Lainnya */}
          <div className="flex flex-col gap-3">
            <p className="text-[14px] font-semibold text-black">Tambah Akun Lainnya</p>
            <div className="flex flex-col">
              {addOptions.map(({ label, sub }, i) => (
                <div key={label}>
                  <button className="flex items-center justify-between py-2 pr-3 w-full text-left">
                    <div className="flex flex-col">
                      <span className="text-[14px] font-medium text-black leading-5">{label}</span>
                      <span className="text-[12px] text-[#64748b] leading-5">{sub}</span>
                    </div>
                    <PlusCircle />
                  </button>
                  {i < addOptions.length - 1 && <div className="h-px bg-[#e2e8f0]" />}
                </div>
              ))}
            </div>
          </div>

          {/* Tutup button */}
          <button
            onClick={handleClose}
            className="w-full h-10 border border-[#e2e8f0] rounded-[6px] flex items-center justify-center"
          >
            <span className="text-[14px] font-medium text-[#020617]">Tutup</span>
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function SaldoPandai() {
  const navigate = useNavigate()
  const [showTarikSheet, setShowTarikSheet] = useState(false)

  return (
    <div className="w-[375px] bg-white flex flex-col overflow-hidden rounded-3xl shadow-2xl relative" style={{ height: 812 }}>

      {/* Status bar */}
      <div className="flex justify-between items-end px-4 pt-3 pb-1 h-12">
        <img src={imgDate} alt="9:41" className="h-[11px] w-[28px]" />
        <img src={imgRight} alt="" className="h-[11px] w-[67px]" />
      </div>

      {/* Header */}
      <div className="flex items-center h-14 px-4">
        <div className="flex items-center gap-2">
          <button onClick={() => navigate(-1)} className="size-9 flex items-center justify-center -ml-1">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M12.5 15L7.5 10L12.5 5" stroke="#020617" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <p className="text-[20px] font-semibold text-black tracking-[-0.1px]">Saldo Pandai</p>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto hide-scrollbar flex flex-col">

        {/* Blue gradient hero */}
        <div className="flex flex-col items-center px-4 pt-4 pb-6 gap-4"
          style={{ background: "linear-gradient(180deg, #ffffff 0%, #73aeff 100%)" }}>

          {/* Wallet card */}
          <div className="w-full rounded-[16px] overflow-hidden shadow-[0px_4px_3px_rgba(0,0,0,0.1),0px_2px_2px_rgba(0,0,0,0.1)]">

            {/* Top fold — blue gradient */}
            <div className="relative p-3 overflow-hidden"
              style={{ background: "linear-gradient(104.96deg, #09134E 10%, #3D7AFF 52%, #205CFF 62%, #023DFF 101%)" }}>

              {/* Wave decorations */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute rounded-full opacity-10"
                  style={{ width: 155, height: 143, left: -42, top: 17, background: 'white' }} />
                <div className="absolute rounded-full opacity-10"
                  style={{ width: 222, height: 208, right: -49, top: -101, transform: 'rotate(105deg)', background: 'white' }} />
              </div>

              <div className="relative flex items-start justify-between">
                {/* Left: label + amount */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-1">
                    <img src="/assets/icon.saldo-pandai.png" alt="" className="size-5 object-contain" />
                    <span className="text-[12px] font-medium text-white">Total Saldo</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-[24px] font-semibold text-white tracking-[-0.36px] leading-6">Rp2.200.000</p>
                    <div className="flex items-center gap-1">
                      <span className="text-[12px] font-medium text-white/80 leading-4">
                        Saldo tertahan <span className="font-bold">Rp50.000</span>
                      </span>
                      <InfoIcon />
                    </div>
                  </div>
                </div>

                {/* Right: Tarik Saldo button */}
                <button
                  className="bg-white border border-[#a8cfff] rounded-[8px] px-3 h-[30px] flex items-center"
                  onClick={() => setShowTarikSheet(true)}
                >
                  <span className="text-[14px] font-semibold text-[#023dff]">Tarik Saldo</span>
                </button>
              </div>
            </div>

            {/* Bottom fold — PPOB shortcuts */}
            <div className="bg-slate-50 flex items-center justify-around px-3 py-2">
              {([
                { icon: icons.pulsa,   label: "Pulsa/\nPaket Data" },
                { icon: icons.listrik, label: "Listrik\nPLN" },
                { icon: icons.pdam,    label: "Tagihan\nPDAM" },
              ] as const).map(({ icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-2 flex-1 py-2">
                  <QuickIcon icon={icon} size={48} />
                  <span className="text-[12px] font-medium text-black text-center whitespace-pre-line leading-4">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Transactions section */}
        <div className="bg-white flex-1 flex flex-col rounded-t-[8px] shadow-[0px_-4px_6px_rgba(0,0,0,0.05)]">

          {/* Filter chips */}
          <div className="flex gap-2 px-4 py-3">
            {(['Tanggal', 'Kategori'] as const).map((label) => (
              <button key={label} className="flex items-center gap-1 border border-[#e2e8f0] rounded-[8px] px-3 h-8">
                <span className="text-[14px] font-medium text-[#020617]">{label}</span>
                <ChevronDown />
              </button>
            ))}
          </div>

          {/* Empty state */}
          <div className="flex-1 flex flex-col items-center justify-center gap-4 px-4 pb-8">
            <img src={imgEmptyState} alt="" className="size-32 object-contain" />
            <div className="flex flex-col gap-1 text-center">
              <p className="text-[18px] font-semibold text-[#020617] leading-7">Belum Ada Transaksi</p>
              <p className="text-[14px] text-[#687076] leading-5">
                Mulai transaksi harianmu dengan Saldo Pandai. Bayar kebutuhan harian sekaligus kumpulkan poin emas!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tarik Saldo bottom sheet */}
      {showTarikSheet && (
        <TarikSaldoSheet onClose={() => setShowTarikSheet(false)} />
      )}
    </div>
  )
}
