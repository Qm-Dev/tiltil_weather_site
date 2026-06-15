import { useEffect, useState } from "react";
import {
  getYearlyTemperature,
  getMonthlyTemperature,
  getDailyTemperature,
  getLast12HoursTemperatures,
  getLast24HoursTemperatures,
  getLastWeekTemperatures,
  getLast30DaysTemperatures,
  getAnniversaryTimestampComparison,
  getHottestRecord,
  getColdestRecord,
  getLatestRecord,
  getLongestFrost,
  getLongestHeatwave,
  getLatestHeatwave,
  getLatestFrost,
  getLatestMaxMin,
  getHotColdDaysLastWeekCount,
  getHotColdDaysLast30DaysCount,
  getTemperatureMovingAvg,
  getPredictionNextAvgTemp
} from "../services/temperatureService";

export const useTemperatureData = () => {
  const [loading, setLoading] = useState(true);

  const [predictedTemp, setPredictedTemp] = useState({});

  const [yearly, setYearly] = useState({});
  const [monthly, setMonthly] = useState({});
  const [daily, setDaily] = useState({});

  const [last12Hours, setLast12Hours] = useState({});
  const [last24Hours, setLast24Hours] = useState({});
  const [lastWeek, setLastWeek] = useState({});
  const [last30Days, setLast30Days] = useState({});
  const [anniversary, setAnniversary] = useState({});

  const [hottestRecord, setHottestRecord] = useState(null);
  const [coldestRecord, setColdestRecord] = useState(null);
  const [latestRecord, setLatestRecord] = useState(null);
  const [latestHeatwave, setLatestHeatwave] = useState(null);
  const [latestFrost, setLatestFrost] = useState(null);
  const [longestFrost, setLongestFrost] = useState(null);
  const [longestHeatwave, setLongestHeatwave] = useState(null);
  const [latestMaxMin, setLatestMaxMin] = useState(null);

  const [hotColdLastWeekCount, setHotColdLastWeekCount] = useState({ hot: 0, cold: 0 });
  const [hotColdLast30DaysCount, setHotColdLast30DaysCount] = useState({ hot: 0, cold: 0 });

  const [movingAvgLast30Days, setMovingAvgLast30Days] = useState({});

  useEffect(() => {
    const load = async () => {
      try {
        const [
          yearlyData,
          monthlyData,
          dailyData,
          last12HoursData,
          last24HoursData,
          lastWeekData,
          last30DaysData,
          anniversaryData,
          hottestRecordData,
          coldestRecordData,
          latestRecordData,
          latestHeatwaveData,
          longestFrostData,
          latestFrostData,
          longestHeatwaveData,
          latestMaxMinData,
          hotColdLastWeekData,
          hotColdLast30DaysData,
          movingAvgLast30DaysData,
          predictedTempData
        ] = await Promise.all([
          getYearlyTemperature(),
          getMonthlyTemperature(),
          getDailyTemperature(),
          getLast12HoursTemperatures(),
          getLast24HoursTemperatures(),
          getLastWeekTemperatures(),
          getLast30DaysTemperatures(),
          getAnniversaryTimestampComparison(),
          getHottestRecord(),
          getColdestRecord(),
          getLatestRecord(),
          getLatestHeatwave(),
          getLongestFrost(),
          getLatestFrost(),
          getLongestHeatwave(),
          getLatestMaxMin(),
          getHotColdDaysLastWeekCount(),
          getHotColdDaysLast30DaysCount(),
          getTemperatureMovingAvg(),
          getPredictionNextAvgTemp()
        ]);

        setYearly({
          labels: yearlyData.map(d => d.date),
          values: yearlyData.map(d => d.avg_temp)
        });

        setMonthly({
          labels: monthlyData.map(d => d.date),
          values: monthlyData.map(d => d.avg_temp)
        });

        setDaily({
          labels: dailyData.map(d => d.date),
          values: dailyData.map(d => d.avg_temp)
        });

        setLast12Hours({
          labels: last12HoursData.map(d => d.date),
          avg: last12HoursData.map(d => d.avg),
          max: last12HoursData.map(d => d.max),
          min: last12HoursData.map(d => d.min)
        });

        setLast24Hours({
          labels: last24HoursData.map(d => d.date),
          avg: last24HoursData.map(d => d.avg),
          max: last24HoursData.map(d => d.max),
          min: last24HoursData.map(d => d.min)
        });

        setLastWeek({
          labels: lastWeekData.map(d => d.date),
          avg: lastWeekData.map(d => d.avg_temp),
          max: lastWeekData.map(d => d.max),
          min: lastWeekData.map(d => d.min)
        });

        setLast30Days({
          labels: last30DaysData.map(d => d.date),
          avg: last30DaysData.map(d => d.avg_temp),
          max: last30DaysData.map(d => d.max),
          min: last30DaysData.map(d => d.min)
        });

        setAnniversary({
          labels: anniversaryData.map(d => d.date),
          avg: anniversaryData.map(d => d.avg_temp),
          max: anniversaryData.map(d => d.hi_temp),
          min: anniversaryData.map(d => d.low_temp)
        });

        setHottestRecord({
          date: hottestRecordData.date,
          temp: hottestRecordData.max_temp
        });

        setColdestRecord({
          date: coldestRecordData.date,
          temp: coldestRecordData.min_temp
        });

        setLatestRecord({
          date: latestRecordData.date,
          temp: latestRecordData.avg_temp,
          max: latestRecordData.hi_temp,
          min: latestRecordData.low_temp
        });

        setLatestHeatwave({
          start: latestHeatwaveData.heatwave_start,
          end: latestHeatwaveData.heatwave_end,
          duration: latestHeatwaveData.duration,
          max_temp_reached: latestHeatwaveData.max_temp_reached
        });

        setLongestFrost({
          start: longestFrostData.frost_start,
          end: longestFrostData.frost_end,
          duration: longestFrostData.duration,
          min_temp_reached: longestFrostData.min_temp_reached
        });

        setLatestFrost({
          start: latestFrostData.frost_start,
          end: latestFrostData.frost_end,
          duration: latestFrostData.duration,
          min_temp_reached: latestFrostData.min_temp_reached
        });

        setLongestHeatwave({
          start: longestHeatwaveData.heatwave_start,
          end: longestHeatwaveData.heatwave_end,
          duration: longestHeatwaveData.duration,
          max_temp_reached: longestHeatwaveData.max_temp_reached
        });

        setLatestMaxMin({
          date_max: latestMaxMinData.date_max,
          max: latestMaxMinData.max,
          date_min: latestMaxMinData.date_min,
          min: latestMaxMinData.min
        });

        setHotColdLastWeekCount({
          hot: hotColdLastWeekData.hot_days,
          cold: hotColdLastWeekData.cold_days
        });

        setHotColdLast30DaysCount({
          hot: hotColdLast30DaysData.hot_days,
          cold: hotColdLast30DaysData.cold_days
        });

        setMovingAvgLast30Days({
          labels: movingAvgLast30DaysData.map(d => d.date),
          daily_avg: movingAvgLast30DaysData.map(d => d.daily_avg),
          moving_avg: movingAvgLast30DaysData.map(d => d.moving_avg)
        });

        setPredictedTemp(predictedTempData);

      } catch (error) {
        console.error("Failed to load temperature data: ", error);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return {
    loading, yearly, monthly, daily, last12Hours, last24Hours,
    lastWeek, last30Days, anniversary, hottestRecord, coldestRecord,
    latestRecord, longestFrost, latestFrost, longestHeatwave, latestHeatwave,
    latestMaxMin, hotColdLastWeekCount, hotColdLast30DaysCount, movingAvgLast30Days, predictedTemp
  };
};