import React, { useEffect, useMemo, useState } from "react";

import { WrapperCountOrder, WrapperInfo, WrapperItemOrder, WrapperLeft, WrapperListOrder, WrapperRight, WrapperStyleHeader, WrapperStyleHeaderDelivery, WrapperTotal } from "./style";
import { Checkbox, Col, ConfigProvider, Form, Row, Steps, message } from "antd";
import { DeleteOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { ButtonComponent } from "../../components/ButtonComponent/ButtonComponent";
import ModalComponent from "../../components/ModalComponent/ModalComponent";
import { InputComponent } from "../../components/InputComponent/InputComponent";
import { useDispatch, useSelector } from "react-redux";
import { WrapperInputNumber } from "../../components/ProductDetailComponent/style";
import { decreaseAmount, increaseAmount, removeAllOrderProduct, removeOrderProduct, selectedOrder } from "../../redux/slides/orderSlide";
import { convertPrice } from "../../utils";
import { useMutationHook } from "../../hooks/useMutationHook";
import * as UserService from '../../services/UserService';
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import { updateUser } from "../../redux/slides/usersSlide";
import { useNavigate } from "react-router-dom";
import Step from "../../components/Step/Step";

const OrderPage = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(2);
  const [messageApi, contextHolder] = message.useMessage();
  const order =  useSelector((state)=>state.order);
  const dispatch = useDispatch();
  const [listChecked, setListChecked] = useState([])
  console.log('order', order);
  const [isOpenModalUpdateInfo, setIsOpenMoalUpdateInfo] = useState(false);
  const [stateUserDetail, setStateUserDetail] = useState({
    name: "",
    phone: "",
    address: "",
    city: ""
  });
  const [form] = Form.useForm();
  
  const mutationUpdateUser = useMutationHook((payload) => {
    const { name, phone, address, id, city } = payload;
    const res = UserService.updateUser(id, {
      fullName: name,
      phone: phone,
      address: address,
      city: city
    });
    return res;
  });
  const {isLoading, isSuccess, isError, data} = mutationUpdateUser;
  const handleChangeCount = (type, productId) => {
    if (type === 'increase') {
      dispatch(increaseAmount({ productId }))
    } else {
      dispatch(decreaseAmount({ productId }))
    }
  }
  
  const handleDeleteOrder = (productId) => {
    dispatch(removeOrderProduct({productId}));
  }

  const onChange = (e) => {
    if (listChecked.includes(e.target.value)) {
      const newListChecked = listChecked.filter((item) => item !== e.target.value)
      setListChecked(newListChecked)
    } else {
      setListChecked([...listChecked, e.target.value])
    }
  };

  const handleOnchangeCheckAll = (e) => {
    if (e.target.checked) {
      const newListChecked = [];
      order?.orderedItems?.forEach((item) => {
        newListChecked.push(item?.product?.id);
      })
      setListChecked(newListChecked);
    } else {
      setListChecked([]);
    }
  }
  const handleRemoveAllOrder = () => {
    if (listChecked?.length > 1) {
      dispatch(removeAllOrderProduct({ listChecked }))
    }
  }
  const onFinishUpdate = () => {
    console.log('stateuserdetail', stateUserDetail);
    const {name, phone, address} = stateUserDetail;
    if (name && phone && address) {
      console.log('haha')
      mutationUpdateUser.mutate({
        id: user?.id,
        ...stateUserDetail
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
    dispatch(selectedOrder({ listChecked }));
  }, [listChecked])

  const priceMemo = useMemo(() => {
    const result = order?.selectedOrderedItems?.reduce((total, cur) => {
      return total + (cur.price * cur.amount);
    }, 0);
    
    return result;
  }, [order]);
  
  
  
  useEffect(()=> {
    form.setFieldsValue(stateUserDetail);
  }, [form, stateUserDetail])
  
  useEffect(() => {
    if (isOpenModalUpdateInfo) {
      setStateUserDetail({
        city: user?.city,
        name: user?.name,
        address: user?.address,
        phone: user?.phone
      })
    }
  }, [isOpenModalUpdateInfo])

  const priceDiscountTotal = useMemo(() => {
    const result = order?.selectedOrderedItems?.reduce((total, cur) => {
      if (cur.discount) {
        return (total + (cur.price * cur.discount * cur.amount / 100)).toFixed(2);
      } 
      else {
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
      setCurrentStep(2);
      return 0;
    } else if (priceMemo > 1111 ) {
      setCurrentStep(1);
      return 6;
    } else {
      setCurrentStep(0);
      return 10;
    }
  }, [priceMemo]);

  const handleCheckOut = () => {
    if (!order?.selectedOrderedItems?.length) {
      messageApi.error('Please select at least 1 item');
    } else if (!user?.phone || !user?.name || !user?.address || !user?.city) {
      setIsOpenMoalUpdateInfo(true);
    } else {
      navigate('/payment')
    }
  }
  const handleCancelUpdate = () => {
    setIsOpenMoalUpdateInfo(false);
    setStateUserDetail({
      name: "",
      phone: "",
      address: "",
      city: ""
    })
    form.resetFields();
  }

  const handleUpdateInfoUser = () => {
    console.log('stateuserdetail', stateUserDetail);
    const {name, phone, address, city} = stateUserDetail;
    if (name && phone && address && city) {
      console.log('haha')
      mutationUpdateUser.mutate({
        id: user?.id,
        ...stateUserDetail
      }, {
        onSuccess: () => {
          messageApi.success('Update Info Successfully');
          setIsOpenMoalUpdateInfo(false);
          
          dispatch(updateUser({id: user?.id, fullName: name, email: user?.email, birthday: user?.birthday, phone: phone, address: address, avatar: user?.avatar, token: user?.access_token, roles: user?.roles, city: city}))
        }
      });
    }
  }

  const totalPriceMemo = useMemo(() => {
    return Number(priceMemo + deliveryPriceMemo - priceDiscountTotal)
  }, [priceMemo, priceDiscountTotal, deliveryPriceMemo])
  const stepItems = [
    {
      title: 'Finished',
    },
    {
      title: 'In Progress',
    },
    {
      title: 'Waiting',
    },
  ];

  const itemDelivery = [
    {
      title: "10 $",
      description: "Under 1,111$"
    },
     
    {
      title: "6 $",
      description: "From 1,112$ To 2,222$"
    },
    {
      title: "0 $",
      description: "Over 2,222$"
    },
  ];

  console.log('current steep', currentStep);
  return (  
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
          Shopping Cart
        </h3>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <WrapperLeft>
            <WrapperStyleHeaderDelivery>
              <Step items={itemDelivery} current={currentStep}/>
            </WrapperStyleHeaderDelivery>
            <WrapperStyleHeader>
              <span style={{ display: "inline-block", width: "390px" }}>
                <Checkbox
                  onChange={handleOnchangeCheckAll}
                  checked={listChecked?.length === order?.orderedItems?.length}
                ></Checkbox>
                <span style={{ marginLeft: "10px", fontSize: "15px" }}>
                  Total ({order?.orderedItems?.length} products)
                </span>
              </span>
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span style={{ fontSize: "15px" }}>Price</span>
                <span style={{ fontSize: "15px" }}>Amount</span>
                <span style={{ fontSize: "15px" }}>Total</span>
                <DeleteOutlined
                  style={{ cursor: "pointer", fontSize: "15px" }}
                  onClick={handleRemoveAllOrder}
                />
              </div>
            </WrapperStyleHeader>
            <WrapperListOrder>
              {order?.orderedItems?.map((order) => {
                return (
                  <WrapperItemOrder>
                    <div
                      style={{
                        width: "390px",
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                      }}
                    >
                      <Checkbox
                        onChange={onChange}
                        value={order?.product?.id}
                        checked={listChecked.includes(order?.product?.id)}
                      ></Checkbox>
                      <img
                        src={order?.product?.thumbnails}
                        style={{
                          width: "77px",
                          height: "79px",
                          objectFit: "cover",
                        }}
                      />
                      <div
                        style={{
                          width: 260,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {order?.product?.name}
                      </div>
                    </div>
                    <div
                      style={{
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <span>
                        <span style={{ fontSize: "15px", color: "#242424" }}>
                        {convertPrice(order?.price)}
                        </span>
                      </span>
                      <WrapperCountOrder>
                        <button
                          style={{
                            border: "none",
                            background: "transparent",
                            cursor: "pointer",
                          }}
                          onClick={() =>
                            handleChangeCount("decrease", order?.product?.id)
                          }
                        >
                          <MinusOutlined
                            style={{ color: "#000", fontSize: "10px" }}
                          />
                        </button>
                        <WrapperInputNumber
                          defaultValue={order?.amount}
                          value={order?.amount}
                          size="small"
                        />
                        <button
                          style={{
                            border: "none",
                            background: "transparent",
                            cursor: "pointer",
                          }}
                          onClick={() =>
                            handleChangeCount("increase", order?.product?.id)
                          }
                        >
                          <PlusOutlined
                            style={{ color: "#000", fontSize: "10px" }}
                          />
                        </button>
                      </WrapperCountOrder>
                      <span
                        style={{
                          color: "rgb(255, 66, 78)",
                          fontSize: "15px",
                          fontWeight: 500,
                        }}
                      >
                        {convertPrice(order?.price * order?.amount)}
                      </span>
                      <DeleteOutlined
                        style={{ cursor: "pointer" }}
                        onClick={() => handleDeleteOrder(order?.product?.id)}
                      />
                    </div>
                  </WrapperItemOrder>
                );
              })}
            </WrapperListOrder>
          </WrapperLeft>
          <WrapperRight>
            <div style={{ width: '100%' }}>
              <WrapperInfo>
                <div>
                  <Row>
                    <Col span={14} >
                      <span>Shipping Details: </span>
                    </Col>
                    <Col span={10} style={{textAlign: 'right'}}>
                      <span style={{ color: 'blue', cursor: 'pointer'}}>Change</span>
                    </Col>
                  </Row>
                  <Row>
                    <span style={{ textAlign: 'right', fontWeight: '700' }}>{`${user?.name} | ${user?.phone}`}</span>
                  </Row>
                  <Row>
                    <span style={{ color: '#5a5a5a' }}>{`${user?.address}, ${user?.city}`}</span>
                  </Row>
                </div>
              </WrapperInfo>
              <WrapperInfo>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>Subtotal</span>
                  <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>{convertPrice(priceMemo)}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>Discount</span>
                  <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>{convertPrice(priceDiscountTotal)}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>Shipping Charge</span>
                  <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>{convertPrice(deliveryPriceMemo)}</span>
                </div>
              </WrapperInfo>
              <WrapperTotal>
                <span>Final Total</span>
                <span style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ color: 'rgb(254, 56, 52)', fontSize: '24px', fontWeight: 'bold' }}>{convertPrice(totalPriceMemo)}</span>
                  <span style={{ color: '#000', fontSize: '11px' }}>(VAT included if any)</span>
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
              styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
              textButton={'Check Out'}
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
              rules={[{ required: true, message: "Please provide your phone!" }]}
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
  );
};
export default OrderPage;
