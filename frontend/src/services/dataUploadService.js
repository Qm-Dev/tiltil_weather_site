export async function uploadWeatherDataset(file) {
    const formData = new FormData();
    formData.append("records_file", file)

    const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/weatherlink_dataset/db_import_weather_records`,
        {
            method: "POST",
            body: formData,
        }
    );

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to upload weather records.");
    }

    return await response.json();
}