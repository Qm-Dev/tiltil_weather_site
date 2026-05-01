import LineChart from "../../LineChart";

export default function LastPeriodHoursHumidityChart({data, period}) {
    return (
    <LineChart
    labels={data.labels?.map(label => {
        return label.split('T')[1]
    })}
    datasets={[
        {
            label: "Average Humidity (%)",
            borderColor: "rgb(61, 219, 61)",
            backgroundColor: "rgba(61, 219, 61, 0.5)",
            data: data.values,
            pointRadius: 4,
        }
    ]}
    title={`Humidity (${period})`}
    x_label="Time (HH:MM:SS)"
    y_label="Humidity (%)"
    is_animated={true}
    is_legend_displayed={true}
    />
    );
}