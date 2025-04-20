import { API } from "@/API_URL";

// Get all categories
const getAllCategories = async () => {
  try {
    const response = await fetch(`${API}/api/categories/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch categories.");
    }

    return data;
  } catch (err) {
    console.error("Error fetching categories:", err.message);
    throw new Error(err.message || "Error fetching categories.");
  }
};

// Get category by ID
const getCategoryById = async (id) => {
  try {
    const response = await fetch(`${API}/api/categories/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch category.");
    }

    return data;
  } catch (err) {
    console.error("Error fetching category:", err.message);
    throw new Error(err.message || "Error fetching category.");
  }
};

// Create new category
const createCategory = async (categoryData) => {
  try {
    const response = await fetch(`${API}/api/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(categoryData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to create category.");
    }

    return data;
  } catch (err) {
    console.error("Error creating category:", err.message);
    throw new Error(err.message || "Error creating category.");
  }
};

// Delete category
const deleteCategory = async (id) => {
  try {
    const response = await fetch(`${API}/api/categories/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to delete category.");
    }

    return data;
  } catch (err) {
    console.error("Error deleting category:", err.message);
    throw new Error(err.message || "Error deleting category.");
  }
};

export default {
  getAllCategories,
  getCategoryById,
  createCategory,
  deleteCategory,
};
