// Hooks
import { useHumidityData } from '../hooks/useHumidityData.js';

// Components
import LoadingHumidity from '../components/humidity/LoadingHumidity.jsx';
import HumidityEvolution from '../components/humidity/HumidityEvolution.jsx';
import LatestRecordedStats from '../components/humidity/LatestRecordedStats.jsx';

const Humidity = () => {

    const { loading, yearly, monthly, daily, last24Hours, latestRecord, latestMaxMin } = useHumidityData();

    if (loading) return (
        <LoadingHumidity />
    )

    return (
        <main style={{backgroundColor: "#A6D0F2", minHeight: "100vh"}}>
            <div className="container text-center justify-content-center">
                <LatestRecordedStats latestRecord={latestRecord} latestMaxMin={latestMaxMin} last24Hours={last24Hours} />
                <HumidityEvolution yearly_data={yearly} monthly_data={monthly} daily_data={daily} />
            </div>
        </main>
    );
}
export default Humidity;