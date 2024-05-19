
import React from "react";
import { SearchOutlined } from "@ant-design/icons";
import { InputComponent } from "../InputComponent/InputComponent";
import { ButtonComponent } from "../ButtonComponent/ButtonComponent";

export const SearchInputComponent = (props) => {
  const {
    size,
    placeholder,
    textbutton,
    backgroundColorInput = "#fff",
    backgroundColorButton = "#495E57",
    colorButton= "#fff"
  } = props;

  return (
    <div style={{ display: "flex" }}>
      <InputComponent
        size={size}
        placeholder={placeholder}
        style={{ backgroundColor: backgroundColorInput }}
        {...props}
      />
      <ButtonComponent  
        size={size}
        styleButton={{
          backgroundColor: backgroundColorButton,
          color: colorButton,
          border: "none",
        }}
        styleTextButton={{
          color: colorButton
        }}
        icon={<SearchOutlined style={{ color: colorButton }} />}

        textbutton={textbutton}>
        
      </ButtonComponent>
    </div>
  );
};
