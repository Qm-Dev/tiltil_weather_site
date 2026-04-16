import { parseISO } from "date-fns";
import { useState } from 'react';

// Assets (.svg imports)
import TemperatureHot from '../../assets/temperature-hot.svg';
import TemperatureAverage from '../../assets/temperature-average.svg';
import TemperatureCold from '../../assets/temperature-cold.svg';
import Heatwave from '../../assets/heatwave.svg';
import Frost from '../../assets/frost.svg';
import Snowflake from '../../assets/snowflake.svg';
import Fire from '../../assets/fire.svg';

// Charts
import { LastPeriodHoursTemperatureChart, LastPeriodDaysTemperatureChart, MovingAvgChart } from "./charts";

// Components
import DaysHotCold from './DaysHotCold';

export default function LatestRecordedStats({latestData, latestHeatwave, latestFrost, latestMaxMin, last12HoursData, last24HoursData, lastWeekData, last30DaysData, hotColdLastWeekCount, hotColdLast30DaysCount, movingAvgLast30Days}) {

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const heatwaveEndDate = latestHeatwave ? new Date(latestHeatwave.end) : null;
    const frostEndDate = latestFrost ? new Date(latestFrost.end) : null;

    const isRecentHeatwave = heatwaveEndDate && heatwaveEndDate >= thirtyDaysAgo;
    const isRecentFrost = frostEndDate && frostEndDate >= thirtyDaysAgo;

    const [period, setPeriod] = useState("Last 24 Hours");
    const currentData = {
        "Last 12 Hours": last12HoursData,
        "Last 24 Hours": last24HoursData,
        "Last 7 Days": lastWeekData,
        "Last 30 Days": last30DaysData
    }[period];
    const currentCount = period === "Last 30 Days" ? hotColdLast30DaysCount : hotColdLastWeekCount;

    return (
        <div className="row justify-content-center w-75 gap-3 mx-auto">
            <h1 className="mt-3 mb-0 fw-bold text-black">Latest Recorded Stats</h1>
            <div className="text-danger col-12 col-sm-3 border border-2 border-black rounded-3" style={{backgroundColor: "white"}}>
                <img src={TemperatureHot} alt="Max Temperature" className="mt-1 w-25" />
                <h2 className="fw-bold">{latestData?.max} °C</h2>
                <h4>{parseISO(latestData?.date).toLocaleDateString("es-CL", { hour: "2-digit", minute: "2-digit" , hour12: false })}</h4>
            </div>
            <div className="text-black col-12 col-sm-3 border border-2 border-black rounded-3" style={{backgroundColor: "white"}}>
                <img src={TemperatureAverage} alt="Average Temperature" className="mt-1 w-25" />
                <h2 className="fw-bold">{latestData?.temp} °C</h2>
                <h4>{parseISO(latestData?.date).toLocaleDateString("es-CL", { hour: "2-digit", minute: "2-digit" , hour12: false })}</h4>
            </div>
            <div className="text-primary col-12 col-sm-3 border border-2 border-black rounded-3" style={{backgroundColor: "white"}}>
                <img src={TemperatureCold} alt="Min Temperature" className="mt-1 w-25" />
                <h2 className="fw-bold">{latestData?.min} °C</h2>
                <h4>{parseISO(latestData?.date).toLocaleDateString("es-CL", { hour: "2-digit", minute: "2-digit" , hour12: false })}</h4>
            </div>
            <div className="col-12 col-sm-4 border border-2 border-black rounded-3 text-black" style={{backgroundColor: "white"}}>
                <img src={Fire} alt="Max Temperature" className="mt-1 mb-2" />
                <h2 className="fw-bold">Max. Temp</h2>
                <h4>{latestMaxMin?.max} °C</h4>
                <h5>{parseISO(latestMaxMin?.date_max).toLocaleDateString("es-CL", { hour: "2-digit", minute: "2-digit" , hour12: false })}</h5>
            </div>
            <div className="col-12 col-sm-4 border border-2 border-black rounded-3 text-black" style={{backgroundColor: "white"}}>
                <img src={Snowflake} alt="Min Temperature" className="mt-1 mb-2" />
                <h2 className="fw-bold">Min. Temp</h2>
                <h4>{latestMaxMin?.min} °C</h4>
                <h5>{parseISO(latestMaxMin?.date_min).toLocaleDateString("es-CL", { hour: "2-digit", minute: "2-digit" , hour12: false })}</h5>
            </div>
            <h3 className="fw-bold text-black">Today's Temperature Range: {(latestMaxMin?.max - latestMaxMin?.min).toFixed(1)} °C</h3>
            <div className="col-12 col-sm-4 border border-2 border-black rounded-3" style={{backgroundColor: '#fc8e34', color: '#0F0F0F'}}>
                <img src={Heatwave} alt="Heatwave" className="mt-1 w-25" />
                {isRecentHeatwave  ? (
                <>
                    <h2 className="fw-bold">Heatwave</h2>
                    <h5 className="fst-normal">Started: {parseISO(latestHeatwave?.start).toLocaleDateString("es-CL", { hour: "2-digit", minute: "2-digit" , hour12: false })}</h5>
                    <h5 className="fst-normal">Ended: {parseISO(latestHeatwave?.end).toLocaleDateString("es-CL", { hour: "2-digit", minute: "2-digit" , hour12: false })}</h5>
                    <h5 className="fst-normal">Hi. Temp: {latestHeatwave?.max_temp_reached} °C</h5>
                </>):
                (
                <>
                    <h2 className="fw-bold">Heatwave</h2>
                    <h4>The weather station did not record any heatwaves in the last 30 days.</h4>
                </>
                )}
            </div>
            <div className="col-12 col-sm-4 border border-2 border-black rounded-3" style={{backgroundColor: '#3d91ff', color: '#0F0F0F'}}>
                <img src={Frost} alt="Frost" className="mt-1 w-25" />
                {isRecentFrost ? (
                <>
                    <h2 className="fw-bold">Frost</h2>
                    <h5 className="fst-normal">Started: {parseISO(latestFrost?.start).toLocaleDateString("es-CL", { hour: "2-digit", minute: "2-digit" , hour12: false })}</h5>
                    <h5 className="fst-normal">Ended: {parseISO(latestFrost?.end).toLocaleDateString("es-CL", { hour: "2-digit", minute: "2-digit" , hour12: false })}</h5>
                    <h5 className="fst-normal">Low Temp: {latestFrost?.min_temp_reached} °C</h5>
                </>):
                (
                <>
                    <h2 className="fw-bold">Frost</h2>
                    <h4>The weather station did not record any frosts in the last 30 days.</h4>
                </>
                )}
            </div>
            <h1 className="mt-3 fw-bold text-black">Overview</h1>
            <div className="dropdown">
                <button className="btn dropdown-toggle fs-3 fw-bold text-black bg-transparent border-0 p-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {period} Stats
                </button>
                <ul className="dropdown-menu">
                    <li>
                        <button className="dropdown-item" onClick={() => setPeriod('Last 12 Hours')}>
                            Last 12 Hours
                        </button>
                    </li>
                    <li>
                        <button className="dropdown-item" onClick={() => setPeriod('Last 24 Hours')}>
                            Last 24 Hours
                        </button>
                    </li>
                    <li>
                        <button className="dropdown-item" onClick={() => setPeriod('Last 7 Days')}>
                            Last 7 Days
                        </button>
                    </li>
                    <li>
                        <button className="dropdown-item" onClick={() => setPeriod('Last 30 Days')}>
                            Last 30 Days
                        </button>
                    </li>
                </ul>
            </div>
            {/* Dynamic Content */}
            {period === "Last 24 Hours" || period === "Last 12 Hours" ? (
                <LastPeriodHoursTemperatureChart data={currentData} period={period} />
            ) : (
                <>
                    <LastPeriodDaysTemperatureChart data={currentData} period={period} />
                    <DaysHotCold hotColdCount={currentCount} />
                </>
            )}
            <h1 className="mt-3 fw-bold text-black">Moving Averages</h1>
            <MovingAvgChart data={movingAvgLast30Days} />
        </div>
    );
}