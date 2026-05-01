import { useEffect, useState } from "react";
import {
    getYearlyHumidity,
    getMonthlyHumidity,
    getDailyHumidity,
    getHumidityLast24Hours,
    getLatestHumidityRecord,
    getLatestMaxMinHumidity
} from "../services/humidityService";

export const useHumidityData = () => {

    const [loading, setLoading] = useState(true);

    const [yearly, setYearly] = useState({});
    const [monthly, setMonthly] = useState({});
    const [daily, setDaily] = useState({});

    const [last24Hours, setLast24Hours] = useState({});
    const [latestRecord, setLatestRecord] = useState({});
    const [latestMaxMin, setLatestMaxMin] = useState({});

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
                    values: monthlyData.map(d => d.avg_hum)
                });
                const dailyData = await getDailyHumidity();
                setDaily({
                    labels: dailyData.map(d => d.date),
                    values: dailyData.map(d => d.avg_hum)
                });
                const last24HoursData = await getHumidityLast24Hours();
                setLast24Hours({
                    labels: last24HoursData.map(d => d.date),
                    values: last24HoursData.map(d => d.out_hum)
                });
                const latestRecordData = await getLatestHumidityRecord();
                setLatestRecord({
                    timestamp: latestRecordData.date,
                    humidity: latestRecordData.humidity,
                    dew_point: latestRecordData.dew_point
                });
                const latestMaxMinData = await getLatestMaxMinHumidity();
                setLatestMaxMin({
                    max_timestamp: latestMaxMinData.date_max,
                    max_hum: latestMaxMinData.max_hum,
                    max_dew_point: latestMaxMinData.max_dew_point,
                    min_timestamp: latestMaxMinData.date_min,
                    min_hum: latestMaxMinData.min_hum,
                    min_dew_point: latestMaxMinData.min_dew_point
                });

            }
            finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    return { loading, yearly, monthly, daily, last24Hours, latestRecord, latestMaxMin };

}