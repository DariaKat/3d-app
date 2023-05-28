import { useContext } from "react";
import { AuthContext } from "./AuthContext";

export const useAuth = () => {
  const value = useContext(AuthContext);

  return value;
};
