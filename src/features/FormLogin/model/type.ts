import { ReactNode } from "react";

export interface IFormInput {
  login: string;
  password: string;
  name?: string;
}

export interface IFormProps {
  onSubmit: (data: IFormInput) => void;
  title?: string;
  type?: "registr" | "login";
  icon?: ReactNode;
}
