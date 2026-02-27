// Hooks
import { useHumidityData } from '../hooks/useHumidityData.js';

// Components
import LoadingHumidity from '../components/humidity/LoadingHumidity.jsx';
import YearlyAvgHumidityChart from '../components/humidity/YearlyAvgHumidityChart.jsx';
import MonthlyAvgHumidityChart from '../components/humidity/MonthlyAvgHumidityChart.jsx';

const Humidity = () => {

    const { loading, yearly, monthly } = useHumidityData();

    if (loading) return (
        <LoadingHumidity />
    )

    return (
        <main style={{backgroundColor: "#A6D0F2", minHeight: "100vh"}}>
            <div className="container text-center">
                <h1 className="fw-bold text-black">Humidity</h1>
                <div className="row justify-content-center">
                    <div className="col-12 col-xl-6">
                        <YearlyAvgHumidityChart data={yearly} />
                    </div>
                    <div className="col-12 col-xl-6">
                        <MonthlyAvgHumidityChart data={monthly} />
                    </div>
                </div>
            </div>
        </main>
    );
}
export default Humidity;