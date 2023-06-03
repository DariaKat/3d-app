import { FC } from "react";
import { signOut } from "firebase/auth";
import { RocketOutlined } from "@ant-design/icons";
import { Typography, Avatar } from "antd";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "shared/hooks/AuthContext";
import { Header as HeaderStyle, Container } from "./Header.styled";

const { Text } = Typography;

export const Header: FC = () => {
  const { user, ga } = useAuth();
  const navigate = useNavigate();

  return (
    <Text>
      <HeaderStyle>
        <Container>
          <Link to={"/"}>Главная</Link>

          {user && <Link to={"/calculate"}>Расчет</Link>}
          {user && <Link to={"/materials"}>Материалы</Link>}
        </Container>
        <Container>
          {user ? (
            <>
              <Link to={"/account"}>
                <Container>
                  <Avatar
                    style={{ backgroundColor: "#1677ff" }}
                    src={user.avatar}
                    icon={<RocketOutlined />}
                  />
                  <Text>{user.name}</Text>
                </Container>
              </Link>
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
      </HeaderStyle>
    </Text>
  );
};
