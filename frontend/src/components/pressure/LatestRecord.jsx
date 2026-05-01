import { parseISO } from "date-fns";

import Barometer from "../../assets/barometer.svg";

export default function LatestRecord({ latestRecord }) {
    return (
        <>
        <div className="row text-center justify-content-center mx-auto gap-2 w-75">
            <h1 className="fw-bold text-black mt-3">Latest Record</h1>
            <h2 className="text-black">{parseISO(latestRecord.record_date).toLocaleDateString("es-CL", { hour: "2-digit", minute: "2-digit" , hour12: false })}</h2>
            <div className="col-12 col-sm-5 border border-2 border-black rounded-3 text-black" style={{backgroundColor: "white"}}>
                <img src={Barometer} className="mt-1" />
                <h2>Pressure</h2>
                <h3>{latestRecord.pressure} hPa</h3>
            </div>
        </div>
        </>
    );
}