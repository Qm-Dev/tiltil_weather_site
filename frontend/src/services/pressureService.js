export async function getLatestPressureRecord() {
    const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/pressure/latest_record`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
    );

    if (!response.ok) {
        throw new Error("Failed to fetch latest pressure data.");
    }

    return response.json();
}