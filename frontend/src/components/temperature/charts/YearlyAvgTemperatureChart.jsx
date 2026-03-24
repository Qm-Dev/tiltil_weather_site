import LineChart from "../../LineChart";

export default function YearlyAvgTemperatureChart({data}) {
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
        title={`Yearly Average Temperature (2008-${data.labels.at(-1)})`}
        x_label="Year"
        y_label="Temperature (°C)"
        is_animated={true}
        />
    );
}