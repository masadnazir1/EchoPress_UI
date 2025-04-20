// services/authService.js
import { API } from "@/API_URL";

const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${API}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (response.status === 401) {
      // Unauthorized access, invalid credentials
      throw new Error("Invalid email or password");
    }

    if (response.ok) {
      // Save the token in localStorage
      localStorage.setItem("JWT", data.token);
      return data; // Return the response data, which includes the token
    } else {
      // Other errors, e.g., 400 or 500
      throw new Error(
        data.message || "An error occurred, please try again later."
      );
    }
  } catch (err) {
    // Handle network errors or other issues
    console.error("Login failed:", err.message);

    // Ensure to throw a clean error message
    if (err.message === "Failed to fetch") {
      // If there's a network issue or API is down
      throw new Error("Network error: Unable to connect to the server.");
    }

    throw new Error(err.message || "Login failed. Please try again.");
  }
};

//
// Function to register a new user

const registerUser = async (name, email, password) => {
  try {
    const response = await fetch(`${API}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const data = await response.json();

    if (data.error === "Email already in use") {
      return 409;
    }

    if (data.message === "User registered successfully") {
      return 201;
    }

    return data; // Return the response data (success message or token if returned)
  } catch (err) {
    // Handle network errors or other issues
    console.error("Registration failed:", err.message);
    throw new Error(err.message || "Registration failed. Please try again.");
  }
};

const GoogleLogin = async (token) => {
  try {
    const response = await fetch(`${API}/api/auth/Goauth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      // Check if response status is not OK (e.g., 400 or 500)
      throw new Error(
        data.message || "Registration failed. Please try again later."
      );
    }

    return data; // Return the response data (success message or token if returned)
  } catch (err) {
    // Handle network errors or other issues
    console.error("Registration failed:", err.message);
    throw new Error(err.message || "Registration failed. Please try again.");
  }
};

export default { loginUser, registerUser, GoogleLogin };
