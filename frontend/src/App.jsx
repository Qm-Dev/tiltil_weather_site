import './App.css'

import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';

// Components
import Navbar from './components/Navbar.jsx'

// Pages
import Home from './pages/Home.jsx';
import Temperature from './pages/Temperature.jsx'
import Humidity from './pages/Humidity.jsx';
import Rainfall from './pages/Rainfall.jsx';
import Wind from './pages/Wind.jsx';
import Pressure from './pages/Pressure.jsx';
import UploadDataset from './pages/UploadDataset.jsx';

const NavbarLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<NavbarLayout />}>
          <Route path="/temperature" element={<Temperature />} />
          <Route path="/humidity" element={<Humidity />} />
          <Route path="/rain" element={<Rainfall />} />
          <Route path="/wind" element={<Wind />} />
          <Route path="/pressure" element={<Pressure />} />
          <Route path="/upload_dataset" element={<UploadDataset />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
