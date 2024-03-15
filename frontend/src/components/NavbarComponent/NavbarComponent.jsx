import React from "react";
import {
  WrapperLabelText,
  WrapperContentText,
  WrapperContentContainer,
} from "./style";
import { Checkbox, InputNumber } from "antd";

const NavbarComponent = () => {
  const renderContent = (type, options) => {
    switch (type) {
      case "text":
        return options.map((option) => {
          return <WrapperContentText>{option}</WrapperContentText>;
        });
        break;
      case "checkbox":
        return (
          <Checkbox.Group
            style={{ width: "100%", display: "flex", flexDirection: "column" }}>
            {options.map((option) => {
              return <Checkbox value={option.value}>{option.label}</Checkbox>;
            })}
          </Checkbox.Group>
        );
      case "inputPrice":
        return (
          <div style={{display: "flex", alignItems: "center", gap: "14px"}}>
            <InputNumber
              defaultValue={1000}
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            />
            <InputNumber
              defaultValue={1000}
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            />
          </div>
        );
        break;
      default:
        return {};
        break;
    }
  };

  return (
    <div>
      <WrapperLabelText>Label</WrapperLabelText>
      <WrapperContentContainer>
        {renderContent("text", ["Charger", "TV"])}
        {renderContent("checkbox", [
          { value: "a", label: "A" },
          { value: "b", label: "B" },
          {value: "c", label: "C"}
        ])}
        {renderContent("inputPrice", null)}
      </WrapperContentContainer>
    </div>
  );
};

export default NavbarComponent;
