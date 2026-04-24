import './App.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Components
import Navbar from './components/Navbar.jsx'

// Pages
import Temperature from './pages/Temperature.jsx'
import Humidity from './pages/Humidity.jsx';
import Rainfall from './pages/Rainfall.jsx';
import Wind from './pages/Wind.jsx';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Temperature />} />
          <Route path="/temperature" element={<Temperature />} />
          <Route path="/humidity" element={<Humidity />} />
          <Route path="/rain" element={<Rainfall />} />
          <Route path="/wind" element={<Wind />} />
          <Route path="/pressure" element={<p>Not yet! The Pressure page is under construction.</p>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
