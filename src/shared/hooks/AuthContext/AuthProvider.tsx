import { useMemo, useState, FC, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { IUser } from "./type";

interface IProps {
  children: any;
}

export const AuthProvider: FC<IProps> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const ga = getAuth();

  const navigate = useNavigate();

  useEffect(() => {
    const unlisten = onAuthStateChanged(ga, (user) => {
      if (user) {
        setUser({
          _id: user.uid,
          email: user.email,
          name: user.displayName,
          avatar: user.photoURL,
        });
      } else {
        setUser(null);
        navigate("/login");
      }
    });

    return () => unlisten();
  }, []);

  const defaultData = useMemo(
    () => ({
      user,
      setUser,
      ga,
    }),
    [user, ga]
  );

  return (
    <AuthContext.Provider value={defaultData}>{children}</AuthContext.Provider>
  );
};
