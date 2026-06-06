// Hooks
import { useWindData } from '../hooks/useWindData.js';

// Components
import LoadingPage from '../components/LoadingPage.jsx';
import LatestRecordedStats from '../components/wind/LatestRecordedStats.jsx';
import TotalWindRun from '../components/wind/TotalWindRun.jsx';

const Wind = () => {

    const { loading, latestWind, totalDailyWindRun } = useWindData();

    if (loading) return (
        <LoadingPage page={"Wind"} />
    )

    return (
        <main style={{backgroundColor: "#A6D0F2", minHeight: "100vh"}}>
            <div className="container text-center">
                <LatestRecordedStats latestRecord={latestWind} />
                <TotalWindRun windRunList={totalDailyWindRun} />
            </div>
        </main>
    );
}
export default Wind;