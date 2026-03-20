export default function({ hotColdCount }) {

    return (
        <div className="border border-2 border-black row rounded-4 bg-white p-4">
            <div className="col">
                <h1 className="fw-bold">Hot Days</h1>
                <h3>{hotColdCount?.hot || 0} days</h3>
            </div>
            <div className="col">
                <h1 className="fw-bold">Cold Days</h1>
                <h3>{hotColdCount?.cold || 0} days</h3>
            </div>
        </div>
    );

}