import { useState } from 'react';
import { AvgTempEvolutionChart } from "./charts";

export default function TemperatureEvolution({ yearly, monthly, daily }) {

    const [evolutionTimespan, setEvolutionTimespan] = useState("Yearly");
    const currentData = evolutionTimespan === "Yearly" ? yearly : evolutionTimespan === "Monthly" ? monthly : daily;

    return (
        <>
            <h1 className="fw-bold text-black mt-3">Temperature Evolution</h1>
            <div className="dropdown">
                <button className="btn dropdown-toggle fs-3 fw-bold text-black bg-transparent border-0 p-0 mb-3" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {evolutionTimespan}
                </button>
                <ul className="dropdown-menu">
                    <li>
                        <button className="dropdown-item" onClick={() => setEvolutionTimespan('Yearly')}>
                            Yearly
                        </button>
                    </li>
                    <li>
                        <button className="dropdown-item" onClick={() => setEvolutionTimespan('Monthly')}>
                            Monthly
                        </button>
                    </li>
                    <li>
                        <button className="dropdown-item" onClick={() => setEvolutionTimespan('Daily')}>
                            Daily
                        </button>
                    </li>
                </ul>
            </div>
            <div className="row justify-content-center">
                <div className="col-12">
                    {evolutionTimespan === "Yearly" && <AvgTempEvolutionChart data={currentData} x_label="Year" />}
                    {evolutionTimespan === "Monthly" && <AvgTempEvolutionChart data={currentData} x_label="Year & Month (YYYY-MM)" />}
                    {evolutionTimespan === "Daily" && <AvgTempEvolutionChart data={currentData} x_label="Year, Month & Day (YYYY-MM-DD)" />}
                </div>
            </div>
        </>
    );
}