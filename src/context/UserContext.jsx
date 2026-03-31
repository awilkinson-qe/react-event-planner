// Handles user state (login, register, logout) and shares it across the app
import { useEffect, useState } from "react";
import { UserContext } from "./UserContextValue";

// Get saved user from localStorage (if any)
function readStoredUser() {
  try {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  } catch {
    return null;
  }
}

// Get all registered users from localStorage
function readStoredUsers() {
  try {
    const savedUsers = localStorage.getItem("users");
    return savedUsers ? JSON.parse(savedUsers) : [];
  } catch {
    return [];
  }
}

export function UserProvider({ children }) {
  const [user, setUser] = useState(readStoredUser);
  const [users, setUsers] = useState(readStoredUsers);

  // Keep users list in sync with localStorage
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  // Save/remove current user in localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // Register a new user (checks for duplicates)
  function register(userData) {
    const normalisedUser = {
      name: userData.name.trim(),
      email: userData.email.trim().toLowerCase(),
      username: userData.username.trim(),
      password: userData.password,
    };

    const emailExists = users.some(
      (storedUser) => storedUser.email === normalisedUser.email
    );

    const usernameExists = users.some(
      (storedUser) =>
        storedUser.username.toLowerCase() === normalisedUser.username.toLowerCase()
    );

    if (emailExists) {
      return { success: false, message: "An account with this email already exists." };
    }

    if (usernameExists) {
      return { success: false, message: "This username is already taken." };
    }

    const updatedUsers = [...users, normalisedUser];
    setUsers(updatedUsers);
    setUser(normalisedUser);

    return { success: true };
  }

  // Check login details against stored users
  function login(email, password) {
    const normalisedEmail = email.trim().toLowerCase();

    const matchedUser = users.find(
      (storedUser) =>
        storedUser.email === normalisedEmail && storedUser.password === password
    );

    if (!matchedUser) {
      return { success: false, message: "Invalid email or password." };
    }

    setUser(matchedUser);
    return { success: true };
  }

  // Log out current user
  function logout() {
    setUser(null);
  }

  // Share user data and auth functions across the app
  return (
    <UserContext.Provider value={{ user, users, register, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}