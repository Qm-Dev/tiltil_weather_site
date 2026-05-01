import LineChart from "../../LineChart";

export default function MovingAvgChart({data}) {
    return (
    <LineChart
    labels={data.labels}
    datasets={[
        {
        label: "Avg. Temperature (°C)",
        borderColor: "rgb(219, 61, 61)",
        backgroundColor: "rgba(219, 61, 61, 0.5)",
        data: data.daily_avg,
        pointRadius: 4,
        },
        {
        label: "Moving Avg. Temperature (°C)",
        borderColor: "rgb(72, 86, 150)",
        backgroundColor: "rgba(72, 86, 150, 0.5)",
        data: data.moving_avg,
        pointRadius: 4,
        }
    ]}
    title="Temperature Moving Average (Last 30 Days)"
    x_label="Year, Month & Day (YYYY-MM-DD)"
    y_label="Temperature (°C)"
    is_animated={true}
    is_legend_displayed={true}
    />
    );
}