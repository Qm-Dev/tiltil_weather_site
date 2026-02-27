export default function LoadingHumidity() {
    return (
        <div className="container text-center">
            <div className="spinner-border text-secondary mt-5" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading Humidity page, please wait...</p>
        </div>
    );
}