import { useState } from "react";
import { uploadWeatherDataset } from "../services/dataUploadService";

export const useWeatherUpload = () => {
    const [file, setFile] = useState(null);
    const [status, setStatus] = useState("No file selected.");
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setStatus("Ready to upload.");
        }
    };

    const executeUpload = async () => {
        if (!file) return;

        setLoading(true);
        setStatus("Processing ETL...");

        try {
            const result = await uploadWeatherDataset(file);
            setStatus(`Success! ${result.inserted} new records added.`);
            setFile(null);
        } catch (error) {
            setStatus(`An error occurred. Did you upload the correct file? Do the headers match?`)
        } finally {
            setLoading(false);
        }
    }

    return { file, status, loading, handleFileChange, executeUpload };
};