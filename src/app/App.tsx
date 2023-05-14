import { Routes, Route, Link } from "react-router-dom";
import { Suspense } from "react";
import { MainPage } from "pages/MainPage";
import { Header } from "./global";
import { Typography } from "antd";

const { Text } = Typography;

export const App = () => {
  return (
    <div style={{ background: "#E5E5E5", minHeight: "100vh" }}>
      <Header>
        <Text>
          <Link to={"/"}>Главная</Link>
          <Link to={"/login"}>Войти</Link>
        </Text>
      </Header>
      <Suspense fallback={<>Loading...</>}>
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </Suspense>
    </div>
  );
};
