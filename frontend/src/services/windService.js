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

export async function getTotalDailyWindRun(ascending = false) {
    const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/wind/historic/total_daily_wind_run?asc=${ascending}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
    );

    if (!response.ok) {
        throw new Error("Failed to fetch historical daily wind run data.");
    }

    return response.json();
}

export async function getWindiestDay() {
    const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/wind/historic/windiest_day`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
    );

    if (!response.ok) {
        throw new Error("Failed to fetch windiest day data.");
    }

    return response.json();
}