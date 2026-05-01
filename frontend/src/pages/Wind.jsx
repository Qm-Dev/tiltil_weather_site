// Hooks
import { useWindData } from '../hooks/useWindData.js';

// Components
import LoadingPage from '../components/LoadingPage.jsx';
import LatestRecordedStats from '../components/wind/LatestRecordedStats.jsx';

const Wind = () => {

    const { loading, latestWind } = useWindData();

    if (loading) return (
        <LoadingPage page={"Wind"} />
    )

    return (
        <main style={{backgroundColor: "#A6D0F2", minHeight: "100vh"}}>
            <div className="container text-center">
                <LatestRecordedStats latestRecord={latestWind} />
            </div>
        </main>
    );
}
export default Wind;