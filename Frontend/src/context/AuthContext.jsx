import { createContext, useContext, useState, useEffect } from "react";
import API from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("caretaker_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("caretaker_token") || null;
  });

  const [loading, setLoading] = useState(true);

  // Validate token on mount
  useEffect(() => {
    const verifyUser = async () => {
      const storedToken = localStorage.getItem("caretaker_token");
      if (!storedToken) {
        setLoading(false);
        return;
      }

      try {
        const response = await API.get("/auth/me");
        if (response.data.success) {
          setUser(response.data.user);
          localStorage.setItem(
            "caretaker_user",
            JSON.stringify(response.data.user)
          );
        }
      } catch (error) {
        console.warn("Session verification failed, logging out:", error.message);
        localStorage.removeItem("caretaker_token");
        localStorage.removeItem("caretaker_user");
        setUser(null);
        setToken(null);
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, []);

  // Login handler
  const login = async (email, password) => {
    const response = await API.post("/auth/login", { email, password });
    if (response.data.success) {
      const { token: receivedToken, user: receivedUser } = response.data;
      localStorage.setItem("caretaker_token", receivedToken);
      localStorage.setItem("caretaker_user", JSON.stringify(receivedUser));
      setToken(receivedToken);
      setUser(receivedUser);
      return receivedUser;
    }
  };

  // Register handler
  const register = async (fullName, email, password) => {
    const response = await API.post("/auth/register", {
      fullName,
      email,
      password,
    });
    if (response.data.success) {
      const { token: receivedToken, user: receivedUser } = response.data;
      localStorage.setItem("caretaker_token", receivedToken);
      localStorage.setItem("caretaker_user", JSON.stringify(receivedUser));
      setToken(receivedToken);
      setUser(receivedUser);
      return receivedUser;
    }
  };

  // Logout handler
  const logout = () => {
    localStorage.removeItem("caretaker_token");
    localStorage.removeItem("caretaker_user");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: !!token && !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
