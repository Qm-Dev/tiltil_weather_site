import { useState, useEffect } from 'react';
import {
    getYearlyRainfall,
    getMonthlyRainfall
} from '../services/rainfallService';

export const useRainfallData = () => {

    const [loading, setLoading] = useState(true);

    const [yearly, setYearly] = useState({});
    const [monthly, setMonthly] = useState({});

    useEffect(() => {
        const load = async () => {
            try {
                const yearlyData = await getYearlyRainfall();
                setYearly({
                    labels: yearlyData.map(d => d.date),
                    values: yearlyData.map(d => d.total_rain)
                });
                const monthlyData = await getMonthlyRainfall();
                setMonthly({
                    labels: monthlyData.map(d => d.date),
                    values: monthlyData.map(d => d.total_rain)
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