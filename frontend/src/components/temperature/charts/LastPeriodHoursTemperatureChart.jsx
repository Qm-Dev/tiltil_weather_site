import LineChart from "../../LineChart";

export default function LastPeriodHoursTemperatureChart({data, period}) {
    return (
    <LineChart
    labels={data.labels?.map(label => {
        return label.split('T')[1]
    })}
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
    title={`Registered Temperatures (${period})`}
    x_label="Time (HH:MM:SS)"
    y_label="Temperature (°C)"
    is_animated={true}
    is_legend_displayed={true}
    />
    );
}