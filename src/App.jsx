import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Dashboard from './pages/Dashboard.jsx'
import CityDetail from './pages/CityDetail.jsx'
import Tools from './pages/Tools.jsx'
import ToolPage from './pages/ToolPage.jsx'
import Album from './pages/Album.jsx'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/destino/:slug" element={<CityDetail />} />
        <Route path="/herramientas" element={<Tools />} />
        <Route path="/herramientas/:slug" element={<ToolPage />} />
        <Route path="/album" element={<Album />} />
      </Route>
    </Routes>
  )
}

export default App
