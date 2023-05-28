import { useNavigate } from "react-router-dom";
import { useEffect, ReactNode, FC } from "react";
import { useAuth } from "shared/hooks/AuthContext";

interface IProps {
  children: ReactNode;
}

export const RequireAuth: FC<IProps> = ({ children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    !user && navigate("/login");
  }, [user]);

  return <>{children}</>;
};
