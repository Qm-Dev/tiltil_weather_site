import LineChart from "../../LineChart";

export default function SolarCurve({data}) {

    if (!data.labels?.length) {
        return <h3 className="text-black">Solar curve chart is currently unavailable.</h3>
    }

    return (
        <LineChart
        labels={data.labels?.map(label => {
            return label.split('T')[1]
        })}
        datasets={[
            {
            label: "W/m\u00B2",
            borderColor: "rgba(0, 0, 0, 0.8)",
            borderWidth: 2.25,
            backgroundColor: "rgb(255, 230, 10)",
            data: data.values,
            pointRadius: 4,
            },
        ]}
        title={`Sunlight (${data.labels[0].split('T')[0]})`}
        x_label="Time (HH:MM:SS)"
        y_label="Solar Radiation (Watts per meter squared)"
        is_animated={true}
        />
    );
}