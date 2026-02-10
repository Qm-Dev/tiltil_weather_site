export default function LoadingTemperature() {
    return (
        <div className="container text-center">
            <div className="spinner-border text-secondary mt-3" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading temperature charts, please wait...</p>
        </div>
    );
}