import { Col, Divider, Image, InputNumber, Row } from 'antd'
import React from 'react'
import thumnail from '../../assets/images/oil-quy-mao-final-768x738.jpg';
import smallImage from "../../assets/images/oil-quy-mao-final-247x247.jpg";
import {
  WrapperStyleImageSmall,
  WrapperImagesSmallContainer,
  WrapperNameProduct,
  WrapperPriceProduct,
  WrapperAmountSoldText,
  WrapperQualityProduct,
} from "./style";
import { ButtonComponent } from '../ButtonComponent/ButtonComponent';
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";


const ProductDetailComponent = () => {
  const onChange = (value) => {
    console.log("changed", value);
  };


  return (
    <Row style={{ padding: "16px" }}>
      <Col span={10}>
        <Image
          src={thumnail}
          alt="image-product"
          preview="false"
          style={{ marginBottom: "10px" }}
        />
        <WrapperImagesSmallContainer>
          <Col span={4}>
            <WrapperStyleImageSmall
              src={smallImage}
              alt="image-product"
              preview="false"
            />
          </Col>
          <Col span={4}>
            <WrapperStyleImageSmall
              src={smallImage}
              alt="image-product"
              preview="false"
            />
          </Col>
          <Col span={4}>
            <WrapperStyleImageSmall
              src={smallImage}
              alt="image-product"
              preview="false"
            />
          </Col>
          <Col span={4}>
            <WrapperStyleImageSmall
              src={smallImage}
              alt="image-product"
              preview="false"
            />
          </Col>
          <Col span={4}>
            <WrapperStyleImageSmall
              src={smallImage}
              alt="image-product"
              preview="false"
            />
          </Col>
          <Col span={4}>
            <WrapperStyleImageSmall
              src={smallImage}
              alt="image-product"
              preview="false"
            />
          </Col>
        </WrapperImagesSmallContainer>
      </Col>
      <Col span={14} style={{ paddingLeft: "10px" }}>
        <WrapperNameProduct>
          Dầu dưỡng tóc Templeton Tonics x Viet Nam Quý Mão Limited 2023
        </WrapperNameProduct>
        <Divider style={{ width: "5px", maxWidth: "5px" }} />
        <WrapperAmountSoldText>Đã bán 400</WrapperAmountSoldText>
        <WrapperPriceProduct>550,000đ</WrapperPriceProduct>

        <WrapperQualityProduct>
          <PlusOutlined style={{ fontSize: "14px" }} />
          <InputNumber
            min={1}
            defaultValue={3}
            onChange={onChange}
            style={{
              width: "55px",
              backgroundColor: "rgba(0, 0, 0, 0)",
              color: "rgb(51, 51, 51)",
              fontSize: "14px",
              border: "0",
            }}
          />
          <MinusOutlined style={{ fontSize: "14px" }} />
        </WrapperQualityProduct>
        <div style={{display: "flex", alignItems: "center", gap: "20px"}}>
          <ButtonComponent
            bordered={false}
            size={40}
            styleButton={{
              backgroundColor: "rgb(37, 92, 69)",
              borderRadius: "0",
              width: "220px",
              height: "50px",
            }}
            styleTextButton={{
              color: "#F5F7F8",
              fontWeight: "700",
              fontSize: "17px",
            }}
            textButton={"Add to Cart"}></ButtonComponent>
          <ButtonComponent
            bordered={false}
            size={40}
            styleButton={{
              backgroundColor: "#F4CE14",
              borderRadius: "0",
              width: "220px",
              height: "50px",
            }}
            styleTextButton={{
              color: "#45474B",
              fontWeight: "700",
              fontSize: "17px",
            }}
            textButton={"Buy"}></ButtonComponent>
        </div>
      </Col>
    </Row>
  );
}

export default ProductDetailComponent