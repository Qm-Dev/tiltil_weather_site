import TemperatureHot from '../../assets/temperature-hot.svg';
import TemperatureAverage from '../../assets/temperature-average.svg';
import TemperatureCold from '../../assets/temperature-cold.svg';
import Heatwave from '../../assets/heatwave.svg';
import Frost from '../../assets/frost.svg';

export default function LatestRecordedStats({latestData}) {
    return (
        <div className="row justify-content-center w-75 gap-3 mx-auto">
        <div className="text-danger col-12 col-sm-3 border border-2 border-black rounded-3">
            <img src={TemperatureHot} alt="Max Temperature" className="mt-1 w-25" />
            <h2 className="fw-bold">{latestData?.max} °C</h2>
            <h4>{latestData?.date}</h4>
        </div>
        <div className="text-black col-12 col-sm-3 border border-2 border-black rounded-3">
            <img src={TemperatureAverage} alt="Average Temperature" className="mt-1 w-25" />
            <h2 className="fw-bold">{latestData?.temp} °C</h2>
            <h4>{latestData?.date}</h4>
        </div>
        <div className="text-primary col-12 col-sm-3 border border-2 border-black rounded-3">
            <img src={TemperatureCold} alt="Min Temperature" className="mt-1 w-25" />
            <h2 className="fw-bold">{latestData?.min} °C</h2>
            <h4>{latestData?.date}</h4>
        </div>
        <div className="text-danger col-12 col-sm-4 border border-2 border-black rounded-3">
            <img src={Heatwave} alt="Heatwave" className="mt-1 w-25" />
            <h4>Last Heatwave</h4>
            <h5>Here - Here</h5>
            <h5>30°C - 35°C</h5>
        </div>
        <div className="text-primary col-12 col-sm-4 border border-2 border-black rounded-3">
            <img src={Frost} alt="Frost" className="mt-1 w-25" />
            <h4>Last Frost</h4>
            <h5>Here - Here</h5>
            <h5>1°C - 2°C</h5>
        </div>
        </div>
    );
}