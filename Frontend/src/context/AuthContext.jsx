import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    try {
      const stored = localStorage.getItem("auth");
      if (stored) return JSON.parse(stored);
    } catch {
      // Ignore malformed local storage and fallback to default auth shape.
    }

    return {
      user: null,
      accessToken: "",
      refreshToken: "",
    };
  });

  useEffect(() => {
    try {
      if (auth?.accessToken) {
        localStorage.setItem("auth", JSON.stringify(auth));
      } else {
        localStorage.removeItem("auth");
      }
    } catch {
      // Ignore storage errors for environments where localStorage is unavailable.
    }
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
