import { useState } from 'react';
import { AvgHumEvolutionChart } from './charts';

export default function HumidityEvolution({yearly_data, monthly_data, daily_data}) {

    const [period, setPeriod] = useState("Yearly");
    const currentData = {
        "Yearly": [yearly_data, "Year"],
        "Monthly": [monthly_data, "Year & Month"],
        "Daily": [daily_data, "Year, Month & Day"]
    }[period];

    return (
        <>
            <div className="row">
                <h1 className="fw-bold text-black mt-3 mb-3">Humidity Evolution</h1>
                <div className="dropdown">
                    <button className="btn dropdown-toggle fs-3 fw-bold text-black bg-transparent border-0 p-0 mb-2" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {period}
                    </button>
                    <ul className="dropdown-menu">
                        <li>
                            <button className="dropdown-item" onClick={() => setPeriod('Yearly')}>
                                Yearly
                            </button>
                        </li>
                        <li>
                            <button className="dropdown-item" onClick={() => setPeriod('Monthly')}>
                                Monthly
                            </button>
                        </li>
                        <li>
                            <button className="dropdown-item" onClick={() => setPeriod('Daily')}>
                                Daily
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="row g-3 mx-auto">
                <div className="col-12 mb-3">
                    <AvgHumEvolutionChart data={currentData[0]} x_label={currentData[1]} />
                </div>
            </div>
        </>
    );

}