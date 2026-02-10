import './App.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Components
import Navbar from './components/Navbar.jsx'

// Pages
import Temperature from './pages/Temperature.jsx'

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Temperature />} />
          <Route path="/temperature" element={<Temperature />} />
          <Route path="/humidity" element={<p>Not yet! The Humidity page is under construction.</p>} />
          <Route path="/rain" element={<p>Not yet! The Rain page is under construction.</p>} />
          <Route path="/wind" element={<p>Not yet! The Wind page is under construction.</p>} />
          <Route path="/pressure" element={<p>Not yet! The Pressure page is under construction.</p>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
