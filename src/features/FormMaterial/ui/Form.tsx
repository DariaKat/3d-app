import { FC } from "react";
import { Input, Button, Alert, Typography } from "antd";
import { v4 as uuid } from "uuid";
import { useForm, Controller } from "react-hook-form";
import { Form, Block } from "./Form.styled";
import { IFormInput, IFormProps } from "../model/type";
import { SubmitHandler } from "react-hook-form";
import { collection, addDoc } from "firebase/firestore";
import { useAppDispatch } from "shared/store/hooks";
import { setMaterial } from "shared/store/slices/materialSlice";
import { db } from "app/firebase";

const { Title } = Typography;

export const FormMaterial: FC<IFormProps> = ({ title, messageApi }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInput>();

  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const id = uuid();
      await addDoc(collection(db, "material"), {
        key: id,
        ...data,
      });
      dispatch(setMaterial({ key: id, ...data }));
      messageApi.open({
        type: "success",
        content: "Запись успешно добавлена!",
      });
      reset({});
    } catch (error: unknown) {
      messageApi.open({
        type: "error",
        content: "Что-то пошло не так, попробуйте позднее!",
      });
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Title level={3}>{title}</Title>
        <Block>
          <Controller
            name="name"
            control={control}
            rules={{
              required: "Обязательное поле",
            }}
            render={({ field }) => (
              <Input
                placeholder="Название материала"
                status={errors?.name?.message && "error"}
                {...field}
              />
            )}
          />
        </Block>
        {errors?.name?.message && (
          <Alert className="message" message="Обязательное поле" type="error" />
        )}

        <Block>
          <Controller
            name="bulk_mass_dry_condition"
            control={control}
            rules={{
              required: "Обязательное поле",
            }}
            render={({ field }) => (
              <Input
                placeholder="Объемная масса в сухом состоянии"
                status={errors?.bulk_mass_dry_condition?.message && "error"}
                {...field}
              />
            )}
          />
        </Block>
        {errors?.bulk_mass_dry_condition?.message && (
          <Alert className="message" message="Обязательное поле" type="error" />
        )}

        <Block>
          <Controller
            name="thermal_conductivity"
            control={control}
            rules={{
              required: "Обязательное поле",
            }}
            render={({ field }) => (
              <Input
                placeholder="Теплопроводность"
                status={errors?.thermal_conductivity?.message && "error"}
                {...field}
              />
            )}
          />
        </Block>
        {errors?.thermal_conductivity?.message && (
          <Alert className="message" message="Обязательное поле" type="error" />
        )}

        <Block>
          <Controller
            name="heat_capacity"
            control={control}
            rules={{
              required: "Обязательное поле",
            }}
            render={({ field }) => (
              <Input
                placeholder="Теплоемкость"
                status={errors?.heat_capacity?.message && "error"}
                {...field}
              />
            )}
          />
        </Block>
        {errors?.heat_capacity?.message && (
          <Alert className="message" message="Обязательное поле" type="error" />
        )}

        <Block>
          <Controller
            name="reduced_radiation_coefficient"
            control={control}
            rules={{
              required: "Обязательное поле",
            }}
            render={({ field }) => (
              <Input
                placeholder="Коэффициент излучения"
                status={
                  errors?.reduced_radiation_coefficient?.message && "error"
                }
                {...field}
              />
            )}
          />
        </Block>
        {errors?.reduced_radiation_coefficient?.message && (
          <Alert className="message" message="Обязательное поле" type="error" />
        )}

        <Block>
          <Controller
            name="blackness"
            control={control}
            rules={{
              required: "Обязательное поле",
            }}
            render={({ field }) => (
              <Input
                placeholder="Чернота"
                status={errors?.blackness?.message && "error"}
                {...field}
              />
            )}
          />
        </Block>
        {errors?.blackness?.message && (
          <Alert className="message" message="Обязательное поле" type="error" />
        )}

        <Button htmlType="submit" type="primary">
          Добавить
        </Button>
      </Form>
    </div>
  );
};
