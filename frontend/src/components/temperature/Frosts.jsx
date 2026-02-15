export default function Frosts({ frostPeriods }) {
    return (
        <>
        <h1>Frosts</h1>
            <div className="row justify-content-center">
                <div className="col-12">
                    <h2>Frost Periods</h2>
              {frostPeriods && frostPeriods.start && frostPeriods.end && frostPeriods.duration ? (
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Start</th>
                      <th scope="col">End</th>
                      <th scope="col">Duration (hours)</th>
                      <th scope="col">Min Temp Reached (°C)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {frostPeriods.start.map((start, index) => (
                      <tr key={index}>
                        <td>{start}</td>
                        <td>{frostPeriods.end[index]}</td>
                        <td>{frostPeriods.duration[index]}</td>
                        <td>{frostPeriods.min_temp_reached[index]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No frost periods data available.</p>
              )}
            </div>
          </div>
        </>
    );
}