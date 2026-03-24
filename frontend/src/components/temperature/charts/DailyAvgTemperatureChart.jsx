import LineChart from "../../LineChart";

export default function DailyAvgTemperatureChart({data}) {
    return (
        <LineChart
        labels={data.labels}
        datasets={[
            {
            label: "Temperature (°C)",
            borderColor: "rgb(219, 61, 61)",
            backgroundColor: "rgba(219, 61, 61, 0.5)",
            data: data.values,
            pointRadius: 4,
            },
        ]}
        title={`Daily Average Temperature (2008-${data.labels.at(-1).slice(0,4)})`}
        x_label="Day"
        y_label="Temperature (°C)"
        />
    );
}