import { parseISO } from "date-fns";

// Assets
import Compass from '../../assets/compass.svg';
import WindRun from '../../assets/wind_run.svg';

export default function LatestRecordedStats({ latestRecord }) {
    return (
        <>
        <div className="row text-center justify-content-center mx-auto gap-2 w-75">
            <h1 className="fw-bold text-black mt-3">Latest Recorded Stats</h1>
            <h2 className="text-black">{parseISO(latestRecord.record_date).toLocaleDateString("es-CL", { hour: "2-digit", minute: "2-digit" , hour12: false })}</h2>
            <div className="col-12 col-sm-5 border border-2 border-black rounded-3 text-black" style={{backgroundColor: "white"}}>
                <img src={WindRun} alt="Wind Run" className="m-1" />
                <h2>Wind Speed</h2>
                <h3>{latestRecord.wind_speed} km/h</h3>
            </div>
            <div className="col-12 col-sm-5 border border-2 border-black rounded-3 text-black" style={{backgroundColor: "white"}}>
                <img src={WindRun} alt="Wind Run" className="m-1" />
                <h2>Wind Speed (Highest)</h2>
                <h3>{latestRecord.hi_speed} km/h</h3>
            </div>
            <div className="col-12 col-sm-5 border border-2 border-black rounded-3 text-black" style={{backgroundColor: "white"}}>
                <img src={Compass} alt="Compass" className="m-1" />
                <h2>Wind Direction</h2>
                <h3>{latestRecord.wind_direction}</h3>
            </div>
            <div className="col-12 col-sm-5 border border-2 border-black rounded-3 text-black" style={{backgroundColor: "white"}}>
                <img src={Compass} alt="Compass" className="m-1" />
                <h2>Wind Direction (Highest)</h2>
                <h3>{latestRecord.hi_dir}</h3>
            </div>
            <div className="col-12 col-sm-5 border border-2 border-black rounded-3 text-black" style={{backgroundColor: "white"}}>
                <img src={WindRun} alt="Wind Run" className="m-1" />
                <h2>Wind Run</h2>
                <h3>{latestRecord.wind_run} km</h3>
            </div>
        </div>
        </>
    );
}