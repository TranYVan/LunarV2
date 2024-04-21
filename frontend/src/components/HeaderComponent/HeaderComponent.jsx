import { Row, Col, Button, Badge } from "antd";
import React, { useState } from "react";
import {
  WrapperHeader,
  WrapperHeaderAccount,
  WrapperTextHeader,
  WrapperTextHeaderSmall,
} from "./style";
import { Input } from "antd";
const { Search } = Input;
import {
  UserOutlined,
  DownOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { SearchInputComponent } from "../SearchInputComponent/SearchInputComponent";
import { useNavigate } from "react-router-dom";

//===
export const HeaderComponent = () => {
  const navigate = useNavigate();

  const handleNavigationSignIn = () => {
    navigate("/sign-in");  
  }

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        background: "#F4CE14",
      }}>
      <WrapperHeader>
        <Col span={5}>
          <WrapperTextHeader>LUNAR</WrapperTextHeader>
        </Col>
        <Col span={13}>
          <SearchInputComponent
            size="large"
            placeholder="Find anything you want"
            textButton="Search"
          />
        </Col>
        <Col
          // span={6}
          style={{ display: "flex", gap: "54px", alignItems: "center" }}>
          <WrapperHeaderAccount>
            <UserOutlined style={{ fontSize: "30px" }} />

            <div onClick={handleNavigationSignIn} style={{cursor: "pointer"}}>
              <WrapperTextHeaderSmall>Sign in / Sign up</WrapperTextHeaderSmall>
              <div>
                <WrapperTextHeaderSmall>Your account</WrapperTextHeaderSmall>
                <DownOutlined />
              </div>
            </div>
          </WrapperHeaderAccount>
          <div>
            <Badge count={4} size="small">
              <ShoppingCartOutlined
                style={{ fontSize: "32px", color: "#45474B" }}
              />
            </Badge>
            <span>Cart</span>
          </div>
        </Col>
      </WrapperHeader>
    </div>
  );
};
