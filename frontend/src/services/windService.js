export async function getLatestWindRecord() {
    const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/wind/latest_record`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
    );

    if (!response.ok) {
        throw new Error("Failed to fetch latest wind data.");
    }

    return response.json();
}