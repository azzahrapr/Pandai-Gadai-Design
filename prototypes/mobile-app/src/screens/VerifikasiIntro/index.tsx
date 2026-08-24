import { useNavigate } from 'react-router-dom'

const imgDate   = "/assets/status-date.svg";
const imgRight  = "/assets/status-right.svg";
const imgPanda  = "/assets/panda-pose15.png";

export default function VerifikasiIntro() {
  const navigate = useNavigate()

  return (
    <div
      className="w-[375px] flex flex-col overflow-hidden rounded-3xl shadow-2xl relative"
      style={{ height: 812, background: "linear-gradient(180deg, #023dff 0%, #012599 100%)" }}
    >
      {/* Status bar */}
      <div className="flex justify-between items-end px-6 pt-3 pb-1 h-12 relative z-10">
        <img src={imgDate} alt="9:41" className="h-[11px] w-[28px]" />
        <img src={imgRight} alt="" className="h-[11px] w-[67px]" />
      </div>

      {/* Dark overlay to simulate blurred homepage behind */}
      <div className="absolute inset-0 bg-[rgba(9,19,78,0.6)] z-10" />

      {/* Bottom sheet card */}
      <div className="absolute bottom-0 left-0 right-0 z-20 bg-white rounded-t-3xl px-6 pt-4 pb-10 flex flex-col items-center gap-4">
        {/* Drag handle */}
        <div className="w-10 h-1 bg-slate-200 rounded-full mb-2" />

        {/* Panda illustration */}
        <img src={imgPanda} alt="" className="size-32 object-cover" />

        {/* Text */}
        <div className="flex flex-col items-center gap-2 text-center">
          <p className="text-xl font-bold text-slate-900 leading-7">
            Verifikasi data dulu sebelum melanjutkan
          </p>
          <p className="text-sm text-slate-500 leading-5">
            Yuk, verifikasi data untuk nikmati seluruh fitur aplikasi
          </p>
        </div>

        {/* CTA */}
        <button
          onClick={() => navigate('/verifikasi/form')}
          className="w-full bg-[#023dff] rounded-xl py-3 flex items-center justify-center gap-2"
        >
          <span className="text-sm font-medium text-white">Verifikasi Data Kamu</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <button onClick={() => navigate(-1)} className="text-sm font-medium text-slate-500">
          Kembali
        </button>
      </div>
    </div>
  )
}
