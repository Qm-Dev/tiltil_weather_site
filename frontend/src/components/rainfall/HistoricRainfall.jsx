import { useState } from 'react';
import { TotalRainfall } from "./charts";

export default function HistoricRainfall({ yearly, monthly }) {
    const [evolutionTimespan, setEvolutionTimespan] = useState("Yearly");
    const currentData = evolutionTimespan === "Yearly" ? yearly : monthly;

    return (
        <>
            <h1 className="fw-bold text-black mt-3">Historic Rainfall Data</h1>
            <div className="dropdown">
                <button className="btn dropdown-toggle fs-3 fw-bold text-black bg-transparent border-0 p-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
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
                </ul>
            </div>
            <div className="row justify-content-center">
                <div className="col-12">
                    {evolutionTimespan === "Yearly" && <TotalRainfall data={currentData} x_label="Year" />}
                    {evolutionTimespan === "Monthly" && <TotalRainfall data={currentData} x_label="Year & Month (YYYY-MM)" />}
                </div>
            </div>
        </>
    );
}
