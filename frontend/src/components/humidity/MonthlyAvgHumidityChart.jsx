import LineChart from "../LineChart";

export default function MonthlyAvgHumidityChart({data}) {
    return (
        <LineChart
        labels = {data.labels}
        datasets = {[
            {
            label: "Humidity (%)",
            borderColor: "rgb(61, 219, 61)",
            backgroundColor: "rgba(61, 219, 61, 0.5)",
            data: data.values,
            pointRadius: 4,
            },
        ]}
        title={`Monthly Average Humidity (2008-2026)`}
        x_label="Month"
        y_label="Humidity (%)"
        is_animated={true}
        />
    );
}