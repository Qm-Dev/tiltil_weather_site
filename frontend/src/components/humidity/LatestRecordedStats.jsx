import { parseISO } from "date-fns";

import { LastPeriodHoursHumidityChart } from "./charts";

export default function LatestRecordedStats({ latestRecord, latestMaxMin, last24Hours }) {
    return (
        <>
        <div className="row text-center justify-content-center mx-auto gap-3 w-75">
            <h1 className="fw-bold text-black mt-3">Latest Recorded Stats</h1>
            <div className="col-12 col-sm-5 border border-2 border-black rounded-3 text-black" style={{backgroundColor: "white"}}>
                <h2>Outside Humidity</h2>
                <h2 className="fw-bold">{latestRecord.humidity}%</h2>
                <h2 className="fs-5">Dew Point: {latestRecord.dew_point}°C</h2>
                <h4>{parseISO(latestRecord.timestamp).toLocaleDateString("es-CL", { hour: "2-digit", minute: "2-digit" , hour12: false })}</h4>
            </div>
        </div>
        <div className="row text-center justify-content-center mx-auto gap-3 w-75 mt-3">
            <div className="col-12 col-sm-5 border border-2 border-black rounded-3 text-black" style={{backgroundColor: 'white'}}>
                <h2>Max. Humidity</h2>
                <h4 className="fw-bold">{latestMaxMin.max_hum}%</h4>
                <h4 className="fs-5">Dew Point: {latestMaxMin.max_dew_point}°C</h4>
                <h5>{parseISO(latestMaxMin.max_timestamp).toLocaleDateString("es-CL", { hour: "2-digit", minute: "2-digit" , hour12: false })}</h5>
            </div>
            <div className="col-12 col-sm-5 border border-2 border-black rounded-3 text-black" style={{backgroundColor: 'white'}}>
                <h2>Min. Humidity</h2>
                <h4 className="fw-bold">{latestMaxMin.min_hum}%</h4>
                <h4 className="fs-5">Dew Point: {latestMaxMin.min_dew_point}°C</h4>
                <h5>{parseISO(latestMaxMin.min_timestamp).toLocaleDateString("es-CL", { hour: "2-digit", minute: "2-digit" , hour12: false })}</h5>
            </div>
            <h3 className="fw-bold text-black">Today's Humidity Range: {latestMaxMin.max_hum - latestMaxMin.min_hum}%</h3>
        </div>
        <div className="row text-center justify-content-center mx-auto gap-3 w-75 mt-3">
            <h1 className="fw-bold text-black">Overview</h1>
            <LastPeriodHoursHumidityChart data={last24Hours} period="Last 24 Hours" />
        </div>
        </>
    );
}