import cactus from '../assets/cactus.svg';

const Navbar = () => {
    return (
        <nav className="navbar sticky-top navbar-expand-lg bg-success border-bottom border-dark border-2">
            <div className="container-fluid">
                <a className="navbar-brand text-white fw-bold me-xl-4" href="/"><img src={cactus} alt="Cactus" style={{ height: '30px', marginRight: '10px' }} />Til-Til Weather Site</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="gap-xl-4 gap-md-3 gap-1 navbar-nav text-center w-100">
                        <li className="nav-item">
                            <a className="nav-link text-white" href="/temperature">🌡️ Temperature</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-white" href="/humidity">💧 Humidity</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link disabled text-white" href="/rain">🌧️ Rain</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link disabled text-white" href="/wind">💨 Wind</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link disabled text-white" href="/pressure">📈 Pressure</a>
                        </li>
                        <li className="nav-item ms-lg-auto">
                            <a className="nav-link disabled text-white" href="/login">👤 Login</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
export default Navbar;