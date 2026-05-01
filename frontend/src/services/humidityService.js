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

export async function getDailyHumidity() {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/humidity/historic/daily`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch historical daily humidity data.");
  }

  return response.json();
}

export async function getHumidityLast24Hours() {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/humidity/historic/last_24_hours`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch historical humidity data for the last 24 hours.");
  }

  return response.json();
}

export async function getLatestHumidityRecord() {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/humidity/latest_record`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch the latest humidity record.");
  }

  return response.json();
}

export async function getLatestMaxMinHumidity() {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/humidity/latest_max_min`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch the latest max and min humidity records.");
  }

  return response.json();
}