import { useState, useEffect } from 'react';
import {
    getLatestWindRecord,
    getTotalDailyWindRun
} from '../services/windService';

export const useWindData = () => {

    const [loading, setLoading] = useState(true);

    const [latestWind, setLatestWind] = useState({});
    const [totalDailyWindRun, setTotalDailyWindRun] = useState([]);

    useEffect(() => {
        const load = async () => {
            try {
                const latestWindData = await getLatestWindRecord();
                setLatestWind(latestWindData);

                const totalDailyWindRunData = await getTotalDailyWindRun();
                setTotalDailyWindRun(totalDailyWindRunData);

            }
            finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    return { loading, latestWind, totalDailyWindRun };
}