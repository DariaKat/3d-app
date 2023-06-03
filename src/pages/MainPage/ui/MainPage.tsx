import { WelcomeIcon } from "shared/ui/icon";
import { Typography } from "antd";

const { Title } = Typography;

const MainPage = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "calc(100vh - 72px)",
      }}
    >
      <WelcomeIcon />
      <Title style={{ marginTop: "20px" }}>Добро пожаловать!</Title>
    </div>
  );
};

export default MainPage;
