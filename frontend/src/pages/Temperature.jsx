// Hooks
import { useTemperatureData } from '../hooks/useTemperatureData.js';

// Components
import { LatestTemperatureAndPrevYearsChart } from '../components/temperature/charts';
import LoadingTemperature from '../components/temperature/LoadingTemperature.jsx';
import LatestRecordedStats from '../components/temperature/LatestRecordedStats.jsx';
import OverallTemperatureStats from '../components/temperature/OverallTemperatureStats.jsx';
import TemperatureEvolution from '../components/temperature/TemperatureEvolution.jsx';

const Temperature = () => {
  const { loading, yearly, monthly, daily, last12Hours, last24Hours,
          lastWeek, last30Days, anniversary, hottestRecord, coldestRecord,
          latestRecord, longestFrost, latestFrost, longestHeatwave, latestHeatwave,
          latestMaxMin, hotColdLastWeekCount, hotColdLast30DaysCount } = useTemperatureData();

  if (loading) return (
    <LoadingTemperature />
  );

  return (
    <main style={{backgroundColor: "#A6D0F2", minHeight: "100vh"}}>
      <div className="container text-center">
          {/* Latest Recorded Stats */}
          <LatestRecordedStats latestData={latestRecord} latestHeatwave={latestHeatwave} latestFrost={latestFrost} latestMaxMin={latestMaxMin} last12HoursData={last12Hours} last24HoursData={last24Hours} lastWeekData={lastWeek}
          last30DaysData={last30Days} hotColdLastWeekCount={hotColdLastWeekCount} hotColdLast30DaysCount={hotColdLast30DaysCount} />
          <div className="row justify-content-center">
            <h1 className="mt-3 fw-bold text-black">Current Temperature Compared To Previous Years</h1>
            <div className="col-12 mt-3">
              <LatestTemperatureAndPrevYearsChart data={anniversary}/>
            </div>
          </div>
          <TemperatureEvolution yearly={yearly} monthly={monthly} daily={daily} />
          <h1 className="mt-3 mb-3 fw-bold text-black">Overall Stats</h1>
          <OverallTemperatureStats hottestRecord={hottestRecord} coldestRecord={coldestRecord} longestFrost={longestFrost} longestHeatwave={longestHeatwave} />
      </div>
    </main>
  );
}
export default Temperature;