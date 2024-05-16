import { Button, Col, Divider, Image, InputNumber, Row } from "antd";
import React, { useState } from "react";
import thumnail from "../../assets/images/oil-quy-mao-final-768x738.jpg";
import smallImage from "../../assets/images/oil-quy-mao-final-247x247.jpg";
import {
  WrapperStyleImageSmall,
  WrapperImagesSmallContainer,
  WrapperNameProduct,
  WrapperPriceProduct,
  WrapperAmountSoldText,
  WrapperAddress,
  WrapperQualityProduct,
  WrapperInputNumber
} from "./style";
import { ButtonComponent } from "../ButtonComponent/ButtonComponent";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import * as ProductService from "../../services/ProductService";
import { useQuery } from "react-query";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addOrderProduct } from "../../redux/slides/orderSlide";
import { convertPrice } from "../../utils";

const ProductDetailComponent = ({ idProduct }) => {
  const [numProducts, setNumProducts] = useState(1);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  console.log('location ', location);

  const onChange = (value) => {
    console.log(value, typeof value);
    setNumProducts(value);
  };
  const handleChangeCount = (e) => {
    const type = e.target?.parentNode?.ariaLabel;
    if (type === "minus") {
      setNumProducts(numProducts - 1);
    } else {
      setNumProducts(numProducts + 1);
    }
  };

  const fetchProductDetail = async () => {
    const res = await ProductService.getDetailProduct(idProduct);
    return res;
  };
  
  const { isLoading, data: productDetail } = useQuery(
    ["product-details"],
    fetchProductDetail,
    { enabled: !!idProduct }
  );

  const handleAddOrder = () => {
    if (!user?.id) {
      navigate('/sign-in', {state: location?.pathname});
    } else {
      dispatch(addOrderProduct({
        orderItem: {
          product: productDetail,
          amount: numProducts,
          price: productDetail?.cost,
          discount: productDetail?.discount
        }
      }))
    }
  }
  console.log({productDetail, user});
  return (
    <LoadingComponent isLoading={isLoading}>
      <Row style={{ padding: "0" }}>
        <Col span={10}>
          <Image
            src={productDetail?.thumbnails}
            alt="image-product"
            preview="false"
            style={{ marginBottom: "10px" }}
          />
          <WrapperImagesSmallContainer>
            <Col span={4}>
              <WrapperStyleImageSmall
                src={productDetail?.thumbnails}
                alt="image-product"
                preview="false"
              />
            </Col>
            <Col span={4}>
              <WrapperStyleImageSmall
                src={productDetail?.thumbnails}
                alt="image-product"
                preview="false"
              />
            </Col>
            <Col span={4}>
              <WrapperStyleImageSmall
                src={productDetail?.thumbnails}
                alt="image-product"
                preview="false"
              />
            </Col>
            <Col span={4}>
              <WrapperStyleImageSmall
                src={productDetail?.thumbnails}
                alt="image-product"
                preview="false"
              />
            </Col>
            <Col span={4}>
              <WrapperStyleImageSmall
                src={productDetail?.thumbnails}
                alt="image-product"
                preview="false"
              />
            </Col>
            <Col span={4}>
              <WrapperStyleImageSmall
                src={productDetail?.thumbnails}
                alt="image-product"
                preview="false"
              />
            </Col>
          </WrapperImagesSmallContainer>
        </Col>
        <Col span={14} style={{ paddingLeft: "10px" }}>
          <WrapperNameProduct>{productDetail?.name}</WrapperNameProduct>
          <Divider style={{ width: "5px", maxWidth: "5px" }} />
          <WrapperAmountSoldText>
            Sold:{" "}
            {productDetail?.soldQuantity
              ? productDetail?.soldQuantity
              : "Hidden"}
          </WrapperAmountSoldText>

          <WrapperPriceProduct>
            {convertPrice(productDetail?.cost)}
          </WrapperPriceProduct>

          <WrapperAddress>
            <span>Ship to </span>
            <span style={{color: "#724e91"}}>{user?.address}</span>
            <span style={{color: "darkgreen"}}>Change</span>
          </WrapperAddress>
          
          <WrapperQualityProduct>
            <MinusOutlined onClick={handleChangeCount} name="minus-btn" />
            <WrapperInputNumber
              min={1} max={productDetail?.stockQuantity}
              defaultValue={numProducts}
              onChange={onChange}
              value={numProducts}
              
            />
            <PlusOutlined onClick={handleChangeCount} name="plus-btn" />
          </WrapperQualityProduct>
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
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
              textButton={"Add to Cart"}
              onClick={handleAddOrder}
            ></ButtonComponent>
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
              textButton={"Buy"}
            ></ButtonComponent>
          </div>
        </Col>
      </Row>
    </LoadingComponent>
  );
};

export default ProductDetailComponent;
