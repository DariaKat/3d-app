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
      </HeaderStyle>
    </Text>
  );
};
