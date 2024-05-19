import React from "react";
import { Button } from "antd";

export const ButtonComponent = ({
  size,
  styleButton,
  styleTextButton,
  textbutton,
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
      <span style={styleTextButton}>{textbutton}</span>
    </Button>
  );
};
