import { useEffect, useState } from "react";
import { getYearlyHumidity, getMonthlyHumidity } from "../services/humidityService";

export const useHumidityData = () => {

    const [loading, setLoading] = useState(true);
    const [yearly, setYearly] = useState({});
    const [monthly, setMonthly] = useState({});

    useEffect(() => {
        const load = async () => {
            try {
                const yearlyData = await getYearlyHumidity();
                setYearly({
                    labels: yearlyData.map(d => d.date),
                    values: yearlyData.map(d => d.avg_hum)
                });
                const monthlyData = await getMonthlyHumidity();
                setMonthly({
                    labels: monthlyData.map(d => d.date),
                    values: monthlyData.map(d => d.avg_humidity)
                });
            }
            finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    return { loading, yearly, monthly };

}