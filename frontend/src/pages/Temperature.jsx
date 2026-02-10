import { useTemperatureData } from '../hooks/useTemperatureData.js';

// Components
import LoadingTemperature from '../components/temperature/LoadingTemperature.jsx';
import LatestRecordedStats from '../components/temperature/LatestRecordedStats.jsx';
import LatestTemperatureYearlyComparisonChart from '../components/temperature/LatestTemperatureYearlyComparisonChart.jsx';
import YearlyAvgTemperatureChart from '../components/temperature/YearlyAvgTemperatureChart.jsx';
import MonthlyAvgTemperatureChart from '../components/temperature/MonthlyAvgTemperatureChart.jsx';
import DailyAvgTemperatureChart from '../components/temperature/DailyAvgTemperatureChart.jsx';
import OverallTemperatureStats from '../components/temperature/OverallTemperatureStats.jsx';

const Temperature = () => {
  const { loading, yearly, monthly, daily, anniversary, hottestRecord, coldestRecord, latestRecord } = useTemperatureData();

    if (loading) return (
      <LoadingTemperature />
    );

    return (
      <div className="container text-center">
          <h1 className="mt-3 mb-3 fw-bold">Latest Recorded Stats</h1>
          <LatestRecordedStats latestData={latestRecord} />
          <div className="row justify-content-center">
            <h1 className="mt-3 fw-bold">Latest Temperature Compared To Previous Years</h1>
            <div className="col-12 mt-3">
              <LatestTemperatureYearlyComparisonChart data={anniversary}/>
            </div>
          </div>
          <h1 className="mt-3 mb-3 fw-bold">Temperature Evolution</h1>
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
          <h1 className="mt-3 mb-3 fw-bold">Overall Stats</h1>
          <OverallTemperatureStats hottestRecord={hottestRecord} coldestRecord={coldestRecord} />
      </div>
);
}
export default Temperature;