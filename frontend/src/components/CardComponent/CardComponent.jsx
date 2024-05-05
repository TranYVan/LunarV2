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
          src={image ? image: "https://danviet.mediacdn.vn/upload/4-2017/images/2017-10-12/Su-that-dang-sau-cai-chet-cua-nam-dien-vien-phim-JAV-gia-nhat-the-gioi-421-1507798304-width400height372.jpg"}
        />
      }
      key={key}
      onClick={(id)=>handleDetailProduct()}
    >

      <StyleNameProduct>{name}</StyleNameProduct>
      <WrapperAmountSoldText>Sold: {sold}</WrapperAmountSoldText>
      <WrapperPrice>       
        <span>{price?.toLocaleString()}$</span>
        {/* {(discount && discount > 0) && (<WrapperDiscount>{discount}%</WrapperDiscount>)} */}
        {discount && discount > 0? (<WrapperDiscount>-{discount}%</WrapperDiscount>) : ''}
      </WrapperPrice>
    </WrapperCard>
    
  );
};
