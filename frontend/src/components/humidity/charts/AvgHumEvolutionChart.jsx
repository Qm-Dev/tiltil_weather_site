import LineChart from "../../LineChart";

export default function AvgHumEvolutionChart({data, x_label}) {
    return (
        <LineChart
        labels={data.labels}
        datasets={[
            {
            label: "Humidity (%)",
            borderColor: "rgb(61, 219, 61)",
            backgroundColor: "rgba(61, 219, 61, 0.5)",
            data: data.values,
            pointRadius: 4,
            },
        ]}
        title={`Average Humidity (2008-${String(data.labels.at(-1)).slice(0,4)})`}
        x_label={x_label}
        y_label="Humidity (%)"
        is_animated={true}
        />
    );
}