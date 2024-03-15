import React from "react";
import { Card } from "antd";
import { StyleNameProduct, WrapperAmountSoldText, WrapperCard, WrapperPrice } from "./style";
const { Meta } = Card;

export const CardComponent = () => {
  return (
    <WrapperCard
      hoverable
      bodyStyle={{ padding: "12px" }}
      style={{ width: 240 }}
      cover={
        <img
          alt="example"
          src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        />
      }>
      <StyleNameProduct>Iphone 12</StyleNameProduct>
      <WrapperAmountSoldText>Sold: 210</WrapperAmountSoldText>
      <WrapperPrice>27,800,000đ</WrapperPrice>
    </WrapperCard>
  );
}