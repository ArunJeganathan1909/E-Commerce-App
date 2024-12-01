import React, { createContext, useState, useContext } from "react";

// Create AuthContext
const AuthContext = createContext();

// Custom hook to use AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider component
const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const login = (user) => {
    setCurrentUser(user);
    console.log("User logged in:", user);
    // Save user to localStorage/sessionStorage if needed
  };

  const register = (user) => {
    setCurrentUser(user);
    console.log("User registered:", user);
    // Save user to localStorage/sessionStorage if needed
  };

  const logout = () => {
    setCurrentUser(null);
    console.log("User logged out");
    // Clear user data from localStorage/sessionStorage if needed
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
