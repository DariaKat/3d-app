import { createContext } from "react";
import { Auth } from "firebase/auth";
import { IUser } from "./type";

export interface AuthContextProps {
  user?: IUser;
  setUser?: (theme: IUser | null) => void;
  ga?: Auth;
}

export const AuthContext = createContext<AuthContextProps>({});
