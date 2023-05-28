import { Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import { Spin } from "antd";
import { MainPage } from "pages/MainPage";
import { LoginPage } from "pages/LogInPage";
import { RegistrPage } from "pages/RegistrPage";
import { Spinner } from "./global";
import { Header } from "shared/ui/Header";
import { RequireAuth } from "shared/ui/RequireAuth";

export const App = () => {
  return (
    <div style={{ background: "#E5E5E5", minHeight: "100vh" }}>
      <Header />
      <Suspense
        fallback={
          <Spinner>
            <Spin size="large" />
          </Spinner>
        }
      >
        <Routes>
          <Route
            path="/"
            element={
              <RequireAuth>
                <MainPage />
              </RequireAuth>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registr" element={<RegistrPage />} />
        </Routes>
      </Suspense>
    </div>
  );
};
