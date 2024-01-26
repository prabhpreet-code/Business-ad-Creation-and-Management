import { createContext } from "react";
import { useCookies } from "react-cookie";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [cookies, setCookies, removeCookie] = useCookies([]);

  return (
    <AuthContext.Provider value={{ cookies, setCookies, removeCookie }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
