import { formatDateTime } from "../../utils/dateFormatter";

export default function OverallTemperatureStats({ hottestRecord, coldestRecord, longestFrost, longestHeatwave }) {

    const hottestRecordDate = formatDateTime(hottestRecord?.date);
    const coldestRecordDate = formatDateTime(coldestRecord?.date);
    const longestFrostStart = formatDateTime(longestFrost?.start);
    const longestFrostEnd = formatDateTime(longestFrost?.end);
    const longestHeatwaveStart = formatDateTime(longestHeatwave?.start);
    const longestHeatwaveEnd = formatDateTime(longestHeatwave?.end)

    return (
        <div className="row justify-content-center w-75 gap-3 mx-auto">
            <div className="text-danger col-12 col-sm-5 border border-2 border-black rounded-3" style={{backgroundColor: "white"}}>
                <h2>🔥</h2>
                <h5>Hottest Record</h5>
                <h2 className="fw-bold">{hottestRecord?.temp}°C</h2>
                <h4 className="fw-light">({hottestRecordDate || "Unknown date"})</h4>
            </div>
            <div className="text-primary col-12 col-sm-5 border border-2 border-black rounded-3" style={{backgroundColor: "white"}}>
                <h2>❄️</h2>
                <h5>Coldest Record</h5>
                <h2 className="fw-bold">{coldestRecord?.temp}°C</h2>
                <h4 className="fw-light">({coldestRecordDate || "Unknown date"})</h4>
            </div>
            <div className="text-primary col-xl-7 col-12 border border-2 border-black rounded-3" style={{backgroundColor: "white"}}>
                <h2>🧊</h2>
                <h5>Longest Frost</h5>
                <h2 className="fw-bold">{(longestFrost?.duration)/60/60} hours</h2>
                <h4 className="fw-light">{(longestFrostStart && longestFrostEnd) ? `(${longestFrostStart} - ${longestFrostEnd})` : "Unknown timeframe"}</h4>
            </div>
            <div className="text-danger col-xl-7 col-12 border border-2 border-black rounded-3 mb-4" style={{backgroundColor: "white"}}>
                <h2>♨️</h2>
                <h5>Longest Heatwave</h5>
                <h2 className="fw-bold">{(longestHeatwave?.duration)/60/60} hours</h2>
                <h4 className="fw-light">{(longestHeatwaveStart && longestHeatwaveEnd) ? `(${longestHeatwaveStart} - ${longestHeatwaveEnd})` : "Unknown timeframe"}</h4>
            </div>
        </div>
    );
}