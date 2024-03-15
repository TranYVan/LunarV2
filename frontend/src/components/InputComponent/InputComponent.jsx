import React from "react";
import { Input } from "antd";

export const InputComponent = ({size, placeholder, style, ...rests}) => {
  return (
    <Input
      size={size}
      placeholder={placeholder}
      bordered={false}
      style={style}
      {...rests}
    />
  );
};
