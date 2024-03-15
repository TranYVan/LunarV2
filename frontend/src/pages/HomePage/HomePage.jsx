import React from "react";
import TypeProductComponent from "../../components/TypeProductComponent/TypeProductComponent";
import { WrapperButtonMore, WrapperProducts, WrapperTypeProduct } from "./style";
import { CardComponent } from "../../components/CardComponent/CardComponent";
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent";
import { ButtonComponent } from "../../components/ButtonComponent/ButtonComponent";
const HomePage = () => {
  const arr = ["TV", "Refrigerator", "Phone"];
  return (
    <>
      <div style={{ width: "1270px", margin: "0 auto" }}>
        <WrapperTypeProduct>
          {arr.map((item) => {
            return <TypeProductComponent name={item} key={item} />;
          })}
        </WrapperTypeProduct>
      </div>
      <div
        className="body"
        style={{ width: "100%", backgroundColor: "#F5F7F8" }}>
        <div
          id="container"
          style={{
            height: "1000px",
            width: "1270px",
            margin: "0 auto",
          }}>
          <WrapperProducts>
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
          </WrapperProducts>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              marginTop: "15px",
            }}>
            <WrapperButtonMore
              textButton="Load more"
              styleButton={{
                backgroundColor: "#495E57",
                border: "1px solid #fff",
                width: "220px",
                height: "45px",
              }}
              styleTextButton={{
                color: "#F5F7F8",
                fontWeight: "600",
                fontSize: "16px",
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
