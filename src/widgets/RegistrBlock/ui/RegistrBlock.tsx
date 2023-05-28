import { FC } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Block } from "./RegistrBlock.styled";
import { FormLogin } from "features/FormLogin";
import { SubmitHandler } from "react-hook-form";
import { IFormInput } from "features/FormLogin";
import { useAuth } from "shared/hooks/AuthContext/useAuth";

export const RegistrBlock: FC = () => {
  const navigate = useNavigate();
  const { ga } = useAuth();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log(data);
    try {
      const user = await createUserWithEmailAndPassword(
        ga,
        data.login,
        data.password
      );

      await updateProfile(ga.currentUser, {
        displayName: data.name,
      });

      user && navigate("/");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Block>
      <FormLogin onSubmit={onSubmit} title="Регистрация" type="registr" />
    </Block>
  );
};
