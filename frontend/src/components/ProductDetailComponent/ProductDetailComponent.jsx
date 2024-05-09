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
//   {
//     "product": {
//         "id": "bf156102-4a83-4f02-a7e8-1b1ecb80f3d9",
//         "name": "Micro HP HyperX QuadCast S 4P5P7AA",
//         "description": "",
//         "cost": 150.69,
//         "stockQuantity": 489,
//         "discount": 13.0,
//         "thumbnails": "data:image/webp;base64,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",
//         "category": {
//             "id": 6,
//             "name": "Microphone",
//             "status": "AVAILABLE"
//         }
//     },
//     "amount": 1,
//     "price": 150.69,
//     "discount": 0.0
// },
  
  
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
            {productDetail?.cost.toLocaleString()}$
          </WrapperPriceProduct>

          <WrapperAddress>
            <span>Ship to </span>
            <span style={{color: "#724e91"}}>{user?.address}</span>
            <span style={{color: "darkgreen"}}>Change</span>
          </WrapperAddress>
          
          <WrapperQualityProduct>
            <MinusOutlined onClick={handleChangeCount} name="minus-btn" />
            <WrapperInputNumber
              min={1}
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
