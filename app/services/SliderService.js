// services/sliderService.js
import { API } from "@/API_URL";

const GetSlides = async () => {
  try {
    const response = await fetch(`${API}/api/sliders/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store", // optional: ensures fresh data in Next.js
    });

    if (!response.ok) {
      throw new Error("Failed to fetch sliders");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching sliders:", error);
    return [];
  }
};

export default { GetSlides };
