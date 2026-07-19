export async function getSunlight() {
    const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/solar/sunlight`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
    );

    if (!response.ok) {
        throw new Error("Failed to fetch sunlight data.");
    }

    return response.json();
}