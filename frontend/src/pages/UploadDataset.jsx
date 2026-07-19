// Components
import UploadFile from "../components/upload_dataset/UploadFile";

const UploadDataset = () => {

    return (
        <>
            <title>Til-Til Weather Site | Dataset</title>
            <main style={{backgroundColor: "#A6D0F2", minHeight: "100vh"}}>
                <div className="container">
                    <UploadFile />
                </div>
            </main>
        </>
    );
}
export default UploadDataset;