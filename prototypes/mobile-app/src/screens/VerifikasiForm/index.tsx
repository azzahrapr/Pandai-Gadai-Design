import { useNavigate } from 'react-router-dom'

const imgDate  = "/assets/status-date.svg";
const imgRight = "/assets/status-right.svg";

export default function VerifikasiForm() {
  const navigate = useNavigate()

  return (
    <div className="w-[375px] bg-white flex flex-col overflow-hidden rounded-3xl shadow-2xl" style={{ height: 812 }}>

      {/* Status bar */}
      <div className="flex justify-between items-end px-6 pt-3 pb-1 h-12">
        <img src={imgDate} alt="9:41" className="h-[11px] w-[28px]" />
        <img src={imgRight} alt="" className="h-[11px] w-[67px]" />
      </div>

      {/* Header */}
      <div className="flex items-center px-4 h-14">
        <button onClick={() => navigate(-1)} className="size-9 flex items-center justify-center -ml-1">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15L7.5 10L12.5 5" stroke="#020617" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Scrollable content */}
      <div className="flex flex-col flex-1 overflow-y-auto hide-scrollbar px-4 gap-6 pt-2 pb-10">

        {/* Title */}
        <div className="flex flex-col gap-2">
          <p className="text-2xl font-bold text-slate-900 leading-8 tracking-[-0.15px]">Verifikasi Data Akun</p>
          <p className="text-sm text-slate-500 leading-5">
            Mohon isi Pandai ID / CIF kami biar kami bisa cocokkan dengan data gadai kamu. PandaiID / CIF ada di surat SBG yang kamu terima setelah gadai.
          </p>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-700">PandaiID / CIF</label>
            <div className="border border-slate-200 rounded-lg px-3 py-3 bg-white">
              <span className="text-sm text-slate-400">132230xxxxxx</span>
            </div>
          </div>

          <button
            onClick={() => navigate('/verifikasi/success')}
            className="w-full bg-[#023dff] rounded-xl py-3 flex items-center justify-center gap-2"
          >
            <span className="text-sm font-medium text-white">Verifikasi Data</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-slate-200" />
          <span className="text-sm text-slate-400">atau</span>
          <div className="flex-1 h-px bg-slate-200" />
        </div>

        {/* KTP option */}
        <button className="pressable flex items-center gap-3 border border-slate-200 rounded-xl px-4 py-3.5">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <rect x="2" y="5" width="16" height="11" rx="2" stroke="#023dff" strokeWidth="1.5"/>
            <path d="M5 9h4M5 12h3" stroke="#023dff" strokeWidth="1.5" strokeLinecap="round"/>
            <circle cx="14" cy="10.5" r="1.5" stroke="#023dff" strokeWidth="1.2"/>
          </svg>
          <span className="text-sm font-medium text-slate-900">Verifikasi dengan KTP</span>
        </button>
      </div>

      {/* Footer */}
      <div className="flex justify-center px-4 py-4 border-t border-slate-100">
        <p className="text-[12px] text-slate-500">
          Kamu butuh bantuan?{" "}
          <span className="font-semibold text-[#023dff]">Hubungi CS kami</span>
        </p>
      </div>
    </div>
  )
}
