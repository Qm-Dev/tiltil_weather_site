export default function LoadingRainfall() {
    return (
        <div className="container text-center">
            <div className="spinner-border text-secondary mt-5" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading Rainfall page, please wait...</p>
        </div>
    );
}