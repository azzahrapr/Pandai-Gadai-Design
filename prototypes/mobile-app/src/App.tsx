import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './index.css'
import { InspectProvider } from './components/Inspect/InspectContext'
import { InspectPanel } from './components/Inspect/InspectPanel'
import { InspectOverlay } from './components/Inspect/InspectOverlay'
import Homepage from './screens/Homepage'
import HomepageUnverified from './screens/HomepageUnverified'
import VerifikasiIntro from './screens/VerifikasiIntro'
import VerifikasiForm from './screens/VerifikasiForm'
import VerifikasiSuccess from './screens/VerifikasiSuccess'
import DetailPinjaman from './screens/DetailPinjaman'
import PaymentDetail from './screens/PaymentDetail'
import PoinPandaiVerified from './screens/PoinPandaiVerified'
import PoinPandaiUnverified from './screens/PoinPandaiUnverified'
import PoinPandaiSuccess from './screens/PoinPandaiSuccess'
import SBGDetail from './screens/SBGDetail'
import PinjamanPerpanjang from './screens/PinjamanPerpanjang'
import PinjamanTebus from './screens/PinjamanTebus'
import PinjamanCicil from './screens/PinjamanCicil'
import PinjamanPerpanjangCicil from './screens/PinjamanPerpanjangCicil'
import PostPaymentDetail from './screens/PostPaymentDetail'
import InputPIN from './screens/InputPIN'
import TYPSuccess from './screens/TYPSuccess'
import DaftarPinjaman from './screens/DaftarPinjaman'
import Akun from './screens/Akun'
import GuestSplash from './screens/GuestSplash'
import GuestHomepage from './screens/GuestHomepage'
import GuestCabangList from './screens/GuestCabangList'
import CuanPandai from './screens/CuanPandai'
import SaldoPandai from './screens/SaldoPandai'
import RiwayatPoinPandai from './screens/RiwayatPoinPandai'
import PrototypeIndex from './screens/PrototypeIndex'
import DSTest from './screens/DSTest'
import SimulasiGadai from './screens/SimulasiGadai'
import SimulasiEstimasi from './screens/SimulasiEstimasi'
import SimulasiPromo from './screens/SimulasiPromo'
import SimulasiSukses from './screens/SimulasiSukses'
import SimulasiPromoSukses from './screens/SimulasiPromoSukses'


function App() {
  return (
    <div className="min-h-screen bg-gray-300 flex items-start justify-center pt-4 pb-8">
      <InspectProvider>
      <div className="flex items-start gap-6">
      <div className="relative">
      <BrowserRouter>
        <div className="flex flex-col items-center gap-4">
        <Routes>
          <Route path="/" element={<PrototypeIndex />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/unverified" element={<HomepageUnverified />} />
          <Route path="/verifikasi" element={<VerifikasiIntro />} />
          <Route path="/verifikasi/form" element={<VerifikasiForm />} />
          <Route path="/verifikasi/success" element={<VerifikasiSuccess />} />
          <Route path="/pinjaman" element={<DaftarPinjaman />} />
          <Route path="/pinjaman/detail" element={<DetailPinjaman />} />
          <Route path="/pinjaman/payment" element={<PaymentDetail />} />
          <Route path="/poin-pandai" element={<PoinPandaiVerified />} />
          <Route path="/poin-pandai/unverified" element={<PoinPandaiUnverified />} />
          <Route path="/poin-pandai/success" element={<PoinPandaiSuccess />} />
          <Route path="/pinjaman/sbg-detail" element={<SBGDetail />} />
          <Route path="/pinjaman/perpanjang" element={<PinjamanPerpanjang />} />
          <Route path="/pinjaman/tebus" element={<PinjamanTebus />} />
          <Route path="/pinjaman/cicil" element={<PinjamanCicil />} />
          <Route path="/pinjaman/perpanjang-cicil" element={<PinjamanPerpanjangCicil />} />
          <Route path="/pinjaman/selesai" element={<PostPaymentDetail />} />
          <Route path="/pinjaman/pin" element={<InputPIN />} />
          <Route path="/payment-success" element={<TYPSuccess />} />
          <Route path="/akun" element={<Akun />} />
          <Route path="/guest" element={<GuestSplash />} />
          <Route path="/guest/login" element={<GuestSplash startAtLogin />} />
          <Route path="/guest/home" element={<GuestHomepage />} />
          <Route path="/guest/cabang" element={<GuestCabangList />} />
          <Route path="/cabang" element={<GuestCabangList />} />
          <Route path="/cuan-pandai" element={<CuanPandai />} />
          <Route path="/saldo-pandai" element={<SaldoPandai />} />
          <Route path="/riwayat-poin-pandai" element={<RiwayatPoinPandai />} />
          <Route path="/ds-test" element={<DSTest />} />
          <Route path="/simulasi" element={<SimulasiGadai />} />
          <Route path="/simulasi/estimasi" element={<SimulasiEstimasi />} />
          <Route path="/simulasi/promo" element={<SimulasiPromo />} />
          <Route path="/simulasi/sukses" element={<SimulasiSukses />} />
          <Route path="/simulasi/promo-sukses" element={<SimulasiPromoSukses />} />
        </Routes>
        </div>
      </BrowserRouter>
      <InspectOverlay />
      </div>
      <InspectPanel />
      </div>
      </InspectProvider>
    </div>
  )
}

export default App
