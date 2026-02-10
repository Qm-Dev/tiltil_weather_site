export async function updateDatabaseRecords() {
    const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/weatherlink_dataset/db_update`,
        {
            method: "PUT",
            headers: {
                // 'Content-Type': 'multipart/form-data', // Let the browser set this boundary
            },
            // body: formData, // Assuming formData contains the CSV file
        }
    );
    if (!response.ok) {
        throw new Error("Failed to update database records from WeatherLink dataset.");
    }
    return response.json();
}