import LineChart from "../LineChart";

export default function YearlyAvgHumidityChart({data}) {
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
        title={`Yearly Average Humidity (2008-${data.labels.at(-1)})`}
        x_label="Year"
        y_label="Humidity (%)"
        is_animated={true}
        />
    );
}