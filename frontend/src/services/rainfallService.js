export async function getYearlyRainfall() {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/rainfall/historic/yearly`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch historical yearly rainfall data.");
  }

  return response.json();
}

export async function getMonthlyRainfall() {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/rainfall/historic/monthly`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch historical monthly rainfall data.");
  }

  return response.json();
}