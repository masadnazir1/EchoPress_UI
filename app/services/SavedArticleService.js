// src/services/SavedArticleService.js
import { API } from "@/API_URL";

// Get saved articles for a user with pagination
const getSavedArticles = async (userId, page = 1, limit = 10) => {
  try {
    const response = await fetch(
      `${API}/api/savedarticles/${userId}?page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch saved articles.");
    }

    return data;
  } catch (err) {
    console.error("Error fetching saved articles:", err.message);
    throw new Error(err.message || "Error getting saved articles.");
  }
};

// Save an article for a user
const saveArticle = async (userId, articleId) => {
  try {
    const response = await fetch(
      `${API}/api/savedarticles/${userId}/${articleId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // no need for body anymore because you're sending params in the URL
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to save article.");
    }

    return data;
  } catch (err) {
    console.error("Error saving article:", err.message);
    throw new Error(err.message || "Error saving article.");
  }
};

// Delete a saved article for a user
const deleteSavedArticle = async (userId, articleId) => {
  try {
    const response = await fetch(
      `${API}/api/savedarticles/${userId}/${articleId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to remove saved article.");
    }

    return data;
  } catch (err) {
    console.error("Error removing saved article:", err.message);
    throw new Error(err.message || "Error removing saved article.");
  }
};

export default {
  getSavedArticles,
  saveArticle,
  deleteSavedArticle,
};
