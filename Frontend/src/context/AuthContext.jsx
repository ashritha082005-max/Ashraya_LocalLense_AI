import {
  createContext,
  useContext,
  useState
} from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved =
      localStorage.getItem("ashraya_user");

    return saved
      ? JSON.parse(saved)
      : null;
  });

  const login = (userData, token) => {
    localStorage.setItem(
      "ashraya_user",
      JSON.stringify(userData)
    );

    localStorage.setItem(
      "ashraya_token",
      token
    );

    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem(
      "ashraya_user"
    );

    localStorage.removeItem(
      "ashraya_token"
    );

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
