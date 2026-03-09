// Hooks
import { useTemperatureData } from '../hooks/useTemperatureData.js';

// Components
import LoadingTemperature from '../components/temperature/LoadingTemperature.jsx';
import LatestRecordedStats from '../components/temperature/LatestRecordedStats.jsx';
import LatestTemperatureAndPrevYearsChart from '../components/temperature/LatestTemperatureAndPrevYearsChart.jsx';
import YearlyAvgTemperatureChart from '../components/temperature/YearlyAvgTemperatureChart.jsx';
import MonthlyAvgTemperatureChart from '../components/temperature/MonthlyAvgTemperatureChart.jsx';
import DailyAvgTemperatureChart from '../components/temperature/DailyAvgTemperatureChart.jsx';
import OverallTemperatureStats from '../components/temperature/OverallTemperatureStats.jsx';

const Temperature = () => {
  const { loading, yearly, monthly, daily,
          lastWeek, last30Days, anniversary, hottestRecord, coldestRecord,
          latestRecord, longestFrost, latestFrost, longestHeatwave,
          latestHeatwave, latestMaxMin } = useTemperatureData();

    if (loading) return (
      <LoadingTemperature />
    );

    return (
      <main style={{backgroundColor: "#A6D0F2", minHeight: "100vh"}}>
        <div className="container text-center">
            {/* Latest Recorded Stats */}
            <LatestRecordedStats latestData={latestRecord} latestHeatwave={latestHeatwave} latestFrost={latestFrost} latestMaxMin={latestMaxMin} lastWeekData={lastWeek} last30DaysData={last30Days} />
            <div className="row justify-content-center">
              <h1 className="mt-3 fw-bold text-black">Current Temperature Compared To Previous Years</h1>
              <div className="col-12 mt-3">
                <LatestTemperatureAndPrevYearsChart data={anniversary}/>
              </div>
            </div>
            <h1 className="mt-3 mb-3 fw-bold text-black">Temperature Evolution</h1>
            {/* Avg Temperature Charts */}
            <div className="row justify-content-center">
              <div className="col-12 col-xl-6">
                <YearlyAvgTemperatureChart data={yearly} />
              </div>
              <div className="col-12 col-xl-6 mt-3 mt-xl-0">
                <MonthlyAvgTemperatureChart data={monthly} />
              </div>
              <div className="col-12 mt-3">
                <DailyAvgTemperatureChart data={daily} />
              </div>
            </div>
            <h1 className="mt-3 mb-3 fw-bold text-black">Overall Stats</h1>
            <OverallTemperatureStats hottestRecord={hottestRecord} coldestRecord={coldestRecord} longestFrost={longestFrost} longestHeatwave={longestHeatwave} />
        </div>
      </main>
    );
}
export default Temperature;