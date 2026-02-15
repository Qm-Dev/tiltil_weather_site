export default function OverallTemperatureStats({ hottestRecord, coldestRecord, longestFrost, longestHeatwave }) {
    return (
        <div className="row justify-content-center w-75 gap-3 mx-auto mb-3">
            <div className="text-danger col-12 col-sm-5 border border-2 border-black rounded-3">
                <h2>🔥</h2>
                <h5>Hottest Record</h5>
                <h2 className="fw-bold">{hottestRecord?.temp}°C</h2>
                <h4 className="fw-light">({hottestRecord?.date})</h4>
            </div>
            <div className="text-primary col-12 col-sm-5 border border-2 border-black rounded-3">
                <h2>❄️</h2>
                <h5>Coldest Record</h5>
                <h2 className="fw-bold">{coldestRecord?.temp}°C</h2>
                <h4 className="fw-light">({coldestRecord?.date})</h4>
            </div>
            <div className="text-primary col-xl-7 col-12 border border-2 border-black rounded-3">
                <h2>🧊</h2>
                <h5>Longest Frost</h5>
                <h2 className="fw-bold">{(longestFrost?.duration)/60/60} hours</h2>
                <h4 className="fw-light">({longestFrost?.start} - {longestFrost?.end})</h4>
            </div>
            <div className="text-danger col-xl-7 col-12 border border-2 border-black rounded-3">
                <h2>♨️</h2>
                <h5>Longest Heatwave</h5>
                <h2 className="fw-bold">{(longestHeatwave?.duration)/60/60} hours</h2>
                <h4 className="fw-light">({longestHeatwave?.start} - {longestHeatwave?.end})</h4>
            </div>
        </div>
    );
}