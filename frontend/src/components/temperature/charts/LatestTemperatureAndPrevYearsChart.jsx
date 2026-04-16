import LineChart from "../../LineChart";

export default function LatestTemperatureAndPrevYearsChart({data}) {
    return (
    <LineChart
    labels={data.labels}
    datasets={[
        {
        label: "Average Temperature (°C)",
        borderColor: "rgb(23, 33, 33)",
        backgroundColor: "rgba(23, 33, 33, 0.5)",
        data: data.avg,
        pointRadius: 4,
        },
        {
        label: "Max Temperature (°C)",
        borderColor: "rgb(219, 61, 61)",
        backgroundColor: "rgba(219, 61, 61, 0.5)",
        data: data.max,
        pointRadius: 4,
        },
        {
        label: "Min Temperature (°C)",
        borderColor: "rgb(5, 142, 217)",
        backgroundColor: "rgba(5, 142, 217, 0.5)",
        data: data.min,
        pointRadius: 4,
        }
    ]}
    title="Current Temperature and Previous Years Comparison"
    x_label="Year"
    y_label="Temperature (°C)"
    is_animated={true}
    is_legend_displayed={true}
    />
    );
}