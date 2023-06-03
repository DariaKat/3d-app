import { FC } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Block } from "./LoginBlock.styled";
import { message } from "antd";
import { FormLogin } from "features/FormLogin";
import { SubmitHandler } from "react-hook-form";
import { IFormInput } from "features/FormLogin";
import { useAuth } from "shared/hooks/AuthContext/useAuth";

export const LoginBlock: FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const { ga } = useAuth();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const user = await signInWithEmailAndPassword(
        ga,
        data.login,
        data.password
      );
      user && navigate("/");
    } catch (error: unknown) {
      messageApi.open({
        type: "error",
        content: "Введен неправильный логин или пароль",
      });
    }
  };

  return (
    <Block>
      {contextHolder}
      <FormLogin onSubmit={onSubmit} title="Войти" />
    </Block>
  );
};
