import LineChart from "../../LineChart";

export default function AvgTempEvolutionChart({data, x_label}) {
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
        title={`Average Temperature (2008-${String(data.labels.at(-1)).slice(0,4)})`}
        x_label={x_label}
        y_label="Temperature (°C)"
        is_animated={true}
        />
    );
}