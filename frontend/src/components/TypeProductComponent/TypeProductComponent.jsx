import React from "react";
import { useNavigate } from "react-router-dom";

const TypeProductComponent = ({ name, key }) => {
  const navigate = useNavigate();

  const handleNavigateType = (type) => {
    console.log("navigate type");
    navigate(`/products/${type?.replace(/ /g, "_")}`,{state: name});
  };

  return (
    <div
      style={{ backgroundColor: "white", cursor: "pointer" }}
      onClick={() =>  handleNavigateType(name)}
    >
      {name}
    </div>
  );
};

export default TypeProductComponent;
