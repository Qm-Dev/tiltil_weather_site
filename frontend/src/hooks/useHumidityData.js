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
                const [
                    yearlyData,
                    monthlyData,
                    dailyData,
                    last24HoursData,
                    latestRecordData,
                    latestMaxMinData
                ] = await Promise.all([
                    getYearlyHumidity(),
                    getMonthlyHumidity(),
                    getDailyHumidity(),
                    getHumidityLast24Hours(),
                    getLatestHumidityRecord(),
                    getLatestMaxMinHumidity()
                ]);

                setYearly({
                    labels: yearlyData.map(d => d.date),
                    values: yearlyData.map(d => d.avg_hum)
                });

                setMonthly({
                    labels: monthlyData.map(d => d.date),
                    values: monthlyData.map(d => d.avg_hum)
                });

                setDaily({
                    labels: dailyData.map(d => d.date),
                    values: dailyData.map(d => d.avg_hum)
                });

                setLast24Hours({
                    labels: last24HoursData.map(d => d.date),
                    values: last24HoursData.map(d => d.out_hum)
                });

                setLatestRecord({
                    timestamp: latestRecordData.date,
                    humidity: latestRecordData.humidity,
                    dew_point: latestRecordData.dew_point
                });

                setLatestMaxMin({
                    max_timestamp: latestMaxMinData.date_max,
                    max_hum: latestMaxMinData.max_hum,
                    max_dew_point: latestMaxMinData.max_dew_point,
                    min_timestamp: latestMaxMinData.date_min,
                    min_hum: latestMaxMinData.min_hum,
                    min_dew_point: latestMaxMinData.min_dew_point
                });

            } catch (error) {
                console.error("Failed to load humidity data: ", error);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    return { loading, yearly, monthly, daily, last24Hours, latestRecord, latestMaxMin };

}