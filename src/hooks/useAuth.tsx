import { useContext } from "react";
import AuthContext from "../contexts/AuthProvider";

interface AuthContextType {
  auth: any;
  setAuth: React.Dispatch<React.SetStateAction<any>>;
}

const useAuth = () => {
  return useContext(AuthContext) as AuthContextType;
};

export default useAuth;
