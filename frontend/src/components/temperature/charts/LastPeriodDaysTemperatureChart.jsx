import LineChart from "../../LineChart";

export default function LastPeriodDaysTemperatureChart({data, period}) {
    return (
    <LineChart
    labels={data.labels}
    datasets={[
        {
            label: "Avg. Temperature (°C)",
            borderColor: "rgb(141, 59, 114)",
            backgroundColor: "rgba(141, 59, 114, 0.5)",
            data: data.avg,
            pointRadius: 4,
        },
        {
            label: "Max. Temperature (°C)",
            borderColor: "rgb(219, 61, 61)",
            backgroundColor: "rgba(219, 61, 61, 0.5)",
            data: data.max,
            pointRadius: 4,
        },
        {
            label: "Min. Temperature (°C)",
            borderColor: "rgb(5, 142, 217)",
            backgroundColor: "rgba(5, 142, 217, 0.5)",
            data: data.min,
            pointRadius: 4,
        }
    ]}
    title={`Registered Temperatures (${period})`}
    x_label="Year, Month & Day (YYYY-MM-DD)"
    y_label="Temperature (°C)"
    is_animated={true}
    is_legend_displayed={true}
    />
    );
}