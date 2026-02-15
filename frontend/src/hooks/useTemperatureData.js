import { useEffect, useState } from "react";
import {
  getYearlyTemperature,
  getMonthlyTemperature,
  getDailyTemperature,
  getAnniversaryTimestampComparison,
  getHottestRecord,
  getColdestRecord,
  getLatestRecord,
  getLongestFrost,
  getLongestHeatwave,
  getLatestHeatwave,
  getLatestMaxMin
} from "../services/temperatureService";
import { parseISO } from "date-fns";

export const useTemperatureData = () => {
  const [loading, setLoading] = useState(true);

  const [yearly, setYearly] = useState({});
  const [monthly, setMonthly] = useState({});
  const [daily, setDaily] = useState({});
  const [anniversary, setAnniversary] = useState({});

  const [hottestRecord, setHottestRecord] = useState(null);
  const [coldestRecord, setColdestRecord] = useState(null);
  
  const [latestRecord, setLatestRecord] = useState(null);
  const [latestHeatwave, setLatestHeatwave] = useState(null);
  const [longestFrost, setLongestFrost] = useState(null);
  const [longestHeatwave, setLongestHeatwave] = useState(null);
  const [latestMaxMin, setLatestMaxMin] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const yearlyData = await getYearlyTemperature();
        setYearly({
          labels: yearlyData.map(d => d.date),
          values: yearlyData.map(d => d.avg_temp)
        });

        const monthlyData = await getMonthlyTemperature();
        setMonthly({
          labels: monthlyData.map(d => d.date),
          values: monthlyData.map(d => d.avg_temp)
        });

        const dailyData = await getDailyTemperature();
        setDaily({
          labels: dailyData.map(d => d.date),
          values: dailyData.map(d => d.avg_temp)
        });

        const anniversaryData = await getAnniversaryTimestampComparison();
        setAnniversary({
          labels: anniversaryData.map(d => d.date),
          avg: anniversaryData.map(d => d.avg_temp),
          max: anniversaryData.map(d => d.hi_temp),
          min: anniversaryData.map(d => d.low_temp)
        });

        const hottestRecordData = await getHottestRecord();
        setHottestRecord({
          date: parseISO(hottestRecordData.date).toLocaleDateString("es-CL", { hour: "2-digit", minute: "2-digit" , hour12: false }),
          temp: hottestRecordData.max_temp
        });

        const coldestRecordData = await getColdestRecord();
        setColdestRecord({
          date: parseISO(coldestRecordData.date).toLocaleDateString("es-CL", { hour: "2-digit", minute: "2-digit" , hour12: false }),
          temp: coldestRecordData.min_temp
        });

        const latestRecordData = await getLatestRecord();
        setLatestRecord({
          date: parseISO(latestRecordData.date).toLocaleDateString("es-CL", { hour: "2-digit", minute: "2-digit" , hour12: false }),
          temp: latestRecordData.avg_temp,
          max: latestRecordData.hi_temp,
          min: latestRecordData.low_temp
        });

        const latestHeatwaveData = await getLatestHeatwave();
        setLatestHeatwave({
          start: parseISO(latestHeatwaveData.heatwave_start).toLocaleDateString("es-CL", { hour: "2-digit", minute: "2-digit" , hour12: false }),
          end: parseISO(latestHeatwaveData.heatwave_end).toLocaleDateString("es-CL", { hour: "2-digit", minute: "2-digit" , hour12: false }),
          duration: latestHeatwaveData.duration,
          max_temp_reached: latestHeatwaveData.max_temp_reached
        });

        const longestFrostData = await getLongestFrost();
        setLongestFrost({
          start: parseISO(longestFrostData.frost_start).toLocaleDateString("es-CL", { hour: "2-digit", minute: "2-digit" , hour12: false }),
          end: parseISO(longestFrostData.frost_end).toLocaleDateString("es-CL", { hour: "2-digit", minute: "2-digit" , hour12: false }),
          duration: longestFrostData.duration,
          min_temp_reached: longestFrostData.min_temp_reached
        });

        const longestHeatwaveData = await getLongestHeatwave();
        setLongestHeatwave({
          start: parseISO(longestHeatwaveData.heatwave_start).toLocaleDateString("es-CL", { hour: "2-digit", minute: "2-digit" , hour12: false }),
          end: parseISO(longestHeatwaveData.heatwave_end).toLocaleDateString("es-CL", { hour: "2-digit", minute: "2-digit" , hour12: false }),
          duration: longestHeatwaveData.duration,
          max_temp_reached: longestHeatwaveData.max_temp_reached
        });

        const latestMaxMinData = await getLatestMaxMin();
        setLatestMaxMin({
          date_max: parseISO(latestMaxMinData.date_max).toLocaleDateString("es-CL", { hour: "2-digit", minute: "2-digit" , hour12: false }),
          max: latestMaxMinData.max,
          date_min: parseISO(latestMaxMinData.date_min).toLocaleDateString("es-CL", { hour: "2-digit", minute: "2-digit" , hour12: false }),
          min: latestMaxMinData.min
        });

      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return { loading, yearly, monthly, daily, anniversary, hottestRecord, coldestRecord, latestRecord, longestFrost, longestHeatwave, latestHeatwave, latestMaxMin };
};