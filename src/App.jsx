import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard.jsx'
import CityDetail from './pages/CityDetail.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/destino/:slug" element={<CityDetail />} />
    </Routes>
  )
}

export default App
