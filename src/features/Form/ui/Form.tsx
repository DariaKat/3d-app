import { FC, useEffect } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Input, Button, Select, Alert, Spin } from "antd";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { checkOfNumber } from "../lib/validate";
import { Form, Container } from "./Form.styled";
import { startCalculate } from "../lib/calculate";
import { IFormInput, IProps } from "../model/type";
import { useAppDispatch, useAppSelector } from "shared/store/hooks";
import {
  materialSelector,
  fetchMaterials,
} from "shared/store/slices/materialSlice";

const antIcon = <LoadingOutlined style={{ fontSize: 32 }} spin />;

export const FormMchs: FC<IProps> = ({ setIsOpen, setGetResult }) => {
  const selectedMaterials = useAppSelector(materialSelector);
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  useEffect(() => {
    dispatch(fetchMaterials());
  }, []);

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    if (data) {
      const defaultData = selectedMaterials.info.materials.filter(
        (item) => item.key === data.materialType
      );

      const info = startCalculate(data, defaultData[0]);

      if (info) {
        setGetResult(info);
        setIsOpen(true);
      }
    }
  };

  return (
    <div>
      {selectedMaterials.loading ? (
        <Container>
          <Spin indicator={antIcon} />
        </Container>
      ) : (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="materialType"
            control={control}
            rules={{
              required: "Обязательное поле",
            }}
            render={({ field }) => (
              <Select
                placeholder="Выбеите материал"
                className="select"
                status={errors?.materialType?.message && "error"}
                options={selectedMaterials.info.select}
                {...field}
              />
            )}
          />

          {errors?.materialType?.message && (
            <Alert
              className="message"
              message="Обязательное поле"
              type="error"
            />
          )}

          <Controller
            name="wallThickness"
            control={control}
            defaultValue={"0.12"}
            rules={{
              required: "Обязательное поле",
              validate: (value: string) => checkOfNumber(value),
            }}
            render={({ field }) => (
              <Input
                placeholder="Толщина стены"
                status={errors?.wallThickness?.message && "error"}
                {...field}
              />
            )}
          />

          {errors?.wallThickness?.message && (
            <Alert
              className="message"
              message="Обязательное поле"
              type="error"
            />
          )}

          <Controller
            name="startTemp"
            control={control}
            defaultValue={"20"}
            rules={{
              required: "Обязательное поле",
              validate: (value: string) => checkOfNumber(value),
            }}
            render={({ field }) => (
              <Input
                placeholder="Начальная температура"
                status={errors?.startTemp?.message && "error"}
                {...field}
              />
            )}
          />

          {errors?.startTemp?.message && (
            <Alert
              className="message"
              message="Обязательное поле"
              type="error"
            />
          )}

          <Controller
            name="endTemp"
            control={control}
            defaultValue={"180"}
            rules={{
              required: "Обязательное поле",
              validate: (value: string) => checkOfNumber(value),
            }}
            render={({ field }) => (
              <Input
                placeholder="Конечная температура"
                status={errors?.endTemp?.message && "error"}
                {...field}
              />
            )}
          />

          {errors?.endTemp?.message && (
            <Alert
              className="message"
              message="Обязательное поле"
              type="error"
            />
          )}

          <Controller
            name="humidity"
            control={control}
            defaultValue="2"
            rules={{
              required: "Обязательное поле",
              validate: (value: string) => checkOfNumber(value),
            }}
            render={({ field }) => (
              <Input
                placeholder="Влажность"
                status={errors?.startTemp?.message && "error"}
                {...field}
              />
            )}
          />

          {errors?.startTemp?.message && (
            <Alert
              className="message"
              message="Обязательное поле"
              type="error"
            />
          )}

          <Controller
            name="tempHeatedSurface"
            control={control}
            defaultValue="415.6, 615, 718, 782.8"
            rules={{
              required: "Обязательное поле",
            }}
            render={({ field }) => (
              <Input
                placeholder="Температура обогреваемой поверхности"
                status={errors?.tempHeatedSurface?.message && "error"}
                {...field}
              />
            )}
          />

          {errors?.tempHeatedSurface?.message && (
            <Alert
              className="message"
              message="Обязательное поле"
              type="error"
            />
          )}

          <Button htmlType="submit" type="primary">
            Рассчитать
          </Button>
        </Form>
      )}
    </div>
  );
};
