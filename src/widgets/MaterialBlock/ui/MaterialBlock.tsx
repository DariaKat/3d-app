import { FC } from "react";
import { Block } from "./MaterialBlock.styled";
import { message } from "antd";

import { FormMaterial } from "features/FormMaterial";
import { TabelMaterial } from "features/TableMaterial";

export const MaterialBlock: FC = () => {
  const [messageApi, contextHolder] = message.useMessage();

  return (
    <Block>
      {contextHolder}
      <FormMaterial messageApi={messageApi} title="Добавить материал" />
      <TabelMaterial />
    </Block>
  );
};
