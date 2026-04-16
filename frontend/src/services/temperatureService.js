export async function getYearlyTemperature() {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/temperature/historic/yearly`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch historical yearly temperature data.");
  }

  return response.json();
}

export async function getMonthlyTemperature() {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/temperature/historic/monthly`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch historical monthly temperature data.");
  }

  return response.json();
}

export async function getDailyTemperature() {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/temperature/historic/daily`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch historical daily temperature data.");
  }

  return response.json();
}

export async function getLast12HoursTemperatures() {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/temperature/historic/last_12_hours`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch last 12 hours temperature data.");
  }

  return response.json();
}

export async function getLast24HoursTemperatures() {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/temperature/historic/last_24_hours`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch last 24 hours temperature data.");
  }

  return response.json();
}

export async function getLastWeekTemperatures() {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/temperature/historic/last_week`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch last week temperature data.");
  }
  
  return response.json();
}

export async function getLast30DaysTemperatures() {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/temperature/historic/last_30_days`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch last 30 days temperature data.");
  }

  return response.json();
}

export async function getAnniversaryTimestampComparison() {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/temperature/historic/anniversary_timestamp_comparison`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch anniversary timestamp comparison data.");
  }

  return response.json();
}

export async function getHottestRecord() {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/temperature/historic/hottest_record`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch hottest record data.");
  }

  return response.json();

}

export async function getColdestRecord() {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/temperature/historic/coldest_record`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch coldest record data.");
  }

  return response.json();
}

export async function getLatestRecord() {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/temperature/latest_record`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch latest temperature data.");
  }

  return response.json();
}

export async function getLatestHeatwave() {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/temperature/heatwaves/latest`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch latestheatwave data.");
  }

  return response.json();
}

export async function getLongestHeatwave() {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/temperature/heatwaves/longest`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch longest heatwave period data.");
  }
  return response.json();
}

export async function getFrosts() {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/temperature/frosts`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch frost data.");
  }

  return response.json();
}

export async function getLatestFrost() {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/temperature/frosts/latest`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch latest frost period data.");
  }

  return response.json();
}

export async function getLongestFrost() {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/temperature/frosts/longest`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch longest frost period data.");
  }

  return response.json();
}

export async function getLatestMaxMin() {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/temperature/latest_max_min`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch latest max and min temperature data.");
  }

  return response.json();
}

export async function getHotColdDaysLastWeekCount() {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/temperature/hot_cold_days/last_week`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch hot and cold days count for last week.");
  }

  return response.json();
}

export async function getHotColdDaysLast30DaysCount() {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/temperature/hot_cold_days/last_30_days`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch hot and cold days count for last 30 days.");
  }

  return response.json();
}

export async function getTemperatureMovingAvg() {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/temperature/moving_average`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch temperature moving average data.");
  }

  return response.json();
}