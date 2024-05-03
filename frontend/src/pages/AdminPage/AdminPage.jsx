import { ConfigProvider, Menu } from "antd";
import React, { useState } from "react";
import { UserOutlined, AppstoreOutlined } from "@ant-design/icons";
import { HeaderComponent } from "../../components/HeaderComponent/HeaderComponent";
import AdminUser from "../../components/AdminUser/AdminUser";
import AdminProduct from "../../components/AdminProduct.jsx/AdminProduct";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem("User", "user", <UserOutlined />),
  getItem("Product", "product", <AppstoreOutlined />),
];

const getLevelKeys = (items1) => {
  const key = {};
  const func = (items2, level = 1) => {
    items2.forEach((item) => {
      if (item.key) {
        key[item.key] = level;
      }
      if (item.children) {
        return func(item.children, level + 1);
      }
    });
  };
  func(items1);
  return key;
};
const levelKeys = getLevelKeys(items);

/**************************************************************************/

const AdminPage = () => {
  const [selectedKey, setSelectedKey] = useState("");

  const handleOnClick = ({ item, key, keyPath, domEvent }) => {
    setSelectedKey(key);
  };

  const renderPage = (key) => {
    switch (key) {
      case "user":
        return <AdminUser />;
      case "product":
        return <AdminProduct />;

      default:
        return <AdminUser />;
    }
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            itemSelectedBg: '#495E57',
            itemSelectedColor: '#F5F7F8'
          }
        }
      }}
    >
      <HeaderComponent isHiddenSearch={true} isHiddenCart={true} />
      <div
        style={{
          display: "flex",
        }}
      >
        <Menu
          mode="inline"
          defaultSelectedKeys={["user"]}
          style={{
            width: 256,
          }}
          items={items}
          onClick={handleOnClick}
        />

        <div style={{ flex: 1, padding: "15px" }}>
          {renderPage(selectedKey)}
        </div>
      </div>
    </ConfigProvider>
  );
};

export default AdminPage;
