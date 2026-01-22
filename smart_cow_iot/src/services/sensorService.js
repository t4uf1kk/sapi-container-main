//sensorService.js
const API_URL = import.meta.env.VITE_API_URL;

export const fetchSensorData = async () => {
  try {
    const response = await fetch(`${API_URL}/sapi`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`Gagal fetch data: ${response.status}`);
    }

    const data = await response.json();
    const latestData = Array.isArray(data)
      ? data[data.length - 1] ?? null
      : data;

    return latestData;
  } catch (error) {
    console.error("Error fetchSensorData:", error);
    return null;
  }
};
