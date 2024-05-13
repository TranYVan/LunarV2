import React, { useEffect, useMemo, useState } from "react";

import {
  WrapperCountOrder,
  WrapperInfo,
  WrapperItemOrder,
  WrapperLeft,
  WrapperListOrder,
  WrapperRight,
  WrapperStyleHeader,
  WrapperTotal,
  Lable,
  WrapperRadio,
} from "./style";
import { Checkbox, Col, Form, Radio, Row, message } from "antd";
import { DeleteOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { ButtonComponent } from "../../components/ButtonComponent/ButtonComponent";
import ModalComponent from "../../components/ModalComponent/ModalComponent";
import { InputComponent } from "../../components/InputComponent/InputComponent";
import { useDispatch, useSelector } from "react-redux";
import { WrapperInputNumber } from "../../components/ProductDetailComponent/style";
import {
  decreaseAmount,
  increaseAmount,
  removeAllOrderProduct,
  removeOrderProduct,
  selectedOrder,
} from "../../redux/slides/orderSlide";
import { convertPrice } from "../../utils";
import { useMutationHook } from "../../hooks/useMutationHook";
import * as UserService from "../../services/UserService";
import * as OrderService from "../../services/OrderService";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import { updateUser } from "../../redux/slides/usersSlide";

const PaymentPage = () => {
  const [delivery, setDelivery] = useState("fast");
  const [payment, setPayment] = useState("cash_on_delivery");
  const user = useSelector((state) => state.user);
  const [messageApi, contextHolder] = message.useMessage();
  const order = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const [isOpenModalUpdateInfo, setIsOpenMoalUpdateInfo] = useState(false);
  const [stateUserDetail, setStateUserDetail] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
  });
  const [form] = Form.useForm();

  const mutationUpdateUser = useMutationHook((payload) => {
    const { name, phone, address, id, city } = payload;
    const res = UserService.updateUser(id, {
      fullName: name,
      phone: phone,
      address: address,
      city: city,
    });
    return res;
  });
  const { isLoading, isSuccess, isError, data } = mutationUpdateUser;

  const mutationAddOrder = useMutationHook((payload) => {
    const res = OrderService.createOrder(payload);
    return res;
  });

  const {isLoading: isLoadingCheckOut, data: dataCheckOut, isError: isErrorCheckOut, isSuccess: isCheckOutSuccess} = mutationAddOrder;

  const onFinishUpdate = () => {
    console.log("stateuserdetail", stateUserDetail);
    const { name, phone, address } = stateUserDetail;
    if (name && phone && address) {
      console.log("haha");
      mutationUpdateUser.mutate({
        id: user?.id,
        ...stateUserDetail,
      });
    }
  };

  const handleOnChangeDetail = (e) => {
    setStateUserDetail({
      ...stateUserDetail,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    form.setFieldsValue(stateUserDetail);
  }, [form, stateUserDetail]);

  useEffect(() => {
    if (isOpenModalUpdateInfo) {
      setStateUserDetail({
        city: user?.city,
        name: user?.name,
        address: user?.address,
        phone: user?.phone,
      });
    }
  }, [isOpenModalUpdateInfo]);
  
  const priceMemo = useMemo(() => {
    const result = order?.selectedOrderedItems?.reduce((total, cur) => {
      return total + cur.price * cur.amount;
    }, 0);

    return result;
  }, [order]);

  const priceDiscountTotal = useMemo(() => {
    const result = order?.selectedOrderedItems?.reduce((total, cur) => {
      if (cur.discount) {
        return (total + (cur.price * cur.discount * cur.amount) / 100).toFixed(
          2
        );
      } else {
        return total;
      }
    }, 0);
    if (Number(result)) {
      return result;
    }
    return 0;
  }, [order]);

  const deliveryPriceMemo = useMemo(() => {
    if (priceMemo > 2222) {
      return 0;
    } else if (priceMemo === 0) {
      return 0;
    } else {
      return 10;
    }
  }, [priceMemo]);
  
  const totalPriceMemo = useMemo(() => {
    return Number(priceMemo + deliveryPriceMemo - priceDiscountTotal);
  }, [priceMemo, priceDiscountTotal, deliveryPriceMemo]);

  const handleCheckOut = () => {
    const { id }  = user;
    mutationAddOrder.mutate(
      {
        orderedItems: order.selectedOrderedItems,
        user: {
          id: id
        },
        isPaid: false,
        isDelivered: false,
        isCanceled: false,
        customerName: user?.name,
        customerAddress: user?.address,
        customerCity: user?.city,
        customerPhone: user?.phone,
        paymentMethod: payment,
        deliveryMethod: delivery,
        itemsPrice: priceMemo,
        shippingPrice:deliveryPriceMemo,
        totalPrice: totalPriceMemo
      }
    )
  };
  console.log('checkout, ', {order, user});

  useEffect(() => {
    if (isCheckOutSuccess) {
      messageApi.success('Check Out SuccessFully');
      console.log(dataCheckOut);
    } else if (isErrorCheckOut) { 
      messageApi.error('Check Out Fail')
    }
  }, [isCheckOutSuccess])


  const handleCancelUpdate = () => {
    setIsOpenMoalUpdateInfo(false);
    setStateUserDetail({
      name: "",
      phone: "",
      address: "",
      city: "",
    });
    form.resetFields();
  };

  const handleUpdateInfoUser = () => {
    console.log("stateuserdetail", stateUserDetail);
    const { name, phone, address, city } = stateUserDetail;
    if (name && phone && address && city) {
      console.log("haha");
      mutationUpdateUser.mutate(
        {
          id: user?.id,
          ...stateUserDetail,
        },
        {
          onSuccess: () => {
            messageApi.success("Update Info Successfully");
            setIsOpenMoalUpdateInfo(false);

            dispatch(
              updateUser({
                id: user?.id,
                fullName: name,
                email: user?.email,
                birthday: user?.birthday,
                phone: phone,
                address: address,
                avatar: user?.avatar,
                token: user?.access_token,
                roles: user?.roles,
                city: city,
              })
            );
          },
        }
      );
    }
  };

  
  const handleDelivery = (e) => {
    setDelivery(e.target.value);
  };
  
  const handlePayment = (e) => {
    setPayment(e.target.value);
  }


  return (
    <LoadingComponent isLoading={isLoadingCheckOut}>  
      <div style={{ background: "#f5f5fa", with: "100%", height: "100vh" }}>
        {contextHolder}
        <div style={{ height: "100%", width: "1270px", margin: "0 auto" }}>
          <h3
            style={{
              marginBottom: "15px",
              marginLeft: "15px",
              paddingTop: "12px",
            }}
          >
            Payment
          </h3>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <WrapperLeft>
              <WrapperInfo>
                <div>
                  <Lable>Choose Delivery Method</Lable>
                  <WrapperRadio onChange={handleDelivery} value={delivery}>
                    <Radio value="fast">
                      <span style={{ color: "#ea8500", fontWeight: "bold" }}>
                        FAST
                      </span>{" "}
                      Giao hàng tiết kiệm
                    </Radio>
                    <Radio value="gojek">
                      <span style={{ color: "#ea8500", fontWeight: "bold" }}>
                        GO_JEK
                      </span>{" "}
                      Giao hàng tiết kiệm
                    </Radio>
                  </WrapperRadio>
                </div>
              </WrapperInfo>
              <WrapperInfo>
                <div>
                  <Lable>Choose Payment Method</Lable>
                  <WrapperRadio onChange={handlePayment} value={payment}>
                    <Radio value="cash_on_delivery"> Cash On Delivery</Radio>
                    <Radio value="paypal"> Pay via Paypal</Radio>
                  </WrapperRadio>
                </div>
              </WrapperInfo>
            </WrapperLeft>
            <WrapperRight>
              <div style={{ width: "100%" }}>
                <WrapperInfo>
                  <div>
                    <Row>
                      <Col span={14}>
                        <span>Shipping Details: </span>
                      </Col>
                      <Col span={10} style={{ textAlign: "right" }}>
                        <span style={{ color: "blue", cursor: "pointer" }}>
                          Change
                        </span>
                      </Col>
                    </Row>
                    <Row>
                      <span
                        style={{ textAlign: "right", fontWeight: "700" }}
                      >{`${user?.name} | ${user?.phone}`}</span>
                    </Row>
                    <Row>
                      <span
                        style={{ color: "#5a5a5a" }}
                      >{`${user?.address}, ${user?.city}`}</span>
                    </Row>
                  </div>
                </WrapperInfo>
                <WrapperInfo>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <span>Subtotal</span>
                    <span
                      style={{
                        color: "#000",
                        fontSize: "14px",
                        fontWeight: "bold",
                      }}
                    >
                      {convertPrice(priceMemo)}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <span>Discount</span>
                    <span
                      style={{
                        color: "#000",
                        fontSize: "14px",
                        fontWeight: "bold",
                      }}
                    >
                      {convertPrice(priceDiscountTotal)}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <span>Shipping Charge</span>
                    <span
                      style={{
                        color: "#000",
                        fontSize: "14px",
                        fontWeight: "bold",
                      }}
                    >
                      {convertPrice(deliveryPriceMemo)}
                    </span>
                  </div>
                </WrapperInfo>
                <WrapperTotal>
                  <span>Final Total</span>
                  <span style={{ display: "flex", flexDirection: "column" }}>
                    <span
                      style={{
                        color: "rgb(254, 56, 52)",
                        fontSize: "24px",
                        fontWeight: "bold",
                      }}
                    >
                      {convertPrice(totalPriceMemo)}
                    </span>
                    <span style={{ color: "#000", fontSize: "11px" }}>
                      (VAT included if any)
                    </span>
                  </span>
                </WrapperTotal>
              </div>
              <ButtonComponent
                onClick={() => handleCheckOut()}
                size={40}
                styleButton={{
                  backgroundColor: "rgb(37, 92, 69)",
                  borderRadius: "0",
                  width: "100%",
                  height: "50px",
                  marginBottom: "5px",
                }}
                styleTextButton={{
                  color: "#fff",
                  fontSize: "15px",
                  fontWeight: "700",
                }}
                textButton={"Check Out"}
              ></ButtonComponent>
            </WrapperRight>
          </div>
        </div>
        <LoadingComponent isLoading={isLoading}>
          <ModalComponent
            title="Update shipping details"
            open={isOpenModalUpdateInfo}
            onCancel={handleCancelUpdate}
            onOk={handleUpdateInfoUser}
          >
            <Form
              name="basic"
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 19 }}
              autoComplete="on"
              form={form}
              onFinish={onFinishUpdate}
            >
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: "Please provide your name!" }]}
              >
                <InputComponent
                  value={stateUserDetail?.name}
                  onChange={handleOnChangeDetail}
                  name="name"
                />
              </Form.Item>

              <Form.Item
                label="Address"
                name="address"
                rules={[
                  { required: true, message: "Please provide your address!" },
                ]}
              >
                <InputComponent
                  value={stateUserDetail?.address}
                  onChange={handleOnChangeDetail}
                  name="address"
                />
              </Form.Item>

              <Form.Item
                label="City"
                name="city"
                rules={[{ required: true, message: "Please provide your city!" }]}
              >
                <InputComponent
                  value={stateUserDetail?.city}
                  onChange={handleOnChangeDetail}
                  name="city"
                />
              </Form.Item>

              <Form.Item
                label="Phone"
                name="phone"
                rules={[
                  { required: true, message: "Please provide your phone!" },
                ]}
              >
                <InputComponent
                  value={stateUserDetail?.phone}
                  onChange={handleOnChangeDetail}
                  name="phone"
                />
              </Form.Item>
            </Form>
          </ModalComponent>
        </LoadingComponent>
      </div>
    </LoadingComponent>
  );
};
export default PaymentPage;
