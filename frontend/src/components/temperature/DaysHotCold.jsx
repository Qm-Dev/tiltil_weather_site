export default function({ hotColdCount }) {

    const availableData = hotColdCount && (hotColdCount.hot > 0 || hotColdCount.cold > 0);

    if (!availableData) {
        return (
            <div className="border border-2 border-black row rounded-4 bg-white p-4 mt-2 text-black">
                <h1 className="fw-bold">During this period, the days weren't considered either hot or cold.</h1>
            </div>
        );
    }
    else {
        return (
            <div className="border border-2 border-black row rounded-4 bg-white p-4 mt-2 text-black">
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

}