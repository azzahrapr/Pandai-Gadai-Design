import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const imgDate = "/assets/status-date.svg"
const imgRight = "/assets/status-right.svg"

const branches = [
  {
    id: 1,
    name: 'Pandai Gadai Otista',
    distance: '2,5 KM',
    types: ['Gadai Elektronik', 'Gadai Emas'],
    hours: 'Senin–Minggu, 09.00–20.30',
    phone: '0821-2789-5308',
    address: 'Jl. Otista Raya No. 161c, RT.2/RW.8, Kel. Bidara Cina, Kec. Jatinegara, Jakarta Timur 13330',
  },
  {
    id: 2,
    name: 'Pandai Gadai Koja',
    distance: '5,1 KM',
    types: ['Gadai Elektronik', 'Gadai Emas'],
    hours: 'Senin–Minggu, 09.00–20.30',
    phone: '0821-2789-5308',
    address: 'Jl. Plumpang Semper No.34, Tugu Sel., Kec. Koja, Jakarta Utara 14230',
  },
  {
    id: 3,
    name: 'Pandai Gadai Tambora',
    distance: '10,3 KM',
    types: ['Gadai Elektronik'],
    hours: 'Senin–Minggu, 09.00–20.30',
    phone: '0821-2789-5308',
    address: 'Jalan Duri Utara No.5, Duri Utara, Kec. Tambora, Jakarta Barat 11270',
  },
  {
    id: 4,
    name: 'Pandai Gadai Condet',
    distance: '12,5 KM',
    types: ['Gadai Elektronik', 'Gadai Emas'],
    hours: 'Senin–Minggu, 09.00–20.30',
    phone: '0821-2789-5308',
    address: 'Jl. Raya Condet No.4, Kel. Balekambang, Kec. Kramat Jati, Jakarta Timur 13530',
  },
  {
    id: 5,
    name: 'Pandai Gadai Dewi Sartika',
    distance: '14,2 KM',
    types: ['Gadai Elektronik', 'Gadai Emas'],
    hours: 'Senin–Minggu, 09.00–20.30',
    phone: '0821-2789-5308',
    address: 'Jl. Raya Dewi Sartika No.19, Kel. Cililitan, Kec. Kramat Jati, Jakarta Timur 13640',
  },
]

export default function GuestCabangList() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')

  const filtered = branches.filter(b =>
    b.name.toLowerCase().includes(query.toLowerCase()) ||
    b.address.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="w-[375px] flex flex-col overflow-hidden rounded-3xl shadow-2xl bg-white" style={{ height: 812 }}>

      {/* Header */}
      <div data-component="Header / NavBar" className="shrink-0 border-b border-[#e1e6ef]">
        {/* Status bar */}
        <div className="flex items-end justify-between h-[52px] px-[15px] pb-[9px]">
          <img src={imgDate} alt="" className="h-[11px] w-[28px] shrink-0" />
          <img src={imgRight} alt="" className="h-[11px] w-[67px] shrink-0" />
        </div>

        {/* Nav bar */}
        <div className="flex items-center justify-between h-[52px] px-2 pb-1">
          <button
            onClick={() => navigate(-1)}
            className="size-10 flex items-center justify-center rounded-lg shrink-0"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="#021431" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <p className="text-[16px] font-bold text-[#142a5b] text-center">Temukan Cabang Terdekat</p>
          <div className="size-10 shrink-0" />
        </div>
      </div>

      {/* Search bar */}
      <div className="px-4 pt-3 pb-2 shrink-0">
        <div data-component="Search Bar" className="flex items-center gap-2 h-10 bg-[#f8f9fc] border border-[#f1f3f9] rounded-full px-3">
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" className="shrink-0">
            <circle cx="9" cy="9" r="6" stroke="#94a0b8" strokeWidth="2"/>
            <path d="M14 14L18 18" stroke="#94a0b8" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Ketik nama cabang/wilayah/kota"
            className="flex-1 bg-transparent text-[14px] text-[#021431] placeholder-[#94a0b8] outline-none"
          />
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto hide-scrollbar px-4 pb-6">
        <p className="text-[16px] font-bold text-[#001533] leading-6 mb-4">
          Pilih lokasi cabang terdekat untuk menitipkan barangmu
        </p>

        <div className="flex flex-col gap-4">
          {filtered.map(branch => (
            <div
              data-component="Branch Card"
              key={branch.id}
              className="bg-white border border-[#e1e6ef] rounded-xl px-4 py-3 flex flex-col gap-3"
              style={{ boxShadow: '0px 2px 3px rgba(0,0,0,0.1)' }}
            >
              {/* Title row */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex flex-col gap-1 flex-1 min-w-0">
                  <p className="text-[16px] font-bold text-[#021431] leading-6">{branch.name}</p>
                  {/* Type chips */}
                  <div className="flex gap-2 flex-wrap">
                    {branch.types.includes('Gadai Elektronik') && (
                      <span className="inline-flex items-center h-6 px-3 bg-[#ebf5ff] rounded-full text-[12px] text-[#0255ca]">
                        Gadai Elektronik
                      </span>
                    )}
                    {branch.types.includes('Gadai Emas') && (
                      <span className="inline-flex items-center h-6 px-3 bg-[#fde7e0] rounded-full text-[12px] text-[#cb704f]">
                        Gadai Emas
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-[14px] font-bold text-[#021431] shrink-0">{branch.distance}</p>
              </div>

              {/* Detail rows */}
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-3">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0">
                    <circle cx="12" cy="12" r="9" stroke="#5f6c85" strokeWidth="1.5"/>
                    <path d="M12 7v5l3 3" stroke="#5f6c85" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  <p className="text-[12px] text-[#5f6c85]">{branch.hours}</p>
                </div>
                <div className="flex items-center gap-3">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0">
                    <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" fill="#5f6c85"/>
                  </svg>
                  <p className="text-[12px] text-[#5f6c85]">{branch.phone}</p>
                </div>
                <div className="flex items-start gap-3">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#5f6c85" className="shrink-0 mt-0.5">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                  <p className="text-[12px] text-[#5f6c85] leading-[18px]">{branch.address}</p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-4">
                <button data-component="Secondary Button — Lihat Lokasi" className="flex-1 h-8 flex items-center justify-center border border-[#0255ca] bg-[#e6ecff] rounded-[6px]">
                  <span className="text-[12px] font-bold text-[#0255ca]">Lihat Lokasi</span>
                </button>
                <button data-component="Primary Button — Kontak Admin" className="flex-1 h-8 flex items-center justify-center bg-[#0255ca] rounded-[6px]">
                  <span className="text-[12px] font-bold text-white">Kontak Admin</span>
                </button>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="flex flex-col items-center gap-3 py-12">
              <p className="text-[15px] font-bold text-[#021431]">Cabang tidak ditemukan</p>
              <p className="text-[13px] text-[#5f6c85] text-center">Coba cari dengan kata kunci yang berbeda.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
