import { useState } from 'react';

// Charts
import { LastPeriodHoursTemperatureChart, LastPeriodDaysTemperatureChart, MovingAvgChart } from "./charts";

// Components
import DaysHotCold from './DaysHotCold';

export default function Overview({last12HoursData, last24HoursData, lastWeekData, last30DaysData, hotColdLast30DaysCount, hotColdLastWeekCount, movingAvgLast30Days}) {

    const [period, setPeriod] = useState("Last 24 Hours");
    const currentData = {
        "Last 12 Hours": last12HoursData,
        "Last 24 Hours": last24HoursData,
        "Last 7 Days": lastWeekData,
        "Last 30 Days": last30DaysData
    }[period];
    const currentCount = period === "Last 30 Days" ? hotColdLast30DaysCount : hotColdLastWeekCount;

    return (
        <>
            <div>
                <h1 className="mt-3 fw-bold text-black">Overview</h1>
                <div className="dropdown">
                    <button className="btn dropdown-toggle fs-3 fw-bold text-black bg-transparent border-0 p-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {period} Stats
                    </button>
                    <ul className="dropdown-menu">
                        <li>
                            <button className="dropdown-item" onClick={() => setPeriod('Last 12 Hours')}>Last 12 Hours</button>
                        </li>
                        <li>
                            <button className="dropdown-item" onClick={() => setPeriod('Last 24 Hours')}>Last 24 Hours</button>
                        </li>
                        <li>
                            <button className="dropdown-item" onClick={() => setPeriod('Last 7 Days')}>Last 7 Days</button>
                        </li>
                        <li>
                            <button className="dropdown-item" onClick={() => setPeriod('Last 30 Days')}>Last 30 Days</button>
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
        </>
    );
}