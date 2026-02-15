import TemperatureHot from '../../assets/temperature-hot.svg';
import TemperatureAverage from '../../assets/temperature-average.svg';
import TemperatureCold from '../../assets/temperature-cold.svg';
import Heatwave from '../../assets/heatwave.svg';
import Frost from '../../assets/frost.svg';

export default function LatestRecordedStats({latestData, latestHeatwave, latestMaxMin}) {

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const heatwaveEndDate = latestHeatwave ? new Date(latestHeatwave.end) : null;

    const isRecentHeatwave = heatwaveEndDate && heatwaveEndDate >= thirtyDaysAgo;

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
        <div className="col-12 col-sm-4 border border-2 border-black rounded-3">
            <h2>Max. Temp</h2>
            <h4>{latestMaxMin?.max} °C</h4>
            <h4>{latestMaxMin?.date_max}</h4>
        </div>
        <div className="col-12 col-sm-4 border border-2 border-black rounded-3">
            <h2>Min. Temp</h2>
            <h4>{latestMaxMin?.min} °C</h4>
            <h4>{latestMaxMin?.date_min}</h4>
        </div>
        <div className="col-12 col-sm-4 border border-2 border-black rounded-3" style={{backgroundColor: '#FF811A', color: '#0F0F0F'}}>
            <img src={Heatwave} alt="Heatwave" className="mt-1 w-25" />
            {isRecentHeatwave  ? (
            <>
                <h2 className="fw-bold">Heatwave</h2>
                <h5 className="fst-normal">Started: {latestHeatwave?.start}</h5>
                <h5 className="fst-normal">Ended: {latestHeatwave?.end}</h5>
                <h5 className="fst-normal">Hi. Temp: {latestHeatwave?.max_temp_reached} °C</h5>
            </>):
            (
            <>
                <h2 className="fw-bold">Heatwave</h2>
                <h4>No heatwaves were recorded in the last 30 days.</h4>
            </>
            )}
        </div>
        <div className="col-12 col-sm-4 border border-2 border-black rounded-3" style={{backgroundColor: '#77D8F9', color: '#0F0F0F'}}>
            <img src={Frost} alt="Frost" className="mt-1 w-25" />
            <h2 className="fw-bold">Frost</h2>
            <h4>No frosts were recorded in the last 30 days.</h4>
        </div>
        </div>
    );
}