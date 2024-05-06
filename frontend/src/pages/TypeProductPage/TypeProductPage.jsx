import React, { Fragment, useEffect, useState } from "react";
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent";
import { CardComponent } from "../../components/CardComponent/CardComponent";
import { Col, Pagination, Row } from "antd";
import { WrapperNavbar, WrapperProducts } from "./style";
import { useLocation } from "react-router-dom";
import * as ProductService from "../../services/ProductService";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import { useSelector } from "react-redux";
import { useDebounce } from "../../hooks/useDebounce";

const TypeProductPage = () => {
  const { state } = useLocation();
  const searchProduct = useSelector((state) => state?.product?.search);
  const searchDebounce = useDebounce(searchProduct, 500);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    page: 0,
    size: 10,
    total: 1,
  });
  const fetchProductType = async (type, page, size) => {
    setLoading(true);
    const res = await ProductService.getAllProductsByCategory(type, page, size);
    if (res?.status == 200) {
      setProducts(res?.data?.content);
      console.log("res", res);
      setPagination({
        ...pagination,
        total: res?.data?.totalElements,
      });
    } else {
    }
    setLoading(false);
  };

  console.log("loading", loading);

  useEffect(() => {
    if (state){
      fetchProductType(state, pagination.page, pagination.size);
    }
  }, [state, pagination.page, pagination.size]);


  const itemRender = (_, type, originalElement) => {
    if (type === "prev") {
      return <a>Previous</a>;
    }
    if (type === "next") {
      return <a>Next</a>;
    }
    return originalElement;
  };
  const onChange = (current, pageSize) => {
    console.log(current, pageSize);
    setPagination({
      ...pagination,
      page: current - 1,
      size: pageSize
    });
  };
  console.log('pagination', pagination);

  return (
    <LoadingComponent isLoading={loading}>
      <div
        style={{
          width: "100%",
          background: "#F5F7F8",
          height: "calc(100vh - 64px)",
        }}
      >
        <div
          style={{ width: "1270px", margin: "0 auto", height: "100% - 20px" }}
        >
          <Row
            style={{
              flexWrap: "nowrap",
              paddingTop: "13px",
              height: "100%",
            }}
          >
            <WrapperNavbar span={4}>
              <NavbarComponent />
            </WrapperNavbar>
            <Col
              span={20}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <WrapperProducts>
                {products?.filter((prod) => {
                  if (searchDebounce === '') {
                    return prod;
                  } else if (prod?.name?.toLowerCase()?.includes(searchDebounce?.toLowerCase())) {
                    return prod;
                  }
                })?.map((data) => {
                  return (
                    <CardComponent
                      key={data?.id}
                      countInStock={data?.stockQuantity}
                      description={data?.description}
                      name={data?.name}
                      price={data?.cost}
                      type={data?.category}
                      sold={data?.soldQuantity}
                      discount={data?.discount}
                      image={data?.thumbnails}
                      id={data?.id}
                    />
                  );
                })}
              </WrapperProducts>
              <Pagination
                defaultCurrent={1}
                total={pagination?.total}
                itemRender={itemRender}
                style={{ textAlign: "center", marginTop: "20px" }}
                onChange={onChange}
              />
            </Col>
          </Row>
        </div>
      </div>
    </LoadingComponent>
  );
};

export default TypeProductPage;
