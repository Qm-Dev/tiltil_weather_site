import Cactus from "../assets/cactus.svg"
import Tiltil from "../assets/tiltil.jpeg"

const Home = () => {
    return (
        <main className="d-flex flex-column justify-content-center align-items-center" style={{minHeight: "100vh", backgroundImage: `url(${Tiltil})`, backgroundSize: "cover", backgroundPosition: "center"}}>
            <div className="container">
                <div className="row justify-content-center text-center">
                    <img src={Cactus} className="col-12 w-25 mt-0" />
                </div>
                <div className="row justify-content-center text-center">
                    <h1 className="col-12 text-white fw-bold mb-3 mt-0" style={{textShadow: "3px 3px black"}}>Welcome!</h1>
                </div>
                <div className="row justify-content-center row-cols-1 row-cols-md-3 row-cols-xl-4 mx-auto gap-4">
                    <button type="button" className="btn btn-light border border-3 border-black rounded-2 position-relative shadow menuButton" style={{ backgroundColor: "rgba(255, 255, 255, 0.8)", backdropFilter: "blur(3px)"}}>
                        <h4 className="text-black p-3 mb-0"><a href="/temperature" className="text-decoration-none stretched-link text-reset">Temperature</a></h4>
                    </button>
                    <button type="button" className="btn btn-light border border-3 border-black rounded-2 position-relative shadow menuButton" style={{ backgroundColor: "rgba(255, 255, 255, 0.8)", backdropFilter: "blur(3px)"}}>
                        <h4 className="text-black p-3 mb-0"><a href="/humidity" className="text-decoration-none stretched-link text-reset">Humidity</a></h4>
                    </button>
                    <button type="button" className="btn btn-light border border-3 border-black rounded-2 position-relative shadow menuButton" style={{ backgroundColor: "rgba(255, 255, 255, 0.8)", backdropFilter: "blur(3px)"}}>
                        <h4 className="text-black p-3 mb-0"><a href="/rain" className="text-decoration-none stretched-link text-reset">Rain</a></h4>
                    </button>
                    <button type="button" className="btn btn-light border border-3 border-black rounded-2 position-relative shadow menuButton" style={{ backgroundColor: "rgba(255, 255, 255, 0.8)", backdropFilter: "blur(3px)"}}>
                        <h4 className="text-black p-3 mb-0"><a href="/wind" className="text-decoration-none stretched-link text-reset">Wind</a></h4>
                    </button>
                    <button type="button" className="btn btn-light border border-3 border-black rounded-2 position-relative shadow menuButton" style={{ backgroundColor: "rgba(255, 255, 255, 0.8)", backdropFilter: "blur(3px)"}}>
                        <h4 className="text-black p-3 mb-0"><a href="/pressure" className="text-decoration-none stretched-link text-reset">Pressure</a></h4>
                    </button>
                    <button type="button" className="btn btn-light border border-3 border-black rounded-2 position-relative shadow menuButton" style={{ backgroundColor: "rgba(255, 255, 255, 0.8)", backdropFilter: "blur(3px)"}}>
                        <h4 className="text-black p-3 mb-0"><a href="/upload_dataset" className="text-decoration-none stretched-link text-reset">Dataset</a></h4>
                    </button>
                </div>
            </div>
        </main>
    );
}
export default Home;
