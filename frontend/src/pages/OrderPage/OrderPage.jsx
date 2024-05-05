import React from "react";

import { WrapperCountOrder, WrapperInfo, WrapperItemOrder, WrapperLeft, WrapperListOrder, WrapperRight, WrapperStyleHeader, WrapperTotal } from "./style";
import { Checkbox, Col, Form, Row } from "antd";
import { DeleteOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { ButtonComponent } from "../../components/ButtonComponent/ButtonComponent";
import ModalComponent from "../../components/ModalComponent/ModalComponent";
import { InputComponent } from "../../components/InputComponent/InputComponent";

const OrderPage = () => {
  return (
    <div style={{ background: "#f5f5fa", with: "100%", height: "100vh" }}>
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
            <WrapperStyleHeader>
              <span style={{ display: "inline-block", width: "390px" }}>
                <Checkbox
                  // onChange={handleOnchangeCheckAll}
                  // checked={listChecked?.length === order?.orderItems?.length}
                ></Checkbox>
                <span style={{ marginLeft: "10px", fontSize: "15px" }}>
                  {/* All ({order?.orderItems?.length} products) */}
                  All
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
                  // onClick={handleRemoveAllOrder}
                />
              </div>
            </WrapperStyleHeader>
            <WrapperListOrder>
              {/* {order?.orderItems?.map((order) => {
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
                        value={order?.productID}
                        checked={listChecked.includes(order?.productID)}
                      ></Checkbox>
                      <img
                        src={order?.image}
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
                        {order?.productName}
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
                            handleChangeCount("decrease", order?.productID)
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
                            handleChangeCount("increase", order?.productID)
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
                        onClick={() => handleDeleteOrder(order?.productID)}
                      />
                    </div>
                  </WrapperItemOrder>
                );
              })} */}
            </WrapperListOrder>
          </WrapperLeft>
          <WrapperRight>
            <div style={{ width: "100%" }}>
              <WrapperInfo>
                <div>
                  <Row>
                    <Col span={10}>
                      <span>Shipping Details: </span>
                    </Col>
                    <Col span={14}>
                      <span
                        // onClick={handleOnChangeShippingDetails}
                        style={{
                          color: "blue",
                          marginLeft: "115px",
                          cursor: "pointer",
                        }}
                      >
                        Change
                      </span>
                    </Col>
                  </Row>
                  <Row>
                    <span
                      style={{ textAlign: "right", fontWeight: "700" }}
                    >
                      {/* {`${user?.username} | ${user?.phone}`} */}
                      Van | 0947611025
                    </span>
                  </Row>
                  <Row>
                    <span
                      style={{ color: "#5a5a5a" }}
                    >
                      {/* {`${user?.address}, ${user?.city}, ${user?.country}`} */}
                      info
                      </span>
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
                    {/* {convertPrice(priceMemo)} */}
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
                      color: "rgb(80, 200, 120)",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  >
                    {/* - {convertPrice(priceDiscountMemo)} */}
                    chim
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
                    {/* {convertPrice(deliveryPriceMemo)} */}
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
                    {/* {convertPrice(finalTotalMemo)} */}
                  </span>
                </span>
              </WrapperTotal>
            </div>
            <ButtonComponent
              // onClick={() => handleCreateOrder()}
              size={40}
              styleButton={{
                backgroundColor: "rgb(255, 57, 69)",
                height: "48px",
                width: "320px",
                border: "none",
                borderRadius: "4px",
              }}
              textButton={"Proceed To Payment"}
              styleTextButton={{
                color: "#fff",
                fontSize: "15px",
                fontWeight: "700",
              }}
            ></ButtonComponent>
          </WrapperRight>
        </div>
      </div>

      <ModalComponent
        title="Update shipping details"
        // open={isOpenModalUpdateInfo}
        // onCancel={handleCancelUpdate}
        // onOk={handleUpdateInfoUser}
      >
        <Form
          name="basic"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 22 }}
          autoComplete="on"
          // form={formUpdate}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please provide your name!" }]}
          >
            <InputComponent
              // value={stateUserDetails?.username}
              // onChange={handleOnChangeDetails}
              name="username"
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
              // value={stateUserDetails?.address}
              // onChange={handleOnChangeDetails}
              name="address"
            />
          </Form.Item>

          <Form.Item
            label="City"
            name="city"
            rules={[{ required: true, message: "Please provide your city!" }]}
          >
            <InputComponent
              // value={stateUserDetails?.city}
              // onChange={handleOnChangeDetails}
              name="city"
            />
          </Form.Item>

          <Form.Item
            label="Country"
            name="country"
            rules={[
              { required: true, message: "Please provide your country!" },
            ]}
          >
            <InputComponent
              // value={stateUserDetails?.country}
              // onChange={handleOnChangeDetails}
              name="country"
            />
          </Form.Item>

          <Form.Item
            label="Phone"
            name="phone"
            rules={[{ required: true, message: "Please provide your phone!" }]}
          >
            <InputComponent
              // value={stateUserDetails?.phone}
              // onChange={handleOnChangeDetails}
              name="phone"
            />
          </Form.Item>
        </Form>
      </ModalComponent>
    </div>
  );
};
export default OrderPage;
