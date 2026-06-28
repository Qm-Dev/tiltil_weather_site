import { formatDate } from "../../utils/dateFormatter";
import { format } from "date-fns";

export default function OverallWindStats({ windiestDay }){

    if (!windiestDay || !Array.isArray(windiestDay) || windiestDay.length === 0){
        return null;
    }

    const parsedDate = formatDate(windiestDay[0]?.record_date);
    const readableDate = parsedDate ? format(parsedDate, "do MMMM, yyyy") : null;
    const domDirsAreTheSame = windiestDay[0].dom_wind_dir === windiestDay[0].dom_hi_wind_dir;

    return (
        <>
            <div className="row text-center justify-content-center mx-auto">
                <h1 className="fw-bold text-black mt-3">Overall Stats</h1>
                <div className="row mx-auto align-items-center justify-content-center">
                    <h2 className="fw-bold text-black">Windiest Day</h2>
                    <h5 className="text-black">{readableDate || "Date is not available."}</h5>
                    <div className="col-12 py-2 col-sm-5 border border-2 border-black rounded-3 text-black mb-3" style={{backgroundColor: "white"}}>
                        <h3>{windiestDay[0].total_wind_run || "Wind Run unavailable."}</h3>
                        <h5 className="fw-bold">Total Wind Run (km)</h5>
                        <h3>{windiestDay[0].avg_regular_speed || "---"} ({windiestDay[0].max_regular_speed || "---"})</h3>
                        <h5 className="fw-bold">Avg. Wind Speed (km/h)</h5>
                        <h3>{windiestDay[0].avg_high_speed || "---"} ({windiestDay[0].max_high_speed || "---"})</h3>
                        <h5 className="fw-bold">Max. Wind Speed (km/h)</h5>
                        <h3>{domDirsAreTheSame ? `${windiestDay[0]?.dom_wind_dir ? windiestDay[0].dom_wind_dir : "---"}` : `${windiestDay[0].dom_wind_dir || "---"} (${windiestDay[0].dom_hi_wind_dir || "---"})`}</h3>
                        <h5 className="fw-bold">Wind Direction</h5>
                    </div>
                </div>
            </div>
        </>
    );
}