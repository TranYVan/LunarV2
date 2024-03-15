import { ReactNode } from "react";
import HeaderComponent from "../HeaderComponent/HeaderComponent";

interface Props {
  children: ReactNode;
}

export const DefaultComponent = ({ children }: Props) => {
  return (
    <div>
      <HeaderComponent />
      {children}
    </div>
  );
};
