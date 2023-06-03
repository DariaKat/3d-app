import { FC, useState } from "react";
import { FormMchs, IResult } from "features/Form";
import { Model } from "features/Model";
import { Block } from "./MainBlock.styled";

export const MainBlock: FC = () => {
  const [getResult, setGetResult] = useState<IResult>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Block>
      <FormMchs setIsOpen={setIsOpen} setGetResult={setGetResult} />
      {true && <Model getResult={getResult} />}
    </Block>
  );
};
