import { useEffect, useState } from "react";
import {
  getYearlyTemperature,
  getMonthlyTemperature,
  getDailyTemperature,
  getLastWeekTemperatures,
  getAnniversaryTimestampComparison,
  getHottestRecord,
  getColdestRecord,
  getLatestRecord,
  getLongestFrost,
  getLongestHeatwave,
  getLatestHeatwave,
  getLatestFrost,
  getLatestMaxMin
} from "../services/temperatureService";

export const useTemperatureData = () => {
  const [loading, setLoading] = useState(true);

  const [yearly, setYearly] = useState({});
  const [monthly, setMonthly] = useState({});
  const [daily, setDaily] = useState({});
  const [lastWeek, setLastWeek] = useState({});
  const [anniversary, setAnniversary] = useState({});

  const [hottestRecord, setHottestRecord] = useState(null);
  const [coldestRecord, setColdestRecord] = useState(null);
  
  const [latestRecord, setLatestRecord] = useState(null);
  const [latestHeatwave, setLatestHeatwave] = useState(null);
  const [latestFrost, setLatestFrost] = useState(null);
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

        const lastWeekData = await getLastWeekTemperatures();
        setLastWeek({
          labels: lastWeekData.map(d => d.date),
          avg: lastWeekData.map(d => d.avg_temp),
          max: lastWeekData.map(d => d.max),
          min: lastWeekData.map(d => d.min)
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
          date: hottestRecordData.date,
          temp: hottestRecordData.max_temp
        });

        const coldestRecordData = await getColdestRecord();
        setColdestRecord({
          date: coldestRecordData.date,
          temp: coldestRecordData.min_temp
        });

        const latestRecordData = await getLatestRecord();
        setLatestRecord({
          date: latestRecordData.date,
          temp: latestRecordData.avg_temp,
          max: latestRecordData.hi_temp,
          min: latestRecordData.low_temp
        });

        const latestHeatwaveData = await getLatestHeatwave();
        setLatestHeatwave({
          start: latestHeatwaveData.heatwave_start,
          end: latestHeatwaveData.heatwave_end,
          duration: latestHeatwaveData.duration,
          max_temp_reached: latestHeatwaveData.max_temp_reached
        });

        const longestFrostData = await getLongestFrost();
        setLongestFrost({
          start: longestFrostData.frost_start,
          end: longestFrostData.frost_end,
          duration: longestFrostData.duration,
          min_temp_reached: longestFrostData.min_temp_reached
        });

        const latestFrostData = await getLatestFrost();
        setLatestFrost({
          start: latestFrostData.frost_start,
          end: latestFrostData.frost_end,
          duration: latestFrostData.duration,
          min_temp_reached: latestFrostData.min_temp_reached
        });

        const longestHeatwaveData = await getLongestHeatwave();
        setLongestHeatwave({
          start: longestHeatwaveData.heatwave_start,
          end: longestHeatwaveData.heatwave_end,
          duration: longestHeatwaveData.duration,
          max_temp_reached: longestHeatwaveData.max_temp_reached
        });

        const latestMaxMinData = await getLatestMaxMin();
        setLatestMaxMin({
          date_max: latestMaxMinData.date_max,
          max: latestMaxMinData.max,
          date_min: latestMaxMinData.date_min,
          min: latestMaxMinData.min
        });

      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return { loading, yearly, monthly, daily, lastWeek, anniversary, hottestRecord, coldestRecord, latestRecord, longestFrost, latestFrost, longestHeatwave, latestHeatwave, latestMaxMin };
};