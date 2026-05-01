import { useState, useEffect } from 'react';
import {
    getLatestPressureRecord
} from '../services/pressureService.js';

export const usePressureData = () => {

    const [loading, setLoading] = useState(true);

    const [latestPressure, setLatestPressure] = useState({})

    useEffect(() => {
        const load = async () => {
            try {
                const latestPressureData = await getLatestPressureRecord();
                setLatestPressure({
                    record_date: latestPressureData.record_date,
                    pressure: latestPressureData.bar
                });
            }
            finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    return { loading, latestPressure };
}