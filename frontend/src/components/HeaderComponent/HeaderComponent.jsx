import { Row, Col, Button, Badge, Popover } from "antd";
import React, { useState } from "react";
import {
  WrapperHeader,
  WrapperHeaderAccount,
  WrapperTextHeader,
  WrapperTextHeaderSmall,
  WrapperContentPopUp
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
import { useDispatch, useSelector } from "react-redux";
import { resetUser } from '../../redux/slides/usersSlide';
import LoadingComponent from "../LoadingComponent/LoadingComponent";

//===
export const HeaderComponent = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const user = useSelector((state) => state.user);
  const handleNavigationSignIn = () => {
    navigate("/sign-in");
  };
  const handleLogOut = async() => {
    setLoading(true);
    dispatch(resetUser());
    setLoading(false);
  }
  const content = (
    <div>
      <WrapperContentPopUp onClick={handleLogOut}>Log Out</WrapperContentPopUp>
      <WrapperContentPopUp>Your Profile</WrapperContentPopUp>
    </div>
  );
  const dispatch = useDispatch();

  

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        background: "#F4CE14",
      }}
    >
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
          style={{ display: "flex", gap: "54px", alignItems: "center" }}
        >
          <LoadingComponent isLoading={loading}>
            <WrapperHeaderAccount>
              <UserOutlined style={{ fontSize: "30px" }} />
              {user?.name ? (
                <>
                  <Popover placement="bottomRight" content={content}>
                    <div style={{ cursor: "pointer" }}>{user.name}</div>
                  </Popover>
                </>
              ) : (
                <div
                  onClick={handleNavigationSignIn}
                  style={{ cursor: "pointer" }}
                >
                  <WrapperTextHeaderSmall>
                    Sign in / Sign up
                  </WrapperTextHeaderSmall>
                  <div>
                    <WrapperTextHeaderSmall>Your account</WrapperTextHeaderSmall>
                    <DownOutlined />
                  </div>
                </div>
              )}
            </WrapperHeaderAccount>
          </LoadingComponent>
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
