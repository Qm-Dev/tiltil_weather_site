import { useWeatherUpload } from "../../hooks/useWeatherUpload";

export default function UploadFile() {

    const { file, status, loading, handleFileChange, executeUpload } = useWeatherUpload();

    const getStatus = () => {
        if (status.includes("error")) return "text-danger fw-bold";
        if (status.includes("Success!")) return "text-success fw-bold";
        return "text-black";
    };

    return (
    <>
        <div className="row text-center justify-content-center mx-auto">
            <h1 className="mt-3 fw-bold text-black">Upload Dataset</h1>
            <div className="mt-3 w-50">
                <input className="form-control text-black" type="file" id="formFile" accept=".txt" onChange={handleFileChange} disabled={loading} />
                <button type="button" className="btn btn-primary mt-2 mb-1" onClick={executeUpload} disabled={!file || loading}>
                    {loading ?
                    (<><span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Uploading...</>) : ("Upload File")}</button>
                <h6 className={`mt-1 ${getStatus()}`}><strong>Status:</strong> {status}</h6>
            </div>
            <h1 className="mt-5 fw-bold text-black">Upload Guide</h1>
            <div className="mt-1 w-50 mb-xl-0 mb-3">
                <ul className="list-group">
                    <li className="list-group-item">Open the <strong>WeatherLink program</strong> in your computer.</li>
                    <li className="list-group-item">Download the latest weather station data.</li>
                    <li className="list-group-item">Browse the station data. On the <strong>Browse tab,</strong> select <strong>Export Records.</strong></li>
                    <li className="list-group-item">Choose the days, months or years to export. Select <strong>'Use 24:00'</strong> option below.</li>
                    <li className="list-group-item">Select <strong>'OK',</strong> then specify the name and route of the file.</li>
                    <li className="list-group-item">Once downloaded, return to this page and upload the file.</li>
                </ul>
            </div>
        </div>
    </>
    );
}