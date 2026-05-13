import { createContext, useContext, useState, useEffect } from "react";
import API from "../api/axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // on mount, try to restore session from localStorage
  useEffect(() => {
    const token = localStorage.getItem("greetings_token");
    if (token) {
      API.get("/auth/me")
        .then((res) => setUser(res.data))
        .catch(() => {
          // token expired or invalid — clear it
          localStorage.removeItem("greetings_token");
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = (userData, token) => {
    localStorage.setItem("greetings_token", token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("greetings_token");
    setUser(null);
  };

  const updateUser = (updatedData) => {
    setUser((prev) => ({ ...prev, ...updatedData }));
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// custom hook for cleaner usage
export const useAuth = () => useContext(AuthContext);
