import React from "react";
import { Card } from "antd";
import {
  StyleNameProduct,
  WrapperAmountSoldText,
  WrapperCard,
  WrapperDiscount,
  WrapperPrice,
} from "./style";
import { useNavigate } from "react-router-dom";
import { convertPrice } from "../../utils";
const { Meta } = Card;

export const CardComponent = (props) => {
  const { countInStock, key ,description, name, price, type, sold, discount, image,id } = props;
  const navigate = useNavigate();

  const handleDetailProduct= ()=>{
    navigate(`/product-details/${id}`)
  }
  return (
    <WrapperCard
      hoverable
      styles={{ header: { width: "250px", height: "220px" }, body: {padding: "10px"} }}
      style={{ width: "241px" }}
      cover={
        <img
          style={{height: "50%"}}
          alt="example"
          src={image ? image: "/lunar-logo-zip-file(1)/png/logo-color.png"}
        />
      }
      key={key}
      onClick={(id)=> countInStock !== 0 && handleDetailProduct()}
      disabled={countInStock === 0}
    >

      <StyleNameProduct>{name}</StyleNameProduct>
      <WrapperAmountSoldText>Sold: {sold}</WrapperAmountSoldText>
      <WrapperPrice>       
        <span>{convertPrice(price)}</span>
        {/* {(discount && discount > 0) && (<WrapperDiscount>{discount}%</WrapperDiscount>)} */}
        {discount && discount > 0? (<WrapperDiscount>-{discount}%</WrapperDiscount>) : ''}
      </WrapperPrice>
    </WrapperCard>
    
  );
};
