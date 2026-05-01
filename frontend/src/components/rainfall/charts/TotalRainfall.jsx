import BarChart from '../../BarChart';

export default function TotalRainfall({ data, x_label }) {
    return (
        <BarChart 
            labels={data.labels} 
            datasets={[
                {
                label: "Rainfall (mm)",
                borderColor: "rgb(61, 130, 219)",
                backgroundColor: "rgba(61, 130, 219, 0.5)",
                data: data.values
                },
            ]} 
            title={`Historic Rainfall (2008-${String(data.labels.at(-1)).slice(0,4)})`} 
            x_label={x_label} 
            y_label="Rain (mm)" 
        />
    )
}