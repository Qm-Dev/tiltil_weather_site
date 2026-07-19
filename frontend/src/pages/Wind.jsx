// Hooks
import { useWindData } from '../hooks/useWindData.js';

// Components
import LoadingPage from '../components/LoadingPage.jsx';
import LatestRecordedStats from '../components/wind/LatestRecordedStats.jsx';
import TotalWindRun from '../components/wind/TotalWindRun.jsx';
import OverallWindStats from '../components/wind/OverallWindStats.jsx';

const Wind = () => {

    const { loading, latestWind, totalDailyWindRun, windiestDay } = useWindData();

    if (loading) return (
        <>
            <title>Til-Til Weather Site | Wind</title>
            <LoadingPage page={"Wind"} />
        </>
    )

    return (
        <>
            <title>Til-Til Weather Site | Wind</title>
            <main style={{backgroundColor: "#A6D0F2", minHeight: "100vh"}}>
                <div className="container text-center">
                    <LatestRecordedStats latestRecord={latestWind} />
                    <TotalWindRun windRunList={totalDailyWindRun} />
                    <OverallWindStats windiestDay={windiestDay} />
                </div>
            </main>
        </>
    );
}
export default Wind;