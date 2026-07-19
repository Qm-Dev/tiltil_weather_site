import { useEffect, useState } from "react";
import { getSunlight } from "../services/solarService";

export const useSolarData = () => {

    const [loading, setLoading] = useState(true);

    const [sunlight, setSunlight] = useState({})

    useEffect(() => {
        const load = async () => {
            try {
                const sunlightData = await getSunlight();
                setSunlight({
                    labels: sunlightData.map(d => d.record_date),
                    values: sunlightData.map(d => d.solar_rad)
                });
            }
            finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    return { loading, sunlight };
}