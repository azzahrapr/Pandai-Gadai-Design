import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const imgDate  = "/assets/status-date.svg"
const imgRight = "/assets/status-right.svg"

type ITabKey = 'aktivitas' | 'kedaluwarsa'
type IDirection = 'masuk' | 'keluar'

interface ITransaction {
  direction: IDirection
  category: string
  date: string
  title: string
  subtitle: string
  poin: number
}

const aktivitasData: ITransaction[] = [
  { direction: 'masuk', category: 'Tarik Saldo', date: '25 Agu 2024, 14:51', title: 'Tarik Saldo',   subtitle: 'Rp128.000',       poin: 2000 },
  { direction: 'masuk', category: 'PDAM',         date: '25 Agu 2024, 14:51', title: 'Tagihan PDAM', subtitle: '321123*********', poin: 2000 },
  { direction: 'masuk', category: 'Listrik',      date: '25 Agu 2024, 14:51', title: 'Listrik PLN',  subtitle: '321123*********', poin: 2000 },
]


function PoinIcon({ color }: { color: string }) {
  return (
    <div
      className="size-4 shrink-0"
      style={{
        background: color,
        WebkitMaskImage: "url('/assets/poin-fill.svg')",
        WebkitMaskSize: 'contain',
        WebkitMaskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        maskImage: "url('/assets/poin-fill.svg')",
        maskSize: 'contain',
        maskRepeat: 'no-repeat',
        maskPosition: 'center',
      } as React.CSSProperties}
    />
  )
}

function MasukIcon() {
  return (
    <div className="size-8 rounded-full bg-[#dcfce7] flex items-center justify-center shrink-0">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 3v10M3 8l5 5 5-5" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  )
}

function KeluarIcon() {
  return (
    <div className="size-8 rounded-full bg-[#fee2e2] flex items-center justify-center shrink-0">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 13V3M3 8l5-5 5 5" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  )
}

function TransactionCard({ tx, isKedaluwarsa }: { tx: ITransaction; isKedaluwarsa: boolean }) {
  const isMasuk = tx.direction === 'masuk'

  const badgeBg    = isKedaluwarsa ? '#f1f5f9' : isMasuk ? '#fffdc6' : '#fef2f2'
  const badgeColor = isKedaluwarsa ? '#64748b'  : isMasuk ? '#b27202' : '#ef4444'
  const badgePrefix = isKedaluwarsa ? '' : isMasuk ? '+' : '-'

  return (
    <div className="flex items-center gap-3 border border-[#e2e8f0] rounded-[12px] p-3">
      {isMasuk ? <MasukIcon /> : <KeluarIcon />}

      <div className="flex-1 flex flex-col gap-1 min-w-0">
        <div className="flex items-center gap-2">
          <span
            className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full shrink-0"
            style={{ background: '#e5f2ff', color: '#023dff' }}
          >
            {tx.category}
          </span>
          <span className="text-[11px] font-semibold text-[#64748b] truncate">{tx.date}</span>
        </div>
        <p className="text-[14px] font-medium text-[#020617] leading-5 truncate">{tx.title}</p>
        <p className="text-[12px] font-semibold text-[#64748b] leading-4 truncate">{tx.subtitle}</p>
      </div>

      {/* Poin badge */}
      <div
        className="shrink-0 rounded-[20px] px-2 py-1 flex items-center gap-1"
        style={{ background: badgeBg }}
      >
        <PoinIcon color={badgeColor} />
        <span
          className="text-[12px] font-semibold"
          style={{ color: badgeColor }}
        >
          {badgePrefix}{tx.poin.toLocaleString('id-ID')}
        </span>
      </div>
    </div>
  )
}

export default function RiwayatPoinPandai() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<ITabKey>('aktivitas')

  return (
    <div className="w-[375px] bg-white flex flex-col overflow-hidden rounded-3xl shadow-2xl" style={{ height: 812 }}>

      {/* Status bar */}
      <div className="flex justify-between items-end px-4 pt-3 pb-1 h-12 shrink-0">
        <img src={imgDate} alt="9:41" className="h-[11px] w-[28px]" />
        <img src={imgRight} alt="" className="h-[11px] w-[67px]" />
      </div>

      {/* Header */}
      <div className="flex items-center h-14 px-4 shrink-0">
        <div className="flex items-center gap-2">
          <button onClick={() => navigate(-1)} className="size-9 flex items-center justify-center -ml-1">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M12.5 15L7.5 10L12.5 5" stroke="#020617" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <p className="text-[20px] font-semibold text-black tracking-[-0.1px]">Riwayat Poin Pandai</p>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 px-4 pb-3 shrink-0">
        {(['aktivitas', 'kedaluwarsa'] as ITabKey[]).map((tab) => {
          const active = activeTab === tab
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="px-4 h-8 rounded-[8px] border text-[14px] font-medium capitalize transition-colors"
              style={{
                background: active ? '#cfe7ff' : 'transparent',
                borderColor: active ? '#001cdb' : '#cbd5e1',
                color: active ? '#001cdb' : '#94a3b8',
              }}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          )
        })}
      </div>

      {/* Content */}
      {activeTab === 'kedaluwarsa' ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-8 px-4 pb-8">
          <div className="flex flex-col items-center gap-4">
            <img src="/assets/spot.empty-poin-pandai.png" alt="" className="size-32 object-contain" />
            <div className="flex flex-col gap-1 text-center">
              <p className="text-[20px] font-semibold text-[#020617] leading-7 tracking-[-0.1px]">Tidak ada poin kedaluwarsa</p>
              <p className="text-[16px] text-[#64748b] leading-6">
                Bagus sekali, tidak ada yang terlewat. Lanjutkan misi untuk kumpulkan lebih banyak poin!
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate('/cuan-pandai')}
            className="w-full bg-[#0020e3] rounded-[6px] h-10 flex items-center justify-center gap-2"
          >
            <span className="text-[14px] font-medium text-[#f8fafc]">Kerjakan Misi</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M8 3l5 5-5 5" stroke="#f8fafc" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto hide-scrollbar px-4 pb-6 flex flex-col gap-3">
          {aktivitasData.map((tx, i) => (
            <TransactionCard key={i} tx={tx} isKedaluwarsa={false} />
          ))}
        </div>
      )}
    </div>
  )
}
