import { useState } from "react";
import { parseISO } from "date-fns";

export default function TotalWindRun({windRunList}) {

    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 21;

    const indexLastRecord = currentPage * recordsPerPage;
    const indexFirstRecord = indexLastRecord - recordsPerPage;

    const currentRecords = windRunList ? windRunList.slice(indexFirstRecord, indexLastRecord): [];
    const totalPages = Math.ceil((windRunList?.length || 0) / recordsPerPage);

    return (
        <>
            <h1 className="mt-3 fw-bold text-black">Total Daily Wind Run</h1>
            <div className="justify-content-center mx-auto" style={{ maxHeight: "768px", overflowY: "auto" }}>
                <table className="mt-1 table table-sm table-hover table-striped w-75 mx-auto border border-2 border-black">
                    <thead>
                        <tr>
                            <th scope="col">Date</th>
                            <th scope="col">Wind Run</th>
                        </tr>
                    </thead>
                    <tbody className='table-group-divider'>
                        {currentRecords.length > 0 ? (
                            currentRecords.map((record) => (
                                <tr key={record.record_date}>
                                    <td>
                                        {parseISO(record.record_date).toLocaleDateString("es-CL")}
                                    </td>
                                    <td>
                                        {record.total_wind_run} km
                                    </td>
                                </tr>
                            ))
                        ) :(
                            <tr>
                                <td colSpan="2" className="text-muted">There is no available records to show at the moment.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {windRunList?.length > recordsPerPage && (
            <div className="d-flex justify-content-center">
                <nav>
                    <ul className="pagination">
                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={() => setCurrentPage(prev => prev - 1)}>
                                ←
                            </button>
                        </li>
                        <li className="page-item">
                            <button className="page-link disabled">
                                {currentPage} of {totalPages}
                            </button>
                        </li>
                        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={() => setCurrentPage(prev => prev + 1)}>
                                →
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
            )}
        </>
    );
}