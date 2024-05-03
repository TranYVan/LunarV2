import React from "react";
import { Card } from "antd";
import {
  StyleNameProduct,
  WrapperAmountSoldText,
  WrapperCard,
  WrapperDiscount,
  WrapperPrice,
} from "./style";
const { Meta } = Card;

export const CardComponent = (props) => {
  const { countInStock, key ,description, name, price, type, sold, discount, image } = props;

  return (
    <WrapperCard
      hoverable
      styles={{ header: { width: "250px", height: "220px" }, body: {padding: "10px"} }}
      style={{ width: "241px" }}
      cover={
        <img
          style={{height: "50%"}}
          alt="example"
          src={image}
        />
      }
      key={key}
    >

      <StyleNameProduct>{name}</StyleNameProduct>
      <WrapperAmountSoldText>Sold: {sold}</WrapperAmountSoldText>
      <WrapperPrice>       
        <span>{price.toLocaleString()}$</span>
        {/* {(discount && discount > 0) && (<WrapperDiscount>{discount}%</WrapperDiscount>)} */}
        {discount && discount > 0? (<WrapperDiscount>-{discount}%</WrapperDiscount>) : ''}
      </WrapperPrice>
    </WrapperCard>
  );
};
