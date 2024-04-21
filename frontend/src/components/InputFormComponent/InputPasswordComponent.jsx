import { Input } from "antd";
import React, { useState } from "react";

const InputPasswordComponent = (props) => {
  
  const { placeholder = "Fill in here", ...rests } = props;
  const handleOnChangeInput = (e) => {
    props.onChange(e.target.value);
  }
  return (
    <Input.Password
      placeholder={placeholder}
      value={props.value}
      onChange={handleOnChangeInput}
      style={{
        marginBottom: "10px",
      }}
      {...rests}
    />
  );
};

export default InputPasswordComponent;
