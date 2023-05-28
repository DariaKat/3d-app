import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { Suspense, useEffect } from "react";
import { RocketOutlined } from "@ant-design/icons";
import { Typography, Spin, Avatar } from "antd";
import { signOut } from "firebase/auth";
import { MainPage } from "pages/MainPage";
import { LoginPage } from "pages/LogInPage";
import { RegistrPage } from "pages/RegistrPage";
import { Header, Container, Spinner } from "./global";
import { useAuth } from "shared/hooks/AuthContext";

const { Text } = Typography;

export const App = () => {
  const { user, ga } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    user ? navigate("/") : navigate("/login");
  }, [user]);

  return (
    <div style={{ background: "#E5E5E5", minHeight: "100vh" }}>
      <Text>
        <Header>
          <Container>
            <Link to={"/"}>Главная</Link>
          </Container>
          <Container>
            {user ? (
              <>
                <Avatar
                  style={{ backgroundColor: "#87d068" }}
                  icon={<RocketOutlined />}
                />
                {user.name}
                <Text
                  onClick={() => {
                    signOut(ga);
                    navigate("/login");
                  }}
                >
                  Выйти
                </Text>
              </>
            ) : (
              <Link to={"/login"}>Войти</Link>
            )}
          </Container>
        </Header>
      </Text>
      <Suspense
        fallback={
          <Spinner>
            <Spin size="large" />
          </Spinner>
        }
      >
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registr" element={<RegistrPage />} />
        </Routes>
      </Suspense>
    </div>
  );
};
