import { formatDateTime } from "../../utils/dateFormatter";

import { LastPeriodHoursHumidityChart } from "./charts";

export default function LatestRecordedStats({ latestRecord, latestMaxMin, last24Hours }) {

    // Dates
    const parsedDateLatestRecord = formatDateTime(latestRecord.timestamp);
    const parsedDateMaxHumidity = formatDateTime(latestMaxMin.max_timestamp);
    const parsedDateMinHumidity = formatDateTime(latestMaxMin.min_timestamp);

    return (
        <>
            <div className="row text-center justify-content-center mx-auto gap-3 w-75">
                <h1 className="fw-bold text-black mt-3">Latest Recorded Stats</h1>
                <div className="col-12 col-sm-5 border border-2 border-black rounded-3 text-black" style={{backgroundColor: "white"}}>
                    <h2>Outside Humidity</h2>
                    <h2 className="fw-bold">{`${latestRecord.humidity}%` || "Unknown"}</h2>
                    <h2 className="fs-5">Dew Point: {`${latestRecord.dew_point} °C` || "Unknown"}</h2>
                    <h4>{parsedDateLatestRecord || "Date is not available."}</h4>
                </div>
            </div>
            <div className="row text-center justify-content-center mx-auto gap-3 w-75 mt-3">
                <div className="col-12 col-sm-5 border border-2 border-black rounded-3 text-black" style={{backgroundColor: 'white'}}>
                    <h2>Max. Humidity</h2>
                    <h4 className="fw-bold">{`${latestMaxMin.max_hum}%` || "Unknown"}</h4>
                    <h4 className="fs-5">Dew Point: {`${latestMaxMin.max_dew_point} °C` || "Unknown"}</h4>
                    <h5>{parsedDateMaxHumidity || "Date is not available."}</h5>
                </div>
                <div className="col-12 col-sm-5 border border-2 border-black rounded-3 text-black" style={{backgroundColor: 'white'}}>
                    <h2>Min. Humidity</h2>
                    <h4 className="fw-bold">{`${latestMaxMin.min_hum}%` || "Unknown"}</h4>
                    <h4 className="fs-5">Dew Point: {`${latestMaxMin.min_dew_point} °C` || "Unknown"}</h4>
                    <h5>{parsedDateMinHumidity || "Date is not available."}</h5>
                </div>
                <h3 className="fw-bold text-black">Relative Humidity Range: {(latestMaxMin?.max_hum && latestMaxMin?.min_hum) ? `${latestMaxMin.max_hum - latestMaxMin.min_hum}%` : "N/A"}</h3>
            </div>
            <div className="row text-center justify-content-center mx-auto gap-3 w-75 mt-3">
                <h1 className="fw-bold text-black">Overview</h1>
                    <LastPeriodHoursHumidityChart data={last24Hours} period="Last 24 Hours" />
            </div>
        </>
    );
}