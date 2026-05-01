import { usePressureData } from '../hooks/usePressureData.js'

// Components
import LoadingPage from '../components/LoadingPage.jsx'
import LatestRecord from '../components/pressure/LatestRecord.jsx';

const Pressure = () => {

    const { loading, latestPressure } = usePressureData();

    if (loading) return (
        <LoadingPage page={"Pressure"} />
    )

    return (
        <main style={{backgroundColor: "#A6D0F2", minHeight: "100vh"}}>
            <div className="container text-center">
                <LatestRecord latestRecord={latestPressure} />
            </div>
        </main>
    );
}
export default Pressure;