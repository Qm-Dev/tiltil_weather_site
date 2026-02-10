import LineChart from "../LineChart";

export default function MonthlyAvgTemperatureChart({data}) {
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
        title="Monthly Average Temperature (2008-2026)"
        x_label="Month"
        y_label="Temperature (°C)"
        is_animated={true}
        />
    );
}