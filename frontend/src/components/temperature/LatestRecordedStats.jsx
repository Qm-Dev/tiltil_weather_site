// Utils
import { formatDateTime, formatTime } from "../../utils/dateFormatter.js";

// Assets
import TemperatureHot from '../../assets/temperature-hot.svg';
import TemperatureAverage from '../../assets/temperature-average.svg';
import TemperatureCold from '../../assets/temperature-cold.svg';
import Heatwave from '../../assets/heatwave.svg';
import Frost from '../../assets/frost.svg';
import Snowflake from '../../assets/snowflake.svg';
import Fire from '../../assets/fire.svg';

export default function LatestRecordedStats({latestData, latestHeatwave, latestFrost, latestMaxMin, predictedTemp}) {

    const parsedLatestDate = formatDateTime(latestData?.date)
    const parsedPredictionDate = formatTime(predictedTemp?.next_record_date);
    const parsedLatestMaxDate = formatDateTime(latestMaxMin?.date_max);
    const parsedLatestMinDate = formatDateTime(latestMaxMin?.date_min);
    const parsedHeatwaveStartDate = formatDateTime(latestHeatwave?.start);
    const parsedHeatwaveEndDate = formatDateTime(latestHeatwave?.end);
    const parsedFrostStartDate = formatDateTime(latestFrost?.start);
    const parsedFrostEndDate = formatDateTime(latestFrost?.end);

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const heatwaveEndDate = latestHeatwave ? new Date(latestHeatwave.end) : null;
    const isRecentHeatwave = heatwaveEndDate && heatwaveEndDate >= thirtyDaysAgo;
    const frostEndDate = latestFrost ? new Date(latestFrost.end) : null;
    const isRecentFrost = frostEndDate && frostEndDate >= thirtyDaysAgo;
    const nextTempPred = predictedTemp?.avg_temp_prediction ? predictedTemp.avg_temp_prediction : null;

    return (
        <>
            <div className="row justify-content-center w-75 gap-2 mx-auto">
                <h1 className="mt-3 mb-0 fw-bold text-black">Latest Recorded Stats</h1>
                <div className="text-danger col-12 col-sm-3 border border-2 border-black rounded-3" style={{backgroundColor: "white"}}>
                    <img src={TemperatureHot} alt="Max Temperature" className="mt-1 w-25" />
                    <h2 className="fw-bold">{latestData?.max ? `${latestData.max} °C` : "Unknown"}</h2>
                    <h4>{parsedLatestDate || "Unknown date."}</h4>
                </div>
                <div className="text-black col-12 col-sm-3 border border-2 border-black rounded-3" style={{backgroundColor: "white"}}>
                    <img src={TemperatureAverage} alt="Average Temperature" className="mt-1 w-25" />
                    <h2 className="fw-bold">{latestData?.temp ? `${latestData.temp} °C` : "Unknown"}</h2>
                    <h4>{parsedLatestDate || "Unknown date."}</h4>
                </div>
                <div className="text-primary col-12 col-sm-3 border border-2 border-black rounded-3" style={{backgroundColor: "white"}}>
                    <img src={TemperatureCold} alt="Min Temperature" className="mt-1 w-25" />
                    <h2 className="fw-bold">{latestData?.min ? `${latestData.min} °C` : "Unknown"}</h2>
                    <h4>{parsedLatestDate || "Unknown date."}</h4>
                </div>
                <h3 className="fw-bold text-black fs-5">{(parsedPredictionDate && nextTempPred) ? `Forecast (${parsedPredictionDate}): ${nextTempPred.toFixed(1)} °C` : "Temperature prediction is not currently available."}</h3>
                <div className="col-12 col-sm-4 border border-2 border-black rounded-3 text-black" style={{backgroundColor: "white"}}>
                    <img src={Fire} alt="Max Temperature" className="mt-1 mb-2" />
                    <h2 className="fw-bold">Max. Temp</h2>
                    <h4>{latestMaxMin?.max ? `${latestMaxMin.max} °C` : "Unknown"}</h4>
                    <h5>{parsedLatestMaxDate || "Unknown date."}</h5>
                </div>
                <div className="col-12 col-sm-4 border border-2 border-black rounded-3 text-black" style={{backgroundColor: "white"}}>
                    <img src={Snowflake} alt="Min Temperature" className="mt-1 mb-2" />
                    <h2 className="fw-bold">Min. Temp</h2>
                    <h4>{latestMaxMin?.min ? `${latestMaxMin.min} °C` : "Unknown"}</h4>
                    <h5>{parsedLatestMinDate || "Unknown date."}</h5>
                </div>
                <h3 className="fw-bold text-black fs-5">Temperature range{(latestMaxMin?.max && latestMaxMin.min) ? `: ${(latestMaxMin?.max - latestMaxMin?.min).toFixed(1)} °C` : " is currently unavailable."}</h3>
                <div className="col-12 col-sm-4 border border-2 border-black rounded-3" style={{backgroundColor: '#fc8e34', color: '#0F0F0F'}}>
                    <img src={Heatwave} alt="Heatwave" className="mt-1 w-25" />
                    <h2 className="fw-bold">Heatwave</h2>
                    {isRecentHeatwave  ? (
                    <>
                        <h5 className="fst-normal">Start: {parsedHeatwaveStartDate || "Unknown"}</h5>
                        <h5 className="fst-normal">End: {parsedHeatwaveEndDate || "Unknown"}</h5>
                        <h5 className="fst-normal">Hi. Temp: {latestHeatwave?.max_temp_reached ? `${latestHeatwave.max_temp_reached} °C` : "Unknown"}</h5>
                    </>):
                    (
                    <>
                        <h4>The weather station did not record any heatwaves in the last 30 days.</h4>
                    </>
                    )}
                </div>
                <div className="col-12 col-sm-4 border border-2 border-black rounded-3" style={{backgroundColor: '#3d91ff', color: '#0F0F0F'}}>
                    <img src={Frost} alt="Frost" className="mt-1 w-25" />
                    <h2 className="fw-bold">Frost</h2>
                    {isRecentFrost ? (
                    <>
                        <h5 className="fst-normal">Start: {parsedFrostStartDate || "Unknown"}</h5>
                        <h5 className="fst-normal">End: {parsedFrostEndDate || "Unknown"}</h5>
                        <h5 className="fst-normal">Low Temp: {latestFrost?.min_temp_reached ? `${latestFrost.min_temp_reached} °C` : "Unknown"}</h5>
                    </>):
                    (
                    <>
                        <h4>The weather station did not record any frosts in the last 30 days.</h4>
                    </>
                    )}
                </div>
            </div>
        </>
    );
}