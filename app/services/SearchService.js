// src/services/articleService.js
import { API } from "@/API_URL";

// Function to get search the articles
const SearchArticles = async (query, page = 1, limit = 3, published = true) => {
  try {
    const response = await fetch(
      `${API}/api/search?q=${query}&page=${page}&limit=${limit}&published=${published}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      // If the response is not OK (e.g., server error or bad request)
      throw new Error(
        data.message || "Failed to fetch articles. Please try again later."
      );
    }

    return data; // Return the list of articles and pagination details
  } catch (err) {
    console.error("Error fetching articles:", err.message);
    // Handle network or other errors
    throw new Error(
      err.message || "An error occurred while fetching articles."
    );
  }
};

export default {
  SearchArticles,
};
