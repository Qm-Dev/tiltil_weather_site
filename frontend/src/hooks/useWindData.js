import { useState, useEffect } from 'react';
import {
    getLatestWindRecord
} from '../services/windService';

export const useWindData = () => {

    const [loading, setLoading] = useState(true);

    const [latestWind, setLatestWind] = useState({})

    useEffect(() => {
        const load = async () => {
            try {
                const latestWindData = await getLatestWindRecord();
                setLatestWind({
                    record_date: latestWindData.record_date,
                    wind_speed: latestWindData.wind_speed,
                    wind_direction: latestWindData.wind_direction,
                    wind_run: latestWindData.wind_run,
                    hi_speed: latestWindData.hi_speed,
                    hi_dir: latestWindData.hi_dir
                });
            }
            finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    return { loading, latestWind };
}