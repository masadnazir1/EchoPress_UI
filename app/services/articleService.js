// src/services/articleService.js
import { API } from "@/API_URL";

// Function to get all articles with pagination and filtering by published status
const getAllArticles = async (page = 1, limit = 3, published = true) => {
  try {
    const response = await fetch(
      `${API}/api/articles/all?page=${page}&limit=${limit}&published=${published}`,
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

// Function to get a single article by ID
const getArticleById = async (id) => {
  try {
    const response = await fetch(`${API}/api/articles/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Article not found.");
    }

    return data; // Return the article data
  } catch (err) {
    console.error("Error fetching article:", err.message);
    throw new Error(
      err.message || "An error occurred while fetching the article."
    );
  }
};

// Function to create a new article
const createArticle = async (
  title,
  slug,
  author_id,
  markdown_content,
  summary,
  cover_image = null,
  published_at = null,
  is_published = false,
  tags = []
) => {
  try {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("slug", slug);
    formData.append("author_id", author_id);
    formData.append("markdown_content", markdown_content);
    formData.append("summary", summary);
    formData.append("published_at", published_at);
    formData.append("is_published", is_published);
    formData.append("tags", JSON.stringify(tags));

    // If there's a cover image, append it to the form data
    if (cover_image) {
      formData.append("cover_image", cover_image);
    }

    const response = await fetch(`${API}/api/articles/create`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to create article.");
    }

    return data; // Return the created article data
  } catch (err) {
    console.error("Error creating article:", err.message);
    throw new Error(
      err.message || "An error occurred while creating the article."
    );
  }
};

// Function to update an article
const updateArticle = async (id, updatedFields) => {
  try {
    const response = await fetch(`${API}/api/articles/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedFields),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to update article.");
    }

    return data; // Return updated article data
  } catch (err) {
    console.error("Error updating article:", err.message);
    throw new Error(
      err.message || "An error occurred while updating the article."
    );
  }
};

// Function to delete an article
const deleteArticle = async (id) => {
  try {
    const response = await fetch(`${API}/api/articles/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to delete article.");
    }

    return data; // Return success message after deletion
  } catch (err) {
    console.error("Error deleting article:", err.message);
    throw new Error(
      err.message || "An error occurred while deleting the article."
    );
  }
};

export default {
  getAllArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
};
