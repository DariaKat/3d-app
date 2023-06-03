import { useMemo, useState, FC, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { AuthContext } from "./AuthContext";
import { IUser } from "./type";
import { db } from "app/firebase";

interface IProps {
  children: any;
}

export const AuthProvider: FC<IProps> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const ga = getAuth();

  useEffect(() => {
    const unlisten = onAuthStateChanged(ga, (user) => {
      user
        ? setUser({
            _id: user.uid,
            email: user.email,
            name: user.displayName,
          })
        : setUser(null);
    });

    return () => unlisten();
  }, []);

  const defaultData = useMemo(
    () => ({
      user,
      setUser,
      ga,
      db,
    }),
    [user, ga]
  );

  return (
    <AuthContext.Provider value={defaultData}>{children}</AuthContext.Provider>
  );
};
