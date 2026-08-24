import { useNavigate, useSearchParams } from 'react-router-dom'

const imgDate      = "/assets/status-date.svg"
const imgRight     = "/assets/status-right.svg"
const imgSpot      = "/assets/spot-cuan-emas.png"
const imgPGLogo    = "/assets/pandai-gadai-logo.png"

const BASE = "/assets/2.3.3.1 Verification/FilledNewUser/Main Content"
const imgTerms     = `${BASE}/terms-condition.png`
const imgRegister  = `${BASE}/register.png`
const imgPoinStep  = `${BASE}/poin-emas.png`
const imgClaim     = `${BASE}/claim-history.png`
const imgPintarnya = `${BASE}/Pintarnya Logo.png`

function IconTerms()  { return <img src={imgTerms}    alt="" className="w-[34px] h-[36px] object-contain shrink-0" /> }
function IconEmail()  { return <img src={imgRegister}  alt="" className="w-[34px] h-[36px] object-contain shrink-0" /> }
function IconPoin()   { return <img src={imgPoinStep}  alt="" className="w-[34px] h-[36px] object-contain shrink-0" /> }
function IconKlaim()  { return <img src={imgClaim}     alt="" className="w-[34px] h-[36px] object-contain shrink-0" /> }

const steps = [
  { icon: <IconTerms />, text: 'Dengan klik "Lanjutkan", kamu menyetujui Syarat & Ketentuan Cuan Pandai' },
  { icon: <IconEmail />, text: 'Daftar atau masuk dengan email untuk hubungkan akun Pandai Gadai dan Pintarnya' },
  { icon: <IconPoin />,  text: 'Jalankan misi dari Pintarnya untuk kumpulkan Poin Pandai' },
  { icon: <IconKlaim />, text: 'Poin yang kamu dapat akan tercatat di halaman klaim Poin Pandai' },
]

export default function CuanPandai() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const isGuest = params.get('guest') === 'true'

  return (
    <div className="w-[375px] bg-white flex flex-col overflow-hidden rounded-3xl shadow-2xl" style={{ height: 812 }}>

      {/* Status bar */}
      <div className="flex justify-between items-end px-4 pt-3 pb-1 h-[52px] shrink-0">
        <img src={imgDate} alt="" className="h-[11px] w-[28px]" />
        <img src={imgRight} alt="" className="h-[11px] w-[67px]" />
      </div>

      {/* Header */}
      <div className="flex items-center gap-2 px-4 h-[56px] border-b border-[#e2e8f0] shrink-0">
        <button onClick={() => navigate(-1)} className="size-10 flex items-center justify-center -ml-1 shrink-0">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="#020617" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto hide-scrollbar">
        <div className="flex flex-col items-center px-4 pt-4 pb-6 gap-4">

          {/* Illustration */}
          <img src={imgSpot} alt="Cuan Pandai" className="size-32 object-contain" />

          {/* Title + description */}
          <div className="flex flex-col items-center gap-2 text-center">
            <p className="text-[28px] font-bold text-[#020617] leading-8 tracking-[-0.168px]">Cuan Pandai</p>
            <p className="text-[14px] text-[#687076] leading-[1.4]">
              Tambah Poin Pandai dengan kerjakan misi Cuan Pandai – kolaborasi Pandai Gadai &amp; Pintarnya
            </p>
          </div>

          {/* Steps card */}
          <div className="w-full border border-[#e2e8f0] rounded-xl px-4 py-4 flex flex-col">
            {steps.map((step, i) => (
              <div key={i}>
                <div className="flex items-start gap-3">
                  {step.icon}
                  <p className="text-[13px] text-[#0f1729] leading-[18px] flex-1 pt-[2px]">{step.text}</p>
                </div>
                {i < steps.length - 1 && (
                  <div className="flex justify-start pl-[16px] py-[2px]">
                    <div className="w-px h-3 bg-[#cbd5e1]" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Logo row: PG | Pintarnya */}
          <div className="flex items-center gap-4">
            <img src={imgPGLogo} alt="Pandai Gadai" className="h-[28px] object-contain" />
            <div className="w-px h-6 bg-[#e2e8f0]" />
            <img src={imgPintarnya} alt="Pintarnya" className="h-[28px] object-contain" />
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="shrink-0 bg-white px-4 pt-4 pb-8">
        <button
          onClick={() => isGuest && navigate('/guest/login')}
          className="w-full h-10 bg-[#023dff] rounded-[6px] flex items-center justify-center gap-2"
        >
          <span className="text-[14px] font-medium text-white">Lanjutkan</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  )
}
