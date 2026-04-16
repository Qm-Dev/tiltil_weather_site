import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function LineChart({labels, datasets, title, x_label, y_label, is_animated = false, is_legend_displayed = false}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const chart = new Chart(canvasRef.current, {
      type: "line",
      data: {labels, datasets},
      options: {
        plugins: {
          title:{
            display: true,
            text: title,
          },
          legend:{
            display: is_legend_displayed,
          },
        },
        scales:{
          x: {
            title: {display: true, text: x_label}
          },
          y: {
            title: {display: true, text: y_label}
          }
        },
        animation: is_animated,
        responsive: true,
        maintainAspectRatio: false,
      }
  });

    return () => chart.destroy();
  }, [labels, datasets, title, x_label, y_label, is_animated, is_legend_displayed]);

  return (
  <div className="chart-container w-100 border border-2 border-black rounded-4 p-1" style={{ height: "500px", backgroundColor: "white" }}>
    <canvas className="my-4 w-100" ref={canvasRef} style={{ width:"100%", height:"100%" }}/>
  </div>
);
}
