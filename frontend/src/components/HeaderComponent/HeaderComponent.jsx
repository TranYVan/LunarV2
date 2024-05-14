import { Row, Col, Button, Badge, Popover } from "antd";
import Icon from '@ant-design/icons';
import React, { useEffect, useState } from "react";
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
import Logo from "../Logo/Logo";
import { searchProduct } from "../../redux/slides/productsSlide";

//===
export const HeaderComponent = ({isHiddenSearch = false, isHiddenCart = false}) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const user = useSelector((state) => state.user);
  const [userAvatar, setUserAvatar] = useState('');
  const [search, setSearch] = useState('');
  const order = useSelector((state) => state.order);

  const handleNavigationSignIn = () => {
    navigate("/sign-in");
  };
  const handleLogOut = async() => {
    setLoading(true);
    dispatch(resetUser());
    setLoading(false);
    navigate("/");
  }
  const handleNavigateProfle = async()=> {
    navigate("/profile-user");
  }
  const content = (
    <div>
      <WrapperContentPopUp onClick={handleLogOut}>Log Out</WrapperContentPopUp>
      <WrapperContentPopUp onClick={handleNavigateProfle}>Your Profile</WrapperContentPopUp>
      {user?.roles.some((role) => role.name === "ROLE_ADMIN") &&  (
          <WrapperContentPopUp onClick={() => navigate('/system/admin')}>System Management</WrapperContentPopUp>
      )}
      <WrapperContentPopUp onClick={() => navigate('/my-orders')}>My Orders</WrapperContentPopUp>
    </div>
  );
  const dispatch = useDispatch();

  useEffect(() => {
    setUserAvatar(user?.avatar);
  }, [user?.avatar]);
  
  const onSearch = (e) => {
    setSearch(e.target.value);
    dispatch(searchProduct(e.target.value));
  }

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        background: "#F4CE14",
      }}
    >
      <WrapperHeader style={{justifyContent: isHiddenCart && isHiddenSearch? 'space-between': 'unset' }}>
        <Col span={4} onClick={() => {
          navigate('/')
          console.log('hello')
        }}>
          <Logo style={{maxHeight: '55px'}}/>
          
        </Col>
        {!isHiddenSearch && (
          <Col span={13}>
            <SearchInputComponent
              onChange={onSearch}
              size="large"
              placeholder="Find anything you want"
              textButton="Search"
              
            />
          </Col>
        )}
        
        <Col
          style={{ display: "flex", gap: "59px", alignItems: "center" }}
        >
          <LoadingComponent isLoading={loading}>
            <WrapperHeaderAccount>
              {userAvatar && userAvatar !== 'null' && userAvatar !== 'undefined' && userAvatar.length > 0? (
                <img src={userAvatar} alt="header-avatar"
                  style={{
                    height: "50px",
                    width: "50px",
                    borderRadius: "50%",
                    objectFit: "cover"
                  }}
                />
              ) : (
                <UserOutlined style={{ fontSize: "30px" }} />
              )}
              {user?.access_token ? (
                <>
                  <Popover placement="bottomRight" content={content}>
                    <div style={{ cursor: "pointer" }}>{user.name || user.email || 'User'}</div>
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
          {!isHiddenCart && (
            <div>
            <Badge count={order?.orderedItems?.length} size="small">
              <ShoppingCartOutlined
                onClick={() => navigate('/order')}
                style={{ fontSize: "32px", color: "#45474B", cursor:"pointer" }}
                />
            </Badge>
            <span>Cart</span>
          </div>
          )}
        </Col>
      </WrapperHeader>
    </div>
  );
};
