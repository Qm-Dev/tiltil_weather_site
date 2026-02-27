export async function getYearlyHumidity() {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/humidity/historic/yearly`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch historical yearly humidity data.");
  }

  return response.json();
}

export async function getMonthlyHumidity() {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/humidity/historic/monthly`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch historical monthly humidity data.");
  }

  return response.json();
}