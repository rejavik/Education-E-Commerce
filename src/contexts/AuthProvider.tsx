import { createContext, useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const AuthContext = createContext({});

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // const navigate = useNavigate();
  const jsonString = localStorage.getItem("userInfor");
  const user = jsonString ? JSON.parse(jsonString) : null;
  const [auth, setAuth] = useState(user || null);

  // useEffect(() => {
  //   if (user) {
  //     navigate("/home");
  //   }
  // }, [user, navigate]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
