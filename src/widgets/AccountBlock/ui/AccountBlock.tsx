import { FC } from "react";
import { Block } from "./AccountBlock.styled";
import { AccountInfo } from "features/AccountInfo";

export const AccountBlock: FC = () => {
  return (
    <Block>
      <AccountInfo />
    </Block>
  );
};
