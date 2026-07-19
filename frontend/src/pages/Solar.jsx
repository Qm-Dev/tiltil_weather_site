import LoadingPage from "../components/LoadingPage";
import { useSolarData } from "../hooks/useSolarData";
import SolarCurve from "../components/solar/charts/SolarCurve";

const Solar = () => {

    const { loading, sunlight } = useSolarData();

    if (loading) return (
        <>
            <title>Til-Til Weather Site | Solar</title>
            <LoadingPage page={"Solar"} />
        </>
    )

    return (
        <>
            <title>Til-Til Weather Site | Solar</title>
            <main style={{backgroundColor: "#A6D0F2", minHeight: "100vh"}}>
                <div className="container text-center">
                    <div className="row justify-content-center mx-auto">
                        <h1 className="text-black fw-bold mt-3">Solar Curve</h1>
                        <SolarCurve data={sunlight} />
                    </div>
                </div>
            </main>
        </>
    );
}
export default Solar;