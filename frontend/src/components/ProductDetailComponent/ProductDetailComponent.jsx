import { Button, Col, Divider, Image, InputNumber, Row, message, notification } from "antd";
import React, { useEffect, useMemo, useState } from "react";
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
import { addOrderProduct, buyItem, selectedOrder } from "../../redux/slides/orderSlide";
import { convertPrice, initFaceBookSDK } from "../../utils";
import LikeButton from "../LikeButton/LikeButton";
import Comment from "../Comment/Comment";

const ProductDetailComponent = ({ idProduct }) => {
  const [numProducts, setNumProducts] = useState(1);
  const user = useSelector((state) => state.user);
  const order = useSelector((state) => state.order);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const [notiApi, notiContextHolder] = notification.useNotification();
  const [isQuantityExceed, setIsQuantityExceed] = useState(false);
  
  const fetchProductDetail = async () => {
    const res = await ProductService.getDetailProduct(idProduct);
    return res;
  };
  
  const { isLoading, data: productDetail } = useQuery(
    ["product-details"],
    fetchProductDetail,
    { enabled: !!idProduct }
  );

  const onChange = (value) => {
    setIsQuantityExceed(false);
    (value, typeof value);
    const item = order?.orderedItems?.find((it) => it?.product?.id === productDetail?.id);
    if (item) {
      if (value > productDetail?.stockQuantity - item.amount) {
        setIsQuantityExceed(true);
      }
      setNumProducts(Math.min(value, productDetail?.stockQuantity - item.amount));
    } else {
      if (value > productDetail?.stockQuantity) {
        ('first', value);
        setIsQuantityExceed(true);
      }
      setNumProducts(Math.min(value, productDetail?.stockQuantity));
    }
  };
  
  const onIncreaseCount = (e) => {
    setIsQuantityExceed(false);
    const item = order?.orderedItems?.find((it) => it?.product?.id === productDetail?.id);
    if (item) {
      if (numProducts + 1 > productDetail?.stockQuantity - item?.amount) {
        setIsQuantityExceed(true);
      } else {
        setNumProducts(numProducts + 1);
      }
    } else {
      if (numProducts + 1 > productDetail?.stockQuantity) {
        setIsQuantityExceed(true);
      } else {
        setNumProducts(numProducts + 1);
      }
    }
  };

  const onDecreaseCount = (e) => {
    setIsQuantityExceed(false);
    const item = order?.orderedItems?.find((it) => it?.product?.id === productDetail?.id);
    if (item) {
      if (numProducts - 1 > productDetail?.stockQuantity - item?.amount) {
        setIsQuantityExceed(true);
      } else {
        setNumProducts(Math.max(numProducts - 1, 1));
      }
    } else {
      if (numProducts - 1 > productDetail?.stockQuantity) {
        setIsQuantityExceed(true);
      } else {
        setNumProducts(Math.max(numProducts - 1, 1));
      }
    }
  }
  
  const handleAddOrder = () => {
    if (!user?.id) {
      navigate('/sign-in', {state: location?.pathname});
    } else {
      const item = order?.orderedItems?.find((it) => it?.product?.id === productDetail?.id);
      if (item) {
        if (numProducts + item.amount > productDetail.stockQuantity) {
          notiApi.error({
            // message: "Error while adding product to cart",
            description: `You already have ${item?.amount} quantity in cart. Unable to add selected quantity to cart as it would exceed your purchase limit.`,
            placement: 'bottom'
          })
          return;
        }
      }
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
  
  useEffect(() => {
    initFaceBookSDK()
  }, []);


  return (
    <LoadingComponent isLoading={isLoading}>
      {contextHolder}
      {notiContextHolder}
      <Row gutter={40}>
        <Col span={10} className="gutter-row">
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
        <Col span={14} className="gutter-row">
          <WrapperNameProduct>{productDetail?.name}</WrapperNameProduct>
          <Divider style={{ width: "9px" }} />
          <WrapperPriceProduct>
            {convertPrice(productDetail?.cost)}
          </WrapperPriceProduct>
          <WrapperAmountSoldText>
            Sold:{" "}
            {productDetail?.soldQuantity
              ? productDetail?.soldQuantity
              : "Hidden"}
          </WrapperAmountSoldText>

          <WrapperAddress>
            <span style={{fontWeight: "normal"}}>Deliver to</span>
            <span style={{color: "#724e91"}}>{user?.address}</span>
            {/* <span style={{color: "darkgreen"}}>Change</span> */}
          </WrapperAddress>
          <LikeButton dataHref={process.env.REACT_APP_IS_LOCAL ? "https://developers.facebook.com/docs/plugins/" : window.location.href}/>
          <WrapperQualityProduct>
            <MinusOutlined onClick={onDecreaseCount} name="minus-btn" />
            <WrapperInputNumber
              min={1} max={productDetail?.stockQuantity}
              defaultValue={numProducts}
              onChange={onChange}
              value={numProducts}
              
            />
            <PlusOutlined onClick={onIncreaseCount} name="plus-btn" />
          </WrapperQualityProduct>
          {isQuantityExceed && <span style={{color: "#ff424f"}}>Please change the quantity because purchase limit has been exceeded</span>}
          <div style={{ display: "flex", alignItems: "center", gap: "20px", marginTop: "26px" }}>
            <ButtonComponent
              disabled={productDetail?.stockQuantity === 0}
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
              textbutton={"Add to Cart"}
              onClick={handleAddOrder}
            />
            {/* <ButtonComponent
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
              textbutton={"Buy"}
              onClick={onClickBuyButton}
            ></ButtonComponent> */}
          </div>
          {productDetail?.stockQuantity === 0 && <span style={{color: "#ff424f"}}>Out of Stock</span>}
        </Col>
        <Comment dataHref={ process.env.REACT_APP_IS_LOCAL ? "https://developers.facebook.com/docs/plugins/comments#configurator" : window.location.href} width="1270"/>
      </Row>
    </LoadingComponent>
  );
};

export default ProductDetailComponent;
