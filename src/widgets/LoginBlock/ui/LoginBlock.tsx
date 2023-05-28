import { FC } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Block } from "./LoginBlock.styled";
import { FormLogin } from "features/FormLogin";
import { SubmitHandler } from "react-hook-form";
import { IFormInput } from "features/FormLogin";
import { useAuth } from "shared/hooks/AuthContext/useAuth";

export const LoginBlock: FC = () => {
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
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Block>
      <FormLogin onSubmit={onSubmit} title="Войти" />
    </Block>
  );
};
