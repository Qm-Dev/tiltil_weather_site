// Hooks
import { useRainfallData } from '../hooks/useRainfallData.js';

// Components
import LoadingPage from '../components/LoadingPage.jsx';
import HistoricRainfall from '../components/rainfall/HistoricRainfall.jsx';

const Rainfall = () => {

    const { loading, yearly, monthly } = useRainfallData();

    if (loading) return (
        <LoadingPage page={"Rainfall"} />
    )

    return (
        <main style={{backgroundColor: "#A6D0F2", minHeight: "100vh"}}>
            <div className="container text-center">
                <div className="row justify-content-center w-75 gap-3 mx-auto">
                    <HistoricRainfall yearly={yearly} monthly={monthly} />
                </div>
            </div>
        </main>
    );
}
export default Rainfall;