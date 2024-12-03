import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState(null);

  const adminUser = {
    email: "admin@gmail.com",
    password: "Admin1234",
  };

  const login = (user) => {
    if (
      user.email === adminUser.email &&
      user.password === adminUser.password
    ) {
      setCurrentUser({ email: user.email });
      setError(null);
      console.log("Admin logged in:", user);
      return;
    }

    if (user.email && user.password) {
      setCurrentUser({ email: user.email });
      setError(null);
      console.log("User logged in:", user);
    } else {
      setError("Invalid credentials");
    }
  };

  const register = (user) => {
    if (user.email && user.password) {
      setCurrentUser(user);
      setError(null);
      console.log("User registered:", user);
    } else {
      setError("Registration failed");
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setError(null);
    console.log("User logged out");
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, login, register, logout, error }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
