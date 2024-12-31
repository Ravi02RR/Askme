import { createContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";

interface AuthContextType {
  isAuthenticated: boolean | null;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean | null>>;
  username: string | null;
  setUsername: React.Dispatch<React.SetStateAction<string | null>>;
  logout: () => void;
}

export const authContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(() =>
    JSON.parse(localStorage.getItem("isAuthenticated") || "null")
  );
  const [username, setUsername] = useState<string | null>(() =>
    localStorage.getItem("username")
  );

  useEffect(() => {
    localStorage.setItem("isAuthenticated", JSON.stringify(isAuthenticated));
    localStorage.setItem("username", username || "");
  }, [isAuthenticated, username]);

  const logout = async () => {
    await axios.post(
      "http://task.devguy.live/api/v1/auth/logout",
      {},
      {
        withCredentials: true,
      }
    );
    setIsAuthenticated(false);
    setUsername(null);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("username");
  };

  return (
    <authContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        username,
        setUsername,
        logout,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
