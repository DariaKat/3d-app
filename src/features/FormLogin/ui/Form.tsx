import { FC } from "react";
import { Input, Button, Alert, Typography } from "antd";
import { Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { Form, Block, TextForm } from "./Form.styled";
import { IFormInput, IFormProps } from "../model/type";

const { Title, Text } = Typography;

export const FormLogin: FC<IFormProps> = ({
  type = "login",
  onSubmit,
  title,
  icon,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Title level={3}>{title}</Title>
        {type === "registr" && (
          <>
            <Block>
              <Controller
                name="name"
                control={control}
                rules={{
                  required: "Обязательное поле",
                }}
                render={({ field }) => (
                  <Input
                    placeholder="Имя пользователя"
                    status={errors?.name?.message && "error"}
                    {...field}
                  />
                )}
              />
            </Block>
            {errors?.name?.message && (
              <Alert
                className="message"
                message="Обязательное поле"
                type="error"
              />
            )}
          </>
        )}
        <Block>
          <Controller
            name="login"
            control={control}
            rules={{
              required: "Обязательное поле",
            }}
            render={({ field }) => (
              <Input
                placeholder="Логин"
                status={errors?.login?.message && "error"}
                {...field}
              />
            )}
          />
        </Block>
        {errors?.login?.message && (
          <Alert className="message" message="Обязательное поле" type="error" />
        )}
        <Block>
          <Controller
            name="password"
            control={control}
            rules={{
              required: "Обязательное поле",
            }}
            render={({ field }) => (
              <Input.Password
                placeholder="Пароль"
                status={errors?.password?.message && "error"}
                {...field}
              />
            )}
          />
        </Block>
        {errors?.password?.message && (
          <Alert className="message" message="Обязательное поле" type="error" />
        )}

        <Button htmlType="submit" type="primary">
          Войти
        </Button>

        {type === "login" ? (
          <TextForm>
            <Text>
              Если у Вас нет аккаунта, то{" "}
              <Link to={"/registr"}>зарегестрируйтесь</Link>
            </Text>
          </TextForm>
        ) : (
          <TextForm>
            <Text>
              Если у Вас уже есть аккаунт, то <Link to={"/login"}>войдите</Link>
            </Text>
          </TextForm>
        )}
      </Form>
    </div>
  );
};
