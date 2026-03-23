import cactus from '../assets/cactus.svg';
import pressure from '../assets/pressure.svg';
import thermometer from '../assets/thermometer.svg';
import droplet from '../assets/droplet.svg';
import rain from '../assets/rain.svg';
import wind from '../assets/wind.svg';
import login from '../assets/login.svg';

const Navbar = () => {
    return (
        <nav className="navbar sticky-top navbar-expand-lg bg-success border-bottom border-dark border-2">
            <div className="container-fluid">
                <a className="navbar-brand text-white fw-bold me-xl-4" href="/"><img src={cactus} alt="Cactus" style={{ height: '30px', marginRight: '10px' }} />Til-Til Weather Site</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="gap-xl-5 gap-md-3 gap-2 navbar-nav text-center w-100">
                        <li className="nav-item">
                            <a className="nav-link text-white" href="/temperature"><img src={thermometer} alt="Temperature" style={{ height: '20px', marginRight: '5px' }} /> Temperature</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-white" href="/humidity"><img src={droplet} alt="Humidity" style={{ height: '20px', marginRight: '5px' }} /> Humidity</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link disabled text-white" href="/rain"><img src={rain} alt="Rain" style={{ height: '20px', marginRight: '5px' }} /> Rain</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link disabled text-white" href="/wind"><img src={wind} alt="Wind" style={{ height: '20px', marginRight: '5px' }} /> Wind</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link disabled text-white" href="/pressure"><img src={pressure} alt="Pressure" style={{ height: '20px', marginRight: '5px' }} /> Pressure</a>
                        </li>
                        <li className="nav-item ms-lg-auto">
                            <a className="nav-link disabled text-white" href="/login"><img src={login} alt="Login" style={{ height: '20px', marginRight: '5px' }} /> Login</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
export default Navbar;