import { useState, useEffect } from 'react';
import {
    getLatestWindRecord,
    getTotalDailyWindRun,
    getWindiestDay
} from '../services/windService';

export const useWindData = () => {

    const [loading, setLoading] = useState(true);

    const [latestWind, setLatestWind] = useState({});
    const [windiestDay, setWindiestDay] = useState({});
    const [totalDailyWindRun, setTotalDailyWindRun] = useState([]);

    useEffect(() => {
        const load = async () => {
            try {
                const [
                    latestWindData,
                    totalDailyWindRunData,
                    windiestDayData
                ] = await Promise.all([
                    getLatestWindRecord(),
                    getTotalDailyWindRun(),
                    getWindiestDay()
                ]);
                setLatestWind(latestWindData);
                setTotalDailyWindRun(totalDailyWindRunData);
                setWindiestDay(windiestDayData);
            }
            finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    return { loading, latestWind, totalDailyWindRun, windiestDay };
}