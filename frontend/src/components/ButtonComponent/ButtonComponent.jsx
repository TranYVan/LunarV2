import React from "react";
import { Button } from "antd";

export const ButtonComponent = ({
  size,
  styleButton,
  styleTextButton,
  textButton,
  disabled,
  ...rests
}) => {
  return (
    <Button
      style={{
        ...styleButton,
        background: disabled ? '#ccc' : styleButton.backgroundColor
      }}
      size={size} 
      // icon={<SearchOutlined style={{ color: colorButton }} />}
      {...rests}>
      <span style={styleTextButton}>{textButton}</span>
    </Button>
  );
};
